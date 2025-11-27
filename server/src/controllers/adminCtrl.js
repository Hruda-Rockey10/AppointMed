const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    console.log(`Fetched ${users.length} users`); // Debug log
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    console.log(`Fetched ${doctors.length} doctors`); // Debug log
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};

// doctor account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    console.log("📋 Received request - Doctor ID:", doctorId, "Status:", status);
    
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    
    console.log("👤 User found:", user.name, "Current isDoctor:", user.isDoctor);
    
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    
    // Set isDoctor based on status
    user.isDoctor = status === "approved" ? true : false;
    console.log("✅ Setting isDoctor to:", user.isDoctor);
    
    await user.save();
    console.log("💾 User saved successfully");
    
    res.status(201).send({
      success: true,
      message: `Account Status Updated - Doctor ${status}`,
      data: doctor,
    });
  } catch (error) {
    console.error("❌ Error in changeAccountStatusController:", error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

// block/unblock user
const blockUserController = async (req, res) => {
  try {
    const { userId, isBlocked } = req.body;
    
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { isBlocked },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating user status",
      error,
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
  blockUserController,
};
