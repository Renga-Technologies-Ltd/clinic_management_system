const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  receipt_id: { type: String, required: true },
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
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "M-pesa"],
    required: true,
  },
  paymentType: {
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
