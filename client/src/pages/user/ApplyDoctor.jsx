import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../features/alert/alertSlice";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaHospital, FaClock, FaRupeeSign, FaGraduationCap, FaInfoCircle, FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaStethoscope, FaBriefcase } from "react-icons/fa";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    specialization: "",
    education: "",
    institute: "",
    experience: "",
    feesPerCunsaltation: "",
    about: "",
    timings: {
      start: "",
      end: "",
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimingChange = (e) => {
    setFormData({
      ...formData,
      timings: { ...formData.timings, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await userService.applyDoctor({
        ...formData,
        userId: user._id,
      });
      dispatch(hideLoading());
      if (res && res.success) {
        alert(res.message || "Application submitted successfully!");
        navigate("/");
      } else {
        alert(res?.message || "Failed to submit application");
        console.log(res?.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      alert("Error submitting application");
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* Header Section */}
      <div className="relative mb-8 overflow-hidden rounded-3xl">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/20 blur-3xl" />
        
        <div className="relative rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 via-slate-900/70 to-blue-950/50 p-8 shadow-2xl backdrop-blur-xl">
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-transparent" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Join Our Network</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold text-white lg:text-4xl">
              Apply as a Doctor
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Join our network of trusted medical professionals
            </p>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
        
        {/* Personal Information Section */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl" />
          
          <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 p-6 shadow-xl backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-transparent" />
            
            <div className="relative space-y-6">
              {/* Section Header */}
              <div className="flex items-center gap-3 border-b border-blue-400/20 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
                  <FaUserMd className="text-lg text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Personal Information</h2>
                  <p className="text-xs text-gray-400">Your basic contact details</p>
                </div>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* First Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="John"
                    className="w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Doe"
                    className="w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    <FaPhone className="mr-2 inline text-blue-400" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    <FaEnvelope className="mr-2 inline text-cyan-400" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="doctor@example.com"
                    className="w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    <FaGlobe className="mr-2 inline text-purple-400" />
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://drjohndoe.com"
                    className="w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    <FaMapMarkerAlt className="mr-2 inline text-emerald-400" />
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Clinic Address"
                    className="w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Details Section */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-xl" />
          
          <div className="relative rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-purple-950/40 p-6 shadow-xl backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/5 to-transparent" />
            
            <div className="relative space-y-6">
              {/* Section Header */}
              <div className="flex items-center gap-3 border-b border-purple-400/20 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
                  <FaHospital className="text-lg text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Professional Details</h2>
                  <p className="text-xs text-gray-400">Your medical qualifications and experience</p>
                </div>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Specialization */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    <FaStethoscope className="mr-2 inline text-purple-400" />
                    Specialization *
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Cardiologist"
                    className="w-full rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    <FaBriefcase className="mr-2 inline text-purple-400" />
                    Experience *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 5+ years"
                    className="w-full rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>

                {/* Education */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    <FaGraduationCap className="mr-2 inline text-purple-400" />
                    Education / Degree *
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                    placeholder="e.g. MBBS, MD"
                    className="w-full rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>

                {/* Institute */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    <FaHospital className="mr-2 inline text-purple-400" />
                    Institute / Hospital *
                  </label>
                  <input
                    type="text"
                    name="institute"
                    value={formData.institute}
                    onChange={handleChange}
                    required
                    placeholder="e.g. AIIMS Delhi"
                    className="w-full rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>

                {/* Fees */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    <FaRupeeSign className="mr-2 inline text-emerald-400" />
                    Fees Per Consultation (₹) *
                  </label>
                  <input
                    type="number"
                    name="feesPerCunsaltation"
                    value={formData.feesPerCunsaltation}
                    onChange={handleChange}
                    required
                    placeholder="500"
                    className="w-full rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>

                {/* Timings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      <FaClock className="mr-2 inline text-cyan-400" />
                      Start Time *
                    </label>
                    <input
                      type="time"
                      name="start"
                      value={formData.timings.start}
                      onChange={handleTimingChange}
                      required
                      className="w-full rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      <FaClock className="mr-2 inline text-cyan-400" />
                      End Time *
                    </label>
                    <input
                      type="time"
                      name="end"
                      value={formData.timings.end}
                      onChange={handleTimingChange}
                      required
                      className="w-full rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    />
                  </div>
                </div>

                {/* About */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    <FaInfoCircle className="mr-2 inline text-blue-400" />
                    About / Bio
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Brief description about yourself..."
                    className="w-full rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/60"
          >
            Submit Application
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default ApplyDoctor;
