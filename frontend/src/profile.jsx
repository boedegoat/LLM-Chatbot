import { Button } from './Button'
import { Card, CardContent, CardHeader } from './Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'
import { useBackend } from './Backend'
import { useEffect, useState } from 'react'
import { Label } from './Label'
import Input from './Input'
import { Textarea } from './Text-Area'

export default function ProfilePage() {
	const { logout, user, actor } = useBackend()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [formData, setFormData] = useState({
		username: '',
		bio: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (!user) return
		setFormData({
			username: user.username,
			bio: user.bio || '',
		})
	}, [user])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const res = await actor.editProfile({
				username: formData.username !== user.username ? [formData.username] : [],
				bio: formData.bio !== user.bio ? [formData.bio] : [],
			})

			if (res.err) {
				alert(res.err)
			} else {
				setIsModalOpen(false)
				window.location.reload()
			}
		} catch (error) {
			console.error('Error updating profile:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='container mx-auto py-12'>
			<div className='max-w-4xl mx-auto'>
				<Card className='mb-8'>
					<CardContent className='p-6'>
						<div className='flex flex-col md:flex-row gap-6 items-start'>
							<img className='h-24 w-24 rounded-full' src={user?.avatar} alt={user?.username} />

							<div className='flex-1'>
								<div className='flex gap-2 items-start mb-2'>
									<h1 className='text-2xl font-semibold'>{user?.username}</h1>
									<Button
										onClick={() => setIsModalOpen(true)}
										variant='outline'
										size='sm'
										className='flex items-center gap-1 ml-auto'
									>
										<img src='/square-pen.svg' alt='edit' className='h-3 w-3' />
										Edit Profile
									</Button>
									<Button
										onClick={() => logout()}
										variant='destructive'
										size='sm'
										className='flex items-center gap-1'
									>
										Logout
									</Button>
								</div>

								<p className='text-muted-foreground mb-4'>{user?.bio}</p>

								<div className='flex flex-wrap gap-6'>
									<div className='flex items-center gap-2'>
										<img src='/users.svg' alt='user' className='h-4 w-4 text-muted-foreground' />
										<span className='text-sm'>
											<span className='font-medium'>{user?.followers.length}</span> followers
										</span>
										<span className='text-sm text-muted-foreground'>•</span>
										<span className='text-sm'>
											<span className='font-medium'>{user?.following.length}</span> following
										</span>
									</div>

									<div className='flex items-center gap-2'>
										<img src='/trophy.svg' alt='trophy' className='h-4 w-4 text-muted-foreground' />
										<span className='text-sm'>
											<span className='font-medium'>{0}</span> hackathons won
										</span>
									</div>

									<div className='flex items-center gap-2'>
										<img src='/wallet.svg' alt='wallet' className='h-4 w-4 text-muted-foreground' />
										<span className='text-sm'>Connected to Internet Identity</span>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Tabs defaultValue='posts'>
					<TabsList className='mb-6'>
						<TabsTrigger value='posts'>Posts</TabsTrigger>
						<TabsTrigger value='teams'>Teams</TabsTrigger>
						<TabsTrigger value='wallet'>Wallet</TabsTrigger>
					</TabsList>

					<TabsContent value='posts'>
						{user?.posts.length > 0 ? (
							<div className='space-y-4'>
								{user?.posts.map((post) => (
									<Card key={post.id}>
										<CardContent className='p-6'>
											<p className='mb-4'>{post.content}</p>
											<div className='flex items-center gap-4 text-sm text-muted-foreground'>
												<span>{post.likes} likes</span>
												<span>{post.comments} comments</span>
												<span>{post.timestamp}</span>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						) : (
							<div className='text-center py-12 bg-slate-50 rounded-md'>
								<p className='text-muted-foreground mb-4'>You haven&apos;t created any posts yet.</p>
								<Button>Create your first post</Button>
							</div>
						)}
					</TabsContent>

					<TabsContent value='teams'>
						{user?.teams.length > 0 ? (
							<div className='space-y-4'>
								{user?.teams.map((team) => (
									<Card key={team.id}>
										<CardContent className='p-6'>
											<h3 className='text-xl font-semibold mb-2'>{team.name}</h3>
											<div className='flex items-center gap-4 text-sm text-muted-foreground'>
												<span>Hackathon: {team.hackathon}</span>
												<span>{team.members} members</span>
											</div>
											<div className='mt-4'>
												<Button variant='outline' size='sm'>
													View Team
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						) : (
							<div className='text-center py-12 bg-slate-50 rounded-md'>
								<p className='text-muted-foreground mb-4'>You haven&apos;t joined any teams yet.</p>
								<Button>Find a team</Button>
							</div>
						)}
					</TabsContent>

					<TabsContent value='wallet'>
						<Card>
							<CardHeader>
								<h3 className='text-xl font-semibold'>Team Wallet</h3>
							</CardHeader>
							<CardContent>
								<div className='space-y-6'>
									<div className='p-4 bg-slate-50 rounded-md'>
										<div className='flex justify-between items-center mb-2'>
											<span className='text-sm font-medium'>Available Balance</span>
											<span className='text-xl font-semibold'>$500.00</span>
										</div>
										<div className='text-xs text-muted-foreground'>
											From nights hackathon prize pool
										</div>
									</div>

									<div className='space-y-2'>
										<h4 className='text-sm font-medium'>Recent Transactions</h4>
										<div className='space-y-2'>
											<div className='flex justify-between items-center p-3 bg-white border rounded-md'>
												<div>
													<p className='font-medium'>Prize Distribution</p>
													<p className='text-xs text-muted-foreground'>
														From nights hackathon
													</p>
												</div>
												<span className='text-green-600 font-medium'>+$500.00</span>
											</div>
										</div>
									</div>

									<div className='flex gap-2'>
										<Button className='flex-1'>Withdraw Funds</Button>
										<Button variant='outline' className='flex-1'>
											View All Transactions
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>

			{isModalOpen && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative'>
						<button
							className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
							onClick={() => setIsModalOpen(false)}
						>
							<img src='/x.svg' className='h-4 w-4' />
						</button>

						<h2 className='text-xl font-semibold mb-4'>Edit Profile</h2>
						<p className='text-sm text-muted-foreground mb-6'>
							Make changes to your profile information here. Click save when you're done.
						</p>

						<form onSubmit={handleSubmit}>
							<div className='space-y-6'>
								<div className='space-y-2'>
									<Label htmlFor='username'>Username</Label>
									<Input
										id='username'
										name='username'
										value={formData.username}
										onChange={handleInputChange}
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='bio'>Bio</Label>
									<Textarea
										id='bio'
										name='bio'
										value={formData.bio}
										onChange={handleInputChange}
										className='min-h-[100px]'
									/>
								</div>

								<div className='flex justify-end gap-2'>
									<Button type='button' variant='outline' onClick={() => setIsModalOpen(false)}>
										Cancel
									</Button>
									<Button type='submit' disabled={isSubmitting}>
										{isSubmitting ? (
											<>
												<img src='/loader2.svg' className='mr-2 h-4 w-4 animate-spin' />
												Saving...
											</>
										) : (
											'Save changes'
										)}
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
