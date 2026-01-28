"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { LogOut, User, Mail, ShieldCheck, LayoutDashboard } from 'lucide-react';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function Profile() {
  const { user, logOut, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  const handleLogout = () => {
    Swal.fire({
        title: 'Logout?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', background: '#111', color: '#fff'
    }).then((res) => { 
        if(res.isConfirmed) logOut().then(() => router.push('/')); 
    });
  };

  if (loading || !user) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#00DB80] border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-[#050505] pt-20 px-4">
      <div className="max-w-xl mx-auto bg-[#111] border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00DB80] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

        <div className="relative z-10">
            <img src={user.photoURL} alt="Profile" className="w-32 h-32 rounded-full border-4 border-[#00DB80]/20 mx-auto mb-6 shadow-2xl" />
            <h1 className="text-3xl font-black text-white mb-2">{user.displayName}</h1>
            <p className="text-gray-500 text-sm mb-8">{user.email}</p>

            {/* --- ADMIN BUTTON SECTION --- */}
            {user.role === 'admin' && (
                <div className="mb-8 p-1 rounded-2xl bg-gradient-to-r from-[#00DB80] to-green-600">
                    <Link href="/dashboard" className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#050505] text-white font-black uppercase tracking-widest hover:bg-[#0a0a0a] transition-all group">
                        <LayoutDashboard size={20} className="text-[#00DB80] group-hover:scale-110 transition-transform" /> 
                        Access Admin Panel
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-[#050505] rounded-xl border border-white/5 text-left">
                    <p className="text-xs text-gray-500 font-bold uppercase">Role</p>
                    <p className={`font-bold ${user.role === 'admin' ? 'text-[#00DB80]' : 'text-white'}`}>
                        {user.role === 'admin' ? 'Administrator' : 'User'}
                    </p>
                </div>
                <div className="p-4 bg-[#050505] rounded-xl border border-white/5 text-left">
                    <p className="text-xs text-gray-500 font-bold uppercase">Status</p>
                    <p className="text-white font-bold">Active</p>
                </div>
            </div>

            <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all">
                <LogOut size={18} /> Logout
            </button>
        </div>
      </div>
    </div>
  );
}