import { Hono } from './hono'
import { requestId } from './middleware/request-id'

export const app = new Hono()

app.use('*', requestId({ limitLength: 0 }))
app.get('/', (c) => c.text('ok'))
app.get('/request-id', (c) => c.text(c.get('requestId')))
