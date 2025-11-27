const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

//get single docotor
const getDoctorByIdController = async (req, res) => {
  try {
    console.log("getDoctorByIdController - doctorId:", req.body.doctorId);
    
    // Try to find by _id first
    let doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    
    // If not found, try finding by userId (in case they passed user ID instead of doctor ID)
    if (!doctor) {
      console.log("Doctor not found by _id, trying userId...");
      doctor = await doctorModel.findOne({ userId: req.body.doctorId });
    }
    
    console.log("Found doctor:", doctor ? doctor._id : "null");
    
    res.status(200).send({
      success: true,
      message: "Sigle Doc Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log("Error in getDoctorByIdController:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro in Single docot info",
    });
  }
};

const doctorAppointmentsController = async (req, res) => {
  try {
    console.log("Fetching appointments for user:", req.userId);
    const doctor = await doctorModel.findOne({ userId: req.userId });
    
    if (!doctor) {
        console.log("Doctor profile not found for user:", req.userId);
        return res.status(404).send({
            success: false,
            message: "Doctor profile not found",
        });
    }

    console.log("Found doctor:", doctor._id, doctor.firstName);
    
    // Try to find appointments with both String and ObjectId formats
    // This handles legacy data that might have been saved before the string conversion fix
    const doctorIdStr = doctor._id.toString();
    const doctorIdObj = doctor._id; // Keep as ObjectId
    
    console.log("Querying appointments with doctorId (string):", doctorIdStr);
    console.log("Querying appointments with doctorId (ObjectId):", doctorIdObj);

    const appointments = await appointmentModel.find({
      $or: [
        { doctorId: doctorIdStr },  // String format
        { doctorId: doctorIdObj }   // ObjectId format
      ]
    });

    console.log("Found appointments:", appointments.length);
    if (appointments.length > 0) {
        console.log("Sample appointment doctorId type:", typeof appointments[0].doctorId);
        console.log("Sample appointment doctorId value:", appointments[0].doctorId);
    }

    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log("Error in doctorAppointmentsController:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
