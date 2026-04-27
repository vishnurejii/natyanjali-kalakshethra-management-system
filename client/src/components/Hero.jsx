import React, { useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Artistic3D from './Artistic3D';

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
  
  // 3D Scene Movement
  const imageScale = useTransform(smoothProgress, [0, 0.4, 1], [0.8, 1.2, 1.5]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);
  const imageY = useTransform(smoothProgress, [0, 1], [0, 200]);
  
  const bgOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 0.1, 0.3]);
  
  // Floating elements parallax
  const floatY1 = useTransform(smoothProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#020617]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Artistic Layers */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-brand-600 pointer-events-none"
        />
        
        {/* Cinematic Dust/Particles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Real 3D Interactive Scene */}
        <motion.div 
          style={{ 
            scale: imageScale, 
            opacity: imageOpacity,
            y: imageY
          }}
          className="absolute inset-0 z-0 flex items-center justify-center translate-y-20"
        >
          <div className="w-full h-full max-w-7xl">
            <Suspense fallback={null}>
              <Artistic3D />
            </Suspense>
          </div>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-300 font-medium tracking-[0.4em] text-[10px] uppercase backdrop-blur-sm">
              Real-time 3D Artistry
            </span>
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-8 leading-[0.85] tracking-tighter font-serif">
            Natyanjali <br />
            <span className="italic font-light text-cyan-400/80 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Artisan</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 font-sans max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Behold the digital sanctuary of classical art. Experience the divine mudras preserved in a real-time holographic sanctuary.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="btn-premium px-12 py-5 text-lg group relative overflow-hidden bg-white text-slate-900 hover:text-white transition-colors duration-500">
              <span className="relative z-10">Start Your Experience</span>
              <div className="absolute inset-0 bg-brand-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <Link to="/login" className="btn-outline px-12 py-5 text-lg text-white border-white/20 hover:bg-white/5">
              Portal Access
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-brand-500 to-transparent relative">
            <motion.div 
              animate={{ y: [0, 60, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-bold">Interact & Scroll</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
