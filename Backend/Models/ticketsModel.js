const mongoose = require("mongoose");

const schemaOptions = {
  strict: true,
  timestamps: true,
};

const TicketsSchema = new mongoose.Schema(
  {

    Description: {
      type: String,
      required: true,
    },

    Status:{
      type: String,
      required: true,
    },

    AssignedAgentID: {
      type: String,
      required: true,
    },
    AssignedAgentEmail: {
      type: String,
      required: true,
    },
    AssignedAgentPerformance:{
      type: Number,
      required:false,

    },
    Priority:{
      type: String,
      required:true,    
    },
    Category:{
      type:String,
      required:true,
    },
    subCategory:{
      type: String,
      required:true,
    },
    recipientMail:{
      type: String,
      required:true,
    },
    senderMail:{
      type: String,
      required: true,
    },
    softwareQueue: {
      type: Number,
      required: false,
    },
    hardwareQueue: {
      type: Number,
      required: false,
    },
    networkQueue: {
      type: Number,
      required: false,
    },
    hardwareCount:{
      type: Number,
      required: false
      },
    networkCount:{
      type: Number,
      required: false
      },
    softwareCount:{
      type: Number,
      required: false
      },
  },
  schemaOptions
);

module.exports = mongoose.model("Tickets", TicketsSchema);