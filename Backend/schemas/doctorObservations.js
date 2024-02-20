const mongoose = require('mongoose');

const doctorObservationsSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  diagnosis: String,
  treatmentPlan: String,
  prescriptions: [
    {
      medicationName: String,
      dosage: String,
      instructions: String,
    }
  ],
  followUpInstructions: String,
  referrals: [
    {
      specialistName: String,
      referralReason: String,
    }
  ],
  proceduresPerformed: [String],
  notes: String,
  labTestsOrdered: [String],
  nextSteps: String,
  // Add other doctor-specific observations as needed
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DoctorObservations = mongoose.model('DoctorObservations', doctorObservationsSchema);

module.exports = DoctorObservations;
