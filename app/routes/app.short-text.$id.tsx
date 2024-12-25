import type { LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import { db, schema } from '~/lib/drizzle'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params

	invariant(id, 'id is required')

	const shortText = await db.query.shortTexts.findFirst({
		where: eq(schema.shortTexts.id, id),
	})

	return {
		shortText,
	}
}

export default function ShortTextPage() {
	const { shortText } = useLoaderData<typeof loader>()

	const generateAudioFetcher = useFetcher()
	return (
		<div className="flex">
			<div>fff</div>
			<div>
				<generateAudioFetcher.Form action="generate-audio" method="post">
					{/* <input name="key" value={key} hidden readOnly /> */}
					<LoadingButtonWithState state={generateAudioFetcher.state} idleText="Generate audio" />
				</generateAudioFetcher.Form>
			</div>
		</div>
	)
}
