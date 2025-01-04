import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import { desc } from 'drizzle-orm'
import { Download, InboxIcon, Languages, MessageSquare, Trash } from 'lucide-react'
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
		<div className="min-h-screen p-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Downloads</h1>
					<NewDownloadDialog />
				</div>

				<div className="rounded-xl border bg-white shadow-sm">
					<Table>
						<TableHeader>
							<TableRow className="bg-slate-50 hover:bg-slate-100">
								<TableHead className="w-[100px] font-bold text-primary">Type</TableHead>
								<TableHead className="font-bold text-primary">Link</TableHead>
								<TableHead className="font-bold text-primary">Author</TableHead>
								<TableHead className="font-bold text-primary">Title</TableHead>
								<TableHead className="text-right font-bold text-primary">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{downloads.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} className="h-48 text-center">
										<div className="flex flex-col items-center justify-center text-muted-foreground">
											<InboxIcon className="h-12 w-12 mb-3 text-muted-foreground/40" />
											<p className="text-sm">No downloads found</p>
											<p className="text-xs mt-1">Click the "New Download" button to add one</p>
										</div>
									</TableCell>
								</TableRow>
							) : (
								downloads.map((download) => (
									<TableRow key={download.id} className="hover:bg-slate-50 transition-colors">
										<TableCell className="font-medium">{download.type}</TableCell>
										<TableCell className="max-w-[300px] truncate text-muted-foreground">{download.link}</TableCell>
										<TableCell className="font-medium">{download.author}</TableCell>
										<TableCell className="font-medium">{download.title}</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end items-center gap-4">
												<downloadFetcher.Form method="post" action="/app/downloads/download-info">
													<input type="hidden" name="id" value={download.id} />
													<Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors duration-200">
														<Download className="h-4 w-4" />
													</Button>
												</downloadFetcher.Form>

												<deleteFetcher.Form method="post" action={`/app/downloads/delete/${download.id}`}>
													<Button variant="ghost" size="sm" className="hover:bg-destructive/10 hover:text-destructive transition-colors duration-200">
														<Trash className="h-4 w-4" />
													</Button>
												</deleteFetcher.Form>

												<Form method="post" action={`/app/downloads/create-translate-video/${download.id}`}>
													<Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors duration-200">
														<Languages className="h-4 w-4" />
													</Button>
												</Form>

												<Form method="post" action={`/app/downloads/create-translate-comment/${download.id}`}>
													<Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors duration-200">
														<MessageSquare className="h-4 w-4" />
													</Button>
												</Form>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	)
}
