import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx';
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(),vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@src': resolve(__dirname, 'src'),
      '@src/store': resolve(__dirname, 'src/store'),
      '@grui': resolve(__dirname, 'grui'),
      'vue': 'vue/dist/vue.esm.js'
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
          @import "${resolve(__dirname, 'src/styles/variables.less')}"; 
          @import "${resolve(__dirname, 'grui/theme/color.less')}";
          `,
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})