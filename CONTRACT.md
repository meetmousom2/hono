# Contract

## Issue: hono-001 — Router returns 404 for paths with trailing slash

## Completion Criteria

- `src/trailing-slash.test.ts` passes all 4 assertions when run with `bun test src/trailing-slash.test.ts`
- When `app.get('/users', handler)` is registered, both `GET /users` (status 200) and `GET /users/` (status 200) must be served by that handler
- When `app.get('/api/v1/items', handler)` is registered, `GET /api/v1/items/` must return 200
- When a route is registered WITH a trailing slash (`app.get('/users/', handler)`), `GET /users/` must still return 200 (no regression)
- The fix must not break any existing tests in `src/router/common.case.test.ts` or `src/hono.test.ts` — run `bun test src/router/common.case.test.ts src/hono.test.ts` to verify
- Do NOT modify `src/trailing-slash.test.ts` — that file is the acceptance harness and must not be altered

## Approach guidance

The trailing slash normalisation should happen in the request dispatch path (most likely `src/hono-base.ts` or a utility in `src/utils/url.ts`). Before matching a request path, strip a trailing `/` so `/users/` is normalised to `/users` before the router lookup.

Alternatively, you may add a `trimTrailingSlash` option to `HonoOptions` that, when true, enables this behaviour. The test does not instantiate Hono with any options, so the normalisation must be on by default (or always-on without an option flag).

## Files in scope

- `src/hono-base.ts`
- `src/utils/url.ts`
- `src/trailing-slash.test.ts`

## Rules

- This file is NEVER modified after creation
- All criteria must pass for the issue to be complete
