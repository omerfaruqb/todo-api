const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret";

const verifyToken = (request, response, next) => {
    const header = request.headers["authorization"];
    const token = header && header.split(" ")[1];

    if (!token) {
        return response.status(401).json({ message: "Token not found" }); // Unauthorized
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return response.status(403).json({ message: "Invalid token" }); // Forbidden
        }
        request.body.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;