import { expect, test } from 'bun:test'
import { app } from './server'

const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

test('replaces a caller supplied request id with a UUID v4 response header', async () => {
  const response = await app.request('http://localhost/', {
    headers: {
      'X-Request-Id': 'caller-supplied-id',
    },
  })
  const requestId = response.headers.get('X-Request-Id')

  expect(requestId).not.toBe('caller-supplied-id')
  expect(requestId).toMatch(uuidV4Pattern)
})

test('generates a request id when one is missing', async () => {
  const response = await app.request('http://localhost/')
  const requestId = response.headers.get('X-Request-Id')

  expect(requestId).not.toBeNull()
  expect(requestId).toMatch(uuidV4Pattern)
})

test('stores the request id in request context for downstream handlers', async () => {
  const response = await app.request('http://localhost/request-id')
  const requestId = response.headers.get('X-Request-Id')

  expect(await response.text()).toBe(requestId)
})
