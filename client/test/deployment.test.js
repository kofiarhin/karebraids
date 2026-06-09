import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

describe('Vercel deployment routing', () => {
  it('proxies same-origin API calls to the local Express server during Vite development', async () => {
    const { default: viteConfig } = await import('../vite.config.js')

    expect(viteConfig.server.proxy['/api']).toEqual({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  })

  it('builds the client from the repository root and routes API requests before SPA fallback', () => {
    const configPath = path.join(repoRoot, 'vercel.json')
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

    expect(config).toEqual(expect.objectContaining({
      framework: 'vite',
      installCommand: 'npm ci && npm ci --prefix client',
      buildCommand: 'npm run build --prefix client',
      outputDirectory: 'client/dist',
      rewrites: [
        { source: '/api', destination: '/api/index' },
        { source: '/api/:path*', destination: '/api/index' },
        { source: '/(.*)', destination: '/index.html' },
      ],
    }))
  })

  it('uses one root deployment config instead of a conflicting client-only config', () => {
    expect(fs.existsSync(path.join(repoRoot, 'client/vercel.json'))).toBe(false)
    expect(fs.existsSync(path.join(repoRoot, 'api/index.js'))).toBe(true)
  })
})
