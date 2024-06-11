const mongoose = require("mongoose");

const nurseReadingsSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
  },
  tests: [
    {
      systolic: {
        type: Number,
        required: true,
      },
      diastolic: {
        type: Number,
        required: true,
      },
      heartRate: {
        type: Number,
        required: true,
      },
      temperature: {
        type: Number,
        required: true,
      },
      respiratoryRate: {
        type: Number,
        required: true,
      },
      painLevel: {
        type: Number,
        required: true,
      },
      SpO2: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NurseReadings = mongoose.model("NurseReadings", nurseReadingsSchema);

module.exports = NurseReadings;
