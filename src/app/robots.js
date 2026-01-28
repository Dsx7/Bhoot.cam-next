export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/profile/', '/wishlist/'], // Block private pages
    },
    sitemap: 'https://bhoot.cam/sitemap.xml',
  }
}