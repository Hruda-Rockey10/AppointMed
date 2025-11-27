import React from "react";
import { useSelector } from "react-redux";
import PatientProfile from "./user/PatientProfile";
import DoctorProfile from "./doctor/Profile";
import AdminProfile from "./admin/AdminProfile";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return null;
  }

  if (user.isAdmin) {
    return <AdminProfile />;
  }

  if (user.isDoctor) {
    return <DoctorProfile />;
  }

  return <PatientProfile />;
};

export default UserProfile;
