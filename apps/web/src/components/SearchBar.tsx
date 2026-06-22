import { useEffect, useRef } from 'react'
import { useItemsStore } from '@/store/items'

export function SearchBar() {
	const { search, setSearch, fetchItems } = useItemsStore()
	const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

	useEffect(() => {
		clearTimeout(timerRef.current)
		timerRef.current = setTimeout(fetchItems, 300)
		return () => clearTimeout(timerRef.current)
	}, [search, fetchItems])

	return (
		<input
			type="text"
			placeholder="Search"
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
		/>
	)
}
