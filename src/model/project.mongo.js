import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["on-progress", "started", "completed"],
    },
    description: String,
    startDate: Date,
    endDate: Date,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    projectMangaer: {
      type: String,
      required: true,
    },
    projectTeamMembers: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
