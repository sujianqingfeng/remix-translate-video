import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { desc } from 'drizzle-orm'
import { MessageSquare, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
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
		<div className="w-full h-full p-6">
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Id</TableHead>
							<TableHead className="w-[200px]">DownloadId</TableHead>
							<TableHead>Comments</TableHead>
							<TableHead className="text-right w-[150px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{translateComments.map((comment) => (
							<TableRow key={comment.id}>
								<TableCell className="font-medium">{comment.id}</TableCell>
								<TableCell className="truncate">{comment.downloadId}</TableCell>
								<TableCell>{comment.comments?.length}</TableCell>

								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<deleteFetcher.Form method="post" action={`/app/translate-comment/${comment.id}/delete`}>
											<Button variant="ghost" size="sm" className="hover:bg-destructive/10">
												<Trash className="h-4 w-4" />
											</Button>
										</deleteFetcher.Form>

										<Link to={`/app/translate-comment/${comment.id}`}>
											<Button variant="ghost" size="sm" className="hover:bg-primary/10">
												<MessageSquare className="h-4 w-4" />
											</Button>
										</Link>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
