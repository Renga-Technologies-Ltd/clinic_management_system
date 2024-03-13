const Patient = require("../schemas/patient");
const DoctorObservations = require("../schemas/doctorObservations");

const Appointment = require("../schemas/appointment");
const Lab = require("../schemas/lab");

const labController = {
  addLabRequest: async (req, res, next) => {
    try {
      console.log("Received request body:", req.body);
      const { testName, testDescription, appointment_id, user_id } = req.body;
      const newLabRequest = new Lab({
        appointment: appointment_id,
        labRequest: {
          testType: testName,
          description: testDescription,
          requestedBy: user_id,
        },
      });
      await newLabRequest.save();
      res.status(201).json({ message: "Lab request added successfully" });
    } catch (error) {
      console.error("Error adding lab request:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  addLabResults: async (req, res, next) => {
    try {
    } catch (error) {
      console.error("Error adding lab results:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getLabResults: async (req, res, next) => {},
  addLabTest: async (req, res, next) => {},
};

module.exports = labController;
