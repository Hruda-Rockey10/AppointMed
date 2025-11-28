import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Badge, Button, Table } from "../../components/common";
import { userService } from "../../services/userService";
import { setUser } from "../../features/user/userSlice";
import moment from "moment";
import { FaEnvelope, FaPhone, FaRegEdit, FaCalendarCheck, FaUser, FaCamera, FaSave, FaTimes } from "react-icons/fa";

const PatientProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");
  const [isEditingHealth, setIsEditingHealth] = useState(false);
  const [healthData, setHealthData] = useState({
    height: user?.height || "",
    weight: user?.weight || "",
    bloodGroup: user?.bloodGroup || "",
    age: user?.age || "",
    phone: user?.phone || "",
  });

  const getAppointments = async () => {
    try {
      const res = await userService.getUserAppointments();
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhotoChange = async (photoData) => {
    setProfilePhoto(photoData);
    try {
      const res = await userService.updateUserProfile({
        ...user,
        profilePhoto: photoData,
      });
      if (res.success) {
        console.log("Profile photo updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHealthSave = async () => {
    try {
      const res = await userService.updateUserProfile({
        ...user,
        ...healthData,
      });
      if (res.success) {
        alert("Health metrics updated successfully!");
        dispatch(setUser(res.data));
        setIsEditingHealth(false);
      } else {
        alert("Failed to update health metrics");
      }
    } catch (error) {
      console.log(error);
      alert("Error updating health metrics");
    }
  };

  const handleCancelEdit = () => {
    setHealthData({
      height: user?.height || "",
      weight: user?.weight || "",
      bloodGroup: user?.bloodGroup || "",
      age: user?.age || "",
      phone: user?.phone || "",
    });
    setIsEditingHealth(false);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Layout>
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Account</p>
          <h1 className="text-3xl font-bold text-white">Personal Profile</h1>
          <p className="mt-2 text-slate-400">Keep your contact details and health metrics up to date.</p>
        </div>

        {/* Main Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-2xl">
          {/* Avatar Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-slate-700 bg-slate-900 text-5xl text-white shadow-xl">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <FaUser />
                )}
              </div>
              <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-slate-800 bg-slate-700 text-white transition-colors hover:bg-slate-600">
                <FaCamera className="text-sm" />
                <input type="file" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
            
            <p className="mb-1 text-sm text-slate-400">Click the camera icon to upload a photo</p>
            <p className="mb-6 text-xs text-slate-500">(Max 5MB, JPG/PNG)</p>

            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <p className="text-slate-400">{user?.email}</p>

            <div className="mt-4 flex gap-3">
              <Badge variant="neutral" className="px-4 py-1 text-sm font-medium">Patient</Badge>
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
                <span className="text-slate-200">{user?.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-500">
                  <FaPhone />
                </div>
                <span className="text-slate-200">{user?.phone || "Not provided"}</span>
              </div>
            </div>
          </div>

          {/* Secure Account Banner */}
          <div className="mt-8 rounded-xl bg-blue-500/10 p-6 text-blue-200 border border-blue-500/20">
            <p className="mb-1 font-bold text-blue-100">Secure Account</p>
            <p className="text-sm opacity-90">All profile updates trigger an email confirmation. Reach out to support for sensitive changes.</p>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-800/50 p-6 shadow-inner">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Health metrics</p>
            {!isEditingHealth ? (
              <button 
                onClick={() => setIsEditingHealth(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-400 transition-all hover:bg-blue-500/20"
              >
                <FaRegEdit /> Update
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleHealthSave}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600"
                >
                  <FaSave /> Save
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>

          {!isEditingHealth ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Height", value: `${user?.height || "--"} cm`, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
                { label: "Weight", value: `${user?.weight || "--"} kg`, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
                { label: "Blood group", value: user?.bloodGroup || "--", color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20" },
                { label: "Age", value: `${user?.age || "--"} yrs`, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
              ].map((metric) => (
                <div key={metric.label} className={`rounded-2xl border ${metric.border} ${metric.bg} p-4 text-center transition-transform hover:scale-105`}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-400">
                    {metric.label}
                  </p>
                  <p className={`mt-2 text-xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={healthData.height}
                  onChange={(e) => setHealthData({ ...healthData, height: e.target.value })}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Enter height in cm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={healthData.weight}
                  onChange={(e) => setHealthData({ ...healthData, weight: e.target.value })}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Enter weight in kg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Blood Group</label>
                <select
                  value={healthData.bloodGroup}
                  onChange={(e) => setHealthData({ ...healthData, bloodGroup: e.target.value })}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Age (years)</label>
                <input
                  type="number"
                  value={healthData.age}
                  onChange={(e) => setHealthData({ ...healthData, age: e.target.value })}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Enter age"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={healthData.phone}
                  onChange={(e) => setHealthData({ ...healthData, phone: e.target.value })}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          )}
        </div>

        {/* Recent Appointments */}
        <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-800/50 p-6 shadow-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Recent appointments</p>
          {appointments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-600 bg-slate-900/50 py-12 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700/50 text-slate-400">
                <FaCalendarCheck className="text-xl" />
              </div>
              <p className="text-slate-400">No appointment history found.</p>
              <Button 
                variant="link" 
                className="mt-2 text-blue-400 hover:text-blue-300"
                onClick={() => (window.location.href = "/doctors")}
              >
                Book your first appointment
              </Button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
              <Table hoverable>
                <Table.Head>
                  <Table.Row className="bg-slate-800">
                    <Table.Header>Doctor</Table.Header>
                    <Table.Header>Date & Time</Table.Header>
                    <Table.Header>Status</Table.Header>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {appointments.slice(0, 5).map((app) => (
                    <Table.Row key={app._id} className="border-b border-slate-700 last:border-0 hover:bg-slate-800/50">
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 font-bold">
                            {app.doctorInfo.firstName[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-200">
                              Dr. {app.doctorInfo.firstName} {app.doctorInfo.lastName}
                            </div>
                            <p className="text-xs text-slate-400">{app.doctorInfo.specialization}</p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-300">
                            {moment(app.date, "DD-MM-YYYY").format("MMM DD, YYYY")}
                          </span>
                          <span className="text-xs text-slate-500">
                            {moment(app.time, "HH:mm").format("hh:mm A")}
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge
                          variant={
                            app.status === "pending"
                              ? "warning"
                              : app.status === "approved"
                              ? "success"
                              : "error"
                          }
                        >
                          {app.status}
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}

          {appointments.length > 0 && (
            <div className="text-center">
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/appointments")}>
                View all appointments
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PatientProfile;
