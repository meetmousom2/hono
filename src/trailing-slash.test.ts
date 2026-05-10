/**
 * Regression test: trailing slash routing (koji/hono-001-trailing-slash)
 *
 * Routes defined without a trailing slash (e.g. /users) must also respond to
 * requests WITH a trailing slash (e.g. /users/).  Currently, /users/ returns
 * 404 which surprises callers whose HTTP clients or reverse proxies append a
 * slash automatically.
 *
 * This test file is the acceptance harness for the fix. All assertions here
 * must pass before the PR is opened.
 */

import { describe, it, expect } from 'vitest'
import { Hono } from '.'

describe('Trailing slash routing', () => {
  it('GET /users should return 200', async () => {
    const app = new Hono()
    app.get('/users', (c) => c.text('ok'))

    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })

  it('GET /users/ (trailing slash) should return 200, not 404', async () => {
    const app = new Hono()
    app.get('/users', (c) => c.text('ok'))

    // This currently returns 404 — the bug we are fixing.
    const res = await app.request('/users/')
    expect(res.status).toBe(200)
  })

  it('GET /api/v1/items/ (nested path + trailing slash) should return 200', async () => {
    const app = new Hono()
    app.get('/api/v1/items', (c) => c.json({ items: [] }))

    const res = await app.request('/api/v1/items/')
    expect(res.status).toBe(200)
  })

  it('route defined WITH trailing slash still matches /users exactly', async () => {
    const app = new Hono()
    app.get('/users/', (c) => c.text('ok'))

    const res = await app.request('/users/')
    expect(res.status).toBe(200)
  })
})
