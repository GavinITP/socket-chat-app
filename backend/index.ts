import express from "express";
import dotenv from "dotenv";
import { chats } from "./data/data";

dotenv.config({ path: ".env" });

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
