import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { desc } from 'drizzle-orm'
import { FileText, Headphones, Plus, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db, schema } from '~/lib/drizzle'

export const loader = async () => {
	const shortTexts = await db.query.shortTexts.findMany({
		orderBy: desc(schema.shortTexts.createdAt),
	})

	return {
		shortTexts,
	}
}

export default function TranslateCommentPage() {
	const { shortTexts } = useLoaderData<typeof loader>()
	const deleteFetcher = useFetcher()

	return (
		<div className="container mx-auto max-w-6xl space-y-8 p-8">
			<div className="flex justify-between items-center border-b pb-6">
				<div className="space-y-1">
					<h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Short Texts</h2>
					<p className="text-sm text-gray-500">Manage and listen to your collection of short texts</p>
				</div>
				<Link to="/app/short-text/create">
					<Button className="hover:scale-105 transition-all duration-200 shadow-sm" size="lg">
						<Plus className="h-5 w-5 mr-2" />
						Create New Text
					</Button>
				</Link>
			</div>

			{shortTexts.length === 0 ? (
				<div className="text-center py-12 border rounded-lg bg-white shadow-sm">
					<FileText className="mx-auto h-12 w-12 text-gray-400" />
					<h3 className="mt-4 text-lg font-semibold text-gray-900">No texts yet</h3>
					<p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">Get started by creating your first short text. You can add, manage, and listen to them here.</p>
					<Link to="/app/short-text/create" className="mt-6 inline-block">
						<Button>
							<Plus className="h-4 w-4 mr-2" />
							Create your first text
						</Button>
					</Link>
				</div>
			) : (
				<div className="rounded-xl border shadow-sm bg-white overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow className="bg-gray-50/80">
								<TableHead className="w-[100px] font-bold">Id</TableHead>
								<TableHead className="font-bold">Title</TableHead>
								<TableHead className="text-right w-[150px] font-bold">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{shortTexts.map((shortText) => (
								<TableRow key={shortText.id} className="hover:bg-gray-50/50 transition-colors">
									<TableCell className="font-medium text-gray-600">{shortText.id}</TableCell>
									<TableCell className="font-medium text-gray-700">{shortText.title}</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-3">
											<deleteFetcher.Form method="post" action={`/app/short-text/${shortText.id}/delete`}>
												<Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 transition-colors">
													<Trash className="h-4 w-4" />
												</Button>
											</deleteFetcher.Form>

											<Link to={`/app/short-text/${shortText.id}`}>
												<Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
													<Headphones className="h-4 w-4" />
												</Button>
											</Link>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	)
}
