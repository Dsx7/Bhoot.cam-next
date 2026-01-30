"use client";
import React from 'react';
import { Headset, Users, CloudDownload, Zap } from 'lucide-react';

const stats = [
  { id: 1, label: 'Audio Stories', value: '300+', icon: <Headset className="text-[#00DB80]" /> },
  { id: 2, label: 'Happy Listeners', value: '5k+', icon: <Users className="text-[#00DB80]" /> },
  { id: 3, label: 'Daily Downloads', value: '2k+', icon: <CloudDownload className="text-[#00DB80]" /> },
  { id: 4, label: 'Streaming Speed', value: '99.9%', icon: < Zap className="text-[#00DB80]" /> },
];

export default function StatsSection() {
  return (
    <section className="py-16 border-y border-white/5 bg-[#080808]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center space-y-2 group">
              <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#00DB80]/50 transition-all duration-500 mb-2">
                {stat.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white">{stat.value}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}