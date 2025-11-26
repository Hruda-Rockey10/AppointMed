import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { userService } from "../../services/userService";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alert/alertSlice";
import moment from "moment";
import { FaCalendar, FaClock, FaStethoscope, FaCheckCircle, FaTimesCircle, FaHourglass } from "react-icons/fa";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointments = async () => {
    try {
      dispatch(showLoading());
      const res = await userService.getUserAppointments();
      dispatch(hideLoading());
      console.log("Appointments response:", res); // Debug log
      if (res.success) {
        setAppointments(res.data);
      } else {
        console.error("Failed to fetch appointments:", res.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          icon: FaCheckCircle,
          color: "emerald",
          bgColor: "bg-emerald-500/10",
          borderColor: "border-emerald-400/30",
          textColor: "text-emerald-400"
        };
      case "rejected":
        return {
          icon: FaTimesCircle,
          color: "red",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-400/30",
          textColor: "text-red-400"
        };
      default:
        return {
          icon: FaHourglass,
          color: "amber",
          bgColor: "bg-amber-500/10",
          borderColor: "border-amber-400/30",
          textColor: "text-amber-400"
        };
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Care Log</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold text-white lg:text-4xl">
              My Appointments
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Review upcoming visits and check the latest status from your doctors
            </p>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl" />
          <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/30 to-slate-900/40 py-16 text-center backdrop-blur-xl">
            <p className="text-gray-400">No appointments yet. Book a doctor to get started.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => {
            const statusConfig = getStatusConfig(appointment.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div key={appointment._id} className="group relative overflow-hidden rounded-2xl">
                {/* Glow behind card */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Main card */}
                <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:border-blue-400/50 group-hover:shadow-2xl">
                  {/* Inner glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-transparent" />
                  
                  <div className="relative">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {/* Doctor Info */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-xl font-bold text-white shadow-lg shadow-blue-500/50">
                          {appointment.doctorInfo?.firstName?.[0] || 'D'}{appointment.doctorInfo?.lastName?.[0] || 'R'}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            Dr. {appointment.doctorInfo?.firstName || ''} {appointment.doctorInfo?.lastName || 'Doctor'}
                          </h3>
                          <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-0.5">
                            <FaStethoscope className="text-xs text-purple-400" />
                            <span className="text-xs font-semibold text-purple-400">
                              {appointment.doctorInfo?.specialization || 'General Physician'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className={`inline-flex items-center gap-2 rounded-xl border ${statusConfig.borderColor} ${statusConfig.bgColor} px-4 py-2`}>
                        <StatusIcon className={`text-base ${statusConfig.textColor}`} />
                        <span className={`text-sm font-bold capitalize ${statusConfig.textColor}`}>
                          {appointment.status || "pending"}
                        </span>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {/* Date */}
                      <div className="rounded-xl border border-blue-400/20 bg-blue-500/5 p-3">
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-sm text-blue-400" />
                          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Date</p>
                        </div>
                        <p className="mt-1 text-base font-bold text-white">
                          {moment(appointment.date, "DD-MM-YYYY").format("MMM DD, YYYY")}
                        </p>
                      </div>

                      {/* Time */}
                      <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-3">
                        <div className="flex items-center gap-2">
                          <FaClock className="text-sm text-cyan-400" />
                          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Time</p>
                        </div>
                        <p className="mt-1 text-base font-bold text-white">
                          {moment(appointment.time, "HH:mm").format("hh:mm A")}
                        </p>
                      </div>
                    </div>

                    {/* Appointment ID */}
                    <div className="mt-3 rounded-lg bg-slate-900/40 px-3 py-2">
                      <p className="text-xs text-gray-500">
                        Appointment ID: <span className="font-mono text-gray-400">#{appointment._id?.slice(-8)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default Appointments;
