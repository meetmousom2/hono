import { Hono } from './hono'

describe('Trailing slash fallback', () => {
  it('serves a slashless request with a slashless route', async () => {
    const app = new Hono()
    app.get('/users', (c) => c.text('users'))

    const res = await app.request('/users')

    expect(res.status).toBe(200)
  })

  it('serves a trailing slash request with a slashless route', async () => {
    const app = new Hono()
    app.get('/users', (c) => c.text('users'))

    // Bug: currently returns 404 — the fix we are implementing
    const res = await app.request('/users/')

    expect(res.status).toBe(200)
  })

  it('serves a nested trailing slash request with a slashless route', async () => {
    const app = new Hono()
    app.get('/api/v1/items', (c) => c.json({ items: [] }))

    const res = await app.request('/api/v1/items/')

    expect(res.status).toBe(200)
  })

  it('serves a trailing slash request with a trailing slash route', async () => {
    const app = new Hono()
    app.get('/users/', (c) => c.text('users'))

    const res = await app.request('/users/')

    expect(res.status).toBe(200)
  })
})
