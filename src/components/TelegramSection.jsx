"use client";

import React from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TelegramSection() {
  return (
    <section className="mt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#0f0f0f] border border-white/5 p-8 md:p-20 text-center md:text-left"
      >
        {/* Background Glow with subtle breathing animation */}
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-[#00DB80] rounded-full blur-[180px] pointer-events-none"
        ></motion.div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            {/* Title Animation */}
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tighter"
            >
              Join the <span className="text-[#00DB80]">Cult.</span>
            </motion.h2>

            {/* Description Animation */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl mb-10 font-medium"
            >
              Get instant notifications, exclusive uncut episodes, and chat with 25,000+ horror fans on our official Telegram channel.
            </motion.p>

            {/* Button with Hover and Tap effects */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a 
                href="https://t.me/bhootbdcom" 
                target="_blank" 
                rel="noreferrer" 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-8 py-4 font-black text-black bg-[#00DB80] rounded-2xl hover:bg-[#00b368] shadow-xl shadow-[#00DB80]/20 transition-colors w-full md:w-auto"
              >
                <Send className="mr-2" size={20} />
                Join Telegram
              </motion.a>
            </motion.div>
          </div>

          {/* Visual Icon with Floating Animation */}
          <motion.div 
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 6 }}
            animate={{ 
              y: [0, -10, 0],
              rotate: [6, 8, 6]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="hidden md:flex w-40 h-40 bg-[#151515] rounded-[2.5rem] items-center justify-center border border-white/10 shadow-2xl"
          >
            <Send size={64} className="text-[#00DB80]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}