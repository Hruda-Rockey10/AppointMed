const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const doctorModel = require("../models/doctorModel");
const connectDB = require("../config/db");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../../../.env") });

// Connect to DB
connectDB();

const verifyPracticeLog = async () => {
  try {
    const doctors = await doctorModel.find().select('firstName lastName practiceLog');
    
    console.log(`Total Doctors: ${doctors.length}\n`);

    let doctorsWithPracticeLog = 0;
    doctors.forEach((doctor, index) => {
      if (doctor.practiceLog && doctor.practiceLog.length > 0) {
        doctorsWithPracticeLog++;
        console.log(`${index + 1}. ${doctor.firstName} ${doctor.lastName}`.green);
        console.log(`   Practice Log: ${doctor.practiceLog.substring(0, 80)}...`);
      } else {
        console.log(`${index + 1}. ${doctor.firstName} ${doctor.lastName}`.red + " - NO PRACTICE LOG");
      }
    });

    console.log(`\n${"=".repeat(60)}`);
    console.log(`Doctors with Practice Log: ${doctorsWithPracticeLog}/${doctors.length}`.bold);
    
    if (doctorsWithPracticeLog === doctors.length) {
      console.log("✅ Verification Successful: All doctors have practice logs!".green.bold);
    } else {
      console.log("❌ Verification Failed: Some doctors missing practice logs".red.bold);
    }
    
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

verifyPracticeLog();
