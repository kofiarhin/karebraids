const request = require('supertest')

jest.mock('../config/env', () => ({
  getEnv: jest.fn(() => ({ mongodbUri: 'mongodb://example.test/karebraids' })),
}))

jest.mock('../config/db', () => ({
  connectDatabase: jest.fn(),
}))

const { connectDatabase } = require('../config/db')
const handler = require('../../api/index')

describe('Vercel Express entrypoint', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    connectDatabase.mockResolvedValue(undefined)
    handler.resetDatabaseConnectionForTests()
  })

  it('connects to MongoDB and serves the Express health route', async () => {
    const response = await request(handler).get('/api/health')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'welcome to karebraids' })
    expect(connectDatabase).toHaveBeenCalledWith('mongodb://example.test/karebraids')
  })

  it('returns the Express JSON 404 for unknown API routes instead of SPA HTML', async () => {
    const response = await request(handler).get('/api/not-a-route')

    expect(response.status).toBe(404)
    expect(response.type).toMatch(/json/)
    expect(response.body).toEqual({ message: 'Route not found' })
  })

  it('reuses a successful database connection across warm invocations', async () => {
    await request(handler).get('/api/health')
    await request(handler).get('/api/health')

    expect(connectDatabase).toHaveBeenCalledTimes(1)
  })

  it('retries database initialization after a failed invocation', async () => {
    connectDatabase
      .mockRejectedValueOnce(new Error('temporary connection failure'))
      .mockResolvedValueOnce(undefined)

    await expect(handler.ensureDatabaseConnection()).rejects.toThrow('temporary connection failure')
    await expect(handler.ensureDatabaseConnection()).resolves.toBeUndefined()

    expect(connectDatabase).toHaveBeenCalledTimes(2)
  })
})
