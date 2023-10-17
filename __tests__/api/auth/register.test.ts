import supertest from 'supertest'
import app from '../../../src/app'

const request = supertest(app)

describe('Test auth/register.ts', () => {
  test('POST /api/auth/register', async () => {
    const response = await request.post('/api/auth/register')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'register' })
  })
})
