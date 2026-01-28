export default async function sitemap() {
  // 1. Fetch all episodes
  const res = await fetch('https://bhoot-cam-server.vercel.app/episodes?limit=1000');
  const data = await res.json();
  const episodes = data.episodes || [];

  // 2. Map episodes to Sitemap format
  const episodeEntries = episodes.map((ep) => ({
    url: `https://bhoot.cam/${ep.slug}`,
    lastModified: new Date(ep.episodeDate),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Return Static + Dynamic Routes
  return [
    {
      url: 'https://bhoot.cam',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://bhoot.cam/explore',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...episodeEntries,
  ];
}