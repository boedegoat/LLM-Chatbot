import React, { createContext, useContext, useEffect, useState } from 'react'
import { createActor } from 'declarations/backend'

const BackendContext = createContext({})

const BackendProvider = ({ children }) => {
	const [backendActor, setBackendActor] = useState(null)

	useEffect(() => {
		// Replace with your actual playground canister ID
		const canisterId = import.meta.env.VITE_CANISTER_ID_BACKEND
		const actor = createActor(canisterId, {
			agentOptions: {
				host: 'https://icp0.io', // This points to the IC network where playground canisters run
			},
		})
		setBackendActor(actor)
	}, [])

	return <BackendContext.Provider value={{ backendActor }}>{children}</BackendContext.Provider>
}

export default BackendProvider

export const useBackend = () => {
	return useContext(BackendContext)
}
