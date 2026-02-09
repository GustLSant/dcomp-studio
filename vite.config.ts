import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import type { VitePWAOptions } from 'vite-plugin-pwa';


const PWA_OBJECT: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.svg', 'robots.txt'],
  manifest: {
    name: 'DcompStudio',
    short_name: 'DStudio',
    description: 'IDE mobile para estudos em python',
    theme_color: '#121212',
    background_color: '#121212',
    display: 'standalone',
    start_url: '/',
    icons: [
      { src: '/pwa_192.png', sizes: '192x192', type: 'image/png' },
      { src: '/pwa_512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  workbox: {
    navigateFallback: '/index.html',
    globIgnores: ['**/pyodide/**'],
    runtimeCaching: [
      {
        urlPattern: /pyodide\/.*$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'pyodide-cache',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 60 * 60 * 24 * 30
          }
        }
      },
      {
        urlPattern: ({ request }) => request.destination === 'document',
        handler: 'NetworkFirst',
      },
      {
        urlPattern: ({ request }) =>
          ['script', 'style', 'image', 'font'].includes(request.destination),
        handler: 'CacheFirst',
      },
    ]
  }
}


export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA(PWA_OBJECT)
  ],
});
