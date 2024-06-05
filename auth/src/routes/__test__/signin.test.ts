import request from 'supertest'
import { app } from '../../app'

it('failed when email does not exist', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'abc@test.com',
      password: 'password',
    })
    .expect(400)
})

it('failed when incorrect password supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'fsfsfs',
    })
    .expect(400)
})

it('respond with a cookie when pass a vaied credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201)

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201)
  expect(response.get('Set-Cookie')).toBeDefined()
})
