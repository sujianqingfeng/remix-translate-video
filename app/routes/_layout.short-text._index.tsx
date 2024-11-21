import { Form, useFetcher } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import type { GenerateShortTextActionData, ShortText } from '~/types'

function ShortTextInfo({
	shortText,
	uniqueKey,
}: { shortText: ShortText; uniqueKey: string }) {
	return (
		<>
			<div className="whitespace-pre-wrap">
				<p>{shortText.title}</p>
				<p>{shortText.titleZh}</p>

				<p>{shortText.shortText}</p>
				<p>{shortText.shortTextZh}</p>

				<div>
					{shortText.words.map((word) => {
						return (
							<p key={word.word}>
								{word.word}：{word.translation}
							</p>
						)
					})}
				</div>
			</div>

			<Form method="post" action="confirm">
				<input name="key" value={uniqueKey} type="hidden" />
				<input
					type="hidden"
					name="shortText"
					value={JSON.stringify(shortText, null, 2)}
				/>
				<Button type="submit">Confirm</Button>
			</Form>
		</>
	)
}

export default function ShortTextIndexPage() {
	const fetcher = useFetcher<GenerateShortTextActionData>()

	return (
		<div className="space-y-4">
			<fetcher.Form method="post" action="generate">
				<div className="flex items-center gap-2">
					<div>
						<Input placeholder="theme" name="theme" />
					</div>
					<div>
						<Button disabled={fetcher.state !== 'idle'}>
							{fetcher.state !== 'idle' ? 'Generating...' : 'Generate'}
						</Button>
					</div>
				</div>
			</fetcher.Form>

			{fetcher.data && (
				<div className="rounded-lg border p-4">
					{fetcher.data.success ? (
						<ShortTextInfo
							uniqueKey={fetcher.data.key}
							shortText={fetcher.data.shortText}
						/>
					) : (
						<p className="text-red-500">generate failed</p>
					)}
				</div>
			)}
		</div>
	)
}
