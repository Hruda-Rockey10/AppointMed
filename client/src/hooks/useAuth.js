import { useSelector } from 'react-redux';

/**
 * Custom hook to get authentication state and user information
 * @returns {Object} - { user, isAuthenticated, isDoctor, isAdmin }
 */
export const useAuth = () => {
  const user = useSelector((state) => state.user.user);
  
  return {
    user,
    isAuthenticated: !!user,
    isDoctor: user?.isDoctor || false,
    isAdmin: user?.isAdmin || false,
  };
};
