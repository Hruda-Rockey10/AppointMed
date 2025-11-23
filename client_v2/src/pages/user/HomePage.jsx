import React, { useEffect, useState } from "react";
import DoctorList from "../../components/DoctorList";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";

const HomePage = () => {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();

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
        <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Doctors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors && doctors.map((doctor) => (
                    <DoctorList key={doctor._id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
