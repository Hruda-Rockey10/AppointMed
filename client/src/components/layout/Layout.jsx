import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#0a0f1a] text-white">
      {/* Animated Mesh Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      >
        {/* Multiple Glow Orbs */}
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 h-72 w-72 rounded-full bg-indigo-500/20 blur-[100px]" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/3 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 w-full">
          <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
            {children} 
            {/* layout wrapping children */}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
