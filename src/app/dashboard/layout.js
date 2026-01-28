"use client";
import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ListVideo, PlusCircle, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const { user, logOut } = useAuth();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="flex min-h-screen bg-[#050505] pt-16"> {/* pt-16 to clear Navbar */}
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 bg-[#0a0a0a] hidden md:flex flex-col p-6 fixed h-full">
        <div className="mb-8">
            <h2 className="font-black text-2xl text-white tracking-tighter">
                ADMIN <span className="text-[#00DB80]">PANEL</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">Welcome, {user?.displayName?.split(' ')[0]}</p>
        </div>

        <nav className="space-y-2 flex-1">
          <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/dashboard') ? 'bg-[#00DB80] text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <LayoutDashboard size={18} /> Overview
          </Link>
          <Link href="/dashboard/add" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/dashboard/add') ? 'bg-[#00DB80] text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <PlusCircle size={18} /> Add Episode
          </Link>
          <Link href="/dashboard/manage" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/dashboard/manage') ? 'bg-[#00DB80] text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <ListVideo size={18} /> Manage All
          </Link>
        </nav>

        <button onClick={logOut} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-500/10 transition-all mt-auto">
            <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}