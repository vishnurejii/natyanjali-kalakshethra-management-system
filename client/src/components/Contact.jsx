import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, POST this to a backend endpoint or email service
    console.log('Contact form submitted:', form);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }, 4000);
  };

  const contactInfo = [
    { emoji: '📍', label: 'Address', value: '14, Kalakshetra Road, Chennai – 600090, Tamil Nadu' },
    { emoji: '📞', label: 'Phone', value: '+91 98765 43210' },
    { emoji: '✉️', label: 'Email', value: 'info@natyanjali.edu' },
    { emoji: '🕐', label: 'Hours', value: 'Mon – Sat: 9 AM – 7 PM' },
  ];

  return (
    <section id="contact" className="py-24 px-4" style={{ background: '#faf9ff' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: '#ede9fe', color: '#6d28d9' }}>
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
            Contact Us
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Have questions about admissions or courses? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-8">Reach Us At</h3>
            <div className="space-y-6">
              {contactInfo.map(({ emoji, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: '#ede9fe' }}>
                    {emoji}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 mb-1">{label}</p>
                    <p className="text-gray-700">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-10 h-48 rounded-2xl flex items-center justify-center text-gray-400 text-sm"
              style={{ background: '#ede9fe', border: '2px dashed #c4b5fd' }}>
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p>Map Placeholder</p>
                <p className="text-xs">14, Kalakshetra Road, Chennai</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Message Sent!</h4>
                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
                    placeholder="Tell us about your interest..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
                </div>
                <button type="submit"
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                  Send Message ✉️
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
