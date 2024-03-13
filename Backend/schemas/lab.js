const mongoose = require("mongoose");

const LabSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  labRequest: {
    testType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestedOn: {
      type: Date,
      default: Date.now,
    },
  },
  labResults: {
    testType: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    results: {
      type: String,
      required: false,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  evidenceUrl: {
    type: String,   
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Lab = mongoose.model("Lab", LabSchema);

module.exports = Lab;
