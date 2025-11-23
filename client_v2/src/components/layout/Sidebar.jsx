import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    FaHome,
    FaList,
    FaUser,
    FaUserMd,
    FaSignOutAlt,
    FaHospital,
} from "react-icons/fa";

const Sidebar = () => {
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();

    const userMenu = [
        {
            name: "Home",
            path: "/",
            icon: <FaHome />,
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: <FaList />,
        },
        {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: <FaUserMd />,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: <FaUser />,
        },
    ];

    const adminMenu = [
        {
            name: "Home",
            path: "/",
            icon: <FaHome />,
        },
        {
            name: "Doctors",
            path: "/admin/doctors",
            icon: <FaUserMd />,
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: <FaUser />,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: <FaUser />,
        },
    ];

    const doctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: <FaHome />,
        },
        {
            name: "Appointments",
            path: "/doctor-appointments",
            icon: <FaList />,
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: <FaUser />,
        },
    ];

    const menuToBeRendered = user?.isAdmin
        ? adminMenu
        : user?.isDoctor
            ? doctorMenu
            : userMenu;

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="bg-white h-screen flex flex-col shadow-lg w-64 hidden md:flex">
            <div className="h-16 flex items-center justify-center border-b">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <FaHospital /> AppointMed
                </h1>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                {menuToBeRendered.map((menu, index) => {
                    const isActive = location.pathname === menu.path;
                    return (
                        <div
                            key={index}
                            className={`px-4 py-3 mx-2 rounded-lg mb-2 transition-colors duration-200 ${isActive
                                    ? "bg-primary text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Link to={menu.path} className="flex items-center gap-3">
                                <span className="text-lg">{menu.icon}</span>
                                <span className="font-medium">{menu.name}</span>
                            </Link>
                        </div>
                    );
                })}
                <div
                    className="px-4 py-3 mx-2 rounded-lg mb-2 text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                    onClick={handleLogout}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-lg">
                            <FaSignOutAlt />
                        </span>
                        <span className="font-medium">Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
