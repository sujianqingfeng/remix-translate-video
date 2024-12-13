import type { LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { Button } from '~/components/ui/button'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	return { id }
}

export default function TranslateCommentPage() {
	const { id } = useLoaderData<typeof loader>()
	const downloadFetcher = useFetcher()

	return (
		<div>
			<downloadFetcher.Form action="/app/downloads/download" method="post">
				<input name="id" value={id} hidden />
				<Button type="submit">Download</Button>
			</downloadFetcher.Form>
		</div>
	)
}
