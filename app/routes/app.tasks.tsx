import { Form, Link, useLoaderData } from '@remix-run/react'
import { Download } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { db } from '~/lib/drizzle'
import { taskStatus } from '~/utils/remote-render'

export const loader = async () => {
	const tasks = await db.query.tasks.findMany()

	const tasksWithStatus = await Promise.all(
		tasks.map(async (task) => {
			const status = await taskStatus(task.jobId)

			return {
				...task,
				status: status.state,
				progress: status.progress,
			}
		}),
	)

	return {
		tasks: tasksWithStatus,
	}
}

export default function DownloadsPages() {
	const { tasks } = useLoaderData<typeof loader>()

	return (
		<div className="p-2">
			<Table>
				<TableCaption>A list of your recent downloads.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Type</TableHead>
						<TableHead>Desc</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Progress</TableHead>
						<TableHead>Created At</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tasks.map((task) => (
						<TableRow key={task.id}>
							<TableCell className="font-medium">{task.type}</TableCell>
							<TableCell>{task.desc}</TableCell>
							<TableCell>{task.status}</TableCell>
							<TableCell>{task.progress}</TableCell>
							<TableCell>{task.createdAt.toLocaleString()}</TableCell>
							<TableCell className="text-right">
								<div className="flex justify-end items-center gap-2">
									<Link to={`/app/tasks/download/${task.id}`} target="_blank" rel="noopener noreferrer">
										<Button variant="ghost" size="sm">
											<Download />
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
