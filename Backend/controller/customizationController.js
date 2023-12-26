const customizationModel = require("../Models/Customization");

const customizationController = {
  updateCustomization: async (req, res) => {
    try {
      const { PrimaryColor, FontFamily } = req.body;

      // Validate if at least one of the fields is provided
      if (!PrimaryColor && !FontFamily) {
        return res.status(400).json({ msg: "Provide at least one field to update" });
      }

      const updatedCustomization = await customizationModel.findByIdAndUpdate(
        req.params.id,
        { PrimaryColor, FontFamily },
        { new: true }
      );

      if (!updatedCustomization) {
        return res.status(404).json({ msg: "Customization not found" });
      }

      return res
        .status(200)
        .json({ customization: updatedCustomization, msg: "Customization updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = customizationController;
