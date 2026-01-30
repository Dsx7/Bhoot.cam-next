"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Download, QrCode, ShieldCheck, X } from 'lucide-react';

export default function AppPromo() {
  const [showQR, setShowQR] = useState(false);

  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#00DB80] opacity-[0.03] blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4">
        {/* Mobile: flex-col-reverse ensures text is readable before the graphic */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 flex flex-col-reverse lg:flex-row items-center gap-10 md:gap-16">
          
          {/* --- LEFT: MOCKUP --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative shrink-0 mt-8 lg:mt-0"
          >
            {/* Scaled down phone for mobile (w-60 instead of w-[280px]) */}
            <div className="w-60 h-[480px] md:w-[280px] md:h-[580px] bg-[#111] rounded-[2.5rem] md:rounded-[3rem] border-[6px] md:border-[8px] border-[#1a1a1a] relative shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-5 md:h-6 bg-[#1a1a1a] rounded-b-2xl z-20"></div>
              
              <div className="p-4 pt-10 space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00DB80] rounded-xl mb-6"></div>
                <div className="space-y-2">
                    <div className="w-full h-24 md:h-32 bg-white/5 rounded-2xl animate-pulse"></div>
                    <div className="w-2/3 h-3 md:h-4 bg-white/10 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 md:mt-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-square bg-white/5 rounded-xl border border-white/5"></div>
                    ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#00DB80]/10 to-transparent pointer-events-none"></div>
            </div>
            
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-4 md:-right-10 top-20 bg-[#00DB80] text-black p-3 md:p-4 rounded-xl md:rounded-2xl shadow-2xl z-30"
            >
                <Smartphone size={20} />
            </motion.div>
          </motion.div>

          {/* --- RIGHT: TEXT CONTENT --- */}
          <div className="flex-grow space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight md:leading-none">
                HORROR IN YOUR <br className="hidden md:block" />
                <span className="text-[#00DB80]">POCKET.</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto lg:mx-0">
                Experience Bhoot.cam like never before. Download our official app for offline listening and high-bitrate audio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#00DB80] transition-colors active:scale-95">
                <Download size={18} /> Get on Play Store
              </button>

              {/* SCAN AREA (Trigger) */}
              <button 
                onClick={() => setShowQR(true)}
                className="w-full sm:w-auto flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all"
              >
                <QrCode size={24} className="text-[#00DB80]" />
                <div className="text-left">
                    <p className="text-[10px] text-gray-500 font-bold leading-none uppercase">Scan to</p>
                    <p className="text-xs text-white font-black leading-none mt-1 uppercase">Download</p>
                </div>
              </button>
            </div>

            <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 md:gap-3 text-gray-500 justify-center lg:justify-start">
                    <ShieldCheck size={16} className="text-[#00DB80]" />
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Safe & Secure</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-gray-500 justify-center lg:justify-start">
                    <Smartphone size={16} className="text-[#00DB80]" />
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">iOS & Android</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- QR MODAL --- */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowQR(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-10 rounded-[2.5rem] relative z-10 text-center max-w-xs"
            >
              <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-gray-500"><X /></button>
              <div className="bg-white p-4 rounded-3xl mb-6 inline-block">
                {/* Placeholder for actual QR code image or component */}
                <QrCode size={180} className="text-black" />
              </div>
              <h3 className="text-white font-black uppercase tracking-tight text-xl mb-2">Scan Now</h3>
              <p className="text-gray-500 text-xs font-medium">Point your camera at the screen to get the Bhoot.cam App.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}