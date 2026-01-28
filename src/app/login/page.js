"use client";
import React, { useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Chrome } from 'lucide-react';
import useAxiosPublic from '@/hooks/useAxiosPublic'; // Import Axios

export default function Login() {
  const { googleLogin } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic(); // Use the hook
  const router = useRouter();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        
        // 1. Prepare User Info for MongoDB
        const userInfo = {
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
            role: 'user' // Default role, backend should ignore this if user already exists
        };

        // 2. Save User to Backend (Upsert Logic)
        axiosPublic.post('/users', userInfo)
            .then(res => {
                // 3. Show Success
                Swal.fire({ 
                    icon: 'success', 
                    title: `Welcome, ${user.displayName}!`, 
                    timer: 1500, 
                    showConfirmButton: false,
                    background: '#111',
                    color: '#fff',
                    iconColor: '#00DB80'
                });
                router.push('/');
            });
      })
      .catch((err) => {
        Swal.fire({ 
            icon: 'error', 
            title: 'Login Failed', 
            text: err.message,
            background: '#111',
            color: '#fff'
        });
      });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#111] border border-white/10 p-10 rounded-3xl text-center space-y-8 shadow-2xl">
        <div>
            <div className="w-16 h-16 bg-[#00DB80]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00DB80]">
                <Chrome size={32} />
            </div>
            <h1 className="text-2xl font-black text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Sign in to access exclusive content.</p>
        </div>

        <button 
            onClick={handleGoogleLogin} 
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 hover:scale-[1.02] transition-all shadow-lg"
        >
            <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google" 
                className="w-6 h-6" 
            />
            Continue with Google
        </button>
      </div>
    </div>
  );
}