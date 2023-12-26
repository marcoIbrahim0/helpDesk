const mongoose = require("mongoose");

const schemaOptions = {
  strict: true,
  timestamps: true,
};

const CustomizationSchema = new mongoose.Schema(
  {
  
    PrimaryColor:{

      type: String,
      required: true,
    },

    FontFamily:{

      type: String,
      required: true,
    },
   
  },
  schemaOptions
);

module.exports = mongoose.model("Customization", CustomizationSchema);