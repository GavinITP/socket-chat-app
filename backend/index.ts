// libraries
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// mock data
import { chats } from "./data/data";

// config
import connectDB from "./config/db";

// routes

// set up
dotenv.config({ path: "config/.env" });
connectDB();

const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// routes
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

// listen
const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${(err as Error).message}`);
  server.close(() => process.exit(1));
});
