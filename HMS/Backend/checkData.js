const mongoose = require("mongoose");
require("dotenv").config();
const Patient = require("./models/Patient");

const checkData = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/hms_db";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const count = await Patient.countDocuments();
    console.log(`Total Patients in 'patientsList' collection: ${count}`);

    if (count > 0) {
      const patients = await Patient.find().limit(5);
      console.log("Sample Data:", JSON.stringify(patients, null, 2));
    } else {
      console.log("No patients found in the collection.");
    }

    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

checkData();
