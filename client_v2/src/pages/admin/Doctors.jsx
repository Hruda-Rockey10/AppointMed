import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();

    const getDoctors = async () => {
        try {
            dispatch(showLoading());
            const res = await api.get("/admin/getAllDoctors");
            dispatch(hideLoading());
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    const handleAccountStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const res = await api.post("/admin/changeAccountStatus", {
                doctorId: record._id,
                userId: record.userId,
                status: status,
            });
            dispatch(hideLoading());
            if (res.data.success) {
                alert(res.data.message);
                getDoctors();
            }
        } catch (error) {
            dispatch(hideLoading());
            alert("Something went wrong");
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-center">Doctors List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Status</th>
                            <th className="px-4 py-2 border-b">Phone</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor._id} className="text-center hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">
                                    {doctor.firstName} {doctor.lastName}
                                </td>
                                <td className="px-4 py-2 border-b">{doctor.status}</td>
                                <td className="px-4 py-2 border-b">{doctor.phone}</td>
                                <td className="px-4 py-2 border-b flex justify-center gap-2">
                                    {doctor.status === "pending" ? (
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            onClick={() => handleAccountStatus(doctor, "approved")}
                                        >
                                            Approve
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleAccountStatus(doctor, "rejected")}
                                        >
                                            Reject
                                        </button>
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

export default Doctors;
