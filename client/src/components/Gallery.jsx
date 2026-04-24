import React from 'react';

const Gallery = () => {
  // Placeholder images for the masonry grid
  const images = [
    { src: "https://images.unsplash.com/photo-1542614530-580a5202ee26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Arangetram", span: "row-span-2 col-span-2" },
    { src: "https://images.unsplash.com/photo-1601614748174-8d933bb7b2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Mudra Practice", span: "row-span-1 col-span-1" },
    { src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Vocal Ensemble", span: "row-span-1 col-span-1" },
    { src: "https://images.unsplash.com/photo-1460036521480-c11c52ebf6ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Nattuvangam", span: "row-span-1 col-span-2" },
  ];

  return (
    <section className="py-32 px-6 sm:px-12 bg-white relative overflow-hidden" id="gallery">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-serif text-slate-900 tracking-tight">Captured Moments</h2>
          <div className="w-24 h-1 bg-brand-600 mx-auto rounded-full" />
          <p className="text-slate-500 font-medium max-w-xl mx-auto">Witness the grace, dedication, and artistic excellence of our students in their journey through classical arts.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[240px]">
          {images.map((img, idx) => (
            <div key={idx} className={`relative overflow-hidden rounded-3xl group cursor-pointer shadow-premium hover:shadow-2xl transition-all duration-700 ${img.span}`}>
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <p className="text-brand-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Exhibition</p>
                <h4 className="text-white font-serif text-2xl font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="btn-premium">View Full Collection</button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
