import React from 'react'
import Link from './Link'

const Home = () => {
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
		</div>
	)
}

export default Home
