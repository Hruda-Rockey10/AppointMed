import React from "react";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const UserProfile = () => {
    const { user } = useSelector((state) => state.user);

    const getRoleBadge = () => {
        if (user?.isAdmin) return <Badge variant="error">Admin</Badge>;
        if (user?.isDoctor) return <Badge variant="info">Doctor</Badge>;
        return <Badge variant="neutral">User</Badge>;
    };

    return (
        <Layout>
            <PageHeader title="My Profile" subtitle="View your account information" />

            <div className="max-w-2xl mx-auto">
                <Card shadow="md">
                    <Card.Body className="p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl mr-6">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                                <div className="mt-2">{getRoleBadge()}</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="border-t border-gray-200 pt-4">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                                <p className="text-gray-900 font-medium">{user?.email}</p>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Account Type</label>
                                <p className="text-gray-900 font-medium">
                                    {user?.isAdmin ? "Administrator" : user?.isDoctor ? "Doctor" : "Patient"}
                                </p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    );
};

export default UserProfile;
