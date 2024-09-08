const taskService = require("../services/task.service");

// Add task function
const addTask = async (request, response) => {
  const { title, description, userId } = request.body;
  
  try {
    const result = await taskService.addTask(title, description, userId);
    const { success, message, taskId } = result;

    if (!success) {
      response.status(400).json({ message: message }); // Bad Request
    } else {
      response.status(201).json({
        message: message,
        data: {
          id: taskId,
          title: title,
          description: description,
        },
      }); // Created
    }
  } catch (err) {
    response.status(500).json({ message: err.message }); // Internal Server Error
  }
};

// Delete task function
const deleteTask = async (request, response) => {
  const { id } = request.body;

  try {
    const result = await taskService.deleteTask(id);
    const { success, message } = result;

    if (!success) {
      response.status(400).json({ message: message }); // Bad Request
    } else {
      response.status(200).json({ message: message }); // OK
    }
  } catch (err) {
    response.status(500).json({ message: err.message }); // Internal Server Error
  }
};

// Get tasks by user ID function
const getTasksByUserId = async (request, response) => {
  const { id: userId } = request.body;

  try {
    const result = await taskService.getTasksByUserId(userId);
    const { success, tasks, message } = result;

    if (!success) {
      response.status(400).json({ message: message }); // Bad Request
    } else {
      response.status(200).json({ data: tasks }); // OK
    }
  } catch (err) {
    response.status(500).json({ message: err.message }); // Internal Server Error
  }
};

module.exports = { addTask, deleteTask, getTasksByUserId };
