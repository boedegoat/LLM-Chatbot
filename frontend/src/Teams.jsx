import { useEffect, useState } from 'react'
import { Button } from './Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card'
import Input from './Input'
import { Textarea } from './Textarea'
import { Label } from './Label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'
import { Badge } from './Badge'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'
import { Switch } from './Switch'
import Link from './Link'
import { useRouter } from './Router'
import { useBackend } from './Backend'
import Loading from './Loading'
import { getAvatar } from './utils'

export default function TeamsPage() {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedHackathon, setSelectedHackathon] = useState('')
	const { getQueryParam, navigate } = useRouter()
	const { actor } = useBackend()
	const hackathonId = getQueryParam('hackathonId')
	const [formData, setFormData] = useState({
		name: '',
		bio: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [loading, setLoading] = useState(false)
	const [teams, setTeams] = useState([])

	useEffect(() => {
		if (!actor) return
		getTeams()
	}, [actor])

	const getTeams = async () => {
		setLoading(true)
		const res = await actor.getTeams()

		if (res.err) {
			alert(res.err)
			setLoading(false)
			return
		}

		const teams = await Promise.all(
			res.ok.map(async (team) => {
				const hackathonRes = await actor.getHackathonDetail(team.hackathonId)
				team.hackathon = hackathonRes.ok
				team.members = await Promise.all(
					team.members.map(async (member) => {
						const memberRes = await actor.getUserById(member)
						return memberRes.ok
					})
				)
				return team
			})
		)

		console.log(teams)

		setTeams(teams)
		setLoading(false)
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSwitchChange = (checked) => {
		setFormData((prev) => ({ ...prev, openToMembers: checked }))
	}

	const handleCreateTeam = async (e) => {
		e.preventDefault()

		if (!formData.name || !formData.bio) {
			return
		}

		setIsSubmitting(true)

		const res = await actor.registerTeam(hackathonId, {
			name: formData.name,
			bio: formData.bio ? [formData.bio] : [],
		})

		if (res.err) {
			alert(res.err)
			setIsSubmitting(false)
			return
		}

		navigate(`/teams/${res.ok.id}`)
		setIsSubmitting(false)
	}

	const filteredTeams = teams?.filter((team) => {
		const matchesSearch =
			searchQuery === '' ||
			team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			team.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

		const matchesHackathon = selectedHackathon === '' || team.hackathon === selectedHackathon

		return matchesSearch && matchesHackathon && team.openToMembers
	})

	if (loading) {
		return <Loading />
	}

	return (
		<div className='container mx-auto py-12'>
			<div className='max-w-5xl mx-auto'>
				<h1 className='text-3xl font-mono mb-8 text-center'>teams</h1>

				<Tabs defaultValue='join'>
					<TabsList className='grid w-full grid-cols-2 mb-8'>
						<TabsTrigger value='join'>Join a Team</TabsTrigger>
						<TabsTrigger value='create'>Create a Team</TabsTrigger>
					</TabsList>

					<TabsContent value='join'>
						<Card className='mb-8'>
							<CardHeader>
								<CardTitle>Find a Team</CardTitle>
								<CardDescription>
									Browse teams that are looking for members with your skills
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									<div className='flex flex-col md:flex-row gap-4'>
										<div className='relative flex-1'>
											<img
												src='/search.svg'
												alt='search'
												className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground'
											/>
											<Input
												placeholder='Search by team name, description, or skills...'
												className='pl-10'
												value={searchQuery}
												onChange={(e) => setSearchQuery(e.target.value)}
											/>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<div className='space-y-6'>
							<div className='flex justify-between items-center'>
								<h2 className='text-xl font-semibold'>Available Teams ({teams.length})</h2>
								<Button variant='outline' size='sm' className='flex items-center gap-1'>
									<img src='/filter.svg' alt='filter' className='h-4 w-4' />
									More Filters
								</Button>
							</div>

							{teams.length > 0 ? (
								<div className='grid grid-cols-1 gap-6'>
									{teams.map((team) => (
										<Card key={team.id} className='overflow-hidden'>
											<CardContent className='p-6'>
												<div className='flex flex-col md:flex-row gap-6'>
													<div className='flex-1'>
														<div className='flex items-center gap-2 mb-2'>
															<h3 className='text-xl font-semibold'>{team.name}</h3>
															<Badge className='bg-green-100 text-green-800 hover:bg-green-100'>
																Open to members
															</Badge>
														</div>

														<p className='text-muted-foreground mb-4'>{team.bio[0]}</p>

														<div className='flex items-center gap-2 text-sm text-muted-foreground'>
															<img src='/users.svg' alt='users' className='h-4 w-4' />
															<span>{team.members.length} members</span>
															<span className='text-muted-foreground'>•</span>
															<span>Hackathon: {team.hackathon.title}</span>
														</div>
													</div>

													<div className='flex flex-col gap-4'>
														<div className='flex -space-x-2'>
															{team.members.map((member) => (
																<Avatar
																	key={member.id}
																	className='border-2 border-background'
																>
																	<AvatarImage
																		src={getAvatar(member.username)}
																		alt={member.username}
																	/>
																	<AvatarFallback>
																		{member.username.charAt(0)}
																	</AvatarFallback>
																</Avatar>
															))}
															<div className='h-10 w-10 rounded-full bg-muted flex items-center justify-center border-2 border-background'>
																<img
																	src='/plus-black.svg'
																	alt='plus'
																	className='h-4 w-4 text-muted-foreground'
																/>
															</div>
														</div>

														<div className='flex flex-col gap-2'>
															<Button
																variant='outline'
																size='sm'
																className='gap-2'
																asChild
															>
																<Link href={`/teams/${team.id}`}>
																	<img
																		src='/users.svg'
																		alt='users'
																		className='h-4 w-4'
																	/>
																	View Team
																</Link>
															</Button>
															<Button size='sm' className='gap-2'>
																<img
																	src='/user-plus.svg'
																	alt='userplus'
																	className='h-4 w-4'
																/>
																Request to Join
															</Button>
														</div>
													</div>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							) : (
								<div className='text-center py-12 bg-slate-50 rounded-md'>
									<img
										src='/users.svg'
										alt='users'
										className='h-16 w-16 mx-auto text-muted-foreground mb-4'
									/>
									<h3 className='text-xl font-semibold mb-2'>No teams found</h3>
									<p className='text-muted-foreground mb-6 max-w-md mx-auto'>
										No teams match your search criteria. Try adjusting your filters or create your
										own team.
									</p>
									<Button onClick={() => document.querySelector('[data-value="create"]')?.click()}>
										Create a Team
									</Button>
								</div>
							)}
						</div>
					</TabsContent>

					<TabsContent value='create'>
						<Card>
							<CardHeader>
								<CardTitle>Create a New Team</CardTitle>
								<CardDescription>
									Start your own team and recruit members with the skills you need
								</CardDescription>
							</CardHeader>
							<form onSubmit={handleCreateTeam}>
								<CardContent className='space-y-6'>
									<div className='space-y-2'>
										<Label htmlFor='name'>Team Name</Label>
										<Input
											id='name'
											name='name'
											placeholder='Enter your team name'
											value={formData.name}
											onChange={handleInputChange}
											required
										/>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='bio'>Team Bio</Label>
										<Textarea
											id='bio'
											name='bio'
											placeholder="Describe your team, project idea, and what you're looking to build"
											className='min-h-[120px]'
											value={formData.bio}
											onChange={handleInputChange}
											required
										/>
									</div>

									<div className='flex items-center space-x-2'>
										<Switch
											id='openToMembers'
											checked={formData.openToMembers}
											onCheckedChange={handleSwitchChange}
										/>
										<Label htmlFor='openToMembers'>Open to new members</Label>
									</div>
								</CardContent>
								<CardFooter>
									<Button type='submit' className='ml-auto' disabled={isSubmitting}>
										{isSubmitting ? 'Creating...' : 'Create Team'}
									</Button>
								</CardFooter>
							</form>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
