import { PlusIcon } from '@radix-ui/react-icons'
import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import { desc } from 'drizzle-orm'
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

type DeleteActionData = {
	success: boolean
	error?: string
}

export const loader = async () => {
	const comments = await db.query.generalComments.findMany({
		orderBy: desc(schema.generalComments.createdAt),
	})

	return { comments }
}

export default function AppGeneralCommentIndex() {
	const { comments } = useLoaderData<typeof loader>()
	const deleteFetcher = useFetcher<DeleteActionData>()

	const handleDelete = (id: string) => {
		const formData = new FormData()
		formData.append('id', id)
		deleteFetcher.submit(formData, { method: 'post', action: 'delete' })
	}

	return (
		<div className="min-h-screen bg-gray-50/40">
			<div className="max-w-[90rem] mx-auto p-8">
				<div className="flex justify-between items-center mb-6">
					<div>
						<h1 className="text-2xl font-semibold text-gray-900">General Comments</h1>
						<p className="text-sm text-gray-500 mt-1">Manage and generate your comments</p>
					</div>
					<Link to="/app/general-comment/create">
						<Button className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500">
							<PlusIcon className="mr-2 h-4 w-4" />
							New Comment
						</Button>
					</Link>
				</div>

				<div className="bg-white shadow-sm rounded-lg border border-gray-200">
					<Table>
						<TableHeader>
							<TableRow className="bg-gray-50/50">
								<TableHead className="w-[200px]">Title</TableHead>
								<TableHead className="w-[120px]">Author</TableHead>
								<TableHead>Content</TableHead>
								<TableHead className="w-[100px]">Source</TableHead>
								<TableHead className="w-[100px] text-center">Comments</TableHead>
								<TableHead className="w-[120px]">Created At</TableHead>
								<TableHead className="w-[160px] text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{comments.map((comment) => {
								const typeInfo = comment.typeInfo as GeneralCommentTypeTextInfo
								return (
									<TableRow key={comment.id} className="group hover:bg-gray-50/50">
										<TableCell className="font-medium">
											<div className="truncate max-w-[180px]" title={typeInfo.title || 'Untitled'}>
												{typeInfo.title || 'Untitled'}
											</div>
										</TableCell>
										<TableCell>
											<div className="truncate max-w-[100px]" title={comment.author}>
												{comment.author}
											</div>
										</TableCell>
										<TableCell>
											<div className="space-y-3 py-2">
												<div className="bg-gray-50/50 rounded-md p-3">
													<div className="flex items-center space-x-2 mb-2">
														<div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
														<span className="text-xs font-medium text-gray-500">Original</span>
													</div>
													<p className="text-sm text-gray-900 line-clamp-2">{typeInfo.content}</p>
												</div>
												{typeInfo.contentZh && (
													<div className="bg-gray-50/50 rounded-md p-3">
														<div className="flex items-center space-x-2 mb-2">
															<div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
															<span className="text-xs font-medium text-gray-500">Translation</span>
														</div>
														<p className="text-sm text-gray-900 line-clamp-2">{typeInfo.contentZh}</p>
													</div>
												)}
												{typeInfo.images && typeInfo.images.length > 0 && (
													<div className="flex gap-2 overflow-x-auto py-1">
														{typeInfo.images.map((image) => (
															<img key={image} src={image} alt="" className="h-14 w-14 object-cover rounded-md shadow-sm flex-shrink-0" />
														))}
													</div>
												)}
											</div>
										</TableCell>
										<TableCell>
											<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getSourceStyles(comment.source)}`}>
												{comment.source}
											</span>
										</TableCell>
										<TableCell className="text-center">
											<span className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 text-xs font-medium bg-gray-50 text-gray-600 rounded-full">
												{comment.comments?.length || 0}
											</span>
										</TableCell>
										<TableCell>
											<time className="text-sm text-gray-500" dateTime={comment.createdAt}>
												{format(new Date(comment.createdAt), 'MMM d, yyyy')}
											</time>
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
												<Link to={`/app/general-comment/${comment.id}`}>
													<Button variant="outline" size="sm" className="h-8">
														Render
													</Button>
												</Link>
												<AlertDialog>
													<AlertDialogTrigger asChild>
														<Button variant="destructive" size="sm" className="h-8">
															Delete
														</Button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>Are you sure?</AlertDialogTitle>
															<AlertDialogDescription>
																This action cannot be undone. This will permanently delete the comment and all its data.
																{deleteFetcher.state === 'submitting' && <p className="mt-2 text-sm text-yellow-600">Deleting...</p>}
																{deleteFetcher.data?.error && <p className="mt-2 text-sm text-red-600">{deleteFetcher.data.error}</p>}
															</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel>Cancel</AlertDialogCancel>
															<AlertDialogAction onClick={() => handleDelete(comment.id)} disabled={deleteFetcher.state === 'submitting'}>
																{deleteFetcher.state === 'submitting' ? 'Deleting...' : 'Delete'}
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</div>
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

function getSourceStyles(source: string): string {
	switch (source) {
		case 'twitter':
			return 'bg-[#1DA1F2]/10 text-[#1DA1F2]'
		case 'youtube':
			return 'bg-[#FF0000]/10 text-[#FF0000]'
		case 'tiktok':
			return 'bg-black/10 text-black'
		default:
			return 'bg-gray-100 text-gray-600'
	}
}
