import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { Button } from '~/components/ui/button'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir } from '~/utils/file'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const file = formData.get('file') as File
	invariant(file instanceof File, 'file is required')

	const [translateVideo] = await db
		.insert(schema.translateVideos)
		.values({
			source: 'upload',
		})
		.returning({ id: schema.translateVideos.id })

	const operationDir = await createOperationDir(translateVideo.id)

	const fileName = `${translateVideo.id}-${Date.now()}${path.extname(file.name)}`
	const uploadFilePath = path.join(operationDir, fileName)
	await writeFile(uploadFilePath, Buffer.from(await file.arrayBuffer()))

	await db
		.update(schema.translateVideos)
		.set({
			uploadFilePath,
		})
		.where(eq(schema.translateVideos.id, translateVideo.id))

	return redirect(`/app/translate-video/${translateVideo.id}`)
}

export default function TranslateVideoCreatePage() {
	return (
		<div>
			<Form method="post" encType="multipart/form-data" className="flex flex-col gap-4">
				<input
					type="file"
					name="file"
					accept=".mp4,.webm"
					className="file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
					required
				/>

				<Button type="submit">Upload Video File</Button>
			</Form>
		</div>
	)
}
