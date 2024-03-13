const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String, required: true }],
  profile: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    profilePicture: { type: String }, // store the URL of the profile picture in the database (e.g. /images/profile.jpg)
    address: { type: String },
    medicalLicense: { type: String }, // Example: Medical license number
    specialization: { type: String }, // Example: Cardiologist, Nurse, Pharmacist, etc.   
  },
});
const User = mongoose.model('User', userSchema);

module.exports = User;
