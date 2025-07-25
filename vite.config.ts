import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: "es2018"
  },
  plugins: [
      react(),
      viteSingleFile()
  ],
})
