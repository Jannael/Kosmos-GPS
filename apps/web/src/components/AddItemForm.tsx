import { useState } from 'react'
import { useItemsStore } from '@/store/items'

export function AddItemForm() {
	const [open, setOpen] = useState(false)
	const [name, setName] = useState('')
	const [count, setCount] = useState('')
	const addItem = useItemsStore((s) => s.addItem)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!name.trim()) return
		await addItem(name.trim(), count ? Number(count) : undefined)
		setName('')
		setCount('')
		setOpen(false)
	}

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				className="cursor-pointer rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary)]/90"
			>
				Añadir
			</button>

			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
						<div className="mb-5 flex items-center justify-between">
							<h2 className="text-lg font-semibold text-gray-900">Añadir item</h2>
							<button type="button" onClick={() => setOpen(false)} className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600">
								<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Nombre del item"
									className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
									autoFocus
								/>
							</div>
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Cantidad</label>
								<input
									type="number"
									value={count}
									onChange={(e) => setCount(e.target.value)}
									placeholder="0"
									min="0"
									className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
								/>
							</div>
							<div className="flex justify-end gap-3 pt-2">
								<button
									type="button"
									onClick={() => setOpen(false)}
									className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
								>
									Cancelar
								</button>
								<button
									type="submit"
									className="cursor-pointer rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary)]/90"
								>
									Guardar
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
