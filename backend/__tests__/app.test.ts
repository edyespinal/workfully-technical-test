import supertest from 'supertest'
import app from '../src/app'

jest.useFakeTimers()

describe('Test app.ts', () => {
  test('GET /', async () => {
    const response = await supertest(app).get('/')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Hi Workfully!' })
  })
})
