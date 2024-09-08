global.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzI1NzcyNjY5LCJleHAiOjE3MjU3NzYyNjl9.On_2-ydL1Z_d8YRSK0ET-HfassJjM6MoySeCAq9z1dU';

const register = function () {
  fetch("http://localhost:3000/register", {
    method: "POST", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Specify the request headers
    },
    body: JSON.stringify({
      // Convert the JavaScript object to a JSON string
      name: "omer",
      email: "omer4@gmail.com",
      password: "1" * 8,
      // token: "123",
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

//register();
addTask();
