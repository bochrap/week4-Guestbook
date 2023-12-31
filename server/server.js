import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
const db = new Database("database.db");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, function () {
  console.log("Server is listening at http://localhost:8080");
});

app.get("/", function (reqest, response) {
  response.json("You are indeed in my root folder");
});

app.get("/entries", function (request, response) {
  const entries = db.prepare(`SELECT * FROM guestbook`).all();
  response.json(entries);
});

app.post("/entries", function (request, response) {
  //   response.json("Where we add new entries to database");
  const username = request.body.username;
  const message = request.body.message;
  const reaction = request.body.reaction;

  const newEntry = db
    .prepare(
      `INSERT INTO guestbook (username, message, reaction) VALUES (?, ?, ?)`
    )
    .run(username, message, reaction);
  response.json(newEntry);
});

app.delete("/entries/:id", function (request, response) {
  const recordId = request.params.id;
  const result = db.prepare(`DELETE FROM guestbook WHERE id = ?`).run(recordId);

  response.json({
    message: "Record deleted successfully",
    changes: result.changes,
  });
});

app.put("/entries/:id", (request, response) => {
  const recordId = request.params.id;
  const { likes } = request.body;

  const updateLikes = db.prepare(
    `UPDATE guestbook SET likes = COALESCE(likes, 0) + ? WHERE id = ?`
  );
  const result = updateLikes.run(likes, recordId);

  if (result.changes > 0) {
    response.status(200).json({ message: `likes updated successfully` });
  } else {
    response
      .status(404)
      .json({ message: `Record not found or no changes made` });
  }
});
