const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    if (user.isBlocked) {
      return res
        .status(200)
        .send({ message: "Your account has been blocked", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// APpply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = new doctorModel({ ...req.body, status: "pending", userId: req.userId });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

//notification ctrl
//notification ctrl
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    const notifications = user.notification || [];
    
    // If no new notifications, just return the user
    if (notifications.length === 0) {
        user.password = undefined;
        return res.status(200).send({
            success: true,
            message: "No new notifications",
            data: user,
        });
    }

    // Move notifications to seenNotification and clear notification array
    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      {
        $push: { seenNotification: { $each: notifications } },
        $set: { notification: [] }
      },
      { new: true }
    );
    
    updatedUser.password = undefined;
    
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error in getAllNotificationController:", error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error: error.message,
    });
  }
};

// delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
        req.userId,
        { $set: { notification: [], seenNotification: [] } },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(404).send({
            message: "User not found",
            success: false,
        });
    }

    updatedUser.password = undefined;


    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error in deleteAllNotificationController:", error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error: error.message,
    });
  }
};

//GET ALL DOC
const getAllDocotrsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching DOcotr",
    });
  }
};

//BOOK APPOINTMENT
const bookeAppointmnetController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "YYYY-MM-DD").format("DD-MM-YYYY");
    req.body.time = moment(req.body.time, "HH:mm").format("HH:mm");
    req.body.status = "pending";
    
    // Ensure IDs are strings to match appointmentModel schema
    const appointmentData = {
      ...req.body,
      userId: req.userId.toString(),
      doctorId: req.body.doctorId.toString(),
    };
    

    
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();
    

    
    // Try to send notification to doctor (optional - don't fail booking if doctor user not found)
    try {
      const doctorUserId = req.body.doctorUserId || req.body.doctorInfo.userId;
      if (doctorUserId) {
        const doctorUser = await userModel.findOne({ _id: doctorUserId });
        if (doctorUser) {
          const userName = req.body.userInfo.name || `${req.body.userInfo.firstName || ''} ${req.body.userInfo.lastName || ''}`.trim();
          
          doctorUser.notification.push({
            type: "New-appointment-request",
            message: `A New Appointment Request from ${userName}`,
            onClickPath: "/user/appointments",
          });
          await doctorUser.save();
        } else {
          console.warn("Doctor user not found for notification:", doctorUserId);
        }
      } else {
        console.warn("No doctor userId provided for notification");
      }
    } catch (notificationError) {
      console.error("Error sending notification (non-fatal):", notificationError);
    }
    
    res.status(200).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.log("Booking error:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

// booking bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "YYYY-MM-DD").format("DD-MM-YYYY");
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .format("HH:mm");
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").format("HH:mm");
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};
//user appointments controller
const userAppointmentsController = async (req, res) => {
  try {

    
    // userId is stored as String in appointmentModel
    const userIdStr = req.userId.toString();

    
    const appointments = await appointmentModel.find({
      userId: userIdStr,
    });
    

    
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log("Error in userAppointmentsController:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,

};

// Update user profile
const updateUserProfileController = async (req, res) => {
  try {
    const { height, weight, bloodGroup, age, phone } = req.body;
    
    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          height,
          weight,
          bloodGroup,
          age,
          phone,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    updatedUser.password = undefined;

    
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error in updateUserProfileController:", error);
    res.status(500).send({
      success: false,
      message: "Unable to update profile",
      error: error.message,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  updateUserProfileController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
};
