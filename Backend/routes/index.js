var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const patientController = require("../controllers/patientController");
const fs = require("fs");
const appointmentController = require("../controllers/appointmentController");
const labController = require("../controllers/Lab");
const FileModel = require("../schemas/files");
const UPLOAD_DIR = require("../uploadConfig");
const multer = require("multer");
const path = require("path");
const paymentController = require("../controllers/paymentController");
// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/patients/"); // Specify the destination folder for uploads
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("route to index");
});

router.post("/fileupload", upload.single("file"), async (req, res, next) => {
  console.log(req.body);
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const appointmentId = req.body.appointmentId;
  const patientId = req.body.patientId;
  const userId = req.body.userId;

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear().toString().slice(-2)}${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

  const todayCount = await FileModel.countDocuments({
    dateUploaded: {
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
  console.log("count:", todayCount);

  // Generate custom Document ID (MMC-DD/MM/YYYY-number)
  const customId = `MMC-DOC${formattedDate}${(todayCount + 1)
    .toString()
    .padStart(3, "0")}`;
  const newFile = new FileModel({
    patientId,
    appointmentId,
    documentNumber: customId,
    fileName: req.file.filename,
    uploadedBy: userId,
  });
  await newFile.save();
  res.json({ filename: req.file.filename });
});

router.get("/getDocument/:fileName", async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(UPLOAD_DIR, fileName);
  console.log(fileName);
  console.log(filePath);

  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Read the file and send it in the response
      const fileContent = fs.readFileSync(filePath);
      res.setHeader("Content-Type", "application/pdf"); // Adjust content type as per your document type
      res.send(fileContent);
    } else {
      // If file not found, send 404 response
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error fetching document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getFiles", async (req, res) => {
  try {
    const files = await FileModel.find();
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getFile/:id", async (req, res) => {});
router.get("/getFilesByPatient/:patientId", async (req, res) => {
  const patientId = req.params.patientId;
  try {
    const files = await FileModel.find({ patientId }).populate(
      "uploadedBy",
      "firstName lastName"
    );
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getFilesByAppointment/:appointmentId", async (req, res) => {
  const appointmentId = req.params.appointmentId;
  try {
    const files = await FileModel.find({ appointmentId }).populate(
      "uploadedBy",
      "firstName lastName"
    );
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getFilesByUser/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const files = await FileModel.find({ uploadedBy: userId });
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//authentication for users
router.post("/login", userController.loginUser);
//craeting users
router.post("/register", userController.registerUser);
router.post("/adduser", userController.addUser);
router.post("/editUser", userController.editUser);
router.get("/getUser/:user", userController.getUser);
router.get("/users", userController.getUsers);
// router.get("/getUsers", userController.getUsers);
// /api/updateObservations/6627649c38d6afb3c891d155

// creating a patient
// router.post("/addPatient", authenticateToken, createPatient.createPatient);
router.post(
  "/addPatient",
  upload.single("file"),
  patientController.createPatient
);
router.post("/updatePatient", patientController.updatePatient);
// router.get("/getPatients", patientController.getPatients);
router.get("/allpatient", patientController.getPatients);
router.get("/getPatient/:id", patientController.getPatientById);
router.delete("/deletePatient", patientController.deletePatient);
router.get("/getDoctors", patientController.getDoctors);
router.put("/updateUser", userController.updateUser);

router.get(
  "/patientsStats",
  patientController.fetchPatientsAndAppointmentsOverTime
);
router.get(
  "/appointmentStatistics",
  appointmentController.appointmentStatistics
);

//appointment routes
router.post("/newAppointment", appointmentController.newAppointment);
router.post("/cancleAppointment", appointmentController.cancleAppointment);
router.post("/editAppointment", appointmentController.editAppointment);
router.get(
  "/appointment/:appointment_id",
  appointmentController.findAppointment
);
router.post("/radiology", appointmentController.radiologyRequest);
router.get("/radiology/:id", appointmentController.getRaiologyRecords);
//get todays appointments
router.get("/allAppointments", appointmentController.fetchAllAppointments);
//get all appointments
router.get("/Appointments", appointmentController.fetchAppointments);
//get patient appointments
router.get("/getAppointments/:id", appointmentController.appointmentsByPatient);
// record patients readings
router.post("/nurseReadings", appointmentController.nurseSectionreading);
//
router.get("/getNurseReadings/:id", appointmentController.getNurseReadings);
//patient medical records
router.post("/addMedicalRecords", patientController.addMedicalRecords);
router.get("/getMedicalrecords/:id", patientController.getMedicalRecords);
router.get("/getApprecords/:appointment", patientController.getApprecords);
router.put("/updateObservations/:id", patientController.updateObservations);
//  payments sections
router.post("/makepayments", paymentController.createPayment);
// router.get("/getPayments", paymentController.getPayments);
router.get("/allPayments", paymentController.fetchAllPayments);
router.get("/todaysPayments", paymentController.todaysPayments);
router.get("/getPayment/:receipt", paymentController.getPayment);
// get payment using appointmentid
router.get(
  "/getPaymentbyAppointment/:appointment",
  paymentController.getPaymentbyAppointment
);
router.get("/getpaymentperUser/:user_id", paymentController.getPaymentPerUser);

//lab section
// addLabResults
router.post("/addLabRequest", labController.addLabRequest);
router.post("/addLabResults", labController.addLabResults);
router.get("/getLabRequest", labController.getLabRequest);
router.get("/getLabResultsbyId/:id", labController.getLabResultsbyId);
router.get("/getLabResults/:id", labController.getLabResults);
router.post("/addLabTest", labController.addLabTest);

module.exports = router;
