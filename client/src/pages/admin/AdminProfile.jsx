import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Badge, ProfilePhotoUpload, StatCard } from "../../components/common";
import { adminService } from "../../services/adminService";
import { FaEnvelope, FaPhone, FaUsers, FaUserMd, FaCalendarAlt, FaClipboardList, FaCamera, FaUser, FaShieldAlt, FaCog } from "react-icons/fa";

const AdminProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    pendingDoctors: 0,
    totalAppointments: 0,
  });
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");

  const getAdminStats = async () => {
    try {
      const [usersRes, doctorsRes] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getAllDoctors(),
      ]);

      if (usersRes.success && doctorsRes.success) {
        const doctors = doctorsRes.data;
        setStats({
          totalUsers: usersRes.data.length,
          totalDoctors: doctors.length,
          pendingDoctors: doctors.filter((d) => d.status === "pending").length,
          totalAppointments: 0, // This would need a separate API call
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminStats();
  }, []);

  const handlePhotoChange = async (photoData) => {
    setProfilePhoto(photoData);
    // TODO: Add API call to update admin profile photo
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header with Gradient */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-3xl" />
          
          <div klassName="relative rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/50 via-slate-900/70 to-blue-950/50 p-8 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 to-transparent" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5">
                <FaShieldAlt className="text-purple-400" />
                <span className="text-sm font-bold uppercase tracking-widest text-purple-400">Administration</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-bold text-white lg:text-5xl">
                Admin Dashboard
              </h1>
              <p className="mt-3 text-lg text-slate-300">
                Manage system users, doctors, and monitor platform activity
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid - Full Width */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-400">Total Users</p>
                  <p className="mt-2 text-3xl font-bold text-white">{stats.totalUsers}</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
                  <FaUsers className="text-2xl text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-950/40 via-slate-900/60 to-emerald-950/40 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-400">Total Doctors</p>
                  <p className="mt-2 text-3xl font-bold text-white">{stats.totalDoctors}</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/50">
                  <FaUserMd className="text-2xl text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-950/40 via-slate-900/60 to-amber-950/40 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-400">Pending Applications</p>
                  <p className="mt-2 text-3xl font-bold text-white">{stats.pendingDoctors}</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/50">
                  <FaClipboardList className="text-2xl text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-purple-950/40 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-400">Total Appointments</p>
                  <p className="mt-2 text-3xl font-bold text-white">{stats.totalAppointments}</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
                  <FaCalendarAlt className="text-2xl text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile & Quick Actions Grid */}
        <div className="grid gap-8 lg:grid-cols-[380px,1fr]">
          {/* Profile Card */}
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/10 blur-xl" />
            
            <div className="relative space-y-6 rounded-3xl border border-purple-400/30 bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-blue-950/40 p-8 backdrop-blur-xl">
              {/* Profile Photo */}
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-purple-500/30 bg-slate-900 text-5xl text-white shadow-xl">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-slate-900 bg-purple-600 text-white transition-colors hover:bg-purple-700">
                    <FaCamera className="text-sm" />
                    <input type="file" className="hidden" onChange={handlePhotoChange} />
                  </label>
                </div>
                
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                <p className="text-slate-400">{user?.email}</p>
                
                <div className="mt-4 flex gap-3">
                  <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-400">
                    <FaShieldAlt className="mr-1.5 inline text-xs" />
                    Admin
                  </span>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400">
                    Verified
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Contact Information</p>
                
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-sm text-white">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                    <FaPhone className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="text-sm text-white">{user?.phone || "Not provided"}</p>
                  </div>
                </div>
              </div>

              {/* Admin Badge */}
              <div className="rounded-xl border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500">
                    <FaShieldAlt className="text-sm text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-purple-300">Administrator Access</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Full system access to manage users, doctors, and settings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 blur-xl" />
              
              <div className="relative rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 p-8 backdrop-blur-xl">
                <h3 className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">Quick Actions</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    onClick={() => (window.location.href = "/admin/users")}
                    className="group relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-900/40 to-cyan-900/20 p-6 text-left transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20"
                  >
                    <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-blue-500/10 transition-all group-hover:bg-blue-500/20 blur-2xl" />
                    <div className="relative">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                        <FaUsers className="text-xl text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Manage Users</h4>
                      <p className="mt-2 text-sm text-slate-400">View and manage all registered users on the platform</p>
                    </div>
                  </button>

                  <button
                    onClick={() => (window.location.href = "/admin/doctors")}
                    className="group relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-900/40 to-green-900/20 p-6 text-left transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/20"
                  >
                    <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-emerald-500/10 transition-all group-hover:bg-emerald-500/20 blur-2xl" />
                    <div className="relative">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg">
                        <FaUserMd className="text-xl text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Manage Doctors</h4>
                      <p className="mt-2 text-sm text-slate-400">Review applications & manage doctor profiles</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Settings Button */}
            <button
              onClick={() => alert("Settings coming soon!")}
              className="group relative w-full overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl" />
              
              <div className="relative flex items-center gap-4 rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-900/40 to-pink-900/20 p-6 transition-all hover:border-purple-400/50">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <FaCog className="text-2xl text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-white">System Settings</h4>
                  <p className="text-sm text-slate-400">Configure platform settings and preferences</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
