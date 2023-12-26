const userModel = require("../Models/userModel");

async function findAvailableAgent(specialization) {
  const newAgent = await userModel.findOne({
    specialization: specialization,
    role: 'agent',
  });

  return newAgent ? newAgent._id : null;
}

module.exports = {
  findAvailableAgent,
};