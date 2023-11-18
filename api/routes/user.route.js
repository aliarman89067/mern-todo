import express from "express";
import {
  register,
  verifyUser,
  logoutUser,
  loginUser,
} from "../controllers/user.controller.js";

const route = express.Router();

route.post("/register", register);
route.get("/verify-user", verifyUser);
route.get("/logout", logoutUser);
route.post("/login", loginUser);

export default route;
