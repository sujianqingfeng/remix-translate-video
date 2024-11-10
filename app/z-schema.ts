import { z } from 'zod'

export const ShortTextSchema = z.object({
	title: z.string(),
	titleZh: z.string(),
	shortText: z.string(),
	shortTextZh: z.string(),
	words: z.array(z.string()),
})

export type ShortText = z.infer<typeof ShortTextSchema>
