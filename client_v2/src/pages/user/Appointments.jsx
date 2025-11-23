import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import moment from "moment";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    const getAppointments = async () => {
        try {
            dispatch(showLoading());
            const res = await api.get("/user/user-appointments");
            dispatch(hideLoading());
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-center">Your Appointments</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Date & Time</th>
                            <th className="px-4 py-2 border-b">Status</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Appointments;
