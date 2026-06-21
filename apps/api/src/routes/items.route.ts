import { Elysia, t } from 'elysia'

const router = new Elysia({ prefix: '/inventory' })
	.get('/list', ({ query }) => query, {
		query: t.Object({
			limit: t.Optional(t.Number()),
			offset: t.Optional(t.Number()),
			search: t.Optional(t.String()),
		}),
	})
	.get('/item/:id', ({ params }) => ({ params }), {
		params: t.Object({
			id: t.String(),
		}),
	})
	.post('/add', ({ body }) => body, {
		body: t.Object({
			name: t.String(),
		}),
	})
	.put('/update', ({ body }) => body, {
		body: t.Object({
			id: t.String(),
			name: t.Optional(t.String()),
			enable: t.Optional(t.Boolean()),
		}),
	})
	.delete('/delete/:id', ({ params }) => ({ params }), {
		params: t.Object({
			id: t.String(),
		}),
	})

export default router
