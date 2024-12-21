import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { MessageSquare, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db } from '~/lib/drizzle'

export const loader = async () => {
	const shortTexts = await db.query.shortTexts.findMany()

	return {
		shortTexts,
	}
}

export default function TranslateCommentPage() {
	const { shortTexts } = useLoaderData<typeof loader>()
	const deleteFetcher = useFetcher()

	return (
		<div>
			<Link to="/app/short-text/create">
				<Button>Create</Button>
			</Link>

			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Id</TableHead>
						<TableHead>Title</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{shortTexts.map((shortText) => (
						<TableRow key={shortText.id}>
							<TableCell className="font-medium">{shortText.id}</TableCell>
							<TableCell>{shortText.title}</TableCell>

							<TableCell className="text-right">
								<div className="flex">
									<deleteFetcher.Form method="post" action={`/app/short-text/${shortText.id}/delete`}>
										<Button variant="ghost" size="sm">
											<Trash />
										</Button>
									</deleteFetcher.Form>

									<Link to={`/app/short-text/${shortText.id}`}>
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
