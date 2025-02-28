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

export const GenerateDialogueSchema = z.object({
  list: z.array(
    z.object({
      roleLabel: z.number(),
      content: z.string(),
      contentZh: z.string(),
    }),
  ),
})

export const WordsToSentencesSchema = z.object({
  sentences: z.array(z.string()),
})
