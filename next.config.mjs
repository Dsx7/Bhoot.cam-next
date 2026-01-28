/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "bhoot.cam" },
            { protocol: "https", hostname: "ui-avatars.com" },
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "i.ibb.co" },
            { protocol: "https", hostname: "www.transparenttextures.com" },
        ],
    },
};

export default nextConfig;