import * as React from 'react'
import { cn } from './utils'

const DialogContext = React.createContext({
	open: false,
	setOpen: () => {},
})

export function Dialog({ children, open, onOpenChange }) {
	const [isOpen, setIsOpen] = React.useState(open || false)

	// Handle controlled state
	React.useEffect(() => {
		if (open !== undefined && open !== isOpen) {
			setIsOpen(open)
		}
	}, [open, isOpen])

	// Notify parent of changes
	React.useEffect(() => {
		if (onOpenChange) {
			onOpenChange(isOpen)
		}
	}, [isOpen, onOpenChange])

	return <DialogContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>{children}</DialogContext.Provider>
}

export function DialogContent({ className, children, ...props }) {
	const { open, setOpen } = React.useContext(DialogContext)
	const contentRef = React.useRef(null)

	// Handle click outside
	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (contentRef.current && !contentRef.current.contains(event.target)) {
				location.reload()
			}
		}

		if (open) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [open, setOpen])

	// Handle ESC key
	React.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				location.reload()
			}
		}

		if (open) {
			document.addEventListener('keydown', handleKeyDown)
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [open, setOpen])

	if (!open) return null
	return (
		<div className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm'>
			<div className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg'>
				<div className='absolute right-4 top-4'>
					<button
						type='button'
						className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'
						onClick={() => location.reload()}
					>
						<img src='/x.svg' alt='x' className='h-4 w-4' />
						<span className='sr-only'>Close</span>
					</button>
				</div>
				<div ref={contentRef} className={cn('', className)} {...props}>
					{children}
				</div>
			</div>
		</div>
	)
}

export function DialogHeader({ className, ...props }) {
	return <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
}

export function DialogFooter({ className, ...props }) {
	return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
}

export function DialogTitle({ className, ...props }) {
	return <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
}

export function DialogDescription({ className, ...props }) {
	return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}
