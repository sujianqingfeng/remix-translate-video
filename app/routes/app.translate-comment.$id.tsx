import type { LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import Comments from '~/components/business/translate-comment/Comments'
import { db, schema } from '~/lib/drizzle'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const translateComment = await db.query.translateComments.findFirst({
		where: eq(schema.translateComments.id, id),
	})

	if (!translateComment) {
		throw new Error('id is not correct')
	}

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, translateComment.downloadId),
	})

	if (!download) {
		throw new Error('download is not correct')
	}

	return { dId: translateComment?.downloadId, id, download, comments: translateComment.comments }
}

export default function TranslateCommentPage() {
	const { dId, comments } = useLoaderData<typeof loader>()
	const downloadInfoFetcher = useFetcher()
	const downloadVideoFetcher = useFetcher()
	const downloadCommentsFetcher = useFetcher()

	return (
		<div className="w-full h-full flex gap-2">
			<div className="flex flex-col gap-2 flex-1">
				<div>ffff</div>
				<div className="flex gap-2">
					<downloadInfoFetcher.Form action="/app/downloads/download-info" method="post">
						<input name="id" value={dId} hidden readOnly />
						<LoadingButtonWithState state={downloadInfoFetcher.state} idleText="Download info" />
					</downloadInfoFetcher.Form>

					<downloadVideoFetcher.Form action="/app/downloads/download-video" method="post">
						<input name="id" value={dId} hidden readOnly />
						<LoadingButtonWithState state={downloadVideoFetcher.state} idleText="Download video" />
					</downloadVideoFetcher.Form>
				</div>
			</div>
			<div className="w-[400px] h-full overflow-y-auto">
				{comments?.length ? (
					<Comments comments={comments ?? []} />
				) : (
					<div>
						<p> No comments</p>
						<downloadCommentsFetcher.Form action="download-comments" method="post">
							<LoadingButtonWithState state={downloadCommentsFetcher.state} idleText="Download comments" />
						</downloadCommentsFetcher.Form>
					</div>
				)}
			</div>
		</div>
	)
}
