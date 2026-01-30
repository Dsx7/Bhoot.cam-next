"use client";

import React, { useEffect, useState } from 'react';
import { Search, X, Hash, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Mock Data for the Search
const searchItems = [
  { id: 1, title: 'Explore Stories', type: 'Page', href: '/explore' },
  { id: 2, title: 'Bhoot.com', type: 'Category', href: '/explore?category=Bhoot.Com%20all%20Episode%20With%20Rj%20Russell' },
  { id: 3, title: 'Contact Support', type: 'Page', href: '/contact' },
  { id: 4, title: 'Join Telegram', type: 'Social', href: 'https://t.me/bhootbdcom' },
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Handle Ctrl+K to open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter items
  const filteredItems = searchItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Floating Trigger Button (Visible on Mobile/Desktop) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-[#00DB80] text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform md:hidden"
      >
        <Search size={24} />
      </button>

      {/* Helper Text for Desktop (You can place this in Navbar too) */}
      <div className="hidden fixed bottom-8 right-8 z-40 md:flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest pointer-events-none opacity-50">
        Press <span className="bg-white/10 px-2 py-1 rounded text-white">Ctrl K</span> to search
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            ></motion.div>

            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10"
            >
              {/* Search Header */}
              <div className="flex items-center gap-4 p-6 border-b border-white/5">
                <Search className="text-gray-500" size={20} />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search stories, artists, or pages..." 
                  className="flex-grow bg-transparent text-white text-lg outline-none placeholder:text-gray-600"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white px-2 py-1 bg-white/5 rounded-lg text-xs uppercase font-bold">ESC</button>
              </div>

              {/* Results */}
              <div className="p-2 max-h-[60vh] overflow-y-auto">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <Link 
                      key={item.id} 
                      href={item.href} 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl group transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/5 rounded-lg text-[#00DB80] group-hover:bg-[#00DB80] group-hover:text-black transition-colors">
                            <Hash size={16} />
                        </div>
                        <div>
                            <h4 className="text-white font-medium">{item.title}</h4>
                            <p className="text-xs text-gray-500">{item.type}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-600 group-hover:text-white" />
                    </Link>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    No spirits found matching "{query}"
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-3 bg-[#0a0a0a] border-t border-white/5 text-[10px] text-gray-600 flex justify-between px-6">
                <span>Bhoot.cam Search</span>
                <span>{filteredItems.length} results</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}