import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { doctorService } from "../../services/doctorService";
import { useParams, useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../features/alert/alertSlice";
import { 
  SectionHeader,
  StatCard,
  FormField, 
  Button, 
  ProfilePhotoUpload, 
  DaySelector,
  Badge
} from "../../components/common";
import { FaUserMd, FaHospital, FaSave, FaGraduationCap, FaInfoCircle, FaRupeeSign, FaEnvelope, FaPhone, FaCalendarCheck, FaStar, FaClock } from "react-icons/fa";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const getDoctorInfo = async () => {
    try {
      const res = await doctorService.getDoctorInfo(params.id);
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleTimingChange = (e) => {
    setDoctor({
      ...doctor,
      timings: { ...doctor.timings, [e.target.name]: e.target.value },
    });
  };

  const handlePhotoChange = (photoData) => {
    setDoctor({ ...doctor, profilePhoto: photoData });
  };

  const handleAvailabilityChange = (days) => {
    setDoctor({ ...doctor, availability: days });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await doctorService.updateProfile({
        ...doctor,
        userId: user._id,
      });
      dispatch(hideLoading());
      if (res.data.success) {
        alert("Profile updated successfully!");
        getDoctorInfo();
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  if (!doctor) return null;

  return (
    <Layout>
      <section className="space-y-8 rounded-3xl border border-[#4a5568] bg-[#2d3748] p-6 shadow-lg">
        <SectionHeader
          eyebrow="Professional"
          title="Doctor Profile"
          description="Manage your professional information and availability."
          action={
            <button 
              onClick={handleUpdate}
              className="btn-primary inline-flex items-center gap-2"
            >
              <FaSave /> Save Changes
            </button>
          }
        />

        {/* Statistics Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={<FaCalendarCheck />}
            label="Total Appointments"
            value={doctor.totalAppointments || "0"}
            variant="primary"
          />
          <StatCard
            icon={<FaStar />}
            label="Average Rating"
            value={doctor.rating || "4.8"}
            variant="warning"
          />
          <StatCard
            icon={<FaClock />}
            label="Years of Experience"
            value={doctor.experience || "0"}
            variant="success"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
          {/* Left Column - Profile Info */}
          <div className="space-y-6 rounded-2xl border border-[#4a5568] bg-[#1f2937] p-6">
            <div className="text-center">
              <ProfilePhotoUpload currentPhoto={doctor.profilePhoto} onPhotoChange={handlePhotoChange} />
              <h2 className="mt-4 text-xl font-semibold text-gray-100">
                Dr. {doctor.firstName} {doctor.lastName}
              </h2>
              <p className="text-sm text-gray-400">{doctor.specialization}</p>
              <div className="mt-3 inline-flex flex-wrap justify-center gap-2">
                <Badge variant="info">Doctor</Badge>
                {doctor.status === "approved" && <Badge variant="success">Verified</Badge>}
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-[#4a5568] bg-[#2d3748] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Contact</p>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 px-3 py-2 text-amber-500">
                    <FaEnvelope />
                  </div>
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 px-3 py-2 text-amber-500">
                    <FaPhone />
                  </div>
                  <span>{doctor.phone || "Not provided"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs text-gray-300">
              <p className="font-semibold text-gray-100">Professional Account</p>
              <p>Keep your credentials and availability updated to receive appointment requests.</p>
            </div>
          </div>

          {/* Right Column - Editable Details */}
          <div className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4 rounded-3xl border border-[#4a5568] bg-[#2d3748] p-6 shadow">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Personal Information</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="First Name"
                  name="firstName"
                  value={doctor.firstName}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Last Name"
                  name="lastName"
                  value={doctor.lastName}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Phone Number"
                  name="phone"
                  value={doctor.phone}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Website"
                  name="website"
                  value={doctor.website || ""}
                  onChange={handleChange}
                  placeholder="https://..."
                />
                <div className="sm:col-span-2">
                  <FormField
                    label="Address"
                    name="address"
                    value={doctor.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="space-y-4 rounded-3xl border border-[#4a5568] bg-[#2d3748] p-6 shadow">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Professional Details</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Specialization"
                  name="specialization"
                  value={doctor.specialization}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Experience (years)"
                  name="experience"
                  type="number"
                  value={doctor.experience}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Education / Degree"
                  name="education"
                  value={doctor.education || ""}
                  onChange={handleChange}
                  placeholder="e.g. MBBS, MD"
                />
                <FormField
                  label="Institute / Hospital"
                  name="institute"
                  value={doctor.institute || ""}
                  onChange={handleChange}
                  placeholder="e.g. AIIMS Delhi"
                />
                <FormField
                  label="Fees Per Consultation (₹)"
                  name="feesPerCunsaltation"
                  type="number"
                  value={doctor.feesPerCunsaltation}
                  onChange={handleChange}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Start Time"
                    name="start"
                    type="time"
                    value={doctor.timings?.start}
                    onChange={handleTimingChange}
                    required
                  />
                  <FormField
                    label="End Time"
                    name="end"
                    type="time"
                    value={doctor.timings?.end}
                    onChange={handleTimingChange}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <FormField
                    label="About / Bio"
                    name="about"
                    type="textarea"
                    value={doctor.about || ""}
                    onChange={handleChange}
                    placeholder="Brief description about yourself..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <DaySelector
                    selectedDays={doctor.availability || []}
                    onChange={handleAvailabilityChange}
                  />
                </div>
              </div>
            </div>

            {/* Quick Link to Appointments */}
            <div className="rounded-3xl border border-[#4a5568] bg-[#2d3748] p-6 shadow text-center">
              <FaHospital className="mx-auto text-4xl text-amber-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Manage Appointments</h3>
              <p className="text-sm text-gray-400 mb-4">View and manage your patient appointments</p>
              <Button 
                variant="outline" 
                onClick={() => navigate("/doctor-appointments")}
              >
                Go to Appointments Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
