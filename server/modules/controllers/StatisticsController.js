const { GetStatistics } = require("../repositories/StatisticsRepo");

const GetDashboardStatistics = async (req, res) => {
  try {
    const dashboardStatistics = await GetStatistics();
    return res.status(200).json(dashboardStatistics);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching dashboard statistics: " + error.message,
    });
  }
};

module.exports = { GetDashboardStatistics };
