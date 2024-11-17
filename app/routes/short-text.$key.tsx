import fsp from 'node:fs/promises'
import path from 'node:path'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import invariant from 'tiny-invariant'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import { PUBLIC_DIR, SHORT_TEXT_AUDIO_FILE } from '~/constants'
import { ShortTexts } from '~/remotion/short-texts/ShortTexts'
import { buildRemotionRenderData } from '~/utils/short-text'

async function copyAudioToPublic(audioFile: string) {
	const destPath = path.join(PUBLIC_DIR, SHORT_TEXT_AUDIO_FILE)
	await fsp.copyFile(audioFile, destPath)
}

export async function loader({ params }: LoaderFunctionArgs) {
	invariant(params.key, 'key is required')

	const fps = 200

	const {
		totalDurationInFrames,
		wordTranscripts,
		shortText,
		audioExist,
		audioFile,
		audioDuration,
		sentenceTranscript,
	} = await buildRemotionRenderData({
		key: params.key,
		fps,
	})

	if (audioExist) {
		await copyAudioToPublic(audioFile)
	}

	return json({
		shortText,
		key: params.key,
		audioExist,
		wordTranscripts,
		totalDurationInFrames,
		fps,
		playAudioName: SHORT_TEXT_AUDIO_FILE,
		audioDuration,
		sentenceTranscript,
	})
}

export default function ShortTextPage() {
	const {
		shortText,
		key,
		audioExist,
		wordTranscripts,
		totalDurationInFrames,
		fps,
		playAudioName,
		audioDuration,
		sentenceTranscript,
	} = useLoaderData<typeof loader>()

	const generateAudioFetcher = useFetcher()
	const renderFetcher = useFetcher()
	const toggleDirectionFetcher = useFetcher()
	const generateImageFetcher = useFetcher()

	const width = shortText.direction ? 1280 : 720
	const height = shortText.direction ? 720 : 1280

	return (
		<div className="h-screen p-4">
			<div className="flex justify-center gap-6">
				<div>
					{audioExist && (
						<Player
							component={ShortTexts}
							inputProps={{
								wordTranscripts,
								littleDifficultWords: shortText.words,
								playAudioName,
								title: shortText.title,
								titleZh: shortText.titleZh,
								audioDuration,
								shortTextZh: shortText.shortTextZh,
								sentenceTranscript,
								direction: shortText.direction,
							}}
							durationInFrames={totalDurationInFrames}
							compositionWidth={width}
							compositionHeight={height}
							fps={fps}
							style={{
								width,
								height,
							}}
							controls
						/>
					)}

					<div>
						{!audioExist && <p>Audio not found</p>}

						<div className="mt-4 flex gap-2">
							<generateAudioFetcher.Form action="generate-audio" method="post">
								<input name="key" value={key} hidden readOnly />
								<LoadingButtonWithState
									state={generateAudioFetcher.state}
									idleText="Generate audio"
								/>
							</generateAudioFetcher.Form>

							<generateImageFetcher.Form action="generate-image" method="post">
								<input name="key" value={key} hidden readOnly />
								<LoadingButtonWithState
									state={generateImageFetcher.state}
									idleText="Generate image"
								/>
							</generateImageFetcher.Form>

							<toggleDirectionFetcher.Form
								action="toggle-direction"
								method="post"
							>
								<input
									name="direction"
									value={shortText.direction ?? 0}
									hidden
									readOnly
								/>
								<LoadingButtonWithState
									state={toggleDirectionFetcher.state}
									idleText="Toggle direction"
								/>
							</toggleDirectionFetcher.Form>
						</div>

						<div className="mt-4">
							<renderFetcher.Form method="post" action="render">
								<input name="fps" value={fps} hidden readOnly />
								<LoadingButtonWithState
									state={renderFetcher.state}
									idleText="Render"
								/>
							</renderFetcher.Form>
						</div>
					</div>
				</div>

				<div>
					{wordTranscripts.map((item) => (
						<div className="flex justify-between items-center" key={item.start}>
							<div className="text-lg"> {item.part}</div>
							<div className="text-[12px]">
								{item.start / 1000}s - {item.end / 1000}s
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
