"use client";
import React from 'react';
import Link from 'next/link';

const SeoTags = ({ title, category }) => {
  if (!title) return null;

  // Generate dynamic tags based on the current episode
  const tags = [
    `${title} Download`,
    `${title} Free Download`,
    `${title} All Mp3 Song Download`,
    `${title} HD Audio Download`,
    `${category} Download`,
    'Bhoot.com all Episode With Rj Russell',
    'Download Rasel Bhoot.com',
    'Bhoot FM Download',
    'Sunday Suspense Download'
  ];

  return (
    <div className="mt-12 p-6 bg-[#111] border border-white/5 rounded-2xl">
      <h3 className="text-[#00DB80] font-bold text-sm uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
        Related Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="text-[11px] text-gray-400 bg-white/5 px-2 py-1 rounded hover:text-white transition-colors cursor-default">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 text-[10px] text-gray-500">
        <span className="text-[#006400] font-bold">Tags:</span> {tags.join(', ')}
      </div>
    </div>
  );
};

export default SeoTags;