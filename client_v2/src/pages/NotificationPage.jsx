import React from "react";
import Layout from "../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../features/alertSlice";
import { setUser } from "../features/userSlice";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await api.post("/user/get-all-notification");
            dispatch(hideLoading());
            if (res.data.success) {
                alert(res.data.message);
                dispatch(setUser(res.data.data));
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            alert("Something went wrong");
        }
    };

    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await api.post("/user/delete-all-notification");
            dispatch(hideLoading());
            if (res.data.success) {
                alert(res.data.message);
                dispatch(setUser(res.data.data));
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-center">Notification Page</h1>
            <div className="flex justify-end gap-4 mb-4">
                <h4 className="text-blue-500 cursor-pointer underline" onClick={handleMarkAllRead}>
                    Mark All Read
                </h4>
                <h4 className="text-red-500 cursor-pointer underline" onClick={handleDeleteAllRead}>
                    Delete All Read
                </h4>
            </div>

            <div className="space-y-4">
                {/* Unread Notifications */}
                {user?.notification.map((notificationMgs, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded shadow cursor-pointer border-l-4 border-blue-500"
                        onClick={() => navigate(notificationMgs.onClickPath)}
                    >
                        <div className="text-gray-800">{notificationMgs.message}</div>
                    </div>
                ))}

                {/* Read Notifications */}
                {user?.seenNotification.map((notificationMgs, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 p-4 rounded shadow cursor-pointer border-l-4 border-gray-400"
                        onClick={() => navigate(notificationMgs.onClickPath)}
                    >
                        <div className="text-gray-600">{notificationMgs.message}</div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default NotificationPage;
