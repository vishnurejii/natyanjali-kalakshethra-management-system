import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Courses from '../components/Courses';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="min-h-screen bg-bg-base">
      <header className="absolute top-0 w-full p-6 z-50 flex justify-between items-center">
        <div className="font-serif text-2xl font-bold tracking-tight text-primary">Natyanjali.</div>
        <nav className="hidden md:flex gap-8">
          <a href="#about" className="text-sm font-medium text-slate-600 hover:text-accent transition-colors">About</a>
          <a href="#courses" className="text-sm font-medium text-slate-600 hover:text-accent transition-colors">Courses</a>
          <a href="#gallery" className="text-sm font-medium text-slate-600 hover:text-accent transition-colors">Gallery</a>
          <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-accent transition-colors">Contact</a>
        </nav>
      </header>
      <main>
        <Hero />
        <About />
        <Courses />
        <Gallery />
        <Contact />
      </main>
      <footer className="py-8 text-center text-sm text-slate-400 border-t border-slate-100">
        &copy; {new Date().getFullYear()} Natyanjali Kalakshetra. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
