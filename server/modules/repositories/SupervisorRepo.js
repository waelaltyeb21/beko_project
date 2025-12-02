const Supervisor = require("../models/Supervisor");

const GetSupervisor = async (email) => {
  try {
    const supervisor = await Supervisor.findOne({ where: { email } });
    return supervisor;
  } catch (error) {
    throw new Error("error fetching a supervisor: " + error.message);
  }
};

const CreateSupervisor = async (supervisorData) => {
  try {
    const newSupervisor = await Supervisor.create(supervisorData);
    return newSupervisor;
  } catch (error) {
    throw new Error("Error adding a new supervisor: " + error.message);
  }
};

const UpdateSupervisor = async (id, supervisorData) => {
  try {
    // Get the supervisor
    const supervisor = await Supervisor.findOne({ where: { id } });
    // Update supervior data
    await supervisor.update(supervisorData);
    // Return the updated supervisor
    return supervisor;
  } catch (error) {
    throw new Error("Error updating supervisor: " + error.message);
  }
};

module.exports = {
  GetSupervisor,
  CreateSupervisor,
  UpdateSupervisor,
};
