import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx';
import { resolve } from 'path'
// import { viteMockServe } from 'vite-plugin-mock'
import { vitePluginFakeServer } from 'vite-plugin-fake-server';
import { fileURLToPath, URL } from "node:url"
import { createMyMock } from './plugins/my-mock.js' // 引入我们的 JS 插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig((command,mode ) => {
  console.log('command',command)
  console.log('mode',mode)
  return {
    plugins: [
    vue()
    ,vueJsx(),
    createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[name]',
      }),
    ,createMyMock({
      // 指定 mock 文件存储目录
      // include: resolve(__dirname, 'mock'), 
      include: 'mock',
      // 是否在打包时生成 mock 文件（生产环境通常不需要）
      prodMock: false, 
      // 开启或关闭 mock 服务，默认开启
      enable: true, 
      // 忽略的文件后缀
      ignore: /^\_/, 
      // 本地开发是否打印日志
      logger: true, 
      watchFiles: true,       // 监听 Mock 文件变化
      localEnabled: true, // 开发环境启用
      // localEnabled: command.mode === 'development',  // 开发打包开关
      // prodEnabled: command.command !== 'serve', // 生产打包开关
      injectCode: `
        import { setupServer } from 'mockjs'
      `,
      supportTs: true, // ✅ 如果你用的是 .ts 文件
    }),
  ],
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
    host: true,
    open: true,
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:9528',
      //     rewrite: (p) => p.replace(/^\/api/, '/dev-api'),
      //   },
      // },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
}
})