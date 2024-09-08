const userService = require("../services/user.service");

const secretKey = "secret"; // Consider moving this to a config file or environment variable

// Add a new user
const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing one or more required fields" }); // Bad Request
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long" }); // Bad Request
  }

  try {
    const result = await userService.addUser(name, email, password);
    const { success, message, token } = result;

    if (!success) {
      return res.status(400).json({ message: message }); // Bad Request
    } else {
      return res.status(201).json({ message: message, token: token }); // Created
    }
  } catch (err) {
    // Log error for debugging purposes (consider using a logger)
    // console.debug(err + " in user.controller");
    return res.status(500).json({ message: err.message }); // Internal Server Error
  }
};

// Log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" }); // Bad Request
  }

  try {
    const { success, message, token } = await userService.loginUser(email, password);

    if (!success) {
      return res.status(401).json({ message: message }); // Unauthorized
    } else {
      return res.status(200).json({ message: message, token: token }); // OK
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); // Internal Server Error
  }
};

module.exports = { addUser, loginUser };
