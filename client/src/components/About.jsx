import React from 'react';

const About = () => {
  return (
    <section className="py-24 px-6 sm:px-12 bg-white" id="about">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-serif text-primary mb-12 text-center">Our Lineage</h2>
        
        <div className="relative border-l border-slate-200 ml-4 md:ml-0 md:pl-0 md:border-none space-y-12">
          {/* Timeline Item 1 */}
          <div className="relative pl-8 md:pl-0 md:flex md:items-start md:gap-8 group">
            <div className="absolute left-[-5px] md:static w-2.5 h-2.5 bg-accent rounded-full mt-2 group-hover:scale-150 transition-transform" />
            <div className="md:w-32 pt-0.5 text-sm font-medium text-slate-500 uppercase tracking-widest shrink-0">1985</div>
            <div className="flex-1 bento-card p-6">
              <h3 className="text-xl font-serif text-primary mb-2">Foundation</h3>
              <p className="text-slate-600 font-sans leading-relaxed text-sm">
                Established by legendary Guru Rukmini Devi, Natyanjali began as a humble offering to the classical arts in a small courtyard in Chennai.
              </p>
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="relative pl-8 md:pl-0 md:flex md:items-start md:gap-8 group">
            <div className="absolute left-[-5px] md:static w-2.5 h-2.5 bg-accent rounded-full mt-2 group-hover:scale-150 transition-transform" />
            <div className="md:w-32 pt-0.5 text-sm font-medium text-slate-500 uppercase tracking-widest shrink-0">1998</div>
            <div className="flex-1 bento-card p-6">
              <h3 className="text-xl font-serif text-primary mb-2">Expansion</h3>
              <p className="text-slate-600 font-sans leading-relaxed text-sm">
                Introduced Carnatic Vocal and classical Flute, transforming the institution into a holistic Kalakshetra.
              </p>
            </div>
          </div>

          {/* Timeline Item 3 */}
          <div className="relative pl-8 md:pl-0 md:flex md:items-start md:gap-8 group">
            <div className="absolute left-[-5px] md:static w-2.5 h-2.5 bg-accent rounded-full mt-2 group-hover:scale-150 transition-transform" />
            <div className="md:w-32 pt-0.5 text-sm font-medium text-slate-500 uppercase tracking-widest shrink-0">Present</div>
            <div className="flex-1 bento-card p-6">
              <h3 className="text-xl font-serif text-primary mb-2">Modern Era</h3>
              <p className="text-slate-600 font-sans leading-relaxed text-sm">
                Embracing global reach with online curriculum while strictly preserving the purity of our ancient traditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
