import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-indigo-900 h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1972" 
          alt="Classical Dance" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-white">
        <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 animate-fade-in">
          Preserving Tradition <br /> <span className="text-indigo-300">Through Art</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl">
          Join Natyanjali Kalakshetra and embark on a journey of cultural discovery through classical dance, music, and arts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#courses" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:scale-105">
            Explore Courses
          </a>
          <button className="inline-flex justify-center items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-indigo-900 transition-all">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
