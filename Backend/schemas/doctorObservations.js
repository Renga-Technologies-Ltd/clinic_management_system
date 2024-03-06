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
  history: {
    present_illness: String,
    past_illness: String,
    proffesional_history: String,
    menstraul_history: String,
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
