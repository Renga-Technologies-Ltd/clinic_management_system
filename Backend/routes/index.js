var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const patientController = require("../controllers/patientController");
const { authenticateToken } = require("../middleware/tokens");
const appointmentController = require("../controllers/appointmentController");

// var usersRouter = require('./users');

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
// router.get("/getUsers", userController.getUsers);

// creating a patient
// router.post("/addPatient", authenticateToken, createPatient.createPatient);
router.post("/addPatient", patientController.createPatient);
router.post("/updatePatient", patientController.updatePatient);
router.get("/getPatients", patientController.getPatients);
router.get("/getPatient", patientController.getPatientById);
router.delete("/deletePatient", patientController.deletePatient);

//appointment routes
router.post("/newAppointment", appointmentController.newAppointment);
router.post("/cancleAppointment", appointmentController.cancleAppointment);
router.post("/editAppointment", appointmentController.editAppointment);

// nursing section
router.get("/allAppointments", appointmentController.fetchAllAppointments);
router.get("/appBypatientsId", appointmentController.appointmentsByPatient);
// record patients readings
router.post("/nurseReadings", appointmentController.nurseSectionreading);

module.exports = router;
