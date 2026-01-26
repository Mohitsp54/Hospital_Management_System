const Patient = require("../models/Patient");

// @desc    Add a new patient
// @route   POST /api/patients/add
// @access  Public (for now)
const addPatient = async (req, res) => {
  try {
    const {
      patientId,
      name,
      email,
      mobileString,
      address,
      gender,
      dob,
      medicalIssues,
      bloodGroup,
      patientType,
      assignedDoctor,
    } = req.body;

    // Create new patient
    const patient = await Patient.create({
      patientId,
      name,
      email,
      mobileNumber: mobileString, // Mapping mobileString from frontend to mobileNumber in DB
      address,
      gender,
      dob,
      medicalIssues,
      bloodGroup,
      patientType,
      assignedDoctor,
      medicalHistory,
    });

    if (patient) {
      res.status(201).json({
        _id: patient._id,
        name: patient.name,
        email: patient.email,
        message: "Patient registered successfully",
      });
    } else {
      res.status(400).json({ message: "Invalid patient data" });
    }
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all patients with pagination
// @route   GET /api/patients
// @access  Public
const getPatients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const patients = await Patient.find()
      .sort({ registrationDate: -1 }) // Newest first
      .skip(skip)
      .limit(limit);

    const total = await Patient.countDocuments();

    res.status(200).json({
      patients,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update patient details
// @route   PUT /api/patients/:id
// @access  Public
const updatePatient = async (req, res) => {
  try {
    const {
      patientId,
      name,
      email,
      mobileString,
      address,
      gender,
      dob,
      medicalIssues,
      bloodGroup,
      patientType,
      assignedDoctor,
    } = req.body;

    const patient = await Patient.findById(req.params.id);

    if (patient) {
      patient.patientId = patientId || patient.patientId;
      patient.name = name || patient.name;
      patient.email = email || patient.email;
      patient.mobileNumber = mobileString || patient.mobileNumber;
      patient.address = address || patient.address;
      patient.gender = gender || patient.gender;
      patient.dob = dob || patient.dob;
      patient.medicalIssues = medicalIssues || patient.medicalIssues;
      patient.bloodGroup = bloodGroup || patient.bloodGroup;
      patient.patientType = patientType || patient.patientType;
      patient.assignedDoctor = assignedDoctor || patient.assignedDoctor;
      patient.medicalHistory = medicalHistory || patient.medicalHistory;

      const updatedPatient = await patient.save();

      res.status(200).json({
        _id: updatedPatient._id,
        name: updatedPatient.name,
        email: updatedPatient.email,
        message: "Patient updated successfully",
      });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
// @access  Public
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (patient) {
      await patient.deleteOne();
      res
        .status(200)
        .json({ id: req.params.id, message: "Patient deleted successfully" });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient,
};
