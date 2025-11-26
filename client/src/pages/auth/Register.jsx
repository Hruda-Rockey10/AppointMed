import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alert/alertSlice";
import { authService } from "../../services/authService";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaPhoneAlt, FaUser } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await authService.register(formData);
      dispatch(hideLoading());
      if (res.success) {
        navigate("/login");
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0f1a] px-4 py-12">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }}>
        <div className="absolute inset-x-0 top-0 mx-auto h-64 w-[60%] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col-reverse gap-8 lg:flex-row lg:items-center">
        <div className="relative w-full max-w-xl lg:flex-1">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-2xl" />
          
          <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-blue-950/40 p-10 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/5 to-transparent" />
            
            <div className="relative">
              <div className="mb-8 space-y-2 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Create account</p>
                <h2 className="font-display text-3xl font-bold text-gray-100">Start using AppointMed</h2>
                <p className="text-sm text-gray-400">Join thousands of patients, doctors, and admins in one secure hub.</p>
              </div>

              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-error">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2.5">
                    <label className="text-sm font-semibold text-gray-300">Full name</label>
                    <div className="relative">
                      <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-modern w-full pl-14"
                        placeholder="Morgan Shaw"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-sm font-semibold text-gray-300">Phone number</label>
                    <div className="relative">
                      <FaPhoneAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-modern w-full pl-14"
                        placeholder="555 123 4567"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-gray-300">Email address</label>
                  <div className="relative">
                    <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-modern w-full pl-14"
                      placeholder="you@appointmed.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-gray-300">Password</label>
                  <div className="relative">
                    <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input-modern w-full pl-14 pr-11"
                      placeholder="Min. 8 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full text-base">
                  Create my account
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="card-glass relative flex flex-1 flex-col gap-6 overflow-hidden p-12 lg:flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-700 opacity-95" />
          <div className="relative z-10 space-y-6 text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider">
              Seamless onboarding
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight">
              Designed for patients, trusted by healthcare teams.
            </h1>
            <p className="text-white/90 text-lg">
              Personalize your availability, keep profiles current, and sync appointments across the system with zero hassle.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Patients", desc: "Find and book specialists in seconds" },
                { title: "Doctors", desc: "Manage schedules and approvals" },
                { title: "Admins", desc: "Oversee operations at a glance" },
                { title: "Security", desc: "HIPAA-ready infrastructure" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl bg-white/10 backdrop-blur p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-white">{item.title}</p>
                  <p className="text-sm text-white/90">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
