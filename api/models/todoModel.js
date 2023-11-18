import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("todo", todoSchema);
export default todoModel;
