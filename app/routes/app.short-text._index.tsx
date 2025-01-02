import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { desc } from 'drizzle-orm'
import { Headphones, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db, schema } from '~/lib/drizzle'

export const loader = async () => {
	const shortTexts = await db.query.shortTexts.findMany({
		orderBy: desc(schema.shortTexts.createdAt),
	})

	return {
		shortTexts,
	}
}

export default function TranslateCommentPage() {
	const { shortTexts } = useLoaderData<typeof loader>()
	const deleteFetcher = useFetcher()

	return (
		<div className="w-full space-y-4 p-8">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold tracking-tight">Short Texts</h2>
				<Link to="/app/short-text/create">
					<Button>Create New Text</Button>
				</Link>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Id</TableHead>
							<TableHead>Title</TableHead>
							<TableHead className="text-right w-[150px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{shortTexts.map((shortText) => (
							<TableRow key={shortText.id}>
								<TableCell className="font-medium">{shortText.id}</TableCell>
								<TableCell>{shortText.title}</TableCell>

								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<deleteFetcher.Form method="post" action={`/app/short-text/${shortText.id}/delete`}>
											<Button variant="ghost" size="sm">
												<Trash className="h-4 w-4" />
											</Button>
										</deleteFetcher.Form>

										<Link to={`/app/short-text/${shortText.id}`}>
											<Button variant="ghost" size="sm">
												<Headphones className="h-4 w-4" />
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
