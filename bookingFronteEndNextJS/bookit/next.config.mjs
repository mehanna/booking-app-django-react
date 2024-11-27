/** @type {import('next').NextConfig} */
const nextConfig = {
    // The `images` property is used to configure the domains from which images can be loaded.
    // Here, the `domains` array includes 'localhost', allowing images to be loaded from the local development server.
    images: {
        domains: ['localhost'],
      },
  };
  
export default nextConfig;