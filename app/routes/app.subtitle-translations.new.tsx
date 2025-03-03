import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import { Upload } from 'lucide-react'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir } from '~/utils/file'

const formSchema = z.object({
	title: z.string().min(1, 'Title is required'),
})

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const title = formData.get('title') as string
	const audioFile = formData.get('audio') as File | null

	// Validate form data
	const result = formSchema.safeParse({ title })
	if (!result.success) {
		return { errors: result.error.flatten().fieldErrors }
	}

	// Create a new subtitle translation record
	const subtitleTranslation = await db
		.insert(schema.subtitleTranslations)
		.values({
			title,
		})
		.returning()
		.get()

	// If audio file is uploaded, save it
	if (audioFile && audioFile.size > 0) {
		const dir = await createOperationDir(subtitleTranslation.id)
		const audioFilePath = path.join(dir, `${subtitleTranslation.id}-audio.mp3`)

		// Save the audio file
		const arrayBuffer = await audioFile.arrayBuffer()
		await writeFile(audioFilePath, Buffer.from(arrayBuffer))

		// Update the subtitle translation with the audio file path
		await db
			.update(schema.subtitleTranslations)
			.set({
				audioFilePath,
			})
			.where(eq(schema.subtitleTranslations.id, subtitleTranslation.id))
	}

	return redirect(`/app/subtitle-translations/${subtitleTranslation.id}`)
}

export default function SubtitleTranslationsNewPage() {
	const actionData = useActionData<typeof action>()
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'

	return (
		<div className="container py-8">
			<div className="max-w-3xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Create New Subtitle Translation</h1>
				</div>

				<Card className="shadow-sm">
					<CardHeader className="pb-4">
						<CardTitle>New Translation</CardTitle>
						<CardDescription>Upload an audio file and provide a title for your subtitle translation.</CardDescription>
					</CardHeader>
					<CardContent>
						<Form method="post" encType="multipart/form-data" className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="title" className="text-base">
									Title
								</Label>
								<Input
									id="title"
									name="title"
									placeholder="Enter a title for your translation"
									className="w-full"
									aria-invalid={actionData?.errors?.title ? true : undefined}
									aria-errormessage={actionData?.errors?.title ? 'title-error' : undefined}
								/>
								{actionData?.errors?.title && (
									<p className="text-sm text-red-500" id="title-error">
										{actionData.errors.title}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="audio" className="text-base">
									Audio File
								</Label>
								<div className="border border-input rounded-md p-6 bg-muted/10">
									<Input id="audio" name="audio" type="file" accept="audio/*" className="border-0 p-0 shadow-none" />
									<p className="text-sm text-muted-foreground mt-3">Upload an audio file (MP3, WAV, etc.) to transcribe and translate.</p>
								</div>
							</div>

							<div className="pt-2">
								<Button type="submit" className="w-full py-6" disabled={isSubmitting}>
									{isSubmitting ? (
										<>Creating Translation...</>
									) : (
										<>
											<Upload className="mr-2 h-5 w-5" />
											Create Translation
										</>
									)}
								</Button>
							</div>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
