const mongoose = require("mongoose");

const schemaOptions = {
  strict: true,
  timestamps: true,
};

const PerformanceSchema = new mongoose.Schema(
  {
    AgentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    

    Rating: {
      type: double,
      required: true,
    },
    

  },
  schemaOptions
);

module.exports = mongoose.model("AgentPerformance", PerformanceSchema);