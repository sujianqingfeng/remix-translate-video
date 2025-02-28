import fsp from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { wordsToSentences } from '../align'

describe('transcript', () => {
	it.skip('words', async () => {
		const currentDir = import.meta.dirname
		const p = path.join(currentDir, './test.json')
		const result = await fsp.readFile(p, 'utf-8')
		const data = JSON.parse(result)

		const words = data.transcription.map((item: any) => ({
			word: item.text,
			start: item.offsets.from / 1000,
			end: item.offsets.to / 1000,
		}))

		expect(words).toMatchInlineSnapshot(`
			[
			]
		`)
	})

	it('wordsToSentences', async () => {
		const words = [
			{
				end: 0.18,
				start: 0.36,
				word: ' You',
			},
			{
				end: 0.58,
				start: 0.18,
				word: "'ve",
			},
			{
				end: 0.86,
				start: 0.58,
				word: ' probably',
			},
			{
				end: 1.27,
				start: 0.86,
				word: ' heard',
			},
			{
				end: 1.35,
				start: 1.27,
				word: ' all',
			},
			{
				end: 1.47,
				start: 1.35,
				word: ' of',
			},
			{
				end: 1.72,
				start: 1.47,
				word: ' this',
			},
			{
				end: 1.97,
				start: 1.72,
				word: ' talk',
			},
			{
				end: 2.52,
				start: 1.97,
				word: ' recently',
			},
			{
				end: 2.85,
				start: 2.52,
				word: ' about',
			},
			{
				end: 3.04,
				start: 2.85,
				word: ' the',
			},
			{
				end: 3.52,
				start: 3.04,
				word: ' amount',
			},
			{
				end: 3.56,
				start: 3.52,
				word: ' of',
			},
			{
				end: 3.78,
				start: 3.56,
				word: ' aid',
			},
			{
				end: 3.92,
				start: 3.78,
				word: ' that',
			},
			{
				end: 4.02,
				start: 3.92,
				word: "'s",
			},
			{
				end: 4.12,
				start: 4.02,
				word: ' been',
			},
			{
				end: 4.28,
				start: 4.12,
				word: ' going',
			},
			{
				end: 4.44,
				start: 4.28,
				word: ' to',
			},
			{
				end: 4.81,
				start: 4.44,
				word: ' Ukraine',
			},
			{
				end: 4.91,
				start: 4.81,
				word: ',',
			},
			{
				end: 5.17,
				start: 4.91,
				word: ' about',
			},
			{
				end: 5.17,
				start: 4.91,
				word: ' 4.8',
			},
			{
				end: 5.54,
				start: 5.17,
				word: ' whether',
			},
			{
				end: 5.7,
				start: 5.54,
				word: ' 1,000',
			},
			{
				end: 5.7,
				start: 5.54,
				word: ' the',
			},
			{
				end: 5.75,
				start: 5.7,
				word: ' U',
			},
			{
				end: 5.91,
				start: 5.75,
				word: '.',
			},
			{
				end: 6.03,
				start: 5.91,
				word: 'S',
			},
			{
				end: 6.12,
				start: 6.03,
				word: '.',
			},
			{
				end: 6.22,
				start: 6.12,
				word: ' is',
			},
			{
				end: 6.48,
				start: 6.22,
				word: ' going',
			},
			{
				end: 6.62,
				start: 6.48,
				word: ' to',
			},
			{
				end: 6.78,
				start: 6.62,
				word: ' be',
			},
			{
				end: 6.89,
				start: 6.78,
				word: ' able',
			},
			{
				end: 6.99,
				start: 6.89,
				word: ' to',
			},
			{
				end: 391.2,
				start: 391.08,
				word: ' it',
			},
			{
				end: 391.6,
				start: 391.2,
				word: "'s",
			},
			{
				end: 391.61,
				start: 391.6,
				word: ' going',
			},
			{
				end: 391.75,
				start: 391.61,
				word: ' to',
			},
			{
				end: 391.84,
				start: 391.75,
				word: ' be',
			},
			{
				end: 392.09,
				start: 391.84,
				word: ' very',
			},
			{
				end: 392.64,
				start: 392.09,
				word: ' difficult',
			},
			{
				end: 392.9,
				start: 392.64,
				word: ' to',
			},
			{
				end: 393.11,
				start: 392.9,
				word: ' get',
			},
			{
				end: 393.2,
				start: 393.11,
				word: ' to',
			},
			{
				end: 393.21,
				start: 393.2,
				word: '',
			},
			{
				end: 393.55,
				start: 393.21,
				word: ' that',
			},
			{
				end: 393.55,
				start: 393.55,
				word: ' $',
			},
			{
				end: 394.38,
				start: 393.55,
				word: '500',
			},
			{
				end: 394.69,
				start: 394.38,
				word: ' billion',
			},
			{
				end: 395.07,
				start: 394.69,
				word: ' total',
			},
			{
				end: 395.28,
				start: 395.07,
				word: '.',
			},
		]

		const segments = wordsToSentences({ words })
		const texts = segments.map((item) => item.text)
		expect(texts).toMatchInlineSnapshot(`
			[
			  "You've probably heard all of this talk recently about the amount of aid that's been going to Ukraine,",
			  "about 4.8 whether 1,000 the U.S.",
			  "is going to be able to it's going to be very difficult to get to that $500 billion total.",
			]
		`)
	})
})
