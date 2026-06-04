import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

describe('Vercel deployment routing', () => {
  it('configures Vercel to serve the React app for deep links', () => {
    const configPath = path.join(repoRoot, 'client/vercel.json')
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

    expect(config).toEqual({
      rewrites: [{ source: '/(.*)', destination: '/' }],
    })
  })
})
