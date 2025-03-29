import { Button } from './Button'
import { Badge } from './Badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import TeamSection from './Team-section'
import { useBackend } from './Backend'
import { useEffect, useState } from 'react'
import { getAvatar } from './utils'
import Loading from './Loading'
import Link from './Link'

const dummyHackathon = {
	website: 'https://example.com',
	rules: '1. All code must be written during the hackathon period.\n2. Teams can have up to 4 members.\n3. Projects must be open source.\n4. Judging will be based on innovation, technical difficulty, design, and usefulness.',
	prizes: [
		{ place: '1st Place', amount: '$15,000' },
		{ place: '2nd Place', amount: '$10,000' },
		{ place: '3rd Place', amount: '$5,000' },
	],
	timeline: [
		{ name: 'Registration Opens', date: 'Mar 10, 2025' },
		{ name: 'Kickoff Event', date: 'Apr 10, 2025' },
		{ name: 'Midpoint Check-in', date: 'Apr 17, 2025' },
		{ name: 'Submissions Due', date: 'Apr 25, 2025' },
		{ name: 'Winners Announced', date: 'May 1, 2025' },
	],
	sponsors: [
		{ name: 'ICP Ninja', logo: 'https://icp.ninja/assets/ninja-logo.svg' },
		{ name: 'Dfinity', logo: 'https://mma.prnewswire.com/media/2144806/DFINITY_Foundation_Logo.jpg?p=twitter' },
	],
}

export default function HackathonPage({ hackathonId }) {
	const { actor } = useBackend()
	const [hackathon, setHackathon] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!actor) return
		getHackathon()
	}, [actor])

	const getHackathon = async () => {
		setLoading(true)
		const res = await actor.getHackathonDetail(hackathonId)

		if (res.err) {
			alert(res.err)
			setLoading(false)
			return
		}

		const hackathon = res.ok

		const userRes = await actor.getUserById(hackathon.createdBy)

		hackathon.createdByUser = userRes.ok
		hackathon.teams = await Promise.all(
			hackathon.teams.map(async (team) => {
				const teamRes = await actor.getTeamDetail(team)
				return teamRes.ok
			})
		)
		console.log(hackathon)

		setHackathon(res.ok)
		setLoading(false)
	}

	if (loading || !hackathon) {
		return <Loading />
	}

	return (
		<div>
			<section className='bg-gradient-to-b from-purple-50 to-background py-12'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col md:flex-row gap-8 items-start'>
						<div className='flex-1'>
							<div className='flex flex-wrap gap-2 mb-3'>
								<Badge variant='outline' className='text-muted-foreground'>
									<img src='/clock.svg' alt='clock' className='h-3 w-3 mr-1' />
									Upcoming
								</Badge>
							</div>

							<h1 className='text-3xl md:text-4xl font-bold mb-3'>{hackathon.title}</h1>

							<p className='text-muted-foreground mb-6'>{hackathon.description}</p>

							<div className='flex flex-wrap gap-x-6 gap-y-3'>
								<div className='flex items-center text-muted-foreground'>
									<img src='/calendar.svg' alt='Calendar' className='h-5 w-5 mr-2 text-purple-600' />
									<span>
										{new Date(Number(hackathon.startDate)).toLocaleDateString()} -{' '}
										{new Date(Number(hackathon.endDate)).toLocaleDateString()}
									</span>
								</div>
								<div className='flex items-center text-muted-foreground'>
									<img src='/trophy.svg' alt='Trophy' className='h-5 w-5 mr-2 text-purple-600' />
									<span>{hackathon.totalPrizePool.toLocaleString()} ICP in prizes</span>
								</div>
								<div className='flex items-center text-muted-foreground'>
									<img src='/users.svg' alt='Users' className='h-5 w-5 mr-2 text-purple-600' />
									<span>{hackathon.teams.length} participants</span>
								</div>
							</div>
						</div>

						<div className='w-full md:w-auto flex flex-col gap-3 md:min-w-[200px]'>
							<Button asChild size='lg' className='w-full'>
								<Link href={`/teams?hackathonId=${hackathon.id}`}>Join Now</Link>
							</Button>
							<Button variant='outline' size='lg' className='w-full gap-2'>
								<img src='/bookmark.svg' alt='Bookmark' className='h-4 w-4' />
								Save
							</Button>
							<Button variant='ghost' size='lg' className='w-full gap-2'>
								<img src='/share2.svg' alt='Share' className='h-4 w-4' />
								Share
							</Button>
						</div>
					</div>
				</div>
			</section>

			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col lg:flex-row gap-8'>
						<div className='flex-1'>
							<Tabs defaultValue='overview'>
								<TabsList className='mb-8'>
									<TabsTrigger value='overview'>Overview</TabsTrigger>
									<TabsTrigger value='teams'>Teams</TabsTrigger>
									<TabsTrigger value='projects'>Projects</TabsTrigger>
									<TabsTrigger value='resources'>Resources</TabsTrigger>
								</TabsList>

								<TabsContent value='overview'>
									<div className='space-y-8'>
										<div>
											<h2 className='text-2xl font-semibold mb-4'>About</h2>
											<p className='text-muted-foreground whitespace-pre-line'>
												Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, eos
												deserunt maxime error assumenda hic quibusdam consequuntur nihil
												quisquam dolorem? Quo iusto aliquam cumque fugiat veniam, odio debitis
												delectus quisquam?
											</p>
										</div>

										<div>
											<h2 className='text-2xl font-semibold mb-4'>Prizes</h2>
											<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
												{dummyHackathon.prizes.map((prize, index) => (
													<Card
														key={index}
														className={index === 0 ? 'border-purple-200 bg-purple-50' : ''}
													>
														<CardContent className='p-6 text-center'>
															<div className='mb-2'>
																<img
																	src='/trophy.svg'
																	alt='Trophy'
																	className={`h-8 w-8 mx-auto ${
																		index === 0
																			? 'text-purple-600'
																			: 'text-muted-foreground'
																	}`}
																/>
															</div>
															<h3 className='text-lg font-semibold mb-1'>
																{prize.place}
															</h3>
															<p
																className={`text-xl font-bold ${
																	index === 0 ? 'text-purple-600' : ''
																}`}
															>
																{prize.amount}
															</p>
														</CardContent>
													</Card>
												))}
											</div>
										</div>

										<div>
											<h2 className='text-2xl font-semibold mb-4'>Sponsors</h2>
											<div className='flex flex-wrap gap-6 items-center'>
												{dummyHackathon.sponsors.map((sponsor, index) => (
													<div key={index} className='bg-white p-4 rounded-lg border'>
														<img
															src={sponsor.logo || '/placeholder.svg'}
															alt={sponsor.name}
															className='h-10 object-contain'
														/>
													</div>
												))}
											</div>
										</div>
									</div>
								</TabsContent>

								<TabsContent value='teams'>
									<TeamSection teams={hackathon.teams} hackathonId={hackathon.id} />
								</TabsContent>

								<TabsContent value='projects'>
									<div className='text-center py-16'>
										<img
											src='/code.svg'
											alt='code'
											className='h-16 w-16 mx-auto text-muted-foreground mb-4'
										/>
										<h3 className='text-2xl font-semibold mb-2'>No projects submitted yet</h3>
										<p className='text-muted-foreground mb-6 max-w-md mx-auto'>
											Projects will appear here once the hackathon begins and teams start
											submitting their work.
										</p>
										<Button>Register to Submit a Project</Button>
									</div>
								</TabsContent>

								<TabsContent value='resources'>
									<div className='space-y-8'>
										<div>
											<h2 className='text-2xl font-semibold mb-4'>Hackathon Resources</h2>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<Card>
													<CardContent className='p-6'>
														<div className='flex items-start gap-4'>
															<div className='rounded-full bg-purple-100 p-3'>
																<img
																	src='/code.svg'
																	alt='code'
																	className='h-5 w-5 text-purple-600'
																/>
															</div>
															<div>
																<h3 className='font-semibold mb-1'>
																	Starter Templates
																</h3>
																<p className='text-sm text-muted-foreground mb-3'>
																	Jump-start your project with pre-built templates for
																	common web3 applications.
																</p>
																<Button variant='outline' size='sm'>
																	View Templates
																</Button>
															</div>
														</div>
													</CardContent>
												</Card>

												<Card>
													<CardContent className='p-6'>
														<div className='flex items-start gap-4'>
															<div className='rounded-full bg-purple-100 p-3'>
																<img
																	src='/lightbulb-black.svg'
																	alt='Lightbulb'
																	className='h-5 w-5 text-purple-600'
																></img>
															</div>
															<div>
																<h3 className='font-semibold mb-1'>Idea Generator</h3>
																<p className='text-sm text-muted-foreground mb-3'>
																	Generate innovative project ideas based on hackathon
																	themes using our AI assistant.
																</p>
																<Button asChild variant='outline' size='sm'>
																	<Link href='/idea-generator'>Generate Ideas</Link>
																</Button>
															</div>
														</div>
													</CardContent>
												</Card>

												<Card>
													<CardContent className='p-6'>
														<div className='flex items-start gap-4'>
															<div className='rounded-full bg-purple-100 p-3'>
																<img
																	src='/wallet.svg'
																	alt='Lightbulb'
																	className='h-5 w-5 text-purple-600'
																></img>
															</div>
															<div>
																<h3 className='font-semibold mb-1'>
																	Team Wallet Setup
																</h3>
																<p className='text-sm text-muted-foreground mb-3'>
																	Learn how to set up a team wallet for receiving and
																	distributing prizes.
																</p>
																<Button variant='outline' size='sm'>
																	View Guide
																</Button>
															</div>
														</div>
													</CardContent>
												</Card>

												<Card>
													<CardContent className='p-6'>
														<div className='flex items-start gap-4'>
															<div className='rounded-full bg-purple-100 p-3'>
																<img
																	src='/users.svg'
																	alt='Lightbulb'
																	className='h-5 w-5 text-purple-600'
																></img>
															</div>
															<div>
																<h3 className='font-semibold mb-1'>Team Formation</h3>
																<p className='text-sm text-muted-foreground mb-3'>
																	Find team members with complementary skills for your
																	hackathon project.
																</p>
																<Button variant='outline' size='sm'>
																	Find Teammates
																</Button>
															</div>
														</div>
													</CardContent>
												</Card>
											</div>
										</div>
									</div>
								</TabsContent>
							</Tabs>
						</div>

						<div className='w-full lg:w-80 flex-shrink-0'>
							<div className='sticky top-24 space-y-6'>
								<Card>
									<CardHeader>
										<CardTitle>Timeline</CardTitle>
									</CardHeader>
									<CardContent>
										<ol className='relative border-l border-purple-200 ml-3 space-y-6'>
											{dummyHackathon.timeline.map((event, index) => (
												<li key={index} className='ml-6'>
													<span className='absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -left-3 ring-8 ring-background'>
														<span className='w-2 h-2 bg-purple-600 rounded-full'></span>
													</span>
													<h3 className='font-semibold'>{event.name}</h3>
													<time className='block text-sm text-muted-foreground'>
														{event.date}
													</time>
												</li>
											))}
										</ol>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Organizer</CardTitle>
									</CardHeader>
									<CardContent className='pt-0'>
										<div className='flex items-center gap-4'>
											<div className='w-12 h-12 bg-purple-100 rounded-full overflow-hidden'>
												<img
													src={getAvatar(hackathon.createdByUser.username)}
													alt={hackathon.createdByUser.username}
													className='w-full h-full'
												/>
											</div>
											<div>
												<h3 className='font-semibold'>{hackathon.createdByUser.username}</h3>
												<p className='text-sm text-muted-foreground'>Hackathon Organizer</p>
											</div>
										</div>
										<div className='mt-4'>
											<Button asChild variant='outline' className='w-full'>
												<Link href={`/profile/${hackathon.createdByUser.username}`}>
													View Profile
												</Link>
											</Button>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Share</CardTitle>
									</CardHeader>
									<CardContent className='pt-0'>
										<div className='flex gap-2'>
											<Button variant='outline' size='icon' className='flex-1'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='24'
													height='24'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
													className='h-5 w-5'
												>
													<path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
												</svg>
											</Button>
											<Button variant='outline' size='icon' className='flex-1'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='24'
													height='24'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
													className='h-5 w-5'
												>
													<path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'></path>
												</svg>
											</Button>
											<Button variant='outline' size='icon' className='flex-1'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='24'
													height='24'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
													className='h-5 w-5'
												>
													<rect x='2' y='2' width='20' height='20' rx='5' ry='5'></rect>
													<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
													<line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line>
												</svg>
											</Button>
											<Button variant='outline' size='icon' className='flex-1'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='24'
													height='24'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
													className='h-5 w-5'
												>
													<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
													<rect x='2' y='9' width='4' height='12'></rect>
													<circle cx='4' cy='4' r='2'></circle>
												</svg>
											</Button>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
