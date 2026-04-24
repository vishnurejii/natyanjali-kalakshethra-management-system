import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-bg-base overflow-hidden px-6 sm:px-12 py-24">
      {/* Subtle Background Pattern / Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-subtle to-bg-base pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <span className="text-accent font-medium tracking-widest text-sm uppercase mb-6 drop-shadow-sm">
          A Legacy of Classical Arts
        </span>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary mb-8 leading-tight">
          Natyanjali <br className="hidden md:block" />
          <span className="italic text-slate-800">Kalakshetra</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 font-sans max-w-2xl mx-auto mb-12 leading-relaxed">
          Discover the profound beauty of Bharatanatyam, Carnatic Vocal, and Flute through our rigorous, tradition-rooted curriculum.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="btn-premium px-8 py-3 text-base">
            Book a Trial
          </button>
          <Link to="/login" className="btn-outline px-8 py-3 text-base">
            Member Portal
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
