import React from 'react';
import EpisodeClient from './EpisodeClient';

// --- SERVER SIDE SEO GENERATION ---
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

export default function Page() {
    return <EpisodeClient / > ;
}