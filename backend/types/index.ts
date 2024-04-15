import { Document } from "mongoose";

interface UserType extends Document {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
}

export { UserType };
