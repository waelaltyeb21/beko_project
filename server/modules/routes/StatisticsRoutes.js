const { isAuthenticated } = require("../../middlewares/Auth");
const {
  GetDashboardStatistics,
} = require("../controllers/StatisticsController");

const StatisticsRoutes = require("express").Router();

StatisticsRoutes.get("/", isAuthenticated, GetDashboardStatistics);

module.exports = StatisticsRoutes;
