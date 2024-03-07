import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}
export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    rawPassword: req.body.password,
  };

  try {
    if (!userData.username || !userData.email || !userData.rawPassword) {
      throw createHttpError(404, "Parameters missing");
    }
    const existingUsername = await UserModel.findOne({
      username: userData.username,
    }).exec();
    if (existingUsername) {
      throw createHttpError(409, "Username already taken");
    }

    const existingEmail = await UserModel.findOne({ email: userData.email });
    if (existingEmail) {
      throw createHttpError(409, "Email already taken");
    }

    const password = await bcrypt.hash(userData.rawPassword, 10);

    const newUser = await UserModel.create({
      username: userData.username,
      email: userData.email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
