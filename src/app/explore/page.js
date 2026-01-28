"use client";

import React, { useEffect, useState, Suspense } from 'react'; // Added Suspense
import useAxiosPublic from '@/hooks/useAxiosPublic';
import EpisodeCard from '@/components/EpisodeCard';
import { useSearchParams } from 'next/navigation';
import { Loader2, Layers } from 'lucide-react';

// 1. Create a Child Component for the Logic
function ExploreContent() {
  const axiosPublic = useAxiosPublic();
  const searchParams = useSearchParams();
  const category = searchParams.get('category'); 
  
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Reset & Fetch when Category changes
  useEffect(() => {
    setEpisodes([]);
    setPage(1);
    setHasMore(true);
    fetchEpisodes(1);
  }, [category, axiosPublic]);

  const fetchEpisodes = async (pageNum) => {
    const isFirstPage = pageNum === 1;
    if (isFirstPage) setLoading(true);
    
    try {
      let url = `/episodes?page=${pageNum}&limit=12`;
      if (category) url += `&category=${encodeURIComponent(category)}`;

      const res = await axiosPublic.get(url);
      
      const newEpisodes = res.data.episodes || [];
      const totalPages = res.data.totalPages || 1;

      if (isFirstPage) {
        setEpisodes(newEpisodes);
      } else {
        setEpisodes(prev => [...prev, ...newEpisodes]);
      }

      if (pageNum >= totalPages || newEpisodes.length === 0) {
        setHasMore(false);
      }
      
      setPage(pageNum);
    } catch (error) {
      console.error("Failed to load episodes", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    fetchEpisodes(page + 1);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#111] border border-white/10 rounded-xl text-[#00DB80]">
              <Layers size={24} />
          </div>
          <div>
              <h1 className="text-3xl font-black tracking-tight text-white">
                  {category ? `${category}` : 'Explore All'}
              </h1>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                  {category ? 'Filtered Stories' : 'Latest Uploads'}
              </p>
          </div>
      </div>

      {/* Content Grid */}
      {loading ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-[#111] rounded-2xl animate-pulse border border-white/5"></div>
            ))}
         </div>
      ) : episodes.length > 0 ? (
         <>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
             {episodes.map(ep => <EpisodeCard key={ep._id} data={ep} />)}
           </div>

           {hasMore && (
             <div className="flex justify-center">
               <button 
                  onClick={handleLoadMore} 
                  disabled={loadingMore}
                  className="flex items-center gap-2 bg-[#111] border border-white/10 text-white hover:bg-[#00DB80] hover:text-black hover:border-[#00DB80] px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
               >
                  {loadingMore ? (
                      <><Loader2 size={20} className="animate-spin" /> Loading...</>
                  ) : (
                      <>Load More Stories</>
                  )}
               </button>
             </div>
           )}
           
           {!hasMore && episodes.length > 12 && (
               <div className="text-center py-8 text-gray-500 text-xs font-bold uppercase tracking-widest">
                   You have reached the end
               </div>
           )}
         </>
      ) : (
         <div className="text-center py-20 text-gray-500">
             <h2 className="text-xl font-bold">No episodes found.</h2>
         </div>
      )}
    </>
  );
}

// 2. Wrap it in Suspense for the Build to Pass
export default function Explore() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="animate-spin text-[#00DB80]" size={40} />
            </div>
        }>
            <ExploreContent />
        </Suspense>
      </div>
    </div>
  );
}