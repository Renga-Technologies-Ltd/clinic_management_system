const mongoose = require("mongoose");

const radiologyRequestSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    request_id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // Add other fields as needed
  },
  { timestamps: true }
);

const RadiologyRequest = mongoose.model(
  "RadiologyRequest",
  radiologyRequestSchema
);

module.exports = RadiologyRequest;
