"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Send } from 'lucide-react';



const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-[#00DB80] rounded flex items-center justify-center text-black font-black group-hover:scale-110 transition-transform">
                    B
                </div>
                <span className="text-xl font-black tracking-tighter text-white">
                    BHOOT<span className="text-[#00DB80]">.CAM</span>
                </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Stream the scariest horror stories, true paranormal encounters, and supernatural thrillers. Join the community if you dare.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Discover</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/explore" className="hover:text-[#00DB80] transition-colors">Latest Episodes</Link></li>
              <li><Link href="/explore?category=Bhoot.Com%20all%20Episode%20With%20Rj%20Russell" className="hover:text-[#00DB80] transition-colors">Bhoot.Com all Episode With Rj Russell</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-[#00DB80] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#00DB80] transition-colors">Contact</Link></li>
              <li><Link href="/dmca" className="hover:text-[#00DB80] transition-colors">DMCA Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-[#00DB80] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00DB80] hover:text-black transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://t.me/bhootbdcom" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00DB80] hover:text-black transition-all">
                <Send size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00DB80] hover:text-black transition-all">
                <Youtube size={18} />
              </a>
            </div>
            <a href="mailto:info@bhoot.cam" className="flex items-center gap-2 mt-6 text-sm text-gray-400 hover:text-[#00DB80]">
                <Mail size={16} /> info@bhoot.cam
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Bhoot.com. All rights reserved.
          </p>
          <p className="text-xs text-gray-700 flex items-center gap-1">
             Made with <span className="text-red-900 animate-pulse">❤</span> in Darkness
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;