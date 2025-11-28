import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss, SiRedux } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hruda10/',
      icon: FaLinkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Hruda-Rockey10/AppointMed',
      icon: FaGithub,
      color: 'hover:text-gray-300'
    },
    {
      name: 'Email',
      url: 'mailto:hruda.iit.work@gmail.com',
      icon: FaEnvelope,
      color: 'hover:text-cyan-400'
    }
  ];

  const techStack = [
    { name: 'React', icon: SiReact, color: 'text-cyan-400' },
    { name: 'Redux', icon: SiRedux, color: 'text-purple-400' },
    { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-400' },
    { name: 'Express', icon: SiExpress, color: 'text-gray-300' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-green-400' },
    { name: 'Tailwind', icon: SiTailwindcss, color: 'text-cyan-400' }
  ];

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent blur-3xl" />
      
      {/* Main footer content */}
      <div className="relative border-t border-blue-400/20 bg-gradient-to-br from-blue-950/60 via-slate-900/80 to-blue-950/60 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden">
                  <img 
                    src="/favicon.png" 
                    alt="AppointMed Logo" 
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AppointMed</h3>
                  <p className="text-xs text-gray-400">Healthcare Simplified</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Modern healthcare appointment management system connecting patients with verified doctors seamlessly.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400">Built With</h4>
              <div className="flex flex-wrap gap-4">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/10 px-3 py-2 transition-all hover:border-blue-400/40 hover:bg-blue-500/20"
                  >
                    <tech.icon className={`text-lg ${tech.color}`} />
                    <span className="text-sm font-medium text-gray-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connect Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400">Connect</h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-gray-400 transition-all hover:border-blue-400/50 hover:bg-blue-500/20 ${link.color}`}
                    aria-label={link.name}
                  >
                    <link.icon className="text-lg" />
                  </a>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                Have questions or feedback? Feel free to reach out!
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 border-t border-blue-400/20 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-gray-400">
                © {currentYear} AppointMed. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Developed by</span>
                <span className="font-semibold text-blue-400">Hrudananda Behera</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">Full Stack Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
