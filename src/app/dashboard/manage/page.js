"use client";

import React, { useEffect, useState } from 'react';
import useAxiosPublic from '@/hooks/useAxiosPublic'; // Public read is fine
import useAxiosSecure from '@/hooks/useAxiosSecure'; // Secure delete is mandatory
import Link from 'next/link';
import { Edit, Trash2, Search, Eye, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ManageEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = () => {
    // Reading episodes can be public (Admin needs to see same list as users anyway)
    axiosPublic.get('/episodes?limit=1000') 
      .then(res => {
        const data = res.data.episodes || res.data || [];
        setEpisodes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Episode?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      background: '#111',
      color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {
         try {
             // SECURE CALL: Delete Episode
             await axiosSecure.delete(`/episodes/${id}`);
             setEpisodes(prev => prev.filter(ep => ep._id !== id));
             Swal.fire({ title: "Deleted!", icon: "success", background: '#111', color: '#fff', confirmButtonColor: '#00DB80' });
         } catch (error) {
             Swal.fire({ title: "Error!", text: "Could not delete.", icon: "error", background: '#111', color: '#fff' });
         }
      }
    });
  };

  const filteredEpisodes = episodes.filter(ep => 
    (ep.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-black text-white">Manage Episodes</h1>
        <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
            <input 
              type="text" 
              placeholder="Search titles..." 
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-[#00DB80] transition-colors"
            />
        </div>
      </div>

      <div className="overflow-hidden bg-[#111] rounded-2xl border border-white/10 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#1a1a1a] text-gray-400 uppercase text-xs font-bold">
            <tr>
              <th className="p-5">Title</th>
              <th className="p-5 hidden md:table-cell">Category</th>
              <th className="p-5 hidden md:table-cell">Date</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {loading ? (
                <tr><td colSpan="4" className="text-center py-10 text-gray-500">Loading...</td></tr>
            ) : filteredEpisodes.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-10 text-gray-500">No episodes found.</td></tr>
            ) : (
                filteredEpisodes.map((ep) => (
                <tr key={ep._id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-5">
                        <div className="flex items-center gap-3">
                            <img src={ep.image} className="w-10 h-10 rounded-lg object-cover bg-white/10"/>
                            <span className="font-bold text-white group-hover:text-[#00DB80] transition-colors line-clamp-1 max-w-[200px]">{ep.title}</span>
                        </div>
                    </td>
                    <td className="p-5 text-gray-400 hidden md:table-cell">{ep.category}</td>
                    <td className="p-5 text-gray-400 hidden md:table-cell">{new Date(ep.episodeDate).toLocaleDateString()}</td>
                    <td className="p-5 text-right">
                        <div className="flex justify-end gap-2">
                            <Link href={`/${ep.slug}`} target="_blank" className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Eye size={16}/></Link>
                            {/* Assuming you will make an Edit Page later */}
                            <Link href={`/dashboard/add?id=${ep._id}`} className="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg hover:bg-yellow-500 hover:text-white transition-all"><Edit size={16}/></Link>
                            <button onClick={() => handleDelete(ep._id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                        </div>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}