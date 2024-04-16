import express from "express";
import { protect } from "../middleware/auth";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChat,
  removeFromGroup,
  renameGroup,
} from "../controllers/chat";

const router = express.Router();

router.post("/", protect, accessChat);
router.get("/", protect, fetchChat);

router.post("/group", protect, createGroupChat);
router.put("/rename", protect, renameGroup);
router.post("/groupremove", protect, removeFromGroup);
router.post("/groupadd", protect, addToGroup);

export default router;
