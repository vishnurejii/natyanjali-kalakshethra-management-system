import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-indigo-900 font-serif">Natyanjali Kalakshetra</span>
          </div>
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <a href="#home" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Home</a>
            <a href="#about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">About</a>
            <a href="#courses" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Courses</a>
            <a href="#gallery" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Gallery</a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
