import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/book-appointment/${doctor._id}`)}
        >
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-primary">
                    Dr. {doctor.firstName} {doctor.lastName}
                </h2>
                <p className="text-gray-600">
                    <b>Specialization:</b> {doctor.specialization}
                </p>
                <p className="text-gray-600">
                    <b>Experience:</b> {doctor.experience}
                </p>
                <p className="text-gray-600">
                    <b>Fees Per Consultation:</b> ${doctor.feesPerCunsaltation}
                </p>
                <p className="text-gray-600">
                    <b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
                </p>
            </div>
        </div>
    );
};

export default DoctorList;
