const moment = require("moment");
const Appointment = require("../schemas/appointment");
const DoctorObservations = require("../schemas/doctorObservations");
const NurseReadings = require("../schemas/nurseReadings");
const RadiologyRequest = require("../schemas/radiology");
const appointmentController = {
  newAppointment: async (req, res, next) => {
    try {
      console.log("Received request body:", req.body);
      const { accompaniedBy, doctor, appointmentTime, bookingType } =
        req.body.values;
      const { patient, createdBy } = req.body;

      const currentDate = new Date();
      const formattedDate = `${currentDate
        .getFullYear()
        .toString()
        .slice(-2)}${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

      const todayCount = await Appointment.countDocuments({
        createdAt: {
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
      const customId = `MMC-APP${formattedDate}${(todayCount + 1)
        .toString()
        .padStart(3, "0")}`;

      const newAppo = new Appointment({
        appointment_id: customId,
        patient,
        bookingType,
        appointmentTime,
        doctor,
        bookedBy: createdBy,
        accompaniedBy,
      });
      // save
      await newAppo.save();
      res.status(201).json({
        message: "Appointment made successfully",
        appointment: newAppo,
      });
    } catch (error) {
      console.error("Error creating new appoinment", error);
      res.status(500).json({ message: "Error creating appointment" });
    }
  },
  fetchAllAppointments: async (req, res, next) => {
    try {
      const todayAppointments = await Appointment.find()
        .populate({
          path: "patient",
          model: "Patient",
          select: "firstName lastName",
        })
        .populate({
          path: "bookedBy",
          model: "User",
          select: "profile.firstName profile.lastName",
        })
        .populate({
          path: "doctor",
          model: "User",
          select: "profile.firstName profile.lastName",
        });

      res.status(200).json({
        appointments: todayAppointments,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error finding records" });
    }
  },
  radiologyRequest: async (req, res, next) => {
    try {
      const { appointment_id, radiology_test } = req.body;
      const currentDate = new Date();
      const formattedDate = `${currentDate
        .getFullYear()
        .toString()
        .slice(-2)}${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

      const todayCount = await RadiologyRequest.countDocuments({
        createdAt: {
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
      const customId = `MMC-RAD${formattedDate}${(todayCount + 1)
        .toString()
        .padStart(3, "0")}`;
      const data = new RadiologyRequest({
        appointmentId: appointment_id,
        request_id: customId,
        description: radiology_test,
      });
      // save
      await data.save();
      res.status(201).json({
        message: "Request sent successfully",
        request: data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  },
  getRaiologyRecords: async (req, res, next) => {
    try {
      const appointment_id = req.params.id;
      console.log("Appointment ID:", appointment_id);
      const radiologyRecords = await RadiologyRequest.find({
        appointmentId: appointment_id,
      });
      console.log("Radiology records:", radiologyRecords);
      res.status(200).json({
        radiologyRecords,
        message: "Radiology records fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching radiology records:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  fetchAppointments: async (req, res, next) => {
    try {
      const todayAppointments = await Appointment.find({})
        .populate({
          path: "patient",
          model: "Patient",
          select: "firstName lastName",
        })
        .populate({
          path: "bookedBy",
          model: "User",
          select: "profile.firstName profile.lastName",
        })
        .populate({
          path: "doctor",
          model: "User",
          select: "profile.firstName profile.lastName",
        });

      res.status(200).json({
        appointments: todayAppointments,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error finding records" });
    }
  },
  appointmentsByPatient: async (req, res, next) => {
    try {
      const patientId = req.params.id;
      const patients_appointments = await Appointment.find({
        patient: patientId,
      })
        .populate("patient", "firstName lastName") // Replace with the actual fields you want from the Patient model
        .populate("doctor", "profile.firstName profile.lastName") // Replace with the actual fields you want from the User model
        .populate("bookedBy", "profile.firstName profile.lastName"); // Replace with the actual fields you want from the User model

      if (patients_appointments.length === 0) {
        return res.status(404).json({
          message: "Patient has no appointments yet",
          appointments: {},
        });
      }
      res.status(200).json({ appointments: patients_appointments });
    } catch (error) {
      console.error("Error fetching appointment data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  cancleAppointment: async (req, res, next) => {
    const {} = req.body;
  },
  editAppointment: async (req, res, next) => {
    const {
      appointment_id,
      patient,
      bookingType,
      appointmentTime,
      bookedBy,
      doctor,
      accompaniedBy,
      paid,
      nurseReadings,
      doctorReadings,
    } = req.body;

    try {
      const appointment = await Appointment.findOneAndUpdate(
        { appointment_id }, // Find the appointment by appointment_id
        {
          $set: {
            patient,
            bookingType,
            appointmentTime,
            bookedBy,
            doctor,
            accompaniedBy,
            paid,
            nurseReadings,
            doctorReadings,
          },
        },
        { new: true } // To return the updated appointment
      );

      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      res
        .status(200)
        .json({ message: "Appointment updated successfully", appointment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  findAppointment: async (req, res, next) => {
    try {
      const appointment_id = req.params.appointment_id;
      const appointment = await Appointment.findById(appointment_id)
        .populate("patient", "firstName lastName patient_id age") // Replace "firstName" with the actual field you want to retrieve from the Patient model
        .populate("doctor", "profile.firstName profile.lastName user_id") // Access subfields in the profile object
        .populate(
          "bookedBy",
          "profile.firstName profile.lastName profile.user_id"
        ); // Access subfields in the profile object

      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      console.log("Appointment data:", appointment);
      res.status(200).json({ appointment });
    } catch (error) {
      console.error("Error fetching appointment data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  nurseSectionreading: async (req, res, next) => {
    try {
      console.log("Received request body:", req.body);
      const { appointment_id, appointment, tests } = req.body;

      // Extract individual readings from the appointment object
      const { weight, height, bmi } = appointment;

      // Create a new NurseReadings document
      const newReadings = new NurseReadings({
        appointment: appointment_id,
        weight,
        height,
        bmi,
        tests, // Include the array of test readings directly
      });

      // Save the new NurseReadings document
      await newReadings.save();

      // Update nurseReadings field in the corresponding Appointment
      await Appointment.findByIdAndUpdate(appointment_id, {
        nurseReadings: true,
      });

      // Send response
      res.status(201).json({
        message: "Details saved successfully",
        readings: newReadings,
      });
    } catch (error) {
      console.error("Error creating new records", error);
      res.status(500).json({ message: "Error creating patients records" });
    }
  },

  getNurseReadings: async (req, res, next) => {
    try {
      const appointment_id = req.params.id;
      const nurseReadings = await NurseReadings.findOne({
        appointment: appointment_id,
      });
      res.status(200).json({
        nurseReadings,
        message: "Nurse readings fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching nurse readings:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  //fetch all nurse readings
  fetchAllNurseReadings: async (req, res, next) => {
    try {
      const allNurseReadings = await NurseReadings.find();

      res.status(200).json({ nurseReadings: allNurseReadings });
    } catch (error) {
      console.error("Error fetching all nurse readings:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  fetchWithAppointmentId: async (req, res, next) => {
    try {
      const { appointmentNumber } = req.body;

      // Check if appointmentNumber is provided
      if (!appointmentNumber) {
        return res.status(400).json({
          message: "Appointment number is required for fetching nurse readings",
        });
      }
      // Find nurse readings based on appointment number
      const nurseReadings = await NurseReadings.find({
        appointment: appointmentNumber,
      });

      if (nurseReadings.length === 0) {
        return res.status(404).json({
          message:
            "Nurse readings not found for the specified appointment number",
        });
      }

      res.status(200).json({ nurseReadings });
    } catch (error) {
      console.error("Error fetching nurse readings:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  nurseSectionreadingEditing: async (req, res, next) => {
    try {
      const {
        readingId,
        appointment,
        bloodPressure,
        heartRate,
        temperature,
        respiratoryRate,
        height,
        weight,
        pulseOximetry,
        painLevel,
      } = req.body;

      // Check if readingId is provided
      if (!readingId) {
        return res
          .status(400)
          .json({ message: "Reading ID is required for editing" });
      }

      // Find the nurse reading by ID
      const nurseReading = await NurseReadings.findById(readingId);

      if (!nurseReading) {
        return res.status(404).json({ message: "Nurse reading not found" });
      }

      // Update nurse reading fields
      nurseReading.appointment = appointment;
      nurseReading.bloodPressure = bloodPressure;
      nurseReading.heartRate = heartRate;
      nurseReading.temperature = temperature;
      nurseReading.respiratoryRate = respiratoryRate;
      nurseReading.height = height;
      nurseReading.weight = weight;
      nurseReading.pulseOximetry = pulseOximetry;
      nurseReading.painLevel = painLevel;

      // Save the updated nurse reading
      const updatedNurseReading = await nurseReading.save();

      res.status(200).json({
        message: "Nurse reading updated successfully",
        updatedNurseReading,
      });
    } catch (error) {
      console.error("Error updating nurse reading:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  appointmentStatistics: async (req, res, next) => {
    try {
      const todayStart = moment().startOf("day"); // Get the start of today
      const todayEnd = moment().endOf("day"); // Get the end of today

      // Fetch all appointments for today
      const todayAppointments = await Appointment.find({
        appointmentTime: { $gte: todayStart, $lte: todayEnd },
      });

      // Initialize arrays for appointment statistics
      const appointmentsPerHour = Array(24).fill(0);
      const completedAppointmentsPerHour = Array(24).fill(0);

      // Calculate appointment statistics
      for (const appointment of todayAppointments) {
        const hour = moment(appointment.appointmentTime).hour();
        appointmentsPerHour[hour]++;

        // Check if there are doctor observations for the appointment
        const doctorObservation = await DoctorObservations.findOne({
          appointment: appointment._id,
        });

        if (doctorObservation) {
          completedAppointmentsPerHour[hour]++;
        }
      }

      // Prepare response data
      const appointmentStatistics = {
        series: [
          {
            name: "Number of appointments Per hour",
            data: appointmentsPerHour,
          },
          {
            name: "Number of appointments Completed Per hour",
            data: completedAppointmentsPerHour,
          },
        ],
        categories: Array.from({ length: 24 }, (_, i) =>
          moment().hour(i).format("HH:mm")
        ),
      };

      res.json(appointmentStatistics);
    } catch (error) {
      console.error("Error fetching appointment statistics:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
module.exports = appointmentController;
