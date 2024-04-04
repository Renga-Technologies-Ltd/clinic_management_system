const mongoose = require("mongoose");

const doctorObservationsSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  patientName: {
    type: String,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorName: {
    type: String,
  },
  history: {
    chief_complaints: String,
    present_illness: String,
    past_illness: String,
    family_history: String,
    personal_history: String,
  },
  examination: {
    clinical_examination: String,
    general_examination: String,
    systemic_examination: String,
  },
  diagnosis: {
    provisional: String,
    investigations_advice: String,
    final_diagnosis: String,
  },
  treatment: {
    treatment_plan: String,
    prescription: String,
    follow_up_advice: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DoctorObservations = mongoose.model(
  "DoctorObservations",
  doctorObservationsSchema
);

module.exports = DoctorObservations;
