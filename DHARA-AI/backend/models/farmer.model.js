
import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    age: {
      type: Number,
      min: 18,
      max: 100,
      default: null,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say", ""],
      default: "",
    },

    experience: {
      type: String,
      enum: ["0-2", "3-5", "6-10", "10+", ""],
      default: "",
    },

    farmingType: {
      type: String,
      enum: ["traditional", "organic", "mixed", "modern", "other", ""],
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const Farmer = mongoose.model("Farmer", farmerSchema);

export default Farmer;
