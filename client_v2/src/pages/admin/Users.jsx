import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";

const Users = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const getUsers = async () => {
        try {
            dispatch(showLoading());
            const res = await api.get("/admin/getAllUsers");
            dispatch(hideLoading());
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-center">Users List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Email</th>
                            <th className="px-4 py-2 border-b">Doctor</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="text-center hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{user.name}</td>
                                <td className="px-4 py-2 border-b">{user.email}</td>
                                <td className="px-4 py-2 border-b">{user.isDoctor ? "Yes" : "No"}</td>
                                <td className="px-4 py-2 border-b">
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                        Block
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Users;
