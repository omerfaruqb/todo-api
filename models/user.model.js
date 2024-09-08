const db = require("../config/db.config");

const addUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, password],
      function (err) {
        if (err) {
          switch (err.message) {
            case 'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email':
              reject("Email already exists");
              break;
            case 'SQLITE_CONSTRAINT: NOT NULL constraint failed: users.name':
              reject("Name is required");
              break;
            case 'SQLITE_CONSTRAINT: NOT NULL constraint failed: users.email':
              reject("Email is required");
              break;
            case 'SQLITE_CONSTRAINT: NOT NULL constraint failed: users.password':
              reject("Password is required");
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

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
      if (err) {
        reject("Error when deleting data from the database");
      } else {
        resolve(`Row(s) deleted ${this.changes}`);
      }
    });
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) {
        reject("Error when retrieving data from the database");
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = { addUser, deleteUser, getUserByEmail };
