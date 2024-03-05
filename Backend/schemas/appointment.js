const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  bookingType: {
    type: String,
    enum: ["scheduled", "walk-in"],
    required: false,
    default: "walk-in",
  },
  appointmentTime: {
    type: Date,
    required: true,
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accompaniedBy: {
    fullname: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  paid: {
    type: Boolean,
    default: false,
  },
  nurseReadings: {
    type: Boolean,
    default: false,
  },
  doctorReadings: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
