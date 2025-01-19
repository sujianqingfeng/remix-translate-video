import type { ActionFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData, useSubmit } from '@remix-run/react'
import { desc, eq } from 'drizzle-orm'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db, schema } from '~/lib/drizzle'
import type { GeneralCommentTypeTextInfo } from '~/types'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const id = formData.get('id') as string
	const intent = formData.get('intent') as string

	if (intent === 'delete' && id) {
		await db.delete(schema.generalComments).where(eq(schema.generalComments.id, id))
		return { success: true }
	}

	return { success: false }
}

export const loader = async () => {
	const comments = await db.query.generalComments.findMany({
		orderBy: desc(schema.generalComments.createdAt),
	})

	return { comments }
}

export default function AppGeneralCommentIndex() {
	const { comments } = useLoaderData<typeof loader>()
	const submit = useSubmit()

	const handleDelete = (id: string) => {
		const formData = new FormData()
		formData.append('id', id)
		formData.append('intent', 'delete')
		submit(formData, { method: 'post' })
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">General Comments</h1>
					<Link to="/app/general-comment/create">
						<Button className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500">Create New</Button>
					</Link>
				</div>

				<div className="bg-white shadow rounded-lg overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Author</TableHead>
								<TableHead>Content</TableHead>
								<TableHead>Source</TableHead>
								<TableHead>Comments</TableHead>
								<TableHead>Created At</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{comments.map((comment) => {
								const typeInfo = comment.typeInfo as GeneralCommentTypeTextInfo
								return (
									<TableRow key={comment.id}>
										<TableCell className="font-medium">{typeInfo.title || 'Untitled'}</TableCell>
										<TableCell>{comment.author}</TableCell>
										<TableCell className="max-w-md">
											<div className="space-y-1">
												<p className="text-sm text-gray-900 line-clamp-2">{typeInfo.content}</p>
												{typeInfo.contentZh && <p className="text-sm text-gray-500 line-clamp-2">{typeInfo.contentZh}</p>}
											</div>
											{typeInfo.images && typeInfo.images.length > 0 && (
												<div className="flex gap-1 mt-2">
													{typeInfo.images.map((image) => (
														<img key={image} src={image} alt="" className="h-8 w-8 object-cover rounded" />
													))}
												</div>
											)}
										</TableCell>
										<TableCell>
											<span
												className="px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
												style={{ backgroundColor: getSourceColor(comment.source), color: comment.source === 'tiktok' ? 'white' : 'inherit' }}
											>
												{comment.source}
											</span>
										</TableCell>
										<TableCell>{comment.comments?.length || 0}</TableCell>
										<TableCell>{new Date(comment.createdAt).toLocaleDateString()}</TableCell>
										<TableCell className="text-right space-x-2">
											<Link to={`/app/general-comment/${comment.id}`}>
												<Button variant="outline" size="sm">
													Render
												</Button>
											</Link>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button variant="destructive" size="sm">
														Delete
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>Are you sure?</AlertDialogTitle>
														<AlertDialogDescription>This action cannot be undone. This will permanently delete the comment and all its data.</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction onClick={() => handleDelete(comment.id)}>Delete</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	)
}

function getSourceColor(source: string): string {
	switch (source) {
		case 'twitter':
			return '#1DA1F2'
		case 'youtube':
			return '#FF0000'
		case 'tiktok':
			return '#000000'
		default:
			return '#6B7280'
	}
}
