import fsp from 'node:fs/promises'
import { json, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { Button } from '~/components/ui/button'
import { ShortTexts } from '~/remotion/short-texts/ShortTexts'
import type { ShortTextInputItem } from '~/types'
import {
	getShortTextOut,
	getShortTexts,
	getTotalDurationInFrames,
} from '~/utils/short-text'

const str =
	'crowded, colleagues, experiences, journey, subway, classmates, knowledge'

export const loader = async () => {
	const texts = await getShortTexts()
	const littleDifficultWords = str.split(',').map((word) => word.trim())

	const fps = 60
	const totalDurationInFrames = getTotalDurationInFrames(texts, fps)
	return json({ texts, littleDifficultWords, totalDurationInFrames, fps })
}

export default function ShortTextPage() {
	const { texts, littleDifficultWords, totalDurationInFrames, fps } =
		useLoaderData<typeof loader>()

	const renderFetcher = useFetcher()

	return (
		<div className="flex justify-center gap-4 h-screen">
			<div>
				<Player
					component={ShortTexts}
					inputProps={{
						texts,
						littleDifficultWords,
					}}
					durationInFrames={totalDurationInFrames}
					compositionWidth={1280}
					compositionHeight={720}
					fps={fps}
					style={{
						width: 1280,
						height: 720,
					}}
					controls
				/>

				<div className="mt-4">
					<renderFetcher.Form method="post" action="render">
						<Button type="submit" disabled={renderFetcher.state !== 'idle'}>
							{renderFetcher.state === 'submitting' ? 'Loading...' : 'Render'}
						</Button>
					</renderFetcher.Form>
				</div>
			</div>

			<div className="h-full w-[300px] overflow-y-auto">
				{texts.map((item) => (
					<div className="flex justify-between items-center" key={item.start}>
						<div className="text-lg"> {item.text}</div>
						<div className="text-[12px]">
							{item.start}s - {item.end}s
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
