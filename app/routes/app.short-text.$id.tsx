import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
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
	return <div>ShortTextPage</div>
}
