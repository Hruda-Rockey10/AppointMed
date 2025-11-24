import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import moment from "moment";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    const getAppointments = async () => {
        try {
            dispatch(showLoading());
            const res = await api.get("/doctor/doctor-appointments");
            dispatch(hideLoading());
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    const handleStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const res = await api.post("/doctor/update-status", {
                appointmentsId: record._id,
                status,
            });
            dispatch(hideLoading());
            if (res.data.success) {
                alert(res.data.message);
                getAppointments();
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            alert("Something went wrong");
        }
    };

    useEffect(() => {
        getAppointments();
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
            <PageHeader title="My Appointments" subtitle="Manage your patient appointments" />

            {appointments.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No appointments found</p>
                </div>
            ) : (
                <Table hoverable>
                    <Table.Head>
                        <Table.Row>
                            <Table.Header>Patient</Table.Header>
                            <Table.Header>Date & Time</Table.Header>
                            <Table.Header>Status</Table.Header>
                            <Table.Header>Actions</Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {appointments.map((appointment) => (
                            <Table.Row key={appointment._id}>
                                <Table.Cell>
                                    <div className="font-medium text-gray-900">
                                        {appointment.userInfo?.name}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="text-gray-900">
                                        {moment(appointment.date, "DD-MM-YYYY").format("MMM DD, YYYY")}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {moment(appointment.time, "HH:mm").format("hh:mm A")}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge variant={getStatusVariant(appointment.status)}>
                                        {appointment.status || 'pending'}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    {appointment.status === "pending" && (
                                        <div className="flex gap-2">
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() => handleStatus(appointment, "approved")}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleStatus(appointment, "reject")}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}
        </Layout>
    );
};

export default DoctorAppointments;
