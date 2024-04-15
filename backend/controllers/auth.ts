import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserType } from "../types";
import { Request, Response } from "express";

const generateToken = (user: UserType) => {
  const payload = {
    user: {
      id: user._id,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    const hashedPassword = await hashPassword(password);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // expires in 24 hours
    });

    return res.json({ success: true, name, email, role, token });
  } catch (err) {
    console.error((err as Error).message);
    return res.status(500).send("Server Error");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // expires in 24 hours
    });

    res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Server Error");
  }
};
