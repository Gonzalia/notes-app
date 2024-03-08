import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUser = req.session.userId;

  try {
    if (!authenticatedUser) {
      throw createHttpError(401, "Unauthorized");
    }

    const user = await UserModel.findById(authenticatedUser)
      .select("+email ")
      .exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}
export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    if (!userData.username || !userData.password) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await UserModel.findOne({ username: userData.username })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(
      userData.password,
      user.password || ""
    );

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
