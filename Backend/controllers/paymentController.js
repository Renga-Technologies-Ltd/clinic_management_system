const Appointment = require("../schemas/appointment");
const Lab = require("../schemas/lab");
const Payment = require("../schemas/payment");
const paymentController = {
  createPayment: async (req, res, next) => {
    try {
      const { appointment, receivedBy, amount, paymentType, paymentMethod } =
        req.body;

      const currentDate = new Date();
      const formattedDate = `${currentDate
        .getFullYear()
        .toString()
        .slice(-2)}${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

      const todayCount = await Payment.countDocuments({
        timeOfPayment: {
          $gte: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          ),
          $lt: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
          ),
        },
      });
      console.log("Today's payments count:", todayCount);

      // Generate custom patient ID (MMC-DD/MM/YYYY-number)
      const customId = `MMC-REC${formattedDate}${(todayCount + 1)
        .toString()
        .padStart(3, "0")}`;
      const newPayment = new Payment({
        receipt_id: customId,
        appointment,
        receivedBy,
        amount,
        paymentType,
        paymentMethod,
      });
      await newPayment.save();
      if (paymentType === "Lab") {
        await Lab.findOneAndUpdate(
          { appointment: appointment },
          { $set: { paid: true } }
        );
      }
      await Appointment.findByIdAndUpdate(appointment, {
        $set: { paid: true },
      });
      res.status(201).json({
        message: "Payment submitted successfully",
        payment: newPayment,
      });
    } catch (error) {
      console.error("Error creating payment:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  fetchAllPayments: async (req, res, next) => {
    try {
      const payments = await Payment.find()
        .populate({
          path: "appointment",
          model: "Appointment",
          select: "appointmentTime patient",
          populate: {
            path: "patient",
            model: "Patient",
            select: "firstName lastName",
          },
        })
        .populate({
          path: "receivedBy",
          model: "User",
          select: "profile.firstName profile.lastName",
        });
      res.status(200).json({ payments });
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  //count payments for a specific date
  todaysPayments: async (req, res, next) => {
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const todayPayments = await Payment.find({
        timeOfPayment: {
          $gte: todayStart,
          $lt: todayEnd,
        },
      })
        .populate({
          path: "appointment",
          model: "Appointment",
          select: "appointmentTime",
        })
        .populate({
          path: "receivedBy",
          model: "User",
          select: "profile.firstName profile.lastName",
        });
      res.status(200).json({ todayPayments });
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getPayment: async (req, res, next) => {
    try {
      // const { appointment, paymentType } = req.params;
      const { receipt } = req.params;
      // Assuming that the `appointment` parameter is an ObjectId
      const payment = await Payment.findById(receipt)
        .populate({
          path: "appointment",
          model: "Appointment",
          select: "appointment_id appointmentTime",
          populate: {
            path: "patient", // Populate the patient field in the appointment schema
            model: "Patient",
            select: "patient_id firstName lastName address",
          },
        })
        .populate({
          path: "receivedBy",
          model: "User",
          select: "profile.firstName profile.lastName",
        });

      if (!payment || payment.length === 0) {
        return res.status(404).json({ message: "Payment not found" });
      }

      console.log("payment", payment);

      res.status(200).json({ payment });
    } catch (error) {
      console.error("Error getting payment by id:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getPaymentbyAppointment: async (req, res, next) => {
    try {
      const appointmentId = req.params.appointment;
      const payment = await Payment.findOne({ appointment: appointmentId })
        .populate({
          path: "appointment",
          model: "Appointment",
          select: "appointmentTime",
        })
        .populate({
          path: "receivedBy",
          model: "User",
          select: "profile.firstName profile.lastName",
        });
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.status(200).json({ payment });
    } catch (error) {
      console.error("Error getting payment by appointment:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPaymentPerUser: async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const userPayments = await Payment.find({ receivedBy: userId })
        .populate({
          path: "appointment",
          model: "Appointment",
          select: "appointmentTime",
        })
        .populate({
          path: "receivedBy",
          model: "User",
          select: "profile.firstName profile.lastName",
        });
      if (userPayments.length === 0) {
        return res.status(404).json({
          message: "User has no payments yet",
          payments: {},
        });
      }
      res.status(200).json({ payments: userPayments });
    } catch (error) {
      console.error("Error fetching user payments:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
module.exports = paymentController;
