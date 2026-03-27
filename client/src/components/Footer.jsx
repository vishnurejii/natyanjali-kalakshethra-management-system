import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{ background: '#0f0c29' }}>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">🎭</span>
              <div>
                <p className="text-white font-bold text-xl" style={{ fontFamily: 'Georgia, serif' }}>Natyanjali</p>
                <p className="text-purple-400 text-xs">Kalakshetra</p>
              </div>
            </div>
            <p className="text-purple-300 text-sm leading-relaxed max-w-xs">
              Nurturing the classical arts of India since 1999. A place where tradition meets talent
              and students find their cultural identity.
            </p>
            <div className="flex gap-3 mt-6">
              {['📘', '📸', '🎬', '🐦'].map((icon, i) => (
                <button key={i}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-all hover:scale-110"
                  style={{ background: 'rgba(124,58,237,0.3)' }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {['About', 'Courses', 'Gallery', 'Contact'].map(link => (
                <li key={link}>
                  <button onClick={() => scrollTo(link.toLowerCase())}
                    className="text-purple-300 hover:text-white text-sm transition-colors">
                    {link}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/login" className="text-purple-300 hover:text-white text-sm transition-colors">
                  Student Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-semibold mb-5">Programmes</h3>
            <ul className="space-y-3">
              {['Bharatanatyam', 'Carnatic Vocal', 'Instrumental Music', 'Drawing & Arts'].map(c => (
                <li key={c}>
                  <span className="text-purple-300 text-sm">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-purple-400 text-sm">
            © 2025 Natyanjali Kalakshetra. All rights reserved.
          </p>
          <p className="text-purple-500 text-xs">
            Designed with ❤️ for classical arts education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
