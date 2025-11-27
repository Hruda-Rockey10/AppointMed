import React from "react";
import Layout from "../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../features/alert/alertSlice";
import { setUser } from "../features/user/userSlice";
import { userService } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { PageHeader, Button } from "../components/common";
import { FaBell, FaBellSlash } from "react-icons/fa";

const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await userService.markAllNotificationsRead();
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
            const res = await userService.deleteAllReadNotifications();
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

    const hasUnreadNotifications = user?.notification?.length > 0;
    const hasReadNotifications = user?.seenNotification?.length > 0;

    // Auto-mark all as read when component mounts
    React.useEffect(() => {
        if (hasUnreadNotifications) {
            handleMarkAllRead();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Layout>
            <PageHeader
                title="Notifications"
                subtitle="Stay updated with your appointment notifications"
                actions={
                    <>
                        <Button variant="outline" size="md" onClick={handleMarkAllRead}>
                            Mark All Read
                        </Button>
                        <Button variant="danger" size="md" onClick={handleDeleteAllRead}>
                            Delete All Read
                        </Button>
                    </>
                }
            />

            <div className="space-y-6">
                {/* Unread Notifications Section */}
                {hasUnreadNotifications && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <FaBell className="mr-2 text-blue-600" />
                            Unread Notifications
                        </h2>
                        <div className="space-y-3">
                            {user.notification.map((notificationMgs, index) => (
                                <div
                                    key={index}
                                    className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-blue-100 transition-colors animate-fadeIn"
                                    onClick={() => navigate(notificationMgs.onClickPath)}
                                >
                                    <div className="text-gray-800">{notificationMgs.message}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Read Notifications Section */}
                {hasReadNotifications && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <FaBellSlash className="mr-2 text-gray-600" />
                            Read Notifications
                        </h2>
                        <div className="space-y-3">
                            {user.seenNotification.map((notificationMgs, index) => (
                                <div
                                    key={index}
                                    className="bg-[#1f2937] border border-[#4a5568] p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => navigate(notificationMgs.onClickPath)}
                                >
                                    <div className="text-gray-600">{notificationMgs.message}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!hasUnreadNotifications && !hasReadNotifications && (
                    <div className="text-center py-12">
                        <FaBellSlash className="mx-auto text-gray-400 text-5xl mb-4" />
                        <p className="text-gray-500 text-lg">No notifications yet</p>
                        <p className="text-gray-400 text-sm mt-2">You'll see notifications here when you have any</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default NotificationPage;
