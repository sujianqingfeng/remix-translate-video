import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import { desc } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import { BookOpen, Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db, schema } from '~/lib/drizzle'

export async function loader() {
	const dialogues = await db.query.dialogues.findMany({
		orderBy: desc(schema.dialogues.createdAt),
	})

	return {
		dialogues,
	}
}

export default function DialoguePage() {
	const { dialogues } = useLoaderData<typeof loader>()
	const deleteFetcher = useFetcher()

	return (
		<div className="space-y-8 p-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold tracking-tight">Dialogues</h1>
				<Link to="/app/dialogue/new">
					<Button className="gap-2">
						<Plus className="h-4 w-4" />
						New Dialogue
					</Button>
				</Link>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[45%]">ID</TableHead>
							<TableHead className="w-[25%]">Created At</TableHead>
							<TableHead className="text-right w-[30%]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{dialogues.map((dialogue) => (
							<TableRow key={dialogue.id}>
								<TableCell className="font-medium">{dialogue.id}</TableCell>
								<TableCell>{format(dialogue.createdAt, 'yyyy-MM-dd HH:mm')}</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Link to={`/app/dialogue/${dialogue.id}`}>
											<Button variant="outline" size="sm" className="gap-2">
												<BookOpen className="w-4 h-4" />
												<span>View</span>
											</Button>
										</Link>
										<deleteFetcher.Form method="post" action={`/app/dialogue/${dialogue.id}/delete`}>
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
