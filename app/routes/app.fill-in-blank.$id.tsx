import type { LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import BackPrevious from '~/components/BackPrevious'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import Sentences from '~/components/business/fill-in-blank/Sentences'
import { db, schema } from '~/lib/drizzle'
import { FillInBlank } from '~/remotion'
import { safeCopyFileToPublic } from '~/utils/file'
import { buildFillInBlankRenderData } from '~/utils/fill-in-blank'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const fillInBlank = await db.query.fillInBlanks.findFirst({
		where: eq(schema.fillInBlanks.id, id),
	})

	invariant(fillInBlank, 'fillInBlank not found')

	const { remotionFillInBlankSentences, totalDurationInFrames, compositionWidth, compositionHeight, playWidth, playHeight } = buildFillInBlankRenderData({
		sentences: fillInBlank.sentences,
		fps: fillInBlank.fps,
	})

	const coverFilePaths = fillInBlank.sentences.map((s) => s.coverFilePath).filter(Boolean)
	const audioFilePaths = fillInBlank.sentences.map((s) => s.audioFilePath).filter(Boolean)

	await Promise.all(
		coverFilePaths.map(async (coverFilePath) => {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			await safeCopyFileToPublic(coverFilePath!)
		}),
	)

	await Promise.all(
		audioFilePaths.map(async (audioFilePath) => {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			await safeCopyFileToPublic(audioFilePath!)
		}),
	)

	return {
		fillInBlank,
		remotionFillInBlankSentences,
		totalDurationInFrames,
		compositionWidth,
		compositionHeight,
		playWidth,
		playHeight,
	}
}

export default function AppFillInBlankPage() {
	const { fillInBlank, remotionFillInBlankSentences, totalDurationInFrames, compositionWidth, compositionHeight, playWidth, playHeight } = useLoaderData<typeof loader>()

	const generateAudioFetcher = useFetcher()

	return (
		<div className="h-full w-full">
			<BackPrevious />
			<div className="flex-auto flex gap-2">
				<div className="flex-auto flex justify-center">
					<div className="flex flex-col gap-2">
						<Player
							component={FillInBlank}
							inputProps={{
								sentences: remotionFillInBlankSentences,
							}}
							durationInFrames={totalDurationInFrames}
							compositionWidth={compositionWidth}
							compositionHeight={compositionHeight}
							fps={fillInBlank.fps}
							style={{
								width: playWidth,
								height: playHeight,
							}}
							controls
						/>

						<div className="flex ">
							<generateAudioFetcher.Form method="post" action="generate-audio">
								<LoadingButtonWithState state={generateAudioFetcher.state} idleText="Generate Audio" />
							</generateAudioFetcher.Form>
						</div>
					</div>
				</div>

				<div>
					<Sentences sentences={remotionFillInBlankSentences} />
				</div>
			</div>
		</div>
	)
}
