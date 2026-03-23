// plugins/my-mock.js
import { readdirSync, statSync } from 'fs'
import { console } from 'inspector'
import { join, resolve } from 'path'
// import chalk from 'chalk' // 如果没有安装 chalk，可以直接删掉这行和相关颜色代码
// import dayjs from 'dayjs' // 如果没有安装 dayjs，可以用 new Date().toLocaleTimeString()

/**
 * 简易版 Vite Mock 插件 (JS 版)
 * @param {Object} options 
 * @param {string} options.mockPath - mock 文件目录，默认 'mock'
 * @param {string} options.prefix - 全局前缀，默认 ''
 * @param {boolean} options.logger - 是否打印日志
 */
export function createMyMock(options = {}) {
  const { mockPath = 'mock', prefix = '/api', logger = true } = options
  let mocks = []

  // 工具：简单的路径参数匹配 (支持 :id)
  const matchUrl = (reqUrl, mockUrl) => {
    const reqParts = reqUrl.split('/').filter(Boolean)
    const mockParts = mockUrl.split('/').filter(Boolean)

    if (reqParts.length !== mockParts.length) return null

    const params = {}
    for (let i = 0; i < mockParts.length; i++) {
      if (mockParts[i].startsWith(':')) {
        const key = mockParts[i].slice(1)
        params[key] = reqParts[i]
      } else if (mockParts[i] !== reqParts[i]) {
        return null
      }
    }
    return params
  }

  return {
    name: 'my-vite-plugin-mock-js',
    
    // 在服务器启动时加载规则
    async configureServer(server) {
        // console.log('server',server)    
      const root = server.config.root
      const fullMockPath = resolve(root, mockPath)
      
      // 1. 动态加载所有 .js 文件
      mocks = [] // 重置
      try {
        const files = readdirSync(fullMockPath).filter(f => f.endsWith('.js'))
        
        for (const file of files) {
          const filePath = `/${mockPath}/${file}` // Vite 内部路径
          console.info(filePath)
          try {
            // 使用 SSR 加载器加载 JS 文件 (支持热更新逻辑的基础)
            const module = await server.ssrLoadModule(filePath)
            const data = module.default || module.mocks
            
            if (Array.isArray(data)) {
              mocks.push(...data)
              if (logger) 
                console.log(`[MyMock] Loaded: ${file}`)
            } else {
              if (logger) 
                console.warn(`[MyMock] Skip ${file}: No default export array`)
            }
          } catch (err) {
            console.error(`[MyMock] Error loading ${file}:`, err.message)
          }
        }
      } catch (e) {
        console.warn(`[MyMock] Directory "${mockPath}" not found or empty.`)
      }
    
      console.dir(mocks.length)

      // 2. 注册中间件拦截请求
      server.middlewares.use(async (req, res, next) => {
        // 忽略非前缀请求
        if (!req.url || !req.url.startsWith(prefix)) {
            console.info(req.url)
          return next()
        }

        const reqMethod = (req.method || 'GET').toLowerCase()
        // 去除查询参数获取纯路径 (e.g., /api/user?id=1 -> /api/user)
        const reqPath = req.url.split('?')[0] 
        
        let matched = false

        for (const mock of mocks) {
          // 匹配方法
          if (mock.method.toLowerCase() !== reqMethod) continue

          // 匹配路径
          const params = matchUrl(reqPath, mock.url)
          
          if (params !== null) {
            matched = true
            
            // 准备响应数据上下文
            const query = req.query || {}
            // 注意：body 需要 body-parser 中间件支持，见 vite.config.js 配置
            const body = req.body || {} 

            if (logger) {
              const time = new Date().toLocaleTimeString()
            //   console.log(
            //     `[${time}] ${chalk.blue(mock.method.toUpperCase())} ${chalk.green(mock.url)} -> ${chalk.yellow('200 OK')}`
            //   )
            }

            // 模拟延迟
            const delay = mock.timeout || 0
            if (delay > 0) {
              await new Promise(r => setTimeout(r, delay))
            }

            // 执行响应逻辑
            let responseData
            try {
              if (typeof mock.response === 'function') {
                responseData = await mock.response({ query, body, params })
              } else {
                responseData = mock.response
              }
            } catch (e) {
              responseData = { code: 500, msg: 'Mock Function Error', error: e.message }
            }

            // 发送响应
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.end(JSON.stringify(responseData))
            
            return // 结束处理
          }
        }

        // 未匹配到，交给下一个中间件 (Vite 静态文件或 Proxy)
        next()
      })
    }
  }
}