"use client";

import React, { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useAuth } from '@/context/AuthProvider';
import { Heart, Loader2 } from 'lucide-react';
import EpisodeCard from '@/components/EpisodeCard';
import Link from 'next/link';

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axiosSecure.get(`/users/wishlist/${user.email}`)
        .then(res => {
          setWishlist(res.data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading, axiosSecure]);

  if (authLoading || loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><Loader2 className="animate-spin text-[#00DB80]" size={40} /></div>;

  if (!user) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center p-4">
        <Heart size={64} className="text-[#00DB80] mb-4 opacity-50"/>
        <h1 className="text-2xl font-black text-white mb-2">Login Required</h1>
        <p className="text-gray-400 mb-6">Please sign in to view your saved episodes.</p>
        <Link href="/login" className="px-6 py-3 bg-[#00DB80] text-black font-bold rounded-xl uppercase tracking-widest">Login Now</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] py-12 px-4">
        <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <Heart size={28} className="text-[#00DB80] fill-current" />
                <h1 className="text-3xl font-black text-white tracking-tight">My Wishlist</h1>
                <span className="bg-[#111] border border-white/10 text-gray-400 px-3 py-1 rounded-full text-xs font-bold">{wishlist.length}</span>
            </div>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map(ep => <EpisodeCard key={ep._id} data={ep} />)}
                </div>
            ) : (
                <div className="text-center py-20 bg-[#111] rounded-3xl border border-white/5">
                    <Heart size={48} className="mx-auto text-gray-700 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">Save episodes you want to listen to later.</p>
                    <Link href="/" className="text-[#00DB80] font-bold hover:underline">Explore Episodes</Link>
                </div>
            )}
        </div>
    </div>
  );
}