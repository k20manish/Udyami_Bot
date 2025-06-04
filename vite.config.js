import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  fontFamily: {
    orbitron: ['Orbitron', 'sans-serif'],
    gilda: ['"Gilda Display"', 'serif'],
  },
})
