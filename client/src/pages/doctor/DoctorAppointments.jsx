import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { doctorService } from "../../services/doctorService";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alert/alertSlice";
import moment from "moment";
import { SectionHeader, Table, Badge, Button } from "../../components/common";

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    const getAppointments = async () => {
        try {
            dispatch(showLoading());
            const res = await doctorService.getDoctorAppointments();
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
            const res = await doctorService.updateAppointmentStatus(record._id, status);
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
            <SectionHeader
                eyebrow="Practice log"
                title="Patient appointments"
                description="Review requested visits and confirm or reject pending slots."
            />

            {appointments.length === 0 ? (
                <div className="card-glass border border-white/70 bg-white/95 py-12 text-center text-gray-400">
                    No appointments found
                </div>
            ) : (
                <Table hoverable>
                    <Table.Head>
                        <Table.Row>
                            <Table.Header>Patient</Table.Header>
                            <Table.Header>Date</Table.Header>
                            <Table.Header>Time</Table.Header>
                            <Table.Header>Status</Table.Header>
                            <Table.Header>Actions</Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {appointments.map((appointment) => (
                            <Table.Row key={appointment._id}>
                                <Table.Cell>
                                    <div className="font-semibold text-gray-100">{appointment.userInfo?.name}</div>
                                    <p className="text-xs text-gray-400">#{appointment._id.slice(-6)}</p>
                                </Table.Cell>
                                <Table.Cell>
                                    {moment(appointment.date, "DD-MM-YYYY").format("MMM DD, YYYY")}
                                </Table.Cell>
                                <Table.Cell>
                                    {moment(appointment.time, "HH:mm").format("hh:mm A")}
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
