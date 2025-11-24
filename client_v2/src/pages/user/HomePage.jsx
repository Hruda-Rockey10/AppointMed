import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DoctorList from "../../components/DoctorList";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";

const HomePage = () => {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const getUserData = async () => {
        try {
            dispatch(showLoading());
            const res = await api.get("/user/getAllDoctors");
            dispatch(hideLoading());
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <Layout>
            <PageHeader
                title={`Welcome, ${user?.name || 'User'}!`}
                subtitle="Find and book appointments with verified doctors"
            />

            {doctors.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No doctors available at the moment</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                        <DoctorList key={doctor._id} doctor={doctor} />
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default HomePage;
