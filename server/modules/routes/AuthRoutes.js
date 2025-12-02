const { isAuthenticated } = require("../../middlewares/Auth");
const {
  Login,
  RefreshToken,
  ResetPassword,
} = require("../controllers/AuthController");

const AuthRoutes = require("express").Router();

AuthRoutes.post("/login", Login);
AuthRoutes.get("/refresh_token", RefreshToken);
AuthRoutes.post("/reset_password", isAuthenticated, ResetPassword);

module.exports = AuthRoutes;
