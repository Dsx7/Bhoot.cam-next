"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Arif Ahmed",
    role: "Late Night Listener",
    text: "The audio quality is insane. It feels like RJ Russell is sitting right behind me in the dark. 10/10 spookiness!",
    avatar: "https://ui-avatars.com/api/?name=Arif+Ahmed&background=00DB80&color=000"
  },
  {
    name: "Sumiya Khan",
    role: "Horror Fanatic",
    text: "Finally a place to download high-quality Sunday Suspense episodes without annoying ads. The UI is so clean.",
    avatar: "https://ui-avatars.com/api/?name=Sumiya+Khan&background=00DB80&color=000"
  },
  {
    name: "Rahul Dev",
    role: "Commuter",
    text: "I listen to these stories during my night shifts. The atmosphere Bhoot.cam creates is unmatched in Bengali media.",
    avatar: "https://ui-avatars.com/api/?name=Rahul+Dev&background=00DB80&color=000"
  },
  {
    name: "Tanvir Hossain",
    role: "Collector",
    text: "The archive is massive. I found episodes here that I couldn't find anywhere else. Best horror site in BD!",
    avatar: "https://ui-avatars.com/api/?name=Tanvir+Hossain&background=00DB80&color=000"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black text-white tracking-tighter"
        >
          WHISPERS FROM THE <span className="text-[#00DB80]">DARK</span>
        </motion.h2>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-4">What our community is saying</p>
      </div>

      {/* --- INFINITE MARQUEE ROW --- */}
      <div className="flex w-full relative">
        {/* Left/Right Fades for smooth transition */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>

        <motion.div 
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Render twice for seamless loop */}
          {[...reviews, ...reviews].map((item, index) => (
            <div 
              key={index}
              className="w-[350px] flex-shrink-0 bg-[#111] border border-white/5 p-6 rounded-3xl group hover:border-[#00DB80]/30 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full border border-white/10" />
                <div>
                  <h4 className="text-white font-bold text-sm">{item.name}</h4>
                  <p className="text-[#00DB80] text-[10px] font-black uppercase tracking-widest">{item.role}</p>
                </div>
                <div className="ml-auto opacity-20 group-hover:opacity-100 group-hover:text-[#00DB80] transition-all">
                    <Quote size={20} />
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#00DB80" className="text-[#00DB80]" />)}
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed whitespace-normal italic">
                "{item.text}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}