import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  
  // 👇 这一行是给 GitHub Pages 用的（我新加的）
  base: '/Web_Front-end_Technology/',

  // 👇 下面全部保留你原来的 ngrok 配置
  server: {
    host: true,
    allowedHosts: ['calzone-barley-undercook.ngrok-free.dev']
  }
})