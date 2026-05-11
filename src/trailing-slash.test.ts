import { Hono } from './hono'

describe('trailing slash routing', () => {
  it('serves path without trailing slash', async () => {
    const app = new Hono()

    app.get('/users', (c) => c.text('users'))

    const res = await app.request('/users')

    expect(res.status).toBe(200)
  })

  it('serves trailing slash request from non-trailing route', async () => {
    const app = new Hono()

    app.get('/users', (c) => c.text('users'))

    const res = await app.request('/users/')

    expect(res.status).toBe(200)
  })

  it('serves nested trailing slash request from non-trailing route', async () => {
    const app = new Hono()

    app.get('/api/v1/items', (c) => c.text('items'))

    const res = await app.request('/api/v1/items/')

    expect(res.status).toBe(200)
  })

  it('serves route registered with trailing slash', async () => {
    const app = new Hono()

    app.get('/users/', (c) => c.text('users'))

    const res = await app.request('/users/')

    expect(res.status).toBe(200)
  })
})
