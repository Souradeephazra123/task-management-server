import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["on-progress", "started", "completed"],
    },
    taskStatus: {
      type: String,
      enum: ["pending", "started", "done"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
