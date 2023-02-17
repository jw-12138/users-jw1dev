import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser'
    }
  },
  server: {
    port: 9090
  }
})
