import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { desc } from 'drizzle-orm'
import { Languages, Plus, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db, schema } from '~/lib/drizzle'

export const loader = async () => {
	const translateVideos = await db.query.translateVideos.findMany({
		orderBy: desc(schema.translateVideos.createdAt),
	})

	return {
		translateVideos,
	}
}

export default function TranslateCommentPage() {
	const { translateVideos } = useLoaderData<typeof loader>()
	const deleteFetcher = useFetcher()

	return (
		<div className="mx-auto max-w-7xl space-y-8 p-8">
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold tracking-tight">Translate Videos</h1>
					<Link to="/app/translate-video/create">
						<Button className="flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200">
							<Plus className="h-4 w-4" />
							Create New Video
						</Button>
					</Link>
				</div>
				<Separator className="my-6" />
			</div>

			<div className="rounded-lg border bg-card shadow-sm hover:shadow-md transition-all duration-200">
				<Table>
					<TableCaption>
						{translateVideos.length === 0 ? (
							<div className="py-12 text-center">
								<p className="text-lg font-medium text-muted-foreground">No videos found</p>
								<p className="mt-2 text-sm text-muted-foreground/80">Create your first video to get started</p>
							</div>
						) : (
							'A list of your translate videos'
						)}
					</TableCaption>
					<TableHeader>
						<TableRow className="hover:bg-muted/50">
							<TableHead className="w-[100px] font-medium">Id</TableHead>
							<TableHead className="font-medium">Source</TableHead>
							<TableHead className="text-right font-medium">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{translateVideos.map((video) => (
							<TableRow key={video.id} className="group hover:bg-muted/50">
								<TableCell className="font-medium">{video.id}</TableCell>
								<TableCell className="max-w-[400px] truncate">{video.source}</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-3">
										<Link to={`/app/translate-video/${video.id}`}>
											<Button variant="outline" size="sm" className="flex items-center gap-2 hover:bg-primary/5 transition-colors">
												<Languages className="h-4 w-4" />
												Translate
											</Button>
										</Link>
										<deleteFetcher.Form method="post" action={`/app/translate-video/${video.id}/delete`}>
											<Button
												variant="outline"
												size="sm"
												className="flex items-center gap-2 text-destructive hover:bg-destructive/90 hover:text-destructive-foreground transition-colors"
											>
												<Trash className="h-4 w-4" />
												Delete
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
