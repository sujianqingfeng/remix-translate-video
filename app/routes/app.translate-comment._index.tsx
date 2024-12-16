import { Link, useLoaderData } from '@remix-run/react'
import { MessageSquare } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db } from '~/lib/drizzle'

export const loader = async () => {
	const translateComments = await db.query.translateComments.findMany()

	return {
		translateComments,
	}
}

export default function TranslateCommentPage() {
	const { translateComments } = useLoaderData<typeof loader>()

	return (
		<div>
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
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
								<Link to={`/app/translate-comment/${comment.id}`}>
									<Button variant="ghost" size="sm">
										<MessageSquare />
									</Button>
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
