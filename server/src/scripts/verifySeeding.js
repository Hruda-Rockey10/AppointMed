const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const connectDB = require("../config/db");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../../../.env") });

// Connect to DB
connectDB();

const verifyData = async () => {
  try {
    const doctorCount = await doctorModel.countDocuments();
    const userCount = await userModel.countDocuments();
    
    console.log(`Total Doctors: ${doctorCount}`);
    console.log(`Total Users: ${userCount}`);

    if (doctorCount === 15 && userCount >= 17) { // 15 doctors + 1 admin + 1 user = 17
        console.log("Verification Successful: Correct number of records found.".green.bold);
    } else {
        console.log("Verification Failed: Incorrect number of records.".red.bold);
    }
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

verifyData();
