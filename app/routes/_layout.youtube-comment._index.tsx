import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import getVideoId from 'get-video-id'
import invariant from 'tiny-invariant'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { YOUTUBE_DOWNLOAD_ID } from '~/constants'
import { generateYoutubeUrlByVideoId } from '~/utils/youtube'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const url = formData.get('url')
	invariant(url, 'Missing url param')
	const { id } = getVideoId(url as string)
	invariant(id, 'invalid youtube url')
	return redirect(`/youtube-comment/${id}`)
}

export default function IndexPage() {
	return (
		<div className="h-screen w-full flex justify-center items-center">
			<Form method="post" className="flex justify-center gap-10">
				<Input
					name="url"
					className="border p-2 w-96"
					placeholder="Please enter your YouTube URL"
					defaultValue={generateYoutubeUrlByVideoId(YOUTUBE_DOWNLOAD_ID)}
				/>
				<Button type="submit">Start</Button>
			</Form>
		</div>
	)
}
