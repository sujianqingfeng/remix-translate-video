import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import Dialogues from '~/components/business/dialogue/Dialogues'
import { db, schema } from '~/lib/drizzle'
import { Dialogue } from '~/remotion'
import { buildDialogueRenderData } from '~/utils/dialogue'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.dialogues.id, id)

	const dialogue = await db.query.dialogues.findFirst({
		where,
	})

	invariant(dialogue, 'dialogue not found')

	const renderInfo = buildDialogueRenderData({
		dialogues: dialogue.dialogues,
		fps: dialogue.fps,
	})

	return { dialogue, renderInfo }
}

export default function DialoguePage() {
	const { dialogue, renderInfo } = useLoaderData<typeof loader>()

	return (
		<div>
			<div className="flex">
				<div>
					<div>
						<Player
							component={Dialogue}
							inputProps={{
								dialogues: renderInfo.remotionDialogues,
							}}
							durationInFrames={renderInfo.totalDurationInFrames}
							compositionWidth={renderInfo.compositionWidth}
							compositionHeight={renderInfo.compositionHeight}
							fps={dialogue.fps}
							style={{
								width: renderInfo.playWidth,
								height: renderInfo.playHeight,
							}}
							controls
						/>
					</div>
				</div>

				<div>
					<h2>Dialogues</h2>
					<Dialogues dialogues={dialogue.dialogues} />
				</div>
			</div>
		</div>
	)
}
