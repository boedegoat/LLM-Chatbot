import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const media = window.matchMedia(query)

		// Update the state initially
		setMatches(media.matches)

		// Define callback for media query changes
		const listener = (event) => {
			setMatches(event.matches)
		}

		// Add the listener
		media.addEventListener('change', listener)

		// Clean up
		return () => {
			media.removeEventListener('change', listener)
		}
	}, [query])

	return matches
}
