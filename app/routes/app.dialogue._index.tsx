import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import { desc } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import { BookOpen, MessageSquare, Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db, schema } from '~/lib/drizzle'
import { cn } from '~/lib/utils'

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
		<div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex items-center justify-between mb-8">
					<div className="space-y-1">
						<h1 className="text-3xl font-bold tracking-tight">Dialogues</h1>
						<p className="text-muted-foreground">Manage and create your dialogue exercises.</p>
					</div>
					<Link to="/app/dialogue/new">
						<Button className="gap-2 shadow-sm hover:shadow transition-all duration-200">
							<Plus className="h-4 w-4" />
							New Dialogue
						</Button>
					</Link>
				</div>

				{dialogues.length === 0 ? (
					<div className="rounded-lg border border-dashed p-12 text-center">
						<MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
						<h3 className="mt-4 text-lg font-semibold">No dialogues yet</h3>
						<p className="mt-2 text-muted-foreground">Create your first dialogue to get started.</p>
						<Link to="/app/dialogue/new">
							<Button variant="secondary" className="mt-6">
								Create Dialogue
							</Button>
						</Link>
					</div>
				) : (
					<div className="rounded-lg border bg-card shadow-sm">
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-muted/50">
									<TableHead className="w-[45%]">ID</TableHead>
									<TableHead className="w-[25%]">Created At</TableHead>
									<TableHead className="text-right w-[30%]">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{dialogues.map((dialogue, index) => (
									<TableRow key={dialogue.id} className={cn('transition-colors hover:bg-muted/50', index === dialogues.length - 1 && 'last:border-0')}>
										<TableCell className="font-medium">{dialogue.id}</TableCell>
										<TableCell>{format(dialogue.createdAt, 'yyyy-MM-dd HH:mm')}</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<Link to={`/app/dialogue/${dialogue.id}`}>
													<Button variant="outline" size="sm" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
														<BookOpen className="w-4 h-4" />
														<span>View</span>
													</Button>
												</Link>
												<deleteFetcher.Form method="post" action={`/app/dialogue/${dialogue.id}/delete`}>
													<Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground gap-2 transition-colors">
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
				)}
			</div>
		</div>
	)
}
