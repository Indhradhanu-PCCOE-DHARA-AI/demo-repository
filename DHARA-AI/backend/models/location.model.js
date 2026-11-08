
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fieldId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
      required: true,
    },

    village: {
      type: String,
      required: true,
      trim: true,
    },

    taluka: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/,
    },

    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },

    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },

    boundary: {
      type: {
        type: String,
        enum: ["Polygon"],
        default: "Polygon",
      },

      coordinates: {
        type: [[[Number]]],
        default: [],
      },
    },

    boundaryArea: {
      type: Number,
      default: null,
      min: 0,
    },
  },
  { timestamps: true }
);

locationSchema.index(
  { userId: 1, fieldId: 1 },
  { unique: true }
);

const Location = mongoose.model("Location", locationSchema);

export default Location;
