import Link from './Link'
import { Button } from './Button'
import { useState, useEffect } from 'react'
import { cn } from './utils'
import { useMediaQuery } from './use-mobile'
import Zap from '/zap.svg'
import { useRouter } from './Router'
import { useBackend } from './Backend'

export default function Navbar() {
	const { login, logout, user } = useBackend()
	const { navigate } = useRouter()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const pathname = location.pathname
	const isMobile = useMediaQuery('(max-width: 768px)')

	useEffect(() => {
		setMobileMenuOpen(false)
	}, [pathname, isMobile])

	const navItems = [
		{ name: 'Explore', href: '/explore' },
		{ name: 'Tools', href: '/tools' },
		{ name: 'Community', href: '/community' },
	]

	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container mx-auto flex h-16 items-center justify-between px-4'>
				<div className='flex items-center gap-2 md:gap-6'>
					<Link href='/' className='flex items-center gap-2'>
						<div className='relative h-8 w-8 overflow-hidden rounded-md bg-purple-600'>
							<div className='absolute inset-0 flex items-center justify-center'>
								<img src={Zap} className='h-5 w-5 text-white' />
							</div>
						</div>
						<span className='hidden font-bold text-xl md:inline-block'>Hacktralize</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center gap-6'>
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									'text-sm font-medium transition-colors hover:text-primary',
									pathname?.startsWith(item.href) ? 'text-foreground' : 'text-muted-foreground'
								)}
							>
								{item.name}
							</Link>
						))}
					</nav>
				</div>

				{/* Mobile Menu Button */}
				<button
					className='md:hidden'
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label='Toggle menu'
				>
					{mobileMenuOpen ? (
						<img src='/x.svg' className='h-6 w-6' />
					) : (
						<img src='/menu.svg' className='h-6 w-6' />
					)}
				</button>

				{/* Desktop Auth/Profile */}
				<div className='hidden md:flex items-center gap-4'>
					<Link href='/create'>
						<Button variant='outline' size='sm'>
							Create Hackathon
						</Button>
					</Link>
					{user ? (
						<Button
							onClick={() => {
								navigate('/profile')
							}}
							variant='ghost'
							className='!p-0 rounded-full'
						>
							<img src={user.avatar} alt={user.username} className='h-8 w-8 rounded-full' />
						</Button>
					) : (
						<Button onClick={() => login()} className='gap-2'>
							<img src='/login.svg' className='w-4 h-4' /> Connect
						</Button>
					)}
				</div>
			</div>

			{mobileMenuOpen && (
				<div className='md:hidden border-t'>
					<div className='container mx-auto px-4 py-4 space-y-4'>
						<nav className='flex flex-col space-y-4'>
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										'text-sm font-medium transition-colors hover:text-primary p-2 rounded-md',
										pathname?.startsWith(item.href)
											? 'bg-muted text-foreground'
											: 'text-muted-foreground'
									)}
								>
									{item.name}
								</Link>
							))}
						</nav>
						<div className='pt-4 border-t flex flex-col gap-2'>
							<Link href='/create' className='w-full'>
								<Button variant='outline' className='w-full'>
									Create Hackathon
								</Button>
							</Link>
							{user ? (
								<div className='flex items-center justify-between p-2 bg-muted rounded-md'>
									<div className='flex items-center gap-2'>
										<img src={user.avatar} alt={user.username} className='h-8 w-8' />
										<span className='text-sm font-medium'>{user.username}</span>
									</div>
									<Button onClick={() => logout()} variant='ghost' size='sm'>
										Log out
									</Button>
								</div>
							) : (
								<Button asChild onClick={() => login()} className='w-full gap-2'>
									<img src='/login.svg' className='w-4 h-4' />
									Connect
								</Button>
							)}
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
