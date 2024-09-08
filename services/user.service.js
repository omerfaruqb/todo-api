const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret"; // Replace with your actual secret key

// Add user function
const addUser = async (name, email, password) => {
  try {
    const id = await userModel.addUser(name, email, password);
    const token = generateToken(id);
    return { success: true, message: "User added", token: token };
  } catch (err) {
    return { success: false, message: "Failed to add user: " + err };
  }
};

// Authenticate user function
const loginUser = async (email, password) => {
  try {
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return { success: false, message: "User not found" };
    } else if (user.password !== password) {
      return { success: false, message: "Wrong password" };
    } else {
      const token = generateToken(user.id);
      return { success: true, message: "User authenticated", token: token };
    }
  } catch (err) {
    return { success: false, message: err };
  }
};


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { addUser, loginUser };
