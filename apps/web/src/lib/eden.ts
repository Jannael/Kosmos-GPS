import { treaty } from '@elysia/eden'
import type { App } from 'app'

const client = treaty<App>(import.meta.env.PUBLIC_API_BASE_URL!)

export function getClient() {
	return client
}
