global.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzI1NzgyODI2LCJleHAiOjE3MjU3ODY0MjZ9.NOvddkvD6ShwCjvXYwAm9dfCZK0qnxuBxbTLv456_Mo";
const db = require("./config/db.config");

const register = function () {
  fetch("http://localhost:3000/register", {
    method: "POST", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Specify the request headers
    },
    body: JSON.stringify({
      // Convert the JavaScript object to a JSON string
      name: "omer",
      email: "omer5@gmail.com",
      password: "12345678",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Code:", response.status + ", Text:", response.statusText);
      }
      return response.json(); // parse JSON data
    })
    .then((data) => {
      global.token = data.token;
      console.log(data); // display data
    })
    .catch((error) => console.error(error)); // handle errors
};

const addTask = function () {
  fetch("http://localhost:3000/todos", {
    method: "POST", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Specify the request headers
      Authorization: `Bearer ${global.token}`,
    },
    body: JSON.stringify({
      // Convert the JavaScript object to a JSON string
      title: "Design a website",
      description: "Don't forget to add a authentication layer",
      id: 1,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Code:", response.status + ", Text:", response.statusText);
      }
      return response.json(); // parse JSON data
    })
    .then((data) => {
      console.log(data); // display data
    })
    .catch((error) => console.error(error)); // handle errors
};

const login = function () {
  fetch("http://localhost:3000/login", {
    method: "POST", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Specify the request headers
    },
    body: JSON.stringify({
      // Convert the JavaScript object to a JSON string
      email: "omer5@gmail.com",
      password: "12345678",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Code:", response.status + ", Text:", response.statusText);
      }
      return response.json(); // parse JSON data
    })
    .then((data) => {
      global.token = data.token;
      console.log(data); // display data
    })
    .catch((error) => console.error(error)); // handle errors
};

const dbTask = (id) => {
  db.run(`UPDATE tasks SET title = 'title' WHERE id = ?`, [id], (err, rows) => {
    if (err) {
      console.log("Error when retrieving data from the database");
    } else {
      console.log(rows); // display data
    }
  });
};

const updateTask = function () {
  fetch("http://localhost:3000/todos/15", {
    method: "PUT", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Specify the request headers
      Authorization: `Bearer ${global.token}`,
    },
    body: JSON.stringify({
      // Convert the JavaScript object to a JSON string
      title: "Change the theme",
      description: "Don't forget!",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        //console.log(response);
        console.log("Code:", response.status + ", Text:", response.statusText);
      }
      return response.json(); // parse JSON data
    })
    .then((data) => {
      console.log(data); // display data
    })
    .catch((error) => console.error(error)); // handle errors
};

const deleteTask = function () {
  fetch("http://localhost:3000/todos/14", {
    method: "DELETE", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Specify the request headers
      Authorization: `Bearer ${global.token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Code:", response.status + ", Text:", response.statusText);
      }
      return response.json(); // parse JSON data
    })
    .then((data) => {
      console.log(data); // display data
    })
    .catch((error) => console.error(error)); // handle errors
};

const getTasks = function () {
  fetch("http://localhost:3000/todos?page=1&limit=3", {
    method: "GET", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Specify the request headers
      Authorization: `Bearer ${global.token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Code:", response.status + ", Text:", response.statusText);
      }
      return response.json(); // parse JSON data
    })
    .then((resData) => {
      const { message, data } = resData;
      const { tasks, page, limit, total } = data;
      console.log(data);
    })
    .catch((error) => console.error(error)); // handle errors
};

//register()
//login()
//addTask();
//dbTask(100);
//updateTask();
//deleteTask();
getTasks();
