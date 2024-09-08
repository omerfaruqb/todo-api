const db = require("../config/db.config.js");

const addTask = (title, description, userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)`,
      [title, description, userId],
      function (err) {
        if (err) {
          switch (err.message) {
            case "SQLITE_CONSTRAINT: FOREIGN KEY constraint failed":
              reject("User does not exist");
              break;
            case "SQLITE_CONSTRAINT: NOT NULL constraint failed: tasks.title":
              reject("Title is required");
              break;
            case "SQLITE_CONSTRAINT: NOT NULL constraint failed: tasks.description":
              reject("Description is required");
              break;
            default:
              reject("Error when adding data to the database");
              break;
          }
        } else {
          resolve(this.lastID); // Return the ID of the inserted row
        }
      }
    );
  });
};

const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
      if (err) {
        reject("Error when deleting data from the database");
      } else {
        resolve(`Task deleted ${this.changes}`);
      }
    });
  });
};

const getTaskByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM tasks WHERE user_id = ?`, [userId], (err, rows) => {
      if (err) {
        reject("Error when retrieving data from the database");
      } else {
        resolve(rows);
      }
    });
  });
};


module.exports = { addTask, deleteTask, getTaskByUserId };