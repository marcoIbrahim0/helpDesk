const mongoose = require("mongoose");

const schemaOptions = {
  strict: true,
  timestamps: true,
};

const workflowSchema = new mongoose.Schema(
  {
    TicketId: {
      type: String,
      required: true,
    },
    
    Description: {
      type: String,
      required: true,
    },


    
   
  },
  schemaOptions
);

module.exports = mongoose.model("workflow", workflowSchema);
