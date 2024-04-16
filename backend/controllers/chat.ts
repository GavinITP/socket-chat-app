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

export const createGroupChat = async (req: Request, res: Response) => {
  try {
    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);

    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json(fullGroupChat);
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: (err as Error).message });
  }
};

export const renameGroup = async (req: Request, res: Response) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
};

export const removeFromGroup = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  if (userId === req.user.id) {
    return res
      .status(400)
      .json({ success: false, message: "Cannot remove yourself" });
  }

  const chat = await Chat.findById(chatId)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!chat) {
    return res.status(404).json({ success: false, message: "Chat not found" });
  }

  // Check if the requester is the group admin
  if (chat.groupAdmin?._id.toString() !== req.user.id) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    return res
      .status(404)
      .json({ success: false, message: "User not found in chat" });
  }

  return res.json(removed);
};

export const addToGroup = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin
  if (userId === req.user.id) {
    return res
      .status(400)
      .json({ success: false, message: "can not add yourself" });
  }

  const chat = await Chat.findById(chatId)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!chat) {
    return res.status(404).json({ success: false, message: "Chat not found" });
  }

  // check if the requester is the group admin
  if (chat.groupAdmin?._id.toString() !== req.user.id) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  return res.json(added);
};
