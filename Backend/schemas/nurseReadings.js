const mongoose = require('mongoose');

const nurseReadingsSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  bloodPressure: {
    systolic: Number,
    diastolic: Number,
  },
  heartRate: Number,
  temperature: Number,
  respiratoryRate: Number,
  height: Number,
  weight: Number,
  pulseOximetry: Number,
  painLevel: Number,
  SpO2: Number,
  // Add other nurse-specific readings as needed
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NurseReadings = mongoose.model('NurseReadings', nurseReadingsSchema);

module.exports = NurseReadings;
