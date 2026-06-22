import { useEffect } from 'react'
import { useSession } from '@/lib/auth-client'
import { UserDropdown } from '@/components/UserDropdown'
import { SearchBar } from '@/components/SearchBar'
import { AddItemForm } from '@/components/AddItemForm'
import { ItemRow } from '@/components/ItemRow'
import { useItemsStore } from '@/store/items'

export function DashboardContent() {
	const { data: session, isPending } = useSession()
	const { items, loading, hasMore, fetchItems } = useItemsStore()

	useEffect(() => {
		fetchItems()
	}, [fetchItems])

	if (isPending) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[var(--color-primary)]" />
			</div>
		)
	}

	if (!session) {
		return (
			<div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
				<p className="text-gray-600">You need to sign in to view this page.</p>
				<a
					href="/"
					className="rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary)]/90"
				>
					Go to Sign In
				</a>
			</div>
		)
	}

	return (
		<div className="mx-auto max-w-4xl px-4 py-10">
			<div className="mb-8 flex items-center justify-between">
				<h1 className="text-2xl font-bold text-gray-900">Inventario</h1>
				<UserDropdown />
			</div>

			<div className="mb-6 flex items-center gap-3">
				<div className="flex-1">
					<SearchBar />
				</div>
				<AddItemForm />
			</div>

			<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
				{loading ? (
					<div className="flex items-center justify-center py-20">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[var(--color-primary)]" />
					</div>
				) : items.length === 0 ? (
					<div className="py-20 text-center text-sm text-gray-400">No hay items</div>
				) : (
					<table className="w-full text-left text-sm">
						<thead>
							<tr className="border-b border-gray-100 text-xs font-semibold tracking-wider text-gray-400 uppercase">
								<th className="px-6 py-4">Nombre</th>
								<th className="px-6 py-4">Cantidad</th>
								<th className="px-6 py-4">Acciones</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item) => (
								<ItemRow key={item.id} item={item} />
							))}
						</tbody>
					</table>
				)}
				{hasMore && !loading && items.length > 0 && (
					<div className="flex justify-center border-t border-gray-100 px-6 py-4">
						<button
							type="button"
							onClick={() => fetchItems(false)}
							className="cursor-pointer rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
						>
							Cargar más
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
