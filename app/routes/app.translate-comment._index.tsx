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
		<div>
			<Table>
				<TableCaption>A list of your recent translate comments.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Id</TableHead>
						<TableHead>DownloadId</TableHead>
						<TableHead>Comments</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{translateComments.map((comment) => (
						<TableRow key={comment.id}>
							<TableCell className="font-medium">{comment.id}</TableCell>
							<TableCell>{comment.downloadId}</TableCell>
							<TableCell>{comment.comments?.length}</TableCell>

							<TableCell className="text-right">
								<div className="flex">
									<deleteFetcher.Form method="post" action={`/app/translate-comment/${comment.id}/delete`}>
										<Button variant="ghost" size="sm">
											<Trash />
										</Button>
									</deleteFetcher.Form>

									<Link to={`/app/translate-comment/${comment.id}`}>
										<Button variant="ghost" size="sm">
											<MessageSquare />
										</Button>
									</Link>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
