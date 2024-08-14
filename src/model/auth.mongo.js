import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    userid: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Auth", AuthSchema);