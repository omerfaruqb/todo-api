const taskModel = require('../models/task.model');

// Add task function
const addTask = async (title, description, userId) => {
  try {
    const id = await taskModel.addTask(title, description, userId);
    return { success: true, message: 'Task added', taskId: id };
  } catch (err) {
    return { success: false, message: 'Failed to add task: ' + err };
  }
};

// Delete task function
const deleteTask = async (id) => {
  try {
    const message = await taskModel.deleteTask(id);
    return { success: true, message: message };
  } catch (err) {
    return { success: false, message: 'Failed to delete task: ' + err };
  }
};

// Get tasks by user ID function
const getTasksByUserId = async (userId) => {
  try {
    const tasks = await taskModel.getTaskByUserId(userId);
    return { success: true, tasks: tasks };
  } catch (err) {
    return { success: false, message: 'Failed to get tasks: ' + err };
  }
};

module.exports = { addTask, deleteTask, getTasksByUserId };