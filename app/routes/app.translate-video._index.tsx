import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { Languages, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db } from '~/lib/drizzle'

export const loader = async () => {
	const translateVideos = await db.query.translateVideos.findMany()

	return {
		translateVideos,
	}
}

export default function TranslateCommentPage() {
	const { translateVideos } = useLoaderData<typeof loader>()

	const deleteFetcher = useFetcher()

	return (
		<div>
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
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
							<TableCell>{video.source}</TableCell>

							<TableCell className="text-right">
								<div className="flex">
									<deleteFetcher.Form method="post" action={`/app/translate-video/${video.id}/delete`}>
										<Button variant="ghost" size="sm">
											<Trash />
										</Button>
									</deleteFetcher.Form>

									<Link to={`/app/translate-video/${video.id}`}>
										<Button variant="ghost" size="sm">
											<Languages />
										</Button>
									</Link>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}