import fsp from 'node:fs/promises'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { parseMedia } from '@remotion/media-parser'
import { nodeReader } from '@remotion/media-parser/node'
import { Player } from '@remotion/player'
import invariant from 'tiny-invariant'
import BackPrevious from '~/components/BackPrevious'
import { Button } from '~/components/ui/button'
import { PROXY, USER_AGENT } from '~/constants'
import TranslateVideos from '~/remotion/translate-videos/TranslateVideos'
import type { YoutubeTranscript } from '~/types'
import { copyMaybeOriginalVideoToPublic } from '~/utils'
import { fileExist } from '~/utils/file'
import { getTranslateVideoOut } from '~/utils/translate-video'

const fps = 60

export async function loader({ params }: LoaderFunctionArgs) {
	const { id } = params
	invariant(id, 'id is required')

	const { transcriptsFile, outDir } = getTranslateVideoOut(id)

	let transcripts: YoutubeTranscript[] = []

	const isExist = await fileExist(transcriptsFile)
	if (isExist) {
		const transcriptsStr = await fsp.readFile(transcriptsFile, 'utf-8')
		transcripts = JSON.parse(transcriptsStr)
	}

	const { playVideoFileName, maybePlayVideoFile } =
		await copyMaybeOriginalVideoToPublic({
			outDir,
		})

	let totalDurationInFrames = 100
	if (maybePlayVideoFile) {
		const { durationInSeconds } = await parseMedia({
			src: maybePlayVideoFile,
			fields: {
				durationInSeconds: true,
			},
			reader: nodeReader,
		})

		if (!durationInSeconds) {
			throw new Error('durationInSeconds is required')
		}

		totalDurationInFrames = Math.ceil(durationInSeconds * fps)
	}

	return json({ transcripts, playVideoFileName, fps, totalDurationInFrames })
}

export default function TranslateVideoPage() {
	const { transcripts, playVideoFileName, fps, totalDurationInFrames } =
		useLoaderData<typeof loader>()

	const downloadFetcher = useFetcher()

	return (
		<div className="p-4">
			<BackPrevious />

			<div className="flex gap-4">
				<div>
					<div>
						<Player
							component={TranslateVideos}
							inputProps={{
								playVideoFileName: playVideoFileName,
								transcripts,
							}}
							durationInFrames={totalDurationInFrames}
							compositionWidth={1920}
							compositionHeight={1080}
							fps={+fps}
							style={{
								width: 1280,
								height: 720,
							}}
							controls
						/>
					</div>
					<div>
						{!playVideoFileName && (
							<downloadFetcher.Form method="post" action="download">
								<Button disabled={downloadFetcher.state !== 'idle'}>
									{downloadFetcher.state === 'submitting'
										? 'Loading...'
										: 'Download'}
								</Button>
							</downloadFetcher.Form>
						)}
					</div>
				</div>

				<div>
					{transcripts.map((item) => (
						<div key={item.text}>
							{item.text}
							{item.timestamp[0]}
							{item.timestamp[1]}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
