import { useEffect, useState } from 'react'
import { Button } from './Button'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'
import { Badge } from './Badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'
import { useBackend } from './Backend'
import Loading from './Loading'
import { getAvatar } from './utils'
import Link from './Link'

export default function TeamDetails({ teamId }) {
	const [team, setTeam] = useState(null)
	const [loading, setLoading] = useState(null)
	const { actor } = useBackend()

	useEffect(() => {
		if (!actor) return
		getTeamDetails()
	}, [actor])

	const getTeamDetails = async () => {
		setLoading(true)
		const res = await actor.getTeamDetail(teamId)

		if (res.err) {
			alert(res.err)
			setLoading(false)
			return
		}

		const team = res.ok

		const hackathonRes = await actor.getHackathonDetail(team.hackathonId)
		team.hackathon = hackathonRes.ok
		team.members = await Promise.all(
			team.members.map(async (member) => {
				const memberRes = await actor.getUserById(member)
				return memberRes.ok
			})
		)

		console.log(team)

		setTeam(team)
		setLoading(false)
	}

	if (loading || !team) {
		return <Loading />
	}

	return (
		<div className='container mx-auto py-12'>
			<div className='max-w-5xl mx-auto'>
				<Card className='mb-8'>
					<CardContent className='p-6'>
						<div className='flex flex-col md:flex-row gap-6'>
							<div className='flex-1'>
								<div className='flex items-center gap-2 mb-2'>
									<h1 className='text-3xl font-bold'>{team.name}</h1>
									{team.isOpen && (
										<Badge className='bg-green-100 text-green-800 hover:bg-green-100'>
											Open to members
										</Badge>
									)}
								</div>

								<p className='text-muted-foreground mb-4'>{team.bio[0]}</p>

								<div className='flex items-center gap-2 text-sm text-muted-foreground'>
									<img src='/users.svg' alt='users' className='h-4 w-4' />
									<span>
										{team.members.length} / {team.maximumTeamSize} members
									</span>
									<span className='text-muted-foreground'>•</span>
									<span>Hackathon: {team.hackathon.title}</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Tabs defaultValue='members'>
					<TabsList className='mb-6'>
						<TabsTrigger value='members'>Members</TabsTrigger>
					</TabsList>

					<TabsContent value='members'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{team.members.map((member) => (
								<Card key={member.id}>
									<CardContent className='p-6'>
										<div className='flex items-start gap-4'>
											<Avatar className='h-12 w-12'>
												<AvatarImage src={getAvatar(member.username)} alt={member.username} />
												<AvatarFallback>{member.username.charAt(0)}</AvatarFallback>
											</Avatar>

											<div className='flex-1'>
												<div className='flex items-center justify-between mb-1'>
													<h3 className='font-semibold'>{member.username}</h3>
												</div>

												<Button
													asLink
													variant='ghost'
													size='sm'
													className='p-0 h-auto text-blue-600'
												>
													<Link href={`/profile/${member.username}`}>View Profile</Link>
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))}

							{team.openToMembers && team.members.length < team.maxMembers && (
								<Card className='border-dashed'>
									<CardContent className='p-6 flex flex-col items-center justify-center h-full text-center'>
										<div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4'>
											<img
												src='/user-plus.svg'
												alt='userplus'
												className='h-6 w-6 text-muted-foreground'
											/>
										</div>
										<h3 className='font-semibold mb-2'>Looking for Team Members</h3>
										<p className='text-sm text-muted-foreground mb-4'>
											This team is looking for {team.maxMembers - team.members.length} more
											members to join
										</p>
										<Button size='sm'>Request to Join</Button>
									</CardContent>
								</Card>
							)}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
