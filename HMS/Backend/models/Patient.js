const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  dob: {
    type: Date,
    required: true,
  },
  medicalIssues: {
    type: String,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  patientType: {
    type: String,
    required: true,
  },
  assignedDoctor: {
    type: String,
    required: false,
  },
  medicalHistory: {
    type: String,
    required: false,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Patient", patientSchema, "patientsList");
