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
		<div className="space-y-8 p-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold tracking-tight">Translate Videos</h1>
				<Link to="/app/translate-video/create">
					<Button className="flex items-center gap-2">
						<Plus className="h-4 w-4" />
						Create New Video
					</Button>
				</Link>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Id</TableHead>
							<TableHead>Source</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{translateVideos.map((video) => (
							<TableRow key={video.id}>
								<TableCell className="font-medium">{video.id}</TableCell>
								<TableCell className="max-w-[400px] truncate">{video.source}</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Link to={`/app/translate-video/${video.id}`}>
											<Button variant="outline" size="sm" className="flex items-center gap-2">
												<Languages className="h-4 w-4" />
												Translate
											</Button>
										</Link>
										<deleteFetcher.Form method="post" action={`/app/translate-video/${video.id}/delete`}>
											<Button variant="outline" size="sm" className="flex items-center gap-2 text-destructive hover:bg-destructive/90 hover:text-white">
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
