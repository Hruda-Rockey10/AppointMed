import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { doctorService } from "../../services/doctorService";
import { userService } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../features/alert/alertSlice";
import { FaCalendar, FaClock, FaStethoscope, FaMapMarkerAlt, FaGraduationCap, FaHospital, FaBriefcase, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const BookingPage = () => {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
    const [availabilityMessage, setAvailabilityMessage] = useState("");
    const dispatch = useDispatch();

    const getDoctorData = async () => {
        try {
            dispatch(showLoading());
            const res = await doctorService.getDoctorById(params.doctorId);
            dispatch(hideLoading());
            if (res.success) {
                setDoctor(res.data);
            } else {
                console.error('Failed to fetch doctor:', res.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error('Error fetching doctor:', error);
        }
    };

    const handleBooking = async () => {
        try {
            if (!date || !time) {
                setAvailabilityMessage("Please select both date and time");
                return;
            }
            
            const bookingData = {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctor,
                userInfo: user,
                date: date,
                time: time,
                doctorUserId: doctor.userId || doctor._id, // Add doctorUserId for notifications
            };
            
            console.log("Booking data being sent:", bookingData);
            console.log("Doctor object:", doctor);
            console.log("Doctor userId:", doctor.userId);
            
            dispatch(showLoading());
            const res = await userService.bookAppointment(bookingData);
            dispatch(hideLoading());
            
            console.log("Booking response:", res);
            
            if (res && res.success) {
                alert(res.message || "Appointment booked successfully!");
                navigate("/appointments");
            } else {
                alert(res?.message || "Failed to book appointment");
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error("Booking error:", error);
            console.error("Error response:", error.response?.data);
            alert(`Error booking appointment: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleAvailability = async () => {
        try {
            if (!date || !time) {
                setAvailabilityMessage("Please select both date and time");
                setIsAvailable(false);
                return;
            }
            dispatch(showLoading());
            const res = await userService.checkAvailability({
                doctorId: params.doctorId,
                date,
                time,
            });
            dispatch(hideLoading());
            if (res.success) {
                setIsAvailable(true);
                setAvailabilityMessage(res.message || "Slot is available!");
            } else {
                setIsAvailable(false);
                setAvailabilityMessage(res.message || "Slot not available");
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            setAvailabilityMessage("Error checking availability");
            setIsAvailable(false);
        }
    };

    useEffect(() => {
        getDoctorData();
    }, []);

    if (!doctor) {
        return (
            <Layout>
                <div className="flex items-center justify-center py-20">
                    <div className="rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50 px-8 py-6 backdrop-blur-xl">
                        <p className="text-gray-300">Loading doctor information...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Header Section */}
            <div className="relative mb-8 overflow-hidden rounded-3xl">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/20 blur-3xl" />
                
                <div className="relative rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 via-slate-900/70 to-blue-950/50 p-8 shadow-2xl backdrop-blur-xl">
                    {/* Inner glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-transparent" />
                    
                    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1">
                                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Book Appointment</span>
                            </div>
                            <h1 className="font-display text-3xl font-bold text-white lg:text-4xl">
                                Dr. {doctor.firstName} {doctor.lastName}
                            </h1>
                            <p className="text-sm text-gray-300">
                                {doctor.specialization} • Select your desired date and time below
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-5 py-3 text-center backdrop-blur-sm">
                                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">Schedule</p>
                                <p className="mt-1 text-base font-bold text-white">
                                    {doctor.timings?.start} - {doctor.timings?.end}
                                </p>
                            </div>
                            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 text-center backdrop-blur-sm">
                                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Fees</p>
                                <p className="mt-1 text-base font-bold text-white">₹{doctor.feesPerCunsaltation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                
                {/* Appointment Form */}
                <div className="relative overflow-hidden rounded-2xl">
                    {/* Glow behind card */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl" />
                    
                    <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 p-6 shadow-xl backdrop-blur-xl">
                        {/* Inner glow */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-transparent" />
                        
                        <div className="relative space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-white">Appointment Details</h2>
                                <p className="text-sm text-gray-400">Choose your preferred date and time</p>
                            </div>

                            {/* Date Input */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-300">
                                    <FaCalendar className="mr-2 inline text-blue-400" />
                                    Appointment Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                        setIsAvailable(false);
                                        setAvailabilityMessage("");
                                    }}
                                    min={new Date().toISOString().split("T")[0]}
                                    className="w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                />
                            </div>

                            {/* Time Input */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-300">
                                    <FaClock className="mr-2 inline text-cyan-400" />
                                    Appointment Time
                                </label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => {
                                        setTime(e.target.value);
                                        setIsAvailable(false);
                                        setAvailabilityMessage("");
                                    }}
                                    className="w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                />
                            </div>

                            {/* Availability Message */}
                            {availabilityMessage && (
                                <div className={`rounded-xl border p-4 ${
                                    isAvailable
                                        ? "border-emerald-400/40 bg-emerald-500/10"
                                        : "border-amber-400/40 bg-amber-500/10"
                                }`}>
                                    <div className="flex items-start gap-3">
                                        {isAvailable ? (
                                            <FaCheckCircle className="mt-0.5 text-lg text-emerald-400" />
                                        ) : (
                                            <FaExclamationCircle className="mt-0.5 text-lg text-amber-400" />
                                        )}
                                        <div>
                                            <p className={`text-sm font-semibold ${
                                                isAvailable ? "text-emerald-400" : "text-amber-400"
                                            }`}>
                                                {isAvailable ? "Available" : "Please Check"}
                                            </p>
                                            <p className="text-sm text-gray-300">{availabilityMessage}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={handleAvailability}
                                    className="flex-1 rounded-xl border-2 border-blue-400/40 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-400 backdrop-blur-sm transition-all hover:bg-blue-500/20 hover:border-blue-400/60"
                                >
                                    Check Availability
                                </button>
                                <button
                                    type="button"
                                    onClick={handleBooking}
                                    disabled={!isAvailable}
                                    className={`flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all ${
                                        isAvailable
                                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60"
                                            : "cursor-not-allowed bg-gray-600/50 opacity-50"
                                    }`}
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctor Profile Card */}
                <div className="relative overflow-hidden rounded-2xl">
                    {/* Glow behind card */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-xl" />
                    
                    <div className="relative rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-purple-950/40 p-6 shadow-xl backdrop-blur-xl">
                        {/* Inner glow */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/5 to-transparent" />
                        
                        <div className="relative space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-white">Doctor Profile</h2>
                                <p className="text-sm text-gray-400">Professional information and qualifications</p>
                            </div>

                            {/* Profile Info Grid */}
                            <div className="space-y-3">
                                {/* Specialization */}
                                <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4 backdrop-blur-sm">
                                    <div className="flex items-start gap-3">
                                        <FaStethoscope className="mt-1 text-lg text-purple-400" />
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">Specialization</p>
                                            <p className="mt-1 text-base font-semibold text-white">{doctor.specialization}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4 backdrop-blur-sm">
                                    <div className="flex items-start gap-3">
                                        <FaBriefcase className="mt-1 text-lg text-purple-400" />
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">Experience</p>
                                            <p className="mt-1 text-base font-semibold text-white">{doctor.experience || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Education */}
                                {doctor.education && (
                                    <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4 backdrop-blur-sm">
                                        <div className="flex items-start gap-3">
                                            <FaGraduationCap className="mt-1 text-lg text-purple-400" />
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">Education</p>
                                                <p className="mt-1 text-sm text-white">{doctor.education}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Institute */}
                                {doctor.institute && (
                                    <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4 backdrop-blur-sm">
                                        <div className="flex items-start gap-3">
                                            <FaHospital className="mt-1 text-lg text-purple-400" />
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">Institute</p>
                                                <p className="mt-1 text-sm text-white">{doctor.institute}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Address */}
                                {doctor.address && (
                                    <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4 backdrop-blur-sm">
                                        <div className="flex items-start gap-3">
                                            <FaMapMarkerAlt className="mt-1 text-lg text-purple-400" />
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">Address</p>
                                                <p className="mt-1 text-sm text-white">{doctor.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BookingPage;
