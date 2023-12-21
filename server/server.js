import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, function () {
  console.log("Server is listening at http://localhost:8080");
});
