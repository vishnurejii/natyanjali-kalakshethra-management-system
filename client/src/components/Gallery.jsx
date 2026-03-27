import React from 'react';

const galleryItems = [
  { emoji: '🩰', span: 'row-span-2', label: 'Annual Arangetram', year: '2024' },
  { emoji: '🎵', span: '', label: 'Vocal Concert', year: '2024' },
  { emoji: '🎨', span: '', label: 'Art Exhibition', year: '2024' },
  { emoji: '🎭', span: '', label: 'Cultural Festival', year: '2023' },
  { emoji: '🪘', span: 'row-span-2', label: 'Rhythm Workshop', year: '2023' },
  { emoji: '🌸', span: '', label: 'Spring Recital', year: '2023' },
  { emoji: '🎺', span: '', label: 'Instrumental Fest', year: '2022' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 px-4" style={{ background: '#0f0c29' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
            Memories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
            Our Gallery
          </h2>
          <p className="text-purple-300 mt-4 max-w-xl mx-auto">
            Glimpses of our performances, workshops, and cultural celebrations over the years.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-40">
          {galleryItems.map(({ emoji, span, label, year }, i) => (
            <div key={i}
              className={`${span} relative rounded-2xl overflow-hidden group cursor-pointer`}
              style={{
                background: `linear-gradient(135deg, hsl(${260 + i * 15}, 70%, ${15 + (i % 3) * 5}%), hsl(${240 + i * 20}, 80%, ${10 + (i % 2) * 8}%))`,
                minHeight: span === 'row-span-2' ? '320px' : '150px',
              }}>
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">{emoji}</div>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-center px-4">
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-purple-300 text-xs mt-1">{year}</p>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/0 group-hover:border-purple-500/60 transition-all duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(124,58,237,0.15)' }} />

              {/* Label shown at bottom on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                <p className="text-white font-medium text-sm">{label}</p>
                <p className="text-purple-300 text-xs">{year}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-purple-400 text-sm mt-8">
          📸 Photos from our annual performances, workshops, and cultural events
        </p>
      </div>
    </section>
  );
};

export default Gallery;
