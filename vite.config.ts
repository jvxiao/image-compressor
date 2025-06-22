import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';
// https://vite.dev/config/
export default defineConfig({
  // base: '/image-compression/',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './public/index.html'),
        'image-compression': resolve(__dirname, 'compression.html'),
      }
    }
  }
})
