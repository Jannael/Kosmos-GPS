import { eq, and, like, isNull, isNotNull, sql } from 'drizzle-orm'
import db from '../../data/db'
import { usersTable } from '../../data/schema'

export default {
	listItems: async ({
		limit,
		offset,
		search,
		account,
		enable,
	}: {
		limit?: number
		offset?: number
		search?: string
		account: string
		enable?: boolean
	}) => {
		const conditions = [eq(usersTable.account, account), isNull(usersTable.deletedAt)]

		if (search !== undefined) {
			conditions.push(like(usersTable.name, `%${search}%`))
		}

		if (enable !== undefined) {
			conditions.push(eq(usersTable.enable, enable))
		}

		return db
			.select()
			.from(usersTable)
			.where(and(...conditions))
			.limit(limit ?? 10)
			.offset(offset ?? 0)
	},

	listDeletedItems: async ({ limit, offset, search, account }: { limit?: number; offset?: number; search?: string; account: string }) => {
		const conditions = [eq(usersTable.account, account), isNotNull(usersTable.deletedAt)]

		if (search !== undefined) {
			conditions.push(like(usersTable.name, `%${search}%`))
		}

		return db
			.select()
			.from(usersTable)
			.where(and(...conditions))
			.limit(limit ?? 10)
			.offset(offset ?? 0)
	},

	getItem: async ({ id, account }: { id: string; account: string }) => {
		return db
			.select()
			.from(usersTable)
			.where(and(eq(usersTable.id, id), eq(usersTable.account, account)))
			.get()
	},

	createItem: async ({ name, account }: { name: string; account: string }) => {
		return db.insert(usersTable).values({ id: crypto.randomUUID(), name, enable: true, account }).returning().get()
	},

	updateItem: async ({ id, name, enable, account }: { id: string; name?: string; enable?: boolean; account: string }) => {
		const updates: Record<string, unknown> = {}
		if (name !== undefined) updates.name = name
		if (enable !== undefined) updates.enable = enable

		if (Object.keys(updates).length === 0) return

		return db
			.update(usersTable)
			.set(updates)
			.where(and(eq(usersTable.id, id), eq(usersTable.account, account)))
			.returning()
			.get()
	},

	deleteItem: async ({ id, account }: { id: string; account: string }) => {
		return db
			.update(usersTable)
			.set({ deletedAt: sql`(datetime('now'))` })
			.where(and(eq(usersTable.id, id), eq(usersTable.account, account)))
			.returning()
			.get()
	},
}
