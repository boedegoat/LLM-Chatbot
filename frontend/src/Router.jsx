import React, { useState, useEffect, createContext, useContext } from 'react'

const RouterContext = createContext({})

const matchRoute = (pattern, path) => {
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

	const params = {}
	match.slice(1).forEach((value, index) => {
		params[paramNames[index]] = value
	})

	return params
}

const RouterProvider = ({ children }) => {
	const getPathWithoutQuery = (url) => {
		return url.split('?')[0]
	}

	const [currentPage, setCurrentPage] = useState(() => {
		const path = getPathWithoutQuery(window.location.pathname)
		return path
	})

	const [queryParams, setQueryParams] = useState(() => {
		const searchParams = new URLSearchParams(window.location.search)
		return Object.fromEntries(searchParams.entries())
	})

	const navigate = (page) => {
		const [path, queryString] = page.split('?')

		window.history.pushState({}, '', page)

		setCurrentPage(path)

		if (queryString) {
			const searchParams = new URLSearchParams('?' + queryString)
			setQueryParams(Object.fromEntries(searchParams.entries()))
		} else {
			setQueryParams({})
		}
	}

	const matchPattern = (pattern) => {
		return matchRoute(pattern, currentPage) !== null
	}

	const getParams = (pattern) => {
		return matchRoute(pattern, currentPage) || {}
	}

	const getQueryParam = (key) => {
		return queryParams[key]
	}

	const getAllQueryParams = () => {
		return queryParams
	}

	useEffect(() => {
		const handlePopState = () => {
			const path = getPathWithoutQuery(window.location.pathname)
			setCurrentPage(path)

			const searchParams = new URLSearchParams(window.location.search)
			setQueryParams(Object.fromEntries(searchParams.entries()))
		}
		window.addEventListener('popstate', handlePopState)
		return () => window.removeEventListener('popstate', handlePopState)
	}, [])

	return (
		<RouterContext.Provider
			value={{
				currentPage,
				navigate,
				matchPattern,
				getParams,
				getQueryParam,
				getAllQueryParams,
				queryParams,
			}}
		>
			{children}
		</RouterContext.Provider>
	)
}

export default RouterProvider

export const useRouter = () => {
	return useContext(RouterContext)
}
