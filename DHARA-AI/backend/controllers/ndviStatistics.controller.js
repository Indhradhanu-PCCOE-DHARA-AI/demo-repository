
import mongoose from "mongoose";

import Field from "../models/field.model.js";
import Location from "../models/location.model.js";

import {
  getNDVIStatistics,
} from "../services/ndviStatistics.service.js";

export const generateFieldNDVIStatistics = async (req, res) => {
  try {
    const { fieldId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(fieldId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid field ID.",
      });
    }

    const field = await Field.findOne({
      _id: fieldId,
      userId: req.userId,
    });

    if (!field) {
      return res.status(404).json({
        success: false,
        message: "Selected field was not found.",
      });
    }

    const location = await Location.findOne({
      userId: req.userId,
      fieldId: field._id,
    });

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location information for this field was not found.",
      });
    }

    if (
      location.boundary?.type !== "Polygon" ||
      !location.boundary.coordinates?.[0]?.length
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid farm boundary is required for NDVI analysis.",
      });
    }

    const statistics = await getNDVIStatistics(
      location.boundary
    );

    return res.status(200).json({
      success: true,
      field: {
        id: field._id,
        name: field.fieldName,
        crop: field.cropName,
      },
      statistics,
    });
  } catch (error) {
    console.error(
      "Field NDVI Statistics Error:",
      error.message
    );

    return res.status(502).json({
      success: false,
      message:
        error.message ||
        "Unable to generate NDVI statistics.",
    });
  }
};
