import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // ✅ This makes sure assets load correctly in production
  build: {
    outDir: 'dist', // ✅ Default Vite build output folder
  },
})

