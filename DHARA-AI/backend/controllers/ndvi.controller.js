
import mongoose from "mongoose";

import Field from "../models/field.model.js";
import Location from "../models/location.model.js";

import { getNDVIImage } from "../services/ndvi.service.js";

export const generateFieldNDVI = async (req, res) => {
  try {
    const { fieldId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(fieldId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid field ID.",
      });
    }

    // Verify that the field belongs to the signed-in farmer.
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

    // Retrieve this farmer's location for the selected field.
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

    // Request actual Sentinel-2 NDVI imagery.
    const imageBuffer = await getNDVIImage(location.boundary);

    res.set({
      "Content-Type": "image/png",
      "Content-Disposition": 'inline; filename="dhara-ndvi.png"',
      "Cache-Control": "no-store",
    });

    return res.status(200).send(imageBuffer);
  } catch (error) {
    console.error("Field NDVI Generation Error:", error.message);

    return res.status(502).json({
      success: false,
      message: "Unable to generate satellite NDVI imagery.",
    });
  }
};
