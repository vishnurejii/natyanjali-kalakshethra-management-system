import React from 'react';

const courses = [
  {
    title: "Classical Dance",
    description: "Master Bharatanatyam and Mohiniyattam with expert guidance.",
    duration: "2-4 Years",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Vocal Music",
    description: "Learn Carnatic and Hindustani classical vocal techniques.",
    duration: "1-3 Years",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Instrumental Music",
    description: "Training in Veena, Violin, Flute, and Mridangam.",
    duration: "2-5 Years",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Drawing & Arts",
    description: "Explore traditional painting and sketching methods.",
    duration: "6 Months - 2 Years",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600"
  }
];

const Courses = () => {
  return (
    <section id="courses" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold font-serif text-indigo-900 mb-4">Our Courses</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Diverse programs tailored to awaken the artist within you.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
              <div className="h-48 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">{course.duration}</span>
                  <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Enroll Now →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
