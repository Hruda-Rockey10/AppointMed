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
import { FaUserMd, FaHospital, FaSave, FaGraduationCap, FaInfoCircle, FaRupeeSign, FaEnvelope, FaPhone, FaCalendarCheck, FaStar, FaClock, FaCamera, FaUser } from "react-icons/fa";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const getDoctorInfo = async () => {
    try {
      let res;
      if (params.id) {
        res = await doctorService.getDoctorInfo(params.id);
      } else {
        // If no ID, fetch the current doctor's profile (My Profile mode)
        res = await doctorService.getDoctorProfile();
        // The service returns response.data directly for getDoctorProfile, but response object for getDoctorInfo
        // We need to normalize this. 
        // Actually, looking at the service:
        // getDoctorInfo returns 'response' (axios object)
        // getDoctorProfile returns 'response.data'
        
        // Let's check the service implementation again to be sure.
        // getDoctorInfo: async (doctorId) => { const response = await api.post('/doctor/getDoctorById', { doctorId }); return response; },
        // getDoctorProfile: async () => { const response = await api.post('/doctor/getDoctorInfo'); return response.data; },
        
        // So if we use getDoctorProfile, res is already the data object.
        // If we use getDoctorInfo, res is the axios response, so we need res.data.
      }
      
      // Let's handle the response structure difference
      const data = params.id ? res.data : res;
      
      if (data.success) {
        setDoctor(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointments = async () => {
    try {
      const res = await doctorService.getDoctorAppointments();
      if (res.success) {
        setAppointments(res.data.slice(0, 3));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    getAppointments();
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
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Professional</p>
            <h1 className="text-3xl font-bold text-white">Doctor Profile</h1>
            <p className="mt-2 text-slate-400">Manage your professional information and availability.</p>
          </div>
          <button 
            onClick={handleUpdate}
            className="btn-primary inline-flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <FaSave /> Save Changes
          </button>
        </div>

        {/* Main Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-2xl">
          {/* Avatar Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-slate-700 bg-slate-900 text-5xl text-white shadow-xl">
                {doctor.profilePhoto ? (
                  <img src={doctor.profilePhoto} alt="Profile" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <FaUserMd />
                )}
              </div>
              <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-slate-800 bg-slate-700 text-white transition-colors hover:bg-slate-600">
                <FaCamera className="text-sm" />
                <input type="file" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
            
            <p className="mb-1 text-sm text-slate-400">Click the camera icon to upload a photo</p>
            <p className="mb-6 text-xs text-slate-500">(Max 5MB, JPG/PNG)</p>

            <h2 className="text-2xl font-bold text-white">Dr. {doctor.firstName} {doctor.lastName}</h2>
            <p className="text-slate-400">{doctor.specialization}</p>

            <div className="mt-4 flex gap-3">
              <Badge variant="info" className="px-4 py-1 text-sm font-medium">Doctor</Badge>
              {doctor.status === "approved" && <Badge variant="success" className="px-4 py-1 text-sm font-medium">Verified</Badge>}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-10 rounded-2xl bg-slate-700/50 p-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Contact</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-500">
                  <FaEnvelope />
                </div>
                <span className="text-slate-200">{doctor.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-500">
                  <FaPhone />
                </div>
                <span className="text-slate-200">{doctor.phone || "Not provided"}</span>
              </div>
            </div>
          </div>

          {/* Professional Account Banner */}
          <div className="mt-8 rounded-xl bg-blue-500/10 p-6 text-blue-200 border border-blue-500/20">
            <p className="mb-1 font-bold text-blue-100">Professional Account</p>
            <p className="text-sm opacity-90">Keep your credentials and availability updated to receive appointment requests.</p>
          </div>
        </div>

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

        {/* Editable Details Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Personal Information */}
          <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-800/50 p-6 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Personal Information</p>
            <div className="space-y-4">
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
              <FormField
                label="Address"
                name="address"
                value={doctor.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Professional Details */}
          <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-800/50 p-6 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Professional Details</p>
            <div className="space-y-4">
              <FormField
                label="Specialization"
                name="specialization"
                value={doctor.specialization}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Experience (yrs)"
                  name="experience"
                  type="number"
                  value={doctor.experience}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Fees (₹)"
                  name="feesPerCunsaltation"
                  type="number"
                  value={doctor.feesPerCunsaltation}
                  onChange={handleChange}
                  required
                />
              </div>
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
            </div>
          </div>
        </div>

        {/* Full Width Text Areas */}
        <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-800/50 p-6 shadow-inner">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Additional Information</p>
          <div className="space-y-4">
            <FormField
              label="About / Bio"
              name="about"
              type="textarea"
              value={doctor.about || ""}
              onChange={handleChange}
              placeholder="Brief description about yourself..."
            />
            <FormField
              label="Practice Log / Professional Experience"
              name="practiceLog"
              type="textarea"
              value={doctor.practiceLog || ""}
              onChange={handleChange}
              placeholder="Your practice history, hospital affiliations, procedures performed, certifications..."
            />
            <DaySelector
              selectedDays={doctor.availability || []}
              onChange={handleAvailabilityChange}
            />
          </div>
        </div>

        {/* Patient Appointments Section */}
        <div className="rounded-3xl border border-slate-700 bg-slate-800/50 p-6 shadow-inner">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Recent</p>
              <h3 className="text-lg font-semibold text-white">Patient Appointments</h3>
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => navigate("/doctor-appointments")}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {appointments.length === 0 ? (
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-center">
                <FaCalendarCheck className="mx-auto text-3xl text-blue-400/50 mb-2" />
                <p className="text-sm text-slate-400">No appointments yet</p>
                <p className="text-xs text-slate-500 mt-1">Patient appointments will appear here</p>
              </div>
            ) : (
              appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-xl border border-slate-700 bg-slate-900 p-4 transition-all hover:border-blue-500/30 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white">
                          {appointment.userInfo?.name?.[0] || 'P'}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {appointment.userInfo?.name || 'Patient'}
                          </h4>
                          <p className="text-xs text-slate-400">
                            {moment(appointment.date, "DD-MM-YYYY").format("MMM DD, YYYY")} • {moment(appointment.time, "HH:mm").format("hh:mm A")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Badge variant={
                      appointment.status === 'approved' ? 'success' : 
                      appointment.status === 'rejected' ? 'error' : 
                      'warning'
                    }>
                      {appointment.status || 'pending'}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
