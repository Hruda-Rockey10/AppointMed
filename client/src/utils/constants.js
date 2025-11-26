/**
 * Application-wide constants
 */

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// User Roles
export const USER_ROLES = {
  USER: 'user',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
};

// Appointment Status
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
};

// Doctor Application Status
export const DOCTOR_APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// Days of Week
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Time Slots
export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

// Specializations
export const SPECIALIZATIONS = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic',
  'Neurologist',
  'Gynecologist',
  'Psychiatrist',
  'Ophthalmologist',
  'ENT Specialist',
];

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',
  DOCTORS: '/doctors',
  BOOK_APPOINTMENT: '/book-appointment/:doctorId',
  APPOINTMENTS: '/appointments',
  APPLY_DOCTOR: '/apply-doctor',
  
  // Doctor routes
  DOCTOR_APPOINTMENTS: '/doctor/appointments',
  DOCTOR_PROFILE: '/doctor/profile',
  
  // Admin routes
  ADMIN_USERS: '/admin/users',
  ADMIN_DOCTORS: '/admin/doctors',
};
