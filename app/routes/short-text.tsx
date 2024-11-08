import fsp from 'node:fs/promises'
import { json, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { ShortTexts } from '~/remotion/short-texts/ShortTexts'
import type { ShortTextInputItem } from '~/types'
import { getShortTextOut } from '~/utils/short-text'

export const loader = async () => {
	const { shortTextInputFile } = getShortTextOut()

	const texts = await fsp.readFile(shortTextInputFile, 'utf-8')
	const textObj = JSON.parse(texts) as ShortTextInputItem[]
	return json({ texts: textObj })
}

export default function ShortTextPage() {
	const { texts } = useLoaderData<typeof loader>()

	const totalDurationInFrames =
		Math.round(
			texts.reduce((acc, item) => {
				return acc + item.end - item.start
			}, 0),
		) * 30
	console.log(
		'🚀 ~ ShortTextPage ~ totalDurationInFrames:',
		totalDurationInFrames,
	)

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4">
				<div>
					<Player
						component={ShortTexts}
						inputProps={{
							texts,
						}}
						durationInFrames={totalDurationInFrames}
						compositionWidth={1280}
						compositionHeight={720}
						fps={30}
						style={{
							width: 1280,
							height: 720,
						}}
						controls
					/>
				</div>

				<div>
					{texts.map((item, index) => (
						<div key={index}>{item.text}</div>
					))}
				</div>
			</div>
		</div>
	)
}
