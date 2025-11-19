const { required } = require("joi");
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    Company: {
      type: String,
      required: [true, "Please provide comapny name"],
      maxlength: 50,
    },
    Position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    Status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    CreatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
