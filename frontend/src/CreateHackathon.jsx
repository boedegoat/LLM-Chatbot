import { Button } from './Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card'
import Input from './Input'
import { Textarea } from './Textarea'
import { Label } from './Label'
import { useState, useEffect } from 'react'
import { useBackend } from './Backend'
import { useRouter } from './Router'

export default function CreateHackathonPage() {
	const { isAuthenticating, user, login, actor } = useBackend()
	const { navigate } = useRouter()
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		totalPrizePool: 0,
		maximumTeamSize: 4,
		startDate: null,
		endDate: null,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		if (!isAuthenticating && !user) {
			login()
		}
	}, [user, isAuthenticating])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!formData.startDate || !formData.endDate) {
			setError('Please select both start and end dates')
			return
		}

		if (formData.endDate < formData.startDate) {
			setError('End date cannot be before start date')
			return
		}

		setIsSubmitting(true)
		setError('')

		try {
			const res = await actor.postHackathon({
				title: formData.title,
				description: formData.description,
				startDate: new Date(formData.startDate).getTime(),
				endDate: new Date(formData.endDate).getTime(),
				totalPrizePool: BigInt(formData.totalPrizePool),
				maximumTeamSize: BigInt(formData.maximumTeamSize),
			})

			if (res.err) {
				throw new Error(res.err)
			}

			console.log(res)

			alert('Hackathon successfully created')
			navigate(`/explore/${res.ok.id}`)
		} catch (err) {
			setError(err.message)
		} finally {
			setIsSubmitting(false)
		}
	}

	if (!user) {
		return null // Will redirect in useEffect
	}

	return (
		<div className='container mx-auto py-12'>
			<div className='max-w-3xl mx-auto'>
				<h1 className='text-3xl font-mono mb-8 text-center'>create a hackathon</h1>

				<Card>
					<form onSubmit={handleSubmit}>
						<CardHeader>
							<CardTitle>Hackathon Details</CardTitle>
							<CardDescription>
								Provide information about your hackathon to attract participants
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-6'>
							{error && <div className='bg-red-50 text-red-600 p-3 rounded-md text-sm'>{error}</div>}

							<div className='space-y-2'>
								<Label htmlFor='title'>Hackathon Title</Label>
								<Input
									id='title'
									name='title'
									placeholder='e.g., Web3 Summit, DeFi Challenge'
									value={formData.title}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='description'>Description</Label>
								<Textarea
									id='description'
									name='description'
									placeholder='Describe your hackathon, its goals, and what participants can expect'
									className='min-h-[120px]'
									value={formData.description}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-2'>
									<Label>Start Date</Label>
									<Input
										type='date'
										name='startDate'
										value={formData.startDate}
										onChange={handleInputChange}
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label>End Date</Label>
									<Input
										type='date'
										name='endDate'
										value={formData.endDate}
										onChange={handleInputChange}
										required
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='totalPrizePool'>Total Prize Pool (ICP)</Label>
								<Input
									id='totalPrizePool'
									name='totalPrizePool'
									type='number'
									placeholder='e.g., 1000'
									value={formData.totalPrizePool}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='maximumTeamSize'>Maximum Team Size</Label>
								<Input
									id='maximumTeamSize'
									name='maximumTeamSize'
									type='number'
									value={formData.maximumTeamSize}
									onChange={handleInputChange}
									className='w-full'
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button type='submit' className='ml-auto' disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<img src='/loader2.svg' alt='loader' className='mr-2 h-4 w-4 animate-spin' />
										Creating...
									</>
								) : (
									'Create Hackathon'
								)}
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	)
}
