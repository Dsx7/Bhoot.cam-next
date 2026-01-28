/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "bhoot.cam" },
            { protocol: "https", hostname: "img.youtube.com" },
            { protocol: "https", hostname: "i.ytimg.com" },
            { protocol: "https", hostname: "ui-avatars.com" },
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "i.ibb.co" },
            { protocol: "https", hostname: "www.transparenttextures.com" },
            // Added support for Google Auth profile pictures since you have a login system
            { protocol: "https", hostname: "*.googleusercontent.com" },
        ],
    },
};

export default nextConfig;