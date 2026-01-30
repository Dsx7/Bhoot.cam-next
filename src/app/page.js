"use client";

import React, { useEffect, useState } from 'react';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import HeroSlider from '@/components/HeroSlider'; 
import EpisodeCard from '@/components/EpisodeCard';
import CategoryGrid from '@/components/CategoryGrid'; 
import StatsSection from '@/components/StatsSection'; 
import ArtistSection from '@/components/ArtistSection'; 
import { Send, ChevronRight, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const axiosPublic = useAxiosPublic();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get('/episodes')
      .then(res => {
        const data = res.data.episodes || res.data || [];
        setEpisodes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setEpisodes([]);
        setLoading(false);
      });
  }, [axiosPublic]);

  if (loading) {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#00DB80] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="pb-24">
      
      {/* 1. HERO SLIDER (Full Width) */}
      <HeroSlider episodes={episodes} />

      {/* MAIN CONTENT CONTAINER */}
      <div className="container mx-auto px-4 md:px-8 mt-12 md:mt-24 space-y-24">
        
        {/* 2. CATEGORY GRID SECTION (Added) */}
        <CategoryGrid />

        {/* 3. LATEST EPISODES GRID */}
        <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-8 bg-[#00DB80]"></div>
                        <span className="text-[#00DB80] font-bold uppercase tracking-widest text-xs">Fresh Drops</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                        Latest <span className="text-[#00B368] ">Stories.</span>
                    </h2>
                </div>
            </div>

            <div className="mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {(episodes || []).slice(0, 8).map(ep => (
                    <div key={ep._id} className="h-full">
                        <EpisodeCard data={ep} />
                    </div>
                ))}
            </div>
        </section>
		
		<Link href="/explore" className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#00DB80] transition-colors border border-white/5 px-6 py-3 rounded-xl bg-white/5 hover:bg-[#0f0f0f]">
                    View All Episodes <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
				{/* Artist section */}
        <div className="mt-20">
            <ArtistSection />
        </div>



					{/* 4. STATS SECTION (Added) */}
        <div className="mt-20">
            <StatsSection />
        </div>



        {/* 4. TELEGRAM COMMUNITY */}
        <section className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#0f0f0f] border border-white/5 p-8 md:p-20 text-center md:text-left">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00DB80] rounded-full blur-[180px] opacity-10 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                        Join the <span className="text-[#00DB80]">Cult.</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl mb-10 font-medium">
                        Get instant notifications, exclusive uncut episodes, and chat with 25,000+ horror fans on our official Telegram channel.
                    </p>
                    <a href="https://t.me/bhootbdcom" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 font-black text-black bg-[#00DB80] rounded-2xl hover:bg-[#00b368] shadow-xl shadow-[#00DB80]/20 transition-all hover:-translate-y-1 w-full md:w-auto">
                        <Send className="mr-2" size={20} />
                        Join Telegram
                    </a>
                </div>
                {/* Visual Icon */}
                <div className="hidden md:flex w-40 h-40 bg-[#151515] rounded-[2.5rem] items-center justify-center border border-white/10 rotate-6 shadow-2xl">
                    <Send size={64} className="text-[#00DB80]" />
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}