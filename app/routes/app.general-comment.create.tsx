import type { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect, useActionData, useNavigate } from '@remix-run/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { db } from '~/lib/drizzle'
import { schema } from '~/lib/drizzle'
import type { Comment } from '~/types'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const author = formData.get('author') as string
	const title = formData.get('title') as string
	const content = formData.get('content') as string
	const contentZh = formData.get('contentZh') as string
	const fps = Number(formData.get('fps')) || 30
	const coverDurationInSeconds = Number(formData.get('coverDurationInSeconds')) || 3
	const secondsForEvery30Words = Number(formData.get('secondsForEvery30Words')) || 3
	const images = JSON.parse((formData.get('images') as string) || '[]') as string[]
	const comments = JSON.parse((formData.get('comments') as string) || '[]') as Comment[]
	const source = (formData.get('source') as string) || 'manual'

	await db.insert(schema.generalComments).values({
		type: 'text',
		author,
		typeInfo: {
			title,
			content,
			contentZh,
			images,
		},
		comments,
		fps,
		coverDurationInSeconds,
		secondsForEvery30Words,
		source: source as 'twitter' | 'youtube' | 'tiktok' | 'manual',
	})

	return redirect('/app/general-comment')
}

export default function AppGeneralCommentCreate() {
	const [images, setImages] = useState<string[]>([])
	const [comments, setComments] = useState<Comment[]>([])
	const [newImage, setNewImage] = useState('')
	const [newComment, setNewComment] = useState<Partial<Comment>>({
		content: '',
		author: '',
		likes: '0',
		authorThumbnail: '',
		publishedTime: new Date().toISOString(),
	})
	const [source, setSource] = useState<string>('manual')

	// If the action was successful, navigate back to the index page
	const handleAddImage = () => {
		if (newImage) {
			setImages([...images, newImage])
			setNewImage('')
		}
	}

	const handleRemoveImage = (index: number) => {
		setImages(images.filter((_, i) => i !== index))
	}

	const handleAddComment = () => {
		if (newComment.content && newComment.author) {
			setComments([
				...comments,
				{
					content: newComment.content,
					author: newComment.author,
					likes: newComment.likes || '0',
					authorThumbnail: newComment.authorThumbnail || '',
					publishedTime: newComment.publishedTime || new Date().toISOString(),
				} as Comment,
			])
			setNewComment({
				content: '',
				author: '',
				likes: '0',
				authorThumbnail: '',
				publishedTime: new Date().toISOString(),
			})
		}
	}

	const handleRemoveComment = (index: number) => {
		setComments(comments.filter((_, i) => i !== index))
	}

	const handleImportTwitterData = async () => {
		try {
			const fileInput = document.createElement('input')
			fileInput.type = 'file'
			fileInput.accept = '.json'

			fileInput.onchange = async (e) => {
				const file = (e.target as HTMLInputElement).files?.[0]
				if (!file) return

				const reader = new FileReader()
				reader.onload = (e) => {
					const data = JSON.parse(e.target?.result as string)

					// Set author and content
					const authorInput = document.querySelector('input[name="author"]') as HTMLInputElement
					if (authorInput) authorInput.value = data.author || ''

					const contentTextarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
					if (contentTextarea) contentTextarea.value = data.content || ''

					// Set images from media
					const newImages = data.media?.filter((m: any) => m.type === 'photo').map((m: any) => m.url) || []
					setImages(newImages)

					// Set comments
					const formattedComments =
						data.comments?.map((c: any, index: number) => ({
							content: c.content,
							author: c.author,
							likes: String(c.likes || 0),
							authorThumbnail: '',
							publishedTime: format(new Date(c.timestamp), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
							id: `${c.author}-${c.timestamp}-${index}`,
						})) || []
					setComments(formattedComments)

					// Set source
					setSource('twitter')
				}
				reader.readAsText(file)
			}

			fileInput.click()
		} catch (error) {
			console.error('Error importing Twitter data:', error)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Create General Comment</h1>
					<Button onClick={handleImportTwitterData} className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500">
						Import Twitter Data
					</Button>
				</div>
				<Form method="post" className="space-y-6">
					{/* Basic Info Card */}
					<div className="bg-white shadow rounded-lg p-6 space-y-4">
						<h2 className="text-xl font-semibold text-gray-900 pb-4 border-b">Basic Information</h2>
						<div className="grid grid-cols-1 gap-4">
							<input type="hidden" name="source" value={source} />
							<div>
								<label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
									Author
								</label>
								<Input id="author" type="text" name="author" required />
							</div>

							<div>
								<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
									Title
								</label>
								<Input id="title" type="text" name="title" />
							</div>

							<div>
								<label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
									Content
								</label>
								<Textarea id="content" name="content" rows={4} className="resize-none" />
							</div>

							<div>
								<label htmlFor="contentZh" className="block text-sm font-medium text-gray-700 mb-1">
									Content (Chinese)
								</label>
								<Textarea id="contentZh" name="contentZh" rows={4} className="resize-none" />
							</div>
						</div>
					</div>

					{/* Images Card */}
					<div className="bg-white shadow rounded-lg p-6 space-y-4">
						<h2 className="text-xl font-semibold text-gray-900 pb-4 border-b">Images</h2>
						<div className="space-y-4">
							<div className="flex gap-3">
								<Input type="text" value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="Enter image URL" className="flex-1" />
								<Button type="button" onClick={handleAddImage} className="px-6 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500">
									Add Image
								</Button>
							</div>
							<input type="hidden" name="images" value={JSON.stringify(images)} />
							<div className="space-y-3">
								{images.map((image, index) => (
									<div key={`image-${image}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
										<img
											src={image}
											alt="Preview"
											className="w-12 h-12 object-cover rounded"
											onError={(e) => {
												;(e.target as HTMLImageElement).src = 'https://placehold.co/48x48/png?text=Error'
											}}
										/>
										<span className="flex-1 truncate text-gray-600">{image}</span>
										<Button type="button" variant="destructive" onClick={() => handleRemoveImage(index)} className="shrink-0">
											Remove
										</Button>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Comments Card */}
					<div className="bg-white shadow rounded-lg p-6 space-y-4">
						<h2 className="text-xl font-semibold text-gray-900 pb-4 border-b">Comments</h2>
						<div className="space-y-4">
							<div className="bg-gray-50 p-4 rounded-lg space-y-3">
								<Input type="text" value={newComment.author} onChange={(e) => setNewComment({ ...newComment, author: e.target.value })} placeholder="Comment author" />
								<Textarea
									value={newComment.content}
									onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
									placeholder="Comment content"
									rows={2}
									className="resize-none"
								/>
								<div className="flex gap-3">
									<Input type="text" value={newComment.likes} onChange={(e) => setNewComment({ ...newComment, likes: e.target.value })} placeholder="Likes" className="w-1/3" />
									<Input
										type="text"
										value={newComment.authorThumbnail}
										onChange={(e) => setNewComment({ ...newComment, authorThumbnail: e.target.value })}
										placeholder="Author thumbnail URL"
										className="flex-1"
									/>
								</div>
								<Button type="button" onClick={handleAddComment} className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500">
									Add Comment
								</Button>
							</div>
							<input type="hidden" name="comments" value={JSON.stringify(comments)} />
							<div className="space-y-3">
								{comments.map((comment, index) => (
									<div key={`${comment.author}-${comment.publishedTime}-${index}`} className="bg-gray-50 p-4 rounded-lg">
										<div className="flex items-start gap-3">
											<img src={comment.authorThumbnail || 'https://placehold.co/40x40/png?text=User'} alt={comment.author} className="w-10 h-10 rounded-full object-cover" />
											<div className="flex-1 min-w-0">
												<div className="flex items-center justify-between gap-2">
													<div className="font-medium text-gray-900">{comment.author}</div>
													<Button type="button" variant="destructive" onClick={() => handleRemoveComment(index)} className="shrink-0">
														Remove
													</Button>
												</div>
												<div className="mt-1 text-gray-600">{comment.content}</div>
												<div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
													<span>👍 {comment.likes}</span>
													<span>•</span>
													<span>{new Date(comment.publishedTime).toLocaleDateString()}</span>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Settings Card */}
					<div className="bg-white shadow rounded-lg p-6 space-y-4">
						<h2 className="text-xl font-semibold text-gray-900 pb-4 border-b">Video Settings</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label htmlFor="fps" className="block text-sm font-medium text-gray-700 mb-1">
									FPS
								</label>
								<Input id="fps" type="number" name="fps" defaultValue={30} />
							</div>

							<div>
								<label htmlFor="coverDurationInSeconds" className="block text-sm font-medium text-gray-700 mb-1">
									Cover Duration (seconds)
								</label>
								<Input id="coverDurationInSeconds" type="number" name="coverDurationInSeconds" defaultValue={3} />
							</div>

							<div>
								<label htmlFor="secondsForEvery30Words" className="block text-sm font-medium text-gray-700 mb-1">
									Seconds per 30 Words
								</label>
								<Input id="secondsForEvery30Words" type="number" name="secondsForEvery30Words" defaultValue={3} />
							</div>
						</div>
					</div>

					<Button type="submit" className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 focus:ring-blue-500">
						Create General Comment
					</Button>
				</Form>
			</div>
		</div>
	)
}
