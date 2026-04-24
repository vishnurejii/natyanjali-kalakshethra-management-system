import React from 'react';

const Courses = () => {
  const courses = [
    {
      title: "Bharatanatyam",
      desc: "Immerse in the ancient cosmic dance. Focus on Adavus, Abhinaya, and profound storytelling.",
      level: "Beginner to Advanced",
      tag: "Dance"
    },
    {
      title: "Carnatic Vocal",
      desc: "Master the intricate ragas and talas. Build a strong foundation in classical south Indian vocal traditions.",
      level: "All Levels",
      tag: "Music"
    },
    {
      title: "Classical Flute",
      desc: "Learn the divine instrument of Krishna. Emphasis on breath control, fingering, and gamakas.",
      level: "Intermediate",
      tag: "Instrumental"
    }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 bg-bg-subtle" id="courses">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-primary mb-4">Curriculum</h2>
          <p className="text-slate-600 font-sans">Disciplines mastered through rigorous devotion.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div key={idx} className="bento-card p-8 group flex flex-col h-full cursor-pointer">
              <span className="text-xs font-medium text-accent uppercase tracking-widest mb-4 inline-block">
                {course.tag}
              </span>
              <h3 className="text-2xl font-serif text-primary mb-4 group-hover:text-accent transition-colors">
                {course.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                {course.desc}
              </p>
              <div className="flex justify-between items-center mt-auto border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-400 font-medium">{course.level}</span>
                <span className="text-accent text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
