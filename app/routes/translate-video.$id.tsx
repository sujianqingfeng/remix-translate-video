import fsp from 'node:fs/promises'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { parseMedia } from '@remotion/media-parser'
import { nodeReader } from '@remotion/media-parser/node'
import { Player } from '@remotion/player'
import { Trash } from 'lucide-react'
import invariant from 'tiny-invariant'
import BackPrevious from '~/components/BackPrevious'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import { Button } from '~/components/ui/button'
import TranslateVideos from '~/remotion/translate-videos/TranslateVideos'
import type { Transcript } from '~/types'
import { copyMaybeOriginalVideoToPublic } from '~/utils'
import { fileExist } from '~/utils/file'
import { getTranslateVideoOut } from '~/utils/translate-video'

const fps = 30

export async function loader({ params }: LoaderFunctionArgs) {
	const { id } = params
	invariant(id, 'id is required')

	const { transcriptsFile, outDir } = getTranslateVideoOut(id)

	let transcripts: Transcript[] = []

	const isExist = await fileExist(transcriptsFile)
	if (isExist) {
		const transcriptsStr = await fsp.readFile(transcriptsFile, 'utf-8')
		transcripts = JSON.parse(transcriptsStr)
	}

	const { playVideoFileName, maybePlayVideoFile } = await copyMaybeOriginalVideoToPublic({
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

	return { transcripts, playVideoFileName, fps, totalDurationInFrames }
}

export default function TranslateVideoPage() {
	const { transcripts, playVideoFileName, fps, totalDurationInFrames } = useLoaderData<typeof loader>()

	const downloadFetcher = useFetcher()
	const convertFetcher = useFetcher()
	const translateFetcher = useFetcher()
	const renderFetcher = useFetcher()
	const deleteFetcher = useFetcher()

	return (
		<div className="p-4">
			<BackPrevious />

			<div className="flex gap-4 mt-2">
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
					<div className="flex items-center gap-2 mt-2">
						{!playVideoFileName && (
							<downloadFetcher.Form method="post" action="download">
								<LoadingButtonWithState state={downloadFetcher.state} idleText="Download" />
							</downloadFetcher.Form>
						)}

						{transcripts.length === 0 && (
							<convertFetcher.Form method="post" action="convert">
								<LoadingButtonWithState state={convertFetcher.state} idleText="Covert" />
							</convertFetcher.Form>
						)}

						<renderFetcher.Form method="post" action="new-render">
							<input type="hidden" name="fps" value={fps} />
							<input type="hidden" name="totalDurationInFrames" value={totalDurationInFrames} />
							<input type="hidden" name="playVideoFileName" value={playVideoFileName} />

							<LoadingButtonWithState state={renderFetcher.state} idleText="Render" />
						</renderFetcher.Form>

						<translateFetcher.Form method="post" action="translate">
							<LoadingButtonWithState state={translateFetcher.state} idleText="Translate" />
						</translateFetcher.Form>
					</div>
				</div>

				<div>
					{transcripts.map((item, index) => (
						<div key={item.start} className="border-b border-gray-200 pb-2">
							<div className="flex items-center justify-between gap-2">
								{item.start} - {item.end}
								<deleteFetcher.Form method="post" action="delete-transcript">
									<input type="hidden" name="index" value={index} />
									<Button variant="ghost" size="icon" type="submit" className="h-8 w-8 text-destructive hover:text-destructive/90">
										<Trash size={16} />
									</Button>
								</deleteFetcher.Form>
							</div>
							<div>{item.text}</div>
							<div>{item.textLiteralTranslation}</div>
							<div>{item.textInterpretation}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
