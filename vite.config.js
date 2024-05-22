import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: '0.0.0.0',
  },
  plugins: [
    vue(),
    svgLoader(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        "name": "Find Zima",
        "short_name": "Zima",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#0d0d0d",
        "theme_color": "#0d0d0d",
        "icons": [
          {
            "src": "/zima-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/zima-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    }),
  ],
  css: {
    postcss: './postcss.config.cjs', // 指定 PostCSS 配置文件
  },
  test: {
    // 启用类似 jest 的全局测试 API
    globals: true,
    // 使用 happy-dom 模拟 DOM
    // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
    environment: 'happy-dom'
  }
})
