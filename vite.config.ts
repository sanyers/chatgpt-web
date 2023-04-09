/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    host: true,
    port: 18002,
    proxy: {
      '^/dev': {
        // 局域网测试机地址
        target: 'http://localhost:18001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev/, ''),
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['vue'],
  },
})
