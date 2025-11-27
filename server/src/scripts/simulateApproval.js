const mongoose = require("mongoose");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
require("dotenv").config({ path: "../.env" });

const simulateApproval = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Find the pending 'Test Op' doctor by ID
    const doctorId = "6927e1c0cf96744f155f1e8c";
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      console.error("Doctor not found");
      process.exit(1);
    }

    console.log(`Found doctor: ${doctor.firstName} ${doctor.lastName}, Status: ${doctor.status}`);

    const status = "approved";
    console.log(`Attempting to update status to: ${status}`);

    // Simulate controller logic
    const updatedDoctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    console.log("Doctor status updated (returned doc might be old):", updatedDoctor.status);

    const user = await userModel.findOne({ _id: updatedDoctor.userId });
    if (!user) {
      console.error("User not found");
      process.exit(1);
    }
    console.log(`Found user: ${user.name}, isDoctor: ${user.isDoctor}`);

    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    console.log(`User updated. isDoctor: ${user.isDoctor}`);

    // Verify final state
    const finalDoctor = await doctorModel.findById(doctorId);
    console.log(`Final Doctor Status: ${finalDoctor.status}`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

simulateApproval();
