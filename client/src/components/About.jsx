import React from 'react';

const About = () => {
  const pillars = [
    { emoji: '🏛️', title: 'Rich Heritage', desc: 'Rooted in the classical Kalakshetra tradition, preserving art forms passed down through generations.' },
    { emoji: '🎓', title: 'Expert Mentors', desc: 'Our faculty comprises arangetram-performing artists and nationally acclaimed musicians.' },
    { emoji: '🌟', title: 'Holistic Growth', desc: 'Beyond technique — we develop discipline, creativity, and cultural awareness in every student.' },
    { emoji: '🤝', title: 'Community', desc: 'A warm, inclusive artistic family where every student is celebrated and supported.' },
  ];

  return (
    <section id="about" className="py-24 px-4" style={{ background: '#faf9ff' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
              style={{ background: '#ede9fe', color: '#6d28d9' }}>
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}>
              Preserving Classical Arts,<br />
              <span style={{ color: '#7c3aed' }}>One Student at a Time</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 1999 by Guru Meenakshi Sundaram, Natyanjali Kalakshetra has been a beacon of classical arts
              education in the region. Our institution blends the time-honoured Kalakshetra style with a modern,
              nurturing environment.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We believe that arts education is not merely about performance — it is a journey of self-discovery,
              discipline, and cultural stewardship. Each year, our students participate in state-level cultural programs,
              arangetrams, and competitions, consistently earning recognition and acclaim.
            </p>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold" style={{ color: '#7c3aed' }}>500+</p>
                <p className="text-sm text-gray-500">Trained Students</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold" style={{ color: '#7c3aed' }}>25+</p>
                <p className="text-sm text-gray-500">Years of Excellence</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold" style={{ color: '#7c3aed' }}>100+</p>
                <p className="text-sm text-gray-500">Stage Performances</p>
              </div>
            </div>
          </div>

          {/* Pillars grid */}
          <div className="grid grid-cols-2 gap-4">
            {pillars.map(({ emoji, title, desc }) => (
              <div key={title}
                className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
                style={{ background: 'white' }}>
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
