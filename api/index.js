//Import
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";
import noteRouter from "./routes/note.route.js";
import cors from "cors";
import path from "path";

const app = express();

//Middleware
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
//Routes
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);
app.use("/api/note", noteRouter);

app.get("/test", (req, res) => {
  res.send("Hello World");
});

//Next Middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const name = error?.name || "Secondary Error";
  return res.status(statusCode).json({
    success: false,
    message,
    name,
    statusCode,
  });
});
//Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database error: " + err);
  });

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
