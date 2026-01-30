"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Headphones, Heart } from 'lucide-react';

const features = [
  {
    icon: <Headphones className="text-[#00DB80]" size={24} />,
    title: "Immersive Audio",
    desc: "Every episode is mastered for high-fidelity sound, ensuring a bone-chilling experience."
  },
  {
    icon: <Zap className="text-[#00DB80]" size={24} />,
    title: "Instant Access",
    desc: "Stream or download instantly with our high-speed global delivery network."
  },
  {
    icon: <ShieldCheck className="text-[#00DB80]" size={24} />,
    title: "Pure Experience",
    desc: "No intrusive pop-ups or hidden fees. Just you and the stories that haunt you."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4">
        {/* Background Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00DB80] opacity-10 blur-[120px] rounded-full"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#00DB80] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
          >
            The Legend of Bhoot.cam
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
          >
            NOT JUST STORIES.<br />
            <span className="text-gray-500 italic">MEMORIES.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Born from a passion for the paranormal, Bhoot.cam has evolved into the world's most 
            advanced platform for high-quality horror audio storytelling.
          </motion.p>
        </div>
      </section>

      {/* --- CONTENT SECTION (Split Layout) --- */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Visual Element */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#00DB80]/20 rounded-[2rem] blur-2xl group-hover:bg-[#00DB80]/30 transition-all duration-500"></div>
            <div className="relative aspect-video md:aspect-square bg-[#111] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
              <img 
                src="https://bhoot.cam/thumbs/bhoot.png" 
                alt="Bhoot Experience" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                We believe that horror is a craft. It’s not about jump scares; it’s about the 
                atmosphere, the voice, and the silence in between. We provide a sanctuary for 
                listeners who seek the thrill of the unknown.
              </p>
            </div>

            <div className="grid gap-6">
              {features.map((item, i) => (
                <motion.div 
                  whileHover={{ x: 10 }}
                  key={i} 
                  className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00DB80]/20 transition-all"
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS / FOOTER CTA --- */}
      <section className="py-20 text-center container mx-auto px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <Heart className="mx-auto text-red-500 animate-pulse" size={32} />
          <h3 className="text-2xl font-bold">Supported by Millions</h3>
          <p className="text-gray-400 text-sm">
            What started as a small archive has grown into a community of over 50,000 monthly active listeners. 
            Every story we host is a tribute to the art of the audio experience.
          </p>
          <div className="pt-6">
            <button className="px-8 py-3 bg-[#00DB80] text-black font-black rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-transform">
              Explore Our Library
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}