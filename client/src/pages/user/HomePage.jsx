import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DoctorList from "../../components/DoctorList";
import { userService } from "../../services/userService";
import { adminService } from "../../services/adminService";
import { showLoading, hideLoading } from "../../features/alert/alertSlice";
import Layout from "../../components/layout/Layout";
import { FaArrowRight, FaCalendarCheck, FaSearch, FaUserMd } from "react-icons/fa";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      
      // Fetch doctors (available to all users)
      const doctorsRes = await userService.getAllDoctors();
      if (doctorsRes.success) {
        setDoctors(doctorsRes.data);
      }

      // Try to fetch users count (might need admin privileges)
      try {
        const usersRes = await adminService.getAllUsers();
        if (usersRes?.success) {
          setUsers(usersRes.data);
        }
      } catch (error) {
        console.log('Users data not accessible:', error);
      }

      // Try to fetch appointments (if user has appointments endpoint access)
      try {
        const appointmentsRes = await userService.getUserAppointments();
        if (appointmentsRes?.success) {
          setAppointments(appointmentsRes.data || []);
        }
      } catch (error) {
        console.log('Appointments data not accessible:', error);
      }
      
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const heroStats = [
    { label: "Registered Users", value: users.length > 0 ? users.length : "1,200+", detail: "active patients" },
    { label: "Verified Doctors", value: doctors.length || 0, detail: "specialists onboard" },
    { label: "Total Appointments", value: appointments.length > 0 ? appointments.length : "500+", detail: "bookings made" },
  ];

  const quickActions = [
    {
      title: "Find a doctor",
      desc: "Browse specialties, ratings, and availability in real time.",
      cta: "Explore doctors",
      to: "/doctors",
      icon: FaSearch,
    },
    {
      title: "My appointments",
      desc: "Track schedules, reminders, and join virtual visits.",
      cta: "View schedule",
      to: "/appointments",
      icon: FaCalendarCheck,
      hidden: user?.isDoctor,
    },
    {
      title: "Upgrade to doctor",
      desc: "Join AppointMed and manage your practice digitally.",
      cta: "Apply now",
      to: "/apply-doctor",
      icon: FaUserMd,
      hidden: user?.isDoctor,
    },
  ].filter((action) => !action.hidden);

  return (
    <Layout>
      {/* Hero Section with Blue-Tinted Glass Effect */}
      <section className="relative overflow-hidden rounded-3xl">
        {/* Glow effect behind card */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 blur-3xl" />
        
        {/* Main hero card */}
        <div className="relative rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 via-slate-900/70 to-blue-950/50 shadow-2xl backdrop-blur-xl">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-transparent" />
          
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center mix-blend-overlay" />
          </div>

          <div className="relative z-10 grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.1fr,0.9fr] lg:px-14">
            {/* Left Column - Main Content */}
            <div className="space-y-6">

              <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Hi <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{user?.name?.split(" ")[0] || "there"}</span>, your care team is ready.
              </h1>
              
              <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
                Book, track, and manage appointments across every specialty. Insights, reminders, and coverage details stay
                synced so you don't have to.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link 
                  to="/doctors" 
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/60"
                >
                  Explore doctors <FaSearch className="transition-transform group-hover:translate-x-1" />
                </Link>
                {!user?.isDoctor && (
                  <Link
                    to="/appointments"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-400/40 bg-blue-500/10 px-6 py-3 text-base font-semibold text-blue-400 backdrop-blur-sm transition-all hover:bg-blue-500/20 hover:border-blue-400/60"
                  >
                    Upcoming visits <FaCalendarCheck />
                  </Link>
                )}
              </div>
            </div>

            {/* Right Column - Stats Cards */}
            <div className="grid gap-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-6 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-1">
              {heroStats.map((stat) => (
                <div key={stat.label} className="group rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-950/60 to-blue-900/40 p-5 shadow-lg transition-all hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/20">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">{stat.label}</p>
                  <p className="mt-2 font-display text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-gray-400">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {quickActions.map((action, index) => {
          const colors = [
            { bg: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-400/30', icon: 'from-blue-500 to-cyan-500', iconShadow: 'shadow-blue-500/50', text: 'text-blue-400', hoverBorder: 'hover:border-blue-400/50' },
            { bg: 'from-purple-500/20 to-pink-500/10', border: 'border-purple-400/30', icon: 'from-purple-500 to-pink-500', iconShadow: 'shadow-purple-500/50', text: 'text-purple-400', hoverBorder: 'hover:border-purple-400/50' },
            { bg: 'from-emerald-500/20 to-teal-500/10', border: 'border-emerald-400/30', icon: 'from-emerald-500 to-teal-500', iconShadow: 'shadow-emerald-500/50', text: 'text-emerald-400', hoverBorder: 'hover:border-emerald-400/50' }
          ];
          const color = colors[index % 3];
          
          return (
            <div key={action.title} className="group relative overflow-hidden rounded-2xl">
              {/* Glow behind card */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color.bg} blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              
              {/* Main card */}
              <div className={`relative rounded-2xl border ${color.border} bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 ${color.hoverBorder} group-hover:shadow-2xl`}>
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-transparent" />
                
                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${color.icon} shadow-lg ${color.iconShadow}`}>
                    <action.icon className="text-2xl text-white" />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold text-white">{action.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">{action.desc}</p>
                  </div>
                  
                  {/* CTA Link */}
                  <Link
                    to={action.to}
                    className={`group/link inline-flex items-center gap-2 text-sm font-semibold ${color.text} transition-all`}
                  >
                    {action.cta} 
                    <FaArrowRight className="text-xs transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Care Network / Featured Doctors Section */}
      <section className="mt-16">
        {/* Section Header */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Glow behind header */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 blur-2xl" />
          
          <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 px-6 py-8 backdrop-blur-xl sm:px-10">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-transparent" />
            
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Care Network</span>
                </div>
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Featured Doctors</h2>
                <p className="text-sm text-gray-400">Curated specialists with verified credentials and patient reviews</p>
              </div>
              
              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/60"
              >
                View all doctors <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="mt-8">
          {doctors.length === 0 ? (
            <div className="rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/30 to-slate-900/40 py-16 text-center backdrop-blur-xl">
              <p className="text-gray-400">No doctors available at the moment</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {doctors.slice(0, 3).map((doctor) => (
                <DoctorList key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
