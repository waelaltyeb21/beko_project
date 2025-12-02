const {
  GetBranches,
  GetBranchById,
  CreateBranch,
  UpdateBranch,
  DeleteBranch,
  GetBranchesByStates,
} = require("../repositories/BranchRepo");

const GetAllBranches = async (req, res) => {
  try {
    const branches = await GetBranches();
    res.status(200).json(branches);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching branches: " + error.message });
  }
};

const GetAllBranchesByStates = async (req, res) => {
  try {
    const branches = await GetBranchesByStates();
    res.status(200).json(branches);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching branches: " + error.message });
  }
};

const GetBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await GetBranchById(id);

    if (!branch) return res.status(404).json({ message: "Branch not found" });

    res.status(200).json(branch);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching branch: " + error.message });
  }
};

const AddBranch = async (req, res) => {
  try {
    const { name, state, city, address, mapsUrl, status } = req.body;
    const branchData = {
      state,
      name,
      city,
      address,
      mapsUrl,
      status,
    };
    const newBranch = await CreateBranch(branchData);

    if (!newBranch)
      return res.status(400).json({ message: "Failed to create branch" });

    return res
      .status(201)
      .json({ message: "Branch created successfully", branch: newBranch });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding branch: " + error.message });
  }
};

const UpdateTheBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, state, city, address, mapsUrl, status } = req.body;
    const branchData = {
      state,
      name,
      city,
      address,
      mapsUrl,
      status,
    };

    const updatedBranch = await UpdateBranch(id, branchData);

    if (!updatedBranch)
      return res.status(400).json({ message: "Failed to update branch" });

    return res
      .status(200)
      .json({ message: "Branch updated successfully", branch: updatedBranch });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating branch: " + error.message });
  }
};

const DeleteTheBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBranch = await DeleteBranch(id);
    if (!deletedBranch)
      return res.status(400).json({ message: "Failed to delete branch" });

    return res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting branch: " + error.message });
  }
};

module.exports = {
  GetAllBranches,
  GetAllBranchesByStates,
  GetBranch,
  AddBranch,
  UpdateTheBranch,
  DeleteTheBranch,
};
