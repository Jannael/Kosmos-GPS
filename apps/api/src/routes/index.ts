import itemsRouter from '@/routes/items.route'

// i like to export all my routes in a single object, so i can easily import them in my main file and use them with a prefix, and with a tsc path i can import them all with import routes from 'routes'

export default {
	items: itemsRouter,
}
