import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { userService } from "../services/userService";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../features/alert/alertSlice";
import { FaBell, FaCheckDouble, FaTrash, FaClock, FaExclamationCircle } from "react-icons/fa";
import moment from "moment";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [seenNotifications, setSeenNotifications] = useState([]);
  const dispatch = useDispatch();

  const getNotifications = async () => {
    try {
      dispatch(showLoading());
      const res = await userService.getAllNotifications();
      dispatch(hideLoading());
      console.log("Notifications response:", res);
      if (res.success) {
        setNotifications(res.data.notification || []);
        setSeenNotifications(res.data.seenNotification || []);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await userService.markAllNotificationsRead();
      dispatch(hideLoading());
      if (res.success) {
        alert(res.message || "All notifications marked as read");
        getNotifications();
      } else {
        alert(res.message || "Failed to mark notifications as read");
      }
    } catch (error) {
      dispatch(hideLoading());
      alert("Error marking notifications as read");
      console.error("Error:", error);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all notifications?")) {
      return;
    }

    try {
      dispatch(showLoading());
      const res = await userService.deleteAllNotifications();
      dispatch(hideLoading());
      if (res.success) {
        alert(res.message || "All notifications deleted");
        getNotifications();
      } else {
        alert(res.message || "Failed to delete notifications");
      }
    } catch (error) {
      dispatch(hideLoading());
      alert("Error deleting notifications");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const allNotifications = [...notifications, ...seenNotifications];

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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Inbox</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold text-white lg:text-4xl">
              Notifications
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Stay updated with all your important notifications
            </p>
          </div>
        </div>
      </div>

      {/* Stats and Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Stats */}
        <div className="flex gap-4">
          <div className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-2">
            <span className="text-sm font-semibold text-gray-400">Unread:</span>
            <span className="ml-2 text-lg font-bold text-blue-400">{notifications.length}</span>
          </div>
          <div className="rounded-xl border border-gray-400/30 bg-gray-500/10 px-4 py-2">
            <span className="text-sm font-semibold text-gray-400">Read:</span>
            <span className="ml-2 text-lg font-bold text-gray-400">{seenNotifications.length}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20"
            >
              <FaCheckDouble className="text-xs" />
              Mark All Read
            </button>
          )}
          {allNotifications.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20"
            >
              <FaTrash className="text-xs" />
              Delete All
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {allNotifications.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl" />
          <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/30 to-slate-900/40 py-16 text-center backdrop-blur-xl">
            <FaBell className="mx-auto mb-4 text-5xl text-gray-600" />
            <p className="text-gray-400">No notifications yet</p>
            <p className="mt-2 text-sm text-gray-500">We'll notify you when something important happens</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Unread Notifications */}
          {notifications.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-400">Unread</h2>
              <div className="space-y-3">
                {notifications.map((notif, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="relative rounded-2xl border border-blue-400/40 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 p-5 backdrop-blur-xl transition-all duration-300 group-hover:border-blue-400/60">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-transparent" />
                      
                      <div className="relative flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
                          <FaExclamationCircle className="text-lg text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium text-white">{notif.message}</p>
                          {notif.data?.name && (
                            <p className="mt-1 text-sm text-gray-400">From: {notif.data.name}</p>
                          )}
                          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                            <FaClock className="text-[10px]" />
                            <span>{moment(notif.createdAt || Date.now()).fromNow()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Read Notifications */}
          {seenNotifications.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">Read</h2>
              <div className="space-y-3">
                {seenNotifications.map((notif, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-2xl opacity-60">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="relative rounded-2xl border border-gray-400/20 bg-gradient-to-br from-gray-950/40 via-slate-900/60 to-gray-950/40 p-5 backdrop-blur-xl transition-all duration-300 group-hover:border-gray-400/40">
                      <div className="relative flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-500 to-gray-600">
                          <FaBell className="text-lg text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium text-gray-300">{notif.message}</p>
                          {notif.data?.name && (
                            <p className="mt-1 text-sm text-gray-500">From: {notif.data.name}</p>
                          )}
                          <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                            <FaClock className="text-[10px]" />
                            <span>{moment(notif.createdAt || Date.now()).fromNow()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Notifications;
