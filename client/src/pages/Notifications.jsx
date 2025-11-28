import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { userService } from "../services/userService";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../features/alert/alertSlice";
import { setUser } from "../features/user/userSlice";
import { FaBell, FaCheckDouble, FaTrash, FaClock, FaExclamationCircle } from "react-icons/fa";
import { Modal, Button } from "../components/common";
import moment from "moment";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [seenNotifications, setSeenNotifications] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const getNotifications = async () => {
   try {
      dispatch(showLoading());
      const res = await userService.getAllNotifications();
      dispatch(hideLoading());
      if (res.success) {
        setNotifications(res.data.notification || []);
        setSeenNotifications(res.data.seenNotification || []);
        dispatch(setUser(res.data));
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await userService.markAllNotificationsRead();
      dispatch(hideLoading());
      if (res.success) {
        alert(res.message || "All notifications marked as read");
        dispatch(setUser(res.data));
        getNotifications();
      } else {
        alert(res.message || "Failed to mark notifications as read");
      }
    } catch (error) {
      dispatch(hideLoading());
      alert("Error marking notifications as read");
    }
  };

  const handleDeleteAll = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAll = async () => {
    try {
      dispatch(showLoading());
      const res = await userService.deleteAllNotifications();
      dispatch(hideLoading());
      if (res.success) {
        dispatch(setUser(res.data));
        setNotifications([]);
        setSeenNotifications([]);
        setShowDeleteModal(false);
        alert("All notifications deleted successfully");
      } else {
        alert(res.message || "Failed to delete notifications");
      }
    } catch (error) {
      dispatch(hideLoading());
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const allNotifications = [...notifications, ...seenNotifications];

  return (
    <Layout>
      <div className="relative mb-8 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/20 blur-3xl" />
        <div className="relative rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 via-slate-900/70 to-blue-950/50 p-8 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-transparent" />
          <div className="relative z-10">
            <h1 className="font-display text-3xl font-bold text-white lg:text-4xl">
              Notifications
            </h1>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center relative z-50">
        <div className="flex gap-4">
          <div className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-2">
            <span className="text-sm font-semibold text-gray-400">Unread: </span>
            <span className="ml-2 text-lg font-bold text-blue-400">{notifications.length}</span>
          </div>
          <div className="rounded-xl border border-gray-400/30 bg-gray-500/10 px-4 py-2">
            <span className="text-sm font-semibold text-gray-400">Read: </span>
            <span className="ml-2 text-lg font-bold text-gray-400">{seenNotifications.length}</span>
          </div>
        </div>

        <div className="flex gap-2 relative z-50">
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="relative z-50 cursor-pointer flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20"
            >
              <FaCheckDouble className="text-xs" />
              Mark All Read
            </button>
          )}
          {allNotifications.length > 0 && (
            <button
              type="button"
              onClick={handleDeleteAll}
              className="cursor-pointer flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20"
            >
              <FaTrash className="text-xs" />
              DELETE ALL
            </button>
          )}
        </div>
      </div>

      {allNotifications.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl" />
          <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/30 to-slate-900/40 py-16 text-center backdrop-blur-xl">
            <FaBell className="mx-auto mb-4 text-5xl text-gray-600" />
            <p className="text-gray-400">No notifications yet</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-400">Unread</h2>
              <div className="space-y-3">
                {notifications.map((notif, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-2xl">
                    <div className="relative rounded-2xl border border-blue-400/40 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 p-5">
                      <div className="relative flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
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

          {seenNotifications.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">Read</h2>
              <div className="space-y-3">
                {seenNotifications.map((notif, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-2xl opacity-60">
                    <div className="relative rounded-2xl border border-gray-400/20 bg-gradient-to-br from-gray-950/40 via-slate-900/60 to-gray-950/40 p-5">
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete All Notifications"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDeleteAll}
            >
              Delete All
            </Button>
          </div>
        }
      >
        <p className="text-gray-300">
          Are you sure you want to delete all notifications? This action cannot be undone.
        </p>
      </Modal>
    </Layout>
  );
};

export default Notifications;
