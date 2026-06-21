export default {
	list: async ({ limit, offset, search, account }: { limit?: number; offset?: number; search?: string; account: string }) => {
		return { limit, offset, search, account }
	},

	get: async ({ id, account }: { id: string; account: string }) => {
		return { id, account }
	},

	post: async ({ name, account }: { name: string; account: string }) => {
		return { name, account }
	},

	update: async ({ id, name, account, deletedAt }: { id: string; name?: string; account: string; deletedAt?: string | null }) => {
		return { id, name, account, deletedAt }
	},

	delete: async ({ id, account }: { id: string; account: string }) => {
		return { id, account }
	},
}
