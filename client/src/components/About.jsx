import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1582126892902-8ce1307b233a?auto=format&fit=crop&q=80&w=1770" 
              alt="Art School" 
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold font-serif text-indigo-900 mb-6">About Natyanjali Kalakshetra</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded with the vision of nurturing and promoting Indian classical arts, Natyanjali Kalakshetra has been a beacon of cultural excellence for over a decade. We provide a sacred space for students to learn, practice, and master various forms of traditional arts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2 underline decoration-indigo-300">Our Mission</h3>
                <p className="text-gray-600">To preserve the purity of classical art forms and pass them on to the next generation with integrity and passion.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2 underline decoration-indigo-300">Our Vision</h3>
                <p className="text-gray-600">To be a globally recognized institution that fosters creativity, discipline, and cultural awareness through art.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
