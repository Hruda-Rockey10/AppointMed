import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Modal, Button } from "../../components/common";
import { adminService } from "../../services/adminService";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alert/alertSlice";
import { FaUsers, FaUserMd, FaSearch, FaEnvelope, FaShieldAlt, FaBan } from "react-icons/fa";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const dispatch = useDispatch();

    const getUsers = async () => {
        try {
            dispatch(showLoading());
            const res = await adminService.getAllUsers();
            dispatch(hideLoading());
            console.log("Users response:", res); // Debug log
            if (res.success) {
                setUsers(res.data);
                setFilteredUsers(res.data);
            } else {
                console.error("Failed to fetch users:", res.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        let filtered = users;

        if (searchTerm) {
            filtered = filtered.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterRole !== "all") {
            if (filterRole === "doctor") {
                filtered = filtered.filter((user) => user.isDoctor);
            } else if (filterRole === "patient") {
                filtered = filtered.filter((user) => !user.isDoctor);
            }
        }

        setFilteredUsers(filtered);
    }, [searchTerm, filterRole, users]);

    const handleBlockUser = (user) => {
        setSelectedUser(user);
        setShowBlockModal(true);
    };

    const confirmBlockUser = async () => {
        if (!selectedUser) return;
        
        const action = selectedUser.isBlocked ? "unblock" : "block";
        
        try {
            dispatch(showLoading());
            const res = await adminService.blockUser(selectedUser._id, !selectedUser.isBlocked);
            dispatch(hideLoading());
            if (res.success) {
                alert(res.message || `User ${action}ed successfully!`);
                getUsers();
                setShowBlockModal(false);
                setSelectedUser(null);
            } else {
                alert(res.message || `Failed to ${action} user`);
            }
        } catch (error) {
            dispatch(hideLoading());
            alert("Something went wrong");
            console.error(`Error ${action}ing user:`, error);
        }
    };

    const stats = {
        total: users.length,
        doctors: users.filter((u) => u.isDoctor).length,
        patients: users.filter((u) => !u.isDoctor).length,
    };

    return (
        <Layout>
            {/* Header */}
            <div className="relative mb-8 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/20 blur-3xl" />
                
                <div className="relative rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 via-slate-900/70 to-blue-950/50 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-transparent" />
                    
                    <div className="relative">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1">
                            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Administration</span>
                        </div>
                        <h1 className="mt-3 font-display text-3xl font-bold text-white lg:text-4xl">
                            Manage Users
                        </h1>
                        <p className="mt-2 text-sm text-gray-300">
                            View and manage all registered users on the platform
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid gap-6 sm:grid-cols-3">
                {/* Total Users */}
                <div className="group relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-400">Total Users</p>
                                <p className="mt-2 text-3xl font-bold text-white">{stats.total}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
                                <FaUsers className="text-xl text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctors */}
                <div className="group relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-950/40 via-slate-900/60 to-emerald-950/40 p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-400">Doctors</p>
                                <p className="mt-2 text-3xl font-bold text-white">{stats.doctors}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/50">
                                <FaUserMd className="text-xl text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patients */}
                <div className="group relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-purple-950/40 p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-400">Patients</p>
                                <p className="mt-2 text-3xl font-bold text-white">{stats.patients}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
                                <FaUsers className="text-xl text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="relative mb-6 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent blur-lg" />
                <div className="relative flex flex-col gap-4 rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-950/30 to-slate-900/40 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50 py-2.5 pl-11 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2">
                        {["all", "doctor", "patient"].map((role) => (
                            <button
                                key={role}
                                onClick={() => setFilterRole(role)}
                                className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition-all ${
                                    filterRole === role
                                        ? "border-blue-400/40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 shadow-lg shadow-blue-500/30"
                                        : "border-blue-400/20 bg-blue-500/5 text-gray-300 hover:border-blue-400/40 hover:bg-blue-500/10"
                                } border`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Users List */}
            {filteredUsers.length === 0 ? (
                <div className="relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl" />
                    <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/30 to-slate-900/40 py-16 text-center backdrop-blur-xl">
                        <p className="text-gray-400">No users found</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredUsers.map((user) => (
                        <div key={user._id} className="group relative overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            
                            <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 p-6 backdrop-blur-xl transition-all duration-300 group-hover:border-blue-400/50">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-transparent" />
                                
                                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    {/* User Info */}
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-blue-500/50">
                                            {user.name?.[0] || 'U'}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-white">{user.name}</h3>
                                            <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                                                <FaEnvelope className="text-xs" />
                                                <span>{user.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Badges and Actions */}
                                    <div className="flex items-center gap-3">
                                        {/* Role Badges */}
                                        <div className="flex gap-2">
                                            {user.isDoctor && (
                                                <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5">
                                                    <span className="text-xs font-bold text-emerald-400">Doctor</span>
                                                </div>
                                            )}
                                            {user.isAdmin && (
                                                <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-1.5">
                                                    <span className="text-xs font-bold text-amber-400">Admin</span>
                                                </div>
                                            )}
                                            {!user.isDoctor && !user.isAdmin && (
                                                <div className="rounded-lg border border-gray-400/30 bg-gray-500/10 px-3 py-1.5">
                                                    <span className="text-xs font-bold text-gray-400">Patient</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Block/Unblock Button */}
                                        <button
                                            onClick={() => handleBlockUser(user)}
                                            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                                                user.isBlocked
                                                    ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                                    : "border-red-400/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                            }`}
                                        >
                                            <FaBan className="text-xs" />
                                            {user.isBlocked ? "Unblock" : "Block"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Block Confirmation Modal */}
            <Modal
                isOpen={showBlockModal}
                onClose={() => {
                    setShowBlockModal(false);
                    setSelectedUser(null);
                }}
                title={selectedUser?.isBlocked ? "Unblock User" : "Block User"}
                footer={
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setShowBlockModal(false);
                                setSelectedUser(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={selectedUser?.isBlocked ? "success" : "danger"}
                            onClick={confirmBlockUser}
                        >
                            {selectedUser?.isBlocked ? "Unblock" : "Block"}
                        </Button>
                    </div>
                }
            >
                <p className="text-gray-300">
                    Are you sure you want to {selectedUser?.isBlocked ? "unblock" : "block"} <strong>{selectedUser?.name}</strong>?
                    {!selectedUser?.isBlocked && " They will no longer be able to log in to the system."}
                </p>
            </Modal>
        </Layout>
    );
};

export default Users;
