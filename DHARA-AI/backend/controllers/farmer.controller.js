
import Farmer from "../models/farmer.model.js";

// SAVE OR UPDATE FARMER INFORMATION
export const saveFarmerInformation = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      age,
      gender,
      experience,
      farmingType,
      address,
    } = req.body;

    // Required field validation
    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        message: "Full name and phone number are required.",
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit phone number.",
      });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const farmerData = {
      fullName,
      phone,
      email: email || "",
      age: age === "" || age == null ? null : Number(age),
      gender: gender || "",
      experience: experience || "",
      farmingType: farmingType || "",
      address: address || "",
    };

    const farmer = await Farmer.findOneAndUpdate(
      { userId: req.userId },
      { $set: farmerData, $setOnInsert: { userId: req.userId } },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Farmer information saved successfully!",
      farmer,
    });

  } catch (error) {
    console.error("Save Farmer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save farmer information. Please try again.",
    });
  }
};

// GET LOGGED-IN FARMER INFORMATION
export const getFarmerInformation = async (req, res) => {
  try {
    const farmer = await Farmer.findOne({
      userId: req.userId,
    });

    return res.status(200).json({
      success: true,
      farmer,
    });

  } catch (error) {
    console.error("Get Farmer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch farmer information.",
    });
  }
};
