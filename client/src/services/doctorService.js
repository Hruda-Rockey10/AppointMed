import api from './api';

/**
 * Doctor Service
 * Handles all doctor-related API calls
 */

export const doctorService = {
  /**
   * Get doctor appointments
   */
  getDoctorAppointments: async () => {
    const response = await api.get('/doctor/doctor-appointments');
    return response.data;
  },

  /**
   * Update appointment status
   */
  updateAppointmentStatus: async (appointmentId, status) => {
    const response = await api.post('/doctor/update-status', {
      appointmentId,
      status,
    });
    return response.data;
  },

  /**
   * Get doctor profile by ID
   */
  getDoctorInfo: async (doctorId) => {
    const response = await api.post('/doctor/getDoctorById', { doctorId });
    return response;
  },

  /**
   * Get doctor by ID (for booking page)
   */
  getDoctorById: async (doctorId) => {
    const response = await api.post('/doctor/getDoctorById', { doctorId });
    return response.data;
  },

  /**
   * Get current doctor profile
   */
  getDoctorProfile: async () => {
    const response = await api.post('/doctor/getDoctorInfo');
    return response.data;
  },

  /**
   * Update doctor profile
   */
  updateProfile: async (doctorData) => {
    const response = await api.post('/doctor/updateProfile', doctorData);
    return response;
  },

  /**
   * Update doctor profile (alternative method name)
   */
  updateDoctorProfile: async (doctorData) => {
    const response = await api.post('/doctor/updateProfile', doctorData);
    return response.data;
  },
};
