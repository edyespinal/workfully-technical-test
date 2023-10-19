import supertest from 'supertest'
import app from '../../../src/app'

describe('POST /auth/register', () => {
  beforeEach((): void => {
    jest.setTimeout(60000)
  })

  test('Receive error due to empty body', async () => {
    const response = await supertest(app).post('/api/auth/register')

    expect(response.body).toEqual({
      errors: [
        {
          code: 'BAD_REQUEST',
          message: 'Unable to register user',
          reason: 'Missing required fields',
        },
      ],
    })
  })

  test('Receive error due email already in use', async () => {
    const response = await supertest(app).post('/api/auth/register').send({
      username: 'edy',
      email: 'edy@workfully.com',
      password: 'password',
    })

    expect(response.body).toEqual({
      errors: [
        {
          code: 'BAD_REQUEST',
          message: 'Unable to register user',
          reason: 'Email already in use',
        },
      ],
    })
  })
})
