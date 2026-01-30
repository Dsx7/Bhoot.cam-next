"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Send, Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8 mt-20 relative overflow-hidden">
      
      {/* Optional: Very subtle bottom glow for atmosphere */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-[#00DB80] opacity-[0.02] blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-[#00DB80] rounded flex items-center justify-center text-black font-black group-hover:scale-110 transition-transform">
                    B
                </div>
                <span className="text-xl font-black tracking-tighter text-white">
                    BHOOT<span className="text-[#00DB80]">.CAM</span>
                </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Stream the scariest horror stories, true paranormal encounters, and supernatural thrillers. Join the community if you dare.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Discover</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/explore" className="hover:text-[#00DB80] transition-colors flex items-center gap-2">Latest Episodes</Link></li>
              <li>
                <Link href="/explore?category=Bhoot.Com%20all%20Episode%20With%20Rj%20Russell" className="hover:text-[#00DB80] transition-colors block leading-relaxed">
                    RJ Russell Specials <span className="text-[9px] bg-white/10 text-white px-1.5 py-0.5 rounded ml-2">HOT</span>
                </Link>
              </li>
              <li><Link href="/explore?category=Sunday-Suspense" className="hover:text-[#00DB80] transition-colors">Sunday Suspense</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Company</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-[#00DB80] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#00DB80] transition-colors">Contact Support</Link></li>
              <li><Link href="/dmca" className="hover:text-[#00DB80] transition-colors">DMCA Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-[#00DB80] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Connect</h3>
            <div className="flex gap-3">
              <SocialButton icon={<Facebook size={18} />} href="#" />
              <SocialButton icon={<Send size={18} />} href="https://t.me/bhootbdcom" />
              <SocialButton icon={<Youtube size={18} />} href="#" />
            </div>
            <a href="mailto:info@bhoot.cam" className="inline-flex items-center gap-2 mt-8 text-sm text-gray-500 hover:text-[#00DB80] transition-colors border border-white/5 px-4 py-2 rounded-lg bg-white/[0.02]">
                <Mail size={16} /> info@bhoot.cam
            </a>
          </div>

        </div>

        {/* --- BOTTOM BAR (The Pro Touch) --- */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-center md:text-left space-y-2 md:space-y-0">
             <p className="text-xs text-gray-600">
               © {new Date().getFullYear()} Bhoot.com. All rights reserved.
             </p>
             <p className="text-[10px] text-gray-700 md:hidden">
               Made with <span className="text-red-900">❤</span> in Darkness
             </p>
          </div>

          {/* PRODUCT STATUS TAG */}
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-[10px] text-gray-700 uppercase tracking-widest font-bold">
                <span> Made with <span className="text-red-900 animate-pulse">❤</span> in Darkness</span>
             </div>
             
             <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>

             <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-full px-3 py-1.5">
                <span className="text-[10px] text-gray-500 font-mono">v2.1.0</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00DB80] shadow-[0_0_8px_#00DB80] animate-pulse"></span>
                <span className="text-[10px] text-[#00DB80] uppercase tracking-widest font-bold hidden sm:block">Systems Normal</span>
             </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

// Helper Component for cleaner code
function SocialButton({ icon, href }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00DB80] hover:text-black hover:border-[#00DB80] transition-all duration-300"
        >
            {icon}
        </a>
    );
}

export default Footer;