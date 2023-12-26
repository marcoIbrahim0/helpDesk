const ReportModel = require("../Models/report");

const reportController = {
  createReport: async (req, res) => {
    const { ReportID, ReportType, TicketStatus, AgentID, ResolutionTim } = req.body;

    const report = new ReportModel({
      ReportID,
      ReportType,
      TicketStatus,
      AgentID,
      ResolutionTime,
    });

    try {
      const newReport = await report.save();
      return res.status(201).json(newReport);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  getAllReports: async (req, res) => {
    try {
      const report = await ReportModel.find();
      return res.status(200).json(report);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
};

module.exports = reportController;
