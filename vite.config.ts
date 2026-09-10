// To be deployed to Vercel, this file is used to configure the Vite build for the TanStack DevTools
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  plugins: [
    // [!] poner plugin de TanStack siempre **antes** que el de React
    tanstackStart(),

    tailwindcss(),
    react(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    cssMinify: 'esbuild',
  },
});


