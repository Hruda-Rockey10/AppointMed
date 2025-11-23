import React from "react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

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
            <h1 className="text-2xl font-bold mb-4 text-center">Apply Doctor</h1>
            <form onSubmit={onFinishHandler} className="bg-white p-6 rounded shadow-md">
                <h4 className="text-xl font-semibold mb-4">Personal Details :</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block mb-1">First Name</label>
                        <input type="text" name="firstName" required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Last Name</label>
                        <input type="text" name="lastName" required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Phone No</label>
                        <input type="text" name="phone" required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input type="email" name="email" required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Website</label>
                        <input type="text" name="website" className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Address</label>
                        <input type="text" name="address" required className="w-full border p-2 rounded" />
                    </div>
                </div>
                <h4 className="text-xl font-semibold mb-4">Professional Details :</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block mb-1">Specialization</label>
                        <input type="text" name="specialization" required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Experience</label>
                        <input type="text" name="experience" required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Fees Per Consultation</label>
                        <input type="number" name="feesPerCunsaltation" required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Timings</label>
                        <div className="flex gap-2">
                            <input type="time" name="startTime" required className="w-full border p-2 rounded" />
                            <input type="time" name="endTime" required className="w-full border p-2 rounded" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600">
                        Submit
                    </button>
                </div>
            </form>
        </Layout>
    );
};

export default ApplyDoctor;
