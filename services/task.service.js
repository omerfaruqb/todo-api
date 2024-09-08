const taskModel = require("../models/task.model");

// Add task function
const addTask = async (title, description, userId) => {
  try {
    const id = await taskModel.addTask(title, description, userId);
    return { success: true, message: "Task added", taskId: id };
  } catch (err) {
    return { success: false, message: "Failed to add task: " + err };
  }
};

// Delete task function
const deleteTask = async (taskId) => {
  try {
    const success = (await taskModel.deleteTask(taskId)) > 0;
    const message = success ? "Task deleted" : "Task not found";

    return { success: success, message: message };
  } catch (err) {
    return { success: false, message: "Failed to delete task" };
  }
};

// Get tasks by user ID function
const getTasksByUserId = async (userId, page, limit) => {
  try {
    const { tasks, totalPages } = await taskModel.getTasksByUserId(
      userId,
      page,
      limit
    );

    return {
      success: true,
      message: "Tasks retrieved successfully",
      data: {
        data: tasks,
        page: page,
        limit: limit,
        total: totalPages,
      },
    };
  } catch (err) {
    return { success: false, message: "Failed to get tasks: " + err };
  }
};

const updateTask = async (taskId, title, description) => {
  try {
    const success =
      (await taskModel.updateTask(taskId, title, description)) > 0;

    if (!success) {
      return { success: false, message: "Task not found" };
    } else {
      return {
        success: true,
        message: "Task updated",
        data: { taskId, title, description },
      };
    }
  } catch (err) {
    return { success: false, message: "Failed to update task: " + err };
  }
};

module.exports = { addTask, deleteTask, getTasksByUserId, updateTask };
