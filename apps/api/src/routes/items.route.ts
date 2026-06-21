import { Elysia } from 'elysia'

const router = new Elysia({ prefix: '/inventory' })
	.get('/list', 'list inventory items')
	.get('/item/:id', 'get inventory item by id')
	.post('/add', 'add inventory item')
	.put('/update', 'update inventory item')
	.delete('/delete/:id', 'delete inventory item')

export default router
