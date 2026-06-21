export default {
	list: async ({
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
		return { limit, offset, search, account, enable }
	},

	get: async ({ id, account }: { id: string; account: string }) => {
		return { id, account }
	},

	post: async ({ name, account }: { name: string; account: string }) => {
		return { name, account }
	},

	update: async ({ id, name, enable, account }: { id: string; name?: string; enable?: boolean; account: string }) => {
		return { id, name, enable, account }
	},

	delete: async ({ id, account }: { id: string; account: string }) => {
		return { id, account }
	},
}
