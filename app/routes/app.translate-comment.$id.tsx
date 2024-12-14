import type { LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	return { id }
}

export default function TranslateCommentPage() {
	const { id } = useLoaderData<typeof loader>()
	const downloadInfoFetcher = useFetcher()
	const downloadVideoFetcher = useFetcher()
	const downloadCommentsFetcher = useFetcher()

	return (
		<div>
			<div className="flex gap-2">
				<downloadInfoFetcher.Form action="/app/downloads/download-info" method="post">
					<input name="id" value={id} hidden readOnly />
					<LoadingButtonWithState state={downloadInfoFetcher.state} idleText="Download info" />
				</downloadInfoFetcher.Form>

				<downloadVideoFetcher.Form action="/app/downloads/download-video" method="post">
					<input name="id" value={id} hidden readOnly />
					<LoadingButtonWithState state={downloadVideoFetcher.state} idleText="Download video" />
				</downloadVideoFetcher.Form>

				<downloadCommentsFetcher.Form action="/app/downloads/download-comments" method="post">
					<input name="id" value={id} hidden readOnly />
					<LoadingButtonWithState state={downloadCommentsFetcher.state} idleText="Download comments" />
				</downloadCommentsFetcher.Form>
			</div>
		</div>
	)
}
