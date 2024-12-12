import { useLoaderData } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import type { downloads } from '~/db/schema'
import NewDownloadDialog from './NewDownloadDialog'

export const loader = async () => {
	return {
		downloads: [] as (typeof downloads.$inferSelect)[],
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
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
