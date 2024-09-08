const taskService = require("../services/task.service");

// Add task function
const addTask = async (req, res) => {
  const { title, description, userId } = req.body;
  
  try {
    const result = await taskService.addTask(title, description, userId);
    const { success, message, taskId } = result;

    if (!success) {
      res.status(400).json({ message: message }); // Bad Request
    } else {
      res.status(201).json({
        message: message,
        data: {
          id: taskId,
          title: title,
          description: description,
        },
      }); // Created
    }
  } catch (err) {
    res.status(500).json({ message: err.message }); // Internal Server Error
  }
};


const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description } = req.body;

  try {
    const result = await taskService.updateTask(taskId, title, description);
    const { success, message, data } = result;

    if (!success) {
      res.status(404).json({ message: message }); // Not Found
    } else {
      res.status(200).json({ message: message, data: data }); // OK
    }
  } catch (err) {
    res.status(500).json({ message: err.message }); // Internal Server Error
  }
}

// Delete task function
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const result = await taskService.deleteTask(taskId);
    const { success, message } = result;

    if (!success) {
      res.status(400).json({ message: message }); // Bad Request
    } else {
      res.status(204).json({ message: message }); // OK
    }
  } catch (err) {
    res.status(500).json({ message: err.message }); // Internal Server Error
  }
};

const getTasksByUserId = async (req, res) => {
  const { userId } = req.body;
  const { page, limit } = req.query;

  try {
    const result = await taskService.getTasksByUserId(userId, page, limit);
    const { success, message, data } = result;

    if (!success) {
      res.status(400).json({ message: message }); // Bad Request
    } else {
      res.status(200).json({ message: message, data: data }); // OK
    }
  } catch (err) {
    res.status(500).json({ message: err.message }); // Internal Server Error
  }
}

module.exports = { addTask, deleteTask, updateTask, getTasksByUserId };
