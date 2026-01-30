"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle2, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 relative overflow-hidden">
      
      {/* --- BACKGROUND BLOBS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00DB80] opacity-5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00DB80] opacity-5 blur-[120px] rounded-full"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-4"
          >
            GET IN <span className="text-[#00DB80]">TOUCH</span>
          </motion.h1>
          <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-xs">
            Have a story to share or a technical issue?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- CONTACT INFO CARDS --- */}
          <div className="space-y-4">
            <ContactInfoCard 
                icon={<Mail size={20} />} 
                label="Email Us" 
                value="info@bhoot.cam" 
                href="mailto:info@bhoot.cam"
            />
            <ContactInfoCard 
                icon={<MessageSquare size={20} />} 
                label="Telegram" 
                value="@bhootbdcom" 
                href="https://t.me/bhootbdcom"
            />
            <ContactInfoCard 
                icon={<MapPin size={20} />} 
                label="Location" 
                value="Dhaka, Bangladesh" 
            />
          </div>

          {/* --- MAIN CONTACT FORM (Glassmorphism) --- */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="form"
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Your Name" placeholder="John Doe" type="text" required />
                      <FormInput label="Email Address" placeholder="john@example.com" type="email" required />
                    </div>
                    <FormInput label="Subject" placeholder="Inquiry about..." type="text" required />
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Message</label>
                      <textarea 
                        rows="5"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#00DB80]/50 focus:ring-1 focus:ring-[#00DB80]/50 transition-all placeholder:text-gray-700"
                        placeholder="Write your message here..."
                      ></textarea>
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-[#00DB80] hover:bg-[#00c070] text-black font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>Send Message <Send size={16} /></>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-[#00DB80]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00DB80]">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-400 mb-8">We'll get back to you faster than a ghost in the night.</p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="text-[#00DB80] font-bold uppercase tracking-widest text-xs hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function ContactInfoCard({ icon, label, value, href }) {
  const CardWrapper = href ? 'a' : 'div';
  return (
    <CardWrapper 
      href={href} 
      target={href ? "_blank" : undefined}
      className="block p-6 bg-white/5 border border-white/10 rounded-3xl hover:border-[#00DB80]/30 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-xl text-[#00DB80] group-hover:bg-[#00DB80] group-hover:text-black transition-all">
          {icon}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{label}</p>
          <p className="text-white font-medium">{value}</p>
        </div>
      </div>
    </CardWrapper>
  );
}

function FormInput({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">{label}</label>
      <input 
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#00DB80]/50 focus:ring-1 focus:ring-[#00DB80]/50 transition-all placeholder:text-gray-700"
      />
    </div>
  );
}