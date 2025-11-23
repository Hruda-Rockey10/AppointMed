import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import moment from "moment";

const BookingPage = () => {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [doctor, setDoctor] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
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
                return alert("Date & Time Required");
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
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    const handleAvailability = async () => {
        try {
            dispatch(showLoading());
            const res = await api.post("/user/booking-availbility", {
                doctorId: params.doctorId,
                date,
                time,
            });
            dispatch(hideLoading());
            if (res.data.success) {
                setIsAvailable(true);
                alert(res.data.message);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    useEffect(() => {
        getDoctorData();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-center">Booking Page</h1>
            {doctor && (
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold text-primary mb-4">
                        Dr. {doctor.firstName} {doctor.lastName}
                    </h2>
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h4 className="text-lg font-semibold mb-2">Timings: {doctor.timings[0]} - {doctor.timings[1]}</h4>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block mb-1">Date</label>
                                <input
                                    type="date"
                                    className="w-full border p-2 rounded"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Time</label>
                                <input
                                    type="time"
                                    className="w-full border p-2 rounded"
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleAvailability}
                            >
                                Check Availability
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={handleBooking}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default BookingPage;
