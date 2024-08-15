import express from "express";
import { createTask, deleteTask, getTask, updateSelectedTask } from "./task.controller.js";

const TaskRouter = express.Router();

TaskRouter.post("/task", createTask);
TaskRouter.get("/task/:id", getTask);
TaskRouter.put("/task", updateSelectedTask);
TaskRouter.delete("/task", deleteTask);

export { TaskRouter };
