import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { desc } from 'drizzle-orm'
import { MessageSquare, Plus, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db, schema } from '~/lib/drizzle'

export const loader = async () => {
	const translateComments = await db.query.translateComments.findMany({
		orderBy: desc(schema.translateComments.createdAt),
	})

	return {
		translateComments,
	}
}

export default function TranslateCommentPage() {
	const { translateComments } = useLoaderData<typeof loader>()
	const deleteFetcher = useFetcher()

	return (
		<div className="w-full h-full p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">Translate Comments</h1>
				</div>
				<Link to="/app/translate-comment/new">
					<Button>
						<Plus className="h-4 w-4 mr-2" />
						New Comment
					</Button>
				</Link>
			</div>

			<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-[100px]">Id</TableHead>
							<TableHead className="w-[200px]">DownloadId</TableHead>
							<TableHead>Comments</TableHead>
							<TableHead className="text-right w-[200px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{translateComments.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
									No comments found
								</TableCell>
							</TableRow>
						) : (
							translateComments.map((comment) => (
								<TableRow key={comment.id} className="hover:bg-muted/50">
									<TableCell className="font-medium">{comment.id}</TableCell>
									<TableCell className="font-mono text-sm truncate">{comment.downloadId}</TableCell>
									<TableCell>{comment.comments?.length || 0} comments</TableCell>

									<TableCell className="text-right">
										<div className="flex justify-end gap-2">
											<deleteFetcher.Form method="post" action={`/app/translate-comment/${comment.id}/delete`}>
												<Button variant="ghost" size="sm">
													<Trash className="h-4 w-4 mr-2" />
													Delete
												</Button>
											</deleteFetcher.Form>

											<Link to={`/app/translate-comment/${comment.id}`}>
												<Button variant="ghost" size="sm" className="hover:bg-primary/10">
													<MessageSquare className="h-4 w-4 mr-2" />
													View
												</Button>
											</Link>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
