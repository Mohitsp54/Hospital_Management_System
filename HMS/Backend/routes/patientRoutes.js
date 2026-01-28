const express = require("express");
const router = express.Router();
const {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient,
  getPatientGenderStats,
} = require("../controllers/patientController");

router.post("/add", addPatient);
router.get("/stats/gender", getPatientGenderStats);
router.get("/", getPatients);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

module.exports = router;
