import { Button } from './Button'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'
import Input from './Input'
import { Label } from './Label'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'
import { useState } from 'react'

export default function WalletManagerPage() {
	const [activeTeam, setActiveTeam] = useState('team1')

	const teams = [
		{
			id: 'team1',
			name: 'Blockchain Builders',
			hackathon: 'nights',
			balance: 500,
			members: [
				{ id: 'user1', name: 'Alex', avatar: '/placeholder.svg?height=40&width=40', share: 40 },
				{ id: 'user2', name: 'Jamie', avatar: '/placeholder.svg?height=40&width=40', share: 30 },
				{ id: 'user3', name: 'Taylor', avatar: '/placeholder.svg?height=40&width=40', share: 30 },
			],
			transactions: [
				{
					id: 'tx1',
					type: 'deposit',
					amount: 500,
					description: 'Prize from nights hackathon',
					date: '2025-04-05',
				},
			],
		},
	]

	const selectedTeam = teams.find((team) => team.id === activeTeam)

	return (
		<div>
			<div className='container mx-auto py-12'>
				<div className='max-w-4xl mx-auto'>
					<div className='text-center mb-12'>
						<h1 className='text-3xl font-mono mb-3'>team wallet manager</h1>
						<p className='text-muted-foreground'>
							Manage your team's funds and distribute prizes among team members
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<div className='md:col-span-1'>
							<Card>
								<CardHeader>
									<CardTitle>Your Teams</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='space-y-2'>
										{teams.map((team) => (
											<div
												key={team.id}
												className={`p-3 rounded-md cursor-pointer flex items-center gap-3 ${
													team.id === activeTeam
														? 'bg-blue-50 border border-blue-200'
														: 'hover:bg-slate-50'
												}`}
												onClick={() => setActiveTeam(team.id)}
											>
												<div className='p-2 rounded-full bg-slate-100'>
													<img src='/users.svg' className='h-4 w-4' />
												</div>
												<div>
													<p className='font-medium'>{team.name}</p>
													<p className='text-xs text-muted-foreground'>
														{team.hackathon} • ${team.balance} available
													</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>

						<div className='md:col-span-2'>
							{selectedTeam && (
								<Card>
									<CardHeader>
										<CardTitle>{selectedTeam.name} Wallet</CardTitle>
									</CardHeader>
									<CardContent>
										<Tabs defaultValue='overview'>
											<TabsList className='mb-4 bg-gray-100 p-2 rounded-lg inline-flex'>
												<TabsTrigger
													className='px-4 py-2 text-gray-500 hover:font-semibold hover:text-black hover:bg-white hover:rounded-md transition'
													value='overview'
												>
													Overview
												</TabsTrigger>
												<TabsTrigger
													className='px-4 py-2 text-gray-500 hover:font-semibold hover:text-black hover:bg-white hover:rounded-md transition'
													value='members'
												>
													Members
												</TabsTrigger>
												<TabsTrigger
													className='px-4 py-2 text-gray-500 hover:font-semibold hover:text-black hover:bg-white hover:rounded-md transition'
													value='transactions'
												>
													Transactions
												</TabsTrigger>
												<TabsTrigger
													className='px-4 py-2 text-gray-500 hover:font-semibold hover:text-black hover:bg-white hover:rounded-md transition'
													value='withdraw'
												>
													Withdraw
												</TabsTrigger>
											</TabsList>

											<TabsContent value='overview'>
												<div className='space-y-6'>
													<div className='p-6 bg-slate-50 rounded-md text-center'>
														<img
															src='/wallet.svg'
															className='h-8 w-8 text-blue-600 mx-auto mb-2'
														/>
														<p className='text-sm text-muted-foreground mb-1'>
															Available Balance
														</p>
														<p className='text-3xl font-semibold'>
															${selectedTeam.balance.toFixed(2)}
														</p>
														<p className='text-xs text-muted-foreground mt-1'>
															From {selectedTeam.hackathon} hackathon prize pool
														</p>
													</div>

													<div className='grid grid-cols-2 gap-4'>
														<Button className='w-full bg-black text-white'>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																width='16'
																height='16'
																viewBox='0 0 24 24'
																fill='none'
																stroke='currentColor'
																stroke-width='2'
																stroke-linecap='round'
																stroke-linejoin='round'
																class='lucide lucide-arrow-up-right-icon lucide-arrow-up-right'
															>
																<path d='M7 7h10v10' />
																<path d='M7 17 17 7' />
															</svg>
															Deposit
														</Button>
														<Button variant='outline' className='w-full'>
															<img src='/arrowdownleft.svg' className='h-4 w-4 mr-2' />
															Withdraw
														</Button>
													</div>
												</div>
											</TabsContent>

											<TabsContent value='members'>
												<div className='space-y-4'>
													<p className='text-sm text-muted-foreground'>
														Manage team members and their profit sharing percentages
													</p>

													{selectedTeam.members.map((member) => (
														<div
															key={member.id}
															className='flex items-center justify-between p-3 bg-slate-50 rounded-md'
														>
															<div className='flex items-center gap-3'>
																<Avatar>
																	<AvatarImage
																		src={member.avatar}
																		alt={member.name}
																	/>
																	<AvatarFallback>
																		{member.name.charAt(0)}
																	</AvatarFallback>
																</Avatar>
																<div>
																	<p className='font-medium'>{member.name}</p>
																	<p className='text-xs text-muted-foreground'>
																		Team Member
																	</p>
																</div>
															</div>
															<div className='flex items-center gap-2'>
																<p className='font-medium'>{member.share}%</p>
																<Button variant='ghost' size='sm'>
																	Edit
																</Button>
															</div>
														</div>
													))}

													<Button variant='outline' className='w-full'>
														<img src='/users.svg ' className='h-4 w-4 mr-2' />
														Add Team Member
													</Button>
												</div>
											</TabsContent>

											<TabsContent value='transactions'>
												<div className='space-y-4'>
													{selectedTeam.transactions.length > 0 ? (
														<div className='space-y-2'>
															{selectedTeam.transactions.map((tx) => (
																<div
																	key={tx.id}
																	className='flex justify-between items-center p-3 bg-slate-50 rounded-md'
																>
																	<div>
																		<div className='flex items-center gap-2'>
																			{tx.type === 'deposit' ? (
																				<img
																					src='/arrowupright.svg'
																					className='h-4 w-4 text-green-600'
																				/>
																			) : (
																				<img
																					src='/arrowdownleft.svg'
																					className='h-4 w-4 text-red-600'
																				/>
																			)}
																			<p className='font-medium'>
																				{tx.description}
																			</p>
																		</div>
																		<p className='text-xs text-muted-foreground'>
																			{tx.date}
																		</p>
																	</div>
																	<span
																		className={
																			tx.type === 'deposit'
																				? 'text-green-600 font-medium'
																				: 'text-red-600 font-medium'
																		}
																	>
																		{tx.type === 'deposit' ? '+' : '-'}$
																		{tx.amount.toFixed(2)}
																	</span>
																</div>
															))}
														</div>
													) : (
														<div className='text-center py-8'>
															<p className='text-muted-foreground'>No transactions yet</p>
														</div>
													)}
												</div>
											</TabsContent>

											<TabsContent value='withdraw'>
												<div className='space-y-4'>
													<p className='text-sm text-muted-foreground'>
														Withdraw funds from your team wallet to your personal wallet
													</p>

													<div className='space-y-2'>
														<Label htmlFor='amount'>Amount to withdraw</Label>
														<div className='flex gap-2'>
															<div className='relative flex-1'>
																<span className='absolute left-3 top-1/2 transform -translate-y-1/2'>
																	$
																</span>
																<Input
																	id='amount'
																	type='number'
																	className='pl-7'
																	placeholder='0.00'
																	max={selectedTeam.balance}
																/>
															</div>
															<Button variant='outline'>Max</Button>
														</div>
														<p className='text-xs text-muted-foreground'>
															Available balance: ${selectedTeam.balance.toFixed(2)}
														</p>
													</div>

													<div className='space-y-2'>
														<Label htmlFor='wallet'>Destination Wallet</Label>
														<Input id='wallet' placeholder='Enter wallet address' />
													</div>

													<Button className='w-full'>
														<img src='/arrowdownleft.svg' className='h-4 w-4 mr-2' />
														Withdraw Funds
													</Button>
												</div>
											</TabsContent>
										</Tabs>
									</CardContent>
								</Card>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
