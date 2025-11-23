import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import moment from "moment";

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    const getAppointments = async () => {
        try {
            dispatch(showLoading());
            const res = await api.get("/doctor/doctor-appointments");
            dispatch(hideLoading());
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    const handleStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const res = await api.post("/doctor/update-status", {
                appointmentsId: record._id,
                status,
            });
            dispatch(hideLoading());
            if (res.data.success) {
                alert(res.data.message);
                getAppointments();
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            alert("Something went wrong");
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-center">Appointments List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Date & Time</th>
                            <th className="px-4 py-2 border-b">Status</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment._id} className="text-center hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{appointment._id}</td>
                                <td className="px-4 py-2 border-b">
                                    {moment(appointment.date, "DD-MM-YYYY").format("DD-MM-YYYY")} &nbsp;
                                    {moment(appointment.time, "HH:mm").format("HH:mm")}
                                </td>
                                <td className="px-4 py-2 border-b">{appointment.status}</td>
                                <td className="px-4 py-2 border-b flex justify-center gap-2">
                                    {appointment.status === "pending" && (
                                        <>
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                onClick={() => handleStatus(appointment, "approved")}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                onClick={() => handleStatus(appointment, "reject")}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default DoctorAppointments;
