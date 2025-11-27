import api from './api';

/**
 * Admin Service
 * Handles all admin-related API calls
 */

export const adminService = {
  /**
   * Get all users
   */
  getAllUsers: async () => {
    const response = await api.get('/admin/getAllUsers');
    return response.data;
  },

  /**
   * Get all doctors
   */
  getAllDoctors: async () => {
    const response = await api.get('/admin/getAllDoctors');
    return response.data;
  },

  /**
   * Change doctor account status
   */
  changeDoctorStatus: async (doctorId, status) => {
    const response = await api.post('/admin/changeAccountStatus', {
      doctorId,
      status,
    });
    return response.data;
  },

  /**
   * Block or unblock a user
   */
  blockUser: async (userId, isBlocked) => {
    const response = await api.post('/admin/blockUser', {
      userId,
      isBlocked,
    });
    return response.data;
  },
};
