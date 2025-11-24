import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaBell, FaUser, FaSignOutAlt, FaHome, FaUserMd, FaCalendarCheck, FaUsers, FaStethoscope, FaUserPlus } from 'react-icons/fa';

const Navbar = ({ onMenuToggle, isMobileMenuOpen }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const unreadNotifications = user?.notification?.length || 0;

  const navLinks = [];
  
  // Add role-specific links
  if (user?.isAdmin) {
    navLinks.push(
      { to: '/', label: 'Home', icon: <FaHome /> },
      { to: '/admin/users', label: 'Users', icon: <FaUsers /> },
      { to: '/admin/doctors', label: 'Doctors', icon: <FaUserMd /> }
    );
  } else if (user?.isDoctor) {
    navLinks.push(
      { to: '/', label: 'Home', icon: <FaHome /> },
      { to: '/doctor-appointments', label: 'Appointments', icon: <FaCalendarCheck /> },
      { to: `/doctor/profile/${user._id}`, label: 'Profile', icon: <FaStethoscope /> }
    );
  } else {
    navLinks.push(
      { to: '/', label: 'Home', icon: <FaHome /> },
      { to: '/appointments', label: 'Appointments', icon: <FaCalendarCheck /> },
      { to: '/apply-doctor', label: 'Apply Doctor', icon: <FaUserPlus /> }
    );
  }

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="lg:hidden mr-3 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FaStethoscope className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                AppointMed
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <FaBell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full animate-pulse">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-scaleIn">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {unreadNotifications > 0 ? (
                      user.notification.slice(0, 5).map((notif, index) => (
                        <Link
                          key={index}
                          to="/notification"
                          onClick={() => setShowNotifications(false)}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                        >
                          <p className="text-sm text-gray-800">{notif.message}</p>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <p className="text-sm">No new notifications</p>
                      </div>
                    )}
                  </div>
                  <Link
                    to="/notification"
                    onClick={() => setShowNotifications(false)}
                    className="block px-4 py-2 text-center text-blue-600 hover:bg-gray-50 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="hidden md:block font-medium">{user?.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-scaleIn">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaUser />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white animate-slideIn">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onMenuToggle}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
