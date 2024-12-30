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

	return (
		<div className="p-2">
			<div className="flex justify-end items-center">
				<NewDownloadDialog />
			</div>
			<Table>
				<TableCaption>A list of your recent downloads.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Type</TableHead>
						<TableHead>Link</TableHead>
						<TableHead>Title</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{downloads.map((download) => (
						<TableRow key={download.id}>
							<TableCell className="font-medium">{download.type}</TableCell>
							<TableCell>{download.link}</TableCell>
							<TableCell>{download.title}</TableCell>
							<TableCell className="text-right">
								<div className="flex justify-end items-center gap-2">
									<Button variant="ghost" size="sm">
										<Download />
									</Button>

									<deleteFetcher.Form method="post" action={`/app/downloads/delete/${download.id}`}>
										<Button variant="ghost" size="sm">
											<Trash />
										</Button>
									</deleteFetcher.Form>

									<Form method="post" action={`/app/downloads/create-translate-video/${download.id}`}>
										<Button variant="ghost" size="sm">
											<Languages />
										</Button>
									</Form>

									<Form method="post" action={`/app/downloads/create-translate-comment/${download.id}`}>
										<Button variant="ghost" size="sm">
											<MessageSquare />
										</Button>
									</Form>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
