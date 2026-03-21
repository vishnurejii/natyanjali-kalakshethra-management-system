import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold font-serif mb-6">Contact Us</h2>
            <p className="text-lg text-indigo-200 mb-10">Have questions about our courses or admissions? Reach out to us today.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-800 rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                <span>123 Art Street, Cultural Center, City, State - 567890</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-800 rounded-full">
                  <Phone className="w-6 h-6" />
                </div>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-800 rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <span>info@natyanjali.com</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-2xl text-gray-900">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email / Phone</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Contact Detail" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Enrollment Inquiry</option>
                  <option>General Question</option>
                  <option>Performance Booking</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
