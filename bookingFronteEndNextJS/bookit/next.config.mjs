/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuration for Django backend images
    images: {
        // Allow images from Django backend
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1', 
                port: '8000',
                pathname: '/media/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/media/**',
            }
        ],
        // Optimize images from Django backend
        unoptimized: false,
    },
    // Experimental features to help with hydration
    experimental: {
        // This helps reduce hydration mismatches
        optimizeCss: true,
    },
};
  
export default nextConfig;