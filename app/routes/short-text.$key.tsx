import fsp from 'node:fs/promises'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json, useFetcher, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { Button } from '~/components/ui/button'
import type { ShortText } from '~/types'
import { getShortTextOut } from '~/utils/short-text'

export async function loader({ params }: LoaderFunctionArgs) {
	invariant(params.key, 'key is required')
	const { infoFile } = getShortTextOut(params.key)
	const shortTextStr = await fsp.readFile(infoFile, 'utf-8')
	const shortText = JSON.parse(shortTextStr) as ShortText
	return json({ shortText, key: params.key })
}

export default function ShortTextPage() {
	const { shortText, key } = useLoaderData<typeof loader>()

	const generateAudioFetcher = useFetcher()

	return (
		<div>
			{shortText.shortText}

			<generateAudioFetcher.Form action="generate-audio" method="post">
				<input name="key" value={key} hidden readOnly />
				<Button>generate audio</Button>
			</generateAudioFetcher.Form>
		</div>
	)
}
