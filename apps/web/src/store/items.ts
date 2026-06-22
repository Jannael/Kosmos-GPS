import { create } from 'zustand'

export type Item = {
	id: string
	name: string
	account: string
	count: number
	deletedAt: string | null
}

type ItemsStore = {
	items: Item[]
	setItems: (items: Item[]) => void
}

export const useItemsStore = create<ItemsStore>((set) => ({
	items: [],
	setItems: (items) => set({ items }),
}))
