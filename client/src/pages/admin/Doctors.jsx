import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { adminService } from "../../services/adminService";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alert/alertSlice";
import { FaUserMd, FaClipboardList, FaCheckCircle, FaTimesCircle, FaSearch, FaPhone, FaStethoscope, FaCheck, FaTimes } from "react-icons/fa";

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [confirmationModal, setConfirmationModal] = useState({
        show: false,
        doctor: null,
        status: null
    });
    const dispatch = useDispatch();

    const getDoctors = async () => {
        try {
            dispatch(showLoading());
            const res = await adminService.getAllDoctors();
            dispatch(hideLoading());
            console.log("Doctors response:", res); // Debug log
            if (res.success) {
                setDoctors(res.data);
                setFilteredDoctors(res.data);
            } else {
                console.error("Failed to fetch doctors:", res.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error("Error fetching doctors:", error);
        }
    };

    const handleAccountStatus = (doctor, status) => {
        setConfirmationModal({ show: true, doctor, status });
    };

    const confirmAction = async () => {
        const { doctor, status } = confirmationModal;
        setConfirmationModal({ show: false, doctor: null, status: null });

        if (!doctor || !status) return;

        const actionText = status === "approved" ? "approve" : status === "rejected" ? "reject" : "revoke";

        try {
            dispatch(showLoading());
            console.log("Sending request to:", doctor._id, "with status:", status);
            const res = await adminService.changeDoctorStatus(doctor._id, status);
            dispatch(hideLoading());

            console.log("Response received:", res);

            if (res.success) {
                // alert(res.message || `Doctor ${actionText}ed successfully!`); // Optional: remove alert if modal is enough
                getDoctors();
            } else {
                alert(res.message || `Failed to ${actionText} doctor`);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error("Error updating doctor status:", error);
            console.error("Error details:", error.response?.data);
            alert("Something went wrong. Check console for details.");
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    useEffect(() => {
        let filtered = doctors;

        if (searchTerm) {
            filtered = filtered.filter(
                (doctor) =>
                    `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus !== "all") {
            filtered = filtered.filter((doctor) => doctor.status === filterStatus);
        }

        setFilteredDoctors(filtered);
    }, [searchTerm, filterStatus, doctors]);

    const stats = {
        total: doctors.length,
        pending: doctors.filter((d) => d.status === "pending").length,
        approved: doctors.filter((d) => d.status === "approved").length,
        rejected: doctors.filter((d) => d.status === "rejected").length,
    };

    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return { color: "emerald", icon: FaCheckCircle };
            case "rejected":
                return { color: "red", icon: FaTimesCircle };
            default:
                return { color: "amber", icon: FaClipboardList };
        }
    };

    return (
        <Layout>
            {/* Header */}
            <div className="relative mb-8 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/20 blur-3xl" />
                
                <div className="relative rounded-3xl border border-purple-400/30 bg-gradient-to-br from-purple-950/50 via-slate-900/70 to-purple-950/50 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 to-transparent" />
                    
                    <div className="relative">
                        <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1">
                            <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Administration</span>
                        </div>
                        <h1 className="mt-3 font-display text-3xl font-bold text-white lg:text-4xl">
                            Manage Doctors
                        </h1>
                        <p className="mt-2 text-sm text-gray-300">
                            Review and manage doctor applications and credentials
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total Doctors */}
                <div className="group relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-purple-950/40 p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-400">Total Doctors</p>
                                <p className="mt-2 text-3xl font-bold text-white">{stats.total}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
                                <FaUserMd className="text-xl text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending */}
                <div className="group relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-950/40 via-slate-900/60 to-amber-950/40 p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-400">Pending</p>
                                <p className="mt-2 text-3xl font-bold text-white">{stats.pending}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/50">
                                <FaClipboardList className="text-xl text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Approved */}
                <div className="group relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-950/40 via-slate-900/60 to-emerald-950/40 p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-400">Approved</p>
                                <p className="mt-2 text-3xl font-bold text-white">{stats.approved}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/50">
                                <FaCheckCircle className="text-xl text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rejected */}
                <div className="group relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-rose-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative rounded-2xl border border-red-400/30 bg-gradient-to-br from-red-950/40 via-slate-900/60 to-red-950/40 p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-400">Rejected</p>
                                <p className="mt-2 text-3xl font-bold text-white">{stats.rejected}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-500 shadow-lg shadow-red-500/50">
                                <FaTimesCircle className="text-xl text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="relative mb-6 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent blur-lg" />
                <div className="relative flex flex-col gap-4 rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-950/30 to-slate-900/40 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or specialization..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-950/50 to-slate-900/50 py-2.5 pl-11 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2">
                        {["all", "pending", "approved", "rejected"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition-all ${
                                    filterStatus === status
                                        ? "border-purple-400/40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 shadow-lg shadow-purple-500/30"
                                        : "border-purple-400/20 bg-purple-500/5 text-gray-300 hover:border-purple-400/40 hover:bg-purple-500/10"
                                } border`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Doctors List */}
            {filteredDoctors.length === 0 ? (
                <div className="relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-xl" />
                    <div className="relative rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-950/30 to-slate-900/40 py-16 text-center backdrop-blur-xl">
                        <p className="text-gray-400">No doctor applications found</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredDoctors.map((doctor) => {
                        const statusConfig = getStatusConfig(doctor.status);
                        const StatusIcon = statusConfig.icon;

                        return (
                            <div key={doctor._id} className="group relative overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                
                                <div className="relative rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-purple-950/40 p-6 backdrop-blur-xl transition-all duration-300 group-hover:border-purple-400/50">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/5 to-transparent" />
                                    
                                    <div className="relative">
                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                            {/* Doctor Info */}
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-xl font-bold text-white shadow-lg shadow-purple-500/50">
                                                    {doctor.firstName?.[0]}{doctor.lastName?.[0]}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-white">
                                                        {doctor.firstName} {doctor.lastName}
                                                    </h3>
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1">
                                                            <FaStethoscope className="text-xs text-cyan-400" />
                                                            <span className="text-xs font-semibold text-cyan-400">{doctor.specialization}</span>
                                                        </div>
                                                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1">
                                                            <FaPhone className="text-xs text-blue-400" />
                                                            <span className="text-xs font-semibold text-blue-400">{doctor.phone}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status and Actions */}
                                            <div className="flex items-center gap-3">
                                                {/* Status Badge */}
                                                <div className={`inline-flex items-center gap-2 rounded-xl border border-${statusConfig.color}-400/30 bg-${statusConfig.color}-500/10 px-4 py-2`}>
                                                    <StatusIcon className={`text-base text-${statusConfig.color}-400`} />
                                                    <span className={`text-sm font-bold capitalize text-${statusConfig.color}-400`}>
                                                        {doctor.status}
                                                    </span>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="relative z-10 flex gap-2">
                                                    {doctor.status === "pending" ? (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleAccountStatus(doctor, "approved");
                                                                }}
                                                                className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20 cursor-pointer"
                                                            >
                                                                <FaCheck className="text-xs" />
                                                                Approve
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleAccountStatus(doctor, "rejected");
                                                                }}
                                                                className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20 cursor-pointer"
                                                            >
                                                                <FaTimes className="text-xs" />
                                                                Reject
                                                            </button>
                                                        </>
                                                    ) : doctor.status === "approved" ? (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleAccountStatus(doctor, "rejected");
                                                            }}
                                                            className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20 cursor-pointer"
                                                        >
                                                            <FaTimes className="text-xs" />
                                                            Revoke
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleAccountStatus(doctor, "approved");
                                                            }}
                                                            className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20 cursor-pointer"
                                                            >
                                                            <FaCheck className="text-xs" />
                                                            Approve
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {/* Confirmation Modal */}
            {confirmationModal.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-blue-400/30 bg-slate-900 p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-white">Confirm Action</h3>
                        <p className="mt-2 text-gray-300">
                            Are you sure you want to <span className="font-bold text-blue-400">{confirmationModal.status === "approved" ? "approve" : "reject"}</span> {confirmationModal.doctor?.firstName} {confirmationModal.doctor?.lastName}?
                        </p>
                        
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmationModal({ show: false, doctor: null, status: null })}
                                className="rounded-xl border border-gray-600 bg-transparent px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAction}
                                className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-lg ${
                                    confirmationModal.status === "approved"
                                        ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                                        : "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                                }`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Doctors;
