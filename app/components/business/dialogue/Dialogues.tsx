import type { Dialogue } from '~/types'

export default function Dialogues({ dialogues }: { dialogues: Dialogue[] }) {
	return (
		<div>
			{dialogues.map((dialogue, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={index}>
					<div>{dialogue.roleLabel}</div>
					<p> {dialogue.content}</p>
					<p>{dialogue.contentZh}</p>
				</div>
			))}
		</div>
	)
}
