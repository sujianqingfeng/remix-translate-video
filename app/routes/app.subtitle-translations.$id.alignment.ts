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
4. 每个分割后的句子应严格控制在40-60个字符之间，不要超过这个范围
5. 对于超过60个字符且内部有逗号、分号等标点的句子，必须在这些标点处进行分割
6. 即使没有明显的标点，也要在语义单元的边界处分割长句
7. 确保分割后的每个句子都是完整的语义单元，便于理解
8. 返回的所有句子拼接起来必须与原文完全一致
9. 检查最终结果，确保没有超过60个字符的句子

示例1：
输入: "The quick brown fox jumps over the lazy dog. The dog was too tired to react, and the fox continued on its journey through the forest."
输出: [
  "The quick brown fox jumps over the lazy dog.",
  "The dog was too tired to react,",
  "and the fox continued on its journey",
  "through the forest."
]

示例2：
输入: "Artificial intelligence has revolutionized many industries, including healthcare, finance, and transportation, by automating complex tasks and providing insights from large datasets that would be impossible for humans to process manually."
输出: [
  "Artificial intelligence has revolutionized many industries,",
  "including healthcare, finance, and transportation,",
  "by automating complex tasks",
  "and providing insights from large datasets",
  "that would be impossible for humans",
  "to process manually."
]

示例3：
输入: "When I arrived at the station, the train had already left, which meant I had to wait for another two hours before the next one would arrive."
输出: [
  "When I arrived at the station,",
  "the train had already left,",
  "which meant I had to wait for another two hours",
  "before the next one would arrive."
]

请确保：
1. 分割点选择在语义自然的位置
2. 每个句子长度在40-60字符之间
3. 所有句子拼接起来与原文完全一致
4. 不要添加、删除或修改任何内容`,
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
