const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret";

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found" }); // Unauthorized
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({
          message: req.path === "/update" ? "Forbidden" : "Unauthorized",
        });
    }
    req.body.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
