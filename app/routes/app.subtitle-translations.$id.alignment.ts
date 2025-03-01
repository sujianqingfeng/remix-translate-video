import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import type { Sentence } from '~/types'
import { deepSeek } from '~/utils/ai'
import { alignWordsAndSentences, splitTextToSentences } from '~/utils/align'
import { WordsToSentencesSchema } from '~/z-schema'

async function splitTextToSentencesWithAI(sentence: string) {
	const result = await deepSeek.generateObject({
		schema: WordsToSentencesSchema,
		system: `请将输入的文本分割成更短的句子，遵循以下规则：
1. 保持原文内容完整，不要增减、修改或翻译任何内容
2. 优先在自然的语句边界（如句号、问号、感叹号等）处分割
3. 长句必须进一步分割：
   - 在逗号、分号、冒号等标点处分割
   - 在连词（如and, but, or, because, about, whether）处分割
   - 在从句与主句的边界处分割
4. 每个分割后的句子应尽量保持在40-60个字符之间
5. 即使没有明显的标点，也要在语义单元的边界处分割长句
6. 返回的所有句子拼接起来必须与原文完全一致`,
		prompt: sentence,
		maxTokens: 8000,
	})

	return result.sentences
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const alignmentMethod = formData.get('alignmentMethod')
	invariant(alignmentMethod === 'ai' || alignmentMethod === 'code', 'Invalid alignment method')

	const where = eq(schema.subtitleTranslations.id, id)
	const subtitleTranslation = await db.query.subtitleTranslations.findFirst({
		where,
	})
	invariant(subtitleTranslation, 'subtitleTranslation not found')
	const { withTimeWords } = subtitleTranslation
	invariant(withTimeWords && withTimeWords.length > 0, 'ASR data is required for alignment')

	let sentences: string[] = []
	let subtitles: Sentence[] = []

	const text = withTimeWords.reduce((acc: string, item: any) => {
		return acc + item.word
	}, '')

	if (alignmentMethod === 'ai') {
		sentences = await splitTextToSentencesWithAI(text)
		console.log(`AI split text into ${sentences.length} sentences`)
	} else {
		sentences = splitTextToSentences({ text })
		console.log(`Code split text into ${sentences.length} sentences`)
	}

	subtitles = alignWordsAndSentences(withTimeWords, sentences)

	await db
		.update(schema.subtitleTranslations)
		.set({
			sentences: subtitles,
		})
		.where(where)

	return {
		success: true,
	}
}
