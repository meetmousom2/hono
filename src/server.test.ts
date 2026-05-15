import { describe, expect, it } from 'bun:test'
import { app } from './server'

const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

describe('server request ids', () => {
  it('adds a UUID v4 request id header to responses', async () => {
    const res = await app.request('/')

    expect(res.headers.get('X-Request-Id')).toMatch(uuidV4Pattern)
  })

  it('makes the request id available before route handlers run', async () => {
    const res = await app.request('/')
    const requestId = res.headers.get('X-Request-Id')

    expect(await res.text()).toBe(requestId)
  })

  it('adds request ids across multiple routes', async () => {
    const home = await app.request('/')
    const health = await app.request('/health')

    expect(home.headers.get('X-Request-Id')).toMatch(uuidV4Pattern)
    expect(health.headers.get('X-Request-Id')).toMatch(uuidV4Pattern)
  })
})
