"use client";
import React, { useEffect, useRef } from 'react';
import { Headset, Users, CloudDownload, Zap } from 'lucide-react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

// --- Animated Counter Sub-Component ---
const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Animates only once when visible
  
  // Extract number from string (e.g., "300+" -> 300)
  const numericValue = parseInt(value.replace(/,/g, ''), 10);
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

// --- Main Stats Section ---
const stats = [
  { id: 1, label: 'Audio Stories', value: '300', suffix: '+', icon: <Headset className="text-[#00DB80]" /> },
  { id: 2, label: 'Happy Listeners', value: '5000', suffix: '+', icon: <Users className="text-[#00DB80]" /> },
  { id: 3, label: 'Daily Downloads', value: '2000', suffix: '+', icon: <CloudDownload className="text-[#00DB80]" /> },
  { id: 4, label: 'Streaming Speed', value: '99', suffix: '.9%', icon: <Zap className="text-[#00DB80]" /> },
];

export default function StatsSection() {
  return (
    <section className="py-16 border-y border-white/5 bg-[#080808]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-2 group"
            >
              <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#00DB80]/50 group-hover:bg-[#00DB80]/5 transition-all duration-500 mb-2">
                {stat.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}