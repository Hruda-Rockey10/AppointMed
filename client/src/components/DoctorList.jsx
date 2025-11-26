import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaStar, FaStethoscope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl"
    >
      {/* Glow effect behind card */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Main card */}
      <div className="relative rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/50 via-slate-900/70 to-blue-950/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:border-blue-400/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-transparent" />
        
        <div className="relative space-y-5">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-2xl font-bold text-white shadow-lg shadow-blue-500/50">
                {doctor.firstName?.[0]}{doctor.lastName?.[0]}
              </div>
              
              {/* Name & Specialty */}
              <div>
                <h3 className="text-lg font-bold text-white">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h3>
                <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1">
                  <FaStethoscope className="text-xs text-blue-400" />
                  <span className="text-xs font-semibold text-blue-400">{doctor.specialization}</span>
                </div>
              </div>
            </div>

            {/* Rating Badge */}
            {doctor.rating && (
              <div className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-2 py-1">
                <FaStar className="text-sm text-amber-400" />
                <span className="text-sm font-bold text-amber-400">{doctor.rating}</span>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Experience */}
            <div className="rounded-xl border border-blue-400/20 bg-blue-500/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Experience</p>
              <p className="mt-1 text-base font-bold text-white">{doctor.experience || 'N/A'}</p>
            </div>

            {/* Fee Per Visit */}
            <div className="rounded-xl border border-blue-400/20 bg-blue-500/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Consultation</p>
              <p className="mt-1 text-base font-bold text-white">₹{doctor.feesPerCunsaltation || doctor.feesPerConsultation || 'N/A'}</p>
            </div>
          </div>

          {/* Availability & Location */}
          <div className="space-y-2">
            {doctor.timings && (
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <FaClock className="text-cyan-400" />
                <span>{doctor.timings.start} - {doctor.timings.end}</span>
              </div>
            )}
            {doctor.address && (
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-cyan-400" />
                <span className="line-clamp-1">{doctor.address}</span>
              </div>
            )}
          </div>

          {/* Book Appointment Button - Redesigned */}
          <button className="group/btn mt-4 w-full overflow-hidden rounded-xl border border-blue-400/30 bg-gradient-to-r from-blue-500 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/50">
            <div className="flex h-full w-full items-center justify-center gap-2.5 rounded-[10px] bg-gradient-to-br from-blue-950/90 to-slate-900/90 px-6 py-3 backdrop-blur-sm transition-all group-hover/btn:from-blue-950/70 group-hover/btn:to-slate-900/70">
              <FaCalendarCheck className="text-lg text-blue-400 transition-transform group-hover/btn:scale-110" />
              <span className="text-sm font-bold text-white">Book Appointment</span>
            </div>
          </button>
        </div>
      </div>
    </article>
  );
};

export default DoctorList;
