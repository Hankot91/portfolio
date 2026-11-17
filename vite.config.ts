import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // En local, /api/* no existe (son funciones de Vercel): se pide al sitio publicado.
    proxy: {
      '/api': { target: 'https://portfolio-acvp.vercel.app', changeOrigin: true },
    },
  },
})
