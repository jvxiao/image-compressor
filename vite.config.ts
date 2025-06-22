import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve, dirname} from 'path';
import { fileURLToPath } from 'node:url'
// https://vite.dev/config/
const __dirname = dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  // base: '/image-compression/',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'),
        'image-compression/': resolve(__dirname, './image-compression/index.html'),
      }
    }
  }
})
