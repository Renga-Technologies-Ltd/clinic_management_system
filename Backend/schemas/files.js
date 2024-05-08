const mongoose = require("mongoose");

// Define the schema
const FileSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    // required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  documentNumber: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  dateUploaded: {
    type: Date,
    default: Date.now,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Create a model using the schema
const FileModel = mongoose.model("File", FileSchema);

module.exports = FileModel;
