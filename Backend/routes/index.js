var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const patientController = require("../controllers/patientController");
const { authenticateToken } = require("../middleware/tokens");
const appointmentController = require("../controllers/appointmentController");

const multer = require("multer");
const path = require("path");
const paymentController = require("../controllers/paymentController");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/patients/"); // Specify the destination folder for uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("route to index");
});

//authentication for users
router.post("/login", userController.loginUser);
//craeting users
router.post("/register", userController.registerUser);
router.post("/editUser", userController.editUser);
router.get("/getUser/:user", userController.getUser);
router.get("/users", userController.getUsers);
// router.get("/getUsers", userController.getUsers);

// creating a patient
// router.post("/addPatient", authenticateToken, createPatient.createPatient);
router.post(
  "/addPatient",
  upload.single("file"),
  patientController.createPatient
);
router.post("/updatePatient", patientController.updatePatient);
router.get("/allpatient", patientController.getPatients);
router.get("/getPatient/:id", patientController.getPatientById);
router.delete("/deletePatient", patientController.deletePatient);

//appointment routes
router.post("/newAppointment", appointmentController.newAppointment);
router.post("/cancleAppointment", appointmentController.cancleAppointment);
router.post("/editAppointment", appointmentController.editAppointment);
router.get(
  "/appointment/:appointment_id",
  appointmentController.findAppointment
);
router.get("/allAppointments", appointmentController.fetchAllAppointments);
router.get("/getAppointments/:id", appointmentController.appointmentsByPatient);
// record patients readings
router.post("/nurseReadings", appointmentController.nurseSectionreading);
router.get("/getNurseReadings/:id", appointmentController.getNurseReadings);
//patient medical records
router.post("/addMedicalRecords", patientController.addMedicalRecords);
router.get("/getMedicalrecords/:id", patientController.getMedicalRecords);
//  payments sections
router.post("/makePayment", paymentController.createPayment);
router.get("/allPayments", paymentController.fetchAllPayments);
router.get("/todaysPayments", paymentController.todaysPayments);
router.get("/getPayment/:id", paymentController.getPayment);
router.get("/getpaymentperUser/:user_id", paymentController.getPaymentPerUser);

module.exports = router;
