import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/layout/Layout";
import { userService } from "../../services/userService";
import { showLoading, hideLoading } from "../../features/alert/alertSlice";
import DoctorList from "../../components/DoctorList";
import { SectionHeader } from "../../components/common";
import { FaFilter, FaSearch } from "react-icons/fa";
import { cn } from "../../utils/cn";

const filterOptions = [
  { label: "All specialties", value: "all" },
  "Cardiologist",
  "Dentist",
  "Dermatologist",
  "Neurologist",
  "Orthopedist",
  "Pediatrician",
].map((option) => (typeof option === "string" ? { label: option, value: option } : option));

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const dispatch = useDispatch();

  const getDoctors = async () => {
    try {
      dispatch(showLoading());
      const res = await userService.getAllDoctors();
      dispatch(hideLoading());
      if (res.success) {
        setDoctors(res.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(search.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === "all" ||
        doctor.specialization?.toLowerCase() === selectedSpecialty.toLowerCase();

      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, search, selectedSpecialty]);

  return (
    <Layout>
      {/* Medical Network Section */}
      <div className="relative overflow-hidden rounded-3xl">
        {/* Glow effect behind */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/20 blur-3xl" />
        
        <div className="relative rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 via-slate-900/70 to-blue-950/50 p-8 shadow-2xl backdrop-blur-xl">
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-transparent" />
          
          <div className="relative space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Medical Network</span>
              </div>
              <h1 className="font-display text-3xl font-bold text-white lg:text-4xl">
                Find Your Specialist
              </h1>
              <p className="text-sm text-gray-300">
                Browse verified doctors, check availability, and book directly
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, specialty, or hospital..."
                className="w-full rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50 px-4 py-3 pl-12 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* Specialty Filters */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FaFilter className="text-sm text-blue-400" />
                <label className="text-sm font-semibold text-gray-300">
                  Filter by Specialty
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedSpecialty(option.value)}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-sm font-semibold transition-all",
                      selectedSpecialty === option.value
                        ? "border-blue-400/40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 shadow-lg shadow-blue-500/30"
                        : "border-blue-400/20 bg-blue-500/5 text-gray-300 hover:border-blue-400/40 hover:bg-blue-500/10"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10">
        {filteredDoctors.length === 0 ? (
          <div className="card-glass border border-[#4a5568] py-12 text-center text-gray-400">
            No doctors match your filters yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredDoctors.map((doctor) => (
              <DoctorList key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Doctors;

//Page loads → useEffect runs → Fetches all doctors from API
//User types "John" → search state updates → filteredDoctors recalculates → Shows only doctors with "John" in name
//User clicks "Cardiologist" → selectedSpecialty updates to "Cardiologist" → filteredDoctors recalculates → Shows only cardiologists named "John"
//User clicks "All specialties" → selectedSpecialty updates to "all" → Shows all doctors named "John" (any specialty)
