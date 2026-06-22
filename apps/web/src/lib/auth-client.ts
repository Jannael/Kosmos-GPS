import { createAuthClient } from 'better-auth/react'

export const { signIn, signOut, useSession } = createAuthClient({
	baseURL: `${import.meta.env.API_BASE_URL}/auth`,
})
