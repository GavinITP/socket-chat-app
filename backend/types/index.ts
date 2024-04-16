import { Document, Schema } from "mongoose";

export interface UserType extends Document {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
}

export interface ChatType extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: Schema.Types.ObjectId[];
  latestMessage: Schema.Types.ObjectId;
  groupAdmin: Schema.Types.ObjectId;
}

export interface SearchQuery {
  $or?: {
    [key: string]: {
      $regex: string;
      $options: string;
    };
  }[];
}
