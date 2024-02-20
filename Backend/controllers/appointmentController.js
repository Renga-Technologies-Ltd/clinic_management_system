const Appointment = require("../schemas/appointment");
const NurseReadings = require("../schemas/nurseReadings");

const appointmentController = {
  newAppointment: async (req, res, next) => {
    try {
      const { patient, bookingtype, appointmentTime, bookedBy } = req.body;
      //create new appointment
      const newAppo = new Appointment({
        patient,
        bookingType: bookingtype,
        appointmentTime,
        bookedBy,
      });
      // save
      await newAppo.save();
      res.status(201).json({
        message: "Appointmnet made successfully",
        appointment: newAppo,
      });
    } catch (error) {
      console.error("Error creating new appoinment", error);
      res.status(500).json({ message: "Error creating appointment" });
    }
  },
  fetchAllAppointments: async (req, res, next) => {
    try {
      const allAppointments = await Appointment.fetchAll();
      res.status(201).json({
        appointments: allAppointments,
      });
    } catch (error) {
      console.error("Error no records found");
      res.status(500).json({ message: "Error finding records" });
    }
  },
  appointmentsByPatient: async (req, res, next) => {
    try {
      const patientid = req.body.patient;
      const patients_appointments = await Appointment.find({
        patient: patientid,
      });
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
    const {} = req.body;
  },
  nurseSectionreading: async (req, res, next) => {
    try {
      const {
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
      const newReadings = new NurseReadings({
        appointment,
        bloodPressure,
        heartRate,
        temperature,
        respiratoryRate,
        height,
        weight,
        pulseOximetry,
        painLevel,
      });
      await newReadings.save();
      res.status(201).json({
        message: "Details saved successfully",
        readings: newReadings,
      });
    } catch (error) {
      console.error("Error creating new recorrds", error);
      res.status(500).json({ message: "Error creating patients records" });
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
};

module.exports = appointmentController;
