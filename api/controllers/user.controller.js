import { errorHandler } from "../handlers/errorHandler.js";
import { createToken, verifyToken } from "../handlers/tokenHandler.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return next(
        errorHandler(200, "wrong credentials", "This Email Already Used")
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const userDoc = await newUser.save();
    const { _id, name: username, email: useremail } = userDoc._doc;
    const data = { _id, username, useremail };
    const token = await createToken(data);
    res.cookie("token", token);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const userData = await verifyToken(req);
    if (userData) {
      res.json(userData);
    } else {
      return next(errorHandler(404, "Invalid Credentials", "Token Not Found!"));
    }
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", "").json(null);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDoc = await userModel.findOne({ email });
    if (!userDoc) return next(errorHandler(200, "user not found", ""));
    const userPass = await bcryptjs.compare(password, userDoc.password);
    if (!userPass) return next(errorHandler(200, "wrong password", ""));
    const { _id, name: username, email: useremail } = userDoc._doc;
    const data = { _id, username, useremail };
    const token = await createToken(data);
    res.cookie("token", token);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
