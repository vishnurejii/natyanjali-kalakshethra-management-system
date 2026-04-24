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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-3xl transition-transform group-hover:scale-110 duration-300">🎭</span>
            <div>
              <span className="text-white font-bold text-2xl font-sans tracking-tight">
                Natyanjali
              </span>
              <span className="text-white/80 text-xs block leading-none font-medium uppercase tracking-widest mt-1">Kalakshetra</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-white/90 hover:text-white text-sm font-semibold transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link
                to={`/${user.role}`}
                className="px-6 py-2.5 rounded-full text-sm font-bold bg-white/10 text-white hover:bg-white hover:text-brand-600 transition-all duration-300 border border-white/20 backdrop-blur-md"
              >
                Dashboard
              </Link>
            ) : (
              <Link to="/login"
                className="px-6 py-2.5 rounded-full text-sm font-bold bg-white text-brand-600 hover:bg-brand-50 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5">
                Student Portal
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-6 pt-4 border-t border-white/10 bg-black/40 backdrop-blur-2xl absolute top-full left-0 w-full px-6 shadow-2xl">
            {navLinks.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                className="block w-full text-left text-white/90 hover:text-white hover:bg-white/10 py-3 px-4 rounded-xl text-sm font-semibold mb-2 transition-colors">
                {link}
              </button>
            ))}
            <Link to="/login" className="block mt-6 text-center py-3.5 rounded-xl bg-white text-brand-600 text-sm font-bold shadow-lg">
              Student Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
