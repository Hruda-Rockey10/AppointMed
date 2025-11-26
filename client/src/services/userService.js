import api from './api';

/**
 * User Service
 * Handles all user-related API calls
 */

export const userService = {
  /**
   * Get all doctors
   */
  getAllDoctors: async () => {
    const response = await api.get('/user/getAllDoctors');
    return response.data;
  },

  /**
   * Apply to become a doctor
   */
  applyDoctor: async (doctorData) => {
    const response = await api.post('/user/apply-doctor', doctorData);
    return response.data;
  },

  /**
   * Book an appointment
   */
  bookAppointment: async (appointmentData) => {
    const response = await api.post('/user/book-appointment', appointmentData);
    return response.data;
  },

  /**
   * Check appointment availability
   */
  checkAvailability: async (data) => {
    const response = await api.post('/user/booking-availbility', data);
    return response.data;
  },

  /**
   * Get user appointments
   */
  getUserAppointments: async () => {
    const response = await api.get('/user/user-appointments');
    return response.data;
  },

  /**
   * Get all users/patients
   */
  getAllUsers: async () => {
    const response = await api.get('/user/getAllUsers');
    return response.data;
  },

  /**
   * Update user profile
   * Note: This endpoint doesn't exist in backend yet
   */
  updateUserProfile: async (userData) => {
    const response = await api.post('/user/updateUserProfile', userData);
    return response.data;
  },

  /**
   * Get all notifications
   */
  getAllNotifications: async () => {
    const response = await api.post('/user/get-all-notification');
    return response.data;
  },

  /**
   * Mark all notifications as read
   */
  markAllNotificationsRead: async () => {
    const response = await api.post('/user/get-all-notification');
    return response.data;
  },

  /**
   * Delete all notifications
   */
  deleteAllNotifications: async () => {
    const response = await api.post('/user/delete-all-notification');
    return response.data;
  },
};
