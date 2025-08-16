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
        index: resolve(__dirname, 'index.html'),
        'image-compression': resolve(__dirname, 'image-compression.html'),
        'image-clip': resolve(__dirname, 'image-clip')
      }
    }
  },
  // 显式指定项目根目录（避免路径解析错误）
  root: __dirname,
  // 配置基础路径（如果部署在子目录下）
  base: './'
})
