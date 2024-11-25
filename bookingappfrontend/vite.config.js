import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api/', // Proxy API requests to the backend server running on localhost:3001
        changeOrigin: true, // Change the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the URL path, removing the '/api' prefix
      },
    },
  },
})
