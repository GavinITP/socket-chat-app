import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
