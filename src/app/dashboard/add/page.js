"use client";

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import useAxiosSecure from '@/hooks/useAxiosSecure'; // Secure hook for updates
import useAxiosPublic from '@/hooks/useAxiosPublic'; // Public hook for fetching existing data
import { Plus, Trash2, Save, Link as LinkIcon, Edit, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Wrapper to handle SearchParams safely in Next.js
export default function AddEpisodePage() {
  return (
    <Suspense fallback={<div className="text-center p-10 text-[#00DB80]">Loading Editor...</div>}>
        <EpisodeForm />
    </Suspense>
  );
}

function EpisodeForm() {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  
  // 1. Get ID from URL (e.g., /dashboard/add?id=65a1b2...)
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditMode = !!id; // True if ID exists

  const [loadingData, setLoadingData] = useState(false);

  const { register, control, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm({
    defaultValues: { downloadLinks: [{ url: '', quality: 'Medium', format: 'MP3' }] }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "downloadLinks" });

  // 2. FETCH DATA IF EDITING
  useEffect(() => {
    if (isEditMode) {
      setLoadingData(true);
      // Ensure your backend has this route: app.get('/episodes/id/:id')
      axiosPublic.get(`/episodes/id/${id}`)
        .then(res => {
          const data = res.data;
          // Format date for input field (YYYY-MM-DD)
          if(data.episodeDate) {
             data.episodeDate = new Date(data.episodeDate).toISOString().split('T')[0];
          }
          // Populate Form
          reset(data);
          setLoadingData(false);
        })
        .catch(err => {
          console.error("Fetch Error:", err);
          Swal.fire({ icon: 'error', title: 'Error', text: 'Could not load episode data', background: '#111', color: '#fff' });
          router.push('/dashboard/manage');
        });
    }
  }, [id, isEditMode, axiosPublic, reset, router]);

  // 3. HANDLE SUBMIT (Create or Update)
  const onSubmit = async (data) => {
    try {
      // Clean empty links
      const cleanLinks = data.downloadLinks.filter(l => l.url && l.url.trim() !== "");
      const payload = { ...data, downloadLinks: cleanLinks };

      if (isEditMode) {
         // UPDATE (PUT)
         await axiosSecure.put(`/episodes/${id}`, payload);
         Swal.fire({ icon: 'success', title: 'Updated!', text: 'Episode updated successfully', background: '#111', color: '#fff', confirmButtonColor: '#00DB80' });
      } else {
         // CREATE (POST)
         await axiosSecure.post('/episodes', payload);
         Swal.fire({ icon: 'success', title: 'Published!', text: 'New episode added', background: '#111', color: '#fff', confirmButtonColor: '#00DB80' });
      }
      
      router.push('/dashboard/manage');
    } catch (error) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Failed', 
        text: error.response?.data?.message || error.message, 
        background: '#111', 
        color: '#fff',
        confirmButtonColor: '#d33'
      });
    }
  };

  if (loadingData) return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-[#00DB80]">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="font-bold">Loading Episode Data...</p>
      </div>
  );

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        
        {/* Dynamic Header */}
        <div className={`p-6 ${isEditMode ? 'bg-yellow-500' : 'bg-[#00DB80]'}`}>
          <h2 className="text-xl font-black text-black flex items-center gap-2 uppercase tracking-widest">
            {isEditMode ? <><Edit size={24}/> EDIT EPISODE</> : <><LinkIcon size={24}/> ADD NEW EPISODE</>}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            
            {/* Title & Desc */}
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Episode Title</label>
                    <input {...register("title", { required: true })} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:border-[#00DB80] outline-none transition-colors" placeholder="e.g. The Haunted Bus" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Description</label>
                    <textarea {...register("description")} rows="4" className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:border-[#00DB80] outline-none transition-colors" placeholder="Story details..."></textarea>
                </div>
            </div>

            {/* Grid Fields */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Image URL</label>
                    <input {...register("image")} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:border-[#00DB80] outline-none transition-colors" placeholder="https://..." />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Category</label>
                    <select {...register("category", { required: true })} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:border-[#00DB80] outline-none transition-colors">
                        <option value="Horror">Horror</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Paranormal">Paranormal</option>
                        <option value="Sunday Suspense">Sunday Suspense</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Release Date</label>
                    <input type="date" {...register("episodeDate", { required: true })} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:border-[#00DB80] outline-none transition-colors" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Slug (Auto-generated if empty)</label>
                    <input {...register("slug")} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:border-[#00DB80] outline-none transition-colors" placeholder="custom-url-slug" />
                </div>
            </div>

            {/* Download Links Section */}
            <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-white">Download Links</label>
                    <button type="button" onClick={() => append({ url: '', quality: 'Medium', format: 'MP3' })} className="text-[#00DB80] text-xs font-bold uppercase flex items-center gap-1 hover:text-white transition">
                        <Plus size={16} /> Add Link
                    </button>
                </div>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-3">
                        <input {...register(`downloadLinks.${index}.url`)} placeholder="https://download-link.com" className="flex-1 bg-[#050505] border border-white/10 rounded-lg px-3 text-sm text-white focus:border-[#00DB80] outline-none" />
                        <select {...register(`downloadLinks.${index}.quality`)} className="bg-[#1a1a1a] text-white text-xs border border-white/10 rounded-lg px-2"><option>Low</option><option>Medium</option><option>High</option></select>
                        <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-white"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>

            <button type="submit" disabled={isSubmitting} className={`w-full text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg flex justify-center gap-2 ${isEditMode ? 'bg-yellow-500 hover:bg-yellow-400 shadow-yellow-500/20' : 'bg-[#00DB80] hover:bg-[#00b368] shadow-[#00DB80]/20'}`}>
                {isSubmitting ? 'Processing...' : (isEditMode ? <><Save size={20} /> Update Episode</> : <><Save size={20} /> Publish Episode</>)}
            </button>
        </form>
      </div>
    </div>
  );
}