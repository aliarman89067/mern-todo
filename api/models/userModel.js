import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
