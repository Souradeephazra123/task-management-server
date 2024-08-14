import TaskDataBase from "../model/task.mongo.js";
import ProjectDatabase from "../model/project.mongo.js";
import AuthDataBase from "../model/auth.mongo.js";

async function findName(name) {
  const projectName = await ProjectDatabase.findOne(
    {
      name,
    },
    { _id: 0, __v: 0 }
  );
  return projectName;
}
async function findTaskName(name) {
  const taskName = await TaskDataBase.findOne(
    {
      name,
    },
    { _id: 0, __v: 0 }
  );
  return taskName;
}

async function saveTask(
  userId,
  projectName,
  title,
  description,
  startDate,
  endDate,
  status,
  taskStatus
) {
  try {
    const task = new TaskDataBase({
      userId,
      projectName,
      title,
      description,
      startDate,
      endDate,
      status,
      taskStatus,
    });

    return await task.save();
  } catch (error) {
    console.log("Unable to save the project", error.message);
  }
}

async function saveOnlyTask(
  userId,
  title,
  description,
  startDate,
  endDate,
  taskStatus
) {
  try {
    const task = new TaskDataBase({
      userId,
      title,
      description,
      startDate,
      endDate,
      taskStatus,
    });

    return await task.save();
  } catch (error) {
    console.log("Unable to save the project", error.message);
  }
}

async function getTaskOfUser(userId) {
  try {
    // const user = await AuthDataBase.findOne({ userId: userId });
    return await TaskDataBase.find({ userId: userId });
  } catch (error) {
    console.log("Unable to get all projects", error.message);
  }
}

async function selectedTask(userId, name) {
  try {
    const allTaskOfUser = await getTaskOfUser(userId);
    const specificTask = allTaskOfUser.find((task) => task.title === name);
    return specificTask;
  } catch (error) {
    console.log("Unable to get the project", error.message);
  }
}

async function updatedTask(userId, name, property, value) {
  try {
    const task = await selectedTask(userId, name);
    task[property] = value;
    return await task.save();
  } catch (error) {
    console.log("Unable to update the project", error.message);
  }
}

async function deleteSelectedTask(name) {
  try {
    return await TaskDataBase.findOneAndDelete({ title: name });
  } catch (error) {
    console.log("Unable to delete the task", error.message);
    return { message: "Unable to delete the task", error: error.message };
  }
}
export {
  //   saveProject,
  saveTask,
  saveOnlyTask,
  findName,
  findTaskName,
  //   getAllProject,
  getTaskOfUser,
  selectedTask,
  //   selectedProject,
  //   updatedProduct,
  updatedTask,
  deleteSelectedTask,
};
