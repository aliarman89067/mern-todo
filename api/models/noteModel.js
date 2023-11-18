import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const noteModel = mongoose.model("note", noteSchema);
export default noteModel;
