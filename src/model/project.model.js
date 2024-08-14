import ProjectDatabase from "../model/project.mongo.js";

async function findName(name) {
  const projectName = await ProjectDatabase.findOne(
    {
      name,
    },
    { _id: 0, __v: 0 }
  );
  return projectName;
}

async function saveProject(
  userId,
  name,
  status,
  description,
  startDate,
  endDate,
  priority,
  projectMangaer,
  projectTeamMembers
) {
  try {
    const project = new ProjectDatabase({
      userId,
      name,
      status,
      description,
      startDate,
      endDate,
      priority,
      projectMangaer,
      projectTeamMembers,
    });

    return await project.save();
  } catch (error) {
    console.log("Unable to save the project", error.message);
  }
}

async function getAllProject(userId) {
  try {
    return await ProjectDatabase.find({ userId: userId }, { _id: 0, __v: 0 });
  } catch (error) {
    console.log("Unable to get all projects", error.message);
  }
}

async function selectedProject(userId, name) {
  try {
    const specificProject = await ProjectDatabase.findOne({
      userId: userId,
      name: name,
    });
    if (!specificProject) {
      return { message: "No project found" };
    }
    return specificProject;
  } catch (error) {
    console.log("Unable to get the project", error.message);
  }
}

async function updatedProduct(userId, name, property, value) {
  try {
    const project = await selectedProject(userId, name);
    project[property] = value;
    return await project.save();
  } catch (error) {
    console.log("Unable to update the project", error.message);
  }
}

async function deleteSelectedProject(name) {
  try {
    return await ProjectDatabase.findOneAndDelete({ name });
  } catch (error) {
    console.log("Unable to delete the project", error.message);
    return { message: "Unable to delete the project", error: error.message };
  }
}
export {
  saveProject,
  findName,
  getAllProject,
  selectedProject,
  updatedProduct,
  deleteSelectedProject,
};
