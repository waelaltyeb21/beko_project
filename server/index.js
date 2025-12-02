const express = require("express");
const app = express();

// Enviroment Variables
require("dotenv").config();

// Connect to the database
const { connectDB } = require("./config/db");
connectDB();

const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./middlewares/ErrorHandler");

// Server Config
app.use(express.json());
app.use(cookieParser());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(ErrorHandler);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json(
    "Hello World, " +
      `This is Beko Meat Products Server With Database: ${process.env.DB_NAME}`
  );
});

// App Routes
const BranchRoutes = require("./modules/routes/BranchRoutes");
const ProductRouter = require("./modules/routes/ProductRoutes");
const BlogRoutes = require("./modules/routes/BlogRoutes");
const SupervisorRoutes = require("./modules/routes/SupervisorRoutes");
const StatisticsRoutes = require("./modules/routes/StatisticsRoutes");
const AuthRoutes = require("./modules/routes/AuthRoutes");

app.use("/api/branches", BranchRoutes);
app.use("/api/blogs", BlogRoutes);
app.use("/api/products", ProductRouter);
app.use("/api/supervisors", SupervisorRoutes);
app.use("/api/statistics", StatisticsRoutes);
app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Beko Meat Products Server Is Running...!");
});
