import supertest from 'supertest'
import app from '../../../src/app'

describe('POST /auth/login', () => {
  beforeEach((): void => {
    jest.setTimeout(60000)
  })

  test('Receive error due to empty body', async () => {
    const response = await supertest(app).post('/api/auth/login')

    expect(response.body).toEqual({
      errors: [
        {
          code: 'BAD_REQUEST',
          message: 'Unable to login',
          reason: 'Missing credentials',
        },
      ],
    })
  })

  test('Receive error due to empty body', async () => {
    const response = await supertest(app).post('/api/auth/login').send({
      email: 'edy@workfully.com',
      password: 'wrongPassword',
    })

    expect(response.body).toEqual({
      errors: [
        {
          code: 'AUTHENTICATION_ERROR',
          message: 'Unable to login',
          reason: 'Invalid credentials',
        },
      ],
    })
  })

  test('Successful login', async () => {
    const response = await supertest(app).post('/api/auth/login').send({
      email: 'edy@workfully.com',
      password: 'passwerd',
    })

    expect(response.body).toHaveProperty('accessToken')
  })
})
