import fsp from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { processSentenceSegmentation } from '../transcript'

describe('transcript', () => {
	it('processSentenceSegmentation', async () => {
		const currentDir = import.meta.dirname
		const p = path.join(currentDir, './test.json')
		const result = await fsp.readFile(p, 'utf-8')
		const data = JSON.parse(result)

		const words = data.transcription.map((item: any) => ({
			word: item.text,
			start: item.offsets.from / 1000,
			end: item.offsets.to / 1000,
		}))

		const segments = processSentenceSegmentation({ words })

		// const texts = segments.map((item) => item.text)

		expect(segments).toMatchInlineSnapshot(`
			[
			  {
			    "end": 2.43,
			    "start": 0,
			    "text": " Now to the tense negotiations between the U.S.",
			    "words": [
			      {
			        "end": 0.02,
			        "start": 0,
			        "word": "",
			      },
			      {
			        "end": 0.2,
			        "start": 0.02,
			        "word": " Now",
			      },
			      {
			        "end": 0.33,
			        "start": 0.2,
			        "word": " to",
			      },
			      {
			        "end": 0.56,
			        "start": 0.33,
			        "word": " the",
			      },
			      {
			        "end": 0.88,
			        "start": 0.56,
			        "word": " tense",
			      },
			      {
			        "end": 1.73,
			        "start": 0.88,
			        "word": " negotiations",
			      },
			      {
			        "end": 2,
			        "start": 1.73,
			        "word": " between",
			      },
			      {
			        "end": 2.12,
			        "start": 2,
			        "word": " the",
			      },
			      {
			        "end": 2.3,
			        "start": 2.12,
			        "word": " U.S",
			      },
			      {
			        "end": 2.43,
			        "start": 2.3,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 4.76,
			    "start": 2.43,
			    "text": " and Ukraine over its war with Russia.",
			    "words": [
			      {
			        "end": 2.64,
			        "start": 2.43,
			        "word": " and",
			      },
			      {
			        "end": 3.12,
			        "start": 2.64,
			        "word": " Ukraine",
			      },
			      {
			        "end": 3.4,
			        "start": 3.12,
			        "word": " over",
			      },
			      {
			        "end": 3.61,
			        "start": 3.4,
			        "word": " its",
			      },
			      {
			        "end": 3.82,
			        "start": 3.61,
			        "word": " war",
			      },
			      {
			        "end": 4.1,
			        "start": 3.82,
			        "word": " with",
			      },
			      {
			        "end": 4.65,
			        "start": 4.1,
			        "word": " Russia",
			      },
			      {
			        "end": 4.76,
			        "start": 4.65,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 11.44,
			    "start": 4.76,
			    "text": " The Trump administration demanding access to Ukraine's valuable natural resources as payment for military aid.",
			    "words": [
			      {
			        "end": 4.9,
			        "start": 4.76,
			        "word": " The",
			      },
			      {
			        "end": 5.13,
			        "start": 4.9,
			        "word": " Trump",
			      },
			      {
			        "end": 5.79,
			        "start": 5.13,
			        "word": " administration",
			      },
			      {
			        "end": 6.42,
			        "start": 5.79,
			        "word": " demanding",
			      },
			      {
			        "end": 6.84,
			        "start": 6.42,
			        "word": " access",
			      },
			      {
			        "end": 6.98,
			        "start": 6.84,
			        "word": " to",
			      },
			      {
			        "end": 7.47,
			        "start": 6.98,
			        "word": " Ukraine",
			      },
			      {
			        "end": 7.61,
			        "start": 7.47,
			        "word": "'s",
			      },
			      {
			        "end": 8.17,
			        "start": 7.61,
			        "word": " valuable",
			      },
			      {
			        "end": 8.66,
			        "start": 8.17,
			        "word": " natural",
			      },
			      {
			        "end": 9.32,
			        "start": 8.66,
			        "word": " resources",
			      },
			      {
			        "end": 9.6,
			        "start": 9.32,
			        "word": " as",
			      },
			      {
			        "end": 10.13,
			        "start": 9.6,
			        "word": " payment",
			      },
			      {
			        "end": 10.37,
			        "start": 10.13,
			        "word": " for",
			      },
			      {
			        "end": 11.06,
			        "start": 10.37,
			        "word": " military",
			      },
			      {
			        "end": 11.37,
			        "start": 11.06,
			        "word": " aid",
			      },
			      {
			        "end": 11.44,
			        "start": 11.37,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 14.92,
			    "start": 11.44,
			    "text": " And tonight, new details about a counterproposal from Ukraine.",
			    "words": [
			      {
			        "end": 11.57,
			        "start": 11.44,
			        "word": " And",
			      },
			      {
			        "end": 11.87,
			        "start": 11.57,
			        "word": " tonight",
			      },
			      {
			        "end": 11.95,
			        "start": 11.87,
			        "word": ",",
			      },
			      {
			        "end": 12.08,
			        "start": 11.95,
			        "word": " new",
			      },
			      {
			        "end": 12.39,
			        "start": 12.08,
			        "word": " details",
			      },
			      {
			        "end": 12.68,
			        "start": 12.39,
			        "word": " about",
			      },
			      {
			        "end": 12.73,
			        "start": 12.68,
			        "word": " a",
			      },
			      {
			        "end": 13.13,
			        "start": 12.73,
			        "word": " counter",
			      },
			      {
			        "end": 13.24,
			        "start": 13.13,
			        "word": "p",
			      },
			      {
			        "end": 13.35,
			        "start": 13.24,
			        "word": "rop",
			      },
			      {
			        "end": 13.45,
			        "start": 13.35,
			        "word": "os",
			      },
			      {
			        "end": 13.73,
			        "start": 13.45,
			        "word": "al",
			      },
			      {
			        "end": 13.97,
			        "start": 13.73,
			        "word": " from",
			      },
			      {
			        "end": 14.72,
			        "start": 13.97,
			        "word": " Ukraine",
			      },
			      {
			        "end": 14.92,
			        "start": 14.72,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 18.68,
			    "start": 14.92,
			    "text": " ABC's Patrick Rievel reports from Kyiv tonight.",
			    "words": [
			      {
			        "end": 15.18,
			        "start": 14.92,
			        "word": " ABC",
			      },
			      {
			        "end": 15.35,
			        "start": 15.18,
			        "word": "'s",
			      },
			      {
			        "end": 15.96,
			        "start": 15.35,
			        "word": " Patrick",
			      },
			      {
			        "end": 16.03,
			        "start": 15.96,
			        "word": " R",
			      },
			      {
			        "end": 16.29,
			        "start": 16.03,
			        "word": "ie",
			      },
			      {
			        "end": 16.47,
			        "start": 16.29,
			        "word": "vel",
			      },
			      {
			        "end": 17.19,
			        "start": 16.47,
			        "word": " reports",
			      },
			      {
			        "end": 17.43,
			        "start": 17.19,
			        "word": " from",
			      },
			      {
			        "end": 17.59,
			        "start": 17.43,
			        "word": " Ky",
			      },
			      {
			        "end": 17.77,
			        "start": 17.59,
			        "word": "iv",
			      },
			      {
			        "end": 18.67,
			        "start": 17.77,
			        "word": " tonight",
			      },
			      {
			        "end": 18.68,
			        "start": 18.67,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 19.31,
			    "start": 18.68,
			    "text": " -Tonight,",
			    "words": [
			      {
			        "end": 18.74,
			        "start": 18.68,
			        "word": " -",
			      },
			      {
			        "end": 18.8,
			        "start": 18.74,
			        "word": "T",
			      },
			      {
			        "end": 18.92,
			        "start": 18.8,
			        "word": "on",
			      },
			      {
			        "end": 19.29,
			        "start": 18.92,
			        "word": "ight",
			      },
			      {
			        "end": 19.31,
			        "start": 19.29,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 22.24,
			    "start": 19.31,
			    "text": " President Zelensky under intense pressure,",
			    "words": [
			      {
			        "end": 19.85,
			        "start": 19.31,
			        "word": " President",
			      },
			      {
			        "end": 20.03,
			        "start": 19.85,
			        "word": " Zel",
			      },
			      {
			        "end": 20.21,
			        "start": 20.03,
			        "word": "ens",
			      },
			      {
			        "end": 20.38,
			        "start": 20.21,
			        "word": "ky",
			      },
			      {
			        "end": 20.84,
			        "start": 20.38,
			        "word": " under",
			      },
			      {
			        "end": 21.57,
			        "start": 20.84,
			        "word": " intense",
			      },
			      {
			        "end": 22.24,
			        "start": 21.57,
			        "word": " pressure",
			      },
			      {
			        "end": 22.24,
			        "start": 22.24,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 24.41,
			    "start": 22.24,
			    "text": " not just from Vladimir Putin,",
			    "words": [
			      {
			        "end": 22.48,
			        "start": 22.24,
			        "word": " not",
			      },
			      {
			        "end": 22.81,
			        "start": 22.48,
			        "word": " just",
			      },
			      {
			        "end": 23.14,
			        "start": 22.81,
			        "word": " from",
			      },
			      {
			        "end": 23.8,
			        "start": 23.14,
			        "word": " Vladimir",
			      },
			      {
			        "end": 24.4,
			        "start": 23.8,
			        "word": " Putin",
			      },
			      {
			        "end": 24.41,
			        "start": 24.4,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 27.28,
			    "start": 24.41,
			    "text": " but President Trump.",
			    "words": [
			      {
			        "end": 24.83,
			        "start": 24.41,
			        "word": " but",
			      },
			      {
			        "end": 26.12,
			        "start": 24.83,
			        "word": " President",
			      },
			      {
			        "end": 26.84,
			        "start": 26.12,
			        "word": " Trump",
			      },
			      {
			        "end": 27.28,
			        "start": 26.84,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 30.44,
			    "start": 27.28,
			    "text": " -As the war in Ukraine approaches its third anniversary,",
			    "words": [
			      {
			        "end": 27.28,
			        "start": 27.28,
			        "word": "",
			      },
			      {
			        "end": 27.34,
			        "start": 27.28,
			        "word": " -",
			      },
			      {
			        "end": 27.46,
			        "start": 27.34,
			        "word": "As",
			      },
			      {
			        "end": 27.65,
			        "start": 27.46,
			        "word": " the",
			      },
			      {
			        "end": 27.84,
			        "start": 27.65,
			        "word": " war",
			      },
			      {
			        "end": 27.97,
			        "start": 27.84,
			        "word": " in",
			      },
			      {
			        "end": 28.44,
			        "start": 27.97,
			        "word": " Ukraine",
			      },
			      {
			        "end": 29.05,
			        "start": 28.44,
			        "word": " approaches",
			      },
			      {
			        "end": 29.24,
			        "start": 29.05,
			        "word": " its",
			      },
			      {
			        "end": 29.56,
			        "start": 29.24,
			        "word": " third",
			      },
			      {
			        "end": 30.25,
			        "start": 29.56,
			        "word": " anniversary",
			      },
			      {
			        "end": 30.44,
			        "start": 30.25,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 31.64,
			    "start": 30.44,
			    "text": " Ukraine and the U.S.",
			    "words": [
			      {
			        "end": 30.83,
			        "start": 30.44,
			        "word": " Ukraine",
			      },
			      {
			        "end": 31,
			        "start": 30.83,
			        "word": " and",
			      },
			      {
			        "end": 31.17,
			        "start": 31,
			        "word": " the",
			      },
			      {
			        "end": 31.44,
			        "start": 31.17,
			        "word": " U.S",
			      },
			      {
			        "end": 31.64,
			        "start": 31.44,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 35.76,
			    "start": 31.64,
			    "text": " are locked in tense negotiations over a deal that would give the U.S.",
			    "words": [
			      {
			        "end": 31.86,
			        "start": 31.64,
			        "word": " are",
			      },
			      {
			        "end": 32.32,
			        "start": 31.86,
			        "word": " locked",
			      },
			      {
			        "end": 32.51,
			        "start": 32.32,
			        "word": " in",
			      },
			      {
			        "end": 32.92,
			        "start": 32.51,
			        "word": " tense",
			      },
			      {
			        "end": 33.96,
			        "start": 32.92,
			        "word": " negotiations",
			      },
			      {
			        "end": 34.17,
			        "start": 33.96,
			        "word": " over",
			      },
			      {
			        "end": 34.22,
			        "start": 34.17,
			        "word": " a",
			      },
			      {
			        "end": 34.43,
			        "start": 34.22,
			        "word": " deal",
			      },
			      {
			        "end": 34.64,
			        "start": 34.43,
			        "word": " that",
			      },
			      {
			        "end": 34.91,
			        "start": 34.64,
			        "word": " would",
			      },
			      {
			        "end": 35.17,
			        "start": 34.91,
			        "word": " give",
			      },
			      {
			        "end": 35.28,
			        "start": 35.17,
			        "word": " the",
			      },
			      {
			        "end": 35.54,
			        "start": 35.28,
			        "word": " U.S",
			      },
			      {
			        "end": 35.76,
			        "start": 35.54,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 39.16,
			    "start": 35.76,
			    "text": " access to Ukraine's valuable resources.",
			    "words": [
			      {
			        "end": 36.4,
			        "start": 35.76,
			        "word": " access",
			      },
			      {
			        "end": 36.57,
			        "start": 36.4,
			        "word": " to",
			      },
			      {
			        "end": 37.19,
			        "start": 36.57,
			        "word": " Ukraine",
			      },
			      {
			        "end": 37.36,
			        "start": 37.19,
			        "word": "'s",
			      },
			      {
			        "end": 38.07,
			        "start": 37.36,
			        "word": " valuable",
			      },
			      {
			        "end": 38.87,
			        "start": 38.07,
			        "word": " resources",
			      },
			      {
			        "end": 39.16,
			        "start": 38.87,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 44.76,
			    "start": 39.16,
			    "text": " The latest draft would require Ukraine to pay $500 billion to the U.S.,",
			    "words": [
			      {
			        "end": 39.35,
			        "start": 39.16,
			        "word": " The",
			      },
			      {
			        "end": 39.73,
			        "start": 39.35,
			        "word": " latest",
			      },
			      {
			        "end": 40.05,
			        "start": 39.73,
			        "word": " draft",
			      },
			      {
			        "end": 40.37,
			        "start": 40.05,
			        "word": " would",
			      },
			      {
			        "end": 40.83,
			        "start": 40.37,
			        "word": " require",
			      },
			      {
			        "end": 41.32,
			        "start": 40.83,
			        "word": " Ukraine",
			      },
			      {
			        "end": 41.54,
			        "start": 41.32,
			        "word": " to",
			      },
			      {
			        "end": 41.91,
			        "start": 41.54,
			        "word": " pay",
			      },
			      {
			        "end": 41.98,
			        "start": 41.91,
			        "word": " $",
			      },
			      {
			        "end": 42.97,
			        "start": 41.98,
			        "word": "500",
			      },
			      {
			        "end": 43.76,
			        "start": 42.97,
			        "word": " billion",
			      },
			      {
			        "end": 43.89,
			        "start": 43.76,
			        "word": " to",
			      },
			      {
			        "end": 44.09,
			        "start": 43.89,
			        "word": " the",
			      },
			      {
			        "end": 44.74,
			        "start": 44.09,
			        "word": " U.S",
			      },
			      {
			        "end": 44.76,
			        "start": 44.74,
			        "word": ".,",
			      },
			    ],
			  },
			  {
			    "end": 50.92,
			    "start": 44.76,
			    "text": " paid for by taking 50% of revenues from much of Ukraine's natural resources forever,",
			    "words": [
			      {
			        "end": 45.2,
			        "start": 44.76,
			        "word": " paid",
			      },
			      {
			        "end": 45.4,
			        "start": 45.2,
			        "word": " for",
			      },
			      {
			        "end": 45.58,
			        "start": 45.4,
			        "word": " by",
			      },
			      {
			        "end": 46.16,
			        "start": 45.58,
			        "word": " taking",
			      },
			      {
			        "end": 46.68,
			        "start": 46.16,
			        "word": " 50",
			      },
			      {
			        "end": 46.77,
			        "start": 46.68,
			        "word": "%",
			      },
			      {
			        "end": 46.99,
			        "start": 46.77,
			        "word": " of",
			      },
			      {
			        "end": 47.72,
			        "start": 46.99,
			        "word": " revenues",
			      },
			      {
			        "end": 47.98,
			        "start": 47.72,
			        "word": " from",
			      },
			      {
			        "end": 48.24,
			        "start": 47.98,
			        "word": " much",
			      },
			      {
			        "end": 48.37,
			        "start": 48.24,
			        "word": " of",
			      },
			      {
			        "end": 48.84,
			        "start": 48.37,
			        "word": " Ukraine",
			      },
			      {
			        "end": 48.97,
			        "start": 48.84,
			        "word": "'s",
			      },
			      {
			        "end": 49.44,
			        "start": 48.97,
			        "word": " natural",
			      },
			      {
			        "end": 50.1,
			        "start": 49.44,
			        "word": " resources",
			      },
			      {
			        "end": 50.92,
			        "start": 50.1,
			        "word": " forever",
			      },
			      {
			        "end": 50.92,
			        "start": 50.92,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 52.8,
			    "start": 50.92,
			    "text": " including oil and gas,",
			    "words": [
			      {
			        "end": 51.85,
			        "start": 50.92,
			        "word": " including",
			      },
			      {
			        "end": 52.16,
			        "start": 51.85,
			        "word": " oil",
			      },
			      {
			        "end": 52.77,
			        "start": 52.16,
			        "word": " and",
			      },
			      {
			        "end": 52.8,
			        "start": 52.77,
			        "word": " gas",
			      },
			      {
			        "end": 52.8,
			        "start": 52.8,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 55.36,
			    "start": 52.8,
			    "text": " as well as ports and other infrastructure.",
			    "words": [
			      {
			        "end": 52.93,
			        "start": 52.8,
			        "word": " as",
			      },
			      {
			        "end": 53.3,
			        "start": 52.93,
			        "word": " well",
			      },
			      {
			        "end": 53.33,
			        "start": 53.3,
			        "word": " as",
			      },
			      {
			        "end": 53.66,
			        "start": 53.33,
			        "word": " ports",
			      },
			      {
			        "end": 53.85,
			        "start": 53.66,
			        "word": " and",
			      },
			      {
			        "end": 54.2,
			        "start": 53.85,
			        "word": " other",
			      },
			      {
			        "end": 55.12,
			        "start": 54.2,
			        "word": " infrastructure",
			      },
			      {
			        "end": 55.36,
			        "start": 55.12,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 62.48,
			    "start": 55.36,
			    "text": " -Trump saying it's back pay for the billions in military aid sent to Ukraine.",
			    "words": [
			      {
			        "end": 55.36,
			        "start": 55.36,
			        "word": "",
			      },
			      {
			        "end": 55.47,
			        "start": 55.36,
			        "word": " -",
			      },
			      {
			        "end": 55.68,
			        "start": 55.47,
			        "word": "Tr",
			      },
			      {
			        "end": 56,
			        "start": 55.68,
			        "word": "ump",
			      },
			      {
			        "end": 56.65,
			        "start": 56,
			        "word": " saying",
			      },
			      {
			        "end": 56.86,
			        "start": 56.65,
			        "word": " it",
			      },
			      {
			        "end": 57.07,
			        "start": 56.86,
			        "word": "'s",
			      },
			      {
			        "end": 57.5,
			        "start": 57.07,
			        "word": " back",
			      },
			      {
			        "end": 57.88,
			        "start": 57.5,
			        "word": " pay",
			      },
			      {
			        "end": 58.36,
			        "start": 57.88,
			        "word": " for",
			      },
			      {
			        "end": 58.93,
			        "start": 58.36,
			        "word": " the",
			      },
			      {
			        "end": 60.12,
			        "start": 58.93,
			        "word": " billions",
			      },
			      {
			        "end": 60.28,
			        "start": 60.12,
			        "word": " in",
			      },
			      {
			        "end": 60.93,
			        "start": 60.28,
			        "word": " military",
			      },
			      {
			        "end": 61.17,
			        "start": 60.93,
			        "word": " aid",
			      },
			      {
			        "end": 61.49,
			        "start": 61.17,
			        "word": " sent",
			      },
			      {
			        "end": 61.67,
			        "start": 61.49,
			        "word": " to",
			      },
			      {
			        "end": 62.2,
			        "start": 61.67,
			        "word": " Ukraine",
			      },
			      {
			        "end": 62.48,
			        "start": 62.2,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 65.84,
			    "start": 62.48,
			    "text": " -We're gonna get our money back 'cause it's not -- it's not fair.",
			    "words": [
			      {
			        "end": 62.51,
			        "start": 62.48,
			        "word": " -",
			      },
			      {
			        "end": 62.58,
			        "start": 62.51,
			        "word": "We",
			      },
			      {
			        "end": 62.68,
			        "start": 62.58,
			        "word": "'re",
			      },
			      {
			        "end": 62.85,
			        "start": 62.68,
			        "word": " gonna",
			      },
			      {
			        "end": 62.95,
			        "start": 62.85,
			        "word": " get",
			      },
			      {
			        "end": 63.05,
			        "start": 62.95,
			        "word": " our",
			      },
			      {
			        "end": 63.22,
			        "start": 63.05,
			        "word": " money",
			      },
			      {
			        "end": 63.41,
			        "start": 63.22,
			        "word": " back",
			      },
			      {
			        "end": 63.46,
			        "start": 63.41,
			        "word": " '",
			      },
			      {
			        "end": 63.77,
			        "start": 63.46,
			        "word": "cause",
			      },
			      {
			        "end": 63.93,
			        "start": 63.77,
			        "word": " it",
			      },
			      {
			        "end": 63.94,
			        "start": 63.93,
			        "word": "'s",
			      },
			      {
			        "end": 64.32,
			        "start": 63.94,
			        "word": " not",
			      },
			      {
			        "end": 64.36,
			        "start": 64.32,
			        "word": " --",
			      },
			      {
			        "end": 64.57,
			        "start": 64.36,
			        "word": " it",
			      },
			      {
			        "end": 64.86,
			        "start": 64.57,
			        "word": "'s",
			      },
			      {
			        "end": 65.09,
			        "start": 64.86,
			        "word": " not",
			      },
			      {
			        "end": 65.5,
			        "start": 65.09,
			        "word": " fair",
			      },
			      {
			        "end": 65.84,
			        "start": 65.5,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 67.2,
			    "start": 65.84,
			    "text": " It's just not fair.",
			    "words": [
			      {
			        "end": 65.99,
			        "start": 65.84,
			        "word": " It",
			      },
			      {
			        "end": 66.14,
			        "start": 65.99,
			        "word": "'s",
			      },
			      {
			        "end": 66.51,
			        "start": 66.14,
			        "word": " just",
			      },
			      {
			        "end": 66.66,
			        "start": 66.51,
			        "word": " not",
			      },
			      {
			        "end": 66.95,
			        "start": 66.66,
			        "word": " fair",
			      },
			      {
			        "end": 67.2,
			        "start": 66.95,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 67.83,
			    "start": 67.2,
			    "text": " -The U.S.",
			    "words": [
			      {
			        "end": 67.25,
			        "start": 67.2,
			        "word": " -",
			      },
			      {
			        "end": 67.41,
			        "start": 67.25,
			        "word": "The",
			      },
			      {
			        "end": 67.67,
			        "start": 67.41,
			        "word": " U.S",
			      },
			      {
			        "end": 67.83,
			        "start": 67.67,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 73,
			    "start": 67.83,
			    "text": " sent an estimated $119 billion in aid to Ukraine since 2022.",
			    "words": [
			      {
			        "end": 68.05,
			        "start": 67.83,
			        "word": " sent",
			      },
			      {
			        "end": 68.16,
			        "start": 68.05,
			        "word": " an",
			      },
			      {
			        "end": 68.72,
			        "start": 68.16,
			        "word": " estimated",
			      },
			      {
			        "end": 68.85,
			        "start": 68.72,
			        "word": " $",
			      },
			      {
			        "end": 69.16,
			        "start": 68.85,
			        "word": "1",
			      },
			      {
			        "end": 69.87,
			        "start": 69.16,
			        "word": "19",
			      },
			      {
			        "end": 70.6,
			        "start": 69.87,
			        "word": " billion",
			      },
			      {
			        "end": 70.79,
			        "start": 70.6,
			        "word": " in",
			      },
			      {
			        "end": 71.08,
			        "start": 70.79,
			        "word": " aid",
			      },
			      {
			        "end": 71.22,
			        "start": 71.08,
			        "word": " to",
			      },
			      {
			        "end": 71.72,
			        "start": 71.22,
			        "word": " Ukraine",
			      },
			      {
			        "end": 72.04,
			        "start": 71.72,
			        "word": " since",
			      },
			      {
			        "end": 72.96,
			        "start": 72.04,
			        "word": " 2022",
			      },
			      {
			        "end": 73,
			        "start": 72.96,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 76.96,
			    "start": 73,
			    "text": " The amount Trump is asking for is five times more.",
			    "words": [
			      {
			        "end": 73.27,
			        "start": 73,
			        "word": " The",
			      },
			      {
			        "end": 73.82,
			        "start": 73.27,
			        "word": " amount",
			      },
			      {
			        "end": 74.28,
			        "start": 73.82,
			        "word": " Trump",
			      },
			      {
			        "end": 74.46,
			        "start": 74.28,
			        "word": " is",
			      },
			      {
			        "end": 75.15,
			        "start": 74.46,
			        "word": " asking",
			      },
			      {
			        "end": 75.28,
			        "start": 75.15,
			        "word": " for",
			      },
			      {
			        "end": 75.54,
			        "start": 75.28,
			        "word": " is",
			      },
			      {
			        "end": 75.82,
			        "start": 75.54,
			        "word": " five",
			      },
			      {
			        "end": 76.28,
			        "start": 75.82,
			        "word": " times",
			      },
			      {
			        "end": 76.93,
			        "start": 76.28,
			        "word": " more",
			      },
			      {
			        "end": 76.96,
			        "start": 76.93,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 79.96,
			    "start": 76.96,
			    "text": " Zelensky first suggested a rare earths deal,",
			    "words": [
			      {
			        "end": 77.2,
			        "start": 76.96,
			        "word": " Zel",
			      },
			      {
			        "end": 77.44,
			        "start": 77.2,
			        "word": "ens",
			      },
			      {
			        "end": 77.67,
			        "start": 77.44,
			        "word": "ky",
			      },
			      {
			        "end": 78,
			        "start": 77.67,
			        "word": " first",
			      },
			      {
			        "end": 78.72,
			        "start": 78,
			        "word": " suggested",
			      },
			      {
			        "end": 78.8,
			        "start": 78.72,
			        "word": " a",
			      },
			      {
			        "end": 79.12,
			        "start": 78.8,
			        "word": " rare",
			      },
			      {
			        "end": 79.52,
			        "start": 79.12,
			        "word": " earth",
			      },
			      {
			        "end": 79.6,
			        "start": 79.52,
			        "word": "s",
			      },
			      {
			        "end": 79.96,
			        "start": 79.6,
			        "word": " deal",
			      },
			      {
			        "end": 79.96,
			        "start": 79.96,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 80.66,
			    "start": 79.96,
			    "text": " but so far,",
			    "words": [
			      {
			        "end": 80.17,
			        "start": 79.96,
			        "word": " but",
			      },
			      {
			        "end": 80.31,
			        "start": 80.17,
			        "word": " so",
			      },
			      {
			        "end": 80.52,
			        "start": 80.31,
			        "word": " far",
			      },
			      {
			        "end": 80.66,
			        "start": 80.52,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 87.6,
			    "start": 80.66,
			    "text": " he is refusing to sign because the agreement promises no security guarantees in return.",
			    "words": [
			      {
			        "end": 80.8,
			        "start": 80.66,
			        "word": " he",
			      },
			      {
			        "end": 80.94,
			        "start": 80.8,
			        "word": " is",
			      },
			      {
			        "end": 81.51,
			        "start": 80.94,
			        "word": " refusing",
			      },
			      {
			        "end": 81.65,
			        "start": 81.51,
			        "word": " to",
			      },
			      {
			        "end": 81.96,
			        "start": 81.65,
			        "word": " sign",
			      },
			      {
			        "end": 81.96,
			        "start": 81.96,
			        "word": "",
			      },
			      {
			        "end": 82.49,
			        "start": 81.96,
			        "word": " because",
			      },
			      {
			        "end": 82.71,
			        "start": 82.49,
			        "word": " the",
			      },
			      {
			        "end": 83.39,
			        "start": 82.71,
			        "word": " agreement",
			      },
			      {
			        "end": 83.99,
			        "start": 83.39,
			        "word": " promises",
			      },
			      {
			        "end": 84.14,
			        "start": 83.99,
			        "word": " no",
			      },
			      {
			        "end": 84.74,
			        "start": 84.14,
			        "word": " security",
			      },
			      {
			        "end": 85.52,
			        "start": 84.74,
			        "word": " guarantees",
			      },
			      {
			        "end": 85.89,
			        "start": 85.52,
			        "word": " in",
			      },
			      {
			        "end": 87.02,
			        "start": 85.89,
			        "word": " return",
			      },
			      {
			        "end": 87.6,
			        "start": 87.02,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 90.2,
			    "start": 87.6,
			    "text": " Many Ukrainians outraged by the deal,",
			    "words": [
			      {
			        "end": 87.9,
			        "start": 87.6,
			        "word": " Many",
			      },
			      {
			        "end": 88.35,
			        "start": 87.9,
			        "word": " Ukrain",
			      },
			      {
			        "end": 88.65,
			        "start": 88.35,
			        "word": "ians",
			      },
			      {
			        "end": 89.03,
			        "start": 88.65,
			        "word": " outra",
			      },
			      {
			        "end": 89.29,
			        "start": 89.03,
			        "word": "ged",
			      },
			      {
			        "end": 89.48,
			        "start": 89.29,
			        "word": " by",
			      },
			      {
			        "end": 89.78,
			        "start": 89.48,
			        "word": " the",
			      },
			      {
			        "end": 90.2,
			        "start": 89.78,
			        "word": " deal",
			      },
			      {
			        "end": 90.2,
			        "start": 90.2,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 94.56,
			    "start": 90.2,
			    "text": " feeling it extorts their stricken country.",
			    "words": [
			      {
			        "end": 90.98,
			        "start": 90.2,
			        "word": " feeling",
			      },
			      {
			        "end": 91.21,
			        "start": 90.98,
			        "word": " it",
			      },
			      {
			        "end": 91.55,
			        "start": 91.21,
			        "word": " ext",
			      },
			      {
			        "end": 91.97,
			        "start": 91.55,
			        "word": "orts",
			      },
			      {
			        "end": 92.28,
			        "start": 91.97,
			        "word": " their",
			      },
			      {
			        "end": 92.85,
			        "start": 92.28,
			        "word": " str",
			      },
			      {
			        "end": 93.38,
			        "start": 92.85,
			        "word": "icken",
			      },
			      {
			        "end": 94.52,
			        "start": 93.38,
			        "word": " country",
			      },
			      {
			        "end": 94.56,
			        "start": 94.52,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 99.36,
			    "start": 94.56,
			    "text": " -A senior Ukrainian official has told us tonight that Ukraine has proposed to pay the U.S.",
			    "words": [
			      {
			        "end": 94.61,
			        "start": 94.56,
			        "word": " -",
			      },
			      {
			        "end": 94.66,
			        "start": 94.61,
			        "word": "A",
			      },
			      {
			        "end": 94.98,
			        "start": 94.66,
			        "word": " senior",
			      },
			      {
			        "end": 95.46,
			        "start": 94.98,
			        "word": " Ukrainian",
			      },
			      {
			        "end": 95.92,
			        "start": 95.46,
			        "word": " official",
			      },
			      {
			        "end": 96.11,
			        "start": 95.92,
			        "word": " has",
			      },
			      {
			        "end": 96.37,
			        "start": 96.11,
			        "word": " told",
			      },
			      {
			        "end": 96.52,
			        "start": 96.37,
			        "word": " us",
			      },
			      {
			        "end": 96.88,
			        "start": 96.52,
			        "word": " tonight",
			      },
			      {
			        "end": 97.14,
			        "start": 96.88,
			        "word": " that",
			      },
			      {
			        "end": 97.61,
			        "start": 97.14,
			        "word": " Ukraine",
			      },
			      {
			        "end": 97.87,
			        "start": 97.61,
			        "word": " has",
			      },
			      {
			        "end": 98.36,
			        "start": 97.87,
			        "word": " proposed",
			      },
			      {
			        "end": 98.5,
			        "start": 98.36,
			        "word": " to",
			      },
			      {
			        "end": 98.66,
			        "start": 98.5,
			        "word": " pay",
			      },
			      {
			        "end": 98.84,
			        "start": 98.66,
			        "word": " the",
			      },
			      {
			        "end": 99.32,
			        "start": 98.84,
			        "word": " U.S",
			      },
			      {
			        "end": 99.36,
			        "start": 99.32,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 100.76,
			    "start": 99.36,
			    "text": " $100 billion,",
			    "words": [
			      {
			        "end": 99.54,
			        "start": 99.36,
			        "word": " $",
			      },
			      {
			        "end": 100.18,
			        "start": 99.54,
			        "word": "100",
			      },
			      {
			        "end": 100.76,
			        "start": 100.18,
			        "word": " billion",
			      },
			      {
			        "end": 100.76,
			        "start": 100.76,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 110.2,
			    "start": 100.76,
			    "text": " but that same official telling us that President Zelensky will never sign a deal that "robs the country without providing any security guarantees."",
			    "words": [
			      {
			        "end": 101.07,
			        "start": 100.76,
			        "word": " but",
			      },
			      {
			        "end": 101.3,
			        "start": 101.07,
			        "word": " that",
			      },
			      {
			        "end": 101.8,
			        "start": 101.3,
			        "word": " same",
			      },
			      {
			        "end": 102.27,
			        "start": 101.8,
			        "word": " official",
			      },
			      {
			        "end": 102.58,
			        "start": 102.27,
			        "word": " telling",
			      },
			      {
			        "end": 102.69,
			        "start": 102.58,
			        "word": " us",
			      },
			      {
			        "end": 102.92,
			        "start": 102.69,
			        "word": " that",
			      },
			      {
			        "end": 103.46,
			        "start": 102.92,
			        "word": " President",
			      },
			      {
			        "end": 103.82,
			        "start": 103.46,
			        "word": " Zel",
			      },
			      {
			        "end": 103.93,
			        "start": 103.82,
			        "word": "ens",
			      },
			      {
			        "end": 103.96,
			        "start": 103.93,
			        "word": "ky",
			      },
			      {
			        "end": 104.29,
			        "start": 103.96,
			        "word": " will",
			      },
			      {
			        "end": 104.71,
			        "start": 104.29,
			        "word": " never",
			      },
			      {
			        "end": 105.04,
			        "start": 104.71,
			        "word": " sign",
			      },
			      {
			        "end": 105.12,
			        "start": 105.04,
			        "word": " a",
			      },
			      {
			        "end": 105.48,
			        "start": 105.12,
			        "word": " deal",
			      },
			      {
			        "end": 105.87,
			        "start": 105.48,
			        "word": " that",
			      },
			      {
			        "end": 105.99,
			        "start": 105.87,
			        "word": " "",
			      },
			      {
			        "end": 106.12,
			        "start": 105.99,
			        "word": "ro",
			      },
			      {
			        "end": 106.31,
			        "start": 106.12,
			        "word": "bs",
			      },
			      {
			        "end": 106.57,
			        "start": 106.31,
			        "word": " the",
			      },
			      {
			        "end": 107.24,
			        "start": 106.57,
			        "word": " country",
			      },
			      {
			        "end": 107.74,
			        "start": 107.24,
			        "word": " without",
			      },
			      {
			        "end": 108.38,
			        "start": 107.74,
			        "word": " providing",
			      },
			      {
			        "end": 108.59,
			        "start": 108.38,
			        "word": " any",
			      },
			      {
			        "end": 109.16,
			        "start": 108.59,
			        "word": " security",
			      },
			      {
			        "end": 110.15,
			        "start": 109.16,
			        "word": " guarantees",
			      },
			      {
			        "end": 110.2,
			        "start": 110.15,
			        "word": "."",
			      },
			    ],
			  },
			  {
			    "end": 112.2,
			    "start": 110.2,
			    "text": " >> Patrick Riebel, thank you.",
			    "words": [
			      {
			        "end": 110.2,
			        "start": 110.2,
			        "word": "",
			      },
			      {
			        "end": 110.35,
			        "start": 110.2,
			        "word": " >>",
			      },
			      {
			        "end": 110.91,
			        "start": 110.35,
			        "word": " Patrick",
			      },
			      {
			        "end": 110.99,
			        "start": 110.91,
			        "word": " R",
			      },
			      {
			        "end": 111.14,
			        "start": 110.99,
			        "word": "ie",
			      },
			      {
			        "end": 111.37,
			        "start": 111.14,
			        "word": "bel",
			      },
			      {
			        "end": 111.56,
			        "start": 111.37,
			        "word": ",",
			      },
			      {
			        "end": 111.92,
			        "start": 111.56,
			        "word": " thank",
			      },
			      {
			        "end": 112.2,
			        "start": 111.92,
			        "word": " you",
			      },
			      {
			        "end": 112.2,
			        "start": 112.2,
			        "word": ".",
			      },
			    ],
			  },
			]
		`)
	})
})
