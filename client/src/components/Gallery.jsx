import React from 'react';

const images = [
  "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1582126892902-8ce1307b233a?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1514525253344-f81fec6a76af?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=400"
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold font-serif text-indigo-900 mb-4">Gallery</h2>
        <p className="text-xl text-gray-600 mb-12">Capturing moments of rhythm, harmony, and expression.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
              <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
