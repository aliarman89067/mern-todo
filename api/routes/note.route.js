import express from "express";
import {
  createNote,
  getAllNotes,
  deleteNote,
  updateNote,
} from "../controllers/note.conotroller.js";

const route = express.Router();

route.post("/create", createNote);
route.get("/get-all", getAllNotes);
route.delete("/delete/:id", deleteNote);
route.post("/update", updateNote);

export default route;
