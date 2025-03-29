import { Card, CardContent } from './Card'
import { Badge } from './Badge'
import { Button } from './Button'
import Link from './Link'

export default function HackathonCard({ hackathon }) {
	return (
		<Card className='overflow-hidden hover:shadow-md transition-shadow'>
			<CardContent className='p-0'>
				<div className='flex flex-col sm:flex-row'>
					<div className='flex-1'>
						<div className='flex flex-wrap gap-2 mb-2'>
							<Badge variant='outline' className='text-muted-foreground'>
								<img src='/clock.svg' className='h-3 w-3 mr-1' />
								{hackathon.status || 'Upcoming'}
							</Badge>
						</div>

						<h3 className='text-xl font-semibold mb-2'>{hackathon.title}</h3>
						<p className='text-sm text-muted-foreground mb-4 line-clamp-2'>{hackathon.description}</p>

						<div className='flex flex-wrap gap-x-4 gap-y-2 text-sm'>
							<div className='flex items-center gap-2 text-muted-foreground'>
								<img src='/calendar.svg' />
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
			<div className='bg-muted/30 p-4 flex justify-between border-t'>
				<div className='text-sm'>
					{hackathon.organizer && (
						<>
							By <span className='font-medium'>{hackathon.organizer}</span>
						</>
					)}
				</div>
				<Button size='sm' variant='ghost' asChild>
					<Link href={`/explore/${hackathon.id}`} className='gap-1'>
						View Details
						<img src='arrowright.svg' className='h-4 w-4' />
					</Link>
				</Button>
			</div>
		</Card>
	)
}
