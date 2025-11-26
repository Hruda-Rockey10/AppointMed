const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  seenNotification: {
    type: Array,
    default: [],
  },
  phone: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "",
  },
  weight: {
    type: String,
    default: "",
  },
  age: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  bloodGroup: {
    type: String,
    default: "",
  },
  profilePhoto: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
