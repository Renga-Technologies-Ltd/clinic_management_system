var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const patientController = require("../controllers/patientController");
const { authenticateToken } = require("../middleware/tokens");

// var usersRouter = require('./users');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("route to index");
});

//authentication for users
router.post("/login", userController.loginUser);
//craeting users
router.post("/register", userController.registerUser);
// creating a patient
// router.post("/addPatient", authenticateToken, createPatient.createPatient);
router.post("/addPatient", patientController.createPatient);
router.post("/updatePatient", patientController.updatePatient);
router.get("/getPatients", patientController.getPatients);
router.get("/getPatient", patientController.getPatientById);
router.delete("/deletePatient", patientController.deletePatient);

module.exports = router;
