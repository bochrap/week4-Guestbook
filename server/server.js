import express from "express";
import cors from "cors";

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
  response.json("Database guestbook entries going here");
});

app.post("/entries", function (request, response) {
  response.json("Where we add new entries to database");
});
