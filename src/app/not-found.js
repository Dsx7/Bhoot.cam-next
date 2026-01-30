"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 text-center relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#00DB80] opacity-[0.05] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-lg">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <Ghost size={120} className="text-[#00DB80] opacity-80" />
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-10 right-2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"
            ></motion.div>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-8xl font-black text-white tracking-tighter mb-2"
        >
          404
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-400 mb-6 uppercase tracking-widest"
        >
          Dead End.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 mb-10 leading-relaxed"
        >
          The page you are looking for has been taken by the spirits. 
          Turn back now before it&apos;s too late.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-black rounded-2xl uppercase tracking-widest hover:bg-[#00DB80] transition-all hover:scale-105">
            <Home size={18} /> Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}