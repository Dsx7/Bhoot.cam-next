"use client";

import React, { useEffect, useState, useRef } from 'react';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useAxiosSecure from '@/hooks/useAxiosSecure'; 
import { useAuth } from '@/context/AuthProvider';
import { useParams } from 'next/navigation';
import { Calendar, Play, Download, Clock, Folder, AlertCircle, Server, Heart, Share2, Facebook, Link as LinkIcon, Check } from 'lucide-react';
import Swal from 'sweetalert2';
import SeoTags from '@/components/SeoTags'; // Ensure you created this file as per previous step

export default function EpisodeClient() {
  const { slug } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [audioSrc, setAudioSrc] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef(null);

  // 1. Fetch Episode Data
  useEffect(() => {
    if(!slug) return;
    setLoading(true);
    axiosPublic.get(`/episodes/${slug}`)
      .then(res => {
        setEpisode(res.data);
        // Auto-select first playable MP3 source
        const firstPlayable = res.data?.downloadLinks?.find(l => l.url.endsWith('.mp3') || l.url.includes('workers.dev'));
        if(firstPlayable) setAudioSrc(firstPlayable.url);
        
        setLoading(false);
        
        // Check if user has saved this episode
        if (user && res.data._id) checkWishlistStatus(res.data._id);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug, axiosPublic, user]);

  // 2. Check Wishlist Status
  const checkWishlistStatus = async (episodeId) => {
    if (!user) return;
    try {
        const res = await axiosSecure.get(`/users/wishlist/${user.email}`);
        const savedList = res.data.map(item => item._id);
        if (savedList.includes(episodeId)) setIsSaved(true);
    } catch (error) { 
        console.error("Wishlist Check Error", error); 
    }
  };

  // 3. Toggle Wishlist
  const handleWishlist = async () => {
    if (!user) return Swal.fire({ icon: 'error', title: 'Login Required', text: 'Please login to save episodes.', background: '#111', color: '#fff' });
    
    // Optimistic Update
    const previousState = isSaved;
    setIsSaved(!isSaved);

    try { 
        await axiosSecure.put('/users/wishlist', { email: user.email, episodeId: episode._id }); 
    } catch (error) { 
        setIsSaved(previousState); // Revert on error
        console.error("Wishlist Failed", error);
    }
  };

  // 4. Utilities
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlay = (url) => {
    setAudioSrc(url);
    if(audioRef.current) { 
        audioRef.current.load(); 
        audioRef.current.play().catch(e => console.log("Auto-play blocked:", e)); 
    }
  };

  const getDomain = (url) => { 
      try { return new URL(url).hostname.replace('www.', ''); } 
      catch (e) { return 'External Source'; } 
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const shareWhatsApp = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;

  // 5. Render Loading
  if (loading) return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#00DB80] border-t-transparent rounded-full animate-spin"></div>
      </div>
  );

  // 6. Render Error
  if (!episode) return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-gray-400">
          <AlertCircle size={48} className="mb-4 text-red-500"/>
          <h1 className="text-xl font-bold">Episode Not Found</h1>
      </div>
  );

  // 7. Render UI
  return (
    <div className="min-h-screen bg-[#050505] text-white py-10 px-4">
      
      {/* JSON-LD Schema for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'PodcastEpisode',
            name: episode.title,
            description: episode.description,
            image: episode.image,
            datePublished: new Date(episode.episodeDate).toISOString(),
            associatedMedia: {
                '@type': 'MediaObject',
                contentUrl: audioSrc,
            },
            partOfSeries: {
                '@type': 'PodcastSeries',
                name: 'Bhoot.com Audio Stories'
            }
            })
        }}
      />
      
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* LEFT: IMAGE */}
            <div className="col-span-1 space-y-6">
                <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative sticky top-24">
                    <img 
                        src={episode.image} 
                        alt={episode.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="col-span-1 md:col-span-2 space-y-8">
                
                {/* Header Info */}
                <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00DB80]/10 text-[#00DB80] text-xs font-bold uppercase tracking-wider mb-4 border border-[#00DB80]/20">
                        <Folder size={12}/> {episode.category}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4 text-gray-100">
                        {episode.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-medium">
                        <span className="flex items-center gap-2"><Calendar size={16}/> {new Date(episode.episodeDate).toLocaleDateString()}</span>
                        <span className="flex items-center gap-2"><Clock size={16}/> Audio Story</span>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center gap-3 py-4 border-y border-white/10">
                    <button 
                        onClick={handleWishlist} 
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${isSaved ? 'bg-[#00DB80] text-black hover:bg-[#00c070]' : 'bg-[#1a1a1a] text-white hover:bg-[#222] border border-white/10'}`}
                    >
                        <Heart size={18} fill={isSaved ? "currentColor" : "none"} className={isSaved ? "text-black" : "text-[#00DB80]"} /> 
                        {isSaved ? "Saved" : "Wishlist"}
                    </button>
                    
                    <button 
                        onClick={handleCopyLink} 
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-gray-300 font-bold text-sm uppercase tracking-wider hover:bg-[#222] hover:text-white transition-all"
                    >
                        {copied ? <Check size={18} className="text-[#00DB80]"/> : <LinkIcon size={18}/>} 
                        {copied ? "Copied" : "Copy Link"}
                    </button>
                    
                    <a href={shareFacebook} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-blue-500 hover:bg-[#222] transition-colors" title="Share on Facebook">
                        <Facebook size={20} fill="currentColor"/>
                    </a>
                    
                    <a href={shareWhatsApp} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-green-500 hover:bg-[#222] transition-colors" title="Share on WhatsApp">
                        <Share2 size={20} />
                    </a>
                </div>
				
				{/* Description */}
                <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
                    <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Story Details</h3>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {episode.description || "No description provided."}
                    </p>
                </div>



                {/* Audio Player */}
                <div className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-lg">
                    <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <Play size={14} className="text-[#00DB80]"/> Now Playing
                    </h3>
                    <audio 
                        ref={audioRef} 
                        controls 
                        className="w-full h-10 accent-[#00DB80]" 
                        src={audioSrc}
                    >
                        Your browser does not support the audio element.
                    </audio>
                </div>

                {/* Download Sources */}
                <div>
                    <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <Server size={14} className="text-[#00DB80]"/> Available Sources
                    </h3>
                    <div className="space-y-3">
                        {episode.downloadLinks?.map((link, index) => (
                            <div key={link._id || index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#111] border border-white/5 p-4 rounded-xl hover:border-[#00DB80]/30 transition-colors group gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-gray-400 font-bold text-[10px] uppercase border border-white/5">
                                        {link.format || "MP3"}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white group-hover:text-[#00DB80] transition-colors">
                                            Server {index + 1}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                            <span className="uppercase font-bold text-gray-400">{link.quality}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                            <span className="text-[#00DB80] truncate max-w-[180px] font-mono opacity-80">
                                                {getDomain(link.url)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 self-end sm:self-auto">
                                    <button 
                                        onClick={() => handlePlay(link.url)} 
                                        className="p-2.5 rounded-lg bg-white/5 hover:bg-[#00DB80] hover:text-black transition-colors text-gray-300"
                                        title="Play"
                                    >
                                        <Play size={18} fill="currentColor" />
                                    </button>
                                    <a 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold uppercase transition-colors hover:text-white text-gray-300"
                                    >
                                        <Download size={16} /> Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                

                {/* SEO Tags (Added at the bottom) */}
                <SeoTags title={episode.title} category={episode.category} />

            </div>
        </div>
      </div>
    </div>
  );
}