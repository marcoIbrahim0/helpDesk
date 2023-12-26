const mongoose = require("mongoose");

const schemaOptions = {
  strict: true,
  timestamps: true,
};

const ReportSchema = new mongoose.Schema(
  {
    ReportType: {
      type: String,
      required: true,
    },

    TicketStatus: {
      type: String,
      required: true,
    },

    AgentID: {
      type: String,
      required: true,
    },

    ResolutionTime: {
      type: Number, // Use Number for time in milliseconds or adjust accordingly
      required: true,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Report", ReportSchema);
