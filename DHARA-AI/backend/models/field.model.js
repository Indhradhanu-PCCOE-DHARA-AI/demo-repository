
import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fieldName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    cropName: {
      type: String,
      required: true,
      trim: true,
    },

    cropVariety: {
      type: String,
      trim: true,
      default: "",
    },

    area: {
      type: Number,
      required: true,
      min: 0.01,
    },

    soilType: {
      type: String,
      required: true,
      trim: true,
    },

    irrigationMethod: {
      type: String,
      required: true,
      trim: true,
    },

    sowingDate: {
      type: Date,
      default: null,
    },

    farmingSeason: {
      type: String,
      enum: ["kharif", "rabi", "zaid", "year_round", ""],
      default: "",
    },

    cultivationDetails: {
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

const Field = mongoose.model("Field", fieldSchema);

export default Field;
