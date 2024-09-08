const userService = require("../services/user.service");

const secretKey = "secret";

const addUser = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response
      .status(400)
      .json({ message: "Missing one or more required fields" }); // Bad Request
  }

  if (password.length < 8) {
    return response
      .status(400)
      .json({ message: "Password must be at least 8 characters long" }); // Bad Request
  }

  try {
    const result = await userService.addUser(name, email, password);
    const { success, message, token } = result;

    if (!success) {
      response.status(400).json({ message: message }); // Bad Request
    } else {
      response.status(201).json({ message: message, token: token }); // Created
    }
  } catch (err) {
    // console.debug(err + " in user.controller");
    response.status(500).json({ message: err.message }); // Internal Server Error
  }
};

const loginUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "Email and password are required" }); // Bad Request
    }

    const { success, message, token } = await userService.lo(
      email,
      password
    );

    if (!success) {
      response.status(401).json({ message: message }); // Unauthorized
    } else {
      response.status(200).json({ message: message, token: token }); // OK
    }
  } catch (err) {
    response.status(500).json({ error: err.message }); // Internal Server Error
  }
};


module.exports = { addUser, loginUser };
