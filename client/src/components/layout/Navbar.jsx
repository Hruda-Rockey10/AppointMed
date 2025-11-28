import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHeart,
  FaBars,
  FaBell,
  FaCalendarCheck,
  FaChevronDown,
  FaHome,
  FaSignOutAlt,
  FaStethoscope,
  FaTimes,
  FaUser,
  FaUserMd,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa';
import { cn } from '../../utils/cn';

const Navbar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadNotifications = user?.notification?.length ?? 0;

  const navLinks = useMemo(() => {
    if (user?.isAdmin) {
      return [
        { to: '/', label: 'Home', icon: FaHome },
        { to: '/admin/users', label: 'Users', icon: FaUsers },
        { to: '/admin/doctors', label: 'Doctors', icon: FaUserMd },
      ];
    }
    if (user?.isDoctor) {
      return [
        { to: '/', label: 'Home', icon: FaHome },
        { to: '/doctor-appointments', label: 'Appointments', icon: FaCalendarCheck },
        { to: `/doctor/profile/${user?._id}`, label: 'Profile', icon: FaStethoscope },
      ];
    }
    return [
      { to: '/', label: 'Home', icon: FaHome },
      { to: '/doctors', label: 'Find Doctors', icon: FaUserMd },
      { to: '/appointments', label: 'Appointments', icon: FaCalendarCheck },
      { to: '/apply-doctor', label: 'Apply Doctor', icon: FaUserPlus },
    ];
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const roleLabel = user?.isAdmin ? 'Admin' : user?.isDoctor ? 'Doctor' : 'Patient';

  const renderNavLinks = (isMobile = false) =>
    navLinks.map(({ to, label, icon: Icon }) => {
      const isActive = location.pathname === to;
      return (
        <Link
          key={to}
          to={to}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
          className={cn(
            'group inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
            isActive
              ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20 ring-1 ring-blue-400/30'
              : 'text-gray-300 hover:text-white hover:bg-blue-500/10'
          )}
        >
          <Icon className="text-base" />
          <span>{label}</span>
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-50 border-b border-blue-500/20 bg-gradient-to-r from-blue-950/60 via-slate-900/70 to-blue-950/60 shadow-xl shadow-black/50 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent"></div>
      
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        {/* Left Section: Logo and Nav Links */}
        <div className="flex flex-1 items-center gap-6">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-gray-300 shadow-lg transition-all hover:bg-blue-500/20 hover:text-white lg:hidden"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Logo */}
          <Link 
            to="/" 
            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-blue-950/60 to-blue-900/40 px-3 py-2 pr-6 shadow-lg ring-1 ring-blue-400/20 transition-all hover:shadow-blue-500/30 hover:ring-blue-400/40"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl overflow-hidden">
              <img 
                src="/favicon.png" 
                alt="AppointMed Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400">AppointMed</p>
              <p className="text-sm font-semibold text-gray-100">
                Health OS <span className="text-[10px] font-medium text-gray-400">v2.0</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">{renderNavLinks()}</nav>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3">
          {/* Role Badge */}
          <div className="hidden items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-400 sm:inline-flex">
            <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
            {roleLabel}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications((prev) => !prev);
                setShowUserMenu(false);
              }}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-gray-300 shadow-lg transition-all hover:bg-blue-500/20 hover:text-white"
            >
              <FaBell className="text-base" />
              {unreadNotifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-[10px] font-bold text-white shadow-lg">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/90 to-slate-900/90 p-4 shadow-2xl backdrop-blur-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-100">Notifications</h3>
                    <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-semibold text-blue-400">
                      {unreadNotifications}
                    </span>
                  </div>
                  {user?.notification?.length > 0 ? (
                    <ul className="max-h-80 space-y-2 overflow-y-auto">
                      {user.notification.map((notif, index) => (
                        <li
                          key={index}
                          className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-sm text-gray-300 transition hover:bg-blue-500/10"
                        >
                          {notif.message || 'New notification'}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-6 text-center text-sm text-gray-400">No notifications yet</p>
                  )}
                  <Link
                    to="/notifications"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20"
                    onClick={() => setShowNotifications(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu((prev) => !prev);
                setShowNotifications(false);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 px-3 py-2 shadow-lg transition-all hover:bg-blue-500/20"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white shadow-lg">
                {user?.name?.[0] || 'U'}
              </div>
              <span className="hidden text-sm font-semibold text-gray-100 sm:inline">{user?.name || 'User'}</span>
              <FaChevronDown className={cn('text-xs text-gray-400 transition-transform', showUserMenu && 'rotate-180')} />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-56 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/90 to-slate-900/90 p-2 shadow-2xl backdrop-blur-xl">
                  <Link
                    to={user?.isDoctor ? `/doctor/profile/${user?._id}` : "/profile"}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-blue-500/10 hover:text-white"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <FaUser className="text-blue-400" />
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                  >
                    <FaSignOutAlt />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-blue-500/20 bg-gradient-to-br from-blue-950/80 to-slate-900/80 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {renderNavLinks(true)}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
