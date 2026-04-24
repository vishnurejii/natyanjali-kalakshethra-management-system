import React from 'react';

const Contact = () => {
  return (
    <section className="relative py-32 px-6 sm:px-12 bg-bg-subtle overflow-hidden" id="contact">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100/50 transform -skew-x-12 translate-x-32" />
      
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-serif text-primary mb-6">Begin Your Journey</h2>
          <p className="text-slate-600 font-sans leading-relaxed mb-8">
            Admissions for the upcoming academic year are currently open. Reach out to schedule a consultation or trial session with our faculty.
          </p>
          <div className="space-y-4 text-sm text-slate-600 font-medium">
            <p className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-accent">📍</span>
              124 Heritage Lane, Cultural District
            </p>
            <p className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-accent">📞</span>
              +1 (555) 123-4567
            </p>
          </div>
        </div>

        {/* Glassmorphism Form */}
        <div className="glass-panel p-8 sm:p-10 rounded-2xl">
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-primary uppercase tracking-widest mb-2">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-sm"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary uppercase tracking-widest mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary uppercase tracking-widest mb-2">Discipline</label>
              <select className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-sm text-slate-600">
                <option>Bharatanatyam</option>
                <option>Carnatic Vocal</option>
                <option>Flute</option>
              </select>
            </div>
            <button type="button" className="w-full btn-accent py-3.5 mt-2">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
