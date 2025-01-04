import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import { desc } from 'drizzle-orm'
import { BookOpen, Plus, Trash } from 'lucide-react'
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
		<div className="p-8 max-w-7xl mx-auto space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Fill in Blanks</h1>
					<p className="text-muted-foreground mt-1">Create and manage your fill-in-the-blank exercises</p>
				</div>
				<Link to="/app/fill-in-blank/create">
					<Button size="lg" className="gap-2">
						<Plus className="w-5 h-5" />
						<span>Create New Exercise</span>
					</Button>
				</Link>
			</div>

			<div className="border rounded-lg overflow-hidden">
				<Table>
					<TableCaption>
						{fillInBlanks.length === 0 ? (
							<div className="py-12 text-center">
								<p className="text-muted-foreground">No exercises created yet</p>
								<Link to="/app/fill-in-blank/create" className="mt-4 inline-block">
									<Button variant="outline" size="sm" className="gap-2">
										<Plus className="w-4 h-4" />
										<span>Create your first exercise</span>
									</Button>
								</Link>
							</div>
						) : (
							`A list of your ${fillInBlanks.length} fill-in-blank exercises`
						)}
					</TableCaption>
					{fillInBlanks.length > 0 && (
						<>
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
													<Button variant="outline" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive gap-2">
														<Trash className="w-4 h-4" />
														<span>Delete</span>
													</Button>
												</deleteFetcher.Form>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</>
					)}
				</Table>
			</div>
		</div>
	)
}
