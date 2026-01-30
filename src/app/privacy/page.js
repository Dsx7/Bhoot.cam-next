"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, Database, Cookie } from 'lucide-react';

const privacySections = [
  {
    icon: <Database className="text-[#00DB80]" />,
    title: "Data Collection",
    content: "We collect basic profile information when you register, such as your email and name, to manage your bookmarks and wishlist."
  },
  {
    icon: <Cookie className="text-[#00DB80]" />,
    title: "Cookies",
    content: "We use essential cookies to keep you logged in and remember your audio player preferences."
  },
  {
    icon: <Eye className="text-[#00DB80]" />,
    title: "Data Usage",
    content: "Your data is never sold. We only use it to personalize your horror story experience on Bhoot.cam."
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-[#00DB80] font-bold text-[10px] uppercase tracking-[0.5em]">Trust & Security</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mt-2">PRIVACY <span className="text-gray-500">POLICY</span></h1>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {privacySections.map((sec, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-6 bg-[#111] border border-white/5 rounded-3xl"
            >
              <div className="mb-4">{sec.icon}</div>
              <h3 className="font-bold text-white mb-2">{sec.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{sec.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Content */}
        <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 md:p-12 text-gray-400 text-sm space-y-6">
          <h3 className="text-white font-bold text-lg">Third Party Services</h3>
          <p>
            We use Vercel for hosting and MongoDB for our database. We also use 
            Google Analytics to monitor site traffic. These services may collect 
            data as described in their own respective privacy policies.
          </p>
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center gap-3">
            <Lock size={18} />
            Your connection to Bhoot.cam is encrypted with SSL (Secure Sockets Layer).
          </div>
        </div>

      </div>
    </div>
  );
}