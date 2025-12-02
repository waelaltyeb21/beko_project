const { isAuthenticated } = require("../../middlewares/Auth");
const {
  AddSupervisor,
  UpdateTheSupervisor,
} = require("../controllers/SupervisorController");

const SupervisorRoutes = require("express").Router();

// SupervisorRoutes.post("/add-supervisor", isAuthenticated, AddSupervisor);
SupervisorRoutes.put(
  "/update-supervisor/:id",
  isAuthenticated,
  UpdateTheSupervisor
);

module.exports = SupervisorRoutes;
