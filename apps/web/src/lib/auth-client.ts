import { createAuthClient } from 'better-auth/react'

export const { signIn, signOut, useSession } = createAuthClient({
	baseURL: `${import.meta.env.PUBLIC_API_BASE_URL}/api/auth`,
})
