import Chat from "../models/chat";
import User from "../models/user";
import { Request, Response } from "express";
import { ChatType, UserType } from "../types";

export const accessChat = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId)
      return res.status(400).json({
        success: false,
        message: "User Id param not sent with request",
      });

    const existingChat: ChatType[] = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (existingChat.length === 0) {
      // User ID not found in existing chats, create a new chat
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id })
        .populate("users", "-password")
        .populate("latestMessage");

      return res.status(200).json(fullChat);
    }

    const userChat = await User.populate(existingChat, {
      path: "latestMessage.sender",
      select: "name email",
    });

    return res.send(userChat[0]);
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: (err as Error).message });
  }
};

export const fetchChat = async (req: Request, res: Response) => {
  try {
    const results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const populatedResults = await User.populate(results, {
      path: "latestMessage.sender",
      select: "name email",
    });

    return res.status(200).send(populatedResults);
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: (err as Error).message });
  }
};
