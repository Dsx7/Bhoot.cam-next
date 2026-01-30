import React from 'react';
import EpisodeClient from './EpisodeClient';
import { notFound } from 'next/navigation'; // 1. Import notFound

// --- SERVER SIDE SEO GENERATION (Unchanged) ---
export async function generateMetadata(props) {
    const params = await props.params;
    const { slug } = params;

    try {
        const res = await fetch(`https://bhoot-cam-next-j99n.vercel.app/episodes/${slug}`, {
            cache: 'no-store'
        });

        if (!res.ok) return { title: 'Episode Not Found | Bhoot.com' };

        const text = await res.text();
        if (!text) return { title: 'Episode Not Found | Bhoot.com' };

        const episode = JSON.parse(text);

        // --- STRATEGY: MIMIC EPISODEBD TITLE STRUCTURE ---
        const seoTitle = `${episode.title} Download - Bhoot.com`;
        const seoDesc = `Download ${episode.title}. File Size: High Quality MP3. Category: ${episode.category}. Listen to Bhoot.com by RJ Russell online.`;

        return {
            title: seoTitle,
            description: seoDesc,
            keywords: [`${episode.title} download`, `download ${episode.title}`, 'rj russell', 'horror story mp3'],
            openGraph: {
                title: seoTitle,
                description: seoDesc,
                type: 'music.song', // More accurate for audio
                images: [{ url: episode.image, width: 1200, height: 630, alt: episode.title }],
            },
        };
    } catch (error) {
        return { title: 'Bhoot.com - Horror Audio Stories' };
    }
}

// --- MAIN PAGE COMPONENT (Updated) ---
export default async function Page(props) {
    const params = await props.params;
    const { slug } = params;

    // 2. Server-Side Check: Does this episode actually exist?
    try {
        const res = await fetch(`https://bhoot-cam-next-j99n.vercel.app/episodes/${slug}`, {
            cache: 'no-store'
        });

        // If the API says 404 or fails, we immediately trigger the Not Found page
        if (!res.ok) {
            notFound(); 
        }

        const text = await res.text();
        // If body is empty, trigger 404
        if (!text) {
            notFound();
        }

        const episode = JSON.parse(text);
        // If JSON parse results in null/undefined, trigger 404
        if (!episode) {
            notFound();
        }

    } catch (error) {
        // If fetch completely fails (API down), trigger 404
        notFound();
    }

    // 3. If we survive the check above, render the Client Component
    return <EpisodeClient />;
}