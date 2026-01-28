"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import useAxiosSecure from '@/hooks/useAxiosSecure'; // VIP Secure Hook
import useAxiosPublic from '@/hooks/useAxiosPublic'; // Standard Hook
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { Video, Users, Eye, Activity, ArrowRight, Plus } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  
  const [stats, setStats] = useState(null);
  const [recentEpisodes, setRecentEpisodes] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  // 1. Protect Route
  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'admin') {
        router.push('/login');
      } else {
        fetchDashboardData();
      }
    }
  }, [user, loading, router]);

  // 2. Fetch Data
  const fetchDashboardData = async () => {
    try {
      // SECURE CALL: Fetch Stats
      const statsRes = await axiosSecure.get('/admin/stats');
      setStats(statsRes.data);

      // PUBLIC CALL: Fetch Recent Episodes
      const recentRes = await axiosPublic.get('/episodes?limit=5');
      const episodesData = recentRes.data.episodes || recentRes.data || [];
      setRecentEpisodes(Array.isArray(episodesData) ? episodesData : []);
      
      setPageLoading(false);
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
      setPageLoading(false);
    }
  };

  if (loading || pageLoading) {
    return (
        <div className="flex items-center justify-center h-[70vh]">
            <div className="w-10 h-10 border-4 border-[#00DB80] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  if (!stats) return <div className="text-red-500 p-8">Error loading dashboard stats. Ensure your backend is running.</div>;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.displayName}</p>
        </div>
        <Link href="/dashboard/add" className="flex items-center gap-2 bg-[#00DB80] text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#00b368] transition-all shadow-[0_0_20px_rgba(0,219,128,0.3)]">
            <Plus size={18} /> Add New Episode
        </Link>
      </div>

      {/* 1. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Episodes', value: stats.overview.totalEpisodes, icon: <Video size={24}/>, color: 'text-[#00DB80]', bg: 'bg-[#00DB80]/10' },
          { label: 'Total Users', value: stats.overview.totalUsers, icon: <Users size={24}/>, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Total Views', value: stats.overview.totalViews, icon: <Eye size={24}/>, color: 'text-purple-400', bg: 'bg-purple-500/10' }
        ].map((item, i) => (
          <div key={i} className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-xl flex items-center gap-5 hover:border-[#00DB80]/30 transition-colors">
            <div className={`p-4 rounded-xl ${item.bg} ${item.color}`}>{item.icon}</div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{item.label}</p>
              <h3 className="text-3xl font-black text-white mt-1">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. ANALYTICS CHART */}
          <div className="lg:col-span-2 bg-[#111] p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="text-[#00DB80]" size={20} /> Category Performance
            </h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.charts.categoryStats}>
                    <XAxis dataKey="_id" stroke="#555" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis stroke="#555" tickLine={false} axisLine={false} fontSize={12} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                        cursor={{ fill: 'rgba(0, 219, 128, 0.1)' }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {stats.charts.categoryStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00DB80' : '#009e5c'} />
                    ))}
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
            </div>
          </div>

          {/* 3. SYSTEM STATUS */}
          <div className="bg-[#111] p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col justify-center space-y-6">
              <h3 className="text-lg font-bold text-white">System Health</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-gray-400 text-sm">Server Status</span>
                    <span className="text-[#00DB80] font-bold text-sm flex items-center gap-2">● Online</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-gray-400 text-sm">Database</span>
                    <span className="text-[#00DB80] font-bold text-sm">Connected</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-gray-400 text-sm">Admin Access</span>
                    <span className="text-white font-bold text-sm">Granted</span>
                </div>
              </div>
          </div>
      </div>

      {/* 4. RECENT UPLOADS TABLE */}
      <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold text-white">Recent Uploads</h3>
            <Link href="/dashboard/manage" className="text-xs font-bold text-[#00DB80] flex items-center gap-1 hover:underline">
                View All <ArrowRight size={14}/>
            </Link>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-[#151515] text-gray-400 uppercase text-xs font-bold">
                    <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {recentEpisodes.map((ep) => (
                    <tr key={ep._id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                            <img src={ep.image} className="w-8 h-8 rounded object-cover bg-white/10" />
                            <span className="truncate max-w-[200px]">{ep.title}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{ep.category}</td>
                        <td className="px-6 py-4 text-gray-400">{new Date(ep.episodeDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                            <span className="inline-block px-2 py-1 rounded bg-[#00DB80]/10 text-[#00DB80] text-xs font-bold">Published</span>
                        </td>
                    </tr>
                    ))}
                    {recentEpisodes.length === 0 && (
                        <tr><td colSpan="4" className="text-center py-8 text-gray-500">No recent episodes found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
}