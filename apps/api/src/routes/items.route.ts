import { Elysia, t } from 'elysia'
import { auth } from '@/auth'

const router = new Elysia({ prefix: '/inventory' })
	.derive(async ({ request, set }) => {
		const session = await auth.api.getSession({
			headers: request.headers,
		})
		if (!session) {
			set.status = 401
			throw new Error('Unauthorized')
		}
		return { user: session.user }
	})
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
