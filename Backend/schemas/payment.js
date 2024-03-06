const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  receivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["Cash", "Card", "M-pesa"],
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  timeOfPayment: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
