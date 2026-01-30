"use client";

import React, { useState } from 'react';
import { Mic2, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // 1. Import Framer Motion

export default function ArtistSection() {
  const [showBio, setShowBio] = useState(false);

  return (
    <section className="py-16">
      {/* 2. Scroll-in Animation for the whole container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#111] border border-white/5 rounded-4xl overflow-hidden relative"
      >
        {/* 3. Pulsing Background Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05] 
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-0 right-0 w-64 h-64 bg-[#00DB80] blur-[100px]"
        ></motion.div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 relative z-10">
          
          {/* Artist Image with Hover Scale */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-[#00DB80]/20 shrink-0 shadow-2xl"
          >
            <img src="/rj_russell.jpg" alt="RJ Russell" className="w-full h-full object-cover" />
          </motion.div>

          {/* Bio Content */}
          <div className="flex-grow space-y-4 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00DB80]/10 text-[#00DB80] text-[10px] font-black uppercase tracking-widest border border-[#00DB80]/20"
            >
              <Mic2 size={12} /> The Master Storyteller
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-5xl font-black text-white"
            >
              RJ <span className="text-[#00DB80]">RUSSELL</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl"
            >
              The legendary voice behind the most spine-chilling horror experiences. 
              Bringing the paranormal to life one story at a time.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center md:justify-start gap-4 pt-4"
            >
              <button 
                onClick={() => setShowBio(true)}
                className="px-6 py-3 bg-white text-black font-black rounded-xl text-xs uppercase tracking-widest hover:bg-[#00DB80] transition-colors active:scale-95"
              >
                Read Biography
              </button>

              <a 
                href="https://www.facebook.com/russell.shadhin"
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-3 bg-white/5 text-white border border-white/10 font-black rounded-xl text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95"
              >
                Official Socials <ExternalLink size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* --- 4. ANIMATED MODAL WITH ANIMATEPRESENCE --- */}
      <AnimatePresence>
        {showBio && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop Fade */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => setShowBio(false)}
            ></motion.div>

            {/* Modal Content Zoom */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#111] border border-white/10 w-full max-w-2xl p-8 rounded-3xl relative z-10 shadow-2xl"
            >
              <button 
                onClick={() => setShowBio(false)} 
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <X />
              </button>
              
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">About RJ Russell</h3>
              
              <div className="text-gray-400 space-y-4 text-sm leading-relaxed overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                <p>RJ Russell is a name synonymous with horror in the Bengali audio industry. Known for his deep, atmospheric narration, he has captivated millions of listeners over the years.</p>
                <p>His journey started with radio, where his unique style of storytelling made him a household name. He specializes in creating an immersive paranormal experience that keeps listeners on the edge of their seats.</p>
                <p>On Bhoot.cam, RJ Russell continues his legacy by providing high-quality, bone-chilling horror episodes every week.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}