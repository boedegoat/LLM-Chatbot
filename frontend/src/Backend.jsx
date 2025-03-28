import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthClient } from '@dfinity/auth-client'
import { createActor } from 'declarations/backend'
import { canisterId } from 'declarations/backend/index.js'

const BackendContext = createContext({})

const network = process.env.DFX_NETWORK
const identityProvider =
	network !== 'ic'
		? 'https://identity.ic0.app' // Mainnet
		: 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943' // Local

const BackendProvider = ({ children }) => {
	const [authClient, setAuthClient] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState()
	const [principal, setPrincipal] = useState(null)
	const [actor, setActor] = useState(null)

	useEffect(() => {
		updateActor()
	}, [])

	const updateActor = async () => {
		const authClient = await AuthClient.create()
		const identity = authClient.getIdentity()

		const actor = createActor(canisterId, {
			agentOptions: {
				identity,
				host: 'https://icp0.io',
			},
		})
		const isAuthenticated = await authClient.isAuthenticated()

		setActor(actor)
		setAuthClient(authClient)
		setIsAuthenticated(isAuthenticated)
		setPrincipal(authClient.getIdentity().getPrincipal().toString())
	}

	const login = async () => {
		await authClient.login({
			identityProvider,
			onSuccess: updateActor,
		})
	}

	const logout = async () => {
		await authClient.logout()
		updateActor()
	}

	return (
		<BackendContext.Provider value={{ actor, authClient, isAuthenticated, principal, login, logout }}>
			{children}
		</BackendContext.Provider>
	)
}

export default BackendProvider

export const useBackend = () => {
	return useContext(BackendContext)
}
