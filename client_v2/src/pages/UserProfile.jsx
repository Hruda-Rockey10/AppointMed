import React from "react";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>
            <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name:</label>
                    <p className="text-gray-900">{user?.name}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email:</label>
                    <p className="text-gray-900">{user?.email}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Role:</label>
                    <p className="text-gray-900">
                        {user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User"}
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default UserProfile;
