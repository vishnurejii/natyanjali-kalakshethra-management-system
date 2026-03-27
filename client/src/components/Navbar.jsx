import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['About', 'Courses', 'Gallery', 'Contact'];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}
      style={{ background: scrolled ? 'rgba(30,27,75,0.98)' : 'rgba(30,27,75,0.7)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-2xl">🎭</span>
            <div>
              <span className="text-white font-bold text-xl" style={{ fontFamily: 'Georgia, serif' }}>
                Natyanjali
              </span>
              <span className="text-purple-300 text-xs block leading-none">Kalakshetra</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-purple-200 hover:text-white text-sm font-medium transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                to={`/${user.role}`}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/login"
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white border border-purple-400 hover:bg-purple-600 hover:border-purple-600 transition-all">
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-purple-800">
            {navLinks.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                className="block w-full text-left text-purple-200 hover:text-white py-2 px-2 text-sm font-medium">
                {link}
              </button>
            ))}
            <Link to="/login" className="block mt-3 text-center py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
