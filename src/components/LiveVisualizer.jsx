"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function LiveVisualizer() {
  // Generate 12 bars with different heights
  const bars = Array.from({ length: 15 });

  return (
    <div className="fixed bottom-8 left-8 z-[100] hidden lg:flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl group hover:border-[#00DB80]/40 transition-all duration-500">
      
      {/* --- WAVEFORM BARS --- */}
      <div className="flex items-center gap-[3px] h-8 w-16">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: [
                "20%", 
                `${Math.random() * 80 + 20}%`, 
                `${Math.random() * 80 + 20}%`, 
                "20%"
              ],
            }}
            transition={{
              duration: Math.random() * 0.5 + 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05
            }}
            className="w-1 bg-[#00DB80] rounded-full opacity-80"
          />
        ))}
      </div>

      {/* --- TEXT INFO --- */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DB80] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00DB80]"></span>
            </span>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Archive</span>
        </div>
        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter group-hover:text-gray-300 transition-colors">
            Immersive Horror Audio
        </p>
      </div>
    </div>
  );
}