const express = require('express');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');

const app = express(); // create express app
const port = 3000; // define the port

app.use(express.json()); // use express json middleware to parse json body
app.use(userRoutes);
app.use('/todos', taskRoutes);

app.listen(port, () => { // listen for incoming requests
  console.log(`Server is running on port ${port}`);
});