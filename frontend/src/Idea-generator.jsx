import { Button } from './Button'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { Textarea } from './Text-Area'
import { Label } from './Label'
import { useState } from 'react'
import { useBackend } from './Backend'
import { parseMarkdown } from './utils'

const overviewPrompt = `
"You’re an AI that spits out fire ICP hackathon ideas using Motoko. Your job? Turn user inspo into a dope Web3 project that’s unique, practical, and hackathon-ready.

🔹 What to do:

Idea drop: What’s the project?

Core features: What makes it pop?

Use cases: Who needs this?

Tech stack: ICP tools, Motoko libs, integrations.

🔹 How to respond:
Keep it snappy & useful. If the user wants options, remix the idea into new flavors."

Example Output:

🚀 AI-Powered DAO for Open Source Funding

Why? Web3 devs need fair funding.

What? A DAO that lets token holders vote & fund projects.

Stack: ICP, Motoko, SNS, ckBTC.

🔥 Features: On-chain voting, automated payouts, reputation system.

Use case: Helps indie devs get funding without gatekeepers.
`

const evaluatorPrompt = `
"You’re an ICP project hype-checker. Your job? Rate hackathon ideas based on how 🔥 they are, how useful they’d be, and whether they can actually be built in time.

🔹 How to rate:

Uniqueness (%): Is it fresh or already done?

Usefulness (%): Does anyone actually need this?

Feasibility (%): Can they pull it off in a hackathon?

Complexity: Low / Medium / High

Market Fit: Will it live beyond the hackathon?

🔹 How to respond:
Keep it short, real, & helpful. If an idea’s weak, suggest quick upgrades."

Example Output:

🔍 AI-Powered DAO for Open Source Funding

Uniqueness: 80% 🔥 (Not many AI-driven DAOs yet)

Usefulness: 85% ✅ (Web3 devs need better funding)

Feasibility: 70% ⚡ (SNS + Motoko = doable, AI part is extra work)

Complexity: Medium (Needs governance + smart contract logic)

Market Fit: High (Could def attract grants & users post-hackathon)
`

export default function IdeaGeneratorPage() {
	const { actor } = useBackend()
	const [chat, setChat] = useState([])
	const [hackathon, setHackathon] = useState('')
	const [inspiration, setInspiration] = useState('')
	const [isGenerating, setIsGenerating] = useState(false)
	const [message, setMessage] = useState('')

	const hackathons = [
		{ id: 'nights', name: 'nights' },
		{ id: 'web3-summit', name: 'web3 summit' },
	]

	const generateIdeas = async () => {
		if (!hackathon || !inspiration.trim()) return

		setIsGenerating(true)

		const overviewResponse = await actor.chat([
			{
				role: { system: null },
				content: overviewPrompt,
			},
			{
				role: { user: null },
				content: inspiration,
			},
		])

		const evaluatorResponse = await actor.chat([
			{
				role: { system: null },
				content: evaluatorPrompt,
			},
			{
				role: { user: null },
				content: inspiration,
			},
		])

		setChat([
			{
				role: { system: null },
				content: `${overviewPrompt}\n${evaluatorPrompt}`,
			},
			{
				role: { user: null },
				content: inspiration,
			},
			{
				role: { assistant: null },
				content: `${overviewResponse}\n${evaluatorResponse}`,
			},
		])

		setIsGenerating(false)
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			if (chatStarted) {
				askFollowUps()
			}
		}
	}

	const askFollowUps = async () => {
		if (!message.trim()) return

		const newChat = [
			...chat,
			{
				role: { user: null },
				content: message,
			},
		]

		setChat(newChat)
		setMessage('')
		setIsGenerating(true)

		const response = await actor.chat(newChat)

		setChat([
			...newChat,
			{
				role: { assistant: null },
				content: response,
			},
		])
		setIsGenerating(false)
	}

	return (
		<div>
			<div className='container mx-auto py-12'>
				<div className='max-w-3xl mx-auto'>
					<div className='text-center mb-12'>
						<h1 className='text-3xl font-mono mb-3'>AI idea generator</h1>
						<p className='text-muted-foreground'>
							Generate innovative project ideas for your next hackathon
						</p>
					</div>

					<Card className='mb-8'>
						<CardHeader>
							<CardTitle>Generate Ideas</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='inspiration'>Your Inspiration</Label>
								<Textarea
									id='inspiration'
									placeholder="Describe your inspiration, skills, and what kind of project you'd like to build..."
									className='min-h-[120px]'
									value={inspiration}
									onChange={(e) => setInspiration(e.target.value)}
								/>
							</div>

							<Button
								onClick={generateIdeas}
								disabled={isGenerating || !hackathon || !inspiration.trim()}
								className='w-full'
							>
								{isGenerating ? (
									<>
										<img src='/loader2.svg' className='h-4 w-4 mr-2 animate-spin' />
										Generating Ideas...
									</>
								) : (
									<>
										<img src='/lightbulb.svg' className='h-4 w-4 mr-2' />
										Generate Ideas
									</>
								)}
							</Button>
						</CardContent>
					</Card>

					{chat.length > 0 && (
						<div className='space-y-4'>
							<h2 className='text-xl font-semibold'>Generated Ideas</h2>
							{chat.slice(2).map((message, index) => (
								<Card key={index}>
									<CardContent className='p-6 pt-6'>
										<div className='flex items-start gap-3'>
											<div className='p-2 rounded-full bg-yellow-50 text-yellow-600'>
												<img src='/lightbulb-black.svg' className='h-5 w-5' />
											</div>
											<div className='flex-1'>
												<div
													className='prose'
													dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
												/>
											</div>
										</div>
									</CardContent>
								</Card>
							))}

							<div className='p-4 bg-background'>
								<div className='flex gap-2 items-center'>
									<Textarea
										placeholder={isGenerating ? 'Generating' : 'Type your follow up here...'}
										className='min-h-[50px] resize-none'
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										onKeyDown={handleKeyDown}
										disabled={isGenerating}
									/>
									<Button
										className='px-3 self-end h-[50px]'
										onClick={askFollowUps}
										disabled={isGenerating || !message.trim()}
									>
										<img src='/send.svg' className='h-5 w-5' />
										<span className='sr-only'>Send Follow Up</span>
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
