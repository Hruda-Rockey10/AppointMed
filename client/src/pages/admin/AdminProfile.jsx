import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Badge, ProfilePhotoUpload, SectionHeader, StatCard } from "../../components/common";
import { adminService } from "../../services/adminService";
import { FaEnvelope, FaPhone, FaUsers, FaUserMd, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

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

      if (usersRes.data.success && doctorsRes.data.success) {
        const doctors = doctorsRes.data.data;
        setStats({
          totalUsers: usersRes.data.data.length,
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
      <section className="space-y-8 rounded-3xl border border-[#4a5568] bg-[#2d3748] p-6 shadow-lg">
        <SectionHeader
          eyebrow="Administration"
          title="Admin Dashboard"
          description="Manage system users, doctors, and monitor platform activity."
        />

        <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
          {/* Left Column - Profile Info */}
          <div className="space-y-6 rounded-2xl border border-[#4a5568] bg-[#1f2937] p-6">
            <div className="text-center">
              <ProfilePhotoUpload currentPhoto={profilePhoto} onPhotoChange={handlePhotoChange} />
              <h2 className="mt-4 text-xl font-semibold text-gray-100">{user?.name}</h2>
              <p className="text-sm text-gray-400">{user?.email}</p>
              <div className="mt-3 inline-flex flex-wrap justify-center gap-2">
                <Badge variant="warning">Admin</Badge>
                <Badge variant="success">Verified</Badge>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-[#4a5568] bg-[#2d3748] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Contact</p>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 px-3 py-2 text-amber-500">
                    <FaEnvelope />
                  </div>
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 px-3 py-2 text-amber-500">
                    <FaPhone />
                  </div>
                  <span>{user?.phone || "Not provided"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-xs text-gray-300">
              <p className="font-semibold text-gray-100">Administrator Access</p>
              <p>You have full access to manage users, doctors, and system settings.</p>
            </div>
          </div>

          {/* Right Column - System Statistics */}
          <div className="space-y-8">
            <div className="space-y-4 rounded-3xl border border-white/70 bg-white/90 p-6 shadow">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">System Overview</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <StatCard
                  icon={<FaUsers />}
                  label="Total Users"
                  value={stats.totalUsers}
                  variant="primary"
                />
                <StatCard
                  icon={<FaUserMd />}
                  label="Total Doctors"
                  value={stats.totalDoctors}
                  variant="success"
                />
                <StatCard
                  icon={<FaClipboardList />}
                  label="Pending Applications"
                  value={stats.pendingDoctors}
                  variant="warning"
                />
                <StatCard
                  icon={<FaCalendarAlt />}
                  label="Total Appointments"
                  value={stats.totalAppointments}
                  variant="secondary"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4 rounded-3xl border border-[#4a5568] bg-[#2d3748] p-6 shadow">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Quick Actions</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => (window.location.href = "/admin/users")}
                  className="rounded-xl border border-[#4a5568] bg-[#1f2937] p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <FaUsers className="mb-2 text-2xl text-amber-500" />
                  <p className="font-semibold text-gray-100">Manage Users</p>
                  <p className="text-xs text-gray-400">View and manage all users</p>
                </button>
                <button
                  onClick={() => (window.location.href = "/admin/doctors")}
                  className="rounded-xl border border-[#4a5568] bg-[#1f2937] p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <FaUserMd className="mb-2 text-2xl text-green-500" />
                  <p className="font-semibold text-gray-100">Manage Doctors</p>
                  <p className="text-xs text-gray-400">Review doctor applications</p>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4 rounded-3xl border border-white/70 bg-white/90 p-6 shadow">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">Recent Activity</p>
              <div className="rounded-2xl border border-white/60 bg-[#1f2937]/60 py-8 text-center text-gray-400">
                Activity tracking coming soon...
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminProfile;
