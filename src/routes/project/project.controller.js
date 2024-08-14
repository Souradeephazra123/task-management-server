import {
  deleteSelectedProject,
  findName,
  getAllProject,
  saveProject,
  selectedProject,
  updatedProduct,
} from "../../model/project.model.js";

async function createProject(req, res) {
  try {
    const {
      userId,
      name,
      status,
      description,
      startDate,
      endDate,
      priority,
      projectMangaer,
      projectTeamMembers,
    } = req.body;

    if (
      !userId ||
      !name ||
      !status ||
      !startDate ||
      !endDate ||
      !priority ||
      !projectMangaer
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields" });
    }

    const existingProject = await findName(name);

    if (existingProject) {
      return res.status(400).json({ message: "Project already exists" });
    }

    const project = await saveProject(
      userId,
      name,
      status,
      description,
      startDate,
      endDate,
      priority,
      projectMangaer,
      projectTeamMembers
    );

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getProject(req, res) {
  try {
    const { userId } = req.body;
    const projects = await getAllProject(userId);
    return res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateSelectedProject(req, res) {
  try {
    const { userId, name, status, description, priority, projectTeamMembers } =
      req.body;
    if (!name || !userId) {
      return res
        .status(400)
        .json({ message: "Please provide the project name" });
    }

    let project = await selectedProject(userId, name);
    if (!project) {
      return res.status(404).json({ message: "Project does not exist" });
    }

    if (status) {
      project = await updatedProduct(userId, name, "status", status);
    }
    if (description) {
      project = await updatedProduct(userId, name, "description", description);
    }
    if (priority) {
      project = await updatedProduct(userId, name, "priority", priority);
    }
    if (projectTeamMembers) {
      project = await updatedProduct(
        userId,
        name,
        "projectTeamMembers",
        projectTeamMembers
      );
    }

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteProject(req, res) {
  try {
    const {userId, name } = req.body;
    if (!name || !userId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required details" });
    }

    const project = await selectedProject(userId,name);
    if (!project) {
      return res.status(404).json({ message: "Project does not exist" });
    }
    

    if (name) {
      await deleteSelectedProject(name);
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { createProject, getProject, updateSelectedProject, deleteProject };
