import { useState } from 'react'
import { Button } from './Button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './Dialog'
import Input from './Input'
import { Label } from './Label'
import { Textarea } from './Textarea'

export default function EditProfileModal({ isOpen, setIsOpen, user }) {
	const [formData, setFormData] = useState({
		name: user?.username || '',
		bio: user?.bio || '',
		website: user?.website || '',
		avatar: user?.avatar,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [avatarFile, setAvatarFile] = useState(null)
	const [avatarPreview, setAvatarPreview] = useState(null)

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleAvatarChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setAvatarFile(file)

			// Create a preview URL for the selected image
			const previewUrl = URL.createObjectURL(file)
			setAvatarPreview(previewUrl)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			// In a real app, this would upload the avatar and update the profile via API
			// For demo purposes, we'll simulate a delay and update the local storage
			await new Promise((resolve) => setTimeout(resolve, 1500))

			// Get current user data from localStorage
			const userData = localStorage.getItem('user')
			if (userData) {
				const currentUser = JSON.parse(userData)

				// Update user data
				const updatedUser = {
					...currentUser,
					name: formData.username,
					bio: formData.bio,
					website: formData.website,
					// In a real app, avatar would be updated with the uploaded file URL
					// For demo, we'll keep the existing avatar or use the preview
					avatar: avatarPreview || currentUser.avatar,
				}

				// Save updated user data
				localStorage.setItem('user', JSON.stringify(updatedUser))
			}

			// Close the modal and refresh the page to show updated profile
			setIsOpen(false)
			window.location.reload()
		} catch (error) {
			console.error('Error updating profile:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile information here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className='grid gap-4 py-4'>
						<div className='grid gap-2'>
							<Label htmlFor='username'>Username</Label>
							<Input
								id='username'
								name='username'
								value={formData.username}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='bio'>Bio</Label>
							<Textarea
								id='bio'
								name='bio'
								value={formData.bio}
								onChange={handleInputChange}
								className='min-h-[100px]'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type='button' variant='outline' onClick={() => location.reload()}>
							Cancel
						</Button>
						<Button type='submit' disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<img src='./Loader2' alt='loader' className='mr-2 h-4 w-4 animate-spin' />
									Saving...
								</>
							) : (
								'Save changes'
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
