import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/proxy-api': {
        target: 'https://turism.smartsminds.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy-api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            proxyReq.removeHeader('referer');  // Remove Referer to avoid backend checks
            proxyReq.removeHeader('origin');   // Optional: Remove Origin if backend rejects it
            if (req.headers.cookie) {
              proxyReq.setHeader('Cookie', req.headers.cookie);
            }
          });
        },
      },
    },
  },
})
