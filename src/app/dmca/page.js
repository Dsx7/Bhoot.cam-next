"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Mail, FileText, Scale } from 'lucide-react';

export default function DMCAPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex p-3 rounded-2xl bg-red-500/10 text-red-500 mb-4">
            <ShieldAlert size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">DMCA <span className="text-gray-500">Policy</span></h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase font-bold">Digital Millennium Copyright Act Compliance</p>
        </div>

        {/* Content Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-8 text-gray-300 leading-relaxed"
        >
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale size={20} className="text-[#00DB80]" /> 1. Introduction
            </h2>
            <p>
              Bhoot.cam respects the intellectual property rights of others. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to claims of copyright infringement that are reported to our designated agent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText size={20} className="text-[#00DB80]" /> 2. Infringement Notification
            </h2>
            <p>To file a notice of infringement, you must provide a written communication that includes:</p>
            <ul className="list-disc ml-6 space-y-2 text-sm">
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Identification of the material that is claimed to be infringing (URL of the episode).</li>
              <li>Your contact information (Email, Address, Phone).</li>
              <li>A statement of "good faith belief" that the use is not authorized.</li>
              <li>A physical or electronic signature of the copyright owner.</li>
            </ul>
          </section>

          <section className="p-6 bg-white/5 rounded-2xl border border-white/5">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Mail size={18} className="text-[#00DB80]" /> Contact for Notices
            </h3>
            <p className="text-sm">Please send all DMCA notices to our legal department:</p>
            <p className="text-[#00DB80] font-mono mt-2 select-all">info@bhoot.cam</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}