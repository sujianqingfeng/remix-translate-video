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
			    "end": 6.36,
			    "start": 0,
			    "text": " The Trump administration is reportedly considering tightening the restrictions on U.S. chip exports to China even further,",
			    "words": [
			      {
			        "end": 0.09,
			        "start": 0,
			        "word": "",
			      },
			      {
			        "end": 0.14,
			        "start": 0.09,
			        "word": " The",
			      },
			      {
			        "end": 0.42,
			        "start": 0.14,
			        "word": " Trump",
			      },
			      {
			        "end": 1.04,
			        "start": 0.42,
			        "word": " administration",
			      },
			      {
			        "end": 1.14,
			        "start": 1.04,
			        "word": " is",
			      },
			      {
			        "end": 1.68,
			        "start": 1.14,
			        "word": " reportedly",
			      },
			      {
			        "end": 2.29,
			        "start": 1.68,
			        "word": " considering",
			      },
			      {
			        "end": 2.88,
			        "start": 2.29,
			        "word": " tightening",
			      },
			      {
			        "end": 3.04,
			        "start": 2.88,
			        "word": " the",
			      },
			      {
			        "end": 3.68,
			        "start": 3.04,
			        "word": " restrictions",
			      },
			      {
			        "end": 3.84,
			        "start": 3.68,
			        "word": " on",
			      },
			      {
			        "end": 4.4,
			        "start": 3.84,
			        "word": " U.S. chip",
			      },
			      {
			        "end": 4.87,
			        "start": 4.4,
			        "word": " exports",
			      },
			      {
			        "end": 5.07,
			        "start": 4.87,
			        "word": " to",
			      },
			      {
			        "end": 5.76,
			        "start": 5.07,
			        "word": " China",
			      },
			      {
			        "end": 6,
			        "start": 5.76,
			        "word": " even",
			      },
			      {
			        "end": 6.32,
			        "start": 6,
			        "word": " further",
			      },
			      {
			        "end": 6.36,
			        "start": 6.32,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 29.45,
			    "start": 6.36,
			    "text": " which is interesting timing as we wait to hear from NVIDIA after the bell tomorrow where this is a big concern for the outlook. Deirdre Bosa is here for more in tech check. Hi Deirdre. Hey Kelly. So if those previous tariffs laid the groundwork for deep seek these additional ones could supercharge progress at Huawei which is another Chinese company even more central to the A.I. race because it is developing the foundation of it. that would be chips.",
			    "words": [
			      {
			        "end": 6.48,
			        "start": 6.36,
			        "word": " which",
			      },
			      {
			        "end": 6.58,
			        "start": 6.48,
			        "word": " is",
			      },
			      {
			        "end": 6.84,
			        "start": 6.58,
			        "word": " interesting",
			      },
			      {
			        "end": 7.32,
			        "start": 6.84,
			        "word": " timing",
			      },
			      {
			        "end": 7.49,
			        "start": 7.32,
			        "word": " as",
			      },
			      {
			        "end": 7.56,
			        "start": 7.49,
			        "word": " we",
			      },
			      {
			        "end": 7.71,
			        "start": 7.56,
			        "word": " wait",
			      },
			      {
			        "end": 7.84,
			        "start": 7.71,
			        "word": " to",
			      },
			      {
			        "end": 8.04,
			        "start": 7.84,
			        "word": " hear",
			      },
			      {
			        "end": 8.34,
			        "start": 8.04,
			        "word": " from",
			      },
			      {
			        "end": 8.43,
			        "start": 8.34,
			        "word": " N",
			      },
			      {
			        "end": 8.72,
			        "start": 8.43,
			        "word": "VID",
			      },
			      {
			        "end": 8.92,
			        "start": 8.72,
			        "word": "IA",
			      },
			      {
			        "end": 9.23,
			        "start": 8.92,
			        "word": " after",
			      },
			      {
			        "end": 9.28,
			        "start": 9.23,
			        "word": " the",
			      },
			      {
			        "end": 9.46,
			        "start": 9.28,
			        "word": " bell",
			      },
			      {
			        "end": 9.84,
			        "start": 9.46,
			        "word": " tomorrow",
			      },
			      {
			        "end": 9.98,
			        "start": 9.84,
			        "word": " where",
			      },
			      {
			        "end": 10.24,
			        "start": 9.98,
			        "word": " this",
			      },
			      {
			        "end": 10.36,
			        "start": 10.24,
			        "word": " is",
			      },
			      {
			        "end": 10.45,
			        "start": 10.36,
			        "word": " a",
			      },
			      {
			        "end": 10.61,
			        "start": 10.45,
			        "word": " big",
			      },
			      {
			        "end": 11.05,
			        "start": 10.61,
			        "word": " concern",
			      },
			      {
			        "end": 11.16,
			        "start": 11.05,
			        "word": " for",
			      },
			      {
			        "end": 11.28,
			        "start": 11.16,
			        "word": " the",
			      },
			      {
			        "end": 12.03,
			        "start": 11.28,
			        "word": " outlook. De",
			      },
			      {
			        "end": 12.1,
			        "start": 12.03,
			        "word": "ird",
			      },
			      {
			        "end": 12.17,
			        "start": 12.1,
			        "word": "re",
			      },
			      {
			        "end": 12.24,
			        "start": 12.17,
			        "word": " B",
			      },
			      {
			        "end": 12.45,
			        "start": 12.24,
			        "word": "osa",
			      },
			      {
			        "end": 12.59,
			        "start": 12.45,
			        "word": " is",
			      },
			      {
			        "end": 12.87,
			        "start": 12.59,
			        "word": " here",
			      },
			      {
			        "end": 13.08,
			        "start": 12.87,
			        "word": " for",
			      },
			      {
			        "end": 13.36,
			        "start": 13.08,
			        "word": " more",
			      },
			      {
			        "end": 13.5,
			        "start": 13.36,
			        "word": " in",
			      },
			      {
			        "end": 13.78,
			        "start": 13.5,
			        "word": " tech",
			      },
			      {
			        "end": 14.5,
			        "start": 13.78,
			        "word": " check. Hi",
			      },
			      {
			        "end": 14.6,
			        "start": 14.5,
			        "word": " De",
			      },
			      {
			        "end": 14.77,
			        "start": 14.6,
			        "word": "ird",
			      },
			      {
			        "end": 15.23,
			        "start": 14.77,
			        "word": "re. Hey",
			      },
			      {
			        "end": 15.85,
			        "start": 15.23,
			        "word": " Kelly. So",
			      },
			      {
			        "end": 15.97,
			        "start": 15.85,
			        "word": " if",
			      },
			      {
			        "end": 16.28,
			        "start": 15.97,
			        "word": " those",
			      },
			      {
			        "end": 16.72,
			        "start": 16.28,
			        "word": " previous",
			      },
			      {
			        "end": 17.12,
			        "start": 16.72,
			        "word": " tariffs",
			      },
			      {
			        "end": 17.36,
			        "start": 17.12,
			        "word": " laid",
			      },
			      {
			        "end": 17.54,
			        "start": 17.36,
			        "word": " the",
			      },
			      {
			        "end": 17.94,
			        "start": 17.54,
			        "word": " ground",
			      },
			      {
			        "end": 18.12,
			        "start": 17.94,
			        "word": "work",
			      },
			      {
			        "end": 18.3,
			        "start": 18.12,
			        "word": " for",
			      },
			      {
			        "end": 18.54,
			        "start": 18.3,
			        "word": " deep",
			      },
			      {
			        "end": 18.78,
			        "start": 18.54,
			        "word": " seek",
			      },
			      {
			        "end": 19.08,
			        "start": 18.78,
			        "word": " these",
			      },
			      {
			        "end": 19.7,
			        "start": 19.08,
			        "word": " additional",
			      },
			      {
			        "end": 19.91,
			        "start": 19.7,
			        "word": " ones",
			      },
			      {
			        "end": 20.21,
			        "start": 19.91,
			        "word": " could",
			      },
			      {
			        "end": 20.51,
			        "start": 20.21,
			        "word": " super",
			      },
			      {
			        "end": 20.95,
			        "start": 20.51,
			        "word": "charge",
			      },
			      {
			        "end": 21.35,
			        "start": 20.95,
			        "word": " progress",
			      },
			      {
			        "end": 21.45,
			        "start": 21.35,
			        "word": " at",
			      },
			      {
			        "end": 21.8,
			        "start": 21.45,
			        "word": " Huawei",
			      },
			      {
			        "end": 22.1,
			        "start": 21.8,
			        "word": " which",
			      },
			      {
			        "end": 22.32,
			        "start": 22.1,
			        "word": " is",
			      },
			      {
			        "end": 22.83,
			        "start": 22.32,
			        "word": " another",
			      },
			      {
			        "end": 23.12,
			        "start": 22.83,
			        "word": " Chinese",
			      },
			      {
			        "end": 23.87,
			        "start": 23.12,
			        "word": " company",
			      },
			      {
			        "end": 24.04,
			        "start": 23.87,
			        "word": " even",
			      },
			      {
			        "end": 24.26,
			        "start": 24.04,
			        "word": " more",
			      },
			      {
			        "end": 24.68,
			        "start": 24.26,
			        "word": " central",
			      },
			      {
			        "end": 24.8,
			        "start": 24.68,
			        "word": " to",
			      },
			      {
			        "end": 24.96,
			        "start": 24.8,
			        "word": " the",
			      },
			      {
			        "end": 26.08,
			        "start": 24.96,
			        "word": " A.I. race",
			      },
			      {
			        "end": 26.35,
			        "start": 26.08,
			        "word": " because",
			      },
			      {
			        "end": 26.48,
			        "start": 26.35,
			        "word": " it",
			      },
			      {
			        "end": 26.56,
			        "start": 26.48,
			        "word": " is",
			      },
			      {
			        "end": 27.08,
			        "start": 26.56,
			        "word": " developing",
			      },
			      {
			        "end": 27.24,
			        "start": 27.08,
			        "word": " the",
			      },
			      {
			        "end": 28.04,
			        "start": 27.24,
			        "word": " foundation",
			      },
			      {
			        "end": 28.16,
			        "start": 28.04,
			        "word": " of",
			      },
			      {
			        "end": 28.24,
			        "start": 28.16,
			        "word": " it.",
			      },
			      {
			        "end": 28.47,
			        "start": 28.24,
			        "word": " that",
			      },
			      {
			        "end": 28.76,
			        "start": 28.47,
			        "word": " would",
			      },
			      {
			        "end": 28.87,
			        "start": 28.76,
			        "word": " be",
			      },
			      {
			        "end": 29.26,
			        "start": 28.87,
			        "word": " chips",
			      },
			      {
			        "end": 29.45,
			        "start": 29.26,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 38.38,
			    "start": 29.45,
			    "text": " This morning the FT reports that the company has significantly improved the yield or the amount of advanced AI chips that can produce a near doubling from about a year ago.",
			    "words": [
			      {
			        "end": 29.58,
			        "start": 29.45,
			        "word": " This",
			      },
			      {
			        "end": 29.96,
			        "start": 29.58,
			        "word": " morning",
			      },
			      {
			        "end": 30.14,
			        "start": 29.96,
			        "word": " the",
			      },
			      {
			        "end": 30.24,
			        "start": 30.14,
			        "word": " FT",
			      },
			      {
			        "end": 30.69,
			        "start": 30.24,
			        "word": " reports",
			      },
			      {
			        "end": 30.76,
			        "start": 30.69,
			        "word": " that",
			      },
			      {
			        "end": 30.82,
			        "start": 30.76,
			        "word": " the",
			      },
			      {
			        "end": 31.24,
			        "start": 30.82,
			        "word": " company",
			      },
			      {
			        "end": 31.36,
			        "start": 31.24,
			        "word": " has",
			      },
			      {
			        "end": 32.04,
			        "start": 31.36,
			        "word": " significantly",
			      },
			      {
			        "end": 32.36,
			        "start": 32.04,
			        "word": " improved",
			      },
			      {
			        "end": 32.48,
			        "start": 32.36,
			        "word": " the",
			      },
			      {
			        "end": 32.91,
			        "start": 32.48,
			        "word": " yield",
			      },
			      {
			        "end": 33.27,
			        "start": 32.91,
			        "word": " or",
			      },
			      {
			        "end": 33.44,
			        "start": 33.27,
			        "word": " the",
			      },
			      {
			        "end": 33.91,
			        "start": 33.44,
			        "word": " amount",
			      },
			      {
			        "end": 34,
			        "start": 33.91,
			        "word": " of",
			      },
			      {
			        "end": 34.57,
			        "start": 34,
			        "word": " advanced",
			      },
			      {
			        "end": 34.71,
			        "start": 34.57,
			        "word": " AI",
			      },
			      {
			        "end": 35.05,
			        "start": 34.71,
			        "word": " chips",
			      },
			      {
			        "end": 35.34,
			        "start": 35.05,
			        "word": " that",
			      },
			      {
			        "end": 35.55,
			        "start": 35.34,
			        "word": " can",
			      },
			      {
			        "end": 36.05,
			        "start": 35.55,
			        "word": " produce",
			      },
			      {
			        "end": 36.12,
			        "start": 36.05,
			        "word": " a",
			      },
			      {
			        "end": 36.4,
			        "start": 36.12,
			        "word": " near",
			      },
			      {
			        "end": 36.98,
			        "start": 36.4,
			        "word": " doubling",
			      },
			      {
			        "end": 37.25,
			        "start": 36.98,
			        "word": " from",
			      },
			      {
			        "end": 37.65,
			        "start": 37.25,
			        "word": " about",
			      },
			      {
			        "end": 37.67,
			        "start": 37.65,
			        "word": " a",
			      },
			      {
			        "end": 37.99,
			        "start": 37.67,
			        "word": " year",
			      },
			      {
			        "end": 38.21,
			        "start": 37.99,
			        "word": " ago",
			      },
			      {
			        "end": 38.38,
			        "start": 38.21,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 43.84,
			    "start": 38.38,
			    "text": " To put this simply it means that Huawei's production process is more efficient and profitable.",
			    "words": [
			      {
			        "end": 38.63,
			        "start": 38.38,
			        "word": " To",
			      },
			      {
			        "end": 38.72,
			        "start": 38.63,
			        "word": " put",
			      },
			      {
			        "end": 39,
			        "start": 38.72,
			        "word": " this",
			      },
			      {
			        "end": 39.49,
			        "start": 39,
			        "word": " simply",
			      },
			      {
			        "end": 39.56,
			        "start": 39.49,
			        "word": " it",
			      },
			      {
			        "end": 40.01,
			        "start": 39.56,
			        "word": " means",
			      },
			      {
			        "end": 40.2,
			        "start": 40.01,
			        "word": " that",
			      },
			      {
			        "end": 40.61,
			        "start": 40.2,
			        "word": " Huawei",
			      },
			      {
			        "end": 40.88,
			        "start": 40.61,
			        "word": "'s",
			      },
			      {
			        "end": 41.5,
			        "start": 40.88,
			        "word": " production",
			      },
			      {
			        "end": 41.93,
			        "start": 41.5,
			        "word": " process",
			      },
			      {
			        "end": 42.16,
			        "start": 41.93,
			        "word": " is",
			      },
			      {
			        "end": 42.3,
			        "start": 42.16,
			        "word": " more",
			      },
			      {
			        "end": 42.86,
			        "start": 42.3,
			        "word": " efficient",
			      },
			      {
			        "end": 43.31,
			        "start": 42.86,
			        "word": " and",
			      },
			      {
			        "end": 43.66,
			        "start": 43.31,
			        "word": " profitable",
			      },
			      {
			        "end": 43.84,
			        "start": 43.66,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 48.64,
			    "start": 43.84,
			    "text": " That is key to being able to compete with Nvidia in terms of pricing and availability.",
			    "words": [
			      {
			        "end": 44.1,
			        "start": 43.84,
			        "word": " That",
			      },
			      {
			        "end": 44.21,
			        "start": 44.1,
			        "word": " is",
			      },
			      {
			        "end": 44.38,
			        "start": 44.21,
			        "word": " key",
			      },
			      {
			        "end": 44.56,
			        "start": 44.38,
			        "word": " to",
			      },
			      {
			        "end": 44.82,
			        "start": 44.56,
			        "word": " being",
			      },
			      {
			        "end": 45.07,
			        "start": 44.82,
			        "word": " able",
			      },
			      {
			        "end": 45.19,
			        "start": 45.07,
			        "word": " to",
			      },
			      {
			        "end": 45.69,
			        "start": 45.19,
			        "word": " compete",
			      },
			      {
			        "end": 45.87,
			        "start": 45.69,
			        "word": " with",
			      },
			      {
			        "end": 46.24,
			        "start": 45.87,
			        "word": " Nvidia",
			      },
			      {
			        "end": 46.36,
			        "start": 46.24,
			        "word": " in",
			      },
			      {
			        "end": 46.67,
			        "start": 46.36,
			        "word": " terms",
			      },
			      {
			        "end": 46.88,
			        "start": 46.67,
			        "word": " of",
			      },
			      {
			        "end": 47.36,
			        "start": 46.88,
			        "word": " pricing",
			      },
			      {
			        "end": 47.6,
			        "start": 47.36,
			        "word": " and",
			      },
			      {
			        "end": 48.3,
			        "start": 47.6,
			        "word": " availability",
			      },
			      {
			        "end": 48.64,
			        "start": 48.3,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 50.75,
			    "start": 48.64,
			    "text": " Now of course Huawei still has a long way to go.",
			    "words": [
			      {
			        "end": 48.71,
			        "start": 48.64,
			        "word": " Now",
			      },
			      {
			        "end": 48.75,
			        "start": 48.71,
			        "word": " of",
			      },
			      {
			        "end": 49.11,
			        "start": 48.75,
			        "word": " course",
			      },
			      {
			        "end": 49.51,
			        "start": 49.11,
			        "word": " Huawei",
			      },
			      {
			        "end": 49.76,
			        "start": 49.51,
			        "word": " still",
			      },
			      {
			        "end": 49.91,
			        "start": 49.76,
			        "word": " has",
			      },
			      {
			        "end": 49.96,
			        "start": 49.91,
			        "word": " a",
			      },
			      {
			        "end": 50.19,
			        "start": 49.96,
			        "word": " long",
			      },
			      {
			        "end": 50.36,
			        "start": 50.19,
			        "word": " way",
			      },
			      {
			        "end": 50.47,
			        "start": 50.36,
			        "word": " to",
			      },
			      {
			        "end": 50.58,
			        "start": 50.47,
			        "word": " go",
			      },
			      {
			        "end": 50.75,
			        "start": 50.58,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 52.16,
			    "start": 50.75,
			    "text": " Nvidia is age 20s.",
			    "words": [
			      {
			        "end": 51.1,
			        "start": 50.75,
			        "word": " Nvidia",
			      },
			      {
			        "end": 51.21,
			        "start": 51.1,
			        "word": " is",
			      },
			      {
			        "end": 51.42,
			        "start": 51.21,
			        "word": " age",
			      },
			      {
			        "end": 51.73,
			        "start": 51.42,
			        "word": " 20",
			      },
			      {
			        "end": 51.78,
			        "start": 51.73,
			        "word": "s",
			      },
			      {
			        "end": 52.16,
			        "start": 51.78,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 60.94,
			    "start": 52.16,
			    "text": " They are the industry standard in China generating an estimated 12 billion dollars in revenue for the company and they have the benefit of the Nvidia ecosystem.",
			    "words": [
			      {
			        "end": 52.18,
			        "start": 52.16,
			        "word": " They",
			      },
			      {
			        "end": 52.35,
			        "start": 52.18,
			        "word": " are",
			      },
			      {
			        "end": 52.61,
			        "start": 52.35,
			        "word": " the",
			      },
			      {
			        "end": 52.97,
			        "start": 52.61,
			        "word": " industry",
			      },
			      {
			        "end": 53.44,
			        "start": 52.97,
			        "word": " standard",
			      },
			      {
			        "end": 53.68,
			        "start": 53.44,
			        "word": " in",
			      },
			      {
			        "end": 54.08,
			        "start": 53.68,
			        "word": " China",
			      },
			      {
			        "end": 54.08,
			        "start": 54.08,
			        "word": "",
			      },
			      {
			        "end": 54.69,
			        "start": 54.08,
			        "word": " generating",
			      },
			      {
			        "end": 54.81,
			        "start": 54.69,
			        "word": " an",
			      },
			      {
			        "end": 55.36,
			        "start": 54.81,
			        "word": " estimated",
			      },
			      {
			        "end": 55.72,
			        "start": 55.36,
			        "word": " 12",
			      },
			      {
			        "end": 56.17,
			        "start": 55.72,
			        "word": " billion",
			      },
			      {
			        "end": 56.58,
			        "start": 56.17,
			        "word": " dollars",
			      },
			      {
			        "end": 56.68,
			        "start": 56.58,
			        "word": " in",
			      },
			      {
			        "end": 57.1,
			        "start": 56.68,
			        "word": " revenue",
			      },
			      {
			        "end": 57.28,
			        "start": 57.1,
			        "word": " for",
			      },
			      {
			        "end": 57.79,
			        "start": 57.28,
			        "word": " the",
			      },
			      {
			        "end": 57.88,
			        "start": 57.79,
			        "word": " company",
			      },
			      {
			        "end": 58.2,
			        "start": 57.88,
			        "word": " and",
			      },
			      {
			        "end": 58.3,
			        "start": 58.2,
			        "word": " they",
			      },
			      {
			        "end": 58.54,
			        "start": 58.3,
			        "word": " have",
			      },
			      {
			        "end": 58.72,
			        "start": 58.54,
			        "word": " the",
			      },
			      {
			        "end": 59.14,
			        "start": 58.72,
			        "word": " benefit",
			      },
			      {
			        "end": 59.26,
			        "start": 59.14,
			        "word": " of",
			      },
			      {
			        "end": 59.44,
			        "start": 59.26,
			        "word": " the",
			      },
			      {
			        "end": 59.85,
			        "start": 59.44,
			        "word": " Nvidia",
			      },
			      {
			        "end": 60.37,
			        "start": 59.85,
			        "word": " ecosystem",
			      },
			      {
			        "end": 60.94,
			        "start": 60.37,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 69.69,
			    "start": 60.94,
			    "text": " But if additional tariffs cut off access to those chips Chinese AI companies they could be forced to turn to Huawei's alternative even faster.",
			    "words": [
			      {
			        "end": 61.32,
			        "start": 60.94,
			        "word": " But",
			      },
			      {
			        "end": 61.52,
			        "start": 61.32,
			        "word": " if",
			      },
			      {
			        "end": 62.19,
			        "start": 61.52,
			        "word": " additional",
			      },
			      {
			        "end": 62.66,
			        "start": 62.19,
			        "word": " tariffs",
			      },
			      {
			        "end": 62.86,
			        "start": 62.66,
			        "word": " cut",
			      },
			      {
			        "end": 63.07,
			        "start": 62.86,
			        "word": " off",
			      },
			      {
			        "end": 63.46,
			        "start": 63.07,
			        "word": " access",
			      },
			      {
			        "end": 63.59,
			        "start": 63.46,
			        "word": " to",
			      },
			      {
			        "end": 63.91,
			        "start": 63.59,
			        "word": " those",
			      },
			      {
			        "end": 64.31,
			        "start": 63.91,
			        "word": " chips",
			      },
			      {
			        "end": 64.72,
			        "start": 64.31,
			        "word": " Chinese",
			      },
			      {
			        "end": 64.85,
			        "start": 64.72,
			        "word": " AI",
			      },
			      {
			        "end": 65.56,
			        "start": 64.85,
			        "word": " companies",
			      },
			      {
			        "end": 65.71,
			        "start": 65.56,
			        "word": " they",
			      },
			      {
			        "end": 66.04,
			        "start": 65.71,
			        "word": " could",
			      },
			      {
			        "end": 66.16,
			        "start": 66.04,
			        "word": " be",
			      },
			      {
			        "end": 66.62,
			        "start": 66.16,
			        "word": " forced",
			      },
			      {
			        "end": 66.7,
			        "start": 66.62,
			        "word": " to",
			      },
			      {
			        "end": 66.83,
			        "start": 66.7,
			        "word": " turn",
			      },
			      {
			        "end": 67.3,
			        "start": 66.83,
			        "word": " to",
			      },
			      {
			        "end": 67.49,
			        "start": 67.3,
			        "word": " Huawei",
			      },
			      {
			        "end": 67.73,
			        "start": 67.49,
			        "word": "'s",
			      },
			      {
			        "end": 68.91,
			        "start": 67.73,
			        "word": " alternative",
			      },
			      {
			        "end": 69.08,
			        "start": 68.91,
			        "word": " even",
			      },
			      {
			        "end": 69.59,
			        "start": 69.08,
			        "word": " faster",
			      },
			      {
			        "end": 69.69,
			        "start": 69.59,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 77.08,
			    "start": 69.69,
			    "text": " Now again these are not the best and they're not the most preferred hardware but they may be good enough and getting better.",
			    "words": [
			      {
			        "end": 69.9,
			        "start": 69.69,
			        "word": " Now",
			      },
			      {
			        "end": 70.53,
			        "start": 69.9,
			        "word": " again",
			      },
			      {
			        "end": 70.58,
			        "start": 70.53,
			        "word": " these",
			      },
			      {
			        "end": 70.79,
			        "start": 70.58,
			        "word": " are",
			      },
			      {
			        "end": 71.03,
			        "start": 70.79,
			        "word": " not",
			      },
			      {
			        "end": 71.21,
			        "start": 71.03,
			        "word": " the",
			      },
			      {
			        "end": 71.49,
			        "start": 71.21,
			        "word": " best",
			      },
			      {
			        "end": 71.7,
			        "start": 71.49,
			        "word": " and",
			      },
			      {
			        "end": 71.98,
			        "start": 71.7,
			        "word": " they",
			      },
			      {
			        "end": 72.18,
			        "start": 71.98,
			        "word": "'re",
			      },
			      {
			        "end": 72.42,
			        "start": 72.18,
			        "word": " not",
			      },
			      {
			        "end": 72.75,
			        "start": 72.42,
			        "word": " the",
			      },
			      {
			        "end": 72.88,
			        "start": 72.75,
			        "word": " most",
			      },
			      {
			        "end": 73.6,
			        "start": 72.88,
			        "word": " preferred",
			      },
			      {
			        "end": 74.26,
			        "start": 73.6,
			        "word": " hardware",
			      },
			      {
			        "end": 74.33,
			        "start": 74.26,
			        "word": " but",
			      },
			      {
			        "end": 74.54,
			        "start": 74.33,
			        "word": " they",
			      },
			      {
			        "end": 74.75,
			        "start": 74.54,
			        "word": " may",
			      },
			      {
			        "end": 74.89,
			        "start": 74.75,
			        "word": " be",
			      },
			      {
			        "end": 75.17,
			        "start": 74.89,
			        "word": " good",
			      },
			      {
			        "end": 75.58,
			        "start": 75.17,
			        "word": " enough",
			      },
			      {
			        "end": 75.88,
			        "start": 75.58,
			        "word": " and",
			      },
			      {
			        "end": 76.36,
			        "start": 75.88,
			        "word": " getting",
			      },
			      {
			        "end": 76.73,
			        "start": 76.36,
			        "word": " better",
			      },
			      {
			        "end": 77.08,
			        "start": 76.73,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 82.99,
			    "start": 77.08,
			    "text": " Now there's already reports that ByteDance Baidu and DeepSeek are testing Huawei chips in their AI building.",
			    "words": [
			      {
			        "end": 77.12,
			        "start": 77.08,
			        "word": " Now",
			      },
			      {
			        "end": 77.43,
			        "start": 77.12,
			        "word": " there",
			      },
			      {
			        "end": 77.55,
			        "start": 77.43,
			        "word": "'s",
			      },
			      {
			        "end": 77.99,
			        "start": 77.55,
			        "word": " already",
			      },
			      {
			        "end": 78.43,
			        "start": 77.99,
			        "word": " reports",
			      },
			      {
			        "end": 78.68,
			        "start": 78.43,
			        "word": " that",
			      },
			      {
			        "end": 78.8,
			        "start": 78.68,
			        "word": " By",
			      },
			      {
			        "end": 78.92,
			        "start": 78.8,
			        "word": "te",
			      },
			      {
			        "end": 78.97,
			        "start": 78.92,
			        "word": "D",
			      },
			      {
			        "end": 79.24,
			        "start": 78.97,
			        "word": "ance",
			      },
			      {
			        "end": 79.35,
			        "start": 79.24,
			        "word": " Ba",
			      },
			      {
			        "end": 79.51,
			        "start": 79.35,
			        "word": "id",
			      },
			      {
			        "end": 79.53,
			        "start": 79.51,
			        "word": "u",
			      },
			      {
			        "end": 79.74,
			        "start": 79.53,
			        "word": " and",
			      },
			      {
			        "end": 80.04,
			        "start": 79.74,
			        "word": " Deep",
			      },
			      {
			        "end": 80.09,
			        "start": 80.04,
			        "word": "Se",
			      },
			      {
			        "end": 80.21,
			        "start": 80.09,
			        "word": "ek",
			      },
			      {
			        "end": 80.4,
			        "start": 80.21,
			        "word": " are",
			      },
			      {
			        "end": 80.83,
			        "start": 80.4,
			        "word": " testing",
			      },
			      {
			        "end": 81.51,
			        "start": 80.83,
			        "word": " Huawei",
			      },
			      {
			        "end": 81.53,
			        "start": 81.51,
			        "word": " chips",
			      },
			      {
			        "end": 81.65,
			        "start": 81.53,
			        "word": " in",
			      },
			      {
			        "end": 81.96,
			        "start": 81.65,
			        "word": " their",
			      },
			      {
			        "end": 82.54,
			        "start": 81.96,
			        "word": " AI",
			      },
			      {
			        "end": 82.78,
			        "start": 82.54,
			        "word": " building",
			      },
			      {
			        "end": 82.99,
			        "start": 82.78,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 110.48,
			    "start": 82.99,
			    "text": " Now of course those restrictions. Oh Kelly you touched on this would certainly hurt Nvidia as well. It's age 20s. As I said they're the industry standard in China. They generate billions of dollars. It's going to be really key to guidance when it reports tomorrow. And that helps explain why Nvidia has been so uncharacteristically outspoken against new tariffs saying that they play into the hands of U.S. adversaries. They mean Huawei specifically. Oh and a reminder again of the competition in this fight dear.",
			    "words": [
			      {
			        "end": 83.16,
			        "start": 82.99,
			        "word": " Now",
			      },
			      {
			        "end": 83.24,
			        "start": 83.16,
			        "word": " of",
			      },
			      {
			        "end": 83.32,
			        "start": 83.24,
			        "word": "",
			      },
			      {
			        "end": 83.58,
			        "start": 83.32,
			        "word": " course",
			      },
			      {
			        "end": 83.87,
			        "start": 83.58,
			        "word": " those",
			      },
			      {
			        "end": 84.83,
			        "start": 83.87,
			        "word": " restrictions. Oh",
			      },
			      {
			        "end": 85.11,
			        "start": 84.83,
			        "word": " Kelly",
			      },
			      {
			        "end": 85.28,
			        "start": 85.11,
			        "word": " you",
			      },
			      {
			        "end": 85.67,
			        "start": 85.28,
			        "word": " touched",
			      },
			      {
			        "end": 85.89,
			        "start": 85.67,
			        "word": " on",
			      },
			      {
			        "end": 86.1,
			        "start": 85.89,
			        "word": " this",
			      },
			      {
			        "end": 86.3,
			        "start": 86.1,
			        "word": " would",
			      },
			      {
			        "end": 86.81,
			        "start": 86.3,
			        "word": " certainly",
			      },
			      {
			        "end": 87.04,
			        "start": 86.81,
			        "word": " hurt",
			      },
			      {
			        "end": 87.39,
			        "start": 87.04,
			        "word": " Nvidia",
			      },
			      {
			        "end": 87.49,
			        "start": 87.39,
			        "word": " as",
			      },
			      {
			        "end": 88.1,
			        "start": 87.49,
			        "word": " well. It",
			      },
			      {
			        "end": 88.1,
			        "start": 88.1,
			        "word": "'s",
			      },
			      {
			        "end": 88.35,
			        "start": 88.1,
			        "word": " age",
			      },
			      {
			        "end": 88.62,
			        "start": 88.35,
			        "word": " 20",
			      },
			      {
			        "end": 88.95,
			        "start": 88.62,
			        "word": "s. As",
			      },
			      {
			        "end": 89,
			        "start": 88.95,
			        "word": " I",
			      },
			      {
			        "end": 89.41,
			        "start": 89,
			        "word": " said",
			      },
			      {
			        "end": 89.42,
			        "start": 89.41,
			        "word": " they",
			      },
			      {
			        "end": 89.48,
			        "start": 89.42,
			        "word": "'re",
			      },
			      {
			        "end": 89.7,
			        "start": 89.48,
			        "word": " the",
			      },
			      {
			        "end": 90.16,
			        "start": 89.7,
			        "word": " industry",
			      },
			      {
			        "end": 90.66,
			        "start": 90.16,
			        "word": " standard",
			      },
			      {
			        "end": 90.77,
			        "start": 90.66,
			        "word": " in",
			      },
			      {
			        "end": 91.52,
			        "start": 90.77,
			        "word": " China. They",
			      },
			      {
			        "end": 92.03,
			        "start": 91.52,
			        "word": " generate",
			      },
			      {
			        "end": 92.52,
			        "start": 92.03,
			        "word": " billions",
			      },
			      {
			        "end": 92.64,
			        "start": 92.52,
			        "word": " of",
			      },
			      {
			        "end": 93.36,
			        "start": 92.64,
			        "word": " dollars. It",
			      },
			      {
			        "end": 93.49,
			        "start": 93.36,
			        "word": "'s",
			      },
			      {
			        "end": 93.8,
			        "start": 93.49,
			        "word": " going",
			      },
			      {
			        "end": 93.92,
			        "start": 93.8,
			        "word": " to",
			      },
			      {
			        "end": 94.09,
			        "start": 93.92,
			        "word": " be",
			      },
			      {
			        "end": 94.41,
			        "start": 94.09,
			        "word": " really",
			      },
			      {
			        "end": 94.59,
			        "start": 94.41,
			        "word": " key",
			      },
			      {
			        "end": 94.81,
			        "start": 94.59,
			        "word": " to",
			      },
			      {
			        "end": 95.21,
			        "start": 94.81,
			        "word": " guidance",
			      },
			      {
			        "end": 95.52,
			        "start": 95.21,
			        "word": " when",
			      },
			      {
			        "end": 95.67,
			        "start": 95.52,
			        "word": " it",
			      },
			      {
			        "end": 96.16,
			        "start": 95.67,
			        "word": " reports",
			      },
			      {
			        "end": 97.04,
			        "start": 96.16,
			        "word": " tomorrow. And",
			      },
			      {
			        "end": 97.36,
			        "start": 97.04,
			        "word": " that",
			      },
			      {
			        "end": 97.62,
			        "start": 97.36,
			        "word": " helps",
			      },
			      {
			        "end": 98.07,
			        "start": 97.62,
			        "word": " explain",
			      },
			      {
			        "end": 98.53,
			        "start": 98.07,
			        "word": " why",
			      },
			      {
			        "end": 98.64,
			        "start": 98.53,
			        "word": " Nvidia",
			      },
			      {
			        "end": 98.83,
			        "start": 98.64,
			        "word": " has",
			      },
			      {
			        "end": 99.08,
			        "start": 98.83,
			        "word": " been",
			      },
			      {
			        "end": 99.21,
			        "start": 99.08,
			        "word": " so",
			      },
			      {
			        "end": 99.32,
			        "start": 99.21,
			        "word": " un",
			      },
			      {
			        "end": 99.66,
			        "start": 99.32,
			        "word": "char",
			      },
			      {
			        "end": 99.89,
			        "start": 99.66,
			        "word": "acter",
			      },
			      {
			        "end": 100.49,
			        "start": 99.89,
			        "word": "istically",
			      },
			      {
			        "end": 100.65,
			        "start": 100.49,
			        "word": " out",
			      },
			      {
			        "end": 100.77,
			        "start": 100.65,
			        "word": "sp",
			      },
			      {
			        "end": 101.02,
			        "start": 100.77,
			        "word": "oken",
			      },
			      {
			        "end": 101.47,
			        "start": 101.02,
			        "word": " against",
			      },
			      {
			        "end": 101.66,
			        "start": 101.47,
			        "word": " new",
			      },
			      {
			        "end": 102.44,
			        "start": 101.66,
			        "word": " tariffs",
			      },
			      {
			        "end": 102.6,
			        "start": 102.44,
			        "word": " saying",
			      },
			      {
			        "end": 102.76,
			        "start": 102.6,
			        "word": " that",
			      },
			      {
			        "end": 102.88,
			        "start": 102.76,
			        "word": " they",
			      },
			      {
			        "end": 103.13,
			        "start": 102.88,
			        "word": " play",
			      },
			      {
			        "end": 103.38,
			        "start": 103.13,
			        "word": " into",
			      },
			      {
			        "end": 103.57,
			        "start": 103.38,
			        "word": " the",
			      },
			      {
			        "end": 103.89,
			        "start": 103.57,
			        "word": " hands",
			      },
			      {
			        "end": 104.02,
			        "start": 103.89,
			        "word": " of",
			      },
			      {
			        "end": 104.9,
			        "start": 104.02,
			        "word": " U.S. advers",
			      },
			      {
			        "end": 105.66,
			        "start": 104.9,
			        "word": "aries. They",
			      },
			      {
			        "end": 105.94,
			        "start": 105.66,
			        "word": " mean",
			      },
			      {
			        "end": 106.29,
			        "start": 105.94,
			        "word": " Huawei",
			      },
			      {
			        "end": 107.39,
			        "start": 106.29,
			        "word": " specifically. Oh",
			      },
			      {
			        "end": 107.57,
			        "start": 107.39,
			        "word": " and",
			      },
			      {
			        "end": 107.63,
			        "start": 107.57,
			        "word": " a",
			      },
			      {
			        "end": 108.14,
			        "start": 107.63,
			        "word": " reminder",
			      },
			      {
			        "end": 108.46,
			        "start": 108.14,
			        "word": " again",
			      },
			      {
			        "end": 108.59,
			        "start": 108.46,
			        "word": " of",
			      },
			      {
			        "end": 108.78,
			        "start": 108.59,
			        "word": " the",
			      },
			      {
			        "end": 109.49,
			        "start": 108.78,
			        "word": " competition",
			      },
			      {
			        "end": 109.76,
			        "start": 109.49,
			        "word": " in",
			      },
			      {
			        "end": 109.96,
			        "start": 109.76,
			        "word": " this",
			      },
			      {
			        "end": 110.04,
			        "start": 109.96,
			        "word": "",
			      },
			      {
			        "end": 110.18,
			        "start": 110.04,
			        "word": " fight",
			      },
			      {
			        "end": 110.35,
			        "start": 110.18,
			        "word": " dear",
			      },
			      {
			        "end": 110.48,
			        "start": 110.35,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 111.13,
			    "start": 110.48,
			    "text": " Thanks for now.",
			    "words": [
			      {
			        "end": 110.74,
			        "start": 110.48,
			        "word": " Thanks",
			      },
			      {
			        "end": 110.87,
			        "start": 110.74,
			        "word": " for",
			      },
			      {
			        "end": 111,
			        "start": 110.87,
			        "word": " now",
			      },
			      {
			        "end": 111.13,
			        "start": 111,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 113.03,
			    "start": 111.13,
			    "text": " Again we'll hear from Nvidia tomorrow afternoon.",
			    "words": [
			      {
			        "end": 111.35,
			        "start": 111.13,
			        "word": " Again",
			      },
			      {
			        "end": 111.43,
			        "start": 111.35,
			        "word": " we",
			      },
			      {
			        "end": 111.56,
			        "start": 111.43,
			        "word": "'ll",
			      },
			      {
			        "end": 111.73,
			        "start": 111.56,
			        "word": " hear",
			      },
			      {
			        "end": 111.92,
			        "start": 111.73,
			        "word": " from",
			      },
			      {
			        "end": 112.24,
			        "start": 111.92,
			        "word": " Nvidia",
			      },
			      {
			        "end": 112.51,
			        "start": 112.24,
			        "word": " tomorrow",
			      },
			      {
			        "end": 112.9,
			        "start": 112.51,
			        "word": " afternoon",
			      },
			      {
			        "end": 113.03,
			        "start": 112.9,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 114.16,
			    "start": 113.03,
			    "text": " Maybe some more color on that.",
			    "words": [
			      {
			        "end": 113.24,
			        "start": 113.03,
			        "word": " Maybe",
			      },
			      {
			        "end": 113.42,
			        "start": 113.24,
			        "word": " some",
			      },
			      {
			        "end": 113.6,
			        "start": 113.42,
			        "word": " more",
			      },
			      {
			        "end": 113.81,
			        "start": 113.6,
			        "word": " color",
			      },
			      {
			        "end": 113.89,
			        "start": 113.81,
			        "word": " on",
			      },
			      {
			        "end": 114.16,
			        "start": 113.89,
			        "word": " that",
			      },
			      {
			        "end": 114.16,
			        "start": 114.16,
			        "word": ".",
			      },
			    ],
			  },
			]
		`)
	})
})
