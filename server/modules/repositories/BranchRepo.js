const Branch = require("../models/Branch");

const GetBranches = async () => {
  try {
    const branches = await Branch.findAll();
    const Allbranches = branches.map((b) => {
      return {
        ...b.toJSON(),
        name: JSON.parse(b.name),
        city: JSON.parse(b.city),
        address: JSON.parse(b.address),
      };
    });
    return Allbranches;
  } catch (error) {
    throw new Error("Error fetching branches: " + error.message);
  }
};

const GetBranchesByStates = async () => {
  try {
    const branchesRaw = await Branch.findAll();
    const branches = branchesRaw.map((b) => {
      return {
        ...b.toJSON(),
        name: JSON.parse(b.name),
        city: JSON.parse(b.city),
        address: JSON.parse(b.address),
      };
    });

    const statesMap = {};

    for (const branch of branches) {
      const { state, city } = branch;

      if (!statesMap[state]) {
        statesMap[state] = { state, cities: [] };
      }

      const stateEntry = statesMap[state];

      let cityEntry = stateEntry.cities.find((c) => c.city?.ar === city?.ar);
      if (!cityEntry) {
        cityEntry = { city, branches: [] };
        stateEntry.cities.push(cityEntry);
      }

      cityEntry.branches.push(branch);
    }

    return Object.values(statesMap);
  } catch (error) {
    throw new Error("Error fetching branches: " + error.message);
  }
};

const GetBranchById = async (id) => {
  try {
    const branch = await Branch.findOne({ where: { id } });
    return {
      ...branch.toJSON(),
      name: JSON.parse(branch.name),
      city: JSON.parse(branch.city),
      address: JSON.parse(branch.address),
    };
  } catch (error) {
    throw new Error("Error fetching a branch: " + error.message);
  }
};

const CreateBranch = async (branchData) => {
  try {
    const newBranch = await Branch.create(branchData);
    return newBranch;
  } catch (error) {
    throw new Error("Error adding a new branch: " + error.message);
  }
};

const UpdateBranch = async (id, branchData) => {
  try {
    const branch = await Branch.findOne({ where: { id } });
    await branch.update(branchData);
    return branch;
  } catch (error) {
    throw new Error("Error updating branch: " + error.message);
  }
};

const DeleteBranch = async (id) => {
  try {
    const branch = await Branch.findOne({ where: { id } });
    await branch.destroy();
    return branch;
  } catch (error) {
    throw new Error("Error deleting branch: " + error.message);
  }
};

module.exports = {
  GetBranches,
  GetBranchesByStates,
  GetBranchById,
  CreateBranch,
  UpdateBranch,
  DeleteBranch,
};
