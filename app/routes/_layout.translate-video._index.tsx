import fsp from 'node:fs/promises'
import type { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect } from '@remix-run/react'
import getVideoId from 'get-video-id'
import invariant from 'tiny-invariant'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { fileExist } from '~/utils/file'
import { getTranslateVideoOut } from '~/utils/translate-video'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const url = formData.get('url')
	invariant(url, 'Missing url param')
	const { id } = getVideoId(url as string)
	invariant(id, 'invalid youtube url')

	const { outDir, infoFile } = getTranslateVideoOut(id)
	await fsp.mkdir(outDir, { recursive: true })

	if (!(await fileExist(infoFile))) {
		await fsp.writeFile(infoFile, JSON.stringify({ url }, null, 2))
	}

	return redirect(`/translate-video/${id}`)
}

export default function TranslateVideoIndexPage() {
	return (
		<div>
			<Form method="post">
				<div className="flex gap-2">
					<Input placeholder="youtube url" name="url" />
					<Button>start</Button>
				</div>
			</Form>
		</div>
	)
}
