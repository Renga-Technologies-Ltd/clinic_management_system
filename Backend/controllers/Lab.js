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
      const { results, testType, id, description } = req.body;

      // Construct the updated labResults object
      const labResults = { results, testType, description };
      console.log(labResults);
      console.log("ID:", id);

      // Update the labResults field in the document
      const newResults = await Lab.findByIdAndUpdate(
        id, // Assuming id is the _id of the document to be updated
        { $set: { labResults } }, // Use $set operator to only update the labResults field
        { new: true }
      );

      console.log("New results:", newResults);

      // Send response with updated labResults
      res.status(201).json({
        message: "Lab results added successfully",
        labResults: newResults.labResults,
      });
    } catch (error) {
      console.error("Error adding lab results:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getLabResults: async (req, res, next) => {
    try {
      const appoinment_id = req.params.id;
      console.log("Appointment ID:", appoinment_id);
      const labResults = await Lab.find({ appointment: appoinment_id });
      console.log("Lab results: ", labResults);
      res.status(200).json({ labResults });
    } catch (error) {
      console.error("Error getting lab results:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getLabResultsbyId: async (req, res, next) => {
    try {
      const id = req.params.id;
      // console.log("Appointment ID:", id);
      const labResults = await Lab.findById(id);
      console.log("Lab results: ", labResults);
      res.status(200).json({ labResults });
    } catch (error) {
      console.error("Error getting lab results:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getLabRequest: async (req, res, next) => {
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const labRequest = await Lab.find({
        createdAt: {
          $gte: todayStart,
          $lt: todayEnd,
        },
      }).populate({
        path: "appointment",
        populate: { path: "patient" },
      });

      console.log("Lab requests:", labRequest);
      res.status(200).json({ labRequest });
    } catch (error) {
      console.error("Error getting lab requests:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  addLabTest: async (req, res, next) => {},
};

module.exports = labController;
