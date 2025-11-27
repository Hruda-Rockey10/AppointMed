const mongoose = require("mongoose");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
require("dotenv").config({ path: "../.env" });

const verifyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    const doctors = await doctorModel.find({});
    console.log(`Found ${doctors.length} doctors`);

    for (const doctor of doctors) {
      if (!doctor.userId) {
        console.error(`Doctor ${doctor.firstName} ${doctor.lastName} (${doctor._id}) has NO userId`);
        continue;
      }

      const user = await userModel.findById(doctor.userId);
      if (!user) {
        console.error(`Doctor ${doctor.firstName} ${doctor.lastName} (${doctor._id}) has INVALID userId: ${doctor.userId}`);
      } else {
        console.log(`Doctor ${doctor.firstName} ${doctor.lastName} (${doctor._id}) linked to User ${user.name} [Status: ${doctor.status}]`);
      }
    }

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

verifyData();
