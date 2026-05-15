import { Hono } from './hono'
import { requestId } from './middleware/request-id'
import type { RequestIdVariables } from './middleware/request-id/request-id'

export const app = new Hono<{ Variables: RequestIdVariables }>()

app.use('*', requestId())
app.get('/', (c) => c.text(c.get('requestId')))
app.get('/health', (c) => c.text('ok'))
