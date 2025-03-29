import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthClient } from '@dfinity/auth-client'
import { createActor } from 'declarations/backend'
import { canisterId } from 'declarations/backend/index.js'
import { getAvatar } from './utils'

const BackendContext = createContext({})

const network = process.env.DFX_NETWORK
const identityProvider =
	network === 'ic' || network === 'playground'
		? 'https://identity.ic0.app' // Mainnet
		: 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943' // Local

const BackendProvider = ({ children }) => {
	const [authClient, setAuthClient] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState()
	const [principal, setPrincipal] = useState(null)
	const [actor, setActor] = useState(null)
	const [user, setUser] = useState(null)
	const [isAuthenticating, setIsAuthenticating] = useState(false)

	useEffect(() => {
		updateActor()
	}, [])

	useEffect(() => {
		if (!actor) return
		authorizeUser()
	}, [principal, actor])

	const updateActor = async () => {
		const authClient = await AuthClient.create()
		const identity = authClient.getIdentity()

		const actor = createActor(canisterId, {
			agentOptions: {
				identity,
				host: network === 'playground' ? 'https://icp0.io' : undefined,
			},
		})
		const isAuthenticated = await authClient.isAuthenticated()

		setActor(actor)
		setAuthClient(authClient)
		setIsAuthenticated(isAuthenticated)

		setPrincipal(authClient.getIdentity().getPrincipal())
	}

	const login = async () => {
		await authClient?.login({
			identityProvider,
			onSuccess: updateActor,
		})
	}

	const authorizeUser = async () => {
		if (principal && principal.isAnonymous()) return

		setIsAuthenticating(true)

		const res = await actor.getUser()

		let user
		if (res.err) {
			user = await register()
		} else {
			user = res.ok
		}

		user.avatar = getAvatar(user.username)

		setUser(user)

		setIsAuthenticating(false)
	}

	const register = async () => {
		let username

		do {
			username = prompt('enter your username')

			const registerRes = await actor.register(username)

			if (registerRes.err) {
				alert(registerRes.err)
				username = ''
			} else {
				return registerRes.ok
			}
		} while (!username.trim())
	}

	const logout = async () => {
		await authClient.logout()
		updateActor()
		location.href = '/'
	}

	return (
		<BackendContext.Provider
			value={{ actor, authClient, isAuthenticated, principal, login, logout, user, isAuthenticating }}
		>
			{children}
		</BackendContext.Provider>
	)
}

export default BackendProvider

export const useBackend = () => {
	return useContext(BackendContext)
}
