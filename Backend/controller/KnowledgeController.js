const KnowledgeModel = require("../Models/Knowledge");
const cookie = require('cookie');

const KnowledgeController = {

  createknowledge: async (req, res) => {
    const Knowledge = new KnowledgeModel({
      title: req.body.title,
      content: req.body.content,
     
    });
    try {
      const newknowledge = await Knowledge.save();
      return res.status(201).json(newknowledge);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  },

  getAllQuestions: async (req, res) => {
    try {
      const questions = await KnowledgeModel.find();
      return res.status(200).json(questions);
    } catch (e) {
      console.error("Error fetching questions:", e.message);
      return res.status(500).json({ message: e.message });
    }
  },
 
    
  };
  module.exports = KnowledgeController;