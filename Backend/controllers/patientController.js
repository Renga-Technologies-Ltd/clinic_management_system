const Patient = require("../schemas/patient");
const DoctorObservations = require("../schemas/doctorObservations");

const Appointment = require("../schemas/appointment");
const User = require("../schemas/users");
const NurseReadings = require("../schemas/nurseReadings");

const patientController = {
  createPatient: async (req, res, next) => {
    try {
      console.log("Received request body:", req.body);
      const {
        firstName,
        lastName,
        dateOfBirth,
        age,
        gender,
        contactNumber,
        emailAddress,
        address,
        nextOfKin,
        imageUrl,
      } = req.body;
      // Generate custom patient ID (MMC-timestamp)
      const currentDate = new Date();
      const formattedDate = `${currentDate
        .getFullYear()
        .toString()
        .slice(-2)}${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

      const todayCount = await Patient.countDocuments({
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
      const customId = `MMC${formattedDate}${(todayCount + 1)
        .toString()
        .padStart(3, "0")}`;

      const newPatient = new Patient({
        patient_id: customId,
        firstName,
        lastName,
        dateOfBirth,
        age,
        gender,
        contactNumber,
        emailAddress,
        address: address,
        nextOfKin: nextOfKin,
        imageUrl,
      });
      // Save the patient to the database
      await newPatient.save();
      console.log("Patient created successfully:", newPatient);

      res
        .status(201)
        .json({ message: "Patient created successfully", patient: newPatient });
    } catch (error) {
      console.error("Error creating patient:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updatePatient: async (req, res, next) => {
    try {
      const {
        patientId,
        patient_id,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        contactNumber,
        emailAddress,
        address,
        nextOfKin,
        imageUrl,
      } = req.body;
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      patient.patient_id = patient_id;
      patient.firstName = firstName;
      patient.lastName = lastName;
      patient.dateOfBirth = dateOfBirth;
      patient.gender = gender;
      patient.contactNumber = contactNumber;
      patient.emailAddress = emailAddress;
      patient.address = address;
      patient.nextOfKin = nextOfKin;
      patient.imageUrl = imageUrl;

      await patient.save();
      res
        .status(200)
        .json({ message: "Patient updated successfully", patient });
    } catch (error) {
      console.error("Error updating patient:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getPatients: async (req, res, next) => {
    try {
      const patients = await Patient.find();
      // console.log("patients", patients);
      res.status(200).json({ patients });
    } catch (error) {
      console.error("Error getting patients:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getPatientById: async (req, res, next) => {
    try {
      const patientId = req.params.id;
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.status(200).json({ patient });
    } catch (error) {
      console.error("Error getting patient by id:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getDoctors: async (req, res, next) => {
    try {
      const doctors = await User.find({ roles: "Doctor" });
      if (!doctors) {
        return res.status(404).json({ message: "Docrors not found" });
      }
      console.log(doctors);
      res.status(200).json({ doctors });
    } catch (error) {
      console.error("Error getting patient by id:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  deletePatient: async (req, res, next) => {
    try {
      const { patientId } = req.body;
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      await Patient.deleteOne({ _id: patientId }); // Use deleteOne to remove the document
      res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
      console.error("Error deleting patient:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  addMedicalRecords: async (req, res, next) => {
    try {
      const { app_id, history, examination, diagnosis, treatment } = req.body;

      // Fetch appointment details and populate patient and doctor fields
      const appointment = await Appointment.findById(app_id).populate([
        "patient",
        "doctor",
      ]);

      if (!appointment) {
        console.log("Appointment not found");
        return res.status(404).json({ message: "Appointment not found" });
      }

      const { patient, doctor } = appointment;
      // console.log("Appointment details:", appointment);

      const {
        _id: patient_id,
        firstName: patientFirstName,
        lastName: patientLastName,
        dob: dateOfBirth,
        phoneNumber: contactNumber,
        gender: gender,
        emailAddress: emailAddress,
      } = patient;
      const {
        _id: doctor_id,
        profile: { firstName: doctorFirstName, lastName: doctorLastName },
      } = doctor;

      const newDoctorObservations = new DoctorObservations({
        appointment: app_id,
        patient: patient_id,
        patientName: `${patientFirstName} ${patientLastName}`, // Include patient name
        doctor: doctor_id,
        doctorName: `${doctorFirstName} ${doctorLastName}`, // Include doctor name
        history,
        examination,
        diagnosis,
        treatment,
      });

      await newDoctorObservations.save();

      // Update appointment to mark doctor readings as true
      await Appointment.findByIdAndUpdate(app_id, {
        doctorReadings: true,
      });

      res.status(200).json({
        message: "Medical records added successfully",
        patient: {
          id: patient_id,
          patient_id: patient.patient_id,
          name: `${patientFirstName} ${patientLastName}`,
          appointment_id: appointment.appointment_id,
          dob: patient.dateOfBirth,
          phoneNumber: patient.contactNumber,
          gender: patient.gender,
          emailAddress: patient.emailAddress,
        }, // Include patient details in response
        doctor: {
          id: doctor_id,
          name: `${doctorFirstName} ${doctorLastName}`,
        }, // Include doctor details in response
        newDoctorObservations,
      });
    } catch (error) {
      console.error("Error adding medical records:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getMedicalRecords: async (req, res, next) => {
    try {
      const patient = req.params.id;
      // console.log(patient);
      const observations = await DoctorObservations.find({
        patient: patient,
      });
      console.log(observations);
      res.status(200).json({ medicalRecords: observations });
    } catch (error) {
      console.error("Error getting medical records:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getApprecords: async (req, res, next) => {
    try {
      const appointmentId = req.params.appointment;
      const appointment = await Appointment.findById(appointmentId)
        .populate("patient")
        .populate("doctor")
        .exec();

      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      const observations = await DoctorObservations.findOne({
        appointment: appointmentId,
      }).exec();

      const nurseReadings = await NurseReadings.findOne({
        appointment: appointmentId,
      }).exec();

      // if (!nurseReadings) {
      //   return null;
      // }

      const patient = appointment.patient;

      const appointmentDetails = {
        appointment: appointment,
        observations: observations,
        nurseReadings: nurseReadings,
        patient: patient,
      };

      res.status(200).json({ appointmentDetails });
    } catch (error) {
      console.error("Error getting medical records:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateObservations: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { history, examination, diagnosis, treatment } = req.body;
      const observations = await DoctorObservations.findOneAndUpdate(
        { _id: id },
        {
          history,
          examination,
          diagnosis,
          treatment,
        },
        { new: true }
      );
      const appointment = observations.appointment;

      const appointmentDetails = await Appointment.findById(
        appointment
      ).populate(["patient", "doctor"]);
      const { patient, doctor } = appointmentDetails; // Fix here
      // console.log("Appointment details:", appointmentDetails);
      // console.log("Observations updated successfully:", observations);
      console.log("Observations updated successfully:", observations);
      res.status(200).json({
        message: "Observations updated successfully",
        patient: {
          id: patient._id,
          patient_id: patient.patient_id,
          name: `${patient.firstName} ${patient.lastName}`,
          dob: patient.dob,
          phoneNumber: patient.phoneNumber,
          gender: patient.gender,
          emailAddress: patient.emailAddress,
        }, // Include patient details in response
        doctor: {
          id: doctor._id,
          name: `${doctor.profile.firstName} ${doctor.profile.lastName}`,
        }, // Include doctor details in response
        observations,
      });
    } catch (error) {
      console.error("Error updating observations:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  fetchPatientsAndAppointmentsOverTime: async (req, res, next) => {
    try {
      // Fetch all patients from the backend
      const patients = await Patient.find();

      // Fetch all appointments from the backend
      const appointments = await Appointment.find();

      // Group patients by month based on createdAt column
      const patientsByMonth = patients.reduce((acc, patient) => {
        const month = patient.createdAt.getMonth();
        acc[month] = acc[month] || { patients: 0, appointments: 0 };
        acc[month].patients++;
        return acc;
      }, {});

      // Group appointments by month based on createdAt column
      const appointmentsByMonth = appointments.reduce((acc, appointment) => {
        const month = appointment.createdAt.getMonth();
        acc[month] = acc[month] || { patients: 0, appointments: 0 };
        acc[month].appointments++;
        return acc;
      }, {});

      // Generate data for "Number of patients" series
      const numberOfPatientsData = Object.values(patientsByMonth).map(
        (entry) => entry.patients
      );

      // Generate data for "Appointments booked" series
      const appointmentsBookedData = Object.values(appointmentsByMonth).map(
        (entry) => entry.appointments
      );

      // Define categories (months)
      const categories = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      return {
        series: [
          { name: "Number of patients", data: numberOfPatientsData },
          { name: "Appointments booked", data: appointmentsBookedData },
        ],
        categories: categories,
      };
    } catch (error) {
      console.error(
        "Error fetching patients and appointments over time:",
        error
      );
      throw error;
    }
  },
};

module.exports = patientController;
