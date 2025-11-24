import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alertSlice";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

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
            <PageHeader title="Manage Users" subtitle="View and manage all registered users" />

            {users.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No users found</p>
                </div>
            ) : (
                <Table hoverable>
                    <Table.Head>
                        <Table.Row>
                            <Table.Header>Name</Table.Header>
                            <Table.Header>Email</Table.Header>
                            <Table.Header>Doctor Status</Table.Header>
                            <Table.Header>Actions</Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {users.map((user) => (
                            <Table.Row key={user._id}>
                                <Table.Cell>
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="text-gray-600">{user.email}</span>
                                </Table.Cell>
                                <Table.Cell>
                                    {user.isDoctor ? (
                                        <Badge variant="info">Doctor</Badge>
                                    ) : (
                                        <Badge variant="neutral">User</Badge>
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <Button variant="danger" size="sm">
                                        Block
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}
        </Layout>
    );
};

export default Users;
