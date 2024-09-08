const sqlite = require("sqlite3").verbose();

// Create a new database
const db = new sqlite.Database("./db/todo.db", (err) => {
  if (err) {
    console.debug("Error when creating the database", err);
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )`
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`
    );
  }
});

// Export the database connection
module.exports = db;