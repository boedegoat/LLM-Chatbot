import { Button } from './Button'
import Input from './Input'
import HackathonCard from './Hackathon-Card'
import { useEffect, useState } from 'react'
import { useBackend } from './Backend'
import Loading from './Loading'

export default function Explore() {
	const { actor } = useBackend()
	const [hackathons, setHackathons] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!actor) return
		getAllHackathons()
	}, [actor])

	const getAllHackathons = async () => {
		setLoading(true)
		const res = await actor.getHackathons()

		if (res.err) {
			alert(res.err)
			setLoading(false)
			return
		}

		console.log(res)
		setHackathons(res.ok)
		setLoading(false)
	}

	if (loading) {
		return <Loading />
	}

	return (
		<div>
			<section className='bg-gradient-to-b from-purple-50 to-background py-12'>
				<div className='container mx-auto px-4'>
					<div className='max-w-3xl mx-auto text-center'>
						<h1 className='text-3xl md:text-4xl font-bold mb-4'>Explore Hackathons</h1>
						<p className='text-muted-foreground mb-8'>
							Discover opportunities to build, learn, and win prizes in the web3 ecosystem
						</p>

						<div className='relative max-w-2xl mx-auto'>
							<img
								src='/search.svg'
								alt='search'
								className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground'
							/>
							<Input
								placeholder='Search hackathons by name, technology, or category...'
								className='pl-10 pr-20'
							/>
							<Button className='absolute right-1 top-1/2 transform -translate-y-1/2 h-8' size='sm'>
								Search
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col lg:flex-row gap-8'>
						<div className='flex-1'>
							<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
								<div>
									<h2 className='text-xl font-semibold'>All Hackathons</h2>
									<p className='text-sm text-muted-foreground'>Showing {hackathons.length} results</p>
								</div>
								<div className='flex items-center gap-2'>
									<Button variant='outline' size='icon' className='h-10 w-10 lg:hidden'>
										<img src='./sliderhorizontal.svg' alt='slidershorizontal' className='h-4 w-4' />
									</Button>
								</div>
							</div>

							<div className='grid grid-cols-1 gap-6'>
								{hackathons.map((hackathon) => (
									<HackathonCard key={hackathon.id} hackathon={hackathon} />
								))}
							</div>

							<div className='mt-8 flex justify-center'>
								<Button variant='outline'>Load More</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
