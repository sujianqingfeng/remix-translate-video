import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import { desc } from 'drizzle-orm'
import { Download, Languages, MessageSquare, Trash } from 'lucide-react'
import NewDownloadDialog from '~/components/business/download/CreateNewDownloadDialog'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db, schema } from '~/lib/drizzle'

export const loader = async () => {
	const ds = await db.query.downloads.findMany({
		orderBy: desc(schema.downloads.createdAt),
	})

	return {
		downloads: ds,
	}
}

export default function DownloadsPages() {
	const { downloads } = useLoaderData<typeof loader>()
	const deleteFetcher = useFetcher()
	const downloadFetcher = useFetcher()

	return (
		<div className="h-full p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold tracking-tight">Downloads</h1>
				<NewDownloadDialog />
			</div>

			<div className="rounded-lg border bg-card w-full">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-muted/50">
							<TableHead className="w-[100px] font-semibold">Type</TableHead>
							<TableHead className="font-semibold">Link</TableHead>
							<TableHead className="font-semibold">Author</TableHead>
							<TableHead className="font-semibold">Title</TableHead>
							<TableHead className="text-right font-semibold">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{downloads.map((download) => (
							<TableRow key={download.id} className="hover:bg-muted/50">
								<TableCell className="font-medium">{download.type}</TableCell>
								<TableCell className="max-w-[300px] truncate">{download.link}</TableCell>
								<TableCell>{download.author}</TableCell>
								<TableCell>{download.title}</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end items-center gap-3">
										<downloadFetcher.Form method="post" action="/app/downloads/download-info">
											<input type="hidden" name="id" value={download.id} />
											<Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
												<Download className="h-4 w-4" />
											</Button>
										</downloadFetcher.Form>

										<deleteFetcher.Form method="post" action={`/app/downloads/delete/${download.id}`}>
											<Button variant="ghost" size="sm" className="hover:bg-destructive/10 hover:text-destructive">
												<Trash className="h-4 w-4" />
											</Button>
										</deleteFetcher.Form>

										<Form method="post" action={`/app/downloads/create-translate-video/${download.id}`}>
											<Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
												<Languages className="h-4 w-4" />
											</Button>
										</Form>

										<Form method="post" action={`/app/downloads/create-translate-comment/${download.id}`}>
											<Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
												<MessageSquare className="h-4 w-4" />
											</Button>
										</Form>
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
