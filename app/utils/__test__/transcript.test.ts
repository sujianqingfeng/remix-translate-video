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
			    "end": 3.2,
			    "start": 0,
			    "text": " On the 27th of December 2024,",
			    "words": [
			      {
			        "end": 0.06,
			        "start": 0,
			        "word": "",
			      },
			      {
			        "end": 0.17,
			        "start": 0.06,
			        "word": " On",
			      },
			      {
			        "end": 0.58,
			        "start": 0.17,
			        "word": " the",
			      },
			      {
			        "end": 0.93,
			        "start": 0.58,
			        "word": " 27",
			      },
			      {
			        "end": 1.1,
			        "start": 0.93,
			        "word": "th",
			      },
			      {
			        "end": 1.27,
			        "start": 1.1,
			        "word": " of",
			      },
			      {
			        "end": 1.95,
			        "start": 1.27,
			        "word": " December",
			      },
			      {
			        "end": 3,
			        "start": 1.95,
			        "word": " 2024",
			      },
			      {
			        "end": 3.2,
			        "start": 3,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 9.5,
			    "start": 3.2,
			    "text": " the Chinese have shown the Type 76 light carrier in a public ceremony.",
			    "words": [
			      {
			        "end": 3.8,
			        "start": 3.2,
			        "word": " the",
			      },
			      {
			        "end": 4.2,
			        "start": 3.8,
			        "word": " Chinese",
			      },
			      {
			        "end": 4.6,
			        "start": 4.2,
			        "word": " have",
			      },
			      {
			        "end": 5.12,
			        "start": 4.6,
			        "word": " shown",
			      },
			      {
			        "end": 5.45,
			        "start": 5.12,
			        "word": " the",
			      },
			      {
			        "end": 5.79,
			        "start": 5.45,
			        "word": " Type",
			      },
			      {
			        "end": 6.35,
			        "start": 5.79,
			        "word": " 76",
			      },
			      {
			        "end": 6.85,
			        "start": 6.35,
			        "word": " light",
			      },
			      {
			        "end": 7.52,
			        "start": 6.85,
			        "word": " carrier",
			      },
			      {
			        "end": 8.21,
			        "start": 7.52,
			        "word": " in",
			      },
			      {
			        "end": 8.56,
			        "start": 8.21,
			        "word": " a",
			      },
			      {
			        "end": 8.92,
			        "start": 8.56,
			        "word": " public",
			      },
			      {
			        "end": 9.5,
			        "start": 8.92,
			        "word": " ceremony",
			      },
			      {
			        "end": 9.5,
			        "start": 9.5,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 14.88,
			    "start": 9.5,
			    "text": " So we all had a good look at the ship and we all got questions.",
			    "words": [
			      {
			        "end": 9.7,
			        "start": 9.5,
			        "word": " So",
			      },
			      {
			        "end": 10.11,
			        "start": 9.7,
			        "word": " we",
			      },
			      {
			        "end": 10.23,
			        "start": 10.11,
			        "word": " all",
			      },
			      {
			        "end": 10.54,
			        "start": 10.23,
			        "word": " had",
			      },
			      {
			        "end": 10.67,
			        "start": 10.54,
			        "word": " a",
			      },
			      {
			        "end": 11.06,
			        "start": 10.67,
			        "word": " good",
			      },
			      {
			        "end": 11.48,
			        "start": 11.06,
			        "word": " look",
			      },
			      {
			        "end": 11.69,
			        "start": 11.48,
			        "word": " at",
			      },
			      {
			        "end": 12,
			        "start": 11.69,
			        "word": " the",
			      },
			      {
			        "end": 12.42,
			        "start": 12,
			        "word": " ship",
			      },
			      {
			        "end": 12.73,
			        "start": 12.42,
			        "word": " and",
			      },
			      {
			        "end": 12.94,
			        "start": 12.73,
			        "word": " we",
			      },
			      {
			        "end": 13.25,
			        "start": 12.94,
			        "word": " all",
			      },
			      {
			        "end": 13.69,
			        "start": 13.25,
			        "word": " got",
			      },
			      {
			        "end": 14.49,
			        "start": 13.69,
			        "word": " questions",
			      },
			      {
			        "end": 14.88,
			        "start": 14.49,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 18.62,
			    "start": 14.88,
			    "text": " And the main one is, what is the ship for?",
			    "words": [
			      {
			        "end": 15.33,
			        "start": 14.88,
			        "word": " And",
			      },
			      {
			        "end": 15.5,
			        "start": 15.33,
			        "word": " the",
			      },
			      {
			        "end": 15.91,
			        "start": 15.5,
			        "word": " main",
			      },
			      {
			        "end": 16.22,
			        "start": 15.91,
			        "word": " one",
			      },
			      {
			        "end": 16.42,
			        "start": 16.22,
			        "word": " is",
			      },
			      {
			        "end": 16.81,
			        "start": 16.42,
			        "word": ",",
			      },
			      {
			        "end": 17.03,
			        "start": 16.81,
			        "word": " what",
			      },
			      {
			        "end": 17.23,
			        "start": 17.03,
			        "word": " is",
			      },
			      {
			        "end": 17.64,
			        "start": 17.23,
			        "word": " the",
			      },
			      {
			        "end": 17.93,
			        "start": 17.64,
			        "word": " ship",
			      },
			      {
			        "end": 18.31,
			        "start": 17.93,
			        "word": " for",
			      },
			      {
			        "end": 18.62,
			        "start": 18.31,
			        "word": "?",
			      },
			    ],
			  },
			  {
			    "end": 23.98,
			    "start": 18.62,
			    "text": " Because it is clearly not the same mission of similarly looking ship,",
			    "words": [
			      {
			        "end": 19.25,
			        "start": 18.62,
			        "word": " Because",
			      },
			      {
			        "end": 19.43,
			        "start": 19.25,
			        "word": " it",
			      },
			      {
			        "end": 19.61,
			        "start": 19.43,
			        "word": " is",
			      },
			      {
			        "end": 20.24,
			        "start": 19.61,
			        "word": " clearly",
			      },
			      {
			        "end": 20.5,
			        "start": 20.24,
			        "word": " not",
			      },
			      {
			        "end": 20.8,
			        "start": 20.5,
			        "word": " the",
			      },
			      {
			        "end": 21.14,
			        "start": 20.8,
			        "word": " same",
			      },
			      {
			        "end": 21.77,
			        "start": 21.14,
			        "word": " mission",
			      },
			      {
			        "end": 21.98,
			        "start": 21.77,
			        "word": " of",
			      },
			      {
			        "end": 22.76,
			        "start": 21.98,
			        "word": " similarly",
			      },
			      {
			        "end": 23.39,
			        "start": 22.76,
			        "word": " looking",
			      },
			      {
			        "end": 23.76,
			        "start": 23.39,
			        "word": " ship",
			      },
			      {
			        "end": 23.98,
			        "start": 23.76,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 26.66,
			    "start": 23.98,
			    "text": " actually, not even close.",
			    "words": [
			      {
			        "end": 24.81,
			        "start": 23.98,
			        "word": " actually",
			      },
			      {
			        "end": 25.29,
			        "start": 24.81,
			        "word": ",",
			      },
			      {
			        "end": 25.35,
			        "start": 25.29,
			        "word": " not",
			      },
			      {
			        "end": 25.85,
			        "start": 25.35,
			        "word": " even",
			      },
			      {
			        "end": 26.32,
			        "start": 25.85,
			        "word": " close",
			      },
			      {
			        "end": 26.66,
			        "start": 26.32,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 38.82,
			    "start": 26.66,
			    "text": " We all know that the world is changing and one of the most apparent signs is the Chinese naval development.",
			    "words": [
			      {
			        "end": 26.66,
			        "start": 26.66,
			        "word": "",
			      },
			      {
			        "end": 26.97,
			        "start": 26.66,
			        "word": " We",
			      },
			      {
			        "end": 27.44,
			        "start": 26.97,
			        "word": " all",
			      },
			      {
			        "end": 28.07,
			        "start": 27.44,
			        "word": " know",
			      },
			      {
			        "end": 28.7,
			        "start": 28.07,
			        "word": " that",
			      },
			      {
			        "end": 29.17,
			        "start": 28.7,
			        "word": " the",
			      },
			      {
			        "end": 29.95,
			        "start": 29.17,
			        "word": " world",
			      },
			      {
			        "end": 30.26,
			        "start": 29.95,
			        "word": " is",
			      },
			      {
			        "end": 31.52,
			        "start": 30.26,
			        "word": " changing",
			      },
			      {
			        "end": 31.99,
			        "start": 31.52,
			        "word": " and",
			      },
			      {
			        "end": 32.46,
			        "start": 31.99,
			        "word": " one",
			      },
			      {
			        "end": 32.77,
			        "start": 32.46,
			        "word": " of",
			      },
			      {
			        "end": 33.29,
			        "start": 32.77,
			        "word": " the",
			      },
			      {
			        "end": 33.87,
			        "start": 33.29,
			        "word": " most",
			      },
			      {
			        "end": 35.13,
			        "start": 33.87,
			        "word": " apparent",
			      },
			      {
			        "end": 35.95,
			        "start": 35.13,
			        "word": " signs",
			      },
			      {
			        "end": 36.22,
			        "start": 35.95,
			        "word": " is",
			      },
			      {
			        "end": 36.69,
			        "start": 36.22,
			        "word": " the",
			      },
			      {
			        "end": 37.88,
			        "start": 36.69,
			        "word": " Chinese",
			      },
			      {
			        "end": 38.16,
			        "start": 37.88,
			        "word": " naval",
			      },
			      {
			        "end": 38.82,
			        "start": 38.16,
			        "word": " development",
			      },
			      {
			        "end": 38.82,
			        "start": 38.82,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 43.56,
			    "start": 38.82,
			    "text": " And most prominent in this context is the development of a carrier fleet.",
			    "words": [
			      {
			        "end": 39.07,
			        "start": 38.82,
			        "word": " And",
			      },
			      {
			        "end": 39.34,
			        "start": 39.07,
			        "word": " most",
			      },
			      {
			        "end": 40.04,
			        "start": 39.34,
			        "word": " prominent",
			      },
			      {
			        "end": 40.15,
			        "start": 40.04,
			        "word": " in",
			      },
			      {
			        "end": 40.51,
			        "start": 40.15,
			        "word": " this",
			      },
			      {
			        "end": 40.96,
			        "start": 40.51,
			        "word": " context",
			      },
			      {
			        "end": 41.22,
			        "start": 40.96,
			        "word": " is",
			      },
			      {
			        "end": 41.42,
			        "start": 41.22,
			        "word": " the",
			      },
			      {
			        "end": 42.17,
			        "start": 41.42,
			        "word": " development",
			      },
			      {
			        "end": 42.39,
			        "start": 42.17,
			        "word": " of",
			      },
			      {
			        "end": 42.44,
			        "start": 42.39,
			        "word": " a",
			      },
			      {
			        "end": 42.91,
			        "start": 42.44,
			        "word": " carrier",
			      },
			      {
			        "end": 43.28,
			        "start": 42.91,
			        "word": " fleet",
			      },
			      {
			        "end": 43.56,
			        "start": 43.28,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 46.44,
			    "start": 43.56,
			    "text": " The Chinese are confronting the Western,",
			    "words": [
			      {
			        "end": 43.83,
			        "start": 43.56,
			        "word": " The",
			      },
			      {
			        "end": 44.36,
			        "start": 43.83,
			        "word": " Chinese",
			      },
			      {
			        "end": 44.64,
			        "start": 44.36,
			        "word": " are",
			      },
			      {
			        "end": 45.48,
			        "start": 44.64,
			        "word": " confronting",
			      },
			      {
			        "end": 45.72,
			        "start": 45.48,
			        "word": " the",
			      },
			      {
			        "end": 46.28,
			        "start": 45.72,
			        "word": " Western",
			      },
			      {
			        "end": 46.44,
			        "start": 46.28,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 47.72,
			    "start": 46.44,
			    "text": " mostly American,",
			    "words": [
			      {
			        "end": 46.92,
			        "start": 46.44,
			        "word": " mostly",
			      },
			      {
			        "end": 47.56,
			        "start": 46.92,
			        "word": " American",
			      },
			      {
			        "end": 47.72,
			        "start": 47.56,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 51.74,
			    "start": 47.72,
			    "text": " military power both asymmetrically and symmetrically.",
			    "words": [
			      {
			        "end": 48.57,
			        "start": 47.72,
			        "word": " military",
			      },
			      {
			        "end": 48.76,
			        "start": 48.57,
			        "word": " power",
			      },
			      {
			        "end": 49.08,
			        "start": 48.76,
			        "word": " both",
			      },
			      {
			        "end": 49.57,
			        "start": 49.08,
			        "word": " asymm",
			      },
			      {
			        "end": 49.74,
			        "start": 49.57,
			        "word": "etr",
			      },
			      {
			        "end": 50.21,
			        "start": 49.74,
			        "word": "ically",
			      },
			      {
			        "end": 50.54,
			        "start": 50.21,
			        "word": " and",
			      },
			      {
			        "end": 50.79,
			        "start": 50.54,
			        "word": " symm",
			      },
			      {
			        "end": 51,
			        "start": 50.79,
			        "word": "etr",
			      },
			      {
			        "end": 51.44,
			        "start": 51,
			        "word": "ically",
			      },
			      {
			        "end": 51.74,
			        "start": 51.44,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 57.28,
			    "start": 51.74,
			    "text": " An asymmetrical reply implies responding to a challenge with different technologies,",
			    "words": [
			      {
			        "end": 51.74,
			        "start": 51.74,
			        "word": "",
			      },
			      {
			        "end": 52.05,
			        "start": 51.74,
			        "word": " An",
			      },
			      {
			        "end": 52.24,
			        "start": 52.05,
			        "word": " asymm",
			      },
			      {
			        "end": 52.75,
			        "start": 52.24,
			        "word": "etrical",
			      },
			      {
			        "end": 53.11,
			        "start": 52.75,
			        "word": " reply",
			      },
			      {
			        "end": 53.62,
			        "start": 53.11,
			        "word": " implies",
			      },
			      {
			        "end": 54.35,
			        "start": 53.62,
			        "word": " responding",
			      },
			      {
			        "end": 54.49,
			        "start": 54.35,
			        "word": " to",
			      },
			      {
			        "end": 54.56,
			        "start": 54.49,
			        "word": " a",
			      },
			      {
			        "end": 55.25,
			        "start": 54.56,
			        "word": " challenge",
			      },
			      {
			        "end": 55.51,
			        "start": 55.25,
			        "word": " with",
			      },
			      {
			        "end": 56.37,
			        "start": 55.51,
			        "word": " different",
			      },
			      {
			        "end": 57.05,
			        "start": 56.37,
			        "word": " technologies",
			      },
			      {
			        "end": 57.28,
			        "start": 57.05,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 60.6,
			    "start": 57.28,
			    "text": " different operational concepts and different tactics.",
			    "words": [
			      {
			        "end": 57.87,
			        "start": 57.28,
			        "word": " different",
			      },
			      {
			        "end": 58.64,
			        "start": 57.87,
			        "word": " operational",
			      },
			      {
			        "end": 59.13,
			        "start": 58.64,
			        "word": " concepts",
			      },
			      {
			        "end": 59.5,
			        "start": 59.13,
			        "word": " and",
			      },
			      {
			        "end": 59.91,
			        "start": 59.5,
			        "word": " different",
			      },
			      {
			        "end": 60.41,
			        "start": 59.91,
			        "word": " tactics",
			      },
			      {
			        "end": 60.6,
			        "start": 60.41,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 61.45,
			    "start": 60.6,
			    "text": " For example,",
			    "words": [
			      {
			        "end": 60.9,
			        "start": 60.6,
			        "word": " For",
			      },
			      {
			        "end": 61.31,
			        "start": 60.9,
			        "word": " example",
			      },
			      {
			        "end": 61.45,
			        "start": 61.31,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 69.18,
			    "start": 61.45,
			    "text": " China is challenging the US carrier fleet with anti-ship ballistic and hypersonic missiles and this is an asymmetric reply.",
			    "words": [
			      {
			        "end": 61.81,
			        "start": 61.45,
			        "word": " China",
			      },
			      {
			        "end": 61.98,
			        "start": 61.81,
			        "word": " is",
			      },
			      {
			        "end": 62.74,
			        "start": 61.98,
			        "word": " challenging",
			      },
			      {
			        "end": 62.95,
			        "start": 62.74,
			        "word": " the",
			      },
			      {
			        "end": 63.09,
			        "start": 62.95,
			        "word": " US",
			      },
			      {
			        "end": 63.59,
			        "start": 63.09,
			        "word": " carrier",
			      },
			      {
			        "end": 64.02,
			        "start": 63.59,
			        "word": " fleet",
			      },
			      {
			        "end": 64.23,
			        "start": 64.02,
			        "word": " with",
			      },
			      {
			        "end": 64.52,
			        "start": 64.23,
			        "word": " anti",
			      },
			      {
			        "end": 64.62,
			        "start": 64.52,
			        "word": "-",
			      },
			      {
			        "end": 64.86,
			        "start": 64.62,
			        "word": "ship",
			      },
			      {
			        "end": 65.5,
			        "start": 64.86,
			        "word": " ballistic",
			      },
			      {
			        "end": 65.71,
			        "start": 65.5,
			        "word": " and",
			      },
			      {
			        "end": 65.92,
			        "start": 65.71,
			        "word": " hyp",
			      },
			      {
			        "end": 66.42,
			        "start": 65.92,
			        "word": "ersonic",
			      },
			      {
			        "end": 66.99,
			        "start": 66.42,
			        "word": " missiles",
			      },
			      {
			        "end": 67.4,
			        "start": 66.99,
			        "word": " and",
			      },
			      {
			        "end": 67.48,
			        "start": 67.4,
			        "word": " this",
			      },
			      {
			        "end": 67.62,
			        "start": 67.48,
			        "word": " is",
			      },
			      {
			        "end": 67.76,
			        "start": 67.62,
			        "word": " an",
			      },
			      {
			        "end": 68.12,
			        "start": 67.76,
			        "word": " asymm",
			      },
			      {
			        "end": 68.47,
			        "start": 68.12,
			        "word": "etric",
			      },
			      {
			        "end": 68.9,
			        "start": 68.47,
			        "word": " reply",
			      },
			      {
			        "end": 69.18,
			        "start": 68.9,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 75.66,
			    "start": 69.18,
			    "text": " But China is also expanding and quickly developing its carrier fleet and this is a symmetric reply.",
			    "words": [
			      {
			        "end": 69.52,
			        "start": 69.18,
			        "word": " But",
			      },
			      {
			        "end": 69.78,
			        "start": 69.52,
			        "word": " China",
			      },
			      {
			        "end": 69.93,
			        "start": 69.78,
			        "word": " is",
			      },
			      {
			        "end": 70.23,
			        "start": 69.93,
			        "word": " also",
			      },
			      {
			        "end": 70.98,
			        "start": 70.23,
			        "word": " expanding",
			      },
			      {
			        "end": 71.13,
			        "start": 70.98,
			        "word": " and",
			      },
			      {
			        "end": 71.66,
			        "start": 71.13,
			        "word": " quickly",
			      },
			      {
			        "end": 72.43,
			        "start": 71.66,
			        "word": " developing",
			      },
			      {
			        "end": 72.64,
			        "start": 72.43,
			        "word": " its",
			      },
			      {
			        "end": 73.29,
			        "start": 72.64,
			        "word": " carrier",
			      },
			      {
			        "end": 73.77,
			        "start": 73.29,
			        "word": " fleet",
			      },
			      {
			        "end": 73.82,
			        "start": 73.77,
			        "word": " and",
			      },
			      {
			        "end": 74.07,
			        "start": 73.82,
			        "word": " this",
			      },
			      {
			        "end": 74.23,
			        "start": 74.07,
			        "word": " is",
			      },
			      {
			        "end": 74.29,
			        "start": 74.23,
			        "word": " a",
			      },
			      {
			        "end": 74.97,
			        "start": 74.29,
			        "word": " symmetric",
			      },
			      {
			        "end": 75.36,
			        "start": 74.97,
			        "word": " reply",
			      },
			      {
			        "end": 75.66,
			        "start": 75.36,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 78.94,
			    "start": 75.66,
			    "text": " Well, if you're here, you most likely already know the story.",
			    "words": [
			      {
			        "end": 75.98,
			        "start": 75.66,
			        "word": " Well",
			      },
			      {
			        "end": 76,
			        "start": 75.98,
			        "word": ",",
			      },
			      {
			        "end": 76.11,
			        "start": 76,
			        "word": " if",
			      },
			      {
			        "end": 76.28,
			        "start": 76.11,
			        "word": " you",
			      },
			      {
			        "end": 76.45,
			        "start": 76.28,
			        "word": "'re",
			      },
			      {
			        "end": 76.68,
			        "start": 76.45,
			        "word": " here",
			      },
			      {
			        "end": 76.79,
			        "start": 76.68,
			        "word": ",",
			      },
			      {
			        "end": 77,
			        "start": 76.79,
			        "word": " you",
			      },
			      {
			        "end": 77.19,
			        "start": 77,
			        "word": " most",
			      },
			      {
			        "end": 77.54,
			        "start": 77.19,
			        "word": " likely",
			      },
			      {
			        "end": 77.95,
			        "start": 77.54,
			        "word": " already",
			      },
			      {
			        "end": 78.18,
			        "start": 77.95,
			        "word": " know",
			      },
			      {
			        "end": 78.35,
			        "start": 78.18,
			        "word": " the",
			      },
			      {
			        "end": 78.64,
			        "start": 78.35,
			        "word": " story",
			      },
			      {
			        "end": 78.94,
			        "start": 78.64,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 80.08,
			    "start": 78.94,
			    "text": " I don't.",
			    "words": [
			      {
			        "end": 79.06,
			        "start": 78.94,
			        "word": " I",
			      },
			      {
			        "end": 79.44,
			        "start": 79.06,
			        "word": " don",
			      },
			      {
			        "end": 79.77,
			        "start": 79.44,
			        "word": "'t",
			      },
			      {
			        "end": 80.08,
			        "start": 79.77,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 81.68,
			    "start": 80.08,
			    "text": " Otis, what are you trying to say?",
			    "words": [
			      {
			        "end": 80.18,
			        "start": 80.08,
			        "word": "",
			      },
			      {
			        "end": 80.19,
			        "start": 80.18,
			        "word": " Ot",
			      },
			      {
			        "end": 80.31,
			        "start": 80.19,
			        "word": "is",
			      },
			      {
			        "end": 80.38,
			        "start": 80.31,
			        "word": ",",
			      },
			      {
			        "end": 80.59,
			        "start": 80.38,
			        "word": " what",
			      },
			      {
			        "end": 80.84,
			        "start": 80.59,
			        "word": " are",
			      },
			      {
			        "end": 80.91,
			        "start": 80.84,
			        "word": " you",
			      },
			      {
			        "end": 81.22,
			        "start": 80.91,
			        "word": " trying",
			      },
			      {
			        "end": 81.32,
			        "start": 81.22,
			        "word": " to",
			      },
			      {
			        "end": 81.48,
			        "start": 81.32,
			        "word": " say",
			      },
			      {
			        "end": 81.68,
			        "start": 81.48,
			        "word": "?",
			      },
			    ],
			  },
			  {
			    "end": 84.96,
			    "start": 81.68,
			    "text": " That a quick recap would be useful for the viewers, sir.",
			    "words": [
			      {
			        "end": 81.96,
			        "start": 81.68,
			        "word": " That",
			      },
			      {
			        "end": 82,
			        "start": 81.96,
			        "word": " a",
			      },
			      {
			        "end": 82.35,
			        "start": 82,
			        "word": " quick",
			      },
			      {
			        "end": 82.66,
			        "start": 82.35,
			        "word": " recap",
			      },
			      {
			        "end": 82.99,
			        "start": 82.66,
			        "word": " would",
			      },
			      {
			        "end": 83.12,
			        "start": 82.99,
			        "word": " be",
			      },
			      {
			        "end": 83.51,
			        "start": 83.12,
			        "word": " useful",
			      },
			      {
			        "end": 83.72,
			        "start": 83.51,
			        "word": " for",
			      },
			      {
			        "end": 83.92,
			        "start": 83.72,
			        "word": " the",
			      },
			      {
			        "end": 84.38,
			        "start": 83.92,
			        "word": " viewers",
			      },
			      {
			        "end": 84.67,
			        "start": 84.38,
			        "word": ",",
			      },
			      {
			        "end": 84.71,
			        "start": 84.67,
			        "word": " sir",
			      },
			      {
			        "end": 84.96,
			        "start": 84.71,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 86.38,
			    "start": 84.96,
			    "text": " Okay, okay.",
			    "words": [
			      {
			        "end": 85.5,
			        "start": 84.96,
			        "word": " Okay",
			      },
			      {
			        "end": 85.6,
			        "start": 85.5,
			        "word": ",",
			      },
			      {
			        "end": 86.08,
			        "start": 85.6,
			        "word": " okay",
			      },
			      {
			        "end": 86.38,
			        "start": 86.08,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 96.4,
			    "start": 86.38,
			    "text": " The Chinese development of carrier aviation started in the late 90s when the Chinese purchased the ex-Soviet carrier Varyag from Ukraine.",
			    "words": [
			      {
			        "end": 86.85,
			        "start": 86.38,
			        "word": " The",
			      },
			      {
			        "end": 87.16,
			        "start": 86.85,
			        "word": " Chinese",
			      },
			      {
			        "end": 88.03,
			        "start": 87.16,
			        "word": " development",
			      },
			      {
			        "end": 88.17,
			        "start": 88.03,
			        "word": " of",
			      },
			      {
			        "end": 88.76,
			        "start": 88.17,
			        "word": " carrier",
			      },
			      {
			        "end": 89.36,
			        "start": 88.76,
			        "word": " aviation",
			      },
			      {
			        "end": 89.91,
			        "start": 89.36,
			        "word": " started",
			      },
			      {
			        "end": 90.13,
			        "start": 89.91,
			        "word": " in",
			      },
			      {
			        "end": 90.29,
			        "start": 90.13,
			        "word": " the",
			      },
			      {
			        "end": 90.6,
			        "start": 90.29,
			        "word": " late",
			      },
			      {
			        "end": 91.07,
			        "start": 90.6,
			        "word": " 90",
			      },
			      {
			        "end": 91.44,
			        "start": 91.07,
			        "word": "s",
			      },
			      {
			        "end": 91.58,
			        "start": 91.44,
			        "word": " when",
			      },
			      {
			        "end": 92.01,
			        "start": 91.58,
			        "word": " the",
			      },
			      {
			        "end": 92.44,
			        "start": 92.01,
			        "word": " Chinese",
			      },
			      {
			        "end": 93.22,
			        "start": 92.44,
			        "word": " purchased",
			      },
			      {
			        "end": 93.54,
			        "start": 93.22,
			        "word": " the",
			      },
			      {
			        "end": 93.66,
			        "start": 93.54,
			        "word": " ex",
			      },
			      {
			        "end": 93.74,
			        "start": 93.66,
			        "word": "-",
			      },
			      {
			        "end": 93.82,
			        "start": 93.74,
			        "word": "S",
			      },
			      {
			        "end": 93.98,
			        "start": 93.82,
			        "word": "ov",
			      },
			      {
			        "end": 94.23,
			        "start": 93.98,
			        "word": "iet",
			      },
			      {
			        "end": 94.78,
			        "start": 94.23,
			        "word": " carrier",
			      },
			      {
			        "end": 94.86,
			        "start": 94.78,
			        "word": " V",
			      },
			      {
			        "end": 95.1,
			        "start": 94.86,
			        "word": "ary",
			      },
			      {
			        "end": 95.26,
			        "start": 95.1,
			        "word": "ag",
			      },
			      {
			        "end": 95.73,
			        "start": 95.26,
			        "word": " from",
			      },
			      {
			        "end": 96.14,
			        "start": 95.73,
			        "word": " Ukraine",
			      },
			      {
			        "end": 96.4,
			        "start": 96.14,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 102.08,
			    "start": 96.4,
			    "text": " It was just a rotting skeleton that was never completed because of the fall of the Soviet Union.",
			    "words": [
			      {
			        "end": 96.73,
			        "start": 96.4,
			        "word": " It",
			      },
			      {
			        "end": 96.75,
			        "start": 96.73,
			        "word": " was",
			      },
			      {
			        "end": 97.03,
			        "start": 96.75,
			        "word": " just",
			      },
			      {
			        "end": 97.1,
			        "start": 97.03,
			        "word": " a",
			      },
			      {
			        "end": 97.31,
			        "start": 97.1,
			        "word": " rot",
			      },
			      {
			        "end": 97.58,
			        "start": 97.31,
			        "word": "ting",
			      },
			      {
			        "end": 98.16,
			        "start": 97.58,
			        "word": " skeleton",
			      },
			      {
			        "end": 98.44,
			        "start": 98.16,
			        "word": " that",
			      },
			      {
			        "end": 98.63,
			        "start": 98.44,
			        "word": " was",
			      },
			      {
			        "end": 99,
			        "start": 98.63,
			        "word": " never",
			      },
			      {
			        "end": 99.61,
			        "start": 99,
			        "word": " completed",
			      },
			      {
			        "end": 100.16,
			        "start": 99.61,
			        "word": " because",
			      },
			      {
			        "end": 100.3,
			        "start": 100.16,
			        "word": " of",
			      },
			      {
			        "end": 100.45,
			        "start": 100.3,
			        "word": " the",
			      },
			      {
			        "end": 100.72,
			        "start": 100.45,
			        "word": " fall",
			      },
			      {
			        "end": 100.95,
			        "start": 100.72,
			        "word": " of",
			      },
			      {
			        "end": 101.08,
			        "start": 100.95,
			        "word": " the",
			      },
			      {
			        "end": 101.5,
			        "start": 101.08,
			        "word": " Soviet",
			      },
			      {
			        "end": 101.85,
			        "start": 101.5,
			        "word": " Union",
			      },
			      {
			        "end": 102.08,
			        "start": 101.85,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 105.54,
			    "start": 102.08,
			    "text": " They touted it around the world, reaching China in 2002.",
			    "words": [
			      {
			        "end": 102.33,
			        "start": 102.08,
			        "word": " They",
			      },
			      {
			        "end": 102.56,
			        "start": 102.33,
			        "word": " tout",
			      },
			      {
			        "end": 102.65,
			        "start": 102.56,
			        "word": "ed",
			      },
			      {
			        "end": 102.76,
			        "start": 102.65,
			        "word": " it",
			      },
			      {
			        "end": 103.11,
			        "start": 102.76,
			        "word": " around",
			      },
			      {
			        "end": 103.28,
			        "start": 103.11,
			        "word": " the",
			      },
			      {
			        "end": 103.57,
			        "start": 103.28,
			        "word": " world",
			      },
			      {
			        "end": 103.68,
			        "start": 103.57,
			        "word": ",",
			      },
			      {
			        "end": 104.15,
			        "start": 103.68,
			        "word": " reaching",
			      },
			      {
			        "end": 104.44,
			        "start": 104.15,
			        "word": " China",
			      },
			      {
			        "end": 104.55,
			        "start": 104.44,
			        "word": " in",
			      },
			      {
			        "end": 105.26,
			        "start": 104.55,
			        "word": " 2002",
			      },
			      {
			        "end": 105.54,
			        "start": 105.26,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 108.26,
			    "start": 105.9,
			    "text": " And this is a terrific story in itself,",
			    "words": [
			      {
			        "end": 105.91,
			        "start": 105.9,
			        "word": "",
			      },
			      {
			        "end": 106.11,
			        "start": 105.91,
			        "word": " And",
			      },
			      {
			        "end": 106.4,
			        "start": 106.11,
			        "word": " this",
			      },
			      {
			        "end": 106.59,
			        "start": 106.4,
			        "word": " is",
			      },
			      {
			        "end": 106.61,
			        "start": 106.59,
			        "word": " a",
			      },
			      {
			        "end": 107.25,
			        "start": 106.61,
			        "word": " terrific",
			      },
			      {
			        "end": 107.55,
			        "start": 107.25,
			        "word": " story",
			      },
			      {
			        "end": 107.71,
			        "start": 107.55,
			        "word": " in",
			      },
			      {
			        "end": 108.14,
			        "start": 107.71,
			        "word": " itself",
			      },
			      {
			        "end": 108.26,
			        "start": 108.14,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 111.54,
			    "start": 108.26,
			    "text": " and I hope someday someone will make a movie about it.",
			    "words": [
			      {
			        "end": 108.47,
			        "start": 108.26,
			        "word": " and",
			      },
			      {
			        "end": 108.54,
			        "start": 108.47,
			        "word": " I",
			      },
			      {
			        "end": 108.83,
			        "start": 108.54,
			        "word": " hope",
			      },
			      {
			        "end": 109.33,
			        "start": 108.83,
			        "word": " someday",
			      },
			      {
			        "end": 109.83,
			        "start": 109.33,
			        "word": " someone",
			      },
			      {
			        "end": 110.12,
			        "start": 109.83,
			        "word": " will",
			      },
			      {
			        "end": 110.41,
			        "start": 110.12,
			        "word": " make",
			      },
			      {
			        "end": 110.48,
			        "start": 110.41,
			        "word": " a",
			      },
			      {
			        "end": 110.84,
			        "start": 110.48,
			        "word": " movie",
			      },
			      {
			        "end": 111.28,
			        "start": 110.84,
			        "word": " about",
			      },
			      {
			        "end": 111.38,
			        "start": 111.28,
			        "word": " it",
			      },
			      {
			        "end": 111.54,
			        "start": 111.38,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 113.98,
			    "start": 111.54,
			    "text": " Directed by Christopher Nolan, sir.",
			    "words": [
			      {
			        "end": 111.97,
			        "start": 111.54,
			        "word": " Direct",
			      },
			      {
			        "end": 112.11,
			        "start": 111.97,
			        "word": "ed",
			      },
			      {
			        "end": 112.25,
			        "start": 112.11,
			        "word": " by",
			      },
			      {
			        "end": 113.03,
			        "start": 112.25,
			        "word": " Christopher",
			      },
			      {
			        "end": 113.37,
			        "start": 113.03,
			        "word": " Nolan",
			      },
			      {
			        "end": 113.57,
			        "start": 113.37,
			        "word": ",",
			      },
			      {
			        "end": 113.73,
			        "start": 113.57,
			        "word": " sir",
			      },
			      {
			        "end": 113.98,
			        "start": 113.73,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 116.54,
			    "start": 113.98,
			    "text": " Why Christopher Nolan?",
			    "words": [
			      {
			        "end": 114.52,
			        "start": 113.98,
			        "word": " Why",
			      },
			      {
			        "end": 115.59,
			        "start": 114.52,
			        "word": " Christopher",
			      },
			      {
			        "end": 116.17,
			        "start": 115.59,
			        "word": " Nolan",
			      },
			      {
			        "end": 116.54,
			        "start": 116.17,
			        "word": "?",
			      },
			    ],
			  },
			  {
			    "end": 118.12,
			    "start": 116.54,
			    "text": " No CGI, sir.",
			    "words": [
			      {
			        "end": 116.78,
			        "start": 116.54,
			        "word": " No",
			      },
			      {
			        "end": 117.14,
			        "start": 116.78,
			        "word": " CGI",
			      },
			      {
			        "end": 117.38,
			        "start": 117.14,
			        "word": ",",
			      },
			      {
			        "end": 117.84,
			        "start": 117.38,
			        "word": " sir",
			      },
			      {
			        "end": 118.12,
			        "start": 117.84,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 119.38,
			    "start": 118.12,
			    "text": " Okay, Otis.",
			    "words": [
			      {
			        "end": 118.5,
			        "start": 118.12,
			        "word": " Okay",
			      },
			      {
			        "end": 118.69,
			        "start": 118.5,
			        "word": ",",
			      },
			      {
			        "end": 118.9,
			        "start": 118.69,
			        "word": " Ot",
			      },
			      {
			        "end": 119.07,
			        "start": 118.9,
			        "word": "is",
			      },
			      {
			        "end": 119.38,
			        "start": 119.07,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 120.56,
			    "start": 119.38,
			    "text": " We are digressing.",
			    "words": [
			      {
			        "end": 119.5,
			        "start": 119.38,
			        "word": " We",
			      },
			      {
			        "end": 119.84,
			        "start": 119.5,
			        "word": " are",
			      },
			      {
			        "end": 119.89,
			        "start": 119.84,
			        "word": " dig",
			      },
			      {
			        "end": 120.34,
			        "start": 119.89,
			        "word": "ressing",
			      },
			      {
			        "end": 120.56,
			        "start": 120.34,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 122.66,
			    "start": 120.56,
			    "text": " This is not a cinema channel, okay?",
			    "words": [
			      {
			        "end": 120.95,
			        "start": 120.56,
			        "word": " This",
			      },
			      {
			        "end": 121.03,
			        "start": 120.95,
			        "word": " is",
			      },
			      {
			        "end": 121.14,
			        "start": 121.03,
			        "word": " not",
			      },
			      {
			        "end": 121.2,
			        "start": 121.14,
			        "word": " a",
			      },
			      {
			        "end": 121.58,
			        "start": 121.2,
			        "word": " cinema",
			      },
			      {
			        "end": 122.04,
			        "start": 121.58,
			        "word": " channel",
			      },
			      {
			        "end": 122.17,
			        "start": 122.04,
			        "word": ",",
			      },
			      {
			        "end": 122.52,
			        "start": 122.17,
			        "word": " okay",
			      },
			      {
			        "end": 122.66,
			        "start": 122.52,
			        "word": "?",
			      },
			    ],
			  },
			  {
			    "end": 123.62,
			    "start": 122.98,
			    "text": " Anyway,",
			    "words": [
			      {
			        "end": 123.03,
			        "start": 122.98,
			        "word": "",
			      },
			      {
			        "end": 123.37,
			        "start": 123.03,
			        "word": " Anyway",
			      },
			      {
			        "end": 123.62,
			        "start": 123.37,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 124.7,
			    "start": 123.62,
			    "text": " the ship was rebuilt,",
			    "words": [
			      {
			        "end": 123.68,
			        "start": 123.62,
			        "word": " the",
			      },
			      {
			        "end": 123.94,
			        "start": 123.68,
			        "word": " ship",
			      },
			      {
			        "end": 124.13,
			        "start": 123.94,
			        "word": " was",
			      },
			      {
			        "end": 124.58,
			        "start": 124.13,
			        "word": " rebuilt",
			      },
			      {
			        "end": 124.7,
			        "start": 124.58,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 127.86,
			    "start": 124.7,
			    "text": " with the help of Russian and Ukrainian naval designers,",
			    "words": [
			      {
			        "end": 124.97,
			        "start": 124.7,
			        "word": " with",
			      },
			      {
			        "end": 125.15,
			        "start": 124.97,
			        "word": " the",
			      },
			      {
			        "end": 125.46,
			        "start": 125.15,
			        "word": " help",
			      },
			      {
			        "end": 125.54,
			        "start": 125.46,
			        "word": " of",
			      },
			      {
			        "end": 125.99,
			        "start": 125.54,
			        "word": " Russian",
			      },
			      {
			        "end": 126.18,
			        "start": 125.99,
			        "word": " and",
			      },
			      {
			        "end": 126.76,
			        "start": 126.18,
			        "word": " Ukrainian",
			      },
			      {
			        "end": 127.08,
			        "start": 126.76,
			        "word": " naval",
			      },
			      {
			        "end": 127.83,
			        "start": 127.08,
			        "word": " designers",
			      },
			      {
			        "end": 127.86,
			        "start": 127.83,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 129.64,
			    "start": 127.86,
			    "text": " and it was commissioned in 2012,",
			    "words": [
			      {
			        "end": 127.96,
			        "start": 127.86,
			        "word": " and",
			      },
			      {
			        "end": 128.09,
			        "start": 127.96,
			        "word": " it",
			      },
			      {
			        "end": 128.19,
			        "start": 128.09,
			        "word": " was",
			      },
			      {
			        "end": 128.8,
			        "start": 128.19,
			        "word": " commissioned",
			      },
			      {
			        "end": 128.89,
			        "start": 128.8,
			        "word": " in",
			      },
			      {
			        "end": 129.54,
			        "start": 128.89,
			        "word": " 2012",
			      },
			      {
			        "end": 129.64,
			        "start": 129.54,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 130.94,
			    "start": 129.64,
			    "text": " as Liaoning,",
			    "words": [
			      {
			        "end": 130.09,
			        "start": 129.64,
			        "word": " as",
			      },
			      {
			        "end": 130.2,
			        "start": 130.09,
			        "word": " Lia",
			      },
			      {
			        "end": 130.74,
			        "start": 130.2,
			        "word": "oning",
			      },
			      {
			        "end": 130.94,
			        "start": 130.74,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 133.06,
			    "start": 130.94,
			    "text": " hull number 16.",
			    "words": [
			      {
			        "end": 131.51,
			        "start": 130.94,
			        "word": " hull",
			      },
			      {
			        "end": 132.04,
			        "start": 131.51,
			        "word": " number",
			      },
			      {
			        "end": 132.68,
			        "start": 132.04,
			        "word": " 16",
			      },
			      {
			        "end": 133.06,
			        "start": 132.68,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 136.82,
			    "start": 133.06,
			    "text": " The embarked component was based on the Shenyang J-15A,",
			    "words": [
			      {
			        "end": 133.28,
			        "start": 133.06,
			        "word": " The",
			      },
			      {
			        "end": 133.72,
			        "start": 133.28,
			        "word": " embark",
			      },
			      {
			        "end": 133.86,
			        "start": 133.72,
			        "word": "ed",
			      },
			      {
			        "end": 134.52,
			        "start": 133.86,
			        "word": " component",
			      },
			      {
			        "end": 134.74,
			        "start": 134.52,
			        "word": " was",
			      },
			      {
			        "end": 135.1,
			        "start": 134.74,
			        "word": " based",
			      },
			      {
			        "end": 135.24,
			        "start": 135.1,
			        "word": " on",
			      },
			      {
			        "end": 135.46,
			        "start": 135.24,
			        "word": " the",
			      },
			      {
			        "end": 135.75,
			        "start": 135.46,
			        "word": " Shen",
			      },
			      {
			        "end": 136.04,
			        "start": 135.75,
			        "word": "yang",
			      },
			      {
			        "end": 136.11,
			        "start": 136.04,
			        "word": " J",
			      },
			      {
			        "end": 136.18,
			        "start": 136.11,
			        "word": "-",
			      },
			      {
			        "end": 136.62,
			        "start": 136.18,
			        "word": "15",
			      },
			      {
			        "end": 136.69,
			        "start": 136.62,
			        "word": "A",
			      },
			      {
			        "end": 136.82,
			        "start": 136.69,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 142.3,
			    "start": 136.82,
			    "text": " a flanker naval variant based on a Su-33 prototype acquired from Ukraine as well.",
			    "words": [
			      {
			        "end": 136.9,
			        "start": 136.82,
			        "word": " a",
			      },
			      {
			        "end": 137.26,
			        "start": 136.9,
			        "word": " flank",
			      },
			      {
			        "end": 137.4,
			        "start": 137.26,
			        "word": "er",
			      },
			      {
			        "end": 137.76,
			        "start": 137.4,
			        "word": " naval",
			      },
			      {
			        "end": 138.27,
			        "start": 137.76,
			        "word": " variant",
			      },
			      {
			        "end": 138.63,
			        "start": 138.27,
			        "word": " based",
			      },
			      {
			        "end": 138.77,
			        "start": 138.63,
			        "word": " on",
			      },
			      {
			        "end": 138.86,
			        "start": 138.77,
			        "word": " a",
			      },
			      {
			        "end": 139.02,
			        "start": 138.86,
			        "word": " Su",
			      },
			      {
			        "end": 139.05,
			        "start": 139.02,
			        "word": "-",
			      },
			      {
			        "end": 139.49,
			        "start": 139.05,
			        "word": "33",
			      },
			      {
			        "end": 140.3,
			        "start": 139.49,
			        "word": " prototype",
			      },
			      {
			        "end": 140.99,
			        "start": 140.3,
			        "word": " acquired",
			      },
			      {
			        "end": 141.13,
			        "start": 140.99,
			        "word": " from",
			      },
			      {
			        "end": 141.6,
			        "start": 141.13,
			        "word": " Ukraine",
			      },
			      {
			        "end": 141.81,
			        "start": 141.6,
			        "word": " as",
			      },
			      {
			        "end": 142.06,
			        "start": 141.81,
			        "word": " well",
			      },
			      {
			        "end": 142.3,
			        "start": 142.06,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 144.16,
			    "start": 142.3,
			    "text": " It is a relatively simple ship,",
			    "words": [
			      {
			        "end": 142.43,
			        "start": 142.3,
			        "word": "",
			      },
			      {
			        "end": 142.51,
			        "start": 142.43,
			        "word": " It",
			      },
			      {
			        "end": 142.56,
			        "start": 142.51,
			        "word": " is",
			      },
			      {
			        "end": 142.63,
			        "start": 142.56,
			        "word": " a",
			      },
			      {
			        "end": 143.32,
			        "start": 142.63,
			        "word": " relatively",
			      },
			      {
			        "end": 143.73,
			        "start": 143.32,
			        "word": " simple",
			      },
			      {
			        "end": 144,
			        "start": 143.73,
			        "word": " ship",
			      },
			      {
			        "end": 144.16,
			        "start": 144,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 145.28,
			    "start": 144.16,
			    "text": " a store bar design,",
			    "words": [
			      {
			        "end": 144.2,
			        "start": 144.16,
			        "word": " a",
			      },
			      {
			        "end": 144.54,
			        "start": 144.2,
			        "word": " store",
			      },
			      {
			        "end": 144.74,
			        "start": 144.54,
			        "word": " bar",
			      },
			      {
			        "end": 145.15,
			        "start": 144.74,
			        "word": " design",
			      },
			      {
			        "end": 145.28,
			        "start": 145.15,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 147.38,
			    "start": 145.28,
			    "text": " with no catapults and a ski jump.",
			    "words": [
			      {
			        "end": 145.55,
			        "start": 145.28,
			        "word": " with",
			      },
			      {
			        "end": 145.68,
			        "start": 145.55,
			        "word": " no",
			      },
			      {
			        "end": 145.88,
			        "start": 145.68,
			        "word": " cat",
			      },
			      {
			        "end": 146.01,
			        "start": 145.88,
			        "word": "ap",
			      },
			      {
			        "end": 146.28,
			        "start": 146.01,
			        "word": "ults",
			      },
			      {
			        "end": 146.48,
			        "start": 146.28,
			        "word": " and",
			      },
			      {
			        "end": 146.55,
			        "start": 146.48,
			        "word": " a",
			      },
			      {
			        "end": 146.77,
			        "start": 146.55,
			        "word": " ski",
			      },
			      {
			        "end": 147.02,
			        "start": 146.77,
			        "word": " jump",
			      },
			      {
			        "end": 147.38,
			        "start": 147.02,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 150.16,
			    "start": 147.38,
			    "text": " With a normal displacement of 54,000",
			    "words": [
			      {
			        "end": 147.66,
			        "start": 147.38,
			        "word": " With",
			      },
			      {
			        "end": 147.7,
			        "start": 147.66,
			        "word": " a",
			      },
			      {
			        "end": 148.09,
			        "start": 147.7,
			        "word": " normal",
			      },
			      {
			        "end": 148.87,
			        "start": 148.09,
			        "word": " displacement",
			      },
			      {
			        "end": 149.02,
			        "start": 148.87,
			        "word": " of",
			      },
			      {
			        "end": 150.16,
			        "start": 149.02,
			        "word": " 54,000",
			      },
			    ],
			  },
			  {
			    "end": 153.92,
			    "start": 150.16,
			    "text": " tons, it is also a relatively small carrier to host large,",
			    "words": [
			      {
			        "end": 150.37,
			        "start": 150.16,
			        "word": " tons",
			      },
			      {
			        "end": 150.54,
			        "start": 150.37,
			        "word": ",",
			      },
			      {
			        "end": 150.78,
			        "start": 150.54,
			        "word": " it",
			      },
			      {
			        "end": 150.85,
			        "start": 150.78,
			        "word": " is",
			      },
			      {
			        "end": 151.15,
			        "start": 150.85,
			        "word": " also",
			      },
			      {
			        "end": 151.23,
			        "start": 151.15,
			        "word": " a",
			      },
			      {
			        "end": 151.99,
			        "start": 151.23,
			        "word": " relatively",
			      },
			      {
			        "end": 152.4,
			        "start": 151.99,
			        "word": " small",
			      },
			      {
			        "end": 152.97,
			        "start": 152.4,
			        "word": " carrier",
			      },
			      {
			        "end": 153.07,
			        "start": 152.97,
			        "word": " to",
			      },
			      {
			        "end": 153.49,
			        "start": 153.07,
			        "word": " host",
			      },
			      {
			        "end": 153.77,
			        "start": 153.49,
			        "word": " large",
			      },
			      {
			        "end": 153.92,
			        "start": 153.77,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 155.46,
			    "start": 153.92,
			    "text": " fixed-wing aircraft,",
			    "words": [
			      {
			        "end": 154.34,
			        "start": 153.92,
			        "word": " fixed",
			      },
			      {
			        "end": 154.38,
			        "start": 154.34,
			        "word": "-",
			      },
			      {
			        "end": 154.69,
			        "start": 154.38,
			        "word": "wing",
			      },
			      {
			        "end": 155.31,
			        "start": 154.69,
			        "word": " aircraft",
			      },
			      {
			        "end": 155.46,
			        "start": 155.31,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 156.94,
			    "start": 155.46,
			    "text": " like the J-15.",
			    "words": [
			      {
			        "end": 155.8,
			        "start": 155.46,
			        "word": " like",
			      },
			      {
			        "end": 156,
			        "start": 155.8,
			        "word": " the",
			      },
			      {
			        "end": 156.07,
			        "start": 156,
			        "word": " J",
			      },
			      {
			        "end": 156.14,
			        "start": 156.07,
			        "word": "-",
			      },
			      {
			        "end": 156.64,
			        "start": 156.14,
			        "word": "15",
			      },
			      {
			        "end": 156.94,
			        "start": 156.64,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 164.84,
			    "start": 156.94,
			    "text": " Many observers in the West pointed out how the Liaoning had far inferior capabilities if compared with an American carrier,",
			    "words": [
			      {
			        "end": 157.25,
			        "start": 156.94,
			        "word": " Many",
			      },
			      {
			        "end": 157.95,
			        "start": 157.25,
			        "word": " observers",
			      },
			      {
			        "end": 158.1,
			        "start": 157.95,
			        "word": " in",
			      },
			      {
			        "end": 158.33,
			        "start": 158.1,
			        "word": " the",
			      },
			      {
			        "end": 158.64,
			        "start": 158.33,
			        "word": " West",
			      },
			      {
			        "end": 159.28,
			        "start": 158.64,
			        "word": " pointed",
			      },
			      {
			        "end": 159.42,
			        "start": 159.28,
			        "word": " out",
			      },
			      {
			        "end": 159.65,
			        "start": 159.42,
			        "word": " how",
			      },
			      {
			        "end": 159.88,
			        "start": 159.65,
			        "word": " the",
			      },
			      {
			        "end": 160.11,
			        "start": 159.88,
			        "word": " Lia",
			      },
			      {
			        "end": 160.6,
			        "start": 160.11,
			        "word": "oning",
			      },
			      {
			        "end": 160.73,
			        "start": 160.6,
			        "word": " had",
			      },
			      {
			        "end": 160.96,
			        "start": 160.73,
			        "word": " far",
			      },
			      {
			        "end": 161.59,
			        "start": 160.96,
			        "word": " inferior",
			      },
			      {
			        "end": 162.8,
			        "start": 161.59,
			        "word": " capabilities",
			      },
			      {
			        "end": 162.84,
			        "start": 162.8,
			        "word": " if",
			      },
			      {
			        "end": 163.52,
			        "start": 162.84,
			        "word": " compared",
			      },
			      {
			        "end": 163.56,
			        "start": 163.52,
			        "word": " with",
			      },
			      {
			        "end": 163.67,
			        "start": 163.56,
			        "word": " an",
			      },
			      {
			        "end": 164.13,
			        "start": 163.67,
			        "word": " American",
			      },
			      {
			        "end": 164.53,
			        "start": 164.13,
			        "word": " carrier",
			      },
			      {
			        "end": 164.84,
			        "start": 164.53,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 166.24,
			    "start": 164.84,
			    "text": " but that was never the point.",
			    "words": [
			      {
			        "end": 164.92,
			        "start": 164.84,
			        "word": " but",
			      },
			      {
			        "end": 165.09,
			        "start": 164.92,
			        "word": " that",
			      },
			      {
			        "end": 165.27,
			        "start": 165.09,
			        "word": " was",
			      },
			      {
			        "end": 165.56,
			        "start": 165.27,
			        "word": " never",
			      },
			      {
			        "end": 165.73,
			        "start": 165.56,
			        "word": " the",
			      },
			      {
			        "end": 166.04,
			        "start": 165.73,
			        "word": " point",
			      },
			      {
			        "end": 166.24,
			        "start": 166.04,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 169.35,
			    "start": 166.24,
			    "text": " The point of the Liaoning was to create a kernel,",
			    "words": [
			      {
			        "end": 166.44,
			        "start": 166.24,
			        "word": "",
			      },
			      {
			        "end": 166.46,
			        "start": 166.44,
			        "word": " The",
			      },
			      {
			        "end": 166.83,
			        "start": 166.46,
			        "word": " point",
			      },
			      {
			        "end": 166.98,
			        "start": 166.83,
			        "word": " of",
			      },
			      {
			        "end": 167.2,
			        "start": 166.98,
			        "word": " the",
			      },
			      {
			        "end": 167.42,
			        "start": 167.2,
			        "word": " Lia",
			      },
			      {
			        "end": 167.79,
			        "start": 167.42,
			        "word": "oning",
			      },
			      {
			        "end": 168.04,
			        "start": 167.79,
			        "word": " was",
			      },
			      {
			        "end": 168.21,
			        "start": 168.04,
			        "word": " to",
			      },
			      {
			        "end": 168.67,
			        "start": 168.21,
			        "word": " create",
			      },
			      {
			        "end": 168.68,
			        "start": 168.67,
			        "word": " a",
			      },
			      {
			        "end": 169.13,
			        "start": 168.68,
			        "word": " kernel",
			      },
			      {
			        "end": 169.35,
			        "start": 169.13,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 171.32,
			    "start": 169.35,
			    "text": " a central core of trained men,",
			    "words": [
			      {
			        "end": 169.37,
			        "start": 169.35,
			        "word": " a",
			      },
			      {
			        "end": 169.88,
			        "start": 169.37,
			        "word": " central",
			      },
			      {
			        "end": 170.18,
			        "start": 169.88,
			        "word": " core",
			      },
			      {
			        "end": 170.33,
			        "start": 170.18,
			        "word": " of",
			      },
			      {
			        "end": 170.86,
			        "start": 170.33,
			        "word": " trained",
			      },
			      {
			        "end": 171.08,
			        "start": 170.86,
			        "word": " men",
			      },
			      {
			        "end": 171.32,
			        "start": 171.08,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 178.56,
			    "start": 171.32,
			    "text": " and generate the institutional experience to build a real and effective embarked naval aviation.",
			    "words": [
			      {
			        "end": 171.63,
			        "start": 171.32,
			        "word": " and",
			      },
			      {
			        "end": 172.48,
			        "start": 171.63,
			        "word": " generate",
			      },
			      {
			        "end": 172.72,
			        "start": 172.48,
			        "word": " the",
			      },
			      {
			        "end": 173.8,
			        "start": 172.72,
			        "word": " institutional",
			      },
			      {
			        "end": 175.14,
			        "start": 173.8,
			        "word": " experience",
			      },
			      {
			        "end": 175.17,
			        "start": 175.14,
			        "word": " to",
			      },
			      {
			        "end": 175.51,
			        "start": 175.17,
			        "word": " build",
			      },
			      {
			        "end": 175.57,
			        "start": 175.51,
			        "word": " a",
			      },
			      {
			        "end": 175.87,
			        "start": 175.57,
			        "word": " real",
			      },
			      {
			        "end": 176.09,
			        "start": 175.87,
			        "word": " and",
			      },
			      {
			        "end": 176.86,
			        "start": 176.09,
			        "word": " effective",
			      },
			      {
			        "end": 177.19,
			        "start": 176.86,
			        "word": " embark",
			      },
			      {
			        "end": 177.33,
			        "start": 177.19,
			        "word": "ed",
			      },
			      {
			        "end": 177.7,
			        "start": 177.33,
			        "word": " naval",
			      },
			      {
			        "end": 178.29,
			        "start": 177.7,
			        "word": " aviation",
			      },
			      {
			        "end": 178.56,
			        "start": 178.29,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 181.51,
			    "start": 178.56,
			    "text": " The Liaoning was joined in 2019 by the Shandong,",
			    "words": [
			      {
			        "end": 178.91,
			        "start": 178.56,
			        "word": " The",
			      },
			      {
			        "end": 178.92,
			        "start": 178.91,
			        "word": " Lia",
			      },
			      {
			        "end": 179.22,
			        "start": 178.92,
			        "word": "oning",
			      },
			      {
			        "end": 179.4,
			        "start": 179.22,
			        "word": " was",
			      },
			      {
			        "end": 179.76,
			        "start": 179.4,
			        "word": " joined",
			      },
			      {
			        "end": 179.88,
			        "start": 179.76,
			        "word": " in",
			      },
			      {
			        "end": 180.61,
			        "start": 179.88,
			        "word": " 2019",
			      },
			      {
			        "end": 180.73,
			        "start": 180.61,
			        "word": " by",
			      },
			      {
			        "end": 180.91,
			        "start": 180.73,
			        "word": " the",
			      },
			      {
			        "end": 181.03,
			        "start": 180.91,
			        "word": " Sh",
			      },
			      {
			        "end": 181.21,
			        "start": 181.03,
			        "word": "and",
			      },
			      {
			        "end": 181.39,
			        "start": 181.21,
			        "word": "ong",
			      },
			      {
			        "end": 181.51,
			        "start": 181.39,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 182.64,
			    "start": 181.51,
			    "text": " hull number 17,",
			    "words": [
			      {
			        "end": 181.75,
			        "start": 181.51,
			        "word": " hull",
			      },
			      {
			        "end": 182.11,
			        "start": 181.75,
			        "word": " number",
			      },
			      {
			        "end": 182.5,
			        "start": 182.11,
			        "word": " 17",
			      },
			      {
			        "end": 182.64,
			        "start": 182.5,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 185.76,
			    "start": 182.64,
			    "text": " which is an improved variant of the same design,",
			    "words": [
			      {
			        "end": 183.02,
			        "start": 182.64,
			        "word": " which",
			      },
			      {
			        "end": 183.17,
			        "start": 183.02,
			        "word": " is",
			      },
			      {
			        "end": 183.32,
			        "start": 183.17,
			        "word": " an",
			      },
			      {
			        "end": 183.93,
			        "start": 183.32,
			        "word": " improved",
			      },
			      {
			        "end": 184.47,
			        "start": 183.93,
			        "word": " variant",
			      },
			      {
			        "end": 184.62,
			        "start": 184.47,
			        "word": " of",
			      },
			      {
			        "end": 184.85,
			        "start": 184.62,
			        "word": " the",
			      },
			      {
			        "end": 185.15,
			        "start": 184.85,
			        "word": " same",
			      },
			      {
			        "end": 185.61,
			        "start": 185.15,
			        "word": " design",
			      },
			      {
			        "end": 185.76,
			        "start": 185.61,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 188.2,
			    "start": 185.76,
			    "text": " displacing about 65,000",
			    "words": [
			      {
			        "end": 186.38,
			        "start": 185.76,
			        "word": " displ",
			      },
			      {
			        "end": 186.59,
			        "start": 186.38,
			        "word": "acing",
			      },
			      {
			        "end": 186.9,
			        "start": 186.59,
			        "word": " about",
			      },
			      {
			        "end": 188.2,
			        "start": 186.9,
			        "word": " 65,000",
			      },
			    ],
			  },
			  {
			    "end": 188.82,
			    "start": 188.2,
			    "text": " tons.",
			    "words": [
			      {
			        "end": 188.52,
			        "start": 188.2,
			        "word": " tons",
			      },
			      {
			        "end": 188.82,
			        "start": 188.52,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 190.5,
			    "start": 188.82,
			    "text": " Despite improvements,",
			    "words": [
			      {
			        "end": 188.82,
			        "start": 188.82,
			        "word": "",
			      },
			      {
			        "end": 189.36,
			        "start": 188.82,
			        "word": " Despite",
			      },
			      {
			        "end": 190.29,
			        "start": 189.36,
			        "word": " improvements",
			      },
			      {
			        "end": 190.5,
			        "start": 190.29,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 196.14,
			    "start": 190.5,
			    "text": " the Shandong's purpose was the same: train men and create institutional experience.",
			    "words": [
			      {
			        "end": 190.67,
			        "start": 190.5,
			        "word": " the",
			      },
			      {
			        "end": 190.82,
			        "start": 190.67,
			        "word": " Sh",
			      },
			      {
			        "end": 191.05,
			        "start": 190.82,
			        "word": "and",
			      },
			      {
			        "end": 191.27,
			        "start": 191.05,
			        "word": "ong",
			      },
			      {
			        "end": 191.43,
			        "start": 191.27,
			        "word": "'s",
			      },
			      {
			        "end": 191.97,
			        "start": 191.43,
			        "word": " purpose",
			      },
			      {
			        "end": 192.2,
			        "start": 191.97,
			        "word": " was",
			      },
			      {
			        "end": 192.43,
			        "start": 192.2,
			        "word": " the",
			      },
			      {
			        "end": 192.73,
			        "start": 192.43,
			        "word": " same",
			      },
			      {
			        "end": 193.15,
			        "start": 192.73,
			        "word": ":",
			      },
			      {
			        "end": 193.2,
			        "start": 193.15,
			        "word": " train",
			      },
			      {
			        "end": 193.43,
			        "start": 193.2,
			        "word": " men",
			      },
			      {
			        "end": 193.66,
			        "start": 193.43,
			        "word": " and",
			      },
			      {
			        "end": 194.12,
			        "start": 193.66,
			        "word": " create",
			      },
			      {
			        "end": 195.22,
			        "start": 194.12,
			        "word": " institutional",
			      },
			      {
			        "end": 195.92,
			        "start": 195.22,
			        "word": " experience",
			      },
			      {
			        "end": 196.14,
			        "start": 195.92,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 197.22,
			    "start": 196.14,
			    "text": " Both the carrier,",
			    "words": [
			      {
			        "end": 196.41,
			        "start": 196.14,
			        "word": " Both",
			      },
			      {
			        "end": 196.61,
			        "start": 196.41,
			        "word": " the",
			      },
			      {
			        "end": 197.08,
			        "start": 196.61,
			        "word": " carrier",
			      },
			      {
			        "end": 197.22,
			        "start": 197.08,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 197.75,
			    "start": 197.22,
			    "text": " in fact,",
			    "words": [
			      {
			        "end": 197.37,
			        "start": 197.22,
			        "word": " in",
			      },
			      {
			        "end": 197.62,
			        "start": 197.37,
			        "word": " fact",
			      },
			      {
			        "end": 197.75,
			        "start": 197.62,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 202.79,
			    "start": 197.75,
			    "text": " maintained the official designation of "test experimental ships" for many years,",
			    "words": [
			      {
			        "end": 198.43,
			        "start": 197.75,
			        "word": " maintained",
			      },
			      {
			        "end": 198.63,
			        "start": 198.43,
			        "word": " the",
			      },
			      {
			        "end": 199.17,
			        "start": 198.63,
			        "word": " official",
			      },
			      {
			        "end": 199.92,
			        "start": 199.17,
			        "word": " designation",
			      },
			      {
			        "end": 200.1,
			        "start": 199.92,
			        "word": " of",
			      },
			      {
			        "end": 200.11,
			        "start": 200.1,
			        "word": " "",
			      },
			      {
			        "end": 200.49,
			        "start": 200.11,
			        "word": "test",
			      },
			      {
			        "end": 201.19,
			        "start": 200.49,
			        "word": " experimental",
			      },
			      {
			        "end": 201.7,
			        "start": 201.19,
			        "word": " ships",
			      },
			      {
			        "end": 201.77,
			        "start": 201.7,
			        "word": """,
			      },
			      {
			        "end": 201.82,
			        "start": 201.77,
			        "word": " for",
			      },
			      {
			        "end": 202.19,
			        "start": 201.82,
			        "word": " many",
			      },
			      {
			        "end": 202.7,
			        "start": 202.19,
			        "word": " years",
			      },
			      {
			        "end": 202.79,
			        "start": 202.7,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 206.14,
			    "start": 202.79,
			    "text": " and only recently they have been declared fully operational.",
			    "words": [
			      {
			        "end": 202.89,
			        "start": 202.79,
			        "word": " and",
			      },
			      {
			        "end": 203.14,
			        "start": 202.89,
			        "word": " only",
			      },
			      {
			        "end": 203.64,
			        "start": 203.14,
			        "word": " recently",
			      },
			      {
			        "end": 203.88,
			        "start": 203.64,
			        "word": " they",
			      },
			      {
			        "end": 204.14,
			        "start": 203.88,
			        "word": " have",
			      },
			      {
			        "end": 204.39,
			        "start": 204.14,
			        "word": " been",
			      },
			      {
			        "end": 204.89,
			        "start": 204.39,
			        "word": " declared",
			      },
			      {
			        "end": 205.35,
			        "start": 204.89,
			        "word": " fully",
			      },
			      {
			        "end": 205.89,
			        "start": 205.35,
			        "word": " operational",
			      },
			      {
			        "end": 206.14,
			        "start": 205.89,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 209.48,
			    "start": 206.14,
			    "text": " The rest is recent history: in June 2022,",
			    "words": [
			      {
			        "end": 206.14,
			        "start": 206.14,
			        "word": "",
			      },
			      {
			        "end": 206.54,
			        "start": 206.14,
			        "word": " The",
			      },
			      {
			        "end": 206.74,
			        "start": 206.54,
			        "word": " rest",
			      },
			      {
			        "end": 206.95,
			        "start": 206.74,
			        "word": " is",
			      },
			      {
			        "end": 207.43,
			        "start": 206.95,
			        "word": " recent",
			      },
			      {
			        "end": 208.06,
			        "start": 207.43,
			        "word": " history",
			      },
			      {
			        "end": 208.14,
			        "start": 208.06,
			        "word": ":",
			      },
			      {
			        "end": 208.27,
			        "start": 208.14,
			        "word": " in",
			      },
			      {
			        "end": 208.54,
			        "start": 208.27,
			        "word": " June",
			      },
			      {
			        "end": 209.35,
			        "start": 208.54,
			        "word": " 2022",
			      },
			      {
			        "end": 209.48,
			        "start": 209.35,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 210.68,
			    "start": 209.48,
			    "text": " the Fujian carrier,",
			    "words": [
			      {
			        "end": 209.69,
			        "start": 209.48,
			        "word": " the",
			      },
			      {
			        "end": 209.88,
			        "start": 209.69,
			        "word": " Fuj",
			      },
			      {
			        "end": 210.08,
			        "start": 209.88,
			        "word": "ian",
			      },
			      {
			        "end": 210.55,
			        "start": 210.08,
			        "word": " carrier",
			      },
			      {
			        "end": 210.68,
			        "start": 210.55,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 211.9,
			    "start": 210.68,
			    "text": " hull number 18,",
			    "words": [
			      {
			        "end": 210.95,
			        "start": 210.68,
			        "word": " hull",
			      },
			      {
			        "end": 211.36,
			        "start": 210.95,
			        "word": " number",
			      },
			      {
			        "end": 211.9,
			        "start": 211.36,
			        "word": " 18",
			      },
			      {
			        "end": 211.9,
			        "start": 211.9,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 214.1,
			    "start": 211.9,
			    "text": " the first Chinese catubar design,",
			    "words": [
			      {
			        "end": 212.22,
			        "start": 211.9,
			        "word": " the",
			      },
			      {
			        "end": 212.44,
			        "start": 212.22,
			        "word": " first",
			      },
			      {
			        "end": 212.91,
			        "start": 212.44,
			        "word": " Chinese",
			      },
			      {
			        "end": 213.11,
			        "start": 212.91,
			        "word": " cat",
			      },
			      {
			        "end": 213.24,
			        "start": 213.11,
			        "word": "ub",
			      },
			      {
			        "end": 213.37,
			        "start": 213.24,
			        "word": "ar",
			      },
			      {
			        "end": 213.78,
			        "start": 213.37,
			        "word": " design",
			      },
			      {
			        "end": 214.1,
			        "start": 213.78,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 219.02,
			    "start": 214.1,
			    "text": " was launched and at the moment of writing it is undergoing sea trials.",
			    "words": [
			      {
			        "end": 214.27,
			        "start": 214.1,
			        "word": " was",
			      },
			      {
			        "end": 214.95,
			        "start": 214.27,
			        "word": " launched",
			      },
			      {
			        "end": 215.18,
			        "start": 214.95,
			        "word": " and",
			      },
			      {
			        "end": 215.41,
			        "start": 215.18,
			        "word": " at",
			      },
			      {
			        "end": 215.59,
			        "start": 215.41,
			        "word": " the",
			      },
			      {
			        "end": 216.08,
			        "start": 215.59,
			        "word": " moment",
			      },
			      {
			        "end": 216.27,
			        "start": 216.08,
			        "word": " of",
			      },
			      {
			        "end": 216.82,
			        "start": 216.27,
			        "word": " writing",
			      },
			      {
			        "end": 216.98,
			        "start": 216.82,
			        "word": " it",
			      },
			      {
			        "end": 217.14,
			        "start": 216.98,
			        "word": " is",
			      },
			      {
			        "end": 217.97,
			        "start": 217.14,
			        "word": " undergoing",
			      },
			      {
			        "end": 218.22,
			        "start": 217.97,
			        "word": " sea",
			      },
			      {
			        "end": 218.71,
			        "start": 218.22,
			        "word": " trials",
			      },
			      {
			        "end": 219.02,
			        "start": 218.71,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 220.64,
			    "start": 219.02,
			    "text": " Displacing 80,000",
			    "words": [
			      {
			        "end": 219.2,
			        "start": 219.02,
			        "word": " Dis",
			      },
			      {
			        "end": 219.36,
			        "start": 219.2,
			        "word": "pl",
			      },
			      {
			        "end": 219.62,
			        "start": 219.36,
			        "word": "acing",
			      },
			      {
			        "end": 220.64,
			        "start": 219.62,
			        "word": " 80,000",
			      },
			    ],
			  },
			  {
			    "end": 221.78,
			    "start": 220.64,
			    "text": " tons, give or take,",
			    "words": [
			      {
			        "end": 220.88,
			        "start": 220.64,
			        "word": " tons",
			      },
			      {
			        "end": 221,
			        "start": 220.88,
			        "word": ",",
			      },
			      {
			        "end": 221.24,
			        "start": 221,
			        "word": " give",
			      },
			      {
			        "end": 221.39,
			        "start": 221.24,
			        "word": " or",
			      },
			      {
			        "end": 221.59,
			        "start": 221.39,
			        "word": " take",
			      },
			      {
			        "end": 221.78,
			        "start": 221.59,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 222.95,
			    "start": 221.78,
			    "text": " with three catapults,",
			    "words": [
			      {
			        "end": 222.01,
			        "start": 221.78,
			        "word": " with",
			      },
			      {
			        "end": 222.36,
			        "start": 222.01,
			        "word": " three",
			      },
			      {
			        "end": 222.44,
			        "start": 222.36,
			        "word": " cat",
			      },
			      {
			        "end": 222.56,
			        "start": 222.44,
			        "word": "ap",
			      },
			      {
			        "end": 222.92,
			        "start": 222.56,
			        "word": "ults",
			      },
			      {
			        "end": 222.95,
			        "start": 222.92,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 224.84,
			    "start": 222.95,
			    "text": " but a conventional propulsion,",
			    "words": [
			      {
			        "end": 223.1,
			        "start": 222.95,
			        "word": " but",
			      },
			      {
			        "end": 223.19,
			        "start": 223.1,
			        "word": " a",
			      },
			      {
			        "end": 223.89,
			        "start": 223.19,
			        "word": " conventional",
			      },
			      {
			        "end": 224.5,
			        "start": 223.89,
			        "word": " propulsion",
			      },
			      {
			        "end": 224.84,
			        "start": 224.5,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 226.94,
			    "start": 224.84,
			    "text": " it is a beautiful modern ship.",
			    "words": [
			      {
			        "end": 224.86,
			        "start": 224.84,
			        "word": " it",
			      },
			      {
			        "end": 225.02,
			        "start": 224.86,
			        "word": " is",
			      },
			      {
			        "end": 225.1,
			        "start": 225.02,
			        "word": " a",
			      },
			      {
			        "end": 225.9,
			        "start": 225.1,
			        "word": " beautiful",
			      },
			      {
			        "end": 226.34,
			        "start": 225.9,
			        "word": " modern",
			      },
			      {
			        "end": 226.66,
			        "start": 226.34,
			        "word": " ship",
			      },
			      {
			        "end": 226.94,
			        "start": 226.66,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 228.24,
			    "start": 226.94,
			    "text": " The great surprise,",
			    "words": [
			      {
			        "end": 227.02,
			        "start": 226.94,
			        "word": "",
			      },
			      {
			        "end": 227.16,
			        "start": 227.02,
			        "word": " The",
			      },
			      {
			        "end": 227.52,
			        "start": 227.16,
			        "word": " great",
			      },
			      {
			        "end": 228.1,
			        "start": 227.52,
			        "word": " surprise",
			      },
			      {
			        "end": 228.24,
			        "start": 228.1,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 232.72,
			    "start": 228.24,
			    "text": " though, on the Fujian was the adoption of electromagnetic catapults,",
			    "words": [
			      {
			        "end": 228.68,
			        "start": 228.24,
			        "word": " though",
			      },
			      {
			        "end": 228.85,
			        "start": 228.68,
			        "word": ",",
			      },
			      {
			        "end": 228.96,
			        "start": 228.85,
			        "word": " on",
			      },
			      {
			        "end": 229.18,
			        "start": 228.96,
			        "word": " the",
			      },
			      {
			        "end": 229.45,
			        "start": 229.18,
			        "word": " Fuj",
			      },
			      {
			        "end": 229.62,
			        "start": 229.45,
			        "word": "ian",
			      },
			      {
			        "end": 229.84,
			        "start": 229.62,
			        "word": " was",
			      },
			      {
			        "end": 230.06,
			        "start": 229.84,
			        "word": " the",
			      },
			      {
			        "end": 230.7,
			        "start": 230.06,
			        "word": " adoption",
			      },
			      {
			        "end": 230.78,
			        "start": 230.7,
			        "word": " of",
			      },
			      {
			        "end": 231.94,
			        "start": 230.78,
			        "word": " electromagnetic",
			      },
			      {
			        "end": 232.11,
			        "start": 231.94,
			        "word": " cat",
			      },
			      {
			        "end": 232.24,
			        "start": 232.11,
			        "word": "ap",
			      },
			      {
			        "end": 232.69,
			        "start": 232.24,
			        "word": "ults",
			      },
			      {
			        "end": 232.72,
			        "start": 232.69,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 237.42,
			    "start": 232.72,
			    "text": " in what some commentators described as "skipping one technology generation".",
			    "words": [
			      {
			        "end": 232.78,
			        "start": 232.72,
			        "word": " in",
			      },
			      {
			        "end": 232.94,
			        "start": 232.78,
			        "word": " what",
			      },
			      {
			        "end": 233.22,
			        "start": 232.94,
			        "word": " some",
			      },
			      {
			        "end": 233.71,
			        "start": 233.22,
			        "word": " comment",
			      },
			      {
			        "end": 234.06,
			        "start": 233.71,
			        "word": "ators",
			      },
			      {
			        "end": 234.69,
			        "start": 234.06,
			        "word": " described",
			      },
			      {
			        "end": 234.83,
			        "start": 234.69,
			        "word": " as",
			      },
			      {
			        "end": 234.9,
			        "start": 234.83,
			        "word": " "",
			      },
			      {
			        "end": 235.08,
			        "start": 234.9,
			        "word": "sk",
			      },
			      {
			        "end": 235.46,
			        "start": 235.08,
			        "word": "ipping",
			      },
			      {
			        "end": 235.71,
			        "start": 235.46,
			        "word": " one",
			      },
			      {
			        "end": 236.38,
			        "start": 235.71,
			        "word": " technology",
			      },
			      {
			        "end": 237.08,
			        "start": 236.38,
			        "word": " generation",
			      },
			      {
			        "end": 237.42,
			        "start": 237.08,
			        "word": "".",
			      },
			    ],
			  },
			  {
			    "end": 241.85,
			    "start": 237.42,
			    "text": " Recently, tire marks have been spotted in the area of the resting cables,",
			    "words": [
			      {
			        "end": 237.97,
			        "start": 237.42,
			        "word": " Recently",
			      },
			      {
			        "end": 238.08,
			        "start": 237.97,
			        "word": ",",
			      },
			      {
			        "end": 238.34,
			        "start": 238.08,
			        "word": " tire",
			      },
			      {
			        "end": 238.67,
			        "start": 238.34,
			        "word": " marks",
			      },
			      {
			        "end": 238.96,
			        "start": 238.67,
			        "word": " have",
			      },
			      {
			        "end": 239.19,
			        "start": 238.96,
			        "word": " been",
			      },
			      {
			        "end": 239.68,
			        "start": 239.19,
			        "word": " spotted",
			      },
			      {
			        "end": 239.86,
			        "start": 239.68,
			        "word": " in",
			      },
			      {
			        "end": 239.99,
			        "start": 239.86,
			        "word": " the",
			      },
			      {
			        "end": 240.25,
			        "start": 239.99,
			        "word": " area",
			      },
			      {
			        "end": 240.38,
			        "start": 240.25,
			        "word": " of",
			      },
			      {
			        "end": 240.58,
			        "start": 240.38,
			        "word": " the",
			      },
			      {
			        "end": 241.05,
			        "start": 240.58,
			        "word": " resting",
			      },
			      {
			        "end": 241.45,
			        "start": 241.05,
			        "word": " cables",
			      },
			      {
			        "end": 241.85,
			        "start": 241.45,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 245.82,
			    "start": 241.85,
			    "text": " and one of the catapult blast deflectors shows signs of dirt.",
			    "words": [
			      {
			        "end": 241.85,
			        "start": 241.85,
			        "word": " and",
			      },
			      {
			        "end": 242.04,
			        "start": 241.85,
			        "word": " one",
			      },
			      {
			        "end": 242.16,
			        "start": 242.04,
			        "word": " of",
			      },
			      {
			        "end": 242.35,
			        "start": 242.16,
			        "word": " the",
			      },
			      {
			        "end": 242.54,
			        "start": 242.35,
			        "word": " cat",
			      },
			      {
			        "end": 242.66,
			        "start": 242.54,
			        "word": "ap",
			      },
			      {
			        "end": 242.84,
			        "start": 242.66,
			        "word": "ult",
			      },
			      {
			        "end": 243.23,
			        "start": 242.84,
			        "word": " blast",
			      },
			      {
			        "end": 243.81,
			        "start": 243.23,
			        "word": " deflect",
			      },
			      {
			        "end": 244.19,
			        "start": 243.81,
			        "word": "ors",
			      },
			      {
			        "end": 244.53,
			        "start": 244.19,
			        "word": " shows",
			      },
			      {
			        "end": 244.98,
			        "start": 244.53,
			        "word": " signs",
			      },
			      {
			        "end": 245.16,
			        "start": 244.98,
			        "word": " of",
			      },
			      {
			        "end": 245.52,
			        "start": 245.16,
			        "word": " dirt",
			      },
			      {
			        "end": 245.82,
			        "start": 245.52,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 250.22,
			    "start": 245.82,
			    "text": " These are proof that the aircraft launch and recovery tests have started.",
			    "words": [
			      {
			        "end": 246.16,
			        "start": 245.82,
			        "word": " These",
			      },
			      {
			        "end": 246.47,
			        "start": 246.16,
			        "word": " are",
			      },
			      {
			        "end": 246.74,
			        "start": 246.47,
			        "word": " proof",
			      },
			      {
			        "end": 246.97,
			        "start": 246.74,
			        "word": " that",
			      },
			      {
			        "end": 247.17,
			        "start": 246.97,
			        "word": " the",
			      },
			      {
			        "end": 247.71,
			        "start": 247.17,
			        "word": " aircraft",
			      },
			      {
			        "end": 248.12,
			        "start": 247.71,
			        "word": " launch",
			      },
			      {
			        "end": 248.32,
			        "start": 248.12,
			        "word": " and",
			      },
			      {
			        "end": 248.86,
			        "start": 248.32,
			        "word": " recovery",
			      },
			      {
			        "end": 249.45,
			        "start": 248.86,
			        "word": " tests",
			      },
			      {
			        "end": 249.47,
			        "start": 249.45,
			        "word": " have",
			      },
			      {
			        "end": 249.95,
			        "start": 249.47,
			        "word": " started",
			      },
			      {
			        "end": 250.22,
			        "start": 249.95,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 254.22,
			    "start": 250.22,
			    "text": " And the future for the Chinese carrier force is going to be quite busy.",
			    "words": [
			      {
			        "end": 250.37,
			        "start": 250.22,
			        "word": "",
			      },
			      {
			        "end": 250.42,
			        "start": 250.37,
			        "word": " And",
			      },
			      {
			        "end": 250.69,
			        "start": 250.42,
			        "word": " the",
			      },
			      {
			        "end": 251.01,
			        "start": 250.69,
			        "word": " future",
			      },
			      {
			        "end": 251.21,
			        "start": 251.01,
			        "word": " for",
			      },
			      {
			        "end": 251.44,
			        "start": 251.21,
			        "word": " the",
			      },
			      {
			        "end": 251.87,
			        "start": 251.44,
			        "word": " Chinese",
			      },
			      {
			        "end": 252.33,
			        "start": 251.87,
			        "word": " carrier",
			      },
			      {
			        "end": 252.66,
			        "start": 252.33,
			        "word": " force",
			      },
			      {
			        "end": 252.79,
			        "start": 252.66,
			        "word": " is",
			      },
			      {
			        "end": 253.11,
			        "start": 252.79,
			        "word": " going",
			      },
			      {
			        "end": 253.3,
			        "start": 253.11,
			        "word": " to",
			      },
			      {
			        "end": 253.38,
			        "start": 253.3,
			        "word": " be",
			      },
			      {
			        "end": 253.72,
			        "start": 253.38,
			        "word": " quite",
			      },
			      {
			        "end": 253.96,
			        "start": 253.72,
			        "word": " busy",
			      },
			      {
			        "end": 254.22,
			        "start": 253.96,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 256.51,
			    "start": 254.22,
			    "text": " We are sure that another carrier,",
			    "words": [
			      {
			        "end": 254.38,
			        "start": 254.22,
			        "word": " We",
			      },
			      {
			        "end": 254.62,
			        "start": 254.38,
			        "word": " are",
			      },
			      {
			        "end": 254.94,
			        "start": 254.62,
			        "word": " sure",
			      },
			      {
			        "end": 255.26,
			        "start": 254.94,
			        "word": " that",
			      },
			      {
			        "end": 255.81,
			        "start": 255.26,
			        "word": " another",
			      },
			      {
			        "end": 256.35,
			        "start": 255.81,
			        "word": " carrier",
			      },
			      {
			        "end": 256.51,
			        "start": 256.35,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 258.42,
			    "start": 256.51,
			    "text": " known as Type 004,",
			    "words": [
			      {
			        "end": 256.91,
			        "start": 256.51,
			        "word": " known",
			      },
			      {
			        "end": 257.13,
			        "start": 256.91,
			        "word": " as",
			      },
			      {
			        "end": 257.39,
			        "start": 257.13,
			        "word": " Type",
			      },
			      {
			        "end": 257.87,
			        "start": 257.39,
			        "word": " 00",
			      },
			      {
			        "end": 258.09,
			        "start": 257.87,
			        "word": "4",
			      },
			      {
			        "end": 258.42,
			        "start": 258.09,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 259.23,
			    "start": 258.42,
			    "text": " at the moment,",
			    "words": [
			      {
			        "end": 258.44,
			        "start": 258.42,
			        "word": " at",
			      },
			      {
			        "end": 258.61,
			        "start": 258.44,
			        "word": " the",
			      },
			      {
			        "end": 258.99,
			        "start": 258.61,
			        "word": " moment",
			      },
			      {
			        "end": 259.23,
			        "start": 258.99,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 261.5,
			    "start": 259.23,
			    "text": " is in the early building stages in Dalian.",
			    "words": [
			      {
			        "end": 259.35,
			        "start": 259.23,
			        "word": " is",
			      },
			      {
			        "end": 259.36,
			        "start": 259.35,
			        "word": " in",
			      },
			      {
			        "end": 259.54,
			        "start": 259.36,
			        "word": " the",
			      },
			      {
			        "end": 259.85,
			        "start": 259.54,
			        "word": " early",
			      },
			      {
			        "end": 260.44,
			        "start": 259.85,
			        "word": " building",
			      },
			      {
			        "end": 260.74,
			        "start": 260.44,
			        "word": " stages",
			      },
			      {
			        "end": 260.86,
			        "start": 260.74,
			        "word": " in",
			      },
			      {
			        "end": 261.05,
			        "start": 260.86,
			        "word": " Dal",
			      },
			      {
			        "end": 261.24,
			        "start": 261.05,
			        "word": "ian",
			      },
			      {
			        "end": 261.5,
			        "start": 261.24,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 262.41,
			    "start": 261.5,
			    "text": " At this time,",
			    "words": [
			      {
			        "end": 261.65,
			        "start": 261.5,
			        "word": " At",
			      },
			      {
			        "end": 262.04,
			        "start": 261.65,
			        "word": " this",
			      },
			      {
			        "end": 262.27,
			        "start": 262.04,
			        "word": " time",
			      },
			      {
			        "end": 262.41,
			        "start": 262.27,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 266.14,
			    "start": 262.41,
			    "text": " we are certain it will be a nuclear propulsion carrier,",
			    "words": [
			      {
			        "end": 262.73,
			        "start": 262.41,
			        "word": " we",
			      },
			      {
			        "end": 262.8,
			        "start": 262.73,
			        "word": " are",
			      },
			      {
			        "end": 263.41,
			        "start": 262.8,
			        "word": " certain",
			      },
			      {
			        "end": 263.49,
			        "start": 263.41,
			        "word": " it",
			      },
			      {
			        "end": 263.85,
			        "start": 263.49,
			        "word": " will",
			      },
			      {
			        "end": 263.95,
			        "start": 263.85,
			        "word": " be",
			      },
			      {
			        "end": 264.02,
			        "start": 263.95,
			        "word": " a",
			      },
			      {
			        "end": 264.56,
			        "start": 264.02,
			        "word": " nuclear",
			      },
			      {
			        "end": 265.42,
			        "start": 264.56,
			        "word": " propulsion",
			      },
			      {
			        "end": 266.1,
			        "start": 265.42,
			        "word": " carrier",
			      },
			      {
			        "end": 266.14,
			        "start": 266.1,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 269.58,
			    "start": 266.14,
			    "text": " because the Tenda for the reactors has been published in China.",
			    "words": [
			      {
			        "end": 266.64,
			        "start": 266.14,
			        "word": " because",
			      },
			      {
			        "end": 266.72,
			        "start": 266.64,
			        "word": " the",
			      },
			      {
			        "end": 266.78,
			        "start": 266.72,
			        "word": " T",
			      },
			      {
			        "end": 267.11,
			        "start": 266.78,
			        "word": "enda",
			      },
			      {
			        "end": 267.21,
			        "start": 267.11,
			        "word": " for",
			      },
			      {
			        "end": 267.39,
			        "start": 267.21,
			        "word": " the",
			      },
			      {
			        "end": 267.89,
			        "start": 267.39,
			        "word": " reactors",
			      },
			      {
			        "end": 268.07,
			        "start": 267.89,
			        "word": " has",
			      },
			      {
			        "end": 268.32,
			        "start": 268.07,
			        "word": " been",
			      },
			      {
			        "end": 268.88,
			        "start": 268.32,
			        "word": " published",
			      },
			      {
			        "end": 269.02,
			        "start": 268.88,
			        "word": " in",
			      },
			      {
			        "end": 269.3,
			        "start": 269.02,
			        "word": " China",
			      },
			      {
			        "end": 269.58,
			        "start": 269.3,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 270.46,
			    "start": 269.58,
			    "text": " More recently,",
			    "words": [
			      {
			        "end": 269.83,
			        "start": 269.58,
			        "word": " More",
			      },
			      {
			        "end": 270.36,
			        "start": 269.83,
			        "word": " recently",
			      },
			      {
			        "end": 270.46,
			        "start": 270.36,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 274.78,
			    "start": 270.46,
			    "text": " some hints have emerged that another Type 003 conventional carrier,",
			    "words": [
			      {
			        "end": 270.72,
			        "start": 270.46,
			        "word": " some",
			      },
			      {
			        "end": 271.03,
			        "start": 270.72,
			        "word": " hints",
			      },
			      {
			        "end": 271.3,
			        "start": 271.03,
			        "word": " have",
			      },
			      {
			        "end": 271.71,
			        "start": 271.3,
			        "word": " emerged",
			      },
			      {
			        "end": 271.96,
			        "start": 271.71,
			        "word": " that",
			      },
			      {
			        "end": 272.52,
			        "start": 271.96,
			        "word": " another",
			      },
			      {
			        "end": 272.76,
			        "start": 272.52,
			        "word": " Type",
			      },
			      {
			        "end": 273.03,
			        "start": 272.76,
			        "word": " 00",
			      },
			      {
			        "end": 273.28,
			        "start": 273.03,
			        "word": "3",
			      },
			      {
			        "end": 273.98,
			        "start": 273.28,
			        "word": " conventional",
			      },
			      {
			        "end": 274.42,
			        "start": 273.98,
			        "word": " carrier",
			      },
			      {
			        "end": 274.78,
			        "start": 274.42,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 276.51,
			    "start": 274.78,
			    "text": " another Fujian class,",
			    "words": [
			      {
			        "end": 275.29,
			        "start": 274.78,
			        "word": " another",
			      },
			      {
			        "end": 275.49,
			        "start": 275.29,
			        "word": " Fuj",
			      },
			      {
			        "end": 275.75,
			        "start": 275.49,
			        "word": "ian",
			      },
			      {
			        "end": 276.14,
			        "start": 275.75,
			        "word": " class",
			      },
			      {
			        "end": 276.51,
			        "start": 276.14,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 279.66,
			    "start": 276.51,
			    "text": " could be acquired by the plan in the near future.",
			    "words": [
			      {
			        "end": 276.62,
			        "start": 276.51,
			        "word": " could",
			      },
			      {
			        "end": 276.78,
			        "start": 276.62,
			        "word": " be",
			      },
			      {
			        "end": 277.43,
			        "start": 276.78,
			        "word": " acquired",
			      },
			      {
			        "end": 277.68,
			        "start": 277.43,
			        "word": " by",
			      },
			      {
			        "end": 277.83,
			        "start": 277.68,
			        "word": " the",
			      },
			      {
			        "end": 278.31,
			        "start": 277.83,
			        "word": " plan",
			      },
			      {
			        "end": 278.55,
			        "start": 278.31,
			        "word": " in",
			      },
			      {
			        "end": 278.56,
			        "start": 278.55,
			        "word": " the",
			      },
			      {
			        "end": 278.87,
			        "start": 278.56,
			        "word": " near",
			      },
			      {
			        "end": 279.36,
			        "start": 278.87,
			        "word": " future",
			      },
			      {
			        "end": 279.66,
			        "start": 279.36,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 287.82,
			    "start": 279.66,
			    "text": " Some analysts estimate that the Chinese are planning a force of six catapult carriers in commission at any given moment.",
			    "words": [
			      {
			        "end": 279.8,
			        "start": 279.66,
			        "word": "",
			      },
			      {
			        "end": 279.98,
			        "start": 279.8,
			        "word": " Some",
			      },
			      {
			        "end": 280.71,
			        "start": 279.98,
			        "word": " analysts",
			      },
			      {
			        "end": 281.29,
			        "start": 280.71,
			        "word": " estimate",
			      },
			      {
			        "end": 281.6,
			        "start": 281.29,
			        "word": " that",
			      },
			      {
			        "end": 281.85,
			        "start": 281.6,
			        "word": " the",
			      },
			      {
			        "end": 282.54,
			        "start": 281.85,
			        "word": " Chinese",
			      },
			      {
			        "end": 282.65,
			        "start": 282.54,
			        "word": " are",
			      },
			      {
			        "end": 283.35,
			        "start": 282.65,
			        "word": " planning",
			      },
			      {
			        "end": 283.38,
			        "start": 283.35,
			        "word": " a",
			      },
			      {
			        "end": 283.79,
			        "start": 283.38,
			        "word": " force",
			      },
			      {
			        "end": 283.95,
			        "start": 283.79,
			        "word": " of",
			      },
			      {
			        "end": 284.19,
			        "start": 283.95,
			        "word": " six",
			      },
			      {
			        "end": 284.46,
			        "start": 284.19,
			        "word": " cat",
			      },
			      {
			        "end": 284.59,
			        "start": 284.46,
			        "word": "ap",
			      },
			      {
			        "end": 284.83,
			        "start": 284.59,
			        "word": "ult",
			      },
			      {
			        "end": 285.64,
			        "start": 284.83,
			        "word": " carriers",
			      },
			      {
			        "end": 285.74,
			        "start": 285.64,
			        "word": " in",
			      },
			      {
			        "end": 286.37,
			        "start": 285.74,
			        "word": " commission",
			      },
			      {
			        "end": 286.8,
			        "start": 286.37,
			        "word": " at",
			      },
			      {
			        "end": 286.94,
			        "start": 286.8,
			        "word": " any",
			      },
			      {
			        "end": 287.24,
			        "start": 286.94,
			        "word": " given",
			      },
			      {
			        "end": 287.61,
			        "start": 287.24,
			        "word": " moment",
			      },
			      {
			        "end": 287.82,
			        "start": 287.61,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 289.58,
			    "start": 287.82,
			    "text": " This is fewer than the USA,",
			    "words": [
			      {
			        "end": 288.12,
			        "start": 287.82,
			        "word": " This",
			      },
			      {
			        "end": 288.35,
			        "start": 288.12,
			        "word": " is",
			      },
			      {
			        "end": 288.65,
			        "start": 288.35,
			        "word": " fewer",
			      },
			      {
			        "end": 288.95,
			        "start": 288.65,
			        "word": " than",
			      },
			      {
			        "end": 289.17,
			        "start": 288.95,
			        "word": " the",
			      },
			      {
			        "end": 289.39,
			        "start": 289.17,
			        "word": " USA",
			      },
			      {
			        "end": 289.58,
			        "start": 289.39,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 296.46,
			    "start": 289.58,
			    "text": " but we must consider that the Chinese do not have the global power projection requirement that the Americans have.",
			    "words": [
			      {
			        "end": 289.82,
			        "start": 289.58,
			        "word": " but",
			      },
			      {
			        "end": 289.98,
			        "start": 289.82,
			        "word": " we",
			      },
			      {
			        "end": 290.3,
			        "start": 289.98,
			        "word": " must",
			      },
			      {
			        "end": 290.93,
			        "start": 290.3,
			        "word": " consider",
			      },
			      {
			        "end": 291.27,
			        "start": 290.93,
			        "word": " that",
			      },
			      {
			        "end": 291.49,
			        "start": 291.27,
			        "word": " the",
			      },
			      {
			        "end": 292.13,
			        "start": 291.49,
			        "word": " Chinese",
			      },
			      {
			        "end": 292.2,
			        "start": 292.13,
			        "word": " do",
			      },
			      {
			        "end": 292.41,
			        "start": 292.2,
			        "word": " not",
			      },
			      {
			        "end": 292.7,
			        "start": 292.41,
			        "word": " have",
			      },
			      {
			        "end": 292.94,
			        "start": 292.7,
			        "word": " the",
			      },
			      {
			        "end": 293.34,
			        "start": 292.94,
			        "word": " global",
			      },
			      {
			        "end": 293.58,
			        "start": 293.34,
			        "word": " power",
			      },
			      {
			        "end": 294.14,
			        "start": 293.58,
			        "word": " projection",
			      },
			      {
			        "end": 295.4,
			        "start": 294.14,
			        "word": " requirement",
			      },
			      {
			        "end": 295.42,
			        "start": 295.4,
			        "word": " that",
			      },
			      {
			        "end": 295.56,
			        "start": 295.42,
			        "word": " the",
			      },
			      {
			        "end": 296.05,
			        "start": 295.56,
			        "word": " Americans",
			      },
			      {
			        "end": 296.28,
			        "start": 296.05,
			        "word": " have",
			      },
			      {
			        "end": 296.46,
			        "start": 296.28,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 303.1,
			    "start": 296.46,
			    "text": " Therefore, it is quite obvious that the Chinese are enacting a symmetrical response to the American carrier force,",
			    "words": [
			      {
			        "end": 297.07,
			        "start": 296.46,
			        "word": " Therefore",
			      },
			      {
			        "end": 297.18,
			        "start": 297.07,
			        "word": ",",
			      },
			      {
			        "end": 297.31,
			        "start": 297.18,
			        "word": " it",
			      },
			      {
			        "end": 297.48,
			        "start": 297.31,
			        "word": " is",
			      },
			      {
			        "end": 297.83,
			        "start": 297.48,
			        "word": " quite",
			      },
			      {
			        "end": 298.23,
			        "start": 297.83,
			        "word": " obvious",
			      },
			      {
			        "end": 298.49,
			        "start": 298.23,
			        "word": " that",
			      },
			      {
			        "end": 298.68,
			        "start": 298.49,
			        "word": " the",
			      },
			      {
			        "end": 299.14,
			        "start": 298.68,
			        "word": " Chinese",
			      },
			      {
			        "end": 299.33,
			        "start": 299.14,
			        "word": " are",
			      },
			      {
			        "end": 299.66,
			        "start": 299.33,
			        "word": " enact",
			      },
			      {
			        "end": 299.9,
			        "start": 299.66,
			        "word": "ing",
			      },
			      {
			        "end": 300.06,
			        "start": 299.9,
			        "word": " a",
			      },
			      {
			        "end": 300.76,
			        "start": 300.06,
			        "word": " symmetrical",
			      },
			      {
			        "end": 301.32,
			        "start": 300.76,
			        "word": " response",
			      },
			      {
			        "end": 301.54,
			        "start": 301.32,
			        "word": " to",
			      },
			      {
			        "end": 301.61,
			        "start": 301.54,
			        "word": " the",
			      },
			      {
			        "end": 302.06,
			        "start": 301.61,
			        "word": " American",
			      },
			      {
			        "end": 302.71,
			        "start": 302.06,
			        "word": " carrier",
			      },
			      {
			        "end": 303.1,
			        "start": 302.71,
			        "word": " force",
			      },
			      {
			        "end": 303.1,
			        "start": 303.1,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 307.1,
			    "start": 303.1,
			    "text": " which is the American main tool to exert sea control.",
			    "words": [
			      {
			        "end": 303.53,
			        "start": 303.1,
			        "word": " which",
			      },
			      {
			        "end": 303.7,
			        "start": 303.53,
			        "word": " is",
			      },
			      {
			        "end": 303.96,
			        "start": 303.7,
			        "word": " the",
			      },
			      {
			        "end": 304.65,
			        "start": 303.96,
			        "word": " American",
			      },
			      {
			        "end": 304.99,
			        "start": 304.65,
			        "word": " main",
			      },
			      {
			        "end": 305.33,
			        "start": 304.99,
			        "word": " tool",
			      },
			      {
			        "end": 305.52,
			        "start": 305.33,
			        "word": " to",
			      },
			      {
			        "end": 305.93,
			        "start": 305.52,
			        "word": " exert",
			      },
			      {
			        "end": 306.19,
			        "start": 305.93,
			        "word": " sea",
			      },
			      {
			        "end": 306.79,
			        "start": 306.19,
			        "word": " control",
			      },
			      {
			        "end": 307.1,
			        "start": 306.79,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 308.76,
			    "start": 307.1,
			    "text": " And all saying well and good,",
			    "words": [
			      {
			        "end": 307.27,
			        "start": 307.1,
			        "word": "",
			      },
			      {
			        "end": 307.28,
			        "start": 307.27,
			        "word": " And",
			      },
			      {
			        "end": 307.46,
			        "start": 307.28,
			        "word": " all",
			      },
			      {
			        "end": 307.83,
			        "start": 307.46,
			        "word": " saying",
			      },
			      {
			        "end": 308.08,
			        "start": 307.83,
			        "word": " well",
			      },
			      {
			        "end": 308.26,
			        "start": 308.08,
			        "word": " and",
			      },
			      {
			        "end": 308.68,
			        "start": 308.26,
			        "word": " good",
			      },
			      {
			        "end": 308.76,
			        "start": 308.68,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 311.43,
			    "start": 308.76,
			    "text": " till we saw the first Type 076,",
			    "words": [
			      {
			        "end": 308.98,
			        "start": 308.76,
			        "word": " till",
			      },
			      {
			        "end": 309.13,
			        "start": 308.98,
			        "word": " we",
			      },
			      {
			        "end": 309.51,
			        "start": 309.13,
			        "word": " saw",
			      },
			      {
			        "end": 309.57,
			        "start": 309.51,
			        "word": " the",
			      },
			      {
			        "end": 309.94,
			        "start": 309.57,
			        "word": " first",
			      },
			      {
			        "end": 310.24,
			        "start": 309.94,
			        "word": " Type",
			      },
			      {
			        "end": 310.46,
			        "start": 310.24,
			        "word": " 0",
			      },
			      {
			        "end": 310.93,
			        "start": 310.46,
			        "word": "76",
			      },
			      {
			        "end": 311.43,
			        "start": 310.93,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 312.7,
			    "start": 311.43,
			    "text": " the Sichuan.",
			    "words": [
			      {
			        "end": 311.71,
			        "start": 311.43,
			        "word": " the",
			      },
			      {
			        "end": 312.08,
			        "start": 311.71,
			        "word": " Sich",
			      },
			      {
			        "end": 312.38,
			        "start": 312.08,
			        "word": "uan",
			      },
			      {
			        "end": 312.7,
			        "start": 312.38,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 336.62,
			    "start": 332.94,
			    "text": " The Type 76 has been described in many ways,",
			    "words": [
			      {
			        "end": 332.94,
			        "start": 332.94,
			        "word": "",
			      },
			      {
			        "end": 333.19,
			        "start": 332.94,
			        "word": " The",
			      },
			      {
			        "end": 333.53,
			        "start": 333.19,
			        "word": " Type",
			      },
			      {
			        "end": 334.04,
			        "start": 333.53,
			        "word": " 76",
			      },
			      {
			        "end": 334.34,
			        "start": 334.04,
			        "word": " has",
			      },
			      {
			        "end": 334.63,
			        "start": 334.34,
			        "word": " been",
			      },
			      {
			        "end": 335.4,
			        "start": 334.63,
			        "word": " described",
			      },
			      {
			        "end": 335.57,
			        "start": 335.4,
			        "word": " in",
			      },
			      {
			        "end": 335.91,
			        "start": 335.57,
			        "word": " many",
			      },
			      {
			        "end": 336.24,
			        "start": 335.91,
			        "word": " ways",
			      },
			      {
			        "end": 336.62,
			        "start": 336.24,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 337.36,
			    "start": 336.62,
			    "text": " as an LPD,",
			    "words": [
			      {
			        "end": 336.66,
			        "start": 336.62,
			        "word": " as",
			      },
			      {
			        "end": 336.93,
			        "start": 336.66,
			        "word": " an",
			      },
			      {
			        "end": 336.96,
			        "start": 336.93,
			        "word": " L",
			      },
			      {
			        "end": 337.17,
			        "start": 336.96,
			        "word": "PD",
			      },
			      {
			        "end": 337.36,
			        "start": 337.17,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 338.1,
			    "start": 337.36,
			    "text": " an LHD,",
			    "words": [
			      {
			        "end": 337.56,
			        "start": 337.36,
			        "word": " an",
			      },
			      {
			        "end": 337.66,
			        "start": 337.56,
			        "word": " L",
			      },
			      {
			        "end": 337.86,
			        "start": 337.66,
			        "word": "HD",
			      },
			      {
			        "end": 338.1,
			        "start": 337.86,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 338.76,
			    "start": 338.1,
			    "text": " an LHA,",
			    "words": [
			      {
			        "end": 338.26,
			        "start": 338.1,
			        "word": " an",
			      },
			      {
			        "end": 338.36,
			        "start": 338.26,
			        "word": " L",
			      },
			      {
			        "end": 338.56,
			        "start": 338.36,
			        "word": "HA",
			      },
			      {
			        "end": 338.76,
			        "start": 338.56,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 341.1,
			    "start": 338.76,
			    "text": " a light carrier and so on.",
			    "words": [
			      {
			        "end": 338.86,
			        "start": 338.76,
			        "word": " a",
			      },
			      {
			        "end": 339.48,
			        "start": 338.86,
			        "word": " light",
			      },
			      {
			        "end": 340.06,
			        "start": 339.48,
			        "word": " carrier",
			      },
			      {
			        "end": 340.36,
			        "start": 340.06,
			        "word": " and",
			      },
			      {
			        "end": 340.56,
			        "start": 340.36,
			        "word": " so",
			      },
			      {
			        "end": 340.76,
			        "start": 340.56,
			        "word": " on",
			      },
			      {
			        "end": 341.1,
			        "start": 340.76,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 344.09,
			    "start": 341.1,
			    "text": " Honestly, rather than sticking a label on it,",
			    "words": [
			      {
			        "end": 341.65,
			        "start": 341.1,
			        "word": " Honestly",
			      },
			      {
			        "end": 341.78,
			        "start": 341.65,
			        "word": ",",
			      },
			      {
			        "end": 342.19,
			        "start": 341.78,
			        "word": " rather",
			      },
			      {
			        "end": 342.47,
			        "start": 342.19,
			        "word": " than",
			      },
			      {
			        "end": 343.02,
			        "start": 342.47,
			        "word": " sticking",
			      },
			      {
			        "end": 343.09,
			        "start": 343.02,
			        "word": " a",
			      },
			      {
			        "end": 343.43,
			        "start": 343.09,
			        "word": " label",
			      },
			      {
			        "end": 343.58,
			        "start": 343.43,
			        "word": " on",
			      },
			      {
			        "end": 343.72,
			        "start": 343.58,
			        "word": " it",
			      },
			      {
			        "end": 344.09,
			        "start": 343.72,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 345.51,
			    "start": 344.09,
			    "text": " let's see what it is,",
			    "words": [
			      {
			        "end": 344.14,
			        "start": 344.09,
			        "word": " let",
			      },
			      {
			        "end": 344.29,
			        "start": 344.14,
			        "word": "'s",
			      },
			      {
			        "end": 344.53,
			        "start": 344.29,
			        "word": " see",
			      },
			      {
			        "end": 344.89,
			        "start": 344.53,
			        "word": " what",
			      },
			      {
			        "end": 345,
			        "start": 344.89,
			        "word": " it",
			      },
			      {
			        "end": 345.16,
			        "start": 345,
			        "word": " is",
			      },
			      {
			        "end": 345.51,
			        "start": 345.16,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 347.82,
			    "start": 345.51,
			    "text": " and let's learn a bit more about its features.",
			    "words": [
			      {
			        "end": 345.52,
			        "start": 345.51,
			        "word": " and",
			      },
			      {
			        "end": 345.7,
			        "start": 345.52,
			        "word": " let",
			      },
			      {
			        "end": 345.87,
			        "start": 345.7,
			        "word": "'s",
			      },
			      {
			        "end": 346.12,
			        "start": 345.87,
			        "word": " learn",
			      },
			      {
			        "end": 346.18,
			        "start": 346.12,
			        "word": " a",
			      },
			      {
			        "end": 346.36,
			        "start": 346.18,
			        "word": " bit",
			      },
			      {
			        "end": 346.6,
			        "start": 346.36,
			        "word": " more",
			      },
			      {
			        "end": 346.9,
			        "start": 346.6,
			        "word": " about",
			      },
			      {
			        "end": 347.08,
			        "start": 346.9,
			        "word": " its",
			      },
			      {
			        "end": 347.57,
			        "start": 347.08,
			        "word": " features",
			      },
			      {
			        "end": 347.82,
			        "start": 347.57,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 351.22,
			    "start": 347.82,
			    "text": " The ship has a normal displacement around 45,000",
			    "words": [
			      {
			        "end": 348.03,
			        "start": 347.82,
			        "word": " The",
			      },
			      {
			        "end": 348.27,
			        "start": 348.03,
			        "word": " ship",
			      },
			      {
			        "end": 348.46,
			        "start": 348.27,
			        "word": " has",
			      },
			      {
			        "end": 348.52,
			        "start": 348.46,
			        "word": " a",
			      },
			      {
			        "end": 348.91,
			        "start": 348.52,
			        "word": " normal",
			      },
			      {
			        "end": 349.69,
			        "start": 348.91,
			        "word": " displacement",
			      },
			      {
			        "end": 350.09,
			        "start": 349.69,
			        "word": " around",
			      },
			      {
			        "end": 351.22,
			        "start": 350.09,
			        "word": " 45,000",
			      },
			    ],
			  },
			  {
			    "end": 356.54,
			    "start": 351.22,
			    "text": " tons, a length of 263 meters and a beam of 43 meters.",
			    "words": [
			      {
			        "end": 351.46,
			        "start": 351.22,
			        "word": " tons",
			      },
			      {
			        "end": 351.77,
			        "start": 351.46,
			        "word": ",",
			      },
			      {
			        "end": 351.81,
			        "start": 351.77,
			        "word": " a",
			      },
			      {
			        "end": 352.42,
			        "start": 351.81,
			        "word": " length",
			      },
			      {
			        "end": 352.64,
			        "start": 352.42,
			        "word": " of",
			      },
			      {
			        "end": 353.29,
			        "start": 352.64,
			        "word": " 26",
			      },
			      {
			        "end": 353.61,
			        "start": 353.29,
			        "word": "3",
			      },
			      {
			        "end": 354.46,
			        "start": 353.61,
			        "word": " meters",
			      },
			      {
			        "end": 354.56,
			        "start": 354.46,
			        "word": " and",
			      },
			      {
			        "end": 354.65,
			        "start": 354.56,
			        "word": " a",
			      },
			      {
			        "end": 355,
			        "start": 354.65,
			        "word": " beam",
			      },
			      {
			        "end": 355.16,
			        "start": 355,
			        "word": " of",
			      },
			      {
			        "end": 355.69,
			        "start": 355.16,
			        "word": " 43",
			      },
			      {
			        "end": 356.22,
			        "start": 355.69,
			        "word": " meters",
			      },
			      {
			        "end": 356.54,
			        "start": 356.22,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 362.46,
			    "start": 356.54,
			    "text": " It is equipped with two main elevators and other smaller weapon and personnel elevators on the flight deck.",
			    "words": [
			      {
			        "end": 356.66,
			        "start": 356.54,
			        "word": "",
			      },
			      {
			        "end": 356.75,
			        "start": 356.66,
			        "word": " It",
			      },
			      {
			        "end": 356.8,
			        "start": 356.75,
			        "word": " is",
			      },
			      {
			        "end": 357.35,
			        "start": 356.8,
			        "word": " equipped",
			      },
			      {
			        "end": 357.64,
			        "start": 357.35,
			        "word": " with",
			      },
			      {
			        "end": 357.81,
			        "start": 357.64,
			        "word": " two",
			      },
			      {
			        "end": 358.08,
			        "start": 357.81,
			        "word": " main",
			      },
			      {
			        "end": 358.35,
			        "start": 358.08,
			        "word": " elev",
			      },
			      {
			        "end": 358.68,
			        "start": 358.35,
			        "word": "ators",
			      },
			      {
			        "end": 358.91,
			        "start": 358.68,
			        "word": " and",
			      },
			      {
			        "end": 359.23,
			        "start": 358.91,
			        "word": " other",
			      },
			      {
			        "end": 359.69,
			        "start": 359.23,
			        "word": " smaller",
			      },
			      {
			        "end": 360.09,
			        "start": 359.69,
			        "word": " weapon",
			      },
			      {
			        "end": 360.33,
			        "start": 360.09,
			        "word": " and",
			      },
			      {
			        "end": 360.9,
			        "start": 360.33,
			        "word": " personnel",
			      },
			      {
			        "end": 361.17,
			        "start": 360.9,
			        "word": " elev",
			      },
			      {
			        "end": 361.68,
			        "start": 361.17,
			        "word": "ators",
			      },
			      {
			        "end": 361.69,
			        "start": 361.68,
			        "word": " on",
			      },
			      {
			        "end": 361.83,
			        "start": 361.69,
			        "word": " the",
			      },
			      {
			        "end": 362.14,
			        "start": 361.83,
			        "word": " flight",
			      },
			      {
			        "end": 362.32,
			        "start": 362.14,
			        "word": " deck",
			      },
			      {
			        "end": 362.46,
			        "start": 362.32,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 366.64,
			    "start": 362.46,
			    "text": " The superstructure configuration is a modern dual island arrangement,",
			    "words": [
			      {
			        "end": 362.69,
			        "start": 362.46,
			        "word": " The",
			      },
			      {
			        "end": 363.21,
			        "start": 362.69,
			        "word": " superst",
			      },
			      {
			        "end": 363.6,
			        "start": 363.21,
			        "word": "ructure",
			      },
			      {
			        "end": 364.43,
			        "start": 363.6,
			        "word": " configuration",
			      },
			      {
			        "end": 364.57,
			        "start": 364.43,
			        "word": " is",
			      },
			      {
			        "end": 364.63,
			        "start": 364.57,
			        "word": " a",
			      },
			      {
			        "end": 365.06,
			        "start": 364.63,
			        "word": " modern",
			      },
			      {
			        "end": 365.28,
			        "start": 365.06,
			        "word": " dual",
			      },
			      {
			        "end": 365.69,
			        "start": 365.28,
			        "word": " island",
			      },
			      {
			        "end": 366.54,
			        "start": 365.69,
			        "word": " arrangement",
			      },
			      {
			        "end": 366.64,
			        "start": 366.54,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 372.22,
			    "start": 366.64,
			    "text": " with the front island dedicated to naval tasks and the rear island dedicated to air operations.",
			    "words": [
			      {
			        "end": 366.72,
			        "start": 366.64,
			        "word": " with",
			      },
			      {
			        "end": 366.89,
			        "start": 366.72,
			        "word": " the",
			      },
			      {
			        "end": 367.11,
			        "start": 366.89,
			        "word": " front",
			      },
			      {
			        "end": 367.34,
			        "start": 367.11,
			        "word": " island",
			      },
			      {
			        "end": 367.81,
			        "start": 367.34,
			        "word": " dedicated",
			      },
			      {
			        "end": 367.98,
			        "start": 367.81,
			        "word": " to",
			      },
			      {
			        "end": 368.49,
			        "start": 367.98,
			        "word": " naval",
			      },
			      {
			        "end": 368.94,
			        "start": 368.49,
			        "word": " tasks",
			      },
			      {
			        "end": 369.18,
			        "start": 368.94,
			        "word": " and",
			      },
			      {
			        "end": 369.35,
			        "start": 369.18,
			        "word": " the",
			      },
			      {
			        "end": 369.58,
			        "start": 369.35,
			        "word": " rear",
			      },
			      {
			        "end": 370.24,
			        "start": 369.58,
			        "word": " island",
			      },
			      {
			        "end": 370.77,
			        "start": 370.24,
			        "word": " dedicated",
			      },
			      {
			        "end": 370.96,
			        "start": 370.77,
			        "word": " to",
			      },
			      {
			        "end": 371.22,
			        "start": 370.96,
			        "word": " air",
			      },
			      {
			        "end": 371.96,
			        "start": 371.22,
			        "word": " operations",
			      },
			      {
			        "end": 372.22,
			        "start": 371.96,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 376.22,
			    "start": 372.22,
			    "text": " The propulsion is a modern integrated electric propulsion system,",
			    "words": [
			      {
			        "end": 372.41,
			        "start": 372.22,
			        "word": "",
			      },
			      {
			        "end": 372.42,
			        "start": 372.41,
			        "word": " The",
			      },
			      {
			        "end": 373.07,
			        "start": 372.42,
			        "word": " propulsion",
			      },
			      {
			        "end": 373.2,
			        "start": 373.07,
			        "word": " is",
			      },
			      {
			        "end": 373.26,
			        "start": 373.2,
			        "word": " a",
			      },
			      {
			        "end": 373.65,
			        "start": 373.26,
			        "word": " modern",
			      },
			      {
			        "end": 374.31,
			        "start": 373.65,
			        "word": " integrated",
			      },
			      {
			        "end": 374.83,
			        "start": 374.31,
			        "word": " electric",
			      },
			      {
			        "end": 375.49,
			        "start": 374.83,
			        "word": " propulsion",
			      },
			      {
			        "end": 375.88,
			        "start": 375.49,
			        "word": " system",
			      },
			      {
			        "end": 376.22,
			        "start": 375.88,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 379.33,
			    "start": 376.22,
			    "text": " with two turbines and six diesel generators,",
			    "words": [
			      {
			        "end": 376.41,
			        "start": 376.22,
			        "word": " with",
			      },
			      {
			        "end": 376.62,
			        "start": 376.41,
			        "word": " two",
			      },
			      {
			        "end": 377.41,
			        "start": 376.62,
			        "word": " turbines",
			      },
			      {
			        "end": 377.59,
			        "start": 377.41,
			        "word": " and",
			      },
			      {
			        "end": 377.92,
			        "start": 377.59,
			        "word": " six",
			      },
			      {
			        "end": 378.35,
			        "start": 377.92,
			        "word": " diesel",
			      },
			      {
			        "end": 379.1,
			        "start": 378.35,
			        "word": " generators",
			      },
			      {
			        "end": 379.33,
			        "start": 379.1,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 382.38,
			    "start": 379.33,
			    "text": " for a total of 78 MW installed.",
			    "words": [
			      {
			        "end": 379.63,
			        "start": 379.33,
			        "word": " for",
			      },
			      {
			        "end": 379.74,
			        "start": 379.63,
			        "word": " a",
			      },
			      {
			        "end": 380.28,
			        "start": 379.74,
			        "word": " total",
			      },
			      {
			        "end": 380.5,
			        "start": 380.28,
			        "word": " of",
			      },
			      {
			        "end": 381.14,
			        "start": 380.5,
			        "word": " 78",
			      },
			      {
			        "end": 381.25,
			        "start": 381.14,
			        "word": " M",
			      },
			      {
			        "end": 381.35,
			        "start": 381.25,
			        "word": "W",
			      },
			      {
			        "end": 382.38,
			        "start": 381.35,
			        "word": " installed",
			      },
			      {
			        "end": 382.38,
			        "start": 382.38,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 384.38,
			    "start": 382.38,
			    "text": " What is an integrated electric propulsion?",
			    "words": [
			      {
			        "end": 382.58,
			        "start": 382.38,
			        "word": " What",
			      },
			      {
			        "end": 382.71,
			        "start": 382.58,
			        "word": " is",
			      },
			      {
			        "end": 382.78,
			        "start": 382.71,
			        "word": " an",
			      },
			      {
			        "end": 383.29,
			        "start": 382.78,
			        "word": " integrated",
			      },
			      {
			        "end": 383.7,
			        "start": 383.29,
			        "word": " electric",
			      },
			      {
			        "end": 384.21,
			        "start": 383.7,
			        "word": " propulsion",
			      },
			      {
			        "end": 384.38,
			        "start": 384.21,
			        "word": "?",
			      },
			    ],
			  },
			  {
			    "end": 394.14,
			    "start": 384.38,
			    "text": " It is a type of naval propulsion where diesels and turbines just produce electric power and variable speed electric motors drive the screws.",
			    "words": [
			      {
			        "end": 384.38,
			        "start": 384.38,
			        "word": "",
			      },
			      {
			        "end": 384.54,
			        "start": 384.38,
			        "word": " It",
			      },
			      {
			        "end": 384.7,
			        "start": 384.54,
			        "word": " is",
			      },
			      {
			        "end": 384.78,
			        "start": 384.7,
			        "word": " a",
			      },
			      {
			        "end": 385.1,
			        "start": 384.78,
			        "word": " type",
			      },
			      {
			        "end": 385.35,
			        "start": 385.1,
			        "word": " of",
			      },
			      {
			        "end": 385.67,
			        "start": 385.35,
			        "word": " naval",
			      },
			      {
			        "end": 386.49,
			        "start": 385.67,
			        "word": " propulsion",
			      },
			      {
			        "end": 386.9,
			        "start": 386.49,
			        "word": " where",
			      },
			      {
			        "end": 387.22,
			        "start": 386.9,
			        "word": " dies",
			      },
			      {
			        "end": 387.46,
			        "start": 387.22,
			        "word": "els",
			      },
			      {
			        "end": 387.74,
			        "start": 387.46,
			        "word": " and",
			      },
			      {
			        "end": 388.35,
			        "start": 387.74,
			        "word": " turbines",
			      },
			      {
			        "end": 388.73,
			        "start": 388.35,
			        "word": " just",
			      },
			      {
			        "end": 389.24,
			        "start": 388.73,
			        "word": " produce",
			      },
			      {
			        "end": 389.89,
			        "start": 389.24,
			        "word": " electric",
			      },
			      {
			        "end": 390.47,
			        "start": 389.89,
			        "word": " power",
			      },
			      {
			        "end": 390.7,
			        "start": 390.47,
			        "word": " and",
			      },
			      {
			        "end": 391.1,
			        "start": 390.7,
			        "word": " variable",
			      },
			      {
			        "end": 391.86,
			        "start": 391.1,
			        "word": " speed",
			      },
			      {
			        "end": 392.35,
			        "start": 391.86,
			        "word": " electric",
			      },
			      {
			        "end": 392.81,
			        "start": 392.35,
			        "word": " motors",
			      },
			      {
			        "end": 393.19,
			        "start": 392.81,
			        "word": " drive",
			      },
			      {
			        "end": 393.42,
			        "start": 393.19,
			        "word": " the",
			      },
			      {
			        "end": 393.87,
			        "start": 393.42,
			        "word": " screws",
			      },
			      {
			        "end": 394.14,
			        "start": 393.87,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 400.19,
			    "start": 394.14,
			    "text": " It tends to be about 10/50% lighter and less taxing for the ship internal layout,",
			    "words": [
			      {
			        "end": 394.29,
			        "start": 394.14,
			        "word": " It",
			      },
			      {
			        "end": 394.69,
			        "start": 394.29,
			        "word": " tends",
			      },
			      {
			        "end": 394.82,
			        "start": 394.69,
			        "word": " to",
			      },
			      {
			        "end": 394.96,
			        "start": 394.82,
			        "word": " be",
			      },
			      {
			        "end": 395.36,
			        "start": 394.96,
			        "word": " about",
			      },
			      {
			        "end": 395.81,
			        "start": 395.36,
			        "word": " 10",
			      },
			      {
			        "end": 395.93,
			        "start": 395.81,
			        "word": "/",
			      },
			      {
			        "end": 396.34,
			        "start": 395.93,
			        "word": "50",
			      },
			      {
			        "end": 396.41,
			        "start": 396.34,
			        "word": "%",
			      },
			      {
			        "end": 396.95,
			        "start": 396.41,
			        "word": " lighter",
			      },
			      {
			        "end": 397.18,
			        "start": 396.95,
			        "word": " and",
			      },
			      {
			        "end": 397.63,
			        "start": 397.18,
			        "word": " less",
			      },
			      {
			        "end": 397.72,
			        "start": 397.63,
			        "word": " tax",
			      },
			      {
			        "end": 397.95,
			        "start": 397.72,
			        "word": "ing",
			      },
			      {
			        "end": 398.41,
			        "start": 397.95,
			        "word": " for",
			      },
			      {
			        "end": 398.46,
			        "start": 398.41,
			        "word": " the",
			      },
			      {
			        "end": 398.72,
			        "start": 398.46,
			        "word": " ship",
			      },
			      {
			        "end": 399.34,
			        "start": 398.72,
			        "word": " internal",
			      },
			      {
			        "end": 399.8,
			        "start": 399.34,
			        "word": " layout",
			      },
			      {
			        "end": 400.19,
			        "start": 399.8,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 404.7,
			    "start": 400.19,
			    "text": " while being energetically more efficient than conventional configurations.",
			    "words": [
			      {
			        "end": 400.34,
			        "start": 400.19,
			        "word": " while",
			      },
			      {
			        "end": 400.62,
			        "start": 400.34,
			        "word": " being",
			      },
			      {
			        "end": 400.89,
			        "start": 400.62,
			        "word": " ener",
			      },
			      {
			        "end": 401.13,
			        "start": 400.89,
			        "word": "get",
			      },
			      {
			        "end": 401.5,
			        "start": 401.13,
			        "word": "ically",
			      },
			      {
			        "end": 401.77,
			        "start": 401.5,
			        "word": " more",
			      },
			      {
			        "end": 402.39,
			        "start": 401.77,
			        "word": " efficient",
			      },
			      {
			        "end": 402.88,
			        "start": 402.39,
			        "word": " than",
			      },
			      {
			        "end": 403.5,
			        "start": 402.88,
			        "word": " conventional",
			      },
			      {
			        "end": 404.46,
			        "start": 403.5,
			        "word": " configurations",
			      },
			      {
			        "end": 404.7,
			        "start": 404.46,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 409.42,
			    "start": 404.7,
			    "text": " And, by the way, 78 MW for a ship this size are not that much.",
			    "words": [
			      {
			        "end": 404.86,
			        "start": 404.7,
			        "word": "",
			      },
			      {
			        "end": 404.96,
			        "start": 404.86,
			        "word": " And",
			      },
			      {
			        "end": 405.13,
			        "start": 404.96,
			        "word": ",",
			      },
			      {
			        "end": 405.3,
			        "start": 405.13,
			        "word": " by",
			      },
			      {
			        "end": 405.56,
			        "start": 405.3,
			        "word": " the",
			      },
			      {
			        "end": 405.82,
			        "start": 405.56,
			        "word": " way",
			      },
			      {
			        "end": 405.99,
			        "start": 405.82,
			        "word": ",",
			      },
			      {
			        "end": 406.51,
			        "start": 405.99,
			        "word": " 78",
			      },
			      {
			        "end": 406.59,
			        "start": 406.51,
			        "word": " M",
			      },
			      {
			        "end": 406.67,
			        "start": 406.59,
			        "word": "W",
			      },
			      {
			        "end": 406.93,
			        "start": 406.67,
			        "word": " for",
			      },
			      {
			        "end": 407.01,
			        "start": 406.93,
			        "word": " a",
			      },
			      {
			        "end": 407.4,
			        "start": 407.01,
			        "word": " ship",
			      },
			      {
			        "end": 407.71,
			        "start": 407.4,
			        "word": " this",
			      },
			      {
			        "end": 408.28,
			        "start": 407.71,
			        "word": " size",
			      },
			      {
			        "end": 408.36,
			        "start": 408.28,
			        "word": " are",
			      },
			      {
			        "end": 408.58,
			        "start": 408.36,
			        "word": " not",
			      },
			      {
			        "end": 408.88,
			        "start": 408.58,
			        "word": " that",
			      },
			      {
			        "end": 409.18,
			        "start": 408.88,
			        "word": " much",
			      },
			      {
			        "end": 409.42,
			        "start": 409.18,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 413.95,
			    "start": 409.42,
			    "text": " I start suspecting that the Chinese tend to minimize the declared power,",
			    "words": [
			      {
			        "end": 409.49,
			        "start": 409.42,
			        "word": " I",
			      },
			      {
			        "end": 409.85,
			        "start": 409.49,
			        "word": " start",
			      },
			      {
			        "end": 410.45,
			        "start": 409.85,
			        "word": " suspect",
			      },
			      {
			        "end": 410.56,
			        "start": 410.45,
			        "word": "ing",
			      },
			      {
			        "end": 410.84,
			        "start": 410.56,
			        "word": " that",
			      },
			      {
			        "end": 411.05,
			        "start": 410.84,
			        "word": " the",
			      },
			      {
			        "end": 411.55,
			        "start": 411.05,
			        "word": " Chinese",
			      },
			      {
			        "end": 411.83,
			        "start": 411.55,
			        "word": " tend",
			      },
			      {
			        "end": 411.97,
			        "start": 411.83,
			        "word": " to",
			      },
			      {
			        "end": 412.54,
			        "start": 411.97,
			        "word": " minimize",
			      },
			      {
			        "end": 412.75,
			        "start": 412.54,
			        "word": " the",
			      },
			      {
			        "end": 413.32,
			        "start": 412.75,
			        "word": " declared",
			      },
			      {
			        "end": 413.74,
			        "start": 413.32,
			        "word": " power",
			      },
			      {
			        "end": 413.95,
			        "start": 413.74,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 416.54,
			    "start": 413.95,
			    "text": " because it happens the same for the Fujian.",
			    "words": [
			      {
			        "end": 414.7,
			        "start": 413.95,
			        "word": " because",
			      },
			      {
			        "end": 414.8,
			        "start": 414.7,
			        "word": " it",
			      },
			      {
			        "end": 415.21,
			        "start": 414.8,
			        "word": " happens",
			      },
			      {
			        "end": 415.39,
			        "start": 415.21,
			        "word": " the",
			      },
			      {
			        "end": 415.67,
			        "start": 415.39,
			        "word": " same",
			      },
			      {
			        "end": 415.88,
			        "start": 415.67,
			        "word": " for",
			      },
			      {
			        "end": 416.09,
			        "start": 415.88,
			        "word": " the",
			      },
			      {
			        "end": 416.29,
			        "start": 416.09,
			        "word": " Fuj",
			      },
			      {
			        "end": 416.54,
			        "start": 416.29,
			        "word": "ian",
			      },
			      {
			        "end": 416.54,
			        "start": 416.54,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 417.19,
			    "start": 416.54,
			    "text": " For example,",
			    "words": [
			      {
			        "end": 416.76,
			        "start": 416.54,
			        "word": " For",
			      },
			      {
			        "end": 417.08,
			        "start": 416.76,
			        "word": " example",
			      },
			      {
			        "end": 417.19,
			        "start": 417.08,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 418.66,
			    "start": 417.19,
			    "text": " consider the Italian Trieste,",
			    "words": [
			      {
			        "end": 417.63,
			        "start": 417.19,
			        "word": " consider",
			      },
			      {
			        "end": 417.83,
			        "start": 417.63,
			        "word": " the",
			      },
			      {
			        "end": 418.18,
			        "start": 417.83,
			        "word": " Italian",
			      },
			      {
			        "end": 418.33,
			        "start": 418.18,
			        "word": " Tri",
			      },
			      {
			        "end": 418.55,
			        "start": 418.33,
			        "word": "este",
			      },
			      {
			        "end": 418.66,
			        "start": 418.55,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 420.86,
			    "start": 418.66,
			    "text": " which is the benchmark of modern light carrier.",
			    "words": [
			      {
			        "end": 418.96,
			        "start": 418.66,
			        "word": " which",
			      },
			      {
			        "end": 419.04,
			        "start": 418.96,
			        "word": " is",
			      },
			      {
			        "end": 419.2,
			        "start": 419.04,
			        "word": " the",
			      },
			      {
			        "end": 419.69,
			        "start": 419.2,
			        "word": " benchmark",
			      },
			      {
			        "end": 419.8,
			        "start": 419.69,
			        "word": " of",
			      },
			      {
			        "end": 420.13,
			        "start": 419.8,
			        "word": " modern",
			      },
			      {
			        "end": 420.43,
			        "start": 420.13,
			        "word": " light",
			      },
			      {
			        "end": 420.86,
			        "start": 420.43,
			        "word": " carrier",
			      },
			      {
			        "end": 420.86,
			        "start": 420.86,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 424.54,
			    "start": 420.86,
			    "text": " It has about 34,000 tons of normal displacement.",
			    "words": [
			      {
			        "end": 421.01,
			        "start": 420.86,
			        "word": " It",
			      },
			      {
			        "end": 421.19,
			        "start": 421.01,
			        "word": " has",
			      },
			      {
			        "end": 421.53,
			        "start": 421.19,
			        "word": " about",
			      },
			      {
			        "end": 422.71,
			        "start": 421.53,
			        "word": " 34,000",
			      },
			      {
			        "end": 422.94,
			        "start": 422.71,
			        "word": " tons",
			      },
			      {
			        "end": 423.06,
			        "start": 422.94,
			        "word": " of",
			      },
			      {
			        "end": 423.47,
			        "start": 423.06,
			        "word": " normal",
			      },
			      {
			        "end": 424.28,
			        "start": 423.47,
			        "word": " displacement",
			      },
			      {
			        "end": 424.54,
			        "start": 424.28,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 428.54,
			    "start": 424.54,
			    "text": " It is 20 meters shorter, albeit it is 4 meters wider.",
			    "words": [
			      {
			        "end": 424.7,
			        "start": 424.54,
			        "word": " It",
			      },
			      {
			        "end": 424.86,
			        "start": 424.7,
			        "word": " is",
			      },
			      {
			        "end": 425.35,
			        "start": 424.86,
			        "word": " 20",
			      },
			      {
			        "end": 425.83,
			        "start": 425.35,
			        "word": " meters",
			      },
			      {
			        "end": 426.43,
			        "start": 425.83,
			        "word": " shorter",
			      },
			      {
			        "end": 426.55,
			        "start": 426.43,
			        "word": ",",
			      },
			      {
			        "end": 427.03,
			        "start": 426.55,
			        "word": " albeit",
			      },
			      {
			        "end": 427.19,
			        "start": 427.03,
			        "word": " it",
			      },
			      {
			        "end": 427.43,
			        "start": 427.19,
			        "word": " is",
			      },
			      {
			        "end": 427.59,
			        "start": 427.43,
			        "word": " 4",
			      },
			      {
			        "end": 428.07,
			        "start": 427.59,
			        "word": " meters",
			      },
			      {
			        "end": 428.54,
			        "start": 428.07,
			        "word": " wider",
			      },
			      {
			        "end": 428.54,
			        "start": 428.54,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 434.14,
			    "start": 428.54,
			    "text": " And, despite this, it features about 145 MW of installed power.",
			    "words": [
			      {
			        "end": 428.73,
			        "start": 428.54,
			        "word": "",
			      },
			      {
			        "end": 428.82,
			        "start": 428.73,
			        "word": " And",
			      },
			      {
			        "end": 429,
			        "start": 428.82,
			        "word": ",",
			      },
			      {
			        "end": 429.65,
			        "start": 429,
			        "word": " despite",
			      },
			      {
			        "end": 430.06,
			        "start": 429.65,
			        "word": " this",
			      },
			      {
			        "end": 430.2,
			        "start": 430.06,
			        "word": ",",
			      },
			      {
			        "end": 430.38,
			        "start": 430.2,
			        "word": " it",
			      },
			      {
			        "end": 431.12,
			        "start": 430.38,
			        "word": " features",
			      },
			      {
			        "end": 431.63,
			        "start": 431.12,
			        "word": " about",
			      },
			      {
			        "end": 432.13,
			        "start": 431.63,
			        "word": " 14",
			      },
			      {
			        "end": 432.4,
			        "start": 432.13,
			        "word": "5",
			      },
			      {
			        "end": 432.49,
			        "start": 432.4,
			        "word": " M",
			      },
			      {
			        "end": 432.58,
			        "start": 432.49,
			        "word": "W",
			      },
			      {
			        "end": 432.75,
			        "start": 432.58,
			        "word": " of",
			      },
			      {
			        "end": 433.58,
			        "start": 432.75,
			        "word": " installed",
			      },
			      {
			        "end": 434.14,
			        "start": 433.58,
			        "word": " power",
			      },
			      {
			        "end": 434.14,
			        "start": 434.14,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 436.86,
			    "start": 434.14,
			    "text": " Many of our viewers are Americans, sir.",
			    "words": [
			      {
			        "end": 434.44,
			        "start": 434.14,
			        "word": " Many",
			      },
			      {
			        "end": 434.59,
			        "start": 434.44,
			        "word": " of",
			      },
			      {
			        "end": 434.81,
			        "start": 434.59,
			        "word": " our",
			      },
			      {
			        "end": 435.33,
			        "start": 434.81,
			        "word": " viewers",
			      },
			      {
			        "end": 435.55,
			        "start": 435.33,
			        "word": " are",
			      },
			      {
			        "end": 436.2,
			        "start": 435.55,
			        "word": " Americans",
			      },
			      {
			        "end": 436.44,
			        "start": 436.2,
			        "word": ",",
			      },
			      {
			        "end": 436.59,
			        "start": 436.44,
			        "word": " sir",
			      },
			      {
			        "end": 436.86,
			        "start": 436.59,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 440.38,
			    "start": 436.86,
			    "text": " They don't even know that Italy operates aircraft carriers.",
			    "words": [
			      {
			        "end": 437.14,
			        "start": 436.86,
			        "word": " They",
			      },
			      {
			        "end": 437.35,
			        "start": 437.14,
			        "word": " don",
			      },
			      {
			        "end": 437.49,
			        "start": 437.35,
			        "word": "'t",
			      },
			      {
			        "end": 437.77,
			        "start": 437.49,
			        "word": " even",
			      },
			      {
			        "end": 438.05,
			        "start": 437.77,
			        "word": " know",
			      },
			      {
			        "end": 438.33,
			        "start": 438.05,
			        "word": " that",
			      },
			      {
			        "end": 438.68,
			        "start": 438.33,
			        "word": " Italy",
			      },
			      {
			        "end": 439.24,
			        "start": 438.68,
			        "word": " operates",
			      },
			      {
			        "end": 439.8,
			        "start": 439.24,
			        "word": " aircraft",
			      },
			      {
			        "end": 440.37,
			        "start": 439.8,
			        "word": " carriers",
			      },
			      {
			        "end": 440.38,
			        "start": 440.37,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 441.19,
			    "start": 440.38,
			    "text": " Otis,",
			    "words": [
			      {
			        "end": 440.7,
			        "start": 440.38,
			        "word": " Ot",
			      },
			      {
			        "end": 441.12,
			        "start": 440.7,
			        "word": "is",
			      },
			      {
			        "end": 441.19,
			        "start": 441.12,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 446.94,
			    "start": 441.19,
			    "text": " everyone has compared the Type 76 with the America class or the Queen Elizabeth class.",
			    "words": [
			      {
			        "end": 441.88,
			        "start": 441.19,
			        "word": " everyone",
			      },
			      {
			        "end": 442.14,
			        "start": 441.88,
			        "word": " has",
			      },
			      {
			        "end": 442.83,
			        "start": 442.14,
			        "word": " compared",
			      },
			      {
			        "end": 443.15,
			        "start": 442.83,
			        "word": " the",
			      },
			      {
			        "end": 443.43,
			        "start": 443.15,
			        "word": " Type",
			      },
			      {
			        "end": 444.18,
			        "start": 443.43,
			        "word": " 76",
			      },
			      {
			        "end": 444.24,
			        "start": 444.18,
			        "word": " with",
			      },
			      {
			        "end": 444.44,
			        "start": 444.24,
			        "word": " the",
			      },
			      {
			        "end": 444.93,
			        "start": 444.44,
			        "word": " America",
			      },
			      {
			        "end": 445.24,
			        "start": 444.93,
			        "word": " class",
			      },
			      {
			        "end": 445.36,
			        "start": 445.24,
			        "word": " or",
			      },
			      {
			        "end": 445.55,
			        "start": 445.36,
			        "word": " the",
			      },
			      {
			        "end": 445.89,
			        "start": 445.55,
			        "word": " Queen",
			      },
			      {
			        "end": 446.49,
			        "start": 445.89,
			        "word": " Elizabeth",
			      },
			      {
			        "end": 446.85,
			        "start": 446.49,
			        "word": " class",
			      },
			      {
			        "end": 446.94,
			        "start": 446.85,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 448.86,
			    "start": 446.94,
			    "text": " Here they get the Trieste, ok?",
			    "words": [
			      {
			        "end": 447.21,
			        "start": 446.94,
			        "word": " Here",
			      },
			      {
			        "end": 447.48,
			        "start": 447.21,
			        "word": " they",
			      },
			      {
			        "end": 447.68,
			        "start": 447.48,
			        "word": " get",
			      },
			      {
			        "end": 447.88,
			        "start": 447.68,
			        "word": " the",
			      },
			      {
			        "end": 448.11,
			        "start": 447.88,
			        "word": " Tri",
			      },
			      {
			        "end": 448.4,
			        "start": 448.11,
			        "word": "este",
			      },
			      {
			        "end": 448.48,
			        "start": 448.4,
			        "word": ",",
			      },
			      {
			        "end": 448.61,
			        "start": 448.48,
			        "word": " ok",
			      },
			      {
			        "end": 448.86,
			        "start": 448.61,
			        "word": "?",
			      },
			    ],
			  },
			  {
			    "end": 449.82,
			    "start": 448.86,
			    "text": " Going back to business,",
			    "words": [
			      {
			        "end": 449.08,
			        "start": 448.86,
			        "word": " Going",
			      },
			      {
			        "end": 449.26,
			        "start": 449.08,
			        "word": " back",
			      },
			      {
			        "end": 449.45,
			        "start": 449.26,
			        "word": " to",
			      },
			      {
			        "end": 449.7,
			        "start": 449.45,
			        "word": " business",
			      },
			      {
			        "end": 449.82,
			        "start": 449.7,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 452.94,
			    "start": 449.82,
			    "text": " this ship features quite abundant point defenses,",
			    "words": [
			      {
			        "end": 450.11,
			        "start": 449.82,
			        "word": " this",
			      },
			      {
			        "end": 450.52,
			        "start": 450.11,
			        "word": " ship",
			      },
			      {
			        "end": 450.99,
			        "start": 450.52,
			        "word": " features",
			      },
			      {
			        "end": 451.36,
			        "start": 450.99,
			        "word": " quite",
			      },
			      {
			        "end": 451.95,
			        "start": 451.36,
			        "word": " abundant",
			      },
			      {
			        "end": 452.36,
			        "start": 451.95,
			        "word": " point",
			      },
			      {
			        "end": 452.81,
			        "start": 452.36,
			        "word": " defenses",
			      },
			      {
			        "end": 452.94,
			        "start": 452.81,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 457.9,
			    "start": 452.94,
			    "text": " three Type 1130 seaweeds and three launchers for HHQ-10 missiles.",
			    "words": [
			      {
			        "end": 453.34,
			        "start": 452.94,
			        "word": " three",
			      },
			      {
			        "end": 453.61,
			        "start": 453.34,
			        "word": " Type",
			      },
			      {
			        "end": 454,
			        "start": 453.61,
			        "word": " 11",
			      },
			      {
			        "end": 454.4,
			        "start": 454,
			        "word": "30",
			      },
			      {
			        "end": 454.5,
			        "start": 454.4,
			        "word": " sea",
			      },
			      {
			        "end": 454.63,
			        "start": 454.5,
			        "word": "we",
			      },
			      {
			        "end": 455,
			        "start": 454.63,
			        "word": "eds",
			      },
			      {
			        "end": 455.1,
			        "start": 455,
			        "word": " and",
			      },
			      {
			        "end": 455.5,
			        "start": 455.1,
			        "word": " three",
			      },
			      {
			        "end": 455.98,
			        "start": 455.5,
			        "word": " launch",
			      },
			      {
			        "end": 456.21,
			        "start": 455.98,
			        "word": "ers",
			      },
			      {
			        "end": 456.45,
			        "start": 456.21,
			        "word": " for",
			      },
			      {
			        "end": 456.53,
			        "start": 456.45,
			        "word": " H",
			      },
			      {
			        "end": 456.6,
			        "start": 456.53,
			        "word": "H",
			      },
			      {
			        "end": 456.68,
			        "start": 456.6,
			        "word": "Q",
			      },
			      {
			        "end": 456.75,
			        "start": 456.68,
			        "word": "-",
			      },
			      {
			        "end": 457.21,
			        "start": 456.75,
			        "word": "10",
			      },
			      {
			        "end": 457.9,
			        "start": 457.21,
			        "word": " missiles",
			      },
			      {
			        "end": 457.9,
			        "start": 457.9,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 460.14,
			    "start": 457.9,
			    "text": " Each featuring 24 missiles.",
			    "words": [
			      {
			        "end": 458,
			        "start": 457.9,
			        "word": "",
			      },
			      {
			        "end": 458.19,
			        "start": 458,
			        "word": " Each",
			      },
			      {
			        "end": 458.86,
			        "start": 458.19,
			        "word": " featuring",
			      },
			      {
			        "end": 459.33,
			        "start": 458.86,
			        "word": " 24",
			      },
			      {
			        "end": 459.89,
			        "start": 459.33,
			        "word": " missiles",
			      },
			      {
			        "end": 460.14,
			        "start": 459.89,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 463.36,
			    "start": 460.14,
			    "text": " There are the usual big Chinese dispensers for decoys,",
			    "words": [
			      {
			        "end": 460.48,
			        "start": 460.14,
			        "word": " There",
			      },
			      {
			        "end": 460.68,
			        "start": 460.48,
			        "word": " are",
			      },
			      {
			        "end": 460.88,
			        "start": 460.68,
			        "word": " the",
			      },
			      {
			        "end": 461.22,
			        "start": 460.88,
			        "word": " usual",
			      },
			      {
			        "end": 461.42,
			        "start": 461.22,
			        "word": " big",
			      },
			      {
			        "end": 461.9,
			        "start": 461.42,
			        "word": " Chinese",
			      },
			      {
			        "end": 462.17,
			        "start": 461.9,
			        "word": " disp",
			      },
			      {
			        "end": 462.37,
			        "start": 462.17,
			        "word": "ens",
			      },
			      {
			        "end": 462.57,
			        "start": 462.37,
			        "word": "ers",
			      },
			      {
			        "end": 462.77,
			        "start": 462.57,
			        "word": " for",
			      },
			      {
			        "end": 462.97,
			        "start": 462.77,
			        "word": " dec",
			      },
			      {
			        "end": 463.26,
			        "start": 462.97,
			        "word": "oys",
			      },
			      {
			        "end": 463.36,
			        "start": 463.26,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 464.78,
			    "start": 463.36,
			    "text": " that can launch shaft flares,",
			    "words": [
			      {
			        "end": 463.61,
			        "start": 463.36,
			        "word": " that",
			      },
			      {
			        "end": 463.77,
			        "start": 463.61,
			        "word": " can",
			      },
			      {
			        "end": 464.15,
			        "start": 463.77,
			        "word": " launch",
			      },
			      {
			        "end": 464.38,
			        "start": 464.15,
			        "word": " shaft",
			      },
			      {
			        "end": 464.42,
			        "start": 464.38,
			        "word": " f",
			      },
			      {
			        "end": 464.67,
			        "start": 464.42,
			        "word": "lares",
			      },
			      {
			        "end": 464.78,
			        "start": 464.67,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 466.54,
			    "start": 464.78,
			    "text": " but also active decoys.",
			    "words": [
			      {
			        "end": 465.01,
			        "start": 464.78,
			        "word": " but",
			      },
			      {
			        "end": 465.34,
			        "start": 465.01,
			        "word": " also",
			      },
			      {
			        "end": 465.74,
			        "start": 465.34,
			        "word": " active",
			      },
			      {
			        "end": 466,
			        "start": 465.74,
			        "word": " dec",
			      },
			      {
			        "end": 466.26,
			        "start": 466,
			        "word": "oys",
			      },
			      {
			        "end": 466.54,
			        "start": 466.26,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 468.54,
			    "start": 466.54,
			    "text": " Obviously, these are all point defenses,",
			    "words": [
			      {
			        "end": 467.02,
			        "start": 466.54,
			        "word": " Obviously",
			      },
			      {
			        "end": 467.12,
			        "start": 467.02,
			        "word": ",",
			      },
			      {
			        "end": 467.39,
			        "start": 467.12,
			        "word": " these",
			      },
			      {
			        "end": 467.55,
			        "start": 467.39,
			        "word": " are",
			      },
			      {
			        "end": 467.7,
			        "start": 467.55,
			        "word": " all",
			      },
			      {
			        "end": 467.98,
			        "start": 467.7,
			        "word": " point",
			      },
			      {
			        "end": 468.42,
			        "start": 467.98,
			        "word": " defenses",
			      },
			      {
			        "end": 468.54,
			        "start": 468.42,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 472.22,
			    "start": 468.54,
			    "text": " and a ship like this needs escorts to operate safely.",
			    "words": [
			      {
			        "end": 468.78,
			        "start": 468.54,
			        "word": " and",
			      },
			      {
			        "end": 468.86,
			        "start": 468.78,
			        "word": " a",
			      },
			      {
			        "end": 469.18,
			        "start": 468.86,
			        "word": " ship",
			      },
			      {
			        "end": 469.5,
			        "start": 469.18,
			        "word": " like",
			      },
			      {
			        "end": 469.82,
			        "start": 469.5,
			        "word": " this",
			      },
			      {
			        "end": 470.26,
			        "start": 469.82,
			        "word": " needs",
			      },
			      {
			        "end": 470.45,
			        "start": 470.26,
			        "word": " esc",
			      },
			      {
			        "end": 470.76,
			        "start": 470.45,
			        "word": "orts",
			      },
			      {
			        "end": 470.92,
			        "start": 470.76,
			        "word": " to",
			      },
			      {
			        "end": 471.53,
			        "start": 470.92,
			        "word": " operate",
			      },
			      {
			        "end": 471.94,
			        "start": 471.53,
			        "word": " safely",
			      },
			      {
			        "end": 472.22,
			        "start": 471.94,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 474.02,
			    "start": 472.22,
			    "text": " In terms of sensors,",
			    "words": [
			      {
			        "end": 472.41,
			        "start": 472.22,
			        "word": " In",
			      },
			      {
			        "end": 472.89,
			        "start": 472.41,
			        "word": " terms",
			      },
			      {
			        "end": 473.08,
			        "start": 472.89,
			        "word": " of",
			      },
			      {
			        "end": 473.75,
			        "start": 473.08,
			        "word": " sensors",
			      },
			      {
			        "end": 474.02,
			        "start": 473.75,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 478.7,
			    "start": 474.02,
			    "text": " this ship seems to have a rotating AESA radar on top of the forward island,",
			    "words": [
			      {
			        "end": 474.23,
			        "start": 474.02,
			        "word": " this",
			      },
			      {
			        "end": 474.48,
			        "start": 474.23,
			        "word": " ship",
			      },
			      {
			        "end": 474.79,
			        "start": 474.48,
			        "word": " seems",
			      },
			      {
			        "end": 474.96,
			        "start": 474.79,
			        "word": " to",
			      },
			      {
			        "end": 475.18,
			        "start": 474.96,
			        "word": " have",
			      },
			      {
			        "end": 475.26,
			        "start": 475.18,
			        "word": " a",
			      },
			      {
			        "end": 475.93,
			        "start": 475.26,
			        "word": " rotating",
			      },
			      {
			        "end": 476.01,
			        "start": 475.93,
			        "word": " A",
			      },
			      {
			        "end": 476.17,
			        "start": 476.01,
			        "word": "ES",
			      },
			      {
			        "end": 476.25,
			        "start": 476.17,
			        "word": "A",
			      },
			      {
			        "end": 476.7,
			        "start": 476.25,
			        "word": " radar",
			      },
			      {
			        "end": 477.02,
			        "start": 476.7,
			        "word": " on",
			      },
			      {
			        "end": 477.66,
			        "start": 477.02,
			        "word": " top",
			      },
			      {
			        "end": 477.68,
			        "start": 477.66,
			        "word": " of",
			      },
			      {
			        "end": 477.82,
			        "start": 477.68,
			        "word": " the",
			      },
			      {
			        "end": 478.22,
			        "start": 477.82,
			        "word": " forward",
			      },
			      {
			        "end": 478.7,
			        "start": 478.22,
			        "word": " island",
			      },
			      {
			        "end": 478.7,
			        "start": 478.7,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 482.22,
			    "start": 478.7,
			    "text": " and the usual Chinese multifunction mast on the rear island.",
			    "words": [
			      {
			        "end": 478.9,
			        "start": 478.7,
			        "word": " and",
			      },
			      {
			        "end": 479.08,
			        "start": 478.9,
			        "word": " the",
			      },
			      {
			        "end": 479.41,
			        "start": 479.08,
			        "word": " usual",
			      },
			      {
			        "end": 479.87,
			        "start": 479.41,
			        "word": " Chinese",
			      },
			      {
			        "end": 480.26,
			        "start": 479.87,
			        "word": " multif",
			      },
			      {
			        "end": 480.72,
			        "start": 480.26,
			        "word": "unction",
			      },
			      {
			        "end": 481.01,
			        "start": 480.72,
			        "word": " mast",
			      },
			      {
			        "end": 481.2,
			        "start": 481.01,
			        "word": " on",
			      },
			      {
			        "end": 481.3,
			        "start": 481.2,
			        "word": " the",
			      },
			      {
			        "end": 481.56,
			        "start": 481.3,
			        "word": " rear",
			      },
			      {
			        "end": 481.95,
			        "start": 481.56,
			        "word": " island",
			      },
			      {
			        "end": 482.22,
			        "start": 481.95,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 484.18,
			    "start": 482.22,
			    "text": " The ship features a well deck,",
			    "words": [
			      {
			        "end": 482.48,
			        "start": 482.22,
			        "word": " The",
			      },
			      {
			        "end": 482.69,
			        "start": 482.48,
			        "word": " ship",
			      },
			      {
			        "end": 483.23,
			        "start": 482.69,
			        "word": " features",
			      },
			      {
			        "end": 483.29,
			        "start": 483.23,
			        "word": " a",
			      },
			      {
			        "end": 483.55,
			        "start": 483.29,
			        "word": " well",
			      },
			      {
			        "end": 483.81,
			        "start": 483.55,
			        "word": " deck",
			      },
			      {
			        "end": 484.18,
			        "start": 483.81,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 484.78,
			    "start": 484.18,
			    "text": " whose length,",
			    "words": [
			      {
			        "end": 484.28,
			        "start": 484.18,
			        "word": " whose",
			      },
			      {
			        "end": 484.64,
			        "start": 484.28,
			        "word": " length",
			      },
			      {
			        "end": 484.78,
			        "start": 484.64,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 487.02,
			    "start": 484.78,
			    "text": " estimated from the construction photos,",
			    "words": [
			      {
			        "end": 485.33,
			        "start": 484.78,
			        "word": " estimated",
			      },
			      {
			        "end": 485.57,
			        "start": 485.33,
			        "word": " from",
			      },
			      {
			        "end": 485.75,
			        "start": 485.57,
			        "word": " the",
			      },
			      {
			        "end": 486.57,
			        "start": 485.75,
			        "word": " construction",
			      },
			      {
			        "end": 486.86,
			        "start": 486.57,
			        "word": " photos",
			      },
			      {
			        "end": 487.02,
			        "start": 486.86,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 489.26,
			    "start": 487.02,
			    "text": " is about 90 meters,",
			    "words": [
			      {
			        "end": 487.19,
			        "start": 487.02,
			        "word": "",
			      },
			      {
			        "end": 487.23,
			        "start": 487.19,
			        "word": " is",
			      },
			      {
			        "end": 487.76,
			        "start": 487.23,
			        "word": " about",
			      },
			      {
			        "end": 488.39,
			        "start": 487.76,
			        "word": " 90",
			      },
			      {
			        "end": 489.05,
			        "start": 488.39,
			        "word": " meters",
			      },
			      {
			        "end": 489.26,
			        "start": 489.05,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 492.14,
			    "start": 489.26,
			    "text": " similar to that of the previous Type 75.",
			    "words": [
			      {
			        "end": 489.77,
			        "start": 489.26,
			        "word": " similar",
			      },
			      {
			        "end": 489.91,
			        "start": 489.77,
			        "word": " to",
			      },
			      {
			        "end": 490.2,
			        "start": 489.91,
			        "word": " that",
			      },
			      {
			        "end": 490.34,
			        "start": 490.2,
			        "word": " of",
			      },
			      {
			        "end": 490.56,
			        "start": 490.34,
			        "word": " the",
			      },
			      {
			        "end": 491.14,
			        "start": 490.56,
			        "word": " previous",
			      },
			      {
			        "end": 491.43,
			        "start": 491.14,
			        "word": " Type",
			      },
			      {
			        "end": 491.88,
			        "start": 491.43,
			        "word": " 75",
			      },
			      {
			        "end": 492.14,
			        "start": 491.88,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 496.54,
			    "start": 492.14,
			    "text": " Various sources estimate the ground component force at about 1,000",
			    "words": [
			      {
			        "end": 492.34,
			        "start": 492.14,
			        "word": "",
			      },
			      {
			        "end": 492.38,
			        "start": 492.34,
			        "word": " Var",
			      },
			      {
			        "end": 492.61,
			        "start": 492.38,
			        "word": "ious",
			      },
			      {
			        "end": 493.08,
			        "start": 492.61,
			        "word": " sources",
			      },
			      {
			        "end": 493.62,
			        "start": 493.08,
			        "word": " estimate",
			      },
			      {
			        "end": 493.82,
			        "start": 493.62,
			        "word": " the",
			      },
			      {
			        "end": 494.22,
			        "start": 493.82,
			        "word": " ground",
			      },
			      {
			        "end": 494.82,
			        "start": 494.22,
			        "word": " component",
			      },
			      {
			        "end": 495.15,
			        "start": 494.82,
			        "word": " force",
			      },
			      {
			        "end": 495.28,
			        "start": 495.15,
			        "word": " at",
			      },
			      {
			        "end": 495.61,
			        "start": 495.28,
			        "word": " about",
			      },
			      {
			        "end": 496.54,
			        "start": 495.61,
			        "word": " 1,000",
			      },
			    ],
			  },
			  {
			    "end": 498.14,
			    "start": 496.54,
			    "text": " men, but I'm not so sure,",
			    "words": [
			      {
			        "end": 496.74,
			        "start": 496.54,
			        "word": " men",
			      },
			      {
			        "end": 496.94,
			        "start": 496.74,
			        "word": ",",
			      },
			      {
			        "end": 497.17,
			        "start": 496.94,
			        "word": " but",
			      },
			      {
			        "end": 497.18,
			        "start": 497.17,
			        "word": " I",
			      },
			      {
			        "end": 497.3,
			        "start": 497.18,
			        "word": "'m",
			      },
			      {
			        "end": 497.5,
			        "start": 497.3,
			        "word": " not",
			      },
			      {
			        "end": 497.82,
			        "start": 497.5,
			        "word": " so",
			      },
			      {
			        "end": 498.14,
			        "start": 497.82,
			        "word": " sure",
			      },
			      {
			        "end": 498.14,
			        "start": 498.14,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 499.28,
			    "start": 498.14,
			    "text": " and the reason why,",
			    "words": [
			      {
			        "end": 498.34,
			        "start": 498.14,
			        "word": " and",
			      },
			      {
			        "end": 498.95,
			        "start": 498.34,
			        "word": " the",
			      },
			      {
			        "end": 499.02,
			        "start": 498.95,
			        "word": " reason",
			      },
			      {
			        "end": 499.15,
			        "start": 499.02,
			        "word": " why",
			      },
			      {
			        "end": 499.28,
			        "start": 499.15,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 500.78,
			    "start": 499.28,
			    "text": " I will explain in a bit.",
			    "words": [
			      {
			        "end": 499.34,
			        "start": 499.28,
			        "word": " I",
			      },
			      {
			        "end": 499.61,
			        "start": 499.34,
			        "word": " will",
			      },
			      {
			        "end": 500.13,
			        "start": 499.61,
			        "word": " explain",
			      },
			      {
			        "end": 500.22,
			        "start": 500.13,
			        "word": " in",
			      },
			      {
			        "end": 500.28,
			        "start": 500.22,
			        "word": " a",
			      },
			      {
			        "end": 500.47,
			        "start": 500.28,
			        "word": " bit",
			      },
			      {
			        "end": 500.78,
			        "start": 500.47,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 505.34,
			    "start": 500.78,
			    "text": " In fact, before, we need to address the elephant in the room.",
			    "words": [
			      {
			        "end": 501.16,
			        "start": 500.78,
			        "word": " In",
			      },
			      {
			        "end": 501.56,
			        "start": 501.16,
			        "word": " fact",
			      },
			      {
			        "end": 501.9,
			        "start": 501.56,
			        "word": ",",
			      },
			      {
			        "end": 502.78,
			        "start": 501.9,
			        "word": " before",
			      },
			      {
			        "end": 502.8,
			        "start": 502.78,
			        "word": ",",
			      },
			      {
			        "end": 502.96,
			        "start": 502.8,
			        "word": " we",
			      },
			      {
			        "end": 503.36,
			        "start": 502.96,
			        "word": " need",
			      },
			      {
			        "end": 503.5,
			        "start": 503.36,
			        "word": " to",
			      },
			      {
			        "end": 504.27,
			        "start": 503.5,
			        "word": " address",
			      },
			      {
			        "end": 504.32,
			        "start": 504.27,
			        "word": " the",
			      },
			      {
			        "end": 504.8,
			        "start": 504.32,
			        "word": " elephant",
			      },
			      {
			        "end": 504.95,
			        "start": 504.8,
			        "word": " in",
			      },
			      {
			        "end": 505.09,
			        "start": 504.95,
			        "word": " the",
			      },
			      {
			        "end": 505.34,
			        "start": 505.09,
			        "word": " room",
			      },
			      {
			        "end": 505.34,
			        "start": 505.34,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 505.63,
			    "start": 505.34,
			    "text": " So,",
			    "words": [
			      {
			        "end": 505.34,
			        "start": 505.34,
			        "word": "",
			      },
			      {
			        "end": 505.47,
			        "start": 505.34,
			        "word": " So",
			      },
			      {
			        "end": 505.63,
			        "start": 505.47,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 526.2,
			    "start": 505.63,
			    "text": " the electromagnetic catapult: at the moment it is covered by a makeshift protection like it was on the Fujian when it was launched,",
			    "words": [
			      {
			        "end": 505.83,
			        "start": 505.63,
			        "word": " the",
			      },
			      {
			        "end": 506.91,
			        "start": 505.83,
			        "word": " electromagnetic",
			      },
			      {
			        "end": 507.12,
			        "start": 506.91,
			        "word": " cat",
			      },
			      {
			        "end": 507.26,
			        "start": 507.12,
			        "word": "ap",
			      },
			      {
			        "end": 507.47,
			        "start": 507.26,
			        "word": "ult",
			      },
			      {
			        "end": 507.58,
			        "start": 507.47,
			        "word": ":",
			      },
			      {
			        "end": 508.85,
			        "start": 507.58,
			        "word": " at",
			      },
			      {
			        "end": 510.83,
			        "start": 508.85,
			        "word": " the",
			      },
			      {
			        "end": 514.57,
			        "start": 510.83,
			        "word": " moment",
			      },
			      {
			        "end": 515.86,
			        "start": 514.57,
			        "word": " it",
			      },
			      {
			        "end": 517.11,
			        "start": 515.86,
			        "word": " is",
			      },
			      {
			        "end": 521.58,
			        "start": 517.11,
			        "word": " covered",
			      },
			      {
			        "end": 522.62,
			        "start": 521.58,
			        "word": " by",
			      },
			      {
			        "end": 522.68,
			        "start": 522.62,
			        "word": " a",
			      },
			      {
			        "end": 523,
			        "start": 522.68,
			        "word": " makes",
			      },
			      {
			        "end": 523.07,
			        "start": 523,
			        "word": "h",
			      },
			      {
			        "end": 523.26,
			        "start": 523.07,
			        "word": "ift",
			      },
			      {
			        "end": 523.83,
			        "start": 523.26,
			        "word": " protection",
			      },
			      {
			        "end": 524.06,
			        "start": 523.83,
			        "word": " like",
			      },
			      {
			        "end": 524.15,
			        "start": 524.06,
			        "word": " it",
			      },
			      {
			        "end": 524.38,
			        "start": 524.15,
			        "word": " was",
			      },
			      {
			        "end": 524.46,
			        "start": 524.38,
			        "word": " on",
			      },
			      {
			        "end": 524.46,
			        "start": 524.46,
			        "word": "",
			      },
			      {
			        "end": 524.62,
			        "start": 524.46,
			        "word": " the",
			      },
			      {
			        "end": 524.78,
			        "start": 524.62,
			        "word": " Fuj",
			      },
			      {
			        "end": 524.94,
			        "start": 524.78,
			        "word": "ian",
			      },
			      {
			        "end": 525.15,
			        "start": 524.94,
			        "word": " when",
			      },
			      {
			        "end": 525.25,
			        "start": 525.15,
			        "word": " it",
			      },
			      {
			        "end": 525.41,
			        "start": 525.25,
			        "word": " was",
			      },
			      {
			        "end": 525.84,
			        "start": 525.41,
			        "word": " launched",
			      },
			      {
			        "end": 526.2,
			        "start": 525.84,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 530.14,
			    "start": 526.2,
			    "text": " and it is estimated to be about 107 meters in length.",
			    "words": [
			      {
			        "end": 526.21,
			        "start": 526.2,
			        "word": " and",
			      },
			      {
			        "end": 526.35,
			        "start": 526.21,
			        "word": " it",
			      },
			      {
			        "end": 526.5,
			        "start": 526.35,
			        "word": " is",
			      },
			      {
			        "end": 527.17,
			        "start": 526.5,
			        "word": " estimated",
			      },
			      {
			        "end": 527.32,
			        "start": 527.17,
			        "word": " to",
			      },
			      {
			        "end": 527.47,
			        "start": 527.32,
			        "word": " be",
			      },
			      {
			        "end": 527.84,
			        "start": 527.47,
			        "word": " about",
			      },
			      {
			        "end": 528.28,
			        "start": 527.84,
			        "word": " 10",
			      },
			      {
			        "end": 528.5,
			        "start": 528.28,
			        "word": "7",
			      },
			      {
			        "end": 528.93,
			        "start": 528.5,
			        "word": " meters",
			      },
			      {
			        "end": 529.09,
			        "start": 528.93,
			        "word": " in",
			      },
			      {
			        "end": 529.58,
			        "start": 529.09,
			        "word": " length",
			      },
			      {
			        "end": 530.14,
			        "start": 529.58,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 537.26,
			    "start": 530.14,
			    "text": " The conventional wisdom is that it will be used to launch a naval variant of the GJ-11 Sharp Sword.",
			    "words": [
			      {
			        "end": 530.4,
			        "start": 530.14,
			        "word": " The",
			      },
			      {
			        "end": 531.26,
			        "start": 530.4,
			        "word": " conventional",
			      },
			      {
			        "end": 531.71,
			        "start": 531.26,
			        "word": " wisdom",
			      },
			      {
			        "end": 531.86,
			        "start": 531.71,
			        "word": " is",
			      },
			      {
			        "end": 532.18,
			        "start": 531.86,
			        "word": " that",
			      },
			      {
			        "end": 532.39,
			        "start": 532.18,
			        "word": " it",
			      },
			      {
			        "end": 532.61,
			        "start": 532.39,
			        "word": " will",
			      },
			      {
			        "end": 532.76,
			        "start": 532.61,
			        "word": " be",
			      },
			      {
			        "end": 533.22,
			        "start": 532.76,
			        "word": " used",
			      },
			      {
			        "end": 533.29,
			        "start": 533.22,
			        "word": " to",
			      },
			      {
			        "end": 533.58,
			        "start": 533.29,
			        "word": " launch",
			      },
			      {
			        "end": 533.66,
			        "start": 533.58,
			        "word": " a",
			      },
			      {
			        "end": 534.05,
			        "start": 533.66,
			        "word": " naval",
			      },
			      {
			        "end": 534.62,
			        "start": 534.05,
			        "word": " variant",
			      },
			      {
			        "end": 534.78,
			        "start": 534.62,
			        "word": " of",
			      },
			      {
			        "end": 535.02,
			        "start": 534.78,
			        "word": " the",
			      },
			      {
			        "end": 535.16,
			        "start": 535.02,
			        "word": " G",
			      },
			      {
			        "end": 535.3,
			        "start": 535.16,
			        "word": "J",
			      },
			      {
			        "end": 535.44,
			        "start": 535.3,
			        "word": "-",
			      },
			      {
			        "end": 536.34,
			        "start": 535.44,
			        "word": "11",
			      },
			      {
			        "end": 536.7,
			        "start": 536.34,
			        "word": " Sharp",
			      },
			      {
			        "end": 537.26,
			        "start": 536.7,
			        "word": " Sword",
			      },
			      {
			        "end": 537.26,
			        "start": 537.26,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 541.16,
			    "start": 537.26,
			    "text": " This is a Chinese U-Cav already operational with the Air Force,",
			    "words": [
			      {
			        "end": 537.54,
			        "start": 537.26,
			        "word": " This",
			      },
			      {
			        "end": 537.68,
			        "start": 537.54,
			        "word": " is",
			      },
			      {
			        "end": 537.75,
			        "start": 537.68,
			        "word": " a",
			      },
			      {
			        "end": 538.25,
			        "start": 537.75,
			        "word": " Chinese",
			      },
			      {
			        "end": 538.32,
			        "start": 538.25,
			        "word": " U",
			      },
			      {
			        "end": 538.38,
			        "start": 538.32,
			        "word": "-",
			      },
			      {
			        "end": 538.46,
			        "start": 538.38,
			        "word": "C",
			      },
			      {
			        "end": 538.65,
			        "start": 538.46,
			        "word": "av",
			      },
			      {
			        "end": 539.1,
			        "start": 538.65,
			        "word": " already",
			      },
			      {
			        "end": 539.89,
			        "start": 539.1,
			        "word": " operational",
			      },
			      {
			        "end": 540.17,
			        "start": 539.89,
			        "word": " with",
			      },
			      {
			        "end": 540.38,
			        "start": 540.17,
			        "word": " the",
			      },
			      {
			        "end": 540.7,
			        "start": 540.38,
			        "word": " Air",
			      },
			      {
			        "end": 541.1,
			        "start": 540.7,
			        "word": " Force",
			      },
			      {
			        "end": 541.16,
			        "start": 541.1,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 544.7,
			    "start": 541.16,
			    "text": " which is in the process of being adapted for the use on carriers.",
			    "words": [
			      {
			        "end": 541.31,
			        "start": 541.16,
			        "word": " which",
			      },
			      {
			        "end": 541.39,
			        "start": 541.31,
			        "word": " is",
			      },
			      {
			        "end": 541.5,
			        "start": 541.39,
			        "word": " in",
			      },
			      {
			        "end": 541.85,
			        "start": 541.5,
			        "word": " the",
			      },
			      {
			        "end": 542.14,
			        "start": 541.85,
			        "word": " process",
			      },
			      {
			        "end": 542.3,
			        "start": 542.14,
			        "word": " of",
			      },
			      {
			        "end": 542.54,
			        "start": 542.3,
			        "word": " being",
			      },
			      {
			        "end": 543.18,
			        "start": 542.54,
			        "word": " adapted",
			      },
			      {
			        "end": 543.37,
			        "start": 543.18,
			        "word": " for",
			      },
			      {
			        "end": 543.58,
			        "start": 543.37,
			        "word": " the",
			      },
			      {
			        "end": 543.79,
			        "start": 543.58,
			        "word": " use",
			      },
			      {
			        "end": 543.93,
			        "start": 543.79,
			        "word": " on",
			      },
			      {
			        "end": 544.47,
			        "start": 543.93,
			        "word": " carriers",
			      },
			      {
			        "end": 544.7,
			        "start": 544.47,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 547.82,
			    "start": 544.7,
			    "text": " This is not a loyal wingman in the sense of the US concept,",
			    "words": [
			      {
			        "end": 544.93,
			        "start": 544.7,
			        "word": "",
			      },
			      {
			        "end": 544.96,
			        "start": 544.93,
			        "word": " This",
			      },
			      {
			        "end": 545.08,
			        "start": 544.96,
			        "word": " is",
			      },
			      {
			        "end": 545.27,
			        "start": 545.08,
			        "word": " not",
			      },
			      {
			        "end": 545.38,
			        "start": 545.27,
			        "word": " a",
			      },
			      {
			        "end": 545.65,
			        "start": 545.38,
			        "word": " loyal",
			      },
			      {
			        "end": 545.9,
			        "start": 545.65,
			        "word": " wing",
			      },
			      {
			        "end": 546.09,
			        "start": 545.9,
			        "word": "man",
			      },
			      {
			        "end": 546.22,
			        "start": 546.09,
			        "word": " in",
			      },
			      {
			        "end": 546.41,
			        "start": 546.22,
			        "word": " the",
			      },
			      {
			        "end": 546.73,
			        "start": 546.41,
			        "word": " sense",
			      },
			      {
			        "end": 546.86,
			        "start": 546.73,
			        "word": " of",
			      },
			      {
			        "end": 547.05,
			        "start": 546.86,
			        "word": " the",
			      },
			      {
			        "end": 547.18,
			        "start": 547.05,
			        "word": " US",
			      },
			      {
			        "end": 547.63,
			        "start": 547.18,
			        "word": " concept",
			      },
			      {
			        "end": 547.82,
			        "start": 547.63,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 550.03,
			    "start": 547.82,
			    "text": " it is a stealth drone,",
			    "words": [
			      {
			        "end": 548.05,
			        "start": 547.82,
			        "word": " it",
			      },
			      {
			        "end": 548.39,
			        "start": 548.05,
			        "word": " is",
			      },
			      {
			        "end": 548.54,
			        "start": 548.39,
			        "word": " a",
			      },
			      {
			        "end": 549.21,
			        "start": 548.54,
			        "word": " stealth",
			      },
			      {
			        "end": 549.83,
			        "start": 549.21,
			        "word": " drone",
			      },
			      {
			        "end": 550.03,
			        "start": 549.83,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 551.58,
			    "start": 550.03,
			    "text": " with air-to-ground capability.",
			    "words": [
			      {
			        "end": 550.06,
			        "start": 550.03,
			        "word": " with",
			      },
			      {
			        "end": 550.17,
			        "start": 550.06,
			        "word": " air",
			      },
			      {
			        "end": 550.2,
			        "start": 550.17,
			        "word": "-",
			      },
			      {
			        "end": 550.3,
			        "start": 550.2,
			        "word": "to",
			      },
			      {
			        "end": 550.34,
			        "start": 550.3,
			        "word": "-",
			      },
			      {
			        "end": 550.54,
			        "start": 550.34,
			        "word": "ground",
			      },
			      {
			        "end": 551.32,
			        "start": 550.54,
			        "word": " capability",
			      },
			      {
			        "end": 551.58,
			        "start": 551.32,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 552.11,
			    "start": 551.58,
			    "text": " In fact,",
			    "words": [
			      {
			        "end": 551.76,
			        "start": 551.58,
			        "word": " In",
			      },
			      {
			        "end": 551.95,
			        "start": 551.76,
			        "word": " fact",
			      },
			      {
			        "end": 552.11,
			        "start": 551.95,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 553.74,
			    "start": 552.11,
			    "text": " it features two bomb bays,",
			    "words": [
			      {
			        "end": 552.19,
			        "start": 552.11,
			        "word": " it",
			      },
			      {
			        "end": 552.8,
			        "start": 552.19,
			        "word": " features",
			      },
			      {
			        "end": 552.89,
			        "start": 552.8,
			        "word": " two",
			      },
			      {
			        "end": 553.14,
			        "start": 552.89,
			        "word": " bomb",
			      },
			      {
			        "end": 553.2,
			        "start": 553.14,
			        "word": " b",
			      },
			      {
			        "end": 553.39,
			        "start": 553.2,
			        "word": "ays",
			      },
			      {
			        "end": 553.74,
			        "start": 553.39,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 557.57,
			    "start": 553.74,
			    "text": " whose size could be sufficient for about 1,000",
			    "words": [
			      {
			        "end": 553.93,
			        "start": 553.74,
			        "word": " whose",
			      },
			      {
			        "end": 554.21,
			        "start": 553.93,
			        "word": " size",
			      },
			      {
			        "end": 554.56,
			        "start": 554.21,
			        "word": " could",
			      },
			      {
			        "end": 554.7,
			        "start": 554.56,
			        "word": " be",
			      },
			      {
			        "end": 555.42,
			        "start": 554.7,
			        "word": " sufficient",
			      },
			      {
			        "end": 555.78,
			        "start": 555.42,
			        "word": " for",
			      },
			      {
			        "end": 556.52,
			        "start": 555.78,
			        "word": " about",
			      },
			      {
			        "end": 557.57,
			        "start": 556.52,
			        "word": " 1,000",
			      },
			    ],
			  },
			  {
			    "end": 559.58,
			    "start": 557.57,
			    "text": " kg guided weapons each.",
			    "words": [
			      {
			        "end": 557.69,
			        "start": 557.57,
			        "word": " kg",
			      },
			      {
			        "end": 558.46,
			        "start": 557.69,
			        "word": " guided",
			      },
			      {
			        "end": 558.93,
			        "start": 558.46,
			        "word": " weapons",
			      },
			      {
			        "end": 559.58,
			        "start": 558.93,
			        "word": " each",
			      },
			      {
			        "end": 559.58,
			        "start": 559.58,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 563.26,
			    "start": 559.58,
			    "text": " Albeit it has been seen with small diameter bombs as well.",
			    "words": [
			      {
			        "end": 559.73,
			        "start": 559.58,
			        "word": "",
			      },
			      {
			        "end": 559.76,
			        "start": 559.73,
			        "word": " Al",
			      },
			      {
			        "end": 560.04,
			        "start": 559.76,
			        "word": "beit",
			      },
			      {
			        "end": 560.25,
			        "start": 560.04,
			        "word": " it",
			      },
			      {
			        "end": 560.42,
			        "start": 560.25,
			        "word": " has",
			      },
			      {
			        "end": 560.73,
			        "start": 560.42,
			        "word": " been",
			      },
			      {
			        "end": 561.04,
			        "start": 560.73,
			        "word": " seen",
			      },
			      {
			        "end": 561.36,
			        "start": 561.04,
			        "word": " with",
			      },
			      {
			        "end": 561.74,
			        "start": 561.36,
			        "word": " small",
			      },
			      {
			        "end": 562.36,
			        "start": 561.74,
			        "word": " diameter",
			      },
			      {
			        "end": 562.74,
			        "start": 562.36,
			        "word": " bombs",
			      },
			      {
			        "end": 562.9,
			        "start": 562.74,
			        "word": " as",
			      },
			      {
			        "end": 563.26,
			        "start": 562.9,
			        "word": " well",
			      },
			      {
			        "end": 563.26,
			        "start": 563.26,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 568.96,
			    "start": 563.26,
			    "text": " Most estimates place the maximum takeoff weight at 13 to 15 tons,",
			    "words": [
			      {
			        "end": 563.56,
			        "start": 563.26,
			        "word": " Most",
			      },
			      {
			        "end": 564.2,
			        "start": 563.56,
			        "word": " estimates",
			      },
			      {
			        "end": 564.58,
			        "start": 564.2,
			        "word": " place",
			      },
			      {
			        "end": 564.8,
			        "start": 564.58,
			        "word": " the",
			      },
			      {
			        "end": 565.32,
			        "start": 564.8,
			        "word": " maximum",
			      },
			      {
			        "end": 565.6,
			        "start": 565.32,
			        "word": " take",
			      },
			      {
			        "end": 565.82,
			        "start": 565.6,
			        "word": "off",
			      },
			      {
			        "end": 566.4,
			        "start": 565.82,
			        "word": " weight",
			      },
			      {
			        "end": 566.54,
			        "start": 566.4,
			        "word": " at",
			      },
			      {
			        "end": 567.28,
			        "start": 566.54,
			        "word": " 13",
			      },
			      {
			        "end": 567.52,
			        "start": 567.28,
			        "word": " to",
			      },
			      {
			        "end": 568.26,
			        "start": 567.52,
			        "word": " 15",
			      },
			      {
			        "end": 568.94,
			        "start": 568.26,
			        "word": " tons",
			      },
			      {
			        "end": 568.96,
			        "start": 568.94,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 571.34,
			    "start": 568.96,
			    "text": " with a payload of a couple of tons.",
			    "words": [
			      {
			        "end": 569.36,
			        "start": 568.96,
			        "word": " with",
			      },
			      {
			        "end": 569.37,
			        "start": 569.36,
			        "word": " a",
			      },
			      {
			        "end": 569.94,
			        "start": 569.37,
			        "word": " payload",
			      },
			      {
			        "end": 570.14,
			        "start": 569.94,
			        "word": " of",
			      },
			      {
			        "end": 570.29,
			        "start": 570.14,
			        "word": " a",
			      },
			      {
			        "end": 570.86,
			        "start": 570.29,
			        "word": " couple",
			      },
			      {
			        "end": 570.96,
			        "start": 570.86,
			        "word": " of",
			      },
			      {
			        "end": 571.34,
			        "start": 570.96,
			        "word": " tons",
			      },
			      {
			        "end": 571.34,
			        "start": 571.34,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 574.03,
			    "start": 571.34,
			    "text": " I honestly believe it is lighter than that,",
			    "words": [
			      {
			        "end": 571.46,
			        "start": 571.34,
			        "word": " I",
			      },
			      {
			        "end": 571.95,
			        "start": 571.46,
			        "word": " honestly",
			      },
			      {
			        "end": 572.43,
			        "start": 571.95,
			        "word": " believe",
			      },
			      {
			        "end": 572.63,
			        "start": 572.43,
			        "word": " it",
			      },
			      {
			        "end": 572.69,
			        "start": 572.63,
			        "word": " is",
			      },
			      {
			        "end": 573.23,
			        "start": 572.69,
			        "word": " lighter",
			      },
			      {
			        "end": 573.44,
			        "start": 573.23,
			        "word": " than",
			      },
			      {
			        "end": 573.71,
			        "start": 573.44,
			        "word": " that",
			      },
			      {
			        "end": 574.03,
			        "start": 573.71,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 576.06,
			    "start": 574.03,
			    "text": " but let's stick with it for the moment.",
			    "words": [
			      {
			        "end": 574.09,
			        "start": 574.03,
			        "word": " but",
			      },
			      {
			        "end": 574.4,
			        "start": 574.09,
			        "word": " let",
			      },
			      {
			        "end": 574.44,
			        "start": 574.4,
			        "word": "'s",
			      },
			      {
			        "end": 574.71,
			        "start": 574.44,
			        "word": " stick",
			      },
			      {
			        "end": 574.99,
			        "start": 574.71,
			        "word": " with",
			      },
			      {
			        "end": 575.08,
			        "start": 574.99,
			        "word": " it",
			      },
			      {
			        "end": 575.34,
			        "start": 575.08,
			        "word": " for",
			      },
			      {
			        "end": 575.46,
			        "start": 575.34,
			        "word": " the",
			      },
			      {
			        "end": 575.83,
			        "start": 575.46,
			        "word": " moment",
			      },
			      {
			        "end": 576.06,
			        "start": 575.83,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 577.26,
			    "start": 576.06,
			    "text": " As a comparison,",
			    "words": [
			      {
			        "end": 576.22,
			        "start": 576.06,
			        "word": " As",
			      },
			      {
			        "end": 576.3,
			        "start": 576.22,
			        "word": " a",
			      },
			      {
			        "end": 577.09,
			        "start": 576.3,
			        "word": " comparison",
			      },
			      {
			        "end": 577.26,
			        "start": 577.09,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 583.82,
			    "start": 577.26,
			    "text": " the maximum estimated takeoff weight of a J-15 is around 32 to 33 tons.",
			    "words": [
			      {
			        "end": 577.5,
			        "start": 577.26,
			        "word": " the",
			      },
			      {
			        "end": 578.07,
			        "start": 577.5,
			        "word": " maximum",
			      },
			      {
			        "end": 578.85,
			        "start": 578.07,
			        "word": " estimated",
			      },
			      {
			        "end": 579.12,
			        "start": 578.85,
			        "word": " take",
			      },
			      {
			        "end": 579.36,
			        "start": 579.12,
			        "word": "off",
			      },
			      {
			        "end": 579.85,
			        "start": 579.36,
			        "word": " weight",
			      },
			      {
			        "end": 580.01,
			        "start": 579.85,
			        "word": " of",
			      },
			      {
			        "end": 580.09,
			        "start": 580.01,
			        "word": " a",
			      },
			      {
			        "end": 580.22,
			        "start": 580.09,
			        "word": " J",
			      },
			      {
			        "end": 580.25,
			        "start": 580.22,
			        "word": "-",
			      },
			      {
			        "end": 580.91,
			        "start": 580.25,
			        "word": "15",
			      },
			      {
			        "end": 581.01,
			        "start": 580.91,
			        "word": " is",
			      },
			      {
			        "end": 581.71,
			        "start": 581.01,
			        "word": " around",
			      },
			      {
			        "end": 582.43,
			        "start": 581.71,
			        "word": " 32",
			      },
			      {
			        "end": 582.7,
			        "start": 582.43,
			        "word": " to",
			      },
			      {
			        "end": 583.34,
			        "start": 582.7,
			        "word": " 33",
			      },
			      {
			        "end": 583.82,
			        "start": 583.34,
			        "word": " tons",
			      },
			      {
			        "end": 583.82,
			        "start": 583.82,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 590.62,
			    "start": 583.82,
			    "text": " So the GJ-11 is less than a half the takeoff weight of the current Chinese naval aviation mainstay.",
			    "words": [
			      {
			        "end": 583.95,
			        "start": 583.82,
			        "word": "",
			      },
			      {
			        "end": 583.98,
			        "start": 583.95,
			        "word": " So",
			      },
			      {
			        "end": 584.22,
			        "start": 583.98,
			        "word": " the",
			      },
			      {
			        "end": 584.3,
			        "start": 584.22,
			        "word": " G",
			      },
			      {
			        "end": 584.37,
			        "start": 584.3,
			        "word": "J",
			      },
			      {
			        "end": 584.44,
			        "start": 584.37,
			        "word": "-",
			      },
			      {
			        "end": 584.91,
			        "start": 584.44,
			        "word": "11",
			      },
			      {
			        "end": 585.08,
			        "start": 584.91,
			        "word": " is",
			      },
			      {
			        "end": 585.39,
			        "start": 585.08,
			        "word": " less",
			      },
			      {
			        "end": 585.71,
			        "start": 585.39,
			        "word": " than",
			      },
			      {
			        "end": 585.79,
			        "start": 585.71,
			        "word": " a",
			      },
			      {
			        "end": 586.11,
			        "start": 585.79,
			        "word": " half",
			      },
			      {
			        "end": 586.59,
			        "start": 586.11,
			        "word": " the",
			      },
			      {
			        "end": 586.77,
			        "start": 586.59,
			        "word": " take",
			      },
			      {
			        "end": 586.9,
			        "start": 586.77,
			        "word": "off",
			      },
			      {
			        "end": 587.37,
			        "start": 586.9,
			        "word": " weight",
			      },
			      {
			        "end": 587.69,
			        "start": 587.37,
			        "word": " of",
			      },
			      {
			        "end": 587.77,
			        "start": 587.69,
			        "word": " the",
			      },
			      {
			        "end": 588.32,
			        "start": 587.77,
			        "word": " current",
			      },
			      {
			        "end": 588.87,
			        "start": 588.32,
			        "word": " Chinese",
			      },
			      {
			        "end": 589.26,
			        "start": 588.87,
			        "word": " naval",
			      },
			      {
			        "end": 589.89,
			        "start": 589.26,
			        "word": " aviation",
			      },
			      {
			        "end": 590.21,
			        "start": 589.89,
			        "word": " main",
			      },
			      {
			        "end": 590.36,
			        "start": 590.21,
			        "word": "st",
			      },
			      {
			        "end": 590.62,
			        "start": 590.36,
			        "word": "ay",
			      },
			      {
			        "end": 590.62,
			        "start": 590.62,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 596.3,
			    "start": 590.62,
			    "text": " So why is the catapult more or less of the same length as those on the Fujian?",
			    "words": [
			      {
			        "end": 590.79,
			        "start": 590.62,
			        "word": " So",
			      },
			      {
			        "end": 591.05,
			        "start": 590.79,
			        "word": " why",
			      },
			      {
			        "end": 591.22,
			        "start": 591.05,
			        "word": " is",
			      },
			      {
			        "end": 591.48,
			        "start": 591.22,
			        "word": " the",
			      },
			      {
			        "end": 591.75,
			        "start": 591.48,
			        "word": " cat",
			      },
			      {
			        "end": 591.96,
			        "start": 591.75,
			        "word": "ap",
			      },
			      {
			        "end": 592.16,
			        "start": 591.96,
			        "word": "ult",
			      },
			      {
			        "end": 592.69,
			        "start": 592.16,
			        "word": " more",
			      },
			      {
			        "end": 592.75,
			        "start": 592.69,
			        "word": " or",
			      },
			      {
			        "end": 593.04,
			        "start": 592.75,
			        "word": " less",
			      },
			      {
			        "end": 593.21,
			        "start": 593.04,
			        "word": " of",
			      },
			      {
			        "end": 593.49,
			        "start": 593.21,
			        "word": " the",
			      },
			      {
			        "end": 593.82,
			        "start": 593.49,
			        "word": " same",
			      },
			      {
			        "end": 594.35,
			        "start": 593.82,
			        "word": " length",
			      },
			      {
			        "end": 594.52,
			        "start": 594.35,
			        "word": " as",
			      },
			      {
			        "end": 594.81,
			        "start": 594.52,
			        "word": " those",
			      },
			      {
			        "end": 595.29,
			        "start": 594.81,
			        "word": " on",
			      },
			      {
			        "end": 595.39,
			        "start": 595.29,
			        "word": " the",
			      },
			      {
			        "end": 595.65,
			        "start": 595.39,
			        "word": " Fuj",
			      },
			      {
			        "end": 595.93,
			        "start": 595.65,
			        "word": "ian",
			      },
			      {
			        "end": 596.3,
			        "start": 595.93,
			        "word": "?",
			      },
			    ],
			  },
			  {
			    "end": 607.18,
			    "start": 596.3,
			    "text": " This is not a moot question.",
			    "words": [
			      {
			        "end": 598.04,
			        "start": 596.3,
			        "word": " This",
			      },
			      {
			        "end": 598.91,
			        "start": 598.04,
			        "word": " is",
			      },
			      {
			        "end": 600.21,
			        "start": 598.91,
			        "word": " not",
			      },
			      {
			        "end": 600.64,
			        "start": 600.21,
			        "word": " a",
			      },
			      {
			        "end": 601.51,
			        "start": 600.64,
			        "word": " mo",
			      },
			      {
			        "end": 602.37,
			        "start": 601.51,
			        "word": "ot",
			      },
			      {
			        "end": 605.84,
			        "start": 602.37,
			        "word": " question",
			      },
			      {
			        "end": 607.18,
			        "start": 605.84,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 608.62,
			    "start": 607.18,
			    "text": " Those catapults take up room,",
			    "words": [
			      {
			        "end": 607.45,
			        "start": 607.18,
			        "word": " Those",
			      },
			      {
			        "end": 607.63,
			        "start": 607.45,
			        "word": " cat",
			      },
			      {
			        "end": 607.72,
			        "start": 607.63,
			        "word": "ap",
			      },
			      {
			        "end": 607.94,
			        "start": 607.72,
			        "word": "ults",
			      },
			      {
			        "end": 608.16,
			        "start": 607.94,
			        "word": " take",
			      },
			      {
			        "end": 608.27,
			        "start": 608.16,
			        "word": " up",
			      },
			      {
			        "end": 608.49,
			        "start": 608.27,
			        "word": " room",
			      },
			      {
			        "end": 608.62,
			        "start": 608.49,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 612.22,
			    "start": 608.62,
			    "text": " particularly they use the precious real estate on the flight deck.",
			    "words": [
			      {
			        "end": 609.32,
			        "start": 608.62,
			        "word": " particularly",
			      },
			      {
			        "end": 609.58,
			        "start": 609.32,
			        "word": " they",
			      },
			      {
			        "end": 609.78,
			        "start": 609.58,
			        "word": " use",
			      },
			      {
			        "end": 609.89,
			        "start": 609.78,
			        "word": " the",
			      },
			      {
			        "end": 610.38,
			        "start": 609.89,
			        "word": " precious",
			      },
			      {
			        "end": 610.64,
			        "start": 610.38,
			        "word": " real",
			      },
			      {
			        "end": 611.03,
			        "start": 610.64,
			        "word": " estate",
			      },
			      {
			        "end": 611.16,
			        "start": 611.03,
			        "word": " on",
			      },
			      {
			        "end": 611.35,
			        "start": 611.16,
			        "word": " the",
			      },
			      {
			        "end": 611.74,
			        "start": 611.35,
			        "word": " flight",
			      },
			      {
			        "end": 611.99,
			        "start": 611.74,
			        "word": " deck",
			      },
			      {
			        "end": 612.22,
			        "start": 611.99,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 614.82,
			    "start": 612.22,
			    "text": " A shorter catapult would be welcome,",
			    "words": [
			      {
			        "end": 612.22,
			        "start": 612.22,
			        "word": "",
			      },
			      {
			        "end": 612.4,
			        "start": 612.22,
			        "word": " A",
			      },
			      {
			        "end": 612.82,
			        "start": 612.4,
			        "word": " shorter",
			      },
			      {
			        "end": 613.03,
			        "start": 612.82,
			        "word": " cat",
			      },
			      {
			        "end": 613.18,
			        "start": 613.03,
			        "word": "ap",
			      },
			      {
			        "end": 613.39,
			        "start": 613.18,
			        "word": "ult",
			      },
			      {
			        "end": 613.76,
			        "start": 613.39,
			        "word": " would",
			      },
			      {
			        "end": 613.91,
			        "start": 613.76,
			        "word": " be",
			      },
			      {
			        "end": 614.43,
			        "start": 613.91,
			        "word": " welcome",
			      },
			      {
			        "end": 614.82,
			        "start": 614.43,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 618.94,
			    "start": 614.82,
			    "text": " particularly considering that the ship doesn't have an angled flight deck.",
			    "words": [
			      {
			        "end": 615.41,
			        "start": 614.82,
			        "word": " particularly",
			      },
			      {
			        "end": 616.15,
			        "start": 615.41,
			        "word": " considering",
			      },
			      {
			        "end": 616.32,
			        "start": 616.15,
			        "word": " that",
			      },
			      {
			        "end": 616.46,
			        "start": 616.32,
			        "word": " the",
			      },
			      {
			        "end": 616.91,
			        "start": 616.46,
			        "word": " ship",
			      },
			      {
			        "end": 617.19,
			        "start": 616.91,
			        "word": " doesn",
			      },
			      {
			        "end": 617.37,
			        "start": 617.19,
			        "word": "'t",
			      },
			      {
			        "end": 617.59,
			        "start": 617.37,
			        "word": " have",
			      },
			      {
			        "end": 617.74,
			        "start": 617.59,
			        "word": " an",
			      },
			      {
			        "end": 618.14,
			        "start": 617.74,
			        "word": " angled",
			      },
			      {
			        "end": 618.46,
			        "start": 618.14,
			        "word": " flight",
			      },
			      {
			        "end": 618.72,
			        "start": 618.46,
			        "word": " deck",
			      },
			      {
			        "end": 618.94,
			        "start": 618.72,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 625.45,
			    "start": 618.94,
			    "text": " If it is supposed to launch only drones that weight less than a half of a J-15,",
			    "words": [
			      {
			        "end": 619.13,
			        "start": 618.94,
			        "word": " If",
			      },
			      {
			        "end": 619.31,
			        "start": 619.13,
			        "word": " it",
			      },
			      {
			        "end": 619.42,
			        "start": 619.31,
			        "word": " is",
			      },
			      {
			        "end": 620.04,
			        "start": 619.42,
			        "word": " supposed",
			      },
			      {
			        "end": 620.38,
			        "start": 620.04,
			        "word": " to",
			      },
			      {
			        "end": 620.72,
			        "start": 620.38,
			        "word": " launch",
			      },
			      {
			        "end": 621.05,
			        "start": 620.72,
			        "word": " only",
			      },
			      {
			        "end": 621.65,
			        "start": 621.05,
			        "word": " drones",
			      },
			      {
			        "end": 621.95,
			        "start": 621.65,
			        "word": " that",
			      },
			      {
			        "end": 622.46,
			        "start": 621.95,
			        "word": " weight",
			      },
			      {
			        "end": 622.96,
			        "start": 622.46,
			        "word": " less",
			      },
			      {
			        "end": 623.38,
			        "start": 622.96,
			        "word": " than",
			      },
			      {
			        "end": 623.54,
			        "start": 623.38,
			        "word": " a",
			      },
			      {
			        "end": 623.95,
			        "start": 623.54,
			        "word": " half",
			      },
			      {
			        "end": 624.18,
			        "start": 623.95,
			        "word": " of",
			      },
			      {
			        "end": 624.34,
			        "start": 624.18,
			        "word": " a",
			      },
			      {
			        "end": 624.4,
			        "start": 624.34,
			        "word": " J",
			      },
			      {
			        "end": 624.67,
			        "start": 624.4,
			        "word": "-",
			      },
			      {
			        "end": 625.26,
			        "start": 624.67,
			        "word": "15",
			      },
			      {
			        "end": 625.45,
			        "start": 625.26,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 626.78,
			    "start": 625.45,
			    "text": " it seems a real waste.",
			    "words": [
			      {
			        "end": 625.63,
			        "start": 625.45,
			        "word": " it",
			      },
			      {
			        "end": 625.86,
			        "start": 625.63,
			        "word": " seems",
			      },
			      {
			        "end": 625.92,
			        "start": 625.86,
			        "word": " a",
			      },
			      {
			        "end": 626.19,
			        "start": 625.92,
			        "word": " real",
			      },
			      {
			        "end": 626.49,
			        "start": 626.19,
			        "word": " waste",
			      },
			      {
			        "end": 626.78,
			        "start": 626.49,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 628.3,
			    "start": 626.78,
			    "text": " But there's another problem.",
			    "words": [
			      {
			        "end": 626.95,
			        "start": 626.78,
			        "word": " But",
			      },
			      {
			        "end": 627.22,
			        "start": 626.95,
			        "word": " there",
			      },
			      {
			        "end": 627.33,
			        "start": 627.22,
			        "word": "'s",
			      },
			      {
			        "end": 627.73,
			        "start": 627.33,
			        "word": " another",
			      },
			      {
			        "end": 628.1,
			        "start": 627.73,
			        "word": " problem",
			      },
			      {
			        "end": 628.3,
			        "start": 628.1,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 632.62,
			    "start": 628.3,
			    "text": " The resting cables can't be positioned too close to the aft of the deck,",
			    "words": [
			      {
			        "end": 628.53,
			        "start": 628.3,
			        "word": " The",
			      },
			      {
			        "end": 629.04,
			        "start": 628.53,
			        "word": " resting",
			      },
			      {
			        "end": 629.48,
			        "start": 629.04,
			        "word": " cables",
			      },
			      {
			        "end": 629.7,
			        "start": 629.48,
			        "word": " can",
			      },
			      {
			        "end": 629.84,
			        "start": 629.7,
			        "word": "'t",
			      },
			      {
			        "end": 629.98,
			        "start": 629.84,
			        "word": " be",
			      },
			      {
			        "end": 630.72,
			        "start": 629.98,
			        "word": " positioned",
			      },
			      {
			        "end": 630.94,
			        "start": 630.72,
			        "word": " too",
			      },
			      {
			        "end": 631.31,
			        "start": 630.94,
			        "word": " close",
			      },
			      {
			        "end": 631.45,
			        "start": 631.31,
			        "word": " to",
			      },
			      {
			        "end": 631.67,
			        "start": 631.45,
			        "word": " the",
			      },
			      {
			        "end": 631.75,
			        "start": 631.67,
			        "word": " a",
			      },
			      {
			        "end": 631.88,
			        "start": 631.75,
			        "word": "ft",
			      },
			      {
			        "end": 632.02,
			        "start": 631.88,
			        "word": " of",
			      },
			      {
			        "end": 632.24,
			        "start": 632.02,
			        "word": " the",
			      },
			      {
			        "end": 632.61,
			        "start": 632.24,
			        "word": " deck",
			      },
			      {
			        "end": 632.62,
			        "start": 632.61,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 635.82,
			    "start": 632.62,
			    "text": " because they must account for short landings.",
			    "words": [
			      {
			        "end": 633.16,
			        "start": 632.62,
			        "word": " because",
			      },
			      {
			        "end": 633.47,
			        "start": 633.16,
			        "word": " they",
			      },
			      {
			        "end": 633.78,
			        "start": 633.47,
			        "word": " must",
			      },
			      {
			        "end": 634.47,
			        "start": 633.78,
			        "word": " account",
			      },
			      {
			        "end": 634.55,
			        "start": 634.47,
			        "word": " for",
			      },
			      {
			        "end": 634.95,
			        "start": 634.55,
			        "word": " short",
			      },
			      {
			        "end": 635.25,
			        "start": 634.95,
			        "word": " land",
			      },
			      {
			        "end": 635.56,
			        "start": 635.25,
			        "word": "ings",
			      },
			      {
			        "end": 635.82,
			        "start": 635.56,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 638.54,
			    "start": 635.82,
			    "text": " While I'm recording this, the cables are not installed.",
			    "words": [
			      {
			        "end": 636.09,
			        "start": 635.82,
			        "word": " While",
			      },
			      {
			        "end": 636.14,
			        "start": 636.09,
			        "word": " I",
			      },
			      {
			        "end": 636.24,
			        "start": 636.14,
			        "word": "'m",
			      },
			      {
			        "end": 636.72,
			        "start": 636.24,
			        "word": " recording",
			      },
			      {
			        "end": 637.03,
			        "start": 636.72,
			        "word": " this",
			      },
			      {
			        "end": 637.04,
			        "start": 637.03,
			        "word": ",",
			      },
			      {
			        "end": 637.19,
			        "start": 637.04,
			        "word": " the",
			      },
			      {
			        "end": 637.5,
			        "start": 637.19,
			        "word": " cables",
			      },
			      {
			        "end": 637.67,
			        "start": 637.5,
			        "word": " are",
			      },
			      {
			        "end": 637.83,
			        "start": 637.67,
			        "word": " not",
			      },
			      {
			        "end": 638.47,
			        "start": 637.83,
			        "word": " installed",
			      },
			      {
			        "end": 638.54,
			        "start": 638.47,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 642.86,
			    "start": 638.54,
			    "text": " But their position seems to be quite clearly identifiable.",
			    "words": [
			      {
			        "end": 638.54,
			        "start": 638.54,
			        "word": "",
			      },
			      {
			        "end": 638.8,
			        "start": 638.54,
			        "word": " But",
			      },
			      {
			        "end": 639.28,
			        "start": 638.8,
			        "word": " their",
			      },
			      {
			        "end": 639.94,
			        "start": 639.28,
			        "word": " position",
			      },
			      {
			        "end": 640.5,
			        "start": 639.94,
			        "word": " seems",
			      },
			      {
			        "end": 640.55,
			        "start": 640.5,
			        "word": " to",
			      },
			      {
			        "end": 640.77,
			        "start": 640.55,
			        "word": " be",
			      },
			      {
			        "end": 641.16,
			        "start": 640.77,
			        "word": " quite",
			      },
			      {
			        "end": 641.92,
			        "start": 641.16,
			        "word": " clearly",
			      },
			      {
			        "end": 642.21,
			        "start": 641.92,
			        "word": " ident",
			      },
			      {
			        "end": 642.82,
			        "start": 642.21,
			        "word": "ifiable",
			      },
			      {
			        "end": 642.86,
			        "start": 642.82,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 646.7,
			    "start": 642.86,
			    "text": " And they're definitely not at the extreme aft of the ship.",
			    "words": [
			      {
			        "end": 643.09,
			        "start": 642.86,
			        "word": " And",
			      },
			      {
			        "end": 643.53,
			        "start": 643.09,
			        "word": " they",
			      },
			      {
			        "end": 643.61,
			        "start": 643.53,
			        "word": "'re",
			      },
			      {
			        "end": 644.45,
			        "start": 643.61,
			        "word": " definitely",
			      },
			      {
			        "end": 644.59,
			        "start": 644.45,
			        "word": " not",
			      },
			      {
			        "end": 644.75,
			        "start": 644.59,
			        "word": " at",
			      },
			      {
			        "end": 644.99,
			        "start": 644.75,
			        "word": " the",
			      },
			      {
			        "end": 645.51,
			        "start": 644.99,
			        "word": " extreme",
			      },
			      {
			        "end": 645.68,
			        "start": 645.51,
			        "word": " a",
			      },
			      {
			        "end": 645.73,
			        "start": 645.68,
			        "word": "ft",
			      },
			      {
			        "end": 645.97,
			        "start": 645.73,
			        "word": " of",
			      },
			      {
			        "end": 646.11,
			        "start": 645.97,
			        "word": " the",
			      },
			      {
			        "end": 646.41,
			        "start": 646.11,
			        "word": " ship",
			      },
			      {
			        "end": 646.7,
			        "start": 646.41,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 653.34,
			    "start": 646.7,
			    "text": " This means that a large portion of the deck must be free from obstacles while receiving the aircraft.",
			    "words": [
			      {
			        "end": 647.01,
			        "start": 646.7,
			        "word": " This",
			      },
			      {
			        "end": 647.4,
			        "start": 647.01,
			        "word": " means",
			      },
			      {
			        "end": 647.71,
			        "start": 647.4,
			        "word": " that",
			      },
			      {
			        "end": 647.79,
			        "start": 647.71,
			        "word": " a",
			      },
			      {
			        "end": 648.28,
			        "start": 647.79,
			        "word": " large",
			      },
			      {
			        "end": 648.73,
			        "start": 648.28,
			        "word": " portion",
			      },
			      {
			        "end": 648.89,
			        "start": 648.73,
			        "word": " of",
			      },
			      {
			        "end": 649.13,
			        "start": 648.89,
			        "word": " the",
			      },
			      {
			        "end": 649.5,
			        "start": 649.13,
			        "word": " deck",
			      },
			      {
			        "end": 649.96,
			        "start": 649.5,
			        "word": " must",
			      },
			      {
			        "end": 650.1,
			        "start": 649.96,
			        "word": " be",
			      },
			      {
			        "end": 650.54,
			        "start": 650.1,
			        "word": " free",
			      },
			      {
			        "end": 650.9,
			        "start": 650.54,
			        "word": " from",
			      },
			      {
			        "end": 651.94,
			        "start": 650.9,
			        "word": " obstacles",
			      },
			      {
			        "end": 651.99,
			        "start": 651.94,
			        "word": " while",
			      },
			      {
			        "end": 652.46,
			        "start": 651.99,
			        "word": " receiving",
			      },
			      {
			        "end": 652.67,
			        "start": 652.46,
			        "word": " the",
			      },
			      {
			        "end": 653.34,
			        "start": 652.67,
			        "word": " aircraft",
			      },
			      {
			        "end": 653.34,
			        "start": 653.34,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 654.34,
			    "start": 653.34,
			    "text": " That is,",
			    "words": [
			      {
			        "end": 653.78,
			        "start": 653.34,
			        "word": " That",
			      },
			      {
			        "end": 654,
			        "start": 653.78,
			        "word": " is",
			      },
			      {
			        "end": 654.34,
			        "start": 654,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 659.26,
			    "start": 654.34,
			    "text": " it's difficult to park other staff on the flight deck while the landings are ongoing.",
			    "words": [
			      {
			        "end": 654.39,
			        "start": 654.34,
			        "word": " it",
			      },
			      {
			        "end": 654.56,
			        "start": 654.39,
			        "word": "'s",
			      },
			      {
			        "end": 655.34,
			        "start": 654.56,
			        "word": " difficult",
			      },
			      {
			        "end": 655.52,
			        "start": 655.34,
			        "word": " to",
			      },
			      {
			        "end": 655.86,
			        "start": 655.52,
			        "word": " park",
			      },
			      {
			        "end": 656.29,
			        "start": 655.86,
			        "word": " other",
			      },
			      {
			        "end": 656.71,
			        "start": 656.29,
			        "word": " staff",
			      },
			      {
			        "end": 656.96,
			        "start": 656.71,
			        "word": " on",
			      },
			      {
			        "end": 657.14,
			        "start": 656.96,
			        "word": " the",
			      },
			      {
			        "end": 657.65,
			        "start": 657.14,
			        "word": " flight",
			      },
			      {
			        "end": 658.2,
			        "start": 657.65,
			        "word": " deck",
			      },
			      {
			        "end": 658.26,
			        "start": 658.2,
			        "word": " while",
			      },
			      {
			        "end": 658.38,
			        "start": 658.26,
			        "word": " the",
			      },
			      {
			        "end": 658.54,
			        "start": 658.38,
			        "word": " land",
			      },
			      {
			        "end": 658.7,
			        "start": 658.54,
			        "word": "ings",
			      },
			      {
			        "end": 658.82,
			        "start": 658.7,
			        "word": " are",
			      },
			      {
			        "end": 659.09,
			        "start": 658.82,
			        "word": " ongoing",
			      },
			      {
			        "end": 659.26,
			        "start": 659.09,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 665.34,
			    "start": 659.26,
			    "text": " But you would expect that an automated drone would land more accurately than a human pilot.",
			    "words": [
			      {
			        "end": 659.26,
			        "start": 659.26,
			        "word": "",
			      },
			      {
			        "end": 659.51,
			        "start": 659.26,
			        "word": " But",
			      },
			      {
			        "end": 659.77,
			        "start": 659.51,
			        "word": " you",
			      },
			      {
			        "end": 660.18,
			        "start": 659.77,
			        "word": " would",
			      },
			      {
			        "end": 660.72,
			        "start": 660.18,
			        "word": " expect",
			      },
			      {
			        "end": 661.03,
			        "start": 660.72,
			        "word": " that",
			      },
			      {
			        "end": 661.26,
			        "start": 661.03,
			        "word": " an",
			      },
			      {
			        "end": 661.96,
			        "start": 661.26,
			        "word": " automated",
			      },
			      {
			        "end": 662.38,
			        "start": 661.96,
			        "word": " drone",
			      },
			      {
			        "end": 662.82,
			        "start": 662.38,
			        "word": " would",
			      },
			      {
			        "end": 663.18,
			        "start": 662.82,
			        "word": " land",
			      },
			      {
			        "end": 663.47,
			        "start": 663.18,
			        "word": " more",
			      },
			      {
			        "end": 664.21,
			        "start": 663.47,
			        "word": " accurately",
			      },
			      {
			        "end": 664.51,
			        "start": 664.21,
			        "word": " than",
			      },
			      {
			        "end": 664.57,
			        "start": 664.51,
			        "word": " a",
			      },
			      {
			        "end": 664.94,
			        "start": 664.57,
			        "word": " human",
			      },
			      {
			        "end": 665.34,
			        "start": 664.94,
			        "word": " pilot",
			      },
			      {
			        "end": 665.34,
			        "start": 665.34,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 668.7,
			    "start": 665.34,
			    "text": " So you would not need that much safety margin.",
			    "words": [
			      {
			        "end": 666.17,
			        "start": 665.34,
			        "word": " So",
			      },
			      {
			        "end": 666.21,
			        "start": 666.17,
			        "word": " you",
			      },
			      {
			        "end": 666.59,
			        "start": 666.21,
			        "word": " would",
			      },
			      {
			        "end": 666.82,
			        "start": 666.59,
			        "word": " not",
			      },
			      {
			        "end": 667.13,
			        "start": 666.82,
			        "word": " need",
			      },
			      {
			        "end": 667.44,
			        "start": 667.13,
			        "word": " that",
			      },
			      {
			        "end": 667.75,
			        "start": 667.44,
			        "word": " much",
			      },
			      {
			        "end": 668.25,
			        "start": 667.75,
			        "word": " safety",
			      },
			      {
			        "end": 668.7,
			        "start": 668.25,
			        "word": " margin",
			      },
			      {
			        "end": 668.7,
			        "start": 668.7,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 671.66,
			    "start": 668.7,
			    "text": " Would you?",
			    "words": [
			      {
			        "end": 670.11,
			        "start": 668.7,
			        "word": " Would",
			      },
			      {
			        "end": 670.94,
			        "start": 670.11,
			        "word": " you",
			      },
			      {
			        "end": 671.66,
			        "start": 670.94,
			        "word": "?",
			      },
			    ],
			  },
			  {
			    "end": 672.62,
			    "start": 671.66,
			    "text": " Oh my.",
			    "words": [
			      {
			        "end": 672.1,
			        "start": 671.66,
			        "word": " Oh",
			      },
			      {
			        "end": 672.54,
			        "start": 672.1,
			        "word": " my",
			      },
			      {
			        "end": 672.62,
			        "start": 672.54,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 679.26,
			    "start": 672.62,
			    "text": " Is this an indication that piloted aircraft will fly from the Sichuan?",
			    "words": [
			      {
			        "end": 672.97,
			        "start": 672.62,
			        "word": " Is",
			      },
			      {
			        "end": 673.68,
			        "start": 672.97,
			        "word": " this",
			      },
			      {
			        "end": 674.03,
			        "start": 673.68,
			        "word": " an",
			      },
			      {
			        "end": 675.82,
			        "start": 674.03,
			        "word": " indication",
			      },
			      {
			        "end": 676.2,
			        "start": 675.82,
			        "word": " that",
			      },
			      {
			        "end": 676.69,
			        "start": 676.2,
			        "word": " pilot",
			      },
			      {
			        "end": 676.87,
			        "start": 676.69,
			        "word": "ed",
			      },
			      {
			        "end": 677.67,
			        "start": 676.87,
			        "word": " aircraft",
			      },
			      {
			        "end": 677.92,
			        "start": 677.67,
			        "word": " will",
			      },
			      {
			        "end": 678.12,
			        "start": 677.92,
			        "word": " fly",
			      },
			      {
			        "end": 678.38,
			        "start": 678.12,
			        "word": " from",
			      },
			      {
			        "end": 678.58,
			        "start": 678.38,
			        "word": " the",
			      },
			      {
			        "end": 678.85,
			        "start": 678.58,
			        "word": " Sich",
			      },
			      {
			        "end": 679.03,
			        "start": 678.85,
			        "word": "uan",
			      },
			      {
			        "end": 679.26,
			        "start": 679.03,
			        "word": "?",
			      },
			    ],
			  },
			  {
			    "end": 684.14,
			    "start": 679.26,
			    "text": " Well, some Chinese officials have suggested that this could be the case.",
			    "words": [
			      {
			        "end": 679.74,
			        "start": 679.26,
			        "word": " Well",
			      },
			      {
			        "end": 679.98,
			        "start": 679.74,
			        "word": ",",
			      },
			      {
			        "end": 680.3,
			        "start": 679.98,
			        "word": " some",
			      },
			      {
			        "end": 680.79,
			        "start": 680.3,
			        "word": " Chinese",
			      },
			      {
			        "end": 681.4,
			        "start": 680.79,
			        "word": " officials",
			      },
			      {
			        "end": 681.68,
			        "start": 681.4,
			        "word": " have",
			      },
			      {
			        "end": 682.31,
			        "start": 681.68,
			        "word": " suggested",
			      },
			      {
			        "end": 682.6,
			        "start": 682.31,
			        "word": " that",
			      },
			      {
			        "end": 682.88,
			        "start": 682.6,
			        "word": " this",
			      },
			      {
			        "end": 683.23,
			        "start": 682.88,
			        "word": " could",
			      },
			      {
			        "end": 683.37,
			        "start": 683.23,
			        "word": " be",
			      },
			      {
			        "end": 683.57,
			        "start": 683.37,
			        "word": " the",
			      },
			      {
			        "end": 683.86,
			        "start": 683.57,
			        "word": " case",
			      },
			      {
			        "end": 684.14,
			        "start": 683.86,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 684.99,
			    "start": 684.14,
			    "text": " But honestly,",
			    "words": [
			      {
			        "end": 684.14,
			        "start": 684.14,
			        "word": "",
			      },
			      {
			        "end": 684.4,
			        "start": 684.14,
			        "word": " But",
			      },
			      {
			        "end": 684.85,
			        "start": 684.4,
			        "word": " honestly",
			      },
			      {
			        "end": 684.99,
			        "start": 684.85,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 691.66,
			    "start": 684.99,
			    "text": " it's still hard to believe that this ship could be anything more than an emergency stopover for piloted aircraft.",
			    "words": [
			      {
			        "end": 685.12,
			        "start": 684.99,
			        "word": " it",
			      },
			      {
			        "end": 685.24,
			        "start": 685.12,
			        "word": "'s",
			      },
			      {
			        "end": 685.56,
			        "start": 685.24,
			        "word": " still",
			      },
			      {
			        "end": 685.82,
			        "start": 685.56,
			        "word": " hard",
			      },
			      {
			        "end": 685.95,
			        "start": 685.82,
			        "word": " to",
			      },
			      {
			        "end": 686.4,
			        "start": 685.95,
			        "word": " believe",
			      },
			      {
			        "end": 686.66,
			        "start": 686.4,
			        "word": " that",
			      },
			      {
			        "end": 686.93,
			        "start": 686.66,
			        "word": " this",
			      },
			      {
			        "end": 687.18,
			        "start": 686.93,
			        "word": " ship",
			      },
			      {
			        "end": 687.5,
			        "start": 687.18,
			        "word": " could",
			      },
			      {
			        "end": 687.82,
			        "start": 687.5,
			        "word": " be",
			      },
			      {
			        "end": 688.14,
			        "start": 687.82,
			        "word": " anything",
			      },
			      {
			        "end": 688.38,
			        "start": 688.14,
			        "word": " more",
			      },
			      {
			        "end": 688.62,
			        "start": 688.38,
			        "word": " than",
			      },
			      {
			        "end": 688.78,
			        "start": 688.62,
			        "word": " an",
			      },
			      {
			        "end": 689.32,
			        "start": 688.78,
			        "word": " emergency",
			      },
			      {
			        "end": 689.79,
			        "start": 689.32,
			        "word": " stop",
			      },
			      {
			        "end": 690.45,
			        "start": 689.79,
			        "word": "over",
			      },
			      {
			        "end": 690.47,
			        "start": 690.45,
			        "word": " for",
			      },
			      {
			        "end": 690.79,
			        "start": 690.47,
			        "word": " pilot",
			      },
			      {
			        "end": 690.92,
			        "start": 690.79,
			        "word": "ed",
			      },
			      {
			        "end": 691.44,
			        "start": 690.92,
			        "word": " aircraft",
			      },
			      {
			        "end": 691.66,
			        "start": 691.44,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 695.02,
			    "start": 691.66,
			    "text": " With a single catapult, the sortie rate would be very low.",
			    "words": [
			      {
			        "end": 691.92,
			        "start": 691.66,
			        "word": " With",
			      },
			      {
			        "end": 691.98,
			        "start": 691.92,
			        "word": " a",
			      },
			      {
			        "end": 692.37,
			        "start": 691.98,
			        "word": " single",
			      },
			      {
			        "end": 692.56,
			        "start": 692.37,
			        "word": " cat",
			      },
			      {
			        "end": 692.7,
			        "start": 692.56,
			        "word": "ap",
			      },
			      {
			        "end": 692.88,
			        "start": 692.7,
			        "word": "ult",
			      },
			      {
			        "end": 693.02,
			        "start": 692.88,
			        "word": ",",
			      },
			      {
			        "end": 693.2,
			        "start": 693.02,
			        "word": " the",
			      },
			      {
			        "end": 693.59,
			        "start": 693.2,
			        "word": " sortie",
			      },
			      {
			        "end": 693.85,
			        "start": 693.59,
			        "word": " rate",
			      },
			      {
			        "end": 694.17,
			        "start": 693.85,
			        "word": " would",
			      },
			      {
			        "end": 694.3,
			        "start": 694.17,
			        "word": " be",
			      },
			      {
			        "end": 694.56,
			        "start": 694.3,
			        "word": " very",
			      },
			      {
			        "end": 694.75,
			        "start": 694.56,
			        "word": " low",
			      },
			      {
			        "end": 695.02,
			        "start": 694.75,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 698.3,
			    "start": 695.02,
			    "text": " With a well deck and the accommodations for the land force,",
			    "words": [
			      {
			        "end": 695.28,
			        "start": 695.02,
			        "word": " With",
			      },
			      {
			        "end": 695.34,
			        "start": 695.28,
			        "word": " a",
			      },
			      {
			        "end": 695.6,
			        "start": 695.34,
			        "word": " well",
			      },
			      {
			        "end": 695.86,
			        "start": 695.6,
			        "word": " deck",
			      },
			      {
			        "end": 696.1,
			        "start": 695.86,
			        "word": " and",
			      },
			      {
			        "end": 696.42,
			        "start": 696.1,
			        "word": " the",
			      },
			      {
			        "end": 697.15,
			        "start": 696.42,
			        "word": " accommodations",
			      },
			      {
			        "end": 697.39,
			        "start": 697.15,
			        "word": " for",
			      },
			      {
			        "end": 697.53,
			        "start": 697.39,
			        "word": " the",
			      },
			      {
			        "end": 697.79,
			        "start": 697.53,
			        "word": " land",
			      },
			      {
			        "end": 698.11,
			        "start": 697.79,
			        "word": " force",
			      },
			      {
			        "end": 698.3,
			        "start": 698.11,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 704.38,
			    "start": 698.3,
			    "text": " the internals should not be capable of storing large quantities of aircraft fuel and ordnance.",
			    "words": [
			      {
			        "end": 698.51,
			        "start": 698.3,
			        "word": " the",
			      },
			      {
			        "end": 698.9,
			        "start": 698.51,
			        "word": " intern",
			      },
			      {
			        "end": 699.1,
			        "start": 698.9,
			        "word": "als",
			      },
			      {
			        "end": 699.5,
			        "start": 699.1,
			        "word": " should",
			      },
			      {
			        "end": 699.7,
			        "start": 699.5,
			        "word": " not",
			      },
			      {
			        "end": 699.82,
			        "start": 699.7,
			        "word": " be",
			      },
			      {
			        "end": 700.3,
			        "start": 699.82,
			        "word": " capable",
			      },
			      {
			        "end": 700.43,
			        "start": 700.3,
			        "word": " of",
			      },
			      {
			        "end": 700.94,
			        "start": 700.43,
			        "word": " storing",
			      },
			      {
			        "end": 701.47,
			        "start": 700.94,
			        "word": " large",
			      },
			      {
			        "end": 702.14,
			        "start": 701.47,
			        "word": " quantities",
			      },
			      {
			        "end": 702.29,
			        "start": 702.14,
			        "word": " of",
			      },
			      {
			        "end": 702.93,
			        "start": 702.29,
			        "word": " aircraft",
			      },
			      {
			        "end": 703.24,
			        "start": 702.93,
			        "word": " fuel",
			      },
			      {
			        "end": 703.48,
			        "start": 703.24,
			        "word": " and",
			      },
			      {
			        "end": 703.72,
			        "start": 703.48,
			        "word": " ord",
			      },
			      {
			        "end": 703.79,
			        "start": 703.72,
			        "word": "n",
			      },
			      {
			        "end": 704.09,
			        "start": 703.79,
			        "word": "ance",
			      },
			      {
			        "end": 704.38,
			        "start": 704.09,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 707.98,
			    "start": 704.38,
			    "text": " The GJ-11 would definitely need less of those.",
			    "words": [
			      {
			        "end": 704.62,
			        "start": 704.38,
			        "word": " The",
			      },
			      {
			        "end": 704.7,
			        "start": 704.62,
			        "word": " G",
			      },
			      {
			        "end": 704.77,
			        "start": 704.7,
			        "word": "J",
			      },
			      {
			        "end": 704.84,
			        "start": 704.77,
			        "word": "-",
			      },
			      {
			        "end": 705.31,
			        "start": 704.84,
			        "word": "11",
			      },
			      {
			        "end": 705.77,
			        "start": 705.31,
			        "word": " would",
			      },
			      {
			        "end": 706.5,
			        "start": 705.77,
			        "word": " definitely",
			      },
			      {
			        "end": 706.82,
			        "start": 706.5,
			        "word": " need",
			      },
			      {
			        "end": 707.15,
			        "start": 706.82,
			        "word": " less",
			      },
			      {
			        "end": 707.3,
			        "start": 707.15,
			        "word": " of",
			      },
			      {
			        "end": 707.7,
			        "start": 707.3,
			        "word": " those",
			      },
			      {
			        "end": 707.98,
			        "start": 707.7,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 714.38,
			    "start": 707.98,
			    "text": " Or maybe there is a big store for aircraft and the embark line component is way smaller than we think.",
			    "words": [
			      {
			        "end": 708.11,
			        "start": 707.98,
			        "word": "",
			      },
			      {
			        "end": 708.14,
			        "start": 708.11,
			        "word": " Or",
			      },
			      {
			        "end": 708.53,
			        "start": 708.14,
			        "word": " maybe",
			      },
			      {
			        "end": 708.92,
			        "start": 708.53,
			        "word": " there",
			      },
			      {
			        "end": 709.08,
			        "start": 708.92,
			        "word": " is",
			      },
			      {
			        "end": 709.16,
			        "start": 709.08,
			        "word": " a",
			      },
			      {
			        "end": 709.4,
			        "start": 709.16,
			        "word": " big",
			      },
			      {
			        "end": 709.79,
			        "start": 709.4,
			        "word": " store",
			      },
			      {
			        "end": 710.07,
			        "start": 709.79,
			        "word": " for",
			      },
			      {
			        "end": 710.87,
			        "start": 710.07,
			        "word": " aircraft",
			      },
			      {
			        "end": 710.9,
			        "start": 710.87,
			        "word": " and",
			      },
			      {
			        "end": 711.14,
			        "start": 710.9,
			        "word": " the",
			      },
			      {
			        "end": 711.61,
			        "start": 711.14,
			        "word": " embark",
			      },
			      {
			        "end": 711.93,
			        "start": 711.61,
			        "word": " line",
			      },
			      {
			        "end": 712.64,
			        "start": 711.93,
			        "word": " component",
			      },
			      {
			        "end": 712.93,
			        "start": 712.64,
			        "word": " is",
			      },
			      {
			        "end": 713.05,
			        "start": 712.93,
			        "word": " way",
			      },
			      {
			        "end": 713.5,
			        "start": 713.05,
			        "word": " smaller",
			      },
			      {
			        "end": 713.74,
			        "start": 713.5,
			        "word": " than",
			      },
			      {
			        "end": 714.08,
			        "start": 713.74,
			        "word": " we",
			      },
			      {
			        "end": 714.22,
			        "start": 714.08,
			        "word": " think",
			      },
			      {
			        "end": 714.38,
			        "start": 714.22,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 716.7,
			    "start": 714.38,
			    "text": " But the well deck is pretty large anyway.",
			    "words": [
			      {
			        "end": 714.58,
			        "start": 714.38,
			        "word": " But",
			      },
			      {
			        "end": 714.76,
			        "start": 714.58,
			        "word": " the",
			      },
			      {
			        "end": 715.01,
			        "start": 714.76,
			        "word": " well",
			      },
			      {
			        "end": 715.29,
			        "start": 715.01,
			        "word": " deck",
			      },
			      {
			        "end": 715.38,
			        "start": 715.29,
			        "word": " is",
			      },
			      {
			        "end": 715.76,
			        "start": 715.38,
			        "word": " pretty",
			      },
			      {
			        "end": 716.08,
			        "start": 715.76,
			        "word": " large",
			      },
			      {
			        "end": 716.45,
			        "start": 716.08,
			        "word": " anyway",
			      },
			      {
			        "end": 716.7,
			        "start": 716.45,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 719.1,
			    "start": 716.7,
			    "text": " So, well, we just don't know.",
			    "words": [
			      {
			        "end": 716.95,
			        "start": 716.7,
			        "word": " So",
			      },
			      {
			        "end": 717.2,
			        "start": 716.95,
			        "word": ",",
			      },
			      {
			        "end": 717.71,
			        "start": 717.2,
			        "word": " well",
			      },
			      {
			        "end": 718.1,
			        "start": 717.71,
			        "word": ",",
			      },
			      {
			        "end": 718.13,
			        "start": 718.1,
			        "word": " we",
			      },
			      {
			        "end": 718.34,
			        "start": 718.13,
			        "word": " just",
			      },
			      {
			        "end": 718.52,
			        "start": 718.34,
			        "word": " don",
			      },
			      {
			        "end": 718.64,
			        "start": 718.52,
			        "word": "'t",
			      },
			      {
			        "end": 718.88,
			        "start": 718.64,
			        "word": " know",
			      },
			      {
			        "end": 719.1,
			        "start": 718.88,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 724.38,
			    "start": 719.1,
			    "text": " Moreover, the lack of an angled deck makes the recovery of the aircraft quite dangerous.",
			    "words": [
			      {
			        "end": 719.67,
			        "start": 719.1,
			        "word": " Moreover",
			      },
			      {
			        "end": 719.99,
			        "start": 719.67,
			        "word": ",",
			      },
			      {
			        "end": 720.06,
			        "start": 719.99,
			        "word": " the",
			      },
			      {
			        "end": 720.39,
			        "start": 720.06,
			        "word": " lack",
			      },
			      {
			        "end": 720.53,
			        "start": 720.39,
			        "word": " of",
			      },
			      {
			        "end": 720.69,
			        "start": 720.53,
			        "word": " an",
			      },
			      {
			        "end": 721.16,
			        "start": 720.69,
			        "word": " angled",
			      },
			      {
			        "end": 721.5,
			        "start": 721.16,
			        "word": " deck",
			      },
			      {
			        "end": 721.83,
			        "start": 721.5,
			        "word": " makes",
			      },
			      {
			        "end": 722.03,
			        "start": 721.83,
			        "word": " the",
			      },
			      {
			        "end": 722.56,
			        "start": 722.03,
			        "word": " recovery",
			      },
			      {
			        "end": 722.69,
			        "start": 722.56,
			        "word": " of",
			      },
			      {
			        "end": 722.89,
			        "start": 722.69,
			        "word": " the",
			      },
			      {
			        "end": 723.42,
			        "start": 722.89,
			        "word": " aircraft",
			      },
			      {
			        "end": 723.75,
			        "start": 723.42,
			        "word": " quite",
			      },
			      {
			        "end": 724.38,
			        "start": 723.75,
			        "word": " dangerous",
			      },
			      {
			        "end": 724.38,
			        "start": 724.38,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 727.34,
			    "start": 724.38,
			    "text": " And this is true for drones too, to be honest.",
			    "words": [
			      {
			        "end": 724.6,
			        "start": 724.38,
			        "word": " And",
			      },
			      {
			        "end": 724.89,
			        "start": 724.6,
			        "word": " this",
			      },
			      {
			        "end": 725.03,
			        "start": 724.89,
			        "word": " is",
			      },
			      {
			        "end": 725.32,
			        "start": 725.03,
			        "word": " true",
			      },
			      {
			        "end": 725.54,
			        "start": 725.32,
			        "word": " for",
			      },
			      {
			        "end": 725.98,
			        "start": 725.54,
			        "word": " drones",
			      },
			      {
			        "end": 726.2,
			        "start": 725.98,
			        "word": " too",
			      },
			      {
			        "end": 726.34,
			        "start": 726.2,
			        "word": ",",
			      },
			      {
			        "end": 726.48,
			        "start": 726.34,
			        "word": " to",
			      },
			      {
			        "end": 726.62,
			        "start": 726.48,
			        "word": " be",
			      },
			      {
			        "end": 727.34,
			        "start": 726.62,
			        "word": " honest",
			      },
			      {
			        "end": 727.34,
			        "start": 727.34,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 731.5,
			    "start": 727.34,
			    "text": " They had the technical possibility of designing an angled deck.",
			    "words": [
			      {
			        "end": 727.65,
			        "start": 727.34,
			        "word": " They",
			      },
			      {
			        "end": 727.88,
			        "start": 727.65,
			        "word": " had",
			      },
			      {
			        "end": 728.11,
			        "start": 727.88,
			        "word": " the",
			      },
			      {
			        "end": 728.89,
			        "start": 728.11,
			        "word": " technical",
			      },
			      {
			        "end": 729.66,
			        "start": 728.89,
			        "word": " possibility",
			      },
			      {
			        "end": 729.82,
			        "start": 729.66,
			        "word": " of",
			      },
			      {
			        "end": 730.52,
			        "start": 729.82,
			        "word": " designing",
			      },
			      {
			        "end": 730.67,
			        "start": 730.52,
			        "word": " an",
			      },
			      {
			        "end": 731.14,
			        "start": 730.67,
			        "word": " angled",
			      },
			      {
			        "end": 731.5,
			        "start": 731.14,
			        "word": " deck",
			      },
			      {
			        "end": 731.5,
			        "start": 731.5,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 732,
			    "start": 731.5,
			    "text": " I mean,",
			    "words": [
			      {
			        "end": 731.52,
			        "start": 731.5,
			        "word": "",
			      },
			      {
			        "end": 731.57,
			        "start": 731.52,
			        "word": " I",
			      },
			      {
			        "end": 731.86,
			        "start": 731.57,
			        "word": " mean",
			      },
			      {
			        "end": 732,
			        "start": 731.86,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 736.06,
			    "start": 732,
			    "text": " the French Charles de Gaulle is the same size or even a bit smaller,",
			    "words": [
			      {
			        "end": 732.3,
			        "start": 732,
			        "word": " the",
			      },
			      {
			        "end": 732.66,
			        "start": 732.3,
			        "word": " French",
			      },
			      {
			        "end": 733.18,
			        "start": 732.66,
			        "word": " Charles",
			      },
			      {
			        "end": 733.32,
			        "start": 733.18,
			        "word": " de",
			      },
			      {
			        "end": 733.46,
			        "start": 733.32,
			        "word": " Ga",
			      },
			      {
			        "end": 733.75,
			        "start": 733.46,
			        "word": "ulle",
			      },
			      {
			        "end": 733.9,
			        "start": 733.75,
			        "word": " is",
			      },
			      {
			        "end": 734.11,
			        "start": 733.9,
			        "word": " the",
			      },
			      {
			        "end": 734.4,
			        "start": 734.11,
			        "word": " same",
			      },
			      {
			        "end": 734.69,
			        "start": 734.4,
			        "word": " size",
			      },
			      {
			        "end": 734.83,
			        "start": 734.69,
			        "word": " or",
			      },
			      {
			        "end": 735.12,
			        "start": 734.83,
			        "word": " even",
			      },
			      {
			        "end": 735.19,
			        "start": 735.12,
			        "word": " a",
			      },
			      {
			        "end": 735.42,
			        "start": 735.19,
			        "word": " bit",
			      },
			      {
			        "end": 736.06,
			        "start": 735.42,
			        "word": " smaller",
			      },
			      {
			        "end": 736.06,
			        "start": 736.06,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 739.74,
			    "start": 736.06,
			    "text": " and yet it features an angled deck and two catapults.",
			    "words": [
			      {
			        "end": 736.29,
			        "start": 736.06,
			        "word": " and",
			      },
			      {
			        "end": 736.52,
			        "start": 736.29,
			        "word": " yet",
			      },
			      {
			        "end": 736.82,
			        "start": 736.52,
			        "word": " it",
			      },
			      {
			        "end": 737.27,
			        "start": 736.82,
			        "word": " features",
			      },
			      {
			        "end": 737.43,
			        "start": 737.27,
			        "word": " an",
			      },
			      {
			        "end": 737.89,
			        "start": 737.43,
			        "word": " angled",
			      },
			      {
			        "end": 738.29,
			        "start": 737.89,
			        "word": " deck",
			      },
			      {
			        "end": 738.47,
			        "start": 738.29,
			        "word": " and",
			      },
			      {
			        "end": 738.72,
			        "start": 738.47,
			        "word": " two",
			      },
			      {
			        "end": 739.04,
			        "start": 738.72,
			        "word": " cat",
			      },
			      {
			        "end": 739.13,
			        "start": 739.04,
			        "word": "ap",
			      },
			      {
			        "end": 739.46,
			        "start": 739.13,
			        "word": "ults",
			      },
			      {
			        "end": 739.74,
			        "start": 739.46,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 747.9,
			    "start": 739.74,
			    "text": " Furthermore, the J-15 is a big aircraft and I'm not sure you can park any of them on the flight deck and still recover or launch aircraft.",
			    "words": [
			      {
			        "end": 740.21,
			        "start": 739.74,
			        "word": " Furthermore",
			      },
			      {
			        "end": 740.3,
			        "start": 740.21,
			        "word": ",",
			      },
			      {
			        "end": 740.5,
			        "start": 740.3,
			        "word": " the",
			      },
			      {
			        "end": 740.59,
			        "start": 740.5,
			        "word": " J",
			      },
			      {
			        "end": 740.62,
			        "start": 740.59,
			        "word": "-",
			      },
			      {
			        "end": 741.02,
			        "start": 740.62,
			        "word": "15",
			      },
			      {
			        "end": 741.15,
			        "start": 741.02,
			        "word": " is",
			      },
			      {
			        "end": 741.21,
			        "start": 741.15,
			        "word": " a",
			      },
			      {
			        "end": 741.41,
			        "start": 741.21,
			        "word": " big",
			      },
			      {
			        "end": 741.98,
			        "start": 741.41,
			        "word": " aircraft",
			      },
			      {
			        "end": 742.14,
			        "start": 741.98,
			        "word": " and",
			      },
			      {
			        "end": 742.22,
			        "start": 742.14,
			        "word": " I",
			      },
			      {
			        "end": 742.38,
			        "start": 742.22,
			        "word": "'m",
			      },
			      {
			        "end": 742.69,
			        "start": 742.38,
			        "word": " not",
			      },
			      {
			        "end": 743.1,
			        "start": 742.69,
			        "word": " sure",
			      },
			      {
			        "end": 743.31,
			        "start": 743.1,
			        "word": " you",
			      },
			      {
			        "end": 743.52,
			        "start": 743.31,
			        "word": " can",
			      },
			      {
			        "end": 743.89,
			        "start": 743.52,
			        "word": " park",
			      },
			      {
			        "end": 744.01,
			        "start": 743.89,
			        "word": " any",
			      },
			      {
			        "end": 744.14,
			        "start": 744.01,
			        "word": " of",
			      },
			      {
			        "end": 744.7,
			        "start": 744.14,
			        "word": " them",
			      },
			      {
			        "end": 744.9,
			        "start": 744.7,
			        "word": " on",
			      },
			      {
			        "end": 745.14,
			        "start": 744.9,
			        "word": " the",
			      },
			      {
			        "end": 745.41,
			        "start": 745.14,
			        "word": " flight",
			      },
			      {
			        "end": 745.66,
			        "start": 745.41,
			        "word": " deck",
			      },
			      {
			        "end": 746.07,
			        "start": 745.66,
			        "word": " and",
			      },
			      {
			        "end": 746.18,
			        "start": 746.07,
			        "word": " still",
			      },
			      {
			        "end": 746.64,
			        "start": 746.18,
			        "word": " recover",
			      },
			      {
			        "end": 746.76,
			        "start": 746.64,
			        "word": " or",
			      },
			      {
			        "end": 747.15,
			        "start": 746.76,
			        "word": " launch",
			      },
			      {
			        "end": 747.66,
			        "start": 747.15,
			        "word": " aircraft",
			      },
			      {
			        "end": 747.9,
			        "start": 747.66,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 751.1,
			    "start": 747.9,
			    "text": " The GJ-11 is smaller and it should not be an issue,",
			    "words": [
			      {
			        "end": 748.16,
			        "start": 747.9,
			        "word": " The",
			      },
			      {
			        "end": 748.18,
			        "start": 748.16,
			        "word": " G",
			      },
			      {
			        "end": 748.25,
			        "start": 748.18,
			        "word": "J",
			      },
			      {
			        "end": 748.32,
			        "start": 748.25,
			        "word": "-",
			      },
			      {
			        "end": 748.75,
			        "start": 748.32,
			        "word": "11",
			      },
			      {
			        "end": 748.89,
			        "start": 748.75,
			        "word": " is",
			      },
			      {
			        "end": 749.38,
			        "start": 748.89,
			        "word": " smaller",
			      },
			      {
			        "end": 749.59,
			        "start": 749.38,
			        "word": " and",
			      },
			      {
			        "end": 749.83,
			        "start": 749.59,
			        "word": " it",
			      },
			      {
			        "end": 750.17,
			        "start": 749.83,
			        "word": " should",
			      },
			      {
			        "end": 750.39,
			        "start": 750.17,
			        "word": " not",
			      },
			      {
			        "end": 750.52,
			        "start": 750.39,
			        "word": " be",
			      },
			      {
			        "end": 750.66,
			        "start": 750.52,
			        "word": " an",
			      },
			      {
			        "end": 751.07,
			        "start": 750.66,
			        "word": " issue",
			      },
			      {
			        "end": 751.1,
			        "start": 751.07,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 755.58,
			    "start": 751.1,
			    "text": " but anything bigger seems to tremendously complicate all the operations.",
			    "words": [
			      {
			        "end": 751.3,
			        "start": 751.1,
			        "word": " but",
			      },
			      {
			        "end": 751.84,
			        "start": 751.3,
			        "word": " anything",
			      },
			      {
			        "end": 752.24,
			        "start": 751.84,
			        "word": " bigger",
			      },
			      {
			        "end": 752.58,
			        "start": 752.24,
			        "word": " seems",
			      },
			      {
			        "end": 752.77,
			        "start": 752.58,
			        "word": " to",
			      },
			      {
			        "end": 753.51,
			        "start": 752.77,
			        "word": " tremendously",
			      },
			      {
			        "end": 753.83,
			        "start": 753.51,
			        "word": " compl",
			      },
			      {
			        "end": 754.38,
			        "start": 753.83,
			        "word": "icate",
			      },
			      {
			        "end": 754.43,
			        "start": 754.38,
			        "word": " all",
			      },
			      {
			        "end": 754.64,
			        "start": 754.43,
			        "word": " the",
			      },
			      {
			        "end": 755.26,
			        "start": 754.64,
			        "word": " operations",
			      },
			      {
			        "end": 755.58,
			        "start": 755.26,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 756.55,
			    "start": 755.58,
			    "text": " At the end of the day,",
			    "words": [
			      {
			        "end": 755.69,
			        "start": 755.58,
			        "word": "",
			      },
			      {
			        "end": 755.78,
			        "start": 755.69,
			        "word": " At",
			      },
			      {
			        "end": 755.88,
			        "start": 755.78,
			        "word": " the",
			      },
			      {
			        "end": 756.01,
			        "start": 755.88,
			        "word": " end",
			      },
			      {
			        "end": 756.12,
			        "start": 756.01,
			        "word": " of",
			      },
			      {
			        "end": 756.28,
			        "start": 756.12,
			        "word": " the",
			      },
			      {
			        "end": 756.44,
			        "start": 756.28,
			        "word": " day",
			      },
			      {
			        "end": 756.55,
			        "start": 756.44,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 763.9,
			    "start": 756.55,
			    "text": " considering that a fair number of helicopters will still be required to support land force and for anti submarines operations,",
			    "words": [
			      {
			        "end": 757.16,
			        "start": 756.55,
			        "word": " considering",
			      },
			      {
			        "end": 757.38,
			        "start": 757.16,
			        "word": " that",
			      },
			      {
			        "end": 757.43,
			        "start": 757.38,
			        "word": " a",
			      },
			      {
			        "end": 757.7,
			        "start": 757.43,
			        "word": " fair",
			      },
			      {
			        "end": 758.06,
			        "start": 757.7,
			        "word": " number",
			      },
			      {
			        "end": 758.22,
			        "start": 758.06,
			        "word": " of",
			      },
			      {
			        "end": 759.27,
			        "start": 758.22,
			        "word": " helicopters",
			      },
			      {
			        "end": 759.38,
			        "start": 759.27,
			        "word": " will",
			      },
			      {
			        "end": 759.53,
			        "start": 759.38,
			        "word": " still",
			      },
			      {
			        "end": 759.74,
			        "start": 759.53,
			        "word": " be",
			      },
			      {
			        "end": 760.38,
			        "start": 759.74,
			        "word": " required",
			      },
			      {
			        "end": 760.66,
			        "start": 760.38,
			        "word": " to",
			      },
			      {
			        "end": 761.03,
			        "start": 760.66,
			        "word": " support",
			      },
			      {
			        "end": 761.38,
			        "start": 761.03,
			        "word": " land",
			      },
			      {
			        "end": 761.88,
			        "start": 761.38,
			        "word": " force",
			      },
			      {
			        "end": 761.9,
			        "start": 761.88,
			        "word": " and",
			      },
			      {
			        "end": 762.12,
			        "start": 761.9,
			        "word": " for",
			      },
			      {
			        "end": 762.42,
			        "start": 762.12,
			        "word": " anti",
			      },
			      {
			        "end": 763.15,
			        "start": 762.42,
			        "word": " submarines",
			      },
			      {
			        "end": 763.9,
			        "start": 763.15,
			        "word": " operations",
			      },
			      {
			        "end": 763.9,
			        "start": 763.9,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 770.86,
			    "start": 763.9,
			    "text": " I would be surprised if an aircraft carrier this size could operate more 405 J-15.",
			    "words": [
			      {
			        "end": 764.02,
			        "start": 763.9,
			        "word": " I",
			      },
			      {
			        "end": 764.46,
			        "start": 764.02,
			        "word": " would",
			      },
			      {
			        "end": 764.64,
			        "start": 764.46,
			        "word": " be",
			      },
			      {
			        "end": 765.43,
			        "start": 764.64,
			        "word": " surprised",
			      },
			      {
			        "end": 765.73,
			        "start": 765.43,
			        "word": " if",
			      },
			      {
			        "end": 765.83,
			        "start": 765.73,
			        "word": " an",
			      },
			      {
			        "end": 766.46,
			        "start": 765.83,
			        "word": " aircraft",
			      },
			      {
			        "end": 767,
			        "start": 766.46,
			        "word": " carrier",
			      },
			      {
			        "end": 767.32,
			        "start": 767,
			        "word": " this",
			      },
			      {
			        "end": 767.87,
			        "start": 767.32,
			        "word": " size",
			      },
			      {
			        "end": 768.14,
			        "start": 767.87,
			        "word": " could",
			      },
			      {
			        "end": 768.73,
			        "start": 768.14,
			        "word": " operate",
			      },
			      {
			        "end": 769.23,
			        "start": 768.73,
			        "word": " more",
			      },
			      {
			        "end": 769.64,
			        "start": 769.23,
			        "word": " 40",
			      },
			      {
			        "end": 769.88,
			        "start": 769.64,
			        "word": "5",
			      },
			      {
			        "end": 769.96,
			        "start": 769.88,
			        "word": " J",
			      },
			      {
			        "end": 770.04,
			        "start": 769.96,
			        "word": "-",
			      },
			      {
			        "end": 770.56,
			        "start": 770.04,
			        "word": "15",
			      },
			      {
			        "end": 770.86,
			        "start": 770.56,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 773.95,
			    "start": 770.86,
			    "text": " With the J-35 the situation could improve a bit,",
			    "words": [
			      {
			        "end": 771.11,
			        "start": 770.86,
			        "word": " With",
			      },
			      {
			        "end": 771.3,
			        "start": 771.11,
			        "word": " the",
			      },
			      {
			        "end": 771.36,
			        "start": 771.3,
			        "word": " J",
			      },
			      {
			        "end": 771.42,
			        "start": 771.36,
			        "word": "-",
			      },
			      {
			        "end": 771.84,
			        "start": 771.42,
			        "word": "35",
			      },
			      {
			        "end": 771.99,
			        "start": 771.84,
			        "word": " the",
			      },
			      {
			        "end": 772.56,
			        "start": 771.99,
			        "word": " situation",
			      },
			      {
			        "end": 772.88,
			        "start": 772.56,
			        "word": " could",
			      },
			      {
			        "end": 773.32,
			        "start": 772.88,
			        "word": " improve",
			      },
			      {
			        "end": 773.37,
			        "start": 773.32,
			        "word": " a",
			      },
			      {
			        "end": 773.59,
			        "start": 773.37,
			        "word": " bit",
			      },
			      {
			        "end": 773.95,
			        "start": 773.59,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 776.38,
			    "start": 773.95,
			    "text": " but all the other drawbacks still stand.",
			    "words": [
			      {
			        "end": 773.96,
			        "start": 773.95,
			        "word": " but",
			      },
			      {
			        "end": 774.18,
			        "start": 773.96,
			        "word": " all",
			      },
			      {
			        "end": 774.4,
			        "start": 774.18,
			        "word": " the",
			      },
			      {
			        "end": 774.76,
			        "start": 774.4,
			        "word": " other",
			      },
			      {
			        "end": 775.05,
			        "start": 774.76,
			        "word": " draw",
			      },
			      {
			        "end": 775.57,
			        "start": 775.05,
			        "word": "backs",
			      },
			      {
			        "end": 775.77,
			        "start": 775.57,
			        "word": " still",
			      },
			      {
			        "end": 776.13,
			        "start": 775.77,
			        "word": " stand",
			      },
			      {
			        "end": 776.38,
			        "start": 776.13,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 779.82,
			    "start": 776.38,
			    "text": " Would such a small carrier wing still worth the effort?",
			    "words": [
			      {
			        "end": 776.73,
			        "start": 776.38,
			        "word": " Would",
			      },
			      {
			        "end": 777.01,
			        "start": 776.73,
			        "word": " such",
			      },
			      {
			        "end": 777.08,
			        "start": 777.01,
			        "word": " a",
			      },
			      {
			        "end": 777.43,
			        "start": 777.08,
			        "word": " small",
			      },
			      {
			        "end": 777.93,
			        "start": 777.43,
			        "word": " carrier",
			      },
			      {
			        "end": 778.21,
			        "start": 777.93,
			        "word": " wing",
			      },
			      {
			        "end": 778.56,
			        "start": 778.21,
			        "word": " still",
			      },
			      {
			        "end": 778.91,
			        "start": 778.56,
			        "word": " worth",
			      },
			      {
			        "end": 779.12,
			        "start": 778.91,
			        "word": " the",
			      },
			      {
			        "end": 779.54,
			        "start": 779.12,
			        "word": " effort",
			      },
			      {
			        "end": 779.82,
			        "start": 779.54,
			        "word": "?",
			      },
			    ],
			  },
			  {
			    "end": 783.42,
			    "start": 779.82,
			    "text": " Well, I have to tell the truth, I'm not so sure.",
			    "words": [
			      {
			        "end": 780.08,
			        "start": 779.82,
			        "word": " Well",
			      },
			      {
			        "end": 780.2,
			        "start": 780.08,
			        "word": ",",
			      },
			      {
			        "end": 780.26,
			        "start": 780.2,
			        "word": " I",
			      },
			      {
			        "end": 780.61,
			        "start": 780.26,
			        "word": " have",
			      },
			      {
			        "end": 780.66,
			        "start": 780.61,
			        "word": " to",
			      },
			      {
			        "end": 780.92,
			        "start": 780.66,
			        "word": " tell",
			      },
			      {
			        "end": 781.11,
			        "start": 780.92,
			        "word": " the",
			      },
			      {
			        "end": 781.43,
			        "start": 781.11,
			        "word": " truth",
			      },
			      {
			        "end": 781.57,
			        "start": 781.43,
			        "word": ",",
			      },
			      {
			        "end": 781.61,
			        "start": 781.57,
			        "word": " I",
			      },
			      {
			        "end": 782.3,
			        "start": 781.61,
			        "word": "'m",
			      },
			      {
			        "end": 782.33,
			        "start": 782.3,
			        "word": " not",
			      },
			      {
			        "end": 782.54,
			        "start": 782.33,
			        "word": " so",
			      },
			      {
			        "end": 783.03,
			        "start": 782.54,
			        "word": " sure",
			      },
			      {
			        "end": 783.42,
			        "start": 783.03,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 784.78,
			    "start": 783.42,
			    "text": " Sorry, this is the editing gas.",
			    "words": [
			      {
			        "end": 783.42,
			        "start": 783.42,
			        "word": "",
			      },
			      {
			        "end": 783.65,
			        "start": 783.42,
			        "word": " Sorry",
			      },
			      {
			        "end": 783.74,
			        "start": 783.65,
			        "word": ",",
			      },
			      {
			        "end": 783.92,
			        "start": 783.74,
			        "word": " this",
			      },
			      {
			        "end": 784.01,
			        "start": 783.92,
			        "word": " is",
			      },
			      {
			        "end": 784.15,
			        "start": 784.01,
			        "word": " the",
			      },
			      {
			        "end": 784.47,
			        "start": 784.15,
			        "word": " editing",
			      },
			      {
			        "end": 784.61,
			        "start": 784.47,
			        "word": " gas",
			      },
			      {
			        "end": 784.78,
			        "start": 784.61,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 794.86,
			    "start": 784.78,
			    "text": " I wanted to point out that if you dedicate the whole ship to piloted aircraft with just a bare minimum of helicopters required for search and rescue,",
			    "words": [
			      {
			        "end": 784.93,
			        "start": 784.78,
			        "word": " I",
			      },
			      {
			        "end": 785.33,
			        "start": 784.93,
			        "word": " wanted",
			      },
			      {
			        "end": 785.5,
			        "start": 785.33,
			        "word": " to",
			      },
			      {
			        "end": 785.88,
			        "start": 785.5,
			        "word": " point",
			      },
			      {
			        "end": 786.12,
			        "start": 785.88,
			        "word": " out",
			      },
			      {
			        "end": 786.55,
			        "start": 786.12,
			        "word": " that",
			      },
			      {
			        "end": 786.63,
			        "start": 786.55,
			        "word": " if",
			      },
			      {
			        "end": 786.88,
			        "start": 786.63,
			        "word": " you",
			      },
			      {
			        "end": 787.58,
			        "start": 786.88,
			        "word": " dedicate",
			      },
			      {
			        "end": 787.79,
			        "start": 787.58,
			        "word": " the",
			      },
			      {
			        "end": 788.14,
			        "start": 787.79,
			        "word": " whole",
			      },
			      {
			        "end": 788.74,
			        "start": 788.14,
			        "word": " ship",
			      },
			      {
			        "end": 789.32,
			        "start": 788.74,
			        "word": " to",
			      },
			      {
			        "end": 789.52,
			        "start": 789.32,
			        "word": " pilot",
			      },
			      {
			        "end": 789.66,
			        "start": 789.52,
			        "word": "ed",
			      },
			      {
			        "end": 790.22,
			        "start": 789.66,
			        "word": " aircraft",
			      },
			      {
			        "end": 790.53,
			        "start": 790.22,
			        "word": " with",
			      },
			      {
			        "end": 790.84,
			        "start": 790.53,
			        "word": " just",
			      },
			      {
			        "end": 790.91,
			        "start": 790.84,
			        "word": " a",
			      },
			      {
			        "end": 791.22,
			        "start": 790.91,
			        "word": " bare",
			      },
			      {
			        "end": 791.77,
			        "start": 791.22,
			        "word": " minimum",
			      },
			      {
			        "end": 792.02,
			        "start": 791.77,
			        "word": " of",
			      },
			      {
			        "end": 792.83,
			        "start": 792.02,
			        "word": " helicopters",
			      },
			      {
			        "end": 793.42,
			        "start": 792.83,
			        "word": " required",
			      },
			      {
			        "end": 793.63,
			        "start": 793.42,
			        "word": " for",
			      },
			      {
			        "end": 794.1,
			        "start": 793.63,
			        "word": " search",
			      },
			      {
			        "end": 794.33,
			        "start": 794.1,
			        "word": " and",
			      },
			      {
			        "end": 794.81,
			        "start": 794.33,
			        "word": " rescue",
			      },
			      {
			        "end": 794.86,
			        "start": 794.81,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 800.7,
			    "start": 794.86,
			    "text": " then in this case you will probably end up with a decent carrier wing.",
			    "words": [
			      {
			        "end": 795.2,
			        "start": 794.86,
			        "word": " then",
			      },
			      {
			        "end": 795.37,
			        "start": 795.2,
			        "word": " in",
			      },
			      {
			        "end": 795.71,
			        "start": 795.37,
			        "word": " this",
			      },
			      {
			        "end": 796.05,
			        "start": 795.71,
			        "word": " case",
			      },
			      {
			        "end": 796.31,
			        "start": 796.05,
			        "word": " you",
			      },
			      {
			        "end": 796.65,
			        "start": 796.31,
			        "word": " will",
			      },
			      {
			        "end": 797.34,
			        "start": 796.65,
			        "word": " probably",
			      },
			      {
			        "end": 797.6,
			        "start": 797.34,
			        "word": " end",
			      },
			      {
			        "end": 797.87,
			        "start": 797.6,
			        "word": " up",
			      },
			      {
			        "end": 798.43,
			        "start": 797.87,
			        "word": " with",
			      },
			      {
			        "end": 798.58,
			        "start": 798.43,
			        "word": " a",
			      },
			      {
			        "end": 799.59,
			        "start": 798.58,
			        "word": " decent",
			      },
			      {
			        "end": 800.26,
			        "start": 799.59,
			        "word": " carrier",
			      },
			      {
			        "end": 800.7,
			        "start": 800.26,
			        "word": " wing",
			      },
			      {
			        "end": 800.7,
			        "start": 800.7,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 802.6,
			    "start": 800.7,
			    "text": " But even in this case,",
			    "words": [
			      {
			        "end": 800.97,
			        "start": 800.7,
			        "word": " But",
			      },
			      {
			        "end": 801.34,
			        "start": 800.97,
			        "word": " even",
			      },
			      {
			        "end": 801.52,
			        "start": 801.34,
			        "word": " in",
			      },
			      {
			        "end": 802,
			        "start": 801.52,
			        "word": " this",
			      },
			      {
			        "end": 802.26,
			        "start": 802,
			        "word": " case",
			      },
			      {
			        "end": 802.6,
			        "start": 802.26,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 810.86,
			    "start": 802.6,
			    "text": " this would be a rather inefficient aircraft carrier because of the single catapult and the lack of an angled deck.",
			    "words": [
			      {
			        "end": 802.69,
			        "start": 802.6,
			        "word": " this",
			      },
			      {
			        "end": 802.98,
			        "start": 802.69,
			        "word": " would",
			      },
			      {
			        "end": 803.1,
			        "start": 802.98,
			        "word": " be",
			      },
			      {
			        "end": 803.21,
			        "start": 803.1,
			        "word": " a",
			      },
			      {
			        "end": 803.9,
			        "start": 803.21,
			        "word": " rather",
			      },
			      {
			        "end": 805.32,
			        "start": 803.9,
			        "word": " inefficient",
			      },
			      {
			        "end": 805.9,
			        "start": 805.32,
			        "word": " aircraft",
			      },
			      {
			        "end": 806.46,
			        "start": 805.9,
			        "word": " carrier",
			      },
			      {
			        "end": 807.04,
			        "start": 806.46,
			        "word": " because",
			      },
			      {
			        "end": 807.2,
			        "start": 807.04,
			        "word": " of",
			      },
			      {
			        "end": 807.44,
			        "start": 807.2,
			        "word": " the",
			      },
			      {
			        "end": 807.97,
			        "start": 807.44,
			        "word": " single",
			      },
			      {
			        "end": 808.17,
			        "start": 807.97,
			        "word": " cat",
			      },
			      {
			        "end": 808.33,
			        "start": 808.17,
			        "word": "ap",
			      },
			      {
			        "end": 808.64,
			        "start": 808.33,
			        "word": "ult",
			      },
			      {
			        "end": 808.82,
			        "start": 808.64,
			        "word": " and",
			      },
			      {
			        "end": 809.05,
			        "start": 808.82,
			        "word": " the",
			      },
			      {
			        "end": 809.37,
			        "start": 809.05,
			        "word": " lack",
			      },
			      {
			        "end": 809.53,
			        "start": 809.37,
			        "word": " of",
			      },
			      {
			        "end": 809.73,
			        "start": 809.53,
			        "word": " an",
			      },
			      {
			        "end": 810.19,
			        "start": 809.73,
			        "word": " angled",
			      },
			      {
			        "end": 810.51,
			        "start": 810.19,
			        "word": " deck",
			      },
			      {
			        "end": 810.86,
			        "start": 810.51,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 816.22,
			    "start": 810.86,
			    "text": " So what is a possible explanation for these apparent design incongruences?",
			    "words": [
			      {
			        "end": 810.94,
			        "start": 810.86,
			        "word": "",
			      },
			      {
			        "end": 811.04,
			        "start": 810.94,
			        "word": " So",
			      },
			      {
			        "end": 811.41,
			        "start": 811.04,
			        "word": " what",
			      },
			      {
			        "end": 811.59,
			        "start": 811.41,
			        "word": " is",
			      },
			      {
			        "end": 811.68,
			        "start": 811.59,
			        "word": " a",
			      },
			      {
			        "end": 812.42,
			        "start": 811.68,
			        "word": " possible",
			      },
			      {
			        "end": 813.44,
			        "start": 812.42,
			        "word": " explanation",
			      },
			      {
			        "end": 813.72,
			        "start": 813.44,
			        "word": " for",
			      },
			      {
			        "end": 814.27,
			        "start": 813.72,
			        "word": " these",
			      },
			      {
			        "end": 814.75,
			        "start": 814.27,
			        "word": " apparent",
			      },
			      {
			        "end": 815.15,
			        "start": 814.75,
			        "word": " design",
			      },
			      {
			        "end": 815.35,
			        "start": 815.15,
			        "word": " inc",
			      },
			      {
			        "end": 815.54,
			        "start": 815.35,
			        "word": "ong",
			      },
			      {
			        "end": 815.67,
			        "start": 815.54,
			        "word": "ru",
			      },
			      {
			        "end": 816,
			        "start": 815.67,
			        "word": "ences",
			      },
			      {
			        "end": 816.22,
			        "start": 816,
			        "word": "?",
			      },
			    ],
			  },
			  {
			    "end": 821.34,
			    "start": 816.22,
			    "text": " I'm sure that the favorite explanation of the usual vocal minority is the Chinese are stupid,",
			    "words": [
			      {
			        "end": 816.34,
			        "start": 816.22,
			        "word": " I",
			      },
			      {
			        "end": 816.38,
			        "start": 816.34,
			        "word": "'m",
			      },
			      {
			        "end": 816.6,
			        "start": 816.38,
			        "word": " sure",
			      },
			      {
			        "end": 816.82,
			        "start": 816.6,
			        "word": " that",
			      },
			      {
			        "end": 816.98,
			        "start": 816.82,
			        "word": " the",
			      },
			      {
			        "end": 817.42,
			        "start": 816.98,
			        "word": " favorite",
			      },
			      {
			        "end": 818.03,
			        "start": 817.42,
			        "word": " explanation",
			      },
			      {
			        "end": 818.14,
			        "start": 818.03,
			        "word": " of",
			      },
			      {
			        "end": 818.3,
			        "start": 818.14,
			        "word": " the",
			      },
			      {
			        "end": 818.62,
			        "start": 818.3,
			        "word": " usual",
			      },
			      {
			        "end": 818.98,
			        "start": 818.62,
			        "word": " vocal",
			      },
			      {
			        "end": 819.58,
			        "start": 818.98,
			        "word": " minority",
			      },
			      {
			        "end": 820.16,
			        "start": 819.58,
			        "word": " is",
			      },
			      {
			        "end": 820.22,
			        "start": 820.16,
			        "word": " the",
			      },
			      {
			        "end": 820.62,
			        "start": 820.22,
			        "word": " Chinese",
			      },
			      {
			        "end": 820.78,
			        "start": 820.62,
			        "word": " are",
			      },
			      {
			        "end": 821.21,
			        "start": 820.78,
			        "word": " stupid",
			      },
			      {
			        "end": 821.34,
			        "start": 821.21,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 823.1,
			    "start": 821.34,
			    "text": " what they do is meaningless,",
			    "words": [
			      {
			        "end": 821.58,
			        "start": 821.34,
			        "word": " what",
			      },
			      {
			        "end": 821.86,
			        "start": 821.58,
			        "word": " they",
			      },
			      {
			        "end": 821.94,
			        "start": 821.86,
			        "word": " do",
			      },
			      {
			        "end": 822.06,
			        "start": 821.94,
			        "word": " is",
			      },
			      {
			        "end": 822.72,
			        "start": 822.06,
			        "word": " meaningless",
			      },
			      {
			        "end": 823.1,
			        "start": 822.72,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 825.82,
			    "start": 823.1,
			    "text": " they are incompetent and incapable of innovating.",
			    "words": [
			      {
			        "end": 823.11,
			        "start": 823.1,
			        "word": " they",
			      },
			      {
			        "end": 823.28,
			        "start": 823.11,
			        "word": " are",
			      },
			      {
			        "end": 823.77,
			        "start": 823.28,
			        "word": " incompet",
			      },
			      {
			        "end": 823.98,
			        "start": 823.77,
			        "word": "ent",
			      },
			      {
			        "end": 824.37,
			        "start": 823.98,
			        "word": " and",
			      },
			      {
			        "end": 824.88,
			        "start": 824.37,
			        "word": " incapable",
			      },
			      {
			        "end": 824.99,
			        "start": 824.88,
			        "word": " of",
			      },
			      {
			        "end": 825.29,
			        "start": 824.99,
			        "word": " innov",
			      },
			      {
			        "end": 825.59,
			        "start": 825.29,
			        "word": "ating",
			      },
			      {
			        "end": 825.82,
			        "start": 825.59,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 828.3,
			    "start": 825.82,
			    "text": " If you think so, you are on the wrong video.",
			    "words": [
			      {
			        "end": 826.04,
			        "start": 825.82,
			        "word": " If",
			      },
			      {
			        "end": 826.07,
			        "start": 826.04,
			        "word": " you",
			      },
			      {
			        "end": 826.42,
			        "start": 826.07,
			        "word": " think",
			      },
			      {
			        "end": 826.42,
			        "start": 826.42,
			        "word": " so",
			      },
			      {
			        "end": 826.54,
			        "start": 826.42,
			        "word": ",",
			      },
			      {
			        "end": 826.76,
			        "start": 826.54,
			        "word": " you",
			      },
			      {
			        "end": 827.12,
			        "start": 826.76,
			        "word": " are",
			      },
			      {
			        "end": 827.22,
			        "start": 827.12,
			        "word": " on",
			      },
			      {
			        "end": 827.34,
			        "start": 827.22,
			        "word": " the",
			      },
			      {
			        "end": 827.69,
			        "start": 827.34,
			        "word": " wrong",
			      },
			      {
			        "end": 828.05,
			        "start": 827.69,
			        "word": " video",
			      },
			      {
			        "end": 828.3,
			        "start": 828.05,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 832.22,
			    "start": 828.3,
			    "text": " A simplistic explanation could be that the Chinese saw the Trieste,",
			    "words": [
			      {
			        "end": 828.52,
			        "start": 828.3,
			        "word": " A",
			      },
			      {
			        "end": 829.11,
			        "start": 828.52,
			        "word": " simplistic",
			      },
			      {
			        "end": 829.79,
			        "start": 829.11,
			        "word": " explanation",
			      },
			      {
			        "end": 830.2,
			        "start": 829.79,
			        "word": " could",
			      },
			      {
			        "end": 830.26,
			        "start": 830.2,
			        "word": " be",
			      },
			      {
			        "end": 830.53,
			        "start": 830.26,
			        "word": " that",
			      },
			      {
			        "end": 830.76,
			        "start": 830.53,
			        "word": " the",
			      },
			      {
			        "end": 831.26,
			        "start": 830.76,
			        "word": " Chinese",
			      },
			      {
			        "end": 831.46,
			        "start": 831.26,
			        "word": " saw",
			      },
			      {
			        "end": 831.84,
			        "start": 831.46,
			        "word": " the",
			      },
			      {
			        "end": 831.92,
			        "start": 831.84,
			        "word": " Tri",
			      },
			      {
			        "end": 832.22,
			        "start": 831.92,
			        "word": "este",
			      },
			      {
			        "end": 832.22,
			        "start": 832.22,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 834.63,
			    "start": 832.22,
			    "text": " they saw the America class,",
			    "words": [
			      {
			        "end": 832.22,
			        "start": 832.22,
			        "word": "",
			      },
			      {
			        "end": 832.67,
			        "start": 832.22,
			        "word": " they",
			      },
			      {
			        "end": 832.92,
			        "start": 832.67,
			        "word": " saw",
			      },
			      {
			        "end": 833.18,
			        "start": 832.92,
			        "word": " the",
			      },
			      {
			        "end": 833.86,
			        "start": 833.18,
			        "word": " America",
			      },
			      {
			        "end": 834.33,
			        "start": 833.86,
			        "word": " class",
			      },
			      {
			        "end": 834.63,
			        "start": 834.33,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 835.75,
			    "start": 834.63,
			    "text": " most likely,",
			    "words": [
			      {
			        "end": 834.95,
			        "start": 834.63,
			        "word": " most",
			      },
			      {
			        "end": 835.71,
			        "start": 834.95,
			        "word": " likely",
			      },
			      {
			        "end": 835.75,
			        "start": 835.71,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 836.3,
			    "start": 835.75,
			    "text": " sir.",
			    "words": [
			      {
			        "end": 836.02,
			        "start": 835.75,
			        "word": " sir",
			      },
			      {
			        "end": 836.3,
			        "start": 836.02,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 837.27,
			    "start": 836.3,
			    "text": " Ok, whatever,",
			    "words": [
			      {
			        "end": 836.42,
			        "start": 836.3,
			        "word": " Ok",
			      },
			      {
			        "end": 836.54,
			        "start": 836.42,
			        "word": ",",
			      },
			      {
			        "end": 837.04,
			        "start": 836.54,
			        "word": " whatever",
			      },
			      {
			        "end": 837.27,
			        "start": 837.04,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 839.53,
			    "start": 837.27,
			    "text": " they saw Western light carriers,",
			    "words": [
			      {
			        "end": 837.5,
			        "start": 837.27,
			        "word": " they",
			      },
			      {
			        "end": 837.74,
			        "start": 837.5,
			        "word": " saw",
			      },
			      {
			        "end": 838.29,
			        "start": 837.74,
			        "word": " Western",
			      },
			      {
			        "end": 838.69,
			        "start": 838.29,
			        "word": " light",
			      },
			      {
			        "end": 839.34,
			        "start": 838.69,
			        "word": " carriers",
			      },
			      {
			        "end": 839.53,
			        "start": 839.34,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 842.7,
			    "start": 839.53,
			    "text": " but, not having short takeoff and vertical landing aircraft,",
			    "words": [
			      {
			        "end": 839.93,
			        "start": 839.53,
			        "word": " but",
			      },
			      {
			        "end": 839.95,
			        "start": 839.93,
			        "word": ",",
			      },
			      {
			        "end": 840.1,
			        "start": 839.95,
			        "word": " not",
			      },
			      {
			        "end": 840.45,
			        "start": 840.1,
			        "word": " having",
			      },
			      {
			        "end": 840.74,
			        "start": 840.45,
			        "word": " short",
			      },
			      {
			        "end": 841,
			        "start": 840.74,
			        "word": " take",
			      },
			      {
			        "end": 841.25,
			        "start": 841,
			        "word": "off",
			      },
			      {
			        "end": 841.42,
			        "start": 841.25,
			        "word": " and",
			      },
			      {
			        "end": 841.83,
			        "start": 841.42,
			        "word": " vertical",
			      },
			      {
			        "end": 842.14,
			        "start": 841.83,
			        "word": " landing",
			      },
			      {
			        "end": 842.7,
			        "start": 842.14,
			        "word": " aircraft",
			      },
			      {
			        "end": 842.7,
			        "start": 842.7,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 846.06,
			    "start": 842.7,
			    "text": " they just stuck a catapult on it and called it a day.",
			    "words": [
			      {
			        "end": 843,
			        "start": 842.7,
			        "word": " they",
			      },
			      {
			        "end": 843.45,
			        "start": 843,
			        "word": " just",
			      },
			      {
			        "end": 843.73,
			        "start": 843.45,
			        "word": " stuck",
			      },
			      {
			        "end": 843.75,
			        "start": 843.73,
			        "word": " a",
			      },
			      {
			        "end": 843.97,
			        "start": 843.75,
			        "word": " cat",
			      },
			      {
			        "end": 844.12,
			        "start": 843.97,
			        "word": "ap",
			      },
			      {
			        "end": 844.34,
			        "start": 844.12,
			        "word": "ult",
			      },
			      {
			        "end": 844.55,
			        "start": 844.34,
			        "word": " on",
			      },
			      {
			        "end": 844.64,
			        "start": 844.55,
			        "word": " it",
			      },
			      {
			        "end": 844.86,
			        "start": 844.64,
			        "word": " and",
			      },
			      {
			        "end": 845.31,
			        "start": 844.86,
			        "word": " called",
			      },
			      {
			        "end": 845.46,
			        "start": 845.31,
			        "word": " it",
			      },
			      {
			        "end": 845.53,
			        "start": 845.46,
			        "word": " a",
			      },
			      {
			        "end": 845.75,
			        "start": 845.53,
			        "word": " day",
			      },
			      {
			        "end": 846.06,
			        "start": 845.75,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 850.3,
			    "start": 846.06,
			    "text": " Well, as I said, this is a simplistic explanation.",
			    "words": [
			      {
			        "end": 846.63,
			        "start": 846.06,
			        "word": " Well",
			      },
			      {
			        "end": 846.66,
			        "start": 846.63,
			        "word": ",",
			      },
			      {
			        "end": 846.86,
			        "start": 846.66,
			        "word": " as",
			      },
			      {
			        "end": 846.96,
			        "start": 846.86,
			        "word": " I",
			      },
			      {
			        "end": 847.53,
			        "start": 846.96,
			        "word": " said",
			      },
			      {
			        "end": 847.58,
			        "start": 847.53,
			        "word": ",",
			      },
			      {
			        "end": 847.93,
			        "start": 847.58,
			        "word": " this",
			      },
			      {
			        "end": 848.1,
			        "start": 847.93,
			        "word": " is",
			      },
			      {
			        "end": 848.18,
			        "start": 848.1,
			        "word": " a",
			      },
			      {
			        "end": 849.04,
			        "start": 848.18,
			        "word": " simplistic",
			      },
			      {
			        "end": 850,
			        "start": 849.04,
			        "word": " explanation",
			      },
			      {
			        "end": 850.3,
			        "start": 850,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 854.54,
			    "start": 850.3,
			    "text": " And to be honest, I am not sure I understand this carrier.",
			    "words": [
			      {
			        "end": 850.8,
			        "start": 850.3,
			        "word": " And",
			      },
			      {
			        "end": 850.81,
			        "start": 850.8,
			        "word": " to",
			      },
			      {
			        "end": 851.18,
			        "start": 850.81,
			        "word": " be",
			      },
			      {
			        "end": 851.59,
			        "start": 851.18,
			        "word": " honest",
			      },
			      {
			        "end": 851.87,
			        "start": 851.59,
			        "word": ",",
			      },
			      {
			        "end": 851.9,
			        "start": 851.87,
			        "word": " I",
			      },
			      {
			        "end": 852.04,
			        "start": 851.9,
			        "word": " am",
			      },
			      {
			        "end": 852.27,
			        "start": 852.04,
			        "word": " not",
			      },
			      {
			        "end": 852.58,
			        "start": 852.27,
			        "word": " sure",
			      },
			      {
			        "end": 852.65,
			        "start": 852.58,
			        "word": " I",
			      },
			      {
			        "end": 853.53,
			        "start": 852.65,
			        "word": " understand",
			      },
			      {
			        "end": 853.73,
			        "start": 853.53,
			        "word": " this",
			      },
			      {
			        "end": 854.27,
			        "start": 853.73,
			        "word": " carrier",
			      },
			      {
			        "end": 854.54,
			        "start": 854.27,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 859.26,
			    "start": 854.54,
			    "text": " I cannot really make sense of the solutions implemented on the Type 076.",
			    "words": [
			      {
			        "end": 854.57,
			        "start": 854.54,
			        "word": "",
			      },
			      {
			        "end": 854.71,
			        "start": 854.57,
			        "word": " I",
			      },
			      {
			        "end": 855.04,
			        "start": 854.71,
			        "word": " cannot",
			      },
			      {
			        "end": 855.47,
			        "start": 855.04,
			        "word": " really",
			      },
			      {
			        "end": 855.76,
			        "start": 855.47,
			        "word": " make",
			      },
			      {
			        "end": 856.12,
			        "start": 855.76,
			        "word": " sense",
			      },
			      {
			        "end": 856.29,
			        "start": 856.12,
			        "word": " of",
			      },
			      {
			        "end": 856.47,
			        "start": 856.29,
			        "word": " the",
			      },
			      {
			        "end": 857.11,
			        "start": 856.47,
			        "word": " solutions",
			      },
			      {
			        "end": 857.91,
			        "start": 857.11,
			        "word": " implemented",
			      },
			      {
			        "end": 858.05,
			        "start": 857.91,
			        "word": " on",
			      },
			      {
			        "end": 858.26,
			        "start": 858.05,
			        "word": " the",
			      },
			      {
			        "end": 858.55,
			        "start": 858.26,
			        "word": " Type",
			      },
			      {
			        "end": 858.76,
			        "start": 858.55,
			        "word": " 0",
			      },
			      {
			        "end": 859.26,
			        "start": 858.76,
			        "word": "76",
			      },
			      {
			        "end": 859.26,
			        "start": 859.26,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 864.86,
			    "start": 859.26,
			    "text": " If it hadn't a wild deck, I would understand it more, but I don't.",
			    "words": [
			      {
			        "end": 859.43,
			        "start": 859.26,
			        "word": " If",
			      },
			      {
			        "end": 859.58,
			        "start": 859.43,
			        "word": " it",
			      },
			      {
			        "end": 859.91,
			        "start": 859.58,
			        "word": " hadn",
			      },
			      {
			        "end": 860.09,
			        "start": 859.91,
			        "word": "'t",
			      },
			      {
			        "end": 860.15,
			        "start": 860.09,
			        "word": " a",
			      },
			      {
			        "end": 860.48,
			        "start": 860.15,
			        "word": " wild",
			      },
			      {
			        "end": 860.82,
			        "start": 860.48,
			        "word": " deck",
			      },
			      {
			        "end": 861.08,
			        "start": 860.82,
			        "word": ",",
			      },
			      {
			        "end": 861.22,
			        "start": 861.08,
			        "word": " I",
			      },
			      {
			        "end": 861.39,
			        "start": 861.22,
			        "word": " would",
			      },
			      {
			        "end": 862.02,
			        "start": 861.39,
			        "word": " understand",
			      },
			      {
			        "end": 862.26,
			        "start": 862.02,
			        "word": " it",
			      },
			      {
			        "end": 862.39,
			        "start": 862.26,
			        "word": " more",
			      },
			      {
			        "end": 862.54,
			        "start": 862.39,
			        "word": ",",
			      },
			      {
			        "end": 862.71,
			        "start": 862.54,
			        "word": " but",
			      },
			      {
			        "end": 863.78,
			        "start": 862.71,
			        "word": " I",
			      },
			      {
			        "end": 863.89,
			        "start": 863.78,
			        "word": " don",
			      },
			      {
			        "end": 864.27,
			        "start": 863.89,
			        "word": "'t",
			      },
			      {
			        "end": 864.86,
			        "start": 864.27,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 868.04,
			    "start": 864.86,
			    "text": " Now, since the Chinese are not stupid,",
			    "words": [
			      {
			        "end": 865.12,
			        "start": 864.86,
			        "word": " Now",
			      },
			      {
			        "end": 865.58,
			        "start": 865.12,
			        "word": ",",
			      },
			      {
			        "end": 865.72,
			        "start": 865.58,
			        "word": " since",
			      },
			      {
			        "end": 865.98,
			        "start": 865.72,
			        "word": " the",
			      },
			      {
			        "end": 866.58,
			        "start": 865.98,
			        "word": " Chinese",
			      },
			      {
			        "end": 866.84,
			        "start": 866.58,
			        "word": " are",
			      },
			      {
			        "end": 867.1,
			        "start": 866.84,
			        "word": " not",
			      },
			      {
			        "end": 867.62,
			        "start": 867.1,
			        "word": " stupid",
			      },
			      {
			        "end": 868.04,
			        "start": 867.62,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 870.94,
			    "start": 868.04,
			    "text": " this is telling me that I am missing something.",
			    "words": [
			      {
			        "end": 868.07,
			        "start": 868.04,
			        "word": " this",
			      },
			      {
			        "end": 868.19,
			        "start": 868.07,
			        "word": " is",
			      },
			      {
			        "end": 868.63,
			        "start": 868.19,
			        "word": " telling",
			      },
			      {
			        "end": 868.78,
			        "start": 868.63,
			        "word": " me",
			      },
			      {
			        "end": 869.1,
			        "start": 868.78,
			        "word": " that",
			      },
			      {
			        "end": 869.17,
			        "start": 869.1,
			        "word": " I",
			      },
			      {
			        "end": 869.58,
			        "start": 869.17,
			        "word": " am",
			      },
			      {
			        "end": 869.93,
			        "start": 869.58,
			        "word": " missing",
			      },
			      {
			        "end": 870.66,
			        "start": 869.93,
			        "word": " something",
			      },
			      {
			        "end": 870.94,
			        "start": 870.66,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 872.06,
			    "start": 870.94,
			    "text": " My speculation,",
			    "words": [
			      {
			        "end": 871.08,
			        "start": 870.94,
			        "word": " My",
			      },
			      {
			        "end": 871.9,
			        "start": 871.08,
			        "word": " speculation",
			      },
			      {
			        "end": 872.06,
			        "start": 871.9,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 874,
			    "start": 872.06,
			    "text": " what seems most likely to me,",
			    "words": [
			      {
			        "end": 872.45,
			        "start": 872.06,
			        "word": " what",
			      },
			      {
			        "end": 872.71,
			        "start": 872.45,
			        "word": " seems",
			      },
			      {
			        "end": 873,
			        "start": 872.71,
			        "word": " most",
			      },
			      {
			        "end": 873.44,
			        "start": 873,
			        "word": " likely",
			      },
			      {
			        "end": 873.58,
			        "start": 873.44,
			        "word": " to",
			      },
			      {
			        "end": 873.72,
			        "start": 873.58,
			        "word": " me",
			      },
			      {
			        "end": 874,
			        "start": 873.72,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 877.74,
			    "start": 874,
			    "text": " is that this carrier is a semi-experimental unit.",
			    "words": [
			      {
			        "end": 874.05,
			        "start": 874,
			        "word": " is",
			      },
			      {
			        "end": 874.35,
			        "start": 874.05,
			        "word": " that",
			      },
			      {
			        "end": 874.68,
			        "start": 874.35,
			        "word": " this",
			      },
			      {
			        "end": 875.34,
			        "start": 874.68,
			        "word": " carrier",
			      },
			      {
			        "end": 875.38,
			        "start": 875.34,
			        "word": " is",
			      },
			      {
			        "end": 875.48,
			        "start": 875.38,
			        "word": " a",
			      },
			      {
			        "end": 875.88,
			        "start": 875.48,
			        "word": " semi",
			      },
			      {
			        "end": 875.97,
			        "start": 875.88,
			        "word": "-",
			      },
			      {
			        "end": 876.2,
			        "start": 875.97,
			        "word": "ex",
			      },
			      {
			        "end": 876.46,
			        "start": 876.2,
			        "word": "per",
			      },
			      {
			        "end": 876.94,
			        "start": 876.46,
			        "word": "iment",
			      },
			      {
			        "end": 877.18,
			        "start": 876.94,
			        "word": "al",
			      },
			      {
			        "end": 877.49,
			        "start": 877.18,
			        "word": " unit",
			      },
			      {
			        "end": 877.74,
			        "start": 877.49,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 884.06,
			    "start": 877.74,
			    "text": " I imagine that they are unsure whether this type of configuration could be operationally effective,",
			    "words": [
			      {
			        "end": 877.74,
			        "start": 877.74,
			        "word": "",
			      },
			      {
			        "end": 877.93,
			        "start": 877.74,
			        "word": " I",
			      },
			      {
			        "end": 878.32,
			        "start": 877.93,
			        "word": " imagine",
			      },
			      {
			        "end": 878.61,
			        "start": 878.32,
			        "word": " that",
			      },
			      {
			        "end": 878.9,
			        "start": 878.61,
			        "word": " they",
			      },
			      {
			        "end": 879.12,
			        "start": 878.9,
			        "word": " are",
			      },
			      {
			        "end": 879.69,
			        "start": 879.12,
			        "word": " unsure",
			      },
			      {
			        "end": 880.07,
			        "start": 879.69,
			        "word": " whether",
			      },
			      {
			        "end": 880.38,
			        "start": 880.07,
			        "word": " this",
			      },
			      {
			        "end": 880.65,
			        "start": 880.38,
			        "word": " type",
			      },
			      {
			        "end": 880.79,
			        "start": 880.65,
			        "word": " of",
			      },
			      {
			        "end": 881.99,
			        "start": 880.79,
			        "word": " configuration",
			      },
			      {
			        "end": 882.21,
			        "start": 881.99,
			        "word": " could",
			      },
			      {
			        "end": 882.38,
			        "start": 882.21,
			        "word": " be",
			      },
			      {
			        "end": 882.93,
			        "start": 882.38,
			        "word": " operation",
			      },
			      {
			        "end": 883.18,
			        "start": 882.93,
			        "word": "ally",
			      },
			      {
			        "end": 884.06,
			        "start": 883.18,
			        "word": " effective",
			      },
			      {
			        "end": 884.06,
			        "start": 884.06,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 887.26,
			    "start": 884.06,
			    "text": " and so they want to test it in real conditions.",
			    "words": [
			      {
			        "end": 884.3,
			        "start": 884.06,
			        "word": " and",
			      },
			      {
			        "end": 884.46,
			        "start": 884.3,
			        "word": " so",
			      },
			      {
			        "end": 884.78,
			        "start": 884.46,
			        "word": " they",
			      },
			      {
			        "end": 885.12,
			        "start": 884.78,
			        "word": " want",
			      },
			      {
			        "end": 885.37,
			        "start": 885.12,
			        "word": " to",
			      },
			      {
			        "end": 885.58,
			        "start": 885.37,
			        "word": " test",
			      },
			      {
			        "end": 885.74,
			        "start": 885.58,
			        "word": " it",
			      },
			      {
			        "end": 886.02,
			        "start": 885.74,
			        "word": " in",
			      },
			      {
			        "end": 886.22,
			        "start": 886.02,
			        "word": " real",
			      },
			      {
			        "end": 887,
			        "start": 886.22,
			        "word": " conditions",
			      },
			      {
			        "end": 887.26,
			        "start": 887,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 888.86,
			    "start": 887.26,
			    "text": " They will test it with drones,",
			    "words": [
			      {
			        "end": 887.52,
			        "start": 887.26,
			        "word": " They",
			      },
			      {
			        "end": 887.74,
			        "start": 887.52,
			        "word": " will",
			      },
			      {
			        "end": 887.98,
			        "start": 887.74,
			        "word": " test",
			      },
			      {
			        "end": 888.1,
			        "start": 887.98,
			        "word": " it",
			      },
			      {
			        "end": 888.34,
			        "start": 888.1,
			        "word": " with",
			      },
			      {
			        "end": 888.7,
			        "start": 888.34,
			        "word": " drones",
			      },
			      {
			        "end": 888.86,
			        "start": 888.7,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 890.62,
			    "start": 888.86,
			    "text": " they will test it with aircraft,",
			    "words": [
			      {
			        "end": 889.11,
			        "start": 888.86,
			        "word": " they",
			      },
			      {
			        "end": 889.36,
			        "start": 889.11,
			        "word": " will",
			      },
			      {
			        "end": 889.61,
			        "start": 889.36,
			        "word": " test",
			      },
			      {
			        "end": 889.73,
			        "start": 889.61,
			        "word": " it",
			      },
			      {
			        "end": 889.98,
			        "start": 889.73,
			        "word": " with",
			      },
			      {
			        "end": 890.43,
			        "start": 889.98,
			        "word": " aircraft",
			      },
			      {
			        "end": 890.62,
			        "start": 890.43,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 892.66,
			    "start": 890.62,
			    "text": " they will test it with helicopters,",
			    "words": [
			      {
			        "end": 890.89,
			        "start": 890.62,
			        "word": " they",
			      },
			      {
			        "end": 891.16,
			        "start": 890.89,
			        "word": " will",
			      },
			      {
			        "end": 891.36,
			        "start": 891.16,
			        "word": " test",
			      },
			      {
			        "end": 891.42,
			        "start": 891.36,
			        "word": " it",
			      },
			      {
			        "end": 891.66,
			        "start": 891.42,
			        "word": " with",
			      },
			      {
			        "end": 892.3,
			        "start": 891.66,
			        "word": " helicopters",
			      },
			      {
			        "end": 892.66,
			        "start": 892.3,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 894.91,
			    "start": 892.66,
			    "text": " they will test amphibious operations,",
			    "words": [
			      {
			        "end": 892.72,
			        "start": 892.66,
			        "word": " they",
			      },
			      {
			        "end": 892.98,
			        "start": 892.72,
			        "word": " will",
			      },
			      {
			        "end": 893.24,
			        "start": 892.98,
			        "word": " test",
			      },
			      {
			        "end": 893.5,
			        "start": 893.24,
			        "word": " amph",
			      },
			      {
			        "end": 893.63,
			        "start": 893.5,
			        "word": "ib",
			      },
			      {
			        "end": 893.96,
			        "start": 893.63,
			        "word": "ious",
			      },
			      {
			        "end": 894.54,
			        "start": 893.96,
			        "word": " operations",
			      },
			      {
			        "end": 894.91,
			        "start": 894.54,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 896.14,
			    "start": 894.91,
			    "text": " putting everything together.",
			    "words": [
			      {
			        "end": 895.06,
			        "start": 894.91,
			        "word": " putting",
			      },
			      {
			        "end": 895.57,
			        "start": 895.06,
			        "word": " everything",
			      },
			      {
			        "end": 895.98,
			        "start": 895.57,
			        "word": " together",
			      },
			      {
			        "end": 896.14,
			        "start": 895.98,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 897.1,
			    "start": 896.14,
			    "text": " In general,",
			    "words": [
			      {
			        "end": 896.31,
			        "start": 896.14,
			        "word": " In",
			      },
			      {
			        "end": 896.92,
			        "start": 896.31,
			        "word": " general",
			      },
			      {
			        "end": 897.1,
			        "start": 896.92,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 903.74,
			    "start": 897.1,
			    "text": " I imagine that adding some light carriers to a fleet of large super carriers could make sense for China.",
			    "words": [
			      {
			        "end": 897.26,
			        "start": 897.1,
			        "word": " I",
			      },
			      {
			        "end": 897.71,
			        "start": 897.26,
			        "word": " imagine",
			      },
			      {
			        "end": 898.06,
			        "start": 897.71,
			        "word": " that",
			      },
			      {
			        "end": 898.56,
			        "start": 898.06,
			        "word": " adding",
			      },
			      {
			        "end": 898.79,
			        "start": 898.56,
			        "word": " some",
			      },
			      {
			        "end": 899.2,
			        "start": 898.79,
			        "word": " light",
			      },
			      {
			        "end": 899.82,
			        "start": 899.2,
			        "word": " carriers",
			      },
			      {
			        "end": 900.06,
			        "start": 899.82,
			        "word": " to",
			      },
			      {
			        "end": 900.08,
			        "start": 900.06,
			        "word": " a",
			      },
			      {
			        "end": 900.46,
			        "start": 900.08,
			        "word": " fleet",
			      },
			      {
			        "end": 900.64,
			        "start": 900.46,
			        "word": " of",
			      },
			      {
			        "end": 901.09,
			        "start": 900.64,
			        "word": " large",
			      },
			      {
			        "end": 901.53,
			        "start": 901.09,
			        "word": " super",
			      },
			      {
			        "end": 902.14,
			        "start": 901.53,
			        "word": " carriers",
			      },
			      {
			        "end": 902.46,
			        "start": 902.14,
			        "word": " could",
			      },
			      {
			        "end": 902.71,
			        "start": 902.46,
			        "word": " make",
			      },
			      {
			        "end": 903.06,
			        "start": 902.71,
			        "word": " sense",
			      },
			      {
			        "end": 903.22,
			        "start": 903.06,
			        "word": " for",
			      },
			      {
			        "end": 903.54,
			        "start": 903.22,
			        "word": " China",
			      },
			      {
			        "end": 903.74,
			        "start": 903.54,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 908.78,
			    "start": 903.74,
			    "text": " The mission could be defending commercial traffic far from the Chinese home waters,",
			    "words": [
			      {
			        "end": 903.94,
			        "start": 903.74,
			        "word": "",
			      },
			      {
			        "end": 903.96,
			        "start": 903.94,
			        "word": " The",
			      },
			      {
			        "end": 904.41,
			        "start": 903.96,
			        "word": " mission",
			      },
			      {
			        "end": 904.86,
			        "start": 904.41,
			        "word": " could",
			      },
			      {
			        "end": 904.87,
			        "start": 904.86,
			        "word": " be",
			      },
			      {
			        "end": 905.49,
			        "start": 904.87,
			        "word": " defending",
			      },
			      {
			        "end": 906.45,
			        "start": 905.49,
			        "word": " commercial",
			      },
			      {
			        "end": 906.62,
			        "start": 906.45,
			        "word": " traffic",
			      },
			      {
			        "end": 906.82,
			        "start": 906.62,
			        "word": " far",
			      },
			      {
			        "end": 907.09,
			        "start": 906.82,
			        "word": " from",
			      },
			      {
			        "end": 907.39,
			        "start": 907.09,
			        "word": " the",
			      },
			      {
			        "end": 907.93,
			        "start": 907.39,
			        "word": " Chinese",
			      },
			      {
			        "end": 908.26,
			        "start": 907.93,
			        "word": " home",
			      },
			      {
			        "end": 908.78,
			        "start": 908.26,
			        "word": " waters",
			      },
			      {
			        "end": 908.78,
			        "start": 908.78,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 912.46,
			    "start": 908.78,
			    "text": " or to help the power projection in the South China Sea.",
			    "words": [
			      {
			        "end": 908.95,
			        "start": 908.78,
			        "word": " or",
			      },
			      {
			        "end": 909.08,
			        "start": 908.95,
			        "word": " to",
			      },
			      {
			        "end": 909.43,
			        "start": 909.08,
			        "word": " help",
			      },
			      {
			        "end": 909.71,
			        "start": 909.43,
			        "word": " the",
			      },
			      {
			        "end": 910.01,
			        "start": 909.71,
			        "word": " power",
			      },
			      {
			        "end": 910.79,
			        "start": 910.01,
			        "word": " projection",
			      },
			      {
			        "end": 910.94,
			        "start": 910.79,
			        "word": " in",
			      },
			      {
			        "end": 911.34,
			        "start": 910.94,
			        "word": " the",
			      },
			      {
			        "end": 911.56,
			        "start": 911.34,
			        "word": " South",
			      },
			      {
			        "end": 911.95,
			        "start": 911.56,
			        "word": " China",
			      },
			      {
			        "end": 912.18,
			        "start": 911.95,
			        "word": " Sea",
			      },
			      {
			        "end": 912.46,
			        "start": 912.18,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 915.9,
			    "start": 912.46,
			    "text": " I wish I had a good explanation, but I don't.",
			    "words": [
			      {
			        "end": 912.65,
			        "start": 912.46,
			        "word": " I",
			      },
			      {
			        "end": 912.79,
			        "start": 912.65,
			        "word": " wish",
			      },
			      {
			        "end": 912.85,
			        "start": 912.79,
			        "word": " I",
			      },
			      {
			        "end": 913.05,
			        "start": 912.85,
			        "word": " had",
			      },
			      {
			        "end": 913.16,
			        "start": 913.05,
			        "word": " a",
			      },
			      {
			        "end": 913.38,
			        "start": 913.16,
			        "word": " good",
			      },
			      {
			        "end": 914.12,
			        "start": 913.38,
			        "word": " explanation",
			      },
			      {
			        "end": 914.3,
			        "start": 914.12,
			        "word": ",",
			      },
			      {
			        "end": 914.44,
			        "start": 914.3,
			        "word": " but",
			      },
			      {
			        "end": 915.23,
			        "start": 914.44,
			        "word": " I",
			      },
			      {
			        "end": 915.23,
			        "start": 915.23,
			        "word": " don",
			      },
			      {
			        "end": 915.49,
			        "start": 915.23,
			        "word": "'t",
			      },
			      {
			        "end": 915.9,
			        "start": 915.49,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 918.7,
			    "start": 915.9,
			    "text": " But at least we understood that we have a problem.",
			    "words": [
			      {
			        "end": 916.14,
			        "start": 915.9,
			        "word": " But",
			      },
			      {
			        "end": 916.25,
			        "start": 916.14,
			        "word": " at",
			      },
			      {
			        "end": 916.66,
			        "start": 916.25,
			        "word": " least",
			      },
			      {
			        "end": 916.73,
			        "start": 916.66,
			        "word": " we",
			      },
			      {
			        "end": 917.42,
			        "start": 916.73,
			        "word": " understood",
			      },
			      {
			        "end": 917.7,
			        "start": 917.42,
			        "word": " that",
			      },
			      {
			        "end": 917.84,
			        "start": 917.7,
			        "word": " we",
			      },
			      {
			        "end": 918.12,
			        "start": 917.84,
			        "word": " have",
			      },
			      {
			        "end": 918.19,
			        "start": 918.12,
			        "word": " a",
			      },
			      {
			        "end": 918.7,
			        "start": 918.19,
			        "word": " problem",
			      },
			      {
			        "end": 918.7,
			        "start": 918.7,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 921.18,
			    "start": 918.7,
			    "text": " And we don't fully understand the Chinese.",
			    "words": [
			      {
			        "end": 918.89,
			        "start": 918.7,
			        "word": " And",
			      },
			      {
			        "end": 919.02,
			        "start": 918.89,
			        "word": " we",
			      },
			      {
			        "end": 919.21,
			        "start": 919.02,
			        "word": " don",
			      },
			      {
			        "end": 919.34,
			        "start": 919.21,
			        "word": "'t",
			      },
			      {
			        "end": 919.66,
			        "start": 919.34,
			        "word": " fully",
			      },
			      {
			        "end": 920.31,
			        "start": 919.66,
			        "word": " understand",
			      },
			      {
			        "end": 920.51,
			        "start": 920.31,
			        "word": " the",
			      },
			      {
			        "end": 920.94,
			        "start": 920.51,
			        "word": " Chinese",
			      },
			      {
			        "end": 921.18,
			        "start": 920.94,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 923.02,
			    "start": 921.18,
			    "text": " Which is better than nothing, I suppose.",
			    "words": [
			      {
			        "end": 921.42,
			        "start": 921.18,
			        "word": " Which",
			      },
			      {
			        "end": 921.51,
			        "start": 921.42,
			        "word": " is",
			      },
			      {
			        "end": 921.82,
			        "start": 921.51,
			        "word": " better",
			      },
			      {
			        "end": 921.99,
			        "start": 921.82,
			        "word": " than",
			      },
			      {
			        "end": 922.35,
			        "start": 921.99,
			        "word": " nothing",
			      },
			      {
			        "end": 922.42,
			        "start": 922.35,
			        "word": ",",
			      },
			      {
			        "end": 922.47,
			        "start": 922.42,
			        "word": " I",
			      },
			      {
			        "end": 922.83,
			        "start": 922.47,
			        "word": " suppose",
			      },
			      {
			        "end": 923.02,
			        "start": 922.83,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 926.54,
			    "start": 923.02,
			    "text": " So, thank you very much for watching this video.",
			    "words": [
			      {
			        "end": 923.17,
			        "start": 923.02,
			        "word": " So",
			      },
			      {
			        "end": 923.32,
			        "start": 923.17,
			        "word": ",",
			      },
			      {
			        "end": 923.89,
			        "start": 923.32,
			        "word": " thank",
			      },
			      {
			        "end": 924.05,
			        "start": 923.89,
			        "word": " you",
			      },
			      {
			        "end": 924.4,
			        "start": 924.05,
			        "word": " very",
			      },
			      {
			        "end": 924.75,
			        "start": 924.4,
			        "word": " much",
			      },
			      {
			        "end": 925.01,
			        "start": 924.75,
			        "word": " for",
			      },
			      {
			        "end": 925.71,
			        "start": 925.01,
			        "word": " watching",
			      },
			      {
			        "end": 926.06,
			        "start": 925.71,
			        "word": " this",
			      },
			      {
			        "end": 926.54,
			        "start": 926.06,
			        "word": " video",
			      },
			      {
			        "end": 926.54,
			        "start": 926.54,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 929.34,
			    "start": 926.54,
			    "text": " Thank you very much for having given me your attention.",
			    "words": [
			      {
			        "end": 926.88,
			        "start": 926.54,
			        "word": " Thank",
			      },
			      {
			        "end": 927,
			        "start": 926.88,
			        "word": " you",
			      },
			      {
			        "end": 927.23,
			        "start": 927,
			        "word": " very",
			      },
			      {
			        "end": 927.47,
			        "start": 927.23,
			        "word": " much",
			      },
			      {
			        "end": 927.66,
			        "start": 927.47,
			        "word": " for",
			      },
			      {
			        "end": 927.97,
			        "start": 927.66,
			        "word": " having",
			      },
			      {
			        "end": 928.26,
			        "start": 927.97,
			        "word": " given",
			      },
			      {
			        "end": 928.37,
			        "start": 928.26,
			        "word": " me",
			      },
			      {
			        "end": 928.6,
			        "start": 928.37,
			        "word": " your",
			      },
			      {
			        "end": 929.12,
			        "start": 928.6,
			        "word": " attention",
			      },
			      {
			        "end": 929.34,
			        "start": 929.12,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 931.9,
			    "start": 929.34,
			    "text": " I consider this a honor and a privilege.",
			    "words": [
			      {
			        "end": 929.41,
			        "start": 929.34,
			        "word": " I",
			      },
			      {
			        "end": 929.99,
			        "start": 929.41,
			        "word": " consider",
			      },
			      {
			        "end": 930.27,
			        "start": 929.99,
			        "word": " this",
			      },
			      {
			        "end": 930.43,
			        "start": 930.27,
			        "word": " a",
			      },
			      {
			        "end": 930.71,
			        "start": 930.43,
			        "word": " honor",
			      },
			      {
			        "end": 930.92,
			        "start": 930.71,
			        "word": " and",
			      },
			      {
			        "end": 930.99,
			        "start": 930.92,
			        "word": " a",
			      },
			      {
			        "end": 931.64,
			        "start": 930.99,
			        "word": " privilege",
			      },
			      {
			        "end": 931.9,
			        "start": 931.64,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 936.3,
			    "start": 931.9,
			    "text": " I want to say a big thank you to all those who are supporting the channel financially on Patreon,",
			    "words": [
			      {
			        "end": 931.9,
			        "start": 931.9,
			        "word": "",
			      },
			      {
			        "end": 931.95,
			        "start": 931.9,
			        "word": " I",
			      },
			      {
			        "end": 932.15,
			        "start": 931.95,
			        "word": " want",
			      },
			      {
			        "end": 932.25,
			        "start": 932.15,
			        "word": " to",
			      },
			      {
			        "end": 932.4,
			        "start": 932.25,
			        "word": " say",
			      },
			      {
			        "end": 932.45,
			        "start": 932.4,
			        "word": " a",
			      },
			      {
			        "end": 932.6,
			        "start": 932.45,
			        "word": " big",
			      },
			      {
			        "end": 932.98,
			        "start": 932.6,
			        "word": " thank",
			      },
			      {
			        "end": 933.01,
			        "start": 932.98,
			        "word": " you",
			      },
			      {
			        "end": 933.11,
			        "start": 933.01,
			        "word": " to",
			      },
			      {
			        "end": 933.33,
			        "start": 933.11,
			        "word": " all",
			      },
			      {
			        "end": 933.58,
			        "start": 933.33,
			        "word": " those",
			      },
			      {
			        "end": 933.7,
			        "start": 933.58,
			        "word": " who",
			      },
			      {
			        "end": 933.82,
			        "start": 933.7,
			        "word": " are",
			      },
			      {
			        "end": 934.33,
			        "start": 933.82,
			        "word": " supporting",
			      },
			      {
			        "end": 934.38,
			        "start": 934.33,
			        "word": " the",
			      },
			      {
			        "end": 934.7,
			        "start": 934.38,
			        "word": " channel",
			      },
			      {
			        "end": 935.26,
			        "start": 934.7,
			        "word": " financially",
			      },
			      {
			        "end": 935.5,
			        "start": 935.26,
			        "word": " on",
			      },
			      {
			        "end": 936.27,
			        "start": 935.5,
			        "word": " Patreon",
			      },
			      {
			        "end": 936.3,
			        "start": 936.27,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 937.83,
			    "start": 936.3,
			    "text": " by being a member,",
			    "words": [
			      {
			        "end": 936.51,
			        "start": 936.3,
			        "word": " by",
			      },
			      {
			        "end": 936.89,
			        "start": 936.51,
			        "word": " being",
			      },
			      {
			        "end": 936.97,
			        "start": 936.89,
			        "word": " a",
			      },
			      {
			        "end": 937.45,
			        "start": 936.97,
			        "word": " member",
			      },
			      {
			        "end": 937.83,
			        "start": 937.45,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 938.86,
			    "start": 937.83,
			    "text": " or on GoFundMe,",
			    "words": [
			      {
			        "end": 937.84,
			        "start": 937.83,
			        "word": " or",
			      },
			      {
			        "end": 938,
			        "start": 937.84,
			        "word": " on",
			      },
			      {
			        "end": 938.17,
			        "start": 938,
			        "word": " Go",
			      },
			      {
			        "end": 938.25,
			        "start": 938.17,
			        "word": "F",
			      },
			      {
			        "end": 938.5,
			        "start": 938.25,
			        "word": "und",
			      },
			      {
			        "end": 938.67,
			        "start": 938.5,
			        "word": "Me",
			      },
			      {
			        "end": 938.86,
			        "start": 938.67,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 941.9,
			    "start": 938.86,
			    "text": " or by any other of the means available.",
			    "words": [
			      {
			        "end": 939.17,
			        "start": 938.86,
			        "word": " or",
			      },
			      {
			        "end": 939.75,
			        "start": 939.17,
			        "word": " by",
			      },
			      {
			        "end": 939.88,
			        "start": 939.75,
			        "word": " any",
			      },
			      {
			        "end": 940.25,
			        "start": 939.88,
			        "word": " other",
			      },
			      {
			        "end": 940.39,
			        "start": 940.25,
			        "word": " of",
			      },
			      {
			        "end": 940.61,
			        "start": 940.39,
			        "word": " the",
			      },
			      {
			        "end": 940.98,
			        "start": 940.61,
			        "word": " means",
			      },
			      {
			        "end": 941.65,
			        "start": 940.98,
			        "word": " available",
			      },
			      {
			        "end": 941.9,
			        "start": 941.65,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 945.18,
			    "start": 941.9,
			    "text": " You are absolute stars, I am incredibly grateful.",
			    "words": [
			      {
			        "end": 942.1,
			        "start": 941.9,
			        "word": " You",
			      },
			      {
			        "end": 942.28,
			        "start": 942.1,
			        "word": " are",
			      },
			      {
			        "end": 942.83,
			        "start": 942.28,
			        "word": " absolute",
			      },
			      {
			        "end": 943.11,
			        "start": 942.83,
			        "word": " stars",
			      },
			      {
			        "end": 943.25,
			        "start": 943.11,
			        "word": ",",
			      },
			      {
			        "end": 943.43,
			        "start": 943.25,
			        "word": " I",
			      },
			      {
			        "end": 943.5,
			        "start": 943.43,
			        "word": " am",
			      },
			      {
			        "end": 944.29,
			        "start": 943.5,
			        "word": " incredibly",
			      },
			      {
			        "end": 944.91,
			        "start": 944.29,
			        "word": " grateful",
			      },
			      {
			        "end": 945.18,
			        "start": 944.91,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 946.54,
			    "start": 945.18,
			    "text": " If you can support the channel,",
			    "words": [
			      {
			        "end": 945.3,
			        "start": 945.18,
			        "word": " If",
			      },
			      {
			        "end": 945.43,
			        "start": 945.3,
			        "word": " you",
			      },
			      {
			        "end": 945.58,
			        "start": 945.43,
			        "word": " can",
			      },
			      {
			        "end": 945.94,
			        "start": 945.58,
			        "word": " support",
			      },
			      {
			        "end": 946.08,
			        "start": 945.94,
			        "word": " the",
			      },
			      {
			        "end": 946.43,
			        "start": 946.08,
			        "word": " channel",
			      },
			      {
			        "end": 946.54,
			        "start": 946.43,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 947.92,
			    "start": 946.54,
			    "text": " which is perfectly fine,",
			    "words": [
			      {
			        "end": 946.83,
			        "start": 946.54,
			        "word": " which",
			      },
			      {
			        "end": 947.04,
			        "start": 946.83,
			        "word": " is",
			      },
			      {
			        "end": 947.49,
			        "start": 947.04,
			        "word": " perfectly",
			      },
			      {
			        "end": 947.74,
			        "start": 947.49,
			        "word": " fine",
			      },
			      {
			        "end": 947.92,
			        "start": 947.74,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 949.5,
			    "start": 947.92,
			    "text": " do it only if you can.",
			    "words": [
			      {
			        "end": 948.1,
			        "start": 947.92,
			        "word": " do",
			      },
			      {
			        "end": 948.46,
			        "start": 948.1,
			        "word": " it",
			      },
			      {
			        "end": 948.69,
			        "start": 948.46,
			        "word": " only",
			      },
			      {
			        "end": 948.89,
			        "start": 948.69,
			        "word": " if",
			      },
			      {
			        "end": 949.18,
			        "start": 948.89,
			        "word": " you",
			      },
			      {
			        "end": 949.48,
			        "start": 949.18,
			        "word": " can",
			      },
			      {
			        "end": 949.5,
			        "start": 949.48,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 951.16,
			    "start": 949.5,
			    "text": " Please interact with the video,",
			    "words": [
			      {
			        "end": 949.82,
			        "start": 949.5,
			        "word": " Please",
			      },
			      {
			        "end": 950.28,
			        "start": 949.82,
			        "word": " interact",
			      },
			      {
			        "end": 950.46,
			        "start": 950.28,
			        "word": " with",
			      },
			      {
			        "end": 950.62,
			        "start": 950.46,
			        "word": " the",
			      },
			      {
			        "end": 950.89,
			        "start": 950.62,
			        "word": " video",
			      },
			      {
			        "end": 951.16,
			        "start": 950.89,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 951.92,
			    "start": 951.16,
			    "text": " leave a comment,",
			    "words": [
			      {
			        "end": 951.31,
			        "start": 951.16,
			        "word": " leave",
			      },
			      {
			        "end": 951.36,
			        "start": 951.31,
			        "word": " a",
			      },
			      {
			        "end": 951.77,
			        "start": 951.36,
			        "word": " comment",
			      },
			      {
			        "end": 951.92,
			        "start": 951.77,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 952.79,
			    "start": 951.92,
			    "text": " hit like,",
			    "words": [
			      {
			        "end": 952.19,
			        "start": 951.92,
			        "word": " hit",
			      },
			      {
			        "end": 952.58,
			        "start": 952.19,
			        "word": " like",
			      },
			      {
			        "end": 952.79,
			        "start": 952.58,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 953.58,
			    "start": 952.79,
			    "text": " hit the bell,",
			    "words": [
			      {
			        "end": 953.02,
			        "start": 952.79,
			        "word": " hit",
			      },
			      {
			        "end": 953.26,
			        "start": 953.02,
			        "word": " the",
			      },
			      {
			        "end": 953.57,
			        "start": 953.26,
			        "word": " bell",
			      },
			      {
			        "end": 953.58,
			        "start": 953.57,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 955.9,
			    "start": 953.58,
			    "text": " because it's really helping with the algorithm.",
			    "words": [
			      {
			        "end": 953.95,
			        "start": 953.58,
			        "word": " because",
			      },
			      {
			        "end": 954.06,
			        "start": 953.95,
			        "word": " it",
			      },
			      {
			        "end": 954.15,
			        "start": 954.06,
			        "word": "'s",
			      },
			      {
			        "end": 954.47,
			        "start": 954.15,
			        "word": " really",
			      },
			      {
			        "end": 954.84,
			        "start": 954.47,
			        "word": " helping",
			      },
			      {
			        "end": 955.06,
			        "start": 954.84,
			        "word": " with",
			      },
			      {
			        "end": 955.21,
			        "start": 955.06,
			        "word": " the",
			      },
			      {
			        "end": 955.67,
			        "start": 955.21,
			        "word": " algorithm",
			      },
			      {
			        "end": 955.9,
			        "start": 955.67,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 957.34,
			    "start": 955.9,
			    "text": " This is the end of this video,",
			    "words": [
			      {
			        "end": 956.13,
			        "start": 955.9,
			        "word": " This",
			      },
			      {
			        "end": 956.24,
			        "start": 956.13,
			        "word": " is",
			      },
			      {
			        "end": 956.41,
			        "start": 956.24,
			        "word": " the",
			      },
			      {
			        "end": 956.58,
			        "start": 956.41,
			        "word": " end",
			      },
			      {
			        "end": 956.71,
			        "start": 956.58,
			        "word": " of",
			      },
			      {
			        "end": 956.92,
			        "start": 956.71,
			        "word": " this",
			      },
			      {
			        "end": 957.2,
			        "start": 956.92,
			        "word": " video",
			      },
			      {
			        "end": 957.34,
			        "start": 957.2,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 959.98,
			    "start": 957.34,
			    "text": " but there's plenty of Chinese stuff to discuss,",
			    "words": [
			      {
			        "end": 957.66,
			        "start": 957.34,
			        "word": " but",
			      },
			      {
			        "end": 957.98,
			        "start": 957.66,
			        "word": " there",
			      },
			      {
			        "end": 958.27,
			        "start": 957.98,
			        "word": "'s",
			      },
			      {
			        "end": 958.51,
			        "start": 958.27,
			        "word": " plenty",
			      },
			      {
			        "end": 958.6,
			        "start": 958.51,
			        "word": " of",
			      },
			      {
			        "end": 959.11,
			        "start": 958.6,
			        "word": " Chinese",
			      },
			      {
			        "end": 959.37,
			        "start": 959.11,
			        "word": " stuff",
			      },
			      {
			        "end": 959.49,
			        "start": 959.37,
			        "word": " to",
			      },
			      {
			        "end": 959.97,
			        "start": 959.49,
			        "word": " discuss",
			      },
			      {
			        "end": 959.98,
			        "start": 959.97,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 961.82,
			    "start": 959.98,
			    "text": " so please stay tuned.",
			    "words": [
			      {
			        "end": 959.98,
			        "start": 959.98,
			        "word": "",
			      },
			      {
			        "end": 960.16,
			        "start": 959.98,
			        "word": " so",
			      },
			      {
			        "end": 960.79,
			        "start": 960.16,
			        "word": " please",
			      },
			      {
			        "end": 961.07,
			        "start": 960.79,
			        "word": " stay",
			      },
			      {
			        "end": 961.52,
			        "start": 961.07,
			        "word": " tuned",
			      },
			      {
			        "end": 961.82,
			        "start": 961.52,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 964.7,
			    "start": 961.82,
			    "text": " Thank you very much for watching, and see you next time.",
			    "words": [
			      {
			        "end": 962.05,
			        "start": 961.82,
			        "word": " Thank",
			      },
			      {
			        "end": 962.19,
			        "start": 962.05,
			        "word": " you",
			      },
			      {
			        "end": 962.37,
			        "start": 962.19,
			        "word": " very",
			      },
			      {
			        "end": 962.55,
			        "start": 962.37,
			        "word": " much",
			      },
			      {
			        "end": 962.69,
			        "start": 962.55,
			        "word": " for",
			      },
			      {
			        "end": 963.1,
			        "start": 962.69,
			        "word": " watching",
			      },
			      {
			        "end": 963.24,
			        "start": 963.1,
			        "word": ",",
			      },
			      {
			        "end": 963.49,
			        "start": 963.24,
			        "word": " and",
			      },
			      {
			        "end": 963.79,
			        "start": 963.49,
			        "word": " see",
			      },
			      {
			        "end": 963.87,
			        "start": 963.79,
			        "word": " you",
			      },
			      {
			        "end": 964.16,
			        "start": 963.87,
			        "word": " next",
			      },
			      {
			        "end": 964.49,
			        "start": 964.16,
			        "word": " time",
			      },
			      {
			        "end": 964.7,
			        "start": 964.49,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 972.3,
			    "start": 964.7,
			    "text": " That was an underwhelming conclusion, sir.",
			    "words": [
			      {
			        "end": 965.52,
			        "start": 964.7,
			        "word": " That",
			      },
			      {
			        "end": 966.13,
			        "start": 965.52,
			        "word": " was",
			      },
			      {
			        "end": 966.54,
			        "start": 966.13,
			        "word": " an",
			      },
			      {
			        "end": 967.56,
			        "start": 966.54,
			        "word": " under",
			      },
			      {
			        "end": 968.38,
			        "start": 967.56,
			        "word": "whel",
			      },
			      {
			        "end": 969.2,
			        "start": 968.38,
			        "word": "ming",
			      },
			      {
			        "end": 971.25,
			        "start": 969.2,
			        "word": " conclusion",
			      },
			      {
			        "end": 971.68,
			        "start": 971.25,
			        "word": ",",
			      },
			      {
			        "end": 972.17,
			        "start": 971.68,
			        "word": " sir",
			      },
			      {
			        "end": 972.3,
			        "start": 972.17,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 976.94,
			    "start": 972.3,
			    "text": " Otis, sometimes being underwhelming is all you can do.",
			    "words": [
			      {
			        "end": 972.48,
			        "start": 972.3,
			        "word": " Ot",
			      },
			      {
			        "end": 972.68,
			        "start": 972.48,
			        "word": "is",
			      },
			      {
			        "end": 972.86,
			        "start": 972.68,
			        "word": ",",
			      },
			      {
			        "end": 973.74,
			        "start": 972.86,
			        "word": " sometimes",
			      },
			      {
			        "end": 974.25,
			        "start": 973.74,
			        "word": " being",
			      },
			      {
			        "end": 974.7,
			        "start": 974.25,
			        "word": " under",
			      },
			      {
			        "end": 975.09,
			        "start": 974.7,
			        "word": "whel",
			      },
			      {
			        "end": 975.61,
			        "start": 975.09,
			        "word": "ming",
			      },
			      {
			        "end": 975.68,
			        "start": 975.61,
			        "word": " is",
			      },
			      {
			        "end": 975.95,
			        "start": 975.68,
			        "word": " all",
			      },
			      {
			        "end": 976.22,
			        "start": 975.95,
			        "word": " you",
			      },
			      {
			        "end": 976.49,
			        "start": 976.22,
			        "word": " can",
			      },
			      {
			        "end": 976.67,
			        "start": 976.49,
			        "word": " do",
			      },
			      {
			        "end": 976.94,
			        "start": 976.67,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 979.98,
			    "start": 976.94,
			    "text": " I just used the same expression used by your ex-wife.",
			    "words": [
			      {
			        "end": 977.06,
			        "start": 976.94,
			        "word": " I",
			      },
			      {
			        "end": 977.26,
			        "start": 977.06,
			        "word": " just",
			      },
			      {
			        "end": 977.52,
			        "start": 977.26,
			        "word": " used",
			      },
			      {
			        "end": 977.71,
			        "start": 977.52,
			        "word": " the",
			      },
			      {
			        "end": 977.97,
			        "start": 977.71,
			        "word": " same",
			      },
			      {
			        "end": 978.63,
			        "start": 977.97,
			        "word": " expression",
			      },
			      {
			        "end": 978.89,
			        "start": 978.63,
			        "word": " used",
			      },
			      {
			        "end": 979.02,
			        "start": 978.89,
			        "word": " by",
			      },
			      {
			        "end": 979.28,
			        "start": 979.02,
			        "word": " your",
			      },
			      {
			        "end": 979.41,
			        "start": 979.28,
			        "word": " ex",
			      },
			      {
			        "end": 979.47,
			        "start": 979.41,
			        "word": "-",
			      },
			      {
			        "end": 979.77,
			        "start": 979.47,
			        "word": "wife",
			      },
			      {
			        "end": 979.98,
			        "start": 979.77,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 982.7,
			    "start": 979.98,
			    "text": " See you.",
			    "words": [
			      {
			        "end": 980.71,
			        "start": 979.98,
			        "word": " See",
			      },
			      {
			        "end": 982.53,
			        "start": 980.71,
			        "word": " you",
			      },
			      {
			        "end": 982.7,
			        "start": 982.53,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 983.98,
			    "start": 982.7,
			    "text": " Bye.",
			    "words": [
			      {
			        "end": 983.34,
			        "start": 982.7,
			        "word": " Bye",
			      },
			      {
			        "end": 983.98,
			        "start": 983.34,
			        "word": ".",
			      },
			    ],
			  },
			]
		`)
	})
})
