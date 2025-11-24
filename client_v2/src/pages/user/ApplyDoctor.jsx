import React from "react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const ApplyDoctor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const onFinishHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData.entries());

        try {
            dispatch(showLoading());
            const res = await api.post("/user/apply-doctor", {
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
            <PageHeader
                title="Apply as a Doctor"
                subtitle="Fill out the form below to register as a doctor on our platform"
            />

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
                                    <input type="text" name="firstName" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" name="lastName" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" name="phone" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                    <input type="text" name="website" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="md:col-span-2 lg:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" name="address" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                                    <input type="text" name="specialization" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Experience <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" name="experience" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fees Per Consultation <span className="text-red-500">*</span>
                                    </label>
                                    <input type="number" name="feesPerCunsaltation" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Timings <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <input type="time" name="startTime" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        <input type="time" name="endTime" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" variant="primary" size="lg">
                            Submit Application
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ApplyDoctor;
