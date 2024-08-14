import { findUserById } from "../../model/auth.model.js";
import {
  deleteSelectedProject,
  findName,
  getAllProject,
  saveProject,
  selectedProject,
  updatedProduct,
} from "../../model/project.model.js";
import {
  deleteSelectedTask,
  findTaskName,
  getTaskOfUser,
  saveOnlyTask,
  saveTask,
  selectedTask,
  updatedTask,
} from "../../model/task.model.js";

async function createTask(req, res) {
  try {
    const {
      userId,
      projectName,
      title,
      description,
      startDate,
      endDate,
      status,
      taskStatus,
    } = req.body;

    if (!userId || !title || !description || !taskStatus) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields" });
    }

    const existingTask = await findTaskName(title);

    if (existingTask) {
      return res.status(400).json({ message: "Task already exists" });
    }

    const existingProject = await findName(projectName);

    let task;
    if (existingProject) {
      task = await saveTask(
        userId,
        projectName,
        title,
        description,
        existingProject.startDate,
        existingProject.endDate,
        existingProject.status,
        taskStatus
      );
    } else {
      task = await saveOnlyTask(
        userId,
        title,
        description,
        startDate,
        endDate,
        taskStatus
      );
    }
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getTask(req, res) {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "Please provide the user id" });
    }
    if (!findUserById) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const tasks = await getTaskOfUser(userId);
    return res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateSelectedTask(req, res) {
  try {
    const {
      userId,
      projectName,
      title,
      description,
      startDate,
      endDate,
      taskStatus,
    } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ message: "Please provide the requiured field" });
    }

    let task = await selectedTask(userId,title);
    if (!task) {
      return res.status(404).json({ message: "Project does not exist" });
    }

    if (description) {
      task=await updatedTask(userId,title, "description", description);
    }
    if (taskStatus) {
      task=await updatedTask(userId,title, "taskStatus", taskStatus);
    }
    if (!projectName && startDate) {
      task=await updatedTask(userId,title, "startDate", startDate);
    }
    if (!projectName && endDate) {
      task=await updatedTask(userId,title, "endDate", endDate);
    }

    res.status(200).json({ message: "Project updated successfully", task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    const { title,userId } = req.body;
    if (!title || !userId) {
      return res
        .status(400)
        .json({ message: "Please provide the required details" });
    }

    const task = await selectedTask(userId,title);
    if (!task) {
      return res.status(404).json({ message: "Task does not exist" });
    }

    if (task) {
      await deleteSelectedTask(title);
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { createTask, getTask, updateSelectedTask, deleteTask };
