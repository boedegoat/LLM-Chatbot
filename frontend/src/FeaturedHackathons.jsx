import * as React from 'react'
import { Card, CardContent, CardFooter } from './Card'
import { Badge } from './Badge'
import { Button } from './Button'
import Link from './Link'
import { useState } from 'react'
import { useBackend } from './Backend'
import Loading from './Loading'

export default function FeaturedHackathons() {
	const { actor } = useBackend()
	const [hackathons, setHackathons] = useState([])
	const [loading, setLoading] = useState(false)

	React.useEffect(() => {
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
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{hackathons.slice(0, 4).map((hackathon) => (
					<Card key={hackathon.id} className='overflow-hidden hover:shadow-md transition-shadow'>
						<CardContent className='p-0'>
							<div className='flex flex-col sm:flex-row'>
								<div className='flex-1'>
									<div className='flex flex-wrap gap-2 mb-2'>
										<Badge variant='outline' className='text-muted-foreground'>
											<img src='/clock.svg' className='h-3 w-3 mr-1' />
											Upcoming
										</Badge>
									</div>

									<h3 className='text-xl font-semibold mb-2'>{hackathon.title}</h3>
									<p className='text-sm text-muted-foreground mb-4 line-clamp-2'>
										{hackathon.description}
									</p>

									<div className='flex flex-wrap gap-x-4 gap-y-2 text-sm'>
										<div className='flex items-center text-muted-foreground'>
											<img src='/calendar.svg' className='h-4 w-4 mr-1' />
											<span>
												{new Date(Number(hackathon.startDate)).toLocaleDateString()} -{' '}
												{new Date(Number(hackathon.endDate)).toLocaleDateString()}
											</span>
										</div>
										<div className='flex items-center text-muted-foreground'>
											<img src='/trophy.svg' className='h-4 w-4 mr-1' />
											<span>{hackathon.totalPrizePool.toLocaleString()} ICP</span>
										</div>
										<div className='flex items-center text-muted-foreground'>
											<img src='/users.svg' className='h-4 w-4 mr-1' />
											<span>{hackathon.teams.length} participants</span>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className='bg-muted/30 p-4 flex justify-between'>
							<Button size='sm' variant='ghost' asChild>
								<Link href={`/explore/${hackathon.id}`} className='gap-1'>
									View Details
									<img src='/arrowright.svg' className='h-4 w-4 mr-1' />
								</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}
