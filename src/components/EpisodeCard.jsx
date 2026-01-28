"use client";

import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';

const EpisodeCard = ({ data }) => {
  return (
    <Link href={`/${data.slug}`} className="group w-full block select-none">
      
      {/* 1. IMAGE CONTAINER */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#111] border border-white/5 shadow-sm transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,219,128,0.15)] group-hover:border-[#00DB80]/30">
        
        {/* The Image */}
        <img 
            src={data.image || "https://bhoot.cam/thumbs/bhoot.png"} 
            alt={data.title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Minimal Category Badge (Glass) */}
        <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-md bg-black/30 md border border-white/10 text-[8px] text-white shadow-lg">
                {data.category || 'Audio'}
            </span>
        </div>

        {/* Play Overlay (Fade In) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play fill="currentColor" size={20} className="ml-1 text-[#00DB80]" />
            </div>
        </div>
      </div>

      {/* 2. TEXT CONTENT */}
      <div className="mt-3 px-0.5">
        {/* Title: Full Text, Minimal Size */}
        <h3 className="font-bold text-white text-sm md:text-[15px] leading-snug group-hover:text-[#00DB80] transition-colors duration-300">
            {data.title}
        </h3>
        
        {/* Meta Data */}
        <div className="flex items-center gap-2 mt-1.5 text-xs font-medium text-gray-500">
            <span className="text-gray-400">{new Date(data.episodeDate).toLocaleDateString()}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-gray-600"></span>
            <span className="text-[#00DB80]/80 uppercase tracking-widest text-[9px]">Listen</span>
        </div>
      </div>

    </Link>
  );
};

export default EpisodeCard;