import { Form, Link, useLoaderData } from '@remix-run/react'
import { AlertTriangle, CheckCircle, Clock, Download, RotateCcw, Search } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Progress } from '~/components/ui/progress'
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

	// Render status badge
	const renderStatusBadge = (status: string) => {
		switch (status) {
			case 'completed':
				return (
					<Badge className="bg-green-100 text-green-800 flex items-center gap-1">
						<CheckCircle className="h-3 w-3" /> Completed
					</Badge>
				)
			case 'processing':
				return (
					<Badge variant="secondary" className="flex items-center gap-1">
						<RotateCcw className="h-3 w-3 animate-spin" /> Processing
					</Badge>
				)
			case 'queued':
				return (
					<Badge variant="outline" className="flex items-center gap-1">
						<Clock className="h-3 w-3" /> Queued
					</Badge>
				)
			case 'error':
				return (
					<Badge variant="destructive" className="flex items-center gap-1">
						<AlertTriangle className="h-3 w-3" /> Failed
					</Badge>
				)
			default:
				return (
					<Badge variant="outline" className="flex items-center gap-1">
						{status || 'Unknown'}
					</Badge>
				)
		}
	}

	// Render empty state
	const renderEmptyState = () => (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<Search className="h-16 w-16 text-muted-foreground/60 mb-4" />
			<h3 className="text-lg font-medium">No Tasks Available</h3>
			<p className="text-muted-foreground mt-1 mb-4">Tasks will appear here when you create videos</p>
		</div>
	)

	// Format date display
	const formatDate = (timestamp: Date | number | string) => {
		const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
		return date.toLocaleString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
					<p className="text-muted-foreground mt-1">View and manage your video rendering tasks</p>
				</div>
				<Button variant="outline" size="sm" className="gap-1 mt-4 md:mt-0">
					<RotateCcw className="h-4 w-4" /> Refresh
				</Button>
			</div>

			<Card className="shadow-md">
				<CardHeader className="pb-2">
					<CardTitle className="text-xl">Task List</CardTitle>
					<CardDescription>Monitor status and progress of all rendering tasks</CardDescription>
				</CardHeader>
				<CardContent>
					{tasks.length === 0 ? (
						renderEmptyState()
					) : (
						<div className="overflow-x-auto">
							<Table>
								<TableCaption>Showing all {tasks.length} tasks</TableCaption>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[120px]">Type</TableHead>
										<TableHead className="w-[200px]">Description</TableHead>
										<TableHead className="w-[120px]">Status</TableHead>
										<TableHead className="w-[180px]">Progress</TableHead>
										<TableHead className="w-[180px]">Created</TableHead>
										<TableHead className="text-right w-[120px]">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{tasks.map((task) => (
										<TableRow key={task.id}>
											<TableCell className="font-medium">
												<div className="truncate max-w-[120px]">{task.type}</div>
											</TableCell>
											<TableCell>
												<div className="truncate max-w-[200px]">{task.desc}</div>
											</TableCell>
											<TableCell>{renderStatusBadge(task.status)}</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<Progress value={Number(task.progress) || 0} className="h-2 w-[100px]" />
													<span className="text-xs text-muted-foreground">{task.progress || 0}%</span>
												</div>
											</TableCell>
											<TableCell>
												<time className="text-sm text-muted-foreground">{formatDate(task.createdAt)}</time>
											</TableCell>
											<TableCell className="text-right">
												<div className="flex justify-end items-center gap-2">
													{task.status === 'completed' && (
														<Link to={`/app/tasks/download/${task.id}`} target="_blank" rel="noopener noreferrer">
															<Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
																<Download className="h-4 w-4" /> Download
															</Button>
														</Link>
													)}
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
