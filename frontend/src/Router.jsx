import React, { useState, useEffect, createContext, useContext } from 'react'

const RouterContext = createContext({})

// Helper function to match route patterns and extract params
const matchRoute = (pattern, path) => {
	// Convert route pattern to regex
	const paramNames = []
	const regexPattern = pattern
		.replace(/:[^\/]+/g, (match) => {
			paramNames.push(match.slice(1)) // Store param name without colon
			return '([^\\/]+)'
		})
		.replace(/\//g, '\\/')

	const regex = new RegExp(`^${regexPattern}$`)
	const match = path.match(regex)

	if (!match) return null

	// Extract params into an object
	const params = {}
	match.slice(1).forEach((value, index) => {
		params[paramNames[index]] = value
	})

	return params
}

const RouterProvider = ({ children }) => {
	const [currentPage, setCurrentPage] = useState(() => {
		const path = window.location.pathname
		return path
	})

	const navigate = (page) => {
		window.history.pushState({}, '', page)
		setCurrentPage(page)
	}

	// Function to check if current path matches a pattern
	const matchPattern = (pattern) => {
		return matchRoute(pattern, currentPage) !== null
	}

	// Function to get route params based on pattern
	const getParams = (pattern) => {
		return matchRoute(pattern, currentPage) || {}
	}

	useEffect(() => {
		const handlePopState = () => {
			const path = window.location.pathname
			setCurrentPage(path)
		}
		window.addEventListener('popstate', handlePopState)
		return () => window.removeEventListener('popstate', handlePopState)
	}, [])

	return (
		<RouterContext.Provider value={{ currentPage, navigate, matchPattern, getParams }}>
			{children}
		</RouterContext.Provider>
	)
}

export default RouterProvider

export const useRouter = () => {
	return useContext(RouterContext)
}
