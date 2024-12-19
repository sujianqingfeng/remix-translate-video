import type { LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useFetcher, useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import Transcripts from '~/components/business/translate-video/Transcripts'
import { Button } from '~/components/ui/button'
import { db, schema } from '~/lib/drizzle'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const translateVideo = await db.query.translateVideos.findFirst({
		where: eq(schema.translateVideos.id, id),
	})

	return {
		translateVideo,
	}
}

export default function TranslateVideoPage() {
	const { translateVideo } = useLoaderData<typeof loader>()

	const translateFetcher = useFetcher()

	return (
		<div className="flex justify-center">
			<div className="flex gap-2">
				<div className="flex flex-col gap-2">
					<div>fffff</div>

					<div>
						<Link to="download-audio" target="_blank" rel="noopener noreferrer">
							<Button>Download Audio</Button>
						</Link>

						<Form method="post" action="upload-asr" encType="multipart/form-data" className="flex flex-col gap-4">
							<input
								type="file"
								name="file"
								accept=".json"
								className="file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
								required
							/>

							<Button type="submit">Upload ASR</Button>
						</Form>

						<translateFetcher.Form method="post" action="translate">
							<LoadingButtonWithState state={translateFetcher.state} idleText="Translate" />
						</translateFetcher.Form>
					</div>
				</div>

				<div className="w-[500px]">
					<Transcripts transcripts={translateVideo?.transcripts ?? []} />
				</div>
			</div>
		</div>
	)
}
