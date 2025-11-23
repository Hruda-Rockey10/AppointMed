import React from "react";
import { useSelector } from "react-redux";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    return (
        <div className="h-16 bg-white shadow-sm flex items-center justify-end px-8 gap-6">
            <div className="relative cursor-pointer" onClick={() => navigate("/notification")}>
                <FaBell className="text-xl text-gray-600 hover:text-primary transition-colors" />
                {user?.notification.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {user?.notification.length}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/profile")}>
                <FaUserCircle className="text-2xl text-primary" />
                <span className="font-medium text-gray-700 uppercase">{user?.name}</span>
            </div>
        </div>
    );
};

export default Header;
