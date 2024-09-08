const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("", verifyToken, taskController.getTasksByUserId);
router.post("", verifyToken, taskController.addTask);
router.put("/:taskId", verifyToken, taskController.updateTask);
router.delete("/:taskId", verifyToken, taskController.deleteTask);

module.exports = router;
