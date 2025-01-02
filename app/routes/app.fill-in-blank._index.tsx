import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
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
		<div className="p-8 space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold tracking-tight">Fill in Blanks</h1>
				<Link to="/app/fill-in-blank/create">
					<Button size="lg" className="gap-2">
						<span>Create New Exercise</span>
					</Button>
				</Link>
			</div>

			<div className="border rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[45%]">Id</TableHead>
							<TableHead className="w-[25%]">Created At</TableHead>
							<TableHead className="text-right w-[30%]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{fillInBlanks.map((fillInBlank) => (
							<TableRow key={fillInBlank.id}>
								<TableCell className="font-medium">{fillInBlank.id}</TableCell>
								<TableCell>{format(fillInBlank.createdAt, 'yyyy-MM-dd HH:mm')}</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Link to={`/app/fill-in-blank/${fillInBlank.id}`}>
											<Button variant="outline" size="sm" className="gap-2">
												<BookOpen className="w-4 h-4" />
												<span>View</span>
											</Button>
										</Link>
										<deleteFetcher.Form method="post" action={`/app/fill-in-blank/${fillInBlank.id}/delete`}>
											<Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 gap-2">
												<Trash className="w-4 h-4" />
												<span>Delete</span>
											</Button>
										</deleteFetcher.Form>
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
