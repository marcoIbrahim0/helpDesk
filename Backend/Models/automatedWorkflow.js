const mongoose = require("mongoose");

const schemaOptions = {
  strict: true,
  timestamps: true,
};

const automatedWorkflow = new mongoose.Schema(
  {
    Issue: {
        type: String,
        required: true,
      },


   subIssue: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    

  },
  schemaOptions
);

module.exports = mongoose.model("automatedWorkflow", automatedWorkflow);