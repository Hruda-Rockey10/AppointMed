import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../features/alert/alertSlice";
import { authService } from "../../services/authService";
import { setUser } from "../../features/user/userSlice";
import { FaCheckCircle, FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await authService.login(formData);
      dispatch(hideLoading());
      if (res.success) {
        dispatch(setUser(res.data));
        navigate("/");
      } else {
        setError(res.message || "Login failed");
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
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center">
        <div className="card-glass relative hidden overflow-hidden p-12 lg:flex lg:flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-700 opacity-95" />
          <div className="relative z-10 flex flex-col gap-6 text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              AppointMed Platform
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight">
              Smarter scheduling for doctors, patients & administrators.
            </h1>
            <p className="text-white/90 text-lg">
              Manage appointments, review diagnostics, and stay connected with your care team using a single, unified experience.
            </p>
            <ul className="space-y-4 text-sm">
              {["Secure role-based access", "Real-time appointment tracking", "Modern dashboards with live alerts"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FaCheckCircle className="mt-0.5 text-green-400 shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </li>
                )
              )}
            </ul>
            <div className="grid gap-4 sm:grid-cols-3">
              {["2K+ daily visits", "99.9% uptime", "24/7 support"].map((stat) => (
                <div
                  key={stat}
                  className="rounded-xl bg-white/10 backdrop-blur px-4 py-3 text-center text-sm font-semibold"
                >
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-xl lg:flex-1">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-2xl" />
          
          <div className="relative rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/40 p-10 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/5 to-transparent" />
            
            <div className="relative">
              <div className="mb-8 space-y-2 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-500">Welcome back</p>
                <h2 className="font-display text-3xl font-bold text-gray-100">Sign in to AppointMed</h2>
                <p className="text-sm text-gray-400">
                  Enter your credentials to continue to your dashboard.
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-error">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="••••••••"
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
                  Sign in to dashboard
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="font-semibold text-amber-500 hover:text-amber-600 transition-colors">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
