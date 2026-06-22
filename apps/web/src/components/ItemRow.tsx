import { useState } from 'react'
import { useItemsStore, type Item } from '@/store/items'

export function ItemRow({ item }: { item: Item }) {
	const [editing, setEditing] = useState(false)
	const [editName, setEditName] = useState(item.name)
	const updateItemName = useItemsStore((s) => s.updateItemName)
	const updateCount = useItemsStore((s) => s.updateCount)
	const deleteItem = useItemsStore((s) => s.deleteItem)

	const handleIncrement = () => {
		updateCount(item.id, item.count + 1)
	}

	const handleDecrement = () => {
		if (item.count <= 0) return
		updateCount(item.id, item.count - 1)
	}

	const handleSaveName = async () => {
		if (!editName.trim()) return
		await updateItemName(item.id, editName.trim())
		setEditing(false)
	}

	return (
		<tr className="border-b border-gray-50 last:border-0">
			<td className="px-6 py-4">
				{editing ? (
					<div className="flex items-center gap-2">
						<input
							type="text"
							value={editName}
							onChange={(e) => setEditName(e.target.value)}
							className="w-40 rounded border border-gray-300 px-2 py-1 text-sm outline-none focus:border-[var(--color-primary)]"
							autoFocus
						/>
						<button type="button" onClick={handleSaveName} className="cursor-pointer text-sm font-medium text-green-600 hover:text-green-700">
							Save
						</button>
						<button type="button" onClick={() => setEditing(false)} className="cursor-pointer text-sm text-gray-400 hover:text-gray-600">
							Cancel
						</button>
					</div>
				) : (
					<span className="font-medium text-gray-900">{item.name}</span>
				)}
			</td>
			<td className="px-6 py-4">
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={handleDecrement}
						disabled={item.count <= 0}
						className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
					>
						<svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
						</svg>
					</button>
					<span className="min-w-[2ch] text-center text-gray-900 tabular-nums">{item.count}</span>
					<button
						type="button"
						onClick={handleIncrement}
						className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100"
					>
						<svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
						</svg>
					</button>
				</div>
			</td>
			<td className="px-6 py-4">
				<div className="flex items-center gap-1">
					<button
						type="button"
						onClick={() => {
							setEditName(item.name)
							setEditing(true)
						}}
						className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
					>
						<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
					</button>
					<button
						type="button"
						onClick={async () => {
							if (confirm('Delete this item?')) {
								await deleteItem(item.id)
							}
						}}
						className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500"
					>
						<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				</div>
			</td>
		</tr>
	)
}
