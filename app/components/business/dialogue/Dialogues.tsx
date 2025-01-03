import type { Dialogue } from '~/types'

export default function Dialogues({ dialogues }: { dialogues: Dialogue[] }) {
	return (
		<div className="space-y-6">
			{dialogues.map((dialogue, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
					<div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">{dialogue.roleLabel}</div>
					<p className="mb-2 text-lg text-gray-800 dark:text-gray-200">{dialogue.content}</p>
					<p className="text-base text-gray-600 dark:text-gray-400">{dialogue.contentZh}</p>
				</div>
			))}
		</div>
	)
}
