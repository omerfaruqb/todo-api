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
        resolve(this.changes);
      }
    });
  });
};

const getTasksByUserId = (userId, page, limit) => {
  const offset = (page - 1) * limit;
  const totalTasks = db.get(
    `SELECT COUNT(*) as total FROM tasks WHERE user_id = ?`, [userId]
  );
  const totalPages = Math.ceil(totalTasks / limit);

  if (page > totalPages) {
    return Promise.reject("Page number is invalid");
  }

  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM tasks WHERE user_id = ? LIMIT ? OFFSET ?`,
      [userId, limit, offset],
      (err, rows) => {
        if (err) {
          reject("Error when retrieving data from the database");
        } else {
          resolve({
            tasks: rows,
            totalPages: totalPages,
          });
        }
      }
    );
  });
};

const getTaskById = (id) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM tasks WHERE id = ?`, [id], (err, row) => {
      if (err) {
        reject("Error when retrieving data from the database");
      } else {
        resolve(row);
      }
    });
  });
};

const updateTask = (id, title, description) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE tasks SET title = ?, description = ? WHERE id = ?`,
      [title, description, id],
      function (err) {
        if (err) {
          reject("Error when updating data from the database");
        } else {
          resolve(this.changes); // Return the number of rows affected
        }
      }
    );
  });
};

module.exports = { addTask, deleteTask, getTasksByUserId, updateTask };
