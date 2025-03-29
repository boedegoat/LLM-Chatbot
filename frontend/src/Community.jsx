import { Button } from './Button'
import Input from './Input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'
import { Badge } from './Badge'
import { Card, CardContent, CardFooter } from './Card'
import CommunityFeed from './Community-feed'

export default function CommunityPage() {
	return (
		<div>
			{/* Hero Section */}
			<section className='bg-gradient-to-b from-purple-50 to-background py-12'>
				<div className='container mx-auto px-4'>
					<div className='max-w-3xl mx-auto text-center'>
						<h1 className='text-3xl md:text-4xl font-bold mb-4'>Community</h1>
						<p className='text-muted-foreground mb-8'>
							Connect with builders, share your projects, and find collaborators
						</p>

						<div className='relative max-w-2xl mx-auto'>
							<img
								src='/search.svg'
								className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground'
							/>
							<Input placeholder='Search posts, projects, or users...' className='pl-10 pr-20' />
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
					<Tabs defaultValue='feed'>
						<div className='flex justify-between items-center mb-8'>
							<TabsList>
								<TabsTrigger value='feed'>Feed</TabsTrigger>
								<TabsTrigger value='projects'>Projects</TabsTrigger>
							</TabsList>
							<Button variant='outline' className='gap-2 hover:bg-gray-200'>
								<img src='/filter.svg' className='h-4 w-4' />
								Filters
							</Button>
						</div>

						<TabsContent value='feed'>
							<div className='flex flex-col lg:flex-row gap-8'>
								<div className='flex-1'>
									<CommunityFeed />
								</div>

								<div className='w-full lg:w-80 flex-shrink-0'>
									<div className='sticky top-24 space-y-6'>
										<Card>
											<CardContent className='p-6'>
												<h3 className='font-semibold mb-4'>Popular Topics</h3>
												<div className='flex flex-wrap gap-2'>
													<Badge className='bg-purple-100 text-purple-800 hover:bg-purple-100'>
														#DeFi
													</Badge>
													<Badge className='bg-purple-100 text-purple-800 hover:bg-purple-100'>
														#NFT
													</Badge>
													<Badge className='bg-purple-100 text-purple-800 hover:bg-purple-100'>
														#DAO
													</Badge>
													<Badge className='bg-purple-100 text-purple-800 hover:bg-purple-100'>
														#Gaming
													</Badge>
													<Badge className='bg-purple-100 text-purple-800 hover:bg-purple-100'>
														#Solidity
													</Badge>
													<Badge className='bg-purple-100 text-purple-800 hover:bg-purple-100'>
														#React
													</Badge>
													<Badge className='bg-purple-100 text-purple-800 hover:bg-purple-100'>
														#Ethereum
													</Badge>
													<Badge className='bg-purple-100 text-purple-800 hover:bg-purple-100'>
														#Blockchain
													</Badge>
												</div>
											</CardContent>
										</Card>
									</div>
								</div>
							</div>
						</TabsContent>

						<TabsContent value='projects'>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<Card key={i}>
										<CardContent className='p-0'>
											<div className='h-48 bg-purple-100'></div>
											<div className='p-6'>
												<h3 className='font-semibold text-lg mb-2'>Project Name {i}</h3>
												<p className='text-sm text-muted-foreground mb-4'>
													A brief description of this amazing web3 project that was built
													during a hackathon.
												</p>
												<div className='flex flex-wrap gap-2 mb-4'>
													<Badge variant='outline'>React</Badge>
													<Badge variant='outline'>Solidity</Badge>
													<Badge variant='outline'>DeFi</Badge>
												</div>
												<div className='flex items-center justify-between text-sm text-muted-foreground'>
													<div className='flex items-center gap-1'>
														<img src='/thumbsup.svg' className='h-4 w-4' />
														<span>{Math.floor(Math.random() * 100)}</span>
													</div>
													<div className='flex items-center gap-1'>
														<img src='/messagesquare.svg' className='h-4 w-4' />
														<span>{Math.floor(Math.random() * 20)}</span>
													</div>
													<div className='flex items-center gap-1'>
														<img src='/users.svg' className='h-4 w-4' />
														<span>{Math.floor(Math.random() * 5) + 1}</span>
													</div>
												</div>
											</div>
										</CardContent>
										<CardFooter className='bg-muted/30 p-4'>
											<div className='flex items-center gap-2'>
												<Avatar className='h-6 w-6'>
													<AvatarFallback>U</AvatarFallback>
												</Avatar>
												<span className='text-sm'>Username</span>
											</div>
										</CardFooter>
									</Card>
								))}
							</div>
							<div className='mt-8 flex justify-center'>
								<Button variant='outline'>Load More</Button>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</section>
		</div>
	)
}
