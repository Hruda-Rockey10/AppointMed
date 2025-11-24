import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import { FaUserMd, FaClock, FaCalendar} from "react-icons/fa";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";

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
            const res = await api.post("/doctor/getDoctorById", { doctorId: params.doctorId });
            dispatch(hideLoading());
            if (res.data.success) {
                setDoctor(res.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    const handleBooking = async () => {
        try {
            if (!date || !time) {
                setAvailabilityMessage("Please select both date and time");
                return;
            }
            dispatch(showLoading());
            const res = await api.post("/user/book-appointment", {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctor,
                userInfo: user,
                date: date,
                time: time,
            });
            dispatch(hideLoading());
            if (res.data.success) {
                alert(res.data.message);
                navigate("/appointments");
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    const handleAvailability = async () => {
        try {
            if (!date || !time) {
                setAvailabilityMessage("Please select both date and time");
                return;
            }
            dispatch(showLoading());
            const res = await api.post("/user/booking-availbility", {
                doctorId: params.doctorId,
                date,
                time,
            });
            dispatch(hideLoading());
            if (res.data.success) {
                setIsAvailable(true);
                setAvailabilityMessage(res.data.message);
            } else {
                setIsAvailable(false);
                setAvailabilityMessage(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    useEffect(() => {
        getDoctorData();
    }, []);

    if (!doctor) {
        return (
            <Layout>
                <div className="text-center py-12">
                    <p className="text-gray-500">Loading doctor information...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <PageHeader title="Book Appointment" subtitle="Schedule your consultation" />

            <div className="max-w-2xl mx-auto">
                {/* Doctor Info Card */}
                <Card shadow="md" className="mb-6">
                    <Card.Body className="p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                                {doctor.firstName?.charAt(0)}{doctor.lastName?.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Dr. {doctor.firstName} {doctor.lastName}
                                </h2>
                                <div className="flex items-center text-blue-600 mt-1">
                                    <FaUserMd className="mr-2" />
                                    <span>{doctor.specialization}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <FaClock className="mr-2" />
                            <span className="font-medium">Available: {doctor.timings[0]} - {doctor.timings[1]}</span>
                        </div>
                    </Card.Body>
                </Card>

                {/* Booking Form */}
                <Card shadow="md">
                    <Card.Header>
                        <h3 className="text-lg font-semibold text-gray-900">Select Date & Time</h3>
                    </Card.Header>
                    <Card.Body className="p-6 space-y-5">
                        {/* Date Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FaCalendar className="inline mr-2" />
                                Appointment Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    setIsAvailable(false);
                                    setAvailabilityMessage("");
                                }}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Time Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FaClock className="inline mr-2" />
                                Appointment Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => {
                                    setTime(e.target.value);
                                    setIsAvailable(false);
                                    setAvailabilityMessage("");
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Availability Message */}
                        {availabilityMessage && (
                            <div className={`p-4 rounded-lg animate-slideIn ${isAvailable ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}>
                                {availabilityMessage}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                variant="outline"
                                onClick={handleAvailability}
                                fullWidth
                            >
                                Check Availability
                            </Button>
                            <Button
                                variant="success"
                                onClick={handleBooking}
                                fullWidth
                                disabled={!isAvailable}
                            >
                                Confirm Booking
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    );
};

export default BookingPage;
