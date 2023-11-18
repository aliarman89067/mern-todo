import { verifyToken } from "../handlers/tokenHandler.js";
import noteModel from "../models/noteModel.js";

export const createNote = async (req, res, next) => {
  try {
    const { text } = req.body;
    const userData = await verifyToken(req);
    const newNote = await noteModel.create({ text, creator: userData._id });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const userData = await verifyToken(req);
    const notesDoc = await noteModel
      .find({ creator: userData._id })
      .sort({ createdAt: "desc" });
    res.json(notesDoc);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    await noteModel.findByIdAndDelete(id);
    res.json("deleted");
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { id, noteText } = req.body;
    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      {
        $set: { text: noteText },
      },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};
