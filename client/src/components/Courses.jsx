import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
  {
    emoji: '🩰',
    title: 'Classical Dance',
    subtitle: 'Bharatanatyam',
    desc: 'Master the divine language of Bharatanatyam — from basic adavus and mudras to full-length abhinaya performances.',
    duration: '1 year',
    fee: '₹3,000 / month',
    badge: 'Most Popular',
    badgeColor: '#7c3aed',
  },
  {
    emoji: '🎵',
    title: 'Vocal Music',
    subtitle: 'Carnatic Classical',
    desc: 'Learn swaras, ragas, and kirtis under the guidance of professional Carnatic vocalists with decades of experience.',
    duration: '1.5 years',
    fee: '₹2,500 / month',
    badge: '',
    badgeColor: '',
  },
  {
    emoji: '🎺',
    title: 'Instrumental Music',
    subtitle: 'Veena · Flute · Mridangam',
    desc: 'Explore the melodic and rhythmic dimensions of classical Indian music with hands-on instrumental training.',
    duration: '2 years',
    fee: '₹3,500 / month',
    badge: '',
    badgeColor: '',
  },
  {
    emoji: '🎨',
    title: 'Drawing & Arts',
    subtitle: 'Tanjore · Folk · Sketching',
    desc: 'Discover the vibrant world of Indian art traditions — from intricate Tanjore paintings to contemporary sketching.',
    duration: '6 months',
    fee: '₹2,000 / month',
    badge: 'New Batch',
    badgeColor: '#059669',
  },
];

const Courses = () => {
  return (
    <section id="courses" className="py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #faf9ff 0%, #ede9fe 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: '#ede9fe', color: '#6d28d9' }}>
            Our Programmes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
            Courses We Offer
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Carefully crafted programmes that honour tradition while preparing students for the modern stage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {courses.map(({ emoji, title, subtitle, desc, duration, fee, badge, badgeColor }) => (
            <div key={title}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col overflow-hidden group">
              {/* Top accent */}
              <div className="h-2" style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{emoji}</div>
                  {badge && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                      style={{ background: badgeColor }}>
                      {badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-3">{subtitle}</p>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between text-sm">
                  <span className="text-gray-400">⏱ {duration}</span>
                  <span className="font-semibold text-gray-700">{fee}</span>
                </div>

                <Link to="/login"
                  className="mt-4 block text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: '#ede9fe', color: '#6d28d9' }}>
                  Enroll Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
