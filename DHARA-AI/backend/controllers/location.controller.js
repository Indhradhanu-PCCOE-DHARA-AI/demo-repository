
import Location from "../models/location.model.js";
import Field from "../models/field.model.js";

export const saveLocationInformation = async (req, res) => {
  try {
    const {
      fieldId,
      village,
      taluka,
      district,
      state,
      pincode,
      latitude,
      longitude,
      boundary,
      boundaryArea,
    } = req.body;

    // Required field validation
    if (
      !fieldId ||
      !village ||
      !taluka ||
      !district ||
      !state ||
      !pincode ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required location details.",
      });
    }

    // Validate pincode
    if (!/^[0-9]{6}$/.test(String(pincode))) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit pincode.",
      });
    }

    // Validate GPS coordinates
    const lat = Number(latitude);
    const lng = Number(longitude);

    if (
      !Number.isFinite(lat) ||
      lat < -90 ||
      lat > 90 ||
      !Number.isFinite(lng) ||
      lng < -180 ||
      lng > 180
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid GPS coordinates.",
      });
    }

    // Verify field ownership
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

    // Validate optional farm boundary
    if (boundary) {
      if (
        boundary.type !== "Polygon" ||
        !Array.isArray(boundary.coordinates) ||
        !Array.isArray(boundary.coordinates[0]) ||
        boundary.coordinates[0].length < 4
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid farm boundary polygon.",
        });
      }

      const ring = boundary.coordinates[0];

      const validCoordinates = ring.every(
        (point) =>
          Array.isArray(point) &&
          point.length === 2 &&
          Number.isFinite(Number(point[0])) &&
          Number(point[0]) >= -180 &&
          Number(point[0]) <= 180 &&
          Number.isFinite(Number(point[1])) &&
          Number(point[1]) >= -90 &&
          Number(point[1]) <= 90
      );

      const first = ring[0];
      const last = ring[ring.length - 1];

      const isClosed =
        Number(first[0]) === Number(last[0]) &&
        Number(first[1]) === Number(last[1]);

      if (!validCoordinates || !isClosed) {
        return res.status(400).json({
          success: false,
          message: "Farm boundary coordinates are invalid.",
        });
      }
    }

    const parsedBoundaryArea =
      boundaryArea === undefined || boundaryArea === null
        ? null
        : Number(boundaryArea);

    if (
      parsedBoundaryArea !== null &&
      (!Number.isFinite(parsedBoundaryArea) ||
        parsedBoundaryArea < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid farm boundary area.",
      });
    }

    const locationData = {
      userId: req.userId,
      fieldId,
      village: village.trim(),
      taluka: taluka.trim(),
      district: district.trim(),
      state: state.trim(),
      pincode: String(pincode),
      latitude: lat,
      longitude: lng,
      boundary: boundary || {
        type: "Polygon",
        coordinates: [],
      },
      boundaryArea: parsedBoundaryArea,
    };

    const location = await Location.findOneAndUpdate(
      { userId: req.userId, fieldId },
      { $set: locationData },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Farm location saved successfully!",
      location,
    });
  } catch (error) {
    console.error("Save Location Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save farm location. Please try again.",
    });
  }
};

export const getLocationInformation = async (req, res) => {
  try {
    const locations = await Location.find({
      userId: req.userId,
    }).populate("fieldId", "fieldName cropName area");

    return res.status(200).json({
      success: true,
      locations,
    });
  } catch (error) {
    console.error("Get Location Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch location information.",
    });
  }
};
