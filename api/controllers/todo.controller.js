import { errorHandler } from "../handlers/errorHandler.js";
import { verifyToken } from "../handlers/tokenHandler.js";
import todoModel from "../models/todoModel.js";

export const createTodo = async (req, res, next) => {
  try {
    const { text, id } = req.body;
    const todoDoc = await todoModel.create({ text, creator: id });
    res.status(201).json(todoDoc);
  } catch (error) {
    next(error);
  }
};

export const getAllTodo = async (req, res, next) => {
  try {
    const userData = await verifyToken(req);
    if (userData) {
      const todosList = await todoModel
        .find({ creator: userData._id })
        .sort({ createdAt: "desc" });
      res.json(todosList);
    } else {
      return next(errorHandler(400, "invalid credentials", "token not found"));
    }
  } catch (error) {
    next(error);
  }
};

export const updateComplete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findTodo = await todoModel.findById(id);
    const todoDoc = await todoModel.findByIdAndUpdate(
      id,
      {
        $set: { complete: !findTodo.complete },
      },
      { new: true }
    );
    res.json(todoDoc);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    await todoModel.findByIdAndDelete(id);
    res.json("Deleted");
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { text, id } = req.body;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      {
        $set: { text },
      },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
