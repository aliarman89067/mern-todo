import express from "express";
import {
  createTodo,
  getAllTodo,
  updateComplete,
  deleteTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

const route = express.Router();

route.post("/create", createTodo);
route.get("/get-all", getAllTodo);
route.post("/complete/:id", updateComplete);
route.delete("/delete/:id", deleteTodo);
route.post("/update", updateTodo);

export default route;
