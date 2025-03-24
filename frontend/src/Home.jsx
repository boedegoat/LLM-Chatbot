import React from 'react'
import Link from './Link'
import { useBackend } from './Backend'

const Home = () => {
	const { login, logout, isAuthenticated, principal } = useBackend()

	console.log(isAuthenticated, principal)

	return (
		<div>
			<h1>Home Page</h1>
			<Link href='/explore' className='text-blue-500'>
				Go to explore page
			</Link>
			<br />
			<Link href='/ai' className='text-blue-500'>
				Go to AI page
			</Link>
			<button onClick={() => login()}>login</button>
			<button onClick={() => logout()}>logout</button>
		</div>
	)
}

export default Home
