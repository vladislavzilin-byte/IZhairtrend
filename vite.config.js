import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to GitHub Pages under a repo (e.g. /your-repo/), set BASE in .env:
// VITE_BASE=/your-repo/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
