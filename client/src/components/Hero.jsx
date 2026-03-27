import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 animate-pulse"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20 animate-pulse"
          style={{ background: 'radial-gradient(circle, #4f46e5, transparent)', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />
      </div>

      {/* Floating art icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { emoji: '🩰', top: '20%', left: '8%', animation: 'bounce', delay: '0s' },
          { emoji: '🎵', top: '15%', right: '10%', animation: 'pulse', delay: '0.5s' },
          { emoji: '🎨', bottom: '25%', left: '6%', animation: 'bounce', delay: '1s' },
          { emoji: '🪘', bottom: '20%', right: '8%', animation: 'pulse', delay: '1.5s' },
          { emoji: '🎭', top: '55%', left: '3%', animation: 'bounce', delay: '0.75s' },
          { emoji: '🎺', top: '40%', right: '4%', animation: 'pulse', delay: '0.25s' },
        ].map((item, i) => (
          <div key={i} className={`absolute text-3xl opacity-30 animate-${item.animation}`}
            style={{ top: item.top, bottom: item.bottom, left: item.left, right: item.right, animationDelay: item.delay }}>
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8 text-purple-200 text-sm font-medium backdrop-blur-sm">
          <span>✨</span>
          <span>Celebrating 25 Years of Classical Arts Excellence</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          <span style={{ fontFamily: 'Georgia, serif' }}>Natyanjali</span>
          <br />
          <span className="text-3xl md:text-5xl font-light text-purple-300">Kalakshetra</span>
        </h1>

        <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          A sanctuary of classical arts — where the ancient traditions of Bharatanatyam, Carnatic music,
          and fine arts come alive through expert guidance and passionate learning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('courses')}
            className="px-8 py-4 rounded-xl text-white font-semibold text-base hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
            Explore Courses
          </button>
          <Link to="/login"
            className="px-8 py-4 rounded-xl text-purple-200 font-semibold text-base border border-purple-400/50 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
            Student Portal →
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-12 mt-20 pt-12 border-t border-white/10">
          {[['500+', 'Students'], ['25+', 'Years'], ['4', 'Art Forms'], ['50+', 'Alumni Awards']].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold text-white">{num}</p>
              <p className="text-purple-300 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-purple-300 text-xs">
        <span>Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-purple-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
