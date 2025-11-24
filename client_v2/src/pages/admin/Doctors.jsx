import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();

    const getDoctors = async () => {
        try {
            dispatch(showLoading());
            const res = await api.get("/admin/getAllDoctors");
            dispatch(hideLoading());
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    const handleAccountStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const res = await api.post("/admin/changeAccountStatus", {
                doctorId: record._id,
                userId: record.userId,
                status: status,
            });
            dispatch(hideLoading());
            if (res.data.success) {
                alert(res.data.message);
                getDoctors();
            }
        } catch (error) {
            dispatch(hideLoading());
            alert("Something went wrong");
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    const getStatusVariant = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return 'success';
            case 'rejected':
                return 'error';
            default:
                return 'warning';
        }
    };

    return (
        <Layout>
            <PageHeader title="Manage Doctors" subtitle="Review and manage doctor applications" />

            {doctors.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No doctor applications found</p>
                </div>
            ) : (
                <Table hoverable>
                    <Table.Head>
                        <Table.Row>
                            <Table.Header>Doctor</Table.Header>
                            <Table.Header>Specialization</Table.Header>
                            <Table.Header>Phone</Table.Header>
                            <Table.Header>Status</Table.Header>
                            <Table.Header>Actions</Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {doctors.map((doctor) => (
                            <Table.Row key={doctor._id}>
                                <Table.Cell>
                                    <div className="font-medium text-gray-900">
                                        Dr. {doctor.firstName}{" "}{doctor.lastName}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="text-gray-600">{doctor.specialization}</span>
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="text-gray-600">{doctor.phone}</span>
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge variant={getStatusVariant(doctor.status)}>
                                        {doctor.status}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex gap-2">
                                        {doctor.status === "pending" ? (
                                            <>
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    onClick={() => handleAccountStatus(doctor, "approved")}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleAccountStatus(doctor, "rejected")}
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        ) : doctor.status === "approved" ? (
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleAccountStatus(doctor, "rejected")}
                                            >
                                                Revoke
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() => handleAccountStatus(doctor, "approved")}
                                            >
                                                Approve
                                            </Button>
                                        )}
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}
        </Layout>
    );
};

export default Doctors;
