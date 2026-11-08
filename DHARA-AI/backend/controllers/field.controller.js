
import Field from "../models/field.model.js";

export const saveFieldInformation = async (req, res) => {
  try {
    const {
      fieldName,
      cropName,
      cropVariety,
      area,
      soilType,
      irrigationMethod,
      sowingDate,
      farmingSeason,
      cultivationDetails,
    } = req.body;

    if (
      !fieldName ||
      !cropName ||
      area === undefined ||
      !soilType ||
      !irrigationMethod
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required field details.",
      });
    }

    const fieldArea = Number(area);

    if (!Number.isFinite(fieldArea) || fieldArea <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid field area.",
      });
    }

    const field = await Field.create({
      userId: req.userId,
      fieldName,
      cropName,
      cropVariety: cropVariety || "",
      area: fieldArea,
      soilType,
      irrigationMethod,
      sowingDate: sowingDate || null,
      farmingSeason: farmingSeason || "",
      cultivationDetails: cultivationDetails || "",
    });

    return res.status(201).json({
      success: true,
      message: "Field information saved successfully!",
      field,
    });
  } catch (error) {
    console.error("Save Field Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save field information. Please try again.",
    });
  }
};

export const getFieldInformation = async (req, res) => {
  try {
    const fields = await Field.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      fields,
    });
  } catch (error) {
    console.error("Get Field Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch field information.",
    });
  }
};
