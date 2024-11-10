import { useFetcher } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import type { GenerateShortTextActionData } from '~/types'

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
						<p className="whitespace-pre-wrap">
							{JSON.stringify(fetcher.data.shortText, null, 2)}
						</p>
					) : (
						<p className="text-red-500">generate failed</p>
					)}
				</div>
			)}
		</div>
	)
}
