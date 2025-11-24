import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [doctor, setDoctor] = useState(null);

    const getDoctorInfo = async () => {
        try {
            dispatch(showLoading());
            const res = await api.post("/doctor/getDoctorInfo", { userId: params.id });
            dispatch(hideLoading());
            if (res.data.success) {
                setDoctor(res.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    useEffect(() => {
        getDoctorInfo();
    }, []);

    const onFinishHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData.entries());

        try {
            dispatch(showLoading());
            const res = await api.post("/doctor/updateProfile", {
                ...values,
                userId: user._id,
                timings: [values.startTime, values.endTime],
            });
            dispatch(hideLoading());
            if (res.data.success) {
                alert(res.data.message);
                navigate("/");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <Layout>
            <PageHeader title="Manage Profile" subtitle="Update your doctor profile information" />
            
            {doctor ? (
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={onFinishHandler}>
                        <Card shadow="md" className="mb-6">
                            <Card.Header>
                                <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
                            </Card.Header>
                            <Card.Body className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="firstName" defaultValue={doctor.firstName} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="lastName" defaultValue={doctor.lastName} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="phone" defaultValue={doctor.phone} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input type="email" name="email" defaultValue={doctor.email} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                        <input type="text" name="website" defaultValue={doctor.website} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="md:col-span-2 lg:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="address" defaultValue={doctor.address} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card shadow="md" className="mb-6">
                            <Card.Header>
                                <h3 className="text-lg font-semibold text-gray-900">Professional Details</h3>
                            </Card.Header>
                            <Card.Body className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Specialization <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="specialization" defaultValue={doctor.specialization} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Experience <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="experience" defaultValue={doctor.experience} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fees Per Consultation <span className="text-red-500">*</span>
                                        </label>
                                        <input type="number" name="feesPerCunsaltation" defaultValue={doctor.feesPerCunsaltation} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Timings <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-2">
                                            <input type="time" name="startTime" defaultValue={doctor.timings[0]} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            <input type="time" name="endTime" defaultValue={doctor.timings[1]} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        <div className="flex justify-end">
                            <Button type="submit" variant="primary" size="lg">
                                Update Profile
                            </Button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">Loading profile information...</p>
                </div>
            )}
        </Layout>
    );
};

export default Profile;
