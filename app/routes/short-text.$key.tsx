import fsp from 'node:fs/promises'
import path from 'node:path'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { Copy } from 'lucide-react'
import invariant from 'tiny-invariant'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import { PUBLIC_DIR, SHORT_TEXT_AUDIO_FILE } from '~/constants'
import { toast } from '~/hooks/use-toast'
import { ShortTexts } from '~/remotion/short-texts/ShortTexts'
import { buildRemotionRenderData } from '~/utils/short-text'

async function copyAudioToPublic(audioFile: string) {
	const destPath = path.join(PUBLIC_DIR, SHORT_TEXT_AUDIO_FILE)
	await fsp.copyFile(audioFile, destPath)
}

export async function loader({ params }: LoaderFunctionArgs) {
	invariant(params.key, 'key is required')

	const fps = 120

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

	const width = shortText.direction ? 1920 : 1080
	const height = shortText.direction ? 1080 : 1920

	const playWidth = shortText.direction ? 1080 : 720
	const playHeight = shortText.direction ? 720 : 1080

	const title = `坚持100天打卡 每日英语听读小短文 | ${shortText.titleZh}`

	const onCopy = async (text: string) => {
		await navigator.clipboard.writeText(text)
		toast({
			title: 'copy successful!',
		})
	}

	const words = shortText.words
		.map((word) => `${word.word}：${word.translation}`)
		.join('\n')

	return (
		<div className="h-screen p-4">
			<div className="flex justify-center gap-6">
				<div>
					{audioExist && (
						<Player
							component={ShortTexts}
							inputProps={{
								wordTranscripts,
								littleDifficultWords: shortText.words.map((item) => item.word),
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
								width: playWidth,
								height: playHeight,
							}}
							controls
						/>
					)}

					<div>
						{!audioExist && <p>Audio not found</p>}

						<div className="flex flex-col gpa-4 mt-2">
							<p className="flex items-center gap-2">
								{title}
								<Copy
									className="cursor-pointer"
									onClick={() => onCopy(title)}
								/>
							</p>

							<p className="flex items-center gap-2 whitespace-pre-wrap">
								{words}
								<Copy
									className="cursor-pointer"
									onClick={() => onCopy(words)}
								/>
							</p>
						</div>

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
			</div>
		</div>
	)
}
