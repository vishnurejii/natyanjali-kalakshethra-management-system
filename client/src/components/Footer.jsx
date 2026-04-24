import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-slate-950 pt-32 pb-16 relative overflow-hidden text-slate-400">
      {/* Premium background effects */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-48 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Identity */}
          <div className="lg:col-span-5 space-y-10">
            <div className="flex items-center gap-5">
              <span className="text-5xl drop-shadow-2xl">🎭</span>
              <div>
                <p className="text-white font-bold text-4xl font-serif tracking-tight leading-none">Natyanjali</p>
                <p className="text-brand-500 font-black text-[10px] uppercase tracking-[0.3em] mt-2">Kalakshetra Academy</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed max-w-md font-medium text-slate-500">
              Preserving the eternal essence of Indian classical heritage since 1999. Where every mudra tells a story and every beat resonates with tradition.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'YT', 'TW'].map((label, i) => (
                <button key={i}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black tracking-tighter transition-all duration-300 bg-white/5 border border-white/10 text-white hover:bg-brand-600 hover:border-brand-600 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-600/20">
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-7 grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-white font-bold mb-10 font-serif tracking-wide text-xl">Institution</h3>
              <ul className="space-y-6">
                {['About Us', 'Our Courses', 'Gallery', 'Contact'].map(link => (
                  <li key={link}>
                    <button onClick={() => scrollTo(link.toLowerCase().replace(' ', ''))}
                      className="hover:text-brand-400 text-base font-bold transition-all duration-300 hover:translate-x-2">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-10 font-serif tracking-wide text-xl">Programmes</h3>
              <ul className="space-y-6">
                {['Bharatanatyam', 'Carnatic Vocal', 'Instrumental', 'Fine Arts'].map(c => (
                  <li key={c}>
                    <span className="hover:text-brand-400 text-base font-bold transition-all duration-300 cursor-pointer block hover:translate-x-2">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-white font-bold font-serif tracking-wide text-xl">Portals</h3>
              <Link to="/login" className="group block p-6 rounded-3xl bg-brand-600/10 border border-brand-500/20 hover:bg-brand-600 transition-all duration-500">
                <p className="text-brand-400 group-hover:text-white font-black text-[10px] uppercase tracking-widest mb-2">Internal Access</p>
                <p className="text-white font-bold text-lg flex items-center gap-2">
                  Student Login <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
            <p>&copy; {new Date().getFullYear()} Natyanjali</p>
            <a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-500 transition-colors">Terms of Service</a>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
            Handcrafted with <span className="text-brand-600 text-xl animate-pulse">❦</span> for the Arts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
