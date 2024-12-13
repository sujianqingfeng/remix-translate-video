import { Link, useLoaderData } from '@remix-run/react'
import { Download, Languages, MessageSquare } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db } from '~/lib/drizzle'
import NewDownloadDialog from './CreateNewDownloadDialog'

export const loader = async () => {
	const ds = await db.query.downloads.findMany()

	return {
		downloads: ds,
	}
}

export default function DownloadsPages() {
	const { downloads } = useLoaderData<typeof loader>()

	return (
		<div className="p-2">
			<div className="flex justify-end items-center">
				<NewDownloadDialog />
			</div>
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Type</TableHead>
						<TableHead>Link</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{downloads.map((download) => (
						<TableRow key={download.id}>
							<TableCell className="font-medium">{download.type}</TableCell>
							<TableCell>{download.link}</TableCell>
							<TableCell>{download.link}</TableCell>
							<TableCell className="text-right">
								<Button variant="ghost" size="sm">
									<Download />
								</Button>

								<Button variant="ghost" size="sm">
									<Languages />
								</Button>

								<Link to={`/app/translate-comment/${download.id}`}>
									<Button variant="ghost" size="sm">
										<MessageSquare />
									</Button>
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
