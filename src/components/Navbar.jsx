"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import { useTheme } from '@/providers/ThemeProvider';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { Menu, X, Sun, Moon, LayoutDashboard, LogOut, User, ChevronDown, ShieldCheck, Heart, LogIn } from 'lucide-react';
import Swal from 'sweetalert2';
import Script from 'next/script'

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null); 
  const pathname = usePathname();

  useEffect(() => { setIsOpen(false); setIsProfileOpen(false); }, [pathname]);

  // Click Outside Listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Swal.fire({ title: 'Logout?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', background: '#111', color: '#fff' }).then((res) => { if(res.isConfirmed) logOut(); });
  };

  const isLinkActive = (path) => pathname === path;

  return (
		
    <header className="sticky top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#00DB80] rounded flex items-center justify-center text-black font-black group-hover:scale-110 transition-transform">B</div>
            <span className="text-xl font-black tracking-tighter text-white">BHOOT<span className="text-[#00DB80]">.CAM</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {['Home', 'Explore', 'About'].map(item => {
            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
            return (
              <Link key={item} href={path} className={`text-xs font-bold uppercase tracking-wider transition-colors ${isLinkActive(path) ? "text-[#00DB80]" : "text-gray-400 hover:text-white"}`}>
                {item}
              </Link>
            )
          })}
          
           {/* WISHLIST ICON (Desktop) */}
           {user && (
            <Link href="/wishlist" className={`text-gray-400 hover:text-[#00DB80] transition-colors ${isLinkActive('/wishlist') ? 'text-[#00DB80]' : ''}`} title="My Wishlist">
                <Heart size={18} fill={isLinkActive('/wishlist') ? "currentColor" : "none"} />
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link href="/dashboard" className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#00DB80] bg-[#00DB80]/10 px-3 py-1.5 rounded-lg border border-[#00DB80]/20 hover:bg-[#00DB80] hover:text-black transition-all">
                <ShieldCheck size={14} /> Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {/* <button onClick={toggleTheme} className="p-2 text-gray-400 hover:text-white transition hidden sm:block">
            {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
          </button>*/}
          {/* Dropdown */}
          {user ? (
            <div className="relative hidden md:block" ref={profileRef}>
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 p-1 pr-3 rounded-full border border-white/10 bg-[#111] hover:border-[#00DB80]/50 transition-all">
                    <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-xs font-bold text-gray-300 max-w-[80px] truncate">{user.displayName?.split(' ')[0]}</span>
                    <ChevronDown size={14} className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                {/* Dropdown */}
                {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-[#111] border border-white/10 rounded-xl shadow-2xl py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                            <p className="text-sm font-bold text-white truncate">{user.displayName}</p>
                            <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                        </div>
                        <div className="p-1">
                            {user.role === 'admin' && (
                                <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-[#00DB80] hover:bg-white/5 rounded-lg transition-colors">
                                    <LayoutDashboard size={16} /> Dashboard
                                </Link>
                            )}
                            <Link href="/wishlist" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors"><Heart size={16} /> Wishlist</Link>
                            <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors"><User size={16} /> Profile</Link>
                            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><LogOut size={16} /> Logout</button>
                        </div>
                    </div>
                )}
            </div>
          ) : (
            <Link href="/login" className="hidden md:inline-flex bg-[#00DB80] text-black px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition hover:scale-105">Login</Link>
          )}
          <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24}/> : <Menu size={24}/>}</button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#111] border-b border-white/10 shadow-2xl p-4 space-y-2">
            
            {/* Admin Link (Only if Logged In & Admin) */}
            {user?.role === 'admin' && (
                <Link href="/dashboard" className="flex items-center gap-2 w-full py-3 px-4 rounded-xl bg-[#00DB80]/10 text-[#00DB80] font-black uppercase tracking-wider border border-[#00DB80]/20">
                    <ShieldCheck size={18} /> Admin Dashboard
                </Link>
            )}

            {/* Standard Links */}
            {['Home', 'Explore', 'About'].map(item => (
                <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="block w-full py-3 px-4 rounded-xl bg-white/5 text-gray-300 font-bold uppercase tracking-wider hover:bg-white/10">
                    {item}
                </Link>
            ))}

            {/* CONDITIONAL RENDER: Logged In vs Logged Out */}
            {user ? (
                <>
                    <Link href="/wishlist" className="block w-full py-3 px-4 rounded-xl bg-white/5 text-gray-300 font-bold uppercase tracking-wider hover:bg-white/10">My Wishlist</Link>
                    <Link href="/profile" className="block w-full py-3 px-4 rounded-xl bg-white/5 text-gray-300 font-bold uppercase tracking-wider hover:bg-white/10">My Profile</Link>
                    <button onClick={handleLogout} className="w-full py-3 px-4 rounded-xl bg-red-500/10 text-red-500 font-bold uppercase tracking-wider text-left flex items-center gap-2">
                        <LogOut size={18}/> Logout
                    </button>
                </>
            ) : (
                <Link href="/login" className="flex items-center gap-2 w-full py-3 px-4 rounded-xl bg-[#00DB80] text-black font-bold uppercase tracking-wider hover:bg-[#00c070]">
                    <LogIn size={18} /> Login
                </Link>
            )}
        </div>
      )}
    </header>
  );
};

export default Navbar;