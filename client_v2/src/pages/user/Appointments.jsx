import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import moment from "moment";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    const getAppointments = async () => {
        try {
            dispatch(showLoading());
            const res = await api.get("/user/user-appointments");
            dispatch(hideLoading());
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
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
            <PageHeader
                title="My Appointments"
                subtitle="View and manage your doctor appointments"
            />

            {appointments.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No appointments found</p>
                    <p className="text-gray-400 text-sm mt-2">Book an appointment with a doctor to get started</p>
                </div>
            ) : (
                <Table hoverable>
                    <Table.Head>
                        <Table.Row>
                            <Table.Header>Doctor</Table.Header>
                            <Table.Header>Specialization</Table.Header>
                            <Table.Header>Date & Time</Table.Header>
                            <Table.Header>Status</Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {appointments.map((appointment) => (
                            <Table.Row key={appointment._id}>
                                <Table.Cell>
                                    <div className="font-medium text-gray-900">
                                        Dr. {appointment.doctorInfo?.firstName} {appointment.doctorInfo?.lastName}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="text-gray-600">
                                        {appointment.doctorInfo?.specialization}
                                    </span>
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
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}
        </Layout>
    );
};

export default Appointments;
