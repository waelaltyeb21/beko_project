const { isAuthenticated } = require("../../middlewares/Auth");
const {
  GetAllBranches,
  GetAllBranchesByStates,
  GetBranch,
  AddBranch,
  UpdateTheBranch,
  DeleteTheBranch,
} = require("../controllers/BranchController");

const BranchRoutes = require("express").Router();

BranchRoutes.get("/", GetAllBranches);
BranchRoutes.get("/all-branches", GetAllBranchesByStates);
BranchRoutes.get("/:id", GetBranch);
BranchRoutes.post("/add-branch", isAuthenticated, AddBranch);
BranchRoutes.put("/update-branch/:id", isAuthenticated, UpdateTheBranch);
BranchRoutes.delete("/delete-branch/:id", isAuthenticated, DeleteTheBranch);

module.exports = BranchRoutes;
