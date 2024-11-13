import fsp from 'node:fs/promises'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { HttpsProxyAgent } from 'https-proxy-agent'
import invariant from 'tiny-invariant'
import BackPrevious from '~/components/business/BackPrevious'
import { Button } from '~/components/ui/button'
import { PROXY, USER_AGENT } from '~/constants'
import type { YoutubeTranscript } from '~/types'
import { copyMaybeOriginalVideoToPublic } from '~/utils'
import { fileExist } from '~/utils/file'
import { getTranslateVideoOut } from '~/utils/translate-video'
import { downloadYoutubeHtml } from '~/utils/youtube'
import { downloadYoutubeTranscripts } from '~/utils/youtube/transcripts'

export async function loader({ params }: LoaderFunctionArgs) {
	const { id } = params
	invariant(id, 'id is required')

	const { originalHtmlFile, transcriptsFile, outDir } = getTranslateVideoOut(id)

	let transcripts: YoutubeTranscript[] = []

	const isExist = await fileExist(originalHtmlFile)
	if (!isExist) {
		const agent = new HttpsProxyAgent(PROXY)

		const html = await downloadYoutubeHtml(id, {
			agent,
			userAgent: USER_AGENT,
		})
		await fsp.writeFile(originalHtmlFile, html, 'utf-8')

		transcripts = await downloadYoutubeTranscripts({
			html,
			agent,
		})
		await fsp.writeFile(
			transcriptsFile,
			JSON.stringify(transcripts, null, 2),
			'utf-8',
		)
	} else {
		const transcriptsStr = await fsp.readFile(transcriptsFile, 'utf-8')
		transcripts = JSON.parse(transcriptsStr)
	}

	const { playVideoFileName } = await copyMaybeOriginalVideoToPublic({
		outDir,
	})

	return json({ transcripts, playVideoFileName })
}

export default function TranslateVideoPage() {
	const { transcripts, playVideoFileName } = useLoaderData<typeof loader>()
	return (
		<div>
			<BackPrevious />

			<div className="flex gap-4">
				<div>
					<div>{!playVideoFileName && <Button>Download</Button>}</div>
				</div>

				<div>{JSON.stringify(transcripts, null, 2)}</div>
			</div>
		</div>
	)
}
