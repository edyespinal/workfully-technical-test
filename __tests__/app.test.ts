import supertest from 'supertest'
import app from '../src/app'

const request = supertest(app)

describe('Test app.ts', () => {
  test('GET /', async () => {
    const response = await request.get('/')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Hi Workfully!' })
  })
})
