import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { desc } from 'drizzle-orm'
import { Languages, Plus, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
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
		<div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
			<div className="p-8 space-y-6">
				<div className="px-1">
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Translate Videos</h1>
							<p className="text-muted-foreground">Manage and create your video translations</p>
						</div>
						<Link to="/app/translate-video/create">
							<Button className="flex items-center gap-2 ring-offset-background transition-all duration-300 bg-primary/90 hover:bg-primary hover:ring-2 hover:ring-primary/20 hover:ring-offset-2">
								<Plus className="h-4 w-4" />
								Create New Video
							</Button>
						</Link>
					</div>
				</div>

				<div className="rounded-xl border border-black/[0.06] bg-background/60 backdrop-blur-sm shadow-[0_0_1px_rgba(0,0,0,0.08),0_2px_12px_-3px_rgba(0,0,0,0.08)] hover:shadow-[0_0_1px_rgba(0,0,0,0.08),0_2px_16px_-4px_rgba(0,0,0,0.12)] transition-shadow duration-300">
					<Table>
						<TableCaption>
							{translateVideos.length === 0 && (
								<div className="py-16 text-center">
									<div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted/30 flex items-center justify-center">
										<Languages className="h-8 w-8 text-muted-foreground/60" />
									</div>
									<p className="text-lg font-medium text-muted-foreground">No videos found</p>
									<p className="mt-2 text-sm text-muted-foreground/80">Create your first video to get started</p>
								</div>
							)}
						</TableCaption>
						<TableHeader>
							<TableRow className="hover:bg-muted/50 border-b border-border/40">
								<TableHead className="w-[100px] font-semibold">Id</TableHead>
								<TableHead className="font-semibold">Source</TableHead>
								<TableHead className="font-semibold">Title</TableHead>
								<TableHead className="text-right font-semibold">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{translateVideos.map((video) => (
								<TableRow key={video.id} className="group hover:bg-muted/30 transition-colors duration-200">
									<TableCell className="font-medium text-primary/80">{video.id}</TableCell>
									<TableCell className="max-w-[400px] truncate font-medium">{video.source}</TableCell>
									<TableCell className="max-w-[400px] truncate font-medium">{video.title}</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-3">
											<Link to={`/app/translate-video/${video.id}`}>
												<Button
													variant="outline"
													size="sm"
													className="flex items-center gap-2 ring-offset-background transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:ring-2 hover:ring-primary/20 hover:ring-offset-1"
												>
													<Languages className="h-4 w-4" />
													Translate
												</Button>
											</Link>
											<deleteFetcher.Form method="post" action={`/app/translate-video/${video.id}/delete`}>
												<Button
													variant="outline"
													size="sm"
													className="flex items-center gap-2 ring-offset-background text-destructive transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground hover:ring-2 hover:ring-destructive/20 hover:ring-offset-1"
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
		</div>
	)
}
