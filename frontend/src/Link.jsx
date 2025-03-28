import React from 'react'
import { useRouter } from './Router'

const Link = ({ href, children, ...props }) => {
	const { navigate } = useRouter()

	return (
		<a
			href={href}
			onClick={(e) => {
				e.preventDefault()
				navigate(href)
			}}
			{...props}
		>
			{children}
		</a>
	)
}

export default Link
