const mongoose = require("mongoose");

const schemaOptions = {
  strict: true,
  timestamps: true,
};

const knowledgeSchema = new mongoose.Schema(
  {
   

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

  },
  schemaOptions
);

module.exports = mongoose.model("Knowledge", knowledgeSchema);
module.exports.Schema = knowledgeSchema;   
