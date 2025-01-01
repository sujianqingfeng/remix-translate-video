import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { desc } from 'drizzle-orm'
import { BookOpen, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db, schema } from '~/lib/drizzle'

export const loader = async () => {
	const fillInBlanks = await db.query.fillInBlanks.findMany({
		orderBy: desc(schema.fillInBlanks.createdAt),
	})

	return {
		fillInBlanks,
	}
}

export default function AppFillInBlankIndexPage() {
	const { fillInBlanks } = useLoaderData<typeof loader>()

	const deleteFetcher = useFetcher()

	return (
		<div>
			<Link to="/app/fill-in-blank/create">
				<Button>Create</Button>
			</Link>

			<Table>
				<TableCaption>A list of your recent fill in blanks.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Id</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{fillInBlanks.map((fillInBlank) => (
						<TableRow key={fillInBlank.id}>
							<TableCell className="font-medium">{fillInBlank.id}</TableCell>

							<TableCell className="text-right">
								<div className="flex">
									<deleteFetcher.Form method="post" action={`/app/short-text/${fillInBlank.id}/delete`}>
										<Button variant="ghost" size="sm">
											<Trash />
										</Button>
									</deleteFetcher.Form>

									<Link to={`/app/fill-in-blank/${fillInBlank.id}`}>
										<Button variant="ghost" size="sm">
											<BookOpen />
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
