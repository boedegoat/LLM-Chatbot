import { Button } from './Button'
import { Card, CardContent, CardFooter } from './Card'
import { Textarea } from './Text-Area'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'
import { Badge } from './Badge'
import { useEffect, useState } from 'react'
import Link from './Link'
import { useBackend } from './Backend'
import Loading from './Loading'
import { getAvatar } from './utils'

export default function CommunityFeed() {
	const [newPost, setNewPost] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [loading, setLoading] = useState(false)
	const { actor } = useBackend()
	const [posts, setPosts] = useState([])

	useEffect(() => {
		if (!actor) return
		getFeeds()
	}, [actor])

	const handleSubmit = async () => {
		if (!newPost.trim()) return

		setIsSubmitting(true)

		const res = await actor.postFeed({
			content: newPost,
		})

		if (res.err) {
			alert(res.err)
			setIsSubmitting(false)
			return
		}

		console.log(res.ok)

		setNewPost('')
		setIsSubmitting(false)
	}

	const getFeeds = async () => {
		setLoading(true)

		const res = await actor.getFeeds()

		if (res.err) {
			alert(res.err)
			setLoading(false)
			return
		}

		const posts = await Promise.all(
			res.ok.map(async (post) => {
				const userRes = await actor.getUserById(post.userId)
				post.user = userRes.ok
				return post
			})
		)

		console.log(posts)

		setPosts(posts)
		setLoading(false)
	}

	const handleLike = async (postId) => {
		const res = await actor.toggleLikeFeed(postId)
		if (res.err) {
			alert(res.err)
			return
		}
		location.reload()
	}

	if (loading) {
		return <Loading />
	}

	return (
		<div className='space-y-6'>
			<Card>
				<CardContent className='p-6'>
					<div className='flex gap-4'>
						<Avatar className='h-10 w-10'>
							<AvatarImage src='/placeholder.svg?height=40&width=40' alt='Your avatar' />
							<AvatarFallback>YA</AvatarFallback>
						</Avatar>
						<div className='flex-1'>
							<Textarea
								placeholder='Share your thoughts, projects, or questions with the community...'
								className='min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 shadow-none'
								value={newPost}
								onChange={(e) => setNewPost(e.target.value)}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex justify-between border-t pt-4'>
					<div className='flex gap-2'>
						<Button variant='ghost' size='sm' className='text-muted-foreground gap-2'>
							<img src='/image.svg' className='h-4 w-4 ' />
							Image
						</Button>
						<Button variant='ghost' size='sm' className='text-muted-foreground gap-2'>
							<img src='/hash.svg' className='h-4 w-4' />
							Hackathon
						</Button>
					</div>
					<Button onClick={handleSubmit} disabled={isSubmitting || !newPost.trim()} className='gap-2'>
						<img src='/send.svg' className='h-4 w-4' />
						Post
					</Button>
				</CardFooter>
			</Card>

			{posts.map((post) => (
				<Card key={post.id}>
					<CardContent className='p-6'>
						<div className='flex items-start gap-4 mb-4'>
							<Avatar>
								<AvatarImage src={getAvatar(post.user.username)} alt={post.user.username} />
								<AvatarFallback>{post.user.username.charAt(0)}</AvatarFallback>
							</Avatar>
							<div>
								<div className='flex items-center gap-2'>
									<Link
										href={`/profile/${post.user.username}`}
										className='font-semibold hover:text-purple-600 transition-colors'
									>
										{post.user.username}
									</Link>
									<span className='text-xs text-muted-foreground'>•</span>
									<span className='text-xs text-muted-foreground'>
										{new Date(Number(post.createdAt) / 1000000).toLocaleDateString()}
									</span>
								</div>
							</div>
						</div>

						<div className='mb-4'>
							<p className='whitespace-pre-line mb-4'>{post.content}</p>
						</div>

						<div className='flex items-center gap-4'>
							<Button
								variant='ghost'
								size='sm'
								className={`gap-1 ${post.liked ? 'text-red-500' : 'text-muted-foreground'}`}
								onClick={() => handleLike(post.id)}
							>
								<img
									src={post.liked ? '/heart-filled.svg' : '/heart.svg'}
									className='h-4 w-4'
									alt='Like'
								/>
								<span>{post.likes}</span>
							</Button>
							<Button variant='ghost' size='sm' className='gap-1 text-muted-foreground'>
								<img src='/messagesquare.svg' className='h-4 w-4' />
								<span>{post.comments}</span>
							</Button>
							<Button variant='ghost' size='sm' className='gap-1 text-muted-foreground'>
								<img src='/share2.svg' className='h-4 w-4' />
								Share
							</Button>
						</div>
					</CardContent>
				</Card>
			))}

			<div className='flex justify-center'>
				<Button variant='outline'>Load More</Button>
			</div>
		</div>
	)
}
