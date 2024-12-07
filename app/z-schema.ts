import { z } from 'zod'

export const GenerateShortTextSchema = z.object({
	title: z.string(),
	titleZh: z.string(),
	shortText: z.string(),
	shortTextZh: z.string(),
	words: z.array(
		z.object({
			word: z.string(),
			translation: z.string(),
		}),
	),
})

export type GenerateShortText = z.infer<typeof GenerateShortTextSchema>
