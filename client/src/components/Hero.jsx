import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress over the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animation Transforms
  const textScale = useTransform(smoothProgress, [0, 0.3, 0.6], [1, 0.9, 0.8]);
  const textOpacity = useTransform(smoothProgress, [0, 0.3, 0.6], [1, 1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.6], [0, -100]);
  
  const imageScale = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0.9, 1.05, 1.1, 1.2]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const imageBlur = useTransform(smoothProgress, [0, 0.3, 0.6], ["blur(10px)", "blur(0px)", "blur(2px)"]);
  
  const bgOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 0.1, 0.2]);
  
  // Floating elements parallax
  const floatY1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const floatY2 = useTransform(smoothProgress, [0, 1], [0, -400]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 45]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-bg-base">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Artistic Layers */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-brand-500 pointer-events-none"
        />
        
        {/* Subtle Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

        {/* Floating Brush Strokes (SVG) */}
        <motion.div 
          style={{ y: floatY1, rotate: rotate1 }}
          className="absolute top-1/4 -left-20 w-96 h-96 opacity-10 pointer-events-none"
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 100C10 100 50 10 100 10C150 10 190 100 190 100C190 100 150 190 100 190C50 190 10 100 10 100Z" fill="currentColor" className="text-accent" />
          </svg>
        </motion.div>

        <motion.div 
          style={{ y: floatY2, rotate: -15 }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 opacity-10 pointer-events-none"
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" className="text-brand-600" strokeDasharray="10 5" />
          </svg>
        </motion.div>

        {/* Main Artistic Image (Dancer) */}
        <motion.div 
          style={{ 
            scale: imageScale, 
            opacity: imageOpacity,
            filter: imageBlur
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <img 
            src="/assets/hero-art.png" 
            alt="Classical Art" 
            className="w-full max-w-5xl object-contain opacity-80"
          />
        </motion.div>

        {/* Content Layer */}
        <motion.div 
          style={{ 
            scale: textScale, 
            opacity: textOpacity,
            y: textY
          }}
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent font-medium tracking-[0.3em] text-sm uppercase mb-6 block"
          >
            A Legacy of Classical Arts
          </motion.span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-primary mb-8 leading-[0.9] tracking-tighter">
            Natyanjali <br />
            <span className="italic font-light text-slate-800/80">Kalakshetra</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 font-sans max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Where tradition meets soul. Master the divine arts of Bharatanatyam and Carnatic music.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="btn-premium px-10 py-4 text-lg group overflow-hidden relative">
              <span className="relative z-10">Begin Your Journey</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <Link to="/login" className="btn-outline px-10 py-4 text-lg">
              Member Portal
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-200 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
