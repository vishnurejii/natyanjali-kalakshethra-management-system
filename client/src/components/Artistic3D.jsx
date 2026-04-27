import React from 'react';
import { motion } from 'framer-motion';

const Artistic3D = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative perspective-[2000px]">
      
      {/* Hologram Cylinder Container */}
      <div className="relative w-80 h-[500px] flex items-center justify-center">
        
        {/* Cylinder Top Cap */}
        <div className="absolute -top-6 left-0 right-0 h-12 rounded-[100%] border-2 border-cyan-400/30 bg-cyan-400/5 shadow-[0_0_20px_rgba(34,211,238,0.2)] z-30" />
        
        {/* Cylinder Bottom Base */}
        <div className="absolute -bottom-6 left-0 right-0 h-12 rounded-[100%] border-2 border-cyan-400/50 bg-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.4)] z-30" />
        
        {/* Main Cylinder Body */}
        <div className="absolute inset-0 rounded-[200px/100px] border-x-2 border-cyan-400/20 bg-gradient-to-b from-cyan-400/5 via-cyan-400/10 to-cyan-400/5 overflow-hidden z-20">
          {/* Internal Scanlines (Curved) */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
          <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(34,211,238,0.1)_2px,rgba(34,211,238,0.1)_4px)]" />
          
          {/* Vertical Scan Pulse */}
          <motion.div 
            animate={{ top: ["-20%", "120%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent blur-md"
          />
        </div>

        {/* 3D Dancer inside the Cylinder */}
        <motion.div 
          animate={{ 
            y: [-10, 10, -10],
            rotateY: [0, 360]
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="relative z-10 w-full flex items-center justify-center preserve-3d"
        >
          <div className="relative">
            {/* Subject Shadow Projection */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-8 bg-cyan-400/20 blur-xl rounded-full scale-y-50" />
            
            <img 
              src="/assets/hero-3d.png" 
              className="w-64 h-auto object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] mix-blend-screen brightness-110" 
              alt="Holographic Dancer"
            />
          </div>
        </motion.div>

        {/* Orbiting HUD Rings */}
        <motion.div 
          animate={{ rotateX: 75, rotateZ: 360 }}
          transition={{ rotateZ: { duration: 10, repeat: Infinity, ease: "linear" } }}
          className="absolute w-[450px] h-[450px] border border-dashed border-cyan-400/20 rounded-full z-0"
        />
        
        <motion.div 
          animate={{ rotateX: 75, rotateZ: -360 }}
          transition={{ rotateZ: { duration: 15, repeat: Infinity, ease: "linear" } }}
          className="absolute w-[550px] h-[550px] border border-cyan-400/10 rounded-full z-0"
        />

        {/* Floating Digital Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 200 - 100, 
              y: 200, 
              opacity: 0 
            }}
            animate={{ 
              y: -200, 
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: Math.random() * 4 + 2, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,1)] z-30"
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}} />
    </div>
  );
};

export default Artistic3D;
