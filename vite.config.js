import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    hmr: process.env.NODE_ENV !== 'production', 
  },
  define: {
    'process.env.MODE': JSON.stringify(process.env.MODE || 'development'),
  },
})



