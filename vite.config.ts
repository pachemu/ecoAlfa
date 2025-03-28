import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Не забудьте импортировать path

export default defineConfig({
  plugins: [react()],
  base: '/pachemu.github.io/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})