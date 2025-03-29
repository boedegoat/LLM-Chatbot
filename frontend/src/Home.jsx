import { Button } from './Button'
import Link from './Link'
import { Badge } from './Badge'
import { Card, CardContent } from './Card'
import FeaturedHackathons from './FeaturedHackathons'
import { getAvatar } from './utils'

export default function Home() {
	return (
		<div>
			{/* Hero Section */}
			<section className='relative overflow-hidden bg-gradient-to-b from-purple-50 to-background py-20 md:py-32'>
				<div className='absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]'></div>
				<div className='container mx-auto px-4 relative z-10'>
					<div className='max-w-3xl mx-auto text-center'>
						<Badge className='mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200'>
							Decentralized Hackathon Platform
						</Badge>
						<h1 className='text-4xl md:text-6xl font-bold mb-6 tracking-tight'>
							Build the future with <span className='text-purple-600'>Hacktralize</span>
						</h1>
						<p className='text-xl text-muted-foreground mb-8 md:mb-10'>
							Leverage our AI idea generator to create innovative web3 projects, connect with builders,
							and win prizes in decentralized hackathons.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Button size='lg' asChild>
								<Link href='/idea-generator'>Try AI Idea Generator</Link>
							</Button>
							<Button size='lg' asChild variant='outline'>
								<Link href='/explore'>Explore Hackathons</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Decorative Elements */}
				<div className='absolute -bottom-16 -left-16 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl'></div>
				<div className='absolute -top-20 -right-20 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl'></div>
			</section>

			{/* Stats Section */}
			<section className='py-12 border-y bg-muted/30'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
						<div className='text-center'>
							<p className='text-3xl md:text-4xl font-bold text-purple-600 mb-2'>50+</p>
							<p className='text-sm text-muted-foreground'>Active Hackathons</p>
						</div>
						<div className='text-center'>
							<p className='text-3xl md:text-4xl font-bold text-purple-600 mb-2'>10k+</p>
							<p className='text-sm text-muted-foreground'>Builders</p>
						</div>
						<div className='text-center'>
							<p className='text-3xl md:text-4xl font-bold text-purple-600 mb-2'>$2M+</p>
							<p className='text-sm text-muted-foreground'>Prize Pool</p>
						</div>
						<div className='text-center'>
							<p className='text-3xl md:text-4xl font-bold text-purple-600 mb-2'>500+</p>
							<p className='text-sm text-muted-foreground'>Projects Built</p>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Hackathons */}
			<section className='py-20'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10'>
						<div>
							<h2 className='text-3xl font-bold mb-2'>Explore Featured Hackathons</h2>
							<p className='text-muted-foreground'>
								Discover the most exciting opportunities to build and win
							</p>
						</div>
						<Button variant='outline' asChild>
							<Link href='/explore' className='gap-2'>
								View All
								<img src='/arrowright.svg' className='h-4 w-4' />
							</Link>
						</Button>
					</div>

					<FeaturedHackathons />
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20 bg-gradient-to-b from-background to-purple-50'>
				<div className='container mx-auto px-4'>
					<div className='text-center max-w-3xl mx-auto mb-16'>
						<Badge className='mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200'>
							Platform Features
						</Badge>
						<h2 className='text-3xl font-bold mb-4'>Everything you need to build amazing projects</h2>
						<p className='text-muted-foreground'>
							HackChain provides a complete ecosystem for hackathon participants, organizers, and sponsors
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<Card className='bg-background border-purple-100'>
							<CardContent className='pt-6'>
								<div className='rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4'>
									<img src='/lightbulb-black.svg' className='h-6 w-6 text-purple-600' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>AI-Powered Idea Generation</h3>
								<p className='text-muted-foreground'>
									Generate innovative project ideas tailored to hackathon themes using our advanced AI
									assistant.
								</p>
							</CardContent>
						</Card>

						<Card className='bg-background border-purple-100'>
							<CardContent className='pt-6'>
								<div className='rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4'>
									<img src='/users.svg' className='h-6 w-6 text-purple-600' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>Team Collaboration</h3>
								<p className='text-muted-foreground'>
									Find team members with complementary skills, collaborate on projects, and manage
									your team efficiently.
								</p>
							</CardContent>
						</Card>

						<Card className='bg-background border-purple-100'>
							<CardContent className='pt-6'>
								<div className='rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4'>
									<img src='/wallet.svg' className='h-6 w-6 text-purple-600' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>Decentralized Rewards</h3>
								<p className='text-muted-foreground'>
									Receive prizes directly to your team wallet and distribute funds fairly among team
									members.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className='py-20'>
				<div className='container mx-auto px-4'>
					<div className='text-center max-w-3xl mx-auto mb-16'>
						<Badge className='mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200'>
							How It Works
						</Badge>
						<h2 className='text-3xl font-bold mb-4'>Your journey from idea to launch</h2>
						<p className='text-muted-foreground'>
							Follow these simple steps to participate in hackathons and build amazing projects
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						<div className='text-center'>
							<div className='relative mx-auto mb-4'>
								<div className='rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mx-auto'>
									<span className='text-2xl font-bold text-purple-600'>1</span>
								</div>
								<div className='hidden md:block absolute top-8 left-full w-full h-0.5 bg-purple-100'></div>
							</div>
							<h3 className='text-lg font-semibold mb-2'>Connect Wallet</h3>
							<p className='text-sm text-muted-foreground'>
								Sign in with Internet Identity to access the platform features
							</p>
						</div>

						<div className='text-center'>
							<div className='relative mx-auto mb-4'>
								<div className='rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mx-auto'>
									<span className='text-2xl font-bold text-purple-600'>2</span>
								</div>
								<div className='hidden md:block absolute top-8 left-full w-full h-0.5 bg-purple-100'></div>
							</div>
							<h3 className='text-lg font-semibold mb-2'>Join Hackathon</h3>
							<p className='text-sm text-muted-foreground'>
								Browse and register for hackathons that match your interests
							</p>
						</div>

						<div className='text-center'>
							<div className='relative mx-auto mb-4'>
								<div className='rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mx-auto'>
									<span className='text-2xl font-bold text-purple-600'>3</span>
								</div>
								<div className='hidden md:block absolute top-8 left-full w-full h-0.5 bg-purple-100'></div>
							</div>
							<h3 className='text-lg font-semibold mb-2'>Build Project</h3>
							<p className='text-sm text-muted-foreground'>
								Form a team, generate ideas, and build your project using our tools
							</p>
						</div>

						<div className='text-center'>
							<div className='relative mx-auto mb-4'>
								<div className='rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mx-auto'>
									<span className='text-2xl font-bold text-purple-600'>4</span>
								</div>
							</div>
							<h3 className='text-lg font-semibold mb-2'>Win Prizes</h3>
							<p className='text-sm text-muted-foreground'>
								Submit your project, get feedback, and win prizes in your team wallet
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className='py-20 bg-muted/30'>
				<div className='container mx-auto px-4'>
					<div className='text-center max-w-3xl mx-auto mb-16'>
						<Badge className='mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200'>
							Testimonials
						</Badge>
						<h2 className='text-3xl font-bold mb-4'>What our community says</h2>
						<p className='text-muted-foreground'>
							Hear from builders and organizers who have used HackChain
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<Card>
							<CardContent className='pt-6'>
								<div className='flex items-start gap-4 mb-4'>
									<div className='rounded-full bg-purple-100 w-10 h-10 flex-shrink-0'>
										<img src={getAvatar('Alex Johnson')} className='w-full h-full rounded-full' />
									</div>
									<div>
										<p className='font-semibold'>Alex Johnson</p>
										<p className='text-sm text-muted-foreground'>Web3 Developer</p>
									</div>
								</div>
								<p className='text-muted-foreground'>
									"HackChain made it incredibly easy to find teammates with complementary skills. We
									won our first hackathon and the prize distribution was seamless!"
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className='pt-6'>
								<div className='flex items-start gap-4 mb-4'>
									<div className='rounded-full bg-purple-100 w-10 h-10 flex-shrink-0'>
										<img src={getAvatar('Sarah Chen')} className='w-full h-full rounded-full' />
									</div>
									<div>
										<p className='font-semibold'>Sarah Chen</p>
										<p className='text-sm text-muted-foreground'>Hackathon Organizer</p>
									</div>
								</div>
								<p className='text-muted-foreground'>
									"As an organizer, HackChain provided all the tools I needed to run a successful
									hackathon. The platform attracted quality participants and projects."
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className='pt-6'>
								<div className='flex items-start gap-4 mb-4'>
									<div className='rounded-full bg-purple-100 w-10 h-10 flex-shrink-0'>
										<img src={getAvatar('Michael Torres')} className='w-full h-full rounded-full' />
									</div>
									<div>
										<p className='font-semibold'>Michael Torres</p>
										<p className='text-sm text-muted-foreground'>UI/UX Designer</p>
									</div>
								</div>
								<p className='text-muted-foreground'>
									"The AI idea generator helped our team come up with a unique concept that stood out
									from the competition. We're now turning it into a startup!"
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 bg-purple-600 text-white'>
				<div className='container mx-auto px-4'>
					<div className='max-w-3xl mx-auto text-center'>
						<h2 className='text-3xl font-bold mb-6'>Ready to start building?</h2>
						<p className='text-purple-100 mb-8 text-lg'>
							Join thousands of builders in the HackChain community and start your web3 journey today.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Button size='lg' variant='secondary' asChild>
								<Link href='/explore'>Explore Hackathons</Link>
							</Button>
							<Button
								size='lg'
								variant='outline'
								className='bg-purple-700 text-white hover:bg-purple-800 hover:text-white border-purple-500'
								asChild
							>
								<Link href='/create'>Host a Hackathon</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
