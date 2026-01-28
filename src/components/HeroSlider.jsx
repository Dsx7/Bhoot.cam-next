"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import { Play, Calendar, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider = ({ episodes }) => {
  if (!episodes || episodes.length === 0) return null;
  const slides = episodes.slice(0, 5);

  return (
    <div className="w-full relative group bg-[#050505] overflow-hidden">
      
      <Swiper
        spaceBetween={0}
        effect={'fade'}
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: '.custom-pagination' }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="w-full h-[65vh] md:h-[85vh]" // Balanced height
      >
        {slides.map((ep) => (
          <SwiperSlide key={ep._id}>
            <div className="relative w-full h-full flex items-center">
              
              {/* 1. HIGH QUALITY BACKGROUND (Clean, No Blur) */}
              <div className="absolute inset-0">
                <img 
                    src={ep.image} 
                    alt="bg" 
                    className="w-full h-full object-cover opacity-60 md:opacity-40" 
                />
                {/* Professional Gradients for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/40 to-transparent"></div>
              </div>

              {/* 2. CONTENT CONTAINER */}
              <div className="container mx-auto px-5 relative z-10 h-full flex items-center">
                <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 mt-10 md:mt-0">
                    
                    {/* LEFT: TEXT CONTENT */}
                    <div className="w-full md:w-2/3 max-w-2xl text-center md:text-left space-y-5 md:space-y-8">
                        
                        <div className="space-y-4 animate-in slide-in-from-bottom-5 fade-in duration-700">
                            {/* Modern Pill Badge */}
                            <div className="flex justify-center md:justify-start">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[#00DB80] text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00DB80] animate-pulse"></span> 
                                    New Release
                                </span>
                            </div>

                            {/* Title: Clean & Tight */}
                            <h1 className="text-2xl md:text-4xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                                {ep.title}
                            </h1>

                            {/* Meta Data */}
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs md:text-sm text-gray-300 font-bold">
                                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#00DB80]"/> {new Date(ep.episodeDate).toLocaleDateString()}</span>
                                <span className="hidden md:block w-1 h-1 rounded-full bg-gray-500"></span>
                                <span className=" text-1xl uppercase tracking-widest text-gray-400">{ep.category}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-2">
                            <Link 
                                href={`/${ep.slug}`} 
                                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#00DB80] text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#00b368] hover:scale-105 transition-all shadow-[0_0_25px_rgba(0,219,128,0.3)]"
                            >
                                <Play fill="currentColor" size={16} /> Listen Now
                            </Link>
                            <Link 
                                href={`/${ep.slug}`} 
                                className="hidden md:flex items-center gap-2 text-white font-bold hover:text-[#00DB80] transition-colors px-6"
                            >
                                View Details <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: ARTWORK (Desktop Only - Clean Card) */}
                    <div className="hidden md:block w-1/3 max-w-sm animate-in zoom-in-95 fade-in duration-1000 delay-100">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)]">
                            <img 
                                src={ep.image} 
                                alt={ep.title} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CLEAN PAGINATION */}
      <div className="container mx-auto px-5 relative -mt-8 md:-mt-16 z-20 pb-6 pointer-events-none">
         <div className="custom-pagination flex justify-center md:justify-start gap-2 pointer-events-auto"></div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet { 
            background-color: white; 
            opacity: 0.2; 
            width: 8px; 
            height: 8px; 
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active { 
            background-color: #00DB80; 
            opacity: 1; 
            width: 24px; 
            border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;