const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("", verifyToken, taskController.addTask);
router.delete("delete", verifyToken, taskController.deleteTask);

module.exports = router;
