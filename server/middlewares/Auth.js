// Authentication & Authorization Middleware
const GenerateTokens = require("../services/GenerateTokens");

const isAuthenticated = (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Token Missing" });
    }

    const VerifyToken = GenerateTokens.verifyToken(token);
    req.user = VerifyToken;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "jwt expired" });
    }
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};

const isAuthorized = (...roles) => {
  return (req, res, next) => {
    console.log("User: ", req.user);
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = { isAuthenticated, isAuthorized };
