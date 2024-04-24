const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patient_id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  contactNumber: { type: String },
  emailAddress: { type: String },
  imageUrl: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  nextOfKin: {
    firstName: { type: String },
    lastName: { type: String },
    relationship: { type: String },
    contactNumber: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  // Add more fields as needed
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
