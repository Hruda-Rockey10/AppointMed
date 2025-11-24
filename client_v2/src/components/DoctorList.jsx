import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaBriefcase, FaDollarSign, FaClock } from "react-icons/fa";
import Card from "./ui/Card";
import Button from "./ui/Button";

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();

    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-amber-500', 'bg-red-500', 'bg-pink-500'];
    const colorIndex = (doctor.firstName?.charCodeAt(0) || 0) % avatarColors.length;

    return (
        <Card hover shadow="md" className="overflow-hidden">
            <Card.Body className="p-6">
                {/* Doctor Avatar and Name */}
                <div className="flex items-center mb-4">
                    <div className={`w-14 h-14 rounded-full ${avatarColors[colorIndex]} flex items-center justify-center text-white font-bold text-lg mr-4`}>
                        {getInitials(doctor.firstName, doctor.lastName)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Dr. {doctor.firstName} {doctor.lastName}
                        </h2>
                        <div className="flex items-center text-blue-600 text-sm mt-1">
                            <FaUserMd className="mr-1" />
                            <span>{doctor.specialization}</span>
                        </div>
                    </div>
                </div>

                {/* Doctor Details */}
                <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                        <div className="flex items-center text-gray-500 w-32">
                            <FaBriefcase className="mr-2" />
                            <span className="text-sm">Experience</span>
                        </div>
                        <span className="font-medium">{doctor.experience}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <div className="flex items-center text-gray-500 w-32">
                            <FaDollarSign className="mr-2" />
                            <span className="text-sm">Fee</span>
                        </div>
                        <span className="font-medium">${doctor.feesPerCunsaltation}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <div className="flex items-center text-gray-500 w-32">
                            <FaClock className="mr-2" />
                            <span className="text-sm">Timings</span>
                        </div>
                        <span className="font-medium">{doctor.timings[0]} - {doctor.timings[1]}</span>
                    </div>
                </div>
            </Card.Body>

            <Card.Footer>
                <Button
                    variant="primary"
                    fullWidth
                    onClick={() => navigate(`/book-appointment/${doctor._id}`)}
                >
                    Book Appointment
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default DoctorList;
