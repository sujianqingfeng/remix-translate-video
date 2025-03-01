import fsp from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { splitTextToSentences } from '../align'
import { alignWordsAndSentences } from '../transcript'

const getWords = async () => {
	const currentDir = import.meta.dirname
	const p = path.join(currentDir, './test.json')
	const result = await fsp.readFile(p, 'utf-8')
	const data = JSON.parse(result)

	const words = data.transcription.map((item: any) => ({
		word: item.text,
		start: item.offsets.from / 1000,
		end: item.offsets.to / 1000,
	}))

	const text = words.reduce((acc: string, item: any) => {
		return acc + item.word
	}, '')

	return { words, text }
}

describe('align', () => {
	it('splitTextToSentences', async () => {
		const { text, words } = await getWords()
		// console.log(text)
		const sentences = splitTextToSentences({ text })
		// expect(sentences).toMatchInlineSnapshot(`
		// 	[
		// 	  "You've probably heard all of this talk recently about the amount of aid that's been going to Ukraine",
		// 	  "about whether the U.S",
		// 	  "is going to be able to get billions of dollars back for that aid",
		// 	  "What's really going on",
		// 	  "Well I'm going to give you a little primer here a quick guide to all of this stuff",
		// 	  "starting with how much money has been given in terms of aid",
		// 	  "There's various different categories of aid",
		// 	  "So military aid, that's Europe, 62 billion euros",
		// 	  "The U.S",
		// 	  "slightly further ahead, 64 billion euros of military aid from the U.S",
		// 	  "But of course",
		// 	  "that's not the only kind of thing and the only kind of support gone out to Ukraine. There's also other aid",
		// 	  "There's humanitarian, there's financial aid",
		// 	  "That brings up the European total to about 132 and it's higher than the U.S",
		// 	  "Europe looks even further ahead",
		// 	  "And if you include other things so the aid that's been promised but hasn't yet been delivered",
		// 	  "And interestingly",
		// 	  "if you look back through the kind of history of this conflict and just how much that aid has crept up",
		// 	  "that's European aid and how much it's crept up since 2022",
		// 	  "that's Europe. It's gone up relatively steadily",
		// 	  "Look at the U.S",
		// 	  "That's gone up",
		// 	  "It was steady for a while. Then it was flatlining and then it went up again",
		// 	  "What was going on there? It was that when Congress was blocking the new support",
		// 	  "So you really see it there kind of visually in terms of the aid that was handed over or wasn't handed over to Ukraine. But kind of back to this",
		// 	  "the big picture here okay so this includes a lot of different countries",
		// 	  "So if we want to get a better sense of comparing different countries and how much they've given",
		// 	  "you really need to divide it by every single individual nation",
		// 	  "And we can do that here. Okay so this is individual countries not just Europe as a whole",
		// 	  "individual countries",
		// 	  "And it's clear the U.S",
		// 	  "is comfortably the single biggest donor in cash terms",
		// 	  "There you've got the U.K",
		// 	  "down there and Germany among the biggest donors, but nowhere near where the U.S",
		// 	  "is",
		// 	  "But that's the key point, the cash terms",
		// 	  "Okay, now do it as a percentage of the size of the economy",
		// 	  "And it's a different picture. Okay, so same data, but as a percentage of GDP",
		// 	  "And look, it's different",
		// 	  "Okay, so the U.S",
		// 	  "and the U.K",
		// 	  "about 0.5% of their GDP, which is a better way of comparing it, really",
		// 	  "Whereas it's countries like Estonia and Denmark the Baltics Finland Sweden places like that",
		// 	  "which are giving much more of their national income to support Ukraine. And then places like Germany",
		// 	  "even further down because it's got a bigger GDP",
		// 	  "So quite striking there. Worth saying though to get a bit of a historical context here",
		// 	  "let's compare how much aid has been given this time around with previous conflicts",
		// 	  "So this is specifically U.S",
		// 	  "aid to Ukraine this time around",
		// 	  "That bar is there. It's 0.3 because it's just that's the annual figure rather than for the entire period",
		// 	  "This is World War II",
		// 	  "So World War II lend-lease far more. U.S",
		// 	  "and Korea far more. Vietnam far more. Gulf War",
		// 	  "far more. Ukraine is tiny in comparison to all of those things",
		// 	  "Still, you know, sizable in cash terms, but compared with those, really quite small",
		// 	  "And it's not just the U.S",
		// 	  "So take the Gulf War and look at how much different countries paid for the Gulf War in terms of support",
		// 	  "particularly for Kuwait",
		// 	  "U.S., Germany, U.K., Japan, that's Gulf War, those bars",
		// 	  "Now compare it to Ukraine. I'll bring up those bars",
		// 	  "So it was smaller",
		// 	  "So less money going to support Ukraine this time around than went for the Gulf War from basically all of those major economies",
		// 	  "Quite striking, really, isn't it",
		// 	  "However okay every country can contribute to more. Worth just saying okay",
		// 	  "so when it comes to these bars there's been so much debate recently particularly from Donald Trump",
		// 	  "a bit of a conversation with Emmanuel Macron about this",
		// 	  "about how much of this European money was actually a loan",
		// 	  "So it's going to come back",
		// 	  "And that's what Donald Trump claimed",
		// 	  "It's not entirely true. It's about kind of one third true because some of this money",
		// 	  "particularly the financial aid was structured as a loan",
		// 	  "So some of that money theoretically will come back to Europe after a long period",
		// 	  "It's a pretty lax loan",
		// 	  "But still, it is a loan, whereas that's a grant",
		// 	  "And that is why Donald Trump is saying, look, we take that money",
		// 	  "We need to get something back",
		// 	  "Okay",
		// 	  "And he says he's done a deal or at least he's in the process of doing a deal",
		// 	  "certainly nothing's been signed yet with the Ukrainian president",
		// 	  "where he thinks it could be $500 billion back in return for all of that aid given",
		// 	  "You're probably wondering at this stage how on earth do you get $500 billion out of Ukraine? Well",
		// 	  "the answer he says is rare earths",
		// 	  "What are rare earths",
		// 	  "They're a type of critical mineral, mostly used in electronics and military equipment as well",
		// 	  "And there are some rare earths deposits in Ukraine. This is a kind of mineral map of the country",
		// 	  "If we zoom into this area here it's in actually the occupied territory which is I think",
		// 	  "part of the point here. And the Ukrainians were suggesting this",
		// 	  "Old Soviet deposit here supposedly has lots of rare earths",
		// 	  "The issue though and the reason of course obviously Donald Trump wants to do this",
		// 	  "is when you look at total rare earth production around the world",
		// 	  "and you need rare earths for like electric cars for the magnets in those cars",
		// 	  "for all of those wind turbines it's magnets it's military equipment",
		// 	  "China is massively dominant when it comes to mining rare earths",
		// 	  "It's massively dominant when it comes to refining rare earths",
		// 	  "which is really the hardest thing to do when it comes to rare earths",
		// 	  "because it's really expensive. It's really energy intensive. Totally totally dominant",
		// 	  "So you can see again",
		// 	  "the geopolitical reasons why Donald Trump might want to think Ukraine might solve you know",
		// 	  "kill two birds with one stone here. However look at the actual data",
		// 	  "and it's not altogether obvious that there are many rare earths in Ukraine. Even if you take account of that mine",
		// 	  "which like I say it's been around for a long time",
		// 	  "entirely sure if you can get those rare earths out of it",
		// 	  "It's still China way in the lead",
		// 	  "Brazil, India, Russia, Vietnam, the US",
		// 	  "Actually",
		// 	  "Ukraine doesn't even show up in the most definitive measures of how much rare earths there are around the world",
		// 	  "So some people have been wondering some people have wondered",
		// 	  "was he not really talking about critical minerals in general",
		// 	  "Maybe he was talking not about rare earths but about lithium",
		// 	  "which technically speaking is a different part of the periodic table. Well if that's the case yes",
		// 	  "there's a big lithium deposit in Ukraine potentially the biggest in Europe. But here's the thing",
		// 	  "Europe doesn't have that much lithium",
		// 	  "And compare this with other deposits around the world",
		// 	  "I've put it over here. And that, by the way, is a best case scenario",
		// 	  "And Ukraine is still a minnow",
		// 	  "It's smaller than Canada",
		// 	  "It's smaller than the US when it comes to lithium, even bearing that in mind",
		// 	  "And so perhaps it just might be you know there are lots of minerals in Ukraine. But for the most part",
		// 	  "it's the old fashioned stuff",
		// 	  "It's coal it's iron ore there's lots of iron ore around",
		// 	  "around there. And it's also things like titanium",
		// 	  "And so probably the most plausible explanation is that the president maybe thinks he can make some money out of those things",
		// 	  "But I would still question even bearing all of that in mind",
		// 	  "it's going to be very difficult to get to that $500 billion total",
		// 	]
		// `)

		const result = alignWordsAndSentences(words, sentences)
		expect(result).toMatchInlineSnapshot(`
			[
			  {
			    "end": 4.12,
			    "start": 0.36,
			    "text": "You've probably heard all of this talk recently about the amount of aid that's been going to Ukraine",
			    "words": [
			      {
			        "end": 0.18,
			        "start": 0.36,
			        "word": " You",
			      },
			      {
			        "end": 0.58,
			        "start": 0.18,
			        "word": "'ve",
			      },
			      {
			        "end": 0.86,
			        "start": 0.58,
			        "word": " probably",
			      },
			      {
			        "end": 1.27,
			        "start": 0.86,
			        "word": " heard",
			      },
			      {
			        "end": 1.35,
			        "start": 1.27,
			        "word": " all",
			      },
			      {
			        "end": 1.47,
			        "start": 1.35,
			        "word": " of",
			      },
			      {
			        "end": 1.72,
			        "start": 1.47,
			        "word": " this",
			      },
			      {
			        "end": 1.97,
			        "start": 1.72,
			        "word": " talk",
			      },
			      {
			        "end": 2.52,
			        "start": 1.97,
			        "word": " recently",
			      },
			      {
			        "end": 2.85,
			        "start": 2.52,
			        "word": " about",
			      },
			      {
			        "end": 3.04,
			        "start": 2.85,
			        "word": " the",
			      },
			      {
			        "end": 3.52,
			        "start": 3.04,
			        "word": " amount",
			      },
			      {
			        "end": 3.56,
			        "start": 3.52,
			        "word": " of",
			      },
			      {
			        "end": 3.78,
			        "start": 3.56,
			        "word": " aid",
			      },
			      {
			        "end": 3.92,
			        "start": 3.78,
			        "word": " that",
			      },
			      {
			        "end": 4.02,
			        "start": 3.92,
			        "word": "'s",
			      },
			      {
			        "end": 4.12,
			        "start": 4.02,
			        "word": " been",
			      },
			    ],
			  },
			  {
			    "end": 5.7,
			    "start": 4.91,
			    "text": "about whether the U.S",
			    "words": [
			      {
			        "end": 5.17,
			        "start": 4.91,
			        "word": " about",
			      },
			      {
			        "end": 5.54,
			        "start": 5.17,
			        "word": " whether",
			      },
			      {
			        "end": 5.7,
			        "start": 5.54,
			        "word": " the",
			      },
			    ],
			  },
			  {
			    "end": 8.25,
			    "start": 6.12,
			    "text": "is going to be able to get billions of dollars back for that aid",
			    "words": [
			      {
			        "end": 6.22,
			        "start": 6.12,
			        "word": " is",
			      },
			      {
			        "end": 6.48,
			        "start": 6.22,
			        "word": " going",
			      },
			      {
			        "end": 6.62,
			        "start": 6.48,
			        "word": " to",
			      },
			      {
			        "end": 6.78,
			        "start": 6.62,
			        "word": " be",
			      },
			      {
			        "end": 6.89,
			        "start": 6.78,
			        "word": " able",
			      },
			      {
			        "end": 6.99,
			        "start": 6.89,
			        "word": " to",
			      },
			      {
			        "end": 7.15,
			        "start": 6.99,
			        "word": " get",
			      },
			      {
			        "end": 7.57,
			        "start": 7.15,
			        "word": " billions",
			      },
			      {
			        "end": 7.65,
			        "start": 7.57,
			        "word": " of",
			      },
			      {
			        "end": 8.16,
			        "start": 7.65,
			        "word": " dollars",
			      },
			      {
			        "end": 8.25,
			        "start": 8.16,
			        "word": " back",
			      },
			    ],
			  },
			  {
			    "end": 9.76,
			    "start": 9.04,
			    "text": "What's really going on",
			    "words": [
			      {
			        "end": 9.08,
			        "start": 9.04,
			        "word": " What",
			      },
			      {
			        "end": 9.49,
			        "start": 9.08,
			        "word": "'s",
			      },
			      {
			        "end": 9.55,
			        "start": 9.49,
			        "word": " really",
			      },
			      {
			        "end": 9.76,
			        "start": 9.55,
			        "word": " going",
			      },
			    ],
			  },
			  {
			    "end": 12.62,
			    "start": 9.97,
			    "text": "Well I'm going to give you a little primer here a quick guide to all of this stuff",
			    "words": [
			      {
			        "end": 10.14,
			        "start": 9.97,
			        "word": " Well",
			      },
			      {
			        "end": 10.22,
			        "start": 10.14,
			        "word": ",",
			      },
			      {
			        "end": 10.26,
			        "start": 10.22,
			        "word": " I",
			      },
			      {
			        "end": 10.34,
			        "start": 10.26,
			        "word": "'m",
			      },
			      {
			        "end": 10.54,
			        "start": 10.34,
			        "word": " going",
			      },
			      {
			        "end": 10.63,
			        "start": 10.54,
			        "word": " to",
			      },
			      {
			        "end": 10.8,
			        "start": 10.63,
			        "word": " give",
			      },
			      {
			        "end": 10.93,
			        "start": 10.8,
			        "word": " you",
			      },
			      {
			        "end": 10.97,
			        "start": 10.93,
			        "word": " a",
			      },
			      {
			        "end": 11.31,
			        "start": 10.97,
			        "word": " little",
			      },
			      {
			        "end": 11.49,
			        "start": 11.31,
			        "word": " primer",
			      },
			      {
			        "end": 11.66,
			        "start": 11.49,
			        "word": " here",
			      },
			      {
			        "end": 11.84,
			        "start": 11.66,
			        "word": ",",
			      },
			      {
			        "end": 11.93,
			        "start": 11.84,
			        "word": " a",
			      },
			      {
			        "end": 12.29,
			        "start": 11.93,
			        "word": " quick",
			      },
			      {
			        "end": 12.5,
			        "start": 12.29,
			        "word": " guide",
			      },
			      {
			        "end": 12.62,
			        "start": 12.5,
			        "word": " to",
			      },
			    ],
			  },
			  {
			    "end": 15.85,
			    "start": 13.69,
			    "text": "starting with how much money has been given in terms of aid",
			    "words": [
			      {
			        "end": 13.95,
			        "start": 13.69,
			        "word": " starting",
			      },
			      {
			        "end": 14.22,
			        "start": 13.95,
			        "word": " with",
			      },
			      {
			        "end": 14.33,
			        "start": 14.22,
			        "word": " how",
			      },
			      {
			        "end": 14.59,
			        "start": 14.33,
			        "word": " much",
			      },
			      {
			        "end": 14.82,
			        "start": 14.59,
			        "word": " money",
			      },
			      {
			        "end": 14.98,
			        "start": 14.82,
			        "word": " has",
			      },
			      {
			        "end": 15.2,
			        "start": 14.98,
			        "word": " been",
			      },
			      {
			        "end": 15.48,
			        "start": 15.2,
			        "word": " given",
			      },
			      {
			        "end": 15.7,
			        "start": 15.48,
			        "word": " in",
			      },
			      {
			        "end": 15.85,
			        "start": 15.7,
			        "word": " terms",
			      },
			    ],
			  },
			  {
			    "end": 18.29,
			    "start": 16.28,
			    "text": "There's various different categories of aid",
			    "words": [
			      {
			        "end": 16.55,
			        "start": 16.28,
			        "word": " There",
			      },
			      {
			        "end": 16.66,
			        "start": 16.55,
			        "word": "'s",
			      },
			      {
			        "end": 17.14,
			        "start": 16.66,
			        "word": " various",
			      },
			      {
			        "end": 17.69,
			        "start": 17.14,
			        "word": " different",
			      },
			      {
			        "end": 18.29,
			        "start": 17.69,
			        "word": " categories",
			      },
			    ],
			  },
			  {
			    "end": 21.29,
			    "start": 18.79,
			    "text": "So military aid, that's Europe, 62 billion euros",
			    "words": [
			      {
			        "end": 18.89,
			        "start": 18.79,
			        "word": " So",
			      },
			      {
			        "end": 19.55,
			        "start": 18.89,
			        "word": " military",
			      },
			      {
			        "end": 19.59,
			        "start": 19.55,
			        "word": " aid",
			      },
			      {
			        "end": 19.67,
			        "start": 19.59,
			        "word": ",",
			      },
			      {
			        "end": 19.91,
			        "start": 19.67,
			        "word": " that",
			      },
			      {
			        "end": 20.03,
			        "start": 19.91,
			        "word": "'s",
			      },
			      {
			        "end": 20.4,
			        "start": 20.03,
			        "word": " Europe",
			      },
			      {
			        "end": 20.51,
			        "start": 20.4,
			        "word": ",",
			      },
			      {
			        "end": 21.13,
			        "start": 20.51,
			        "word": " 62",
			      },
			      {
			        "end": 21.29,
			        "start": 21.13,
			        "word": " billion",
			      },
			    ],
			  },
			  {
			    "end": 22.07,
			    "start": 21.77,
			    "text": "The U.S",
			    "words": [
			      {
			        "end": 21.95,
			        "start": 21.77,
			        "word": " The",
			      },
			      {
			        "end": 22.07,
			        "start": 21.95,
			        "word": " U",
			      },
			    ],
			  },
			  {
			    "end": 25.61,
			    "start": 22.54,
			    "text": "slightly further ahead, 64 billion euros of military aid from the U.S",
			    "words": [
			      {
			        "end": 23.16,
			        "start": 22.54,
			        "word": " slightly",
			      },
			      {
			        "end": 23.54,
			        "start": 23.16,
			        "word": " further",
			      },
			      {
			        "end": 23.84,
			        "start": 23.54,
			        "word": " ahead",
			      },
			      {
			        "end": 23.92,
			        "start": 23.84,
			        "word": ",",
			      },
			      {
			        "end": 24.36,
			        "start": 23.92,
			        "word": " 64",
			      },
			      {
			        "end": 24.63,
			        "start": 24.36,
			        "word": " billion",
			      },
			      {
			        "end": 24.9,
			        "start": 24.63,
			        "word": " euros",
			      },
			      {
			        "end": 25.01,
			        "start": 24.9,
			        "word": " of",
			      },
			      {
			        "end": 25.53,
			        "start": 25.01,
			        "word": " military",
			      },
			      {
			        "end": 25.61,
			        "start": 25.53,
			        "word": " aid",
			      },
			    ],
			  },
			  {
			    "end": 27.01,
			    "start": 26.52,
			    "text": "But of course",
			    "words": [
			      {
			        "end": 26.57,
			        "start": 26.52,
			        "word": " But",
			      },
			      {
			        "end": 26.68,
			        "start": 26.57,
			        "word": " of",
			      },
			      {
			        "end": 27.01,
			        "start": 26.68,
			        "word": " course",
			      },
			    ],
			  },
			  {
			    "end": 31.38,
			    "start": 27.12,
			    "text": "that's not the only kind of thing and the only kind of support gone out to Ukraine. There's also other aid",
			    "words": [
			      {
			        "end": 27.38,
			        "start": 27.12,
			        "word": " that",
			      },
			      {
			        "end": 27.45,
			        "start": 27.38,
			        "word": "'s",
			      },
			      {
			        "end": 27.65,
			        "start": 27.45,
			        "word": " not",
			      },
			      {
			        "end": 27.86,
			        "start": 27.65,
			        "word": " the",
			      },
			      {
			        "end": 28.04,
			        "start": 27.86,
			        "word": " only",
			      },
			      {
			        "end": 28.04,
			        "start": 28.04,
			        "word": "",
			      },
			      {
			        "end": 28.27,
			        "start": 28.04,
			        "word": " kind",
			      },
			      {
			        "end": 28.47,
			        "start": 28.27,
			        "word": " of",
			      },
			      {
			        "end": 28.67,
			        "start": 28.47,
			        "word": " thing",
			      },
			      {
			        "end": 28.97,
			        "start": 28.67,
			        "word": " and",
			      },
			      {
			        "end": 29.01,
			        "start": 28.97,
			        "word": " the",
			      },
			      {
			        "end": 29.24,
			        "start": 29.01,
			        "word": " only",
			      },
			      {
			        "end": 29.47,
			        "start": 29.24,
			        "word": " kind",
			      },
			      {
			        "end": 29.58,
			        "start": 29.47,
			        "word": " of",
			      },
			      {
			        "end": 30.02,
			        "start": 29.58,
			        "word": " support",
			      },
			      {
			        "end": 30.22,
			        "start": 30.02,
			        "word": " gone",
			      },
			      {
			        "end": 30.39,
			        "start": 30.22,
			        "word": " out",
			      },
			      {
			        "end": 30.5,
			        "start": 30.39,
			        "word": " to",
			      },
			      {
			        "end": 30.93,
			        "start": 30.5,
			        "word": " Ukraine",
			      },
			      {
			        "end": 31.18,
			        "start": 30.93,
			        "word": ".",
			      },
			      {
			        "end": 31.38,
			        "start": 31.18,
			        "word": " There",
			      },
			    ],
			  },
			  {
			    "end": 33.71,
			    "start": 32.1,
			    "text": "There's humanitarian, there's financial aid",
			    "words": [
			      {
			        "end": 32.37,
			        "start": 32.1,
			        "word": " There",
			      },
			      {
			        "end": 32.4,
			        "start": 32.37,
			        "word": "'s",
			      },
			      {
			        "end": 32.93,
			        "start": 32.4,
			        "word": " humanitarian",
			      },
			      {
			        "end": 33.01,
			        "start": 32.93,
			        "word": ",",
			      },
			      {
			        "end": 33.23,
			        "start": 33.01,
			        "word": " there",
			      },
			      {
			        "end": 33.31,
			        "start": 33.23,
			        "word": "'s",
			      },
			      {
			        "end": 33.71,
			        "start": 33.31,
			        "word": " financial",
			      },
			    ],
			  },
			  {
			    "end": 37.32,
			    "start": 34.12,
			    "text": "That brings up the European total to about 132 and it's higher than the U.S",
			    "words": [
			      {
			        "end": 34.14,
			        "start": 34.12,
			        "word": " That",
			      },
			      {
			        "end": 34.4,
			        "start": 34.14,
			        "word": " brings",
			      },
			      {
			        "end": 34.5,
			        "start": 34.4,
			        "word": " up",
			      },
			      {
			        "end": 34.62,
			        "start": 34.5,
			        "word": " the",
			      },
			      {
			        "end": 34.96,
			        "start": 34.62,
			        "word": " European",
			      },
			      {
			        "end": 35.18,
			        "start": 34.96,
			        "word": " total",
			      },
			      {
			        "end": 35.26,
			        "start": 35.18,
			        "word": " to",
			      },
			      {
			        "end": 35.6,
			        "start": 35.26,
			        "word": " about",
			      },
			      {
			        "end": 36.12,
			        "start": 35.6,
			        "word": " 13",
			      },
			      {
			        "end": 36.4,
			        "start": 36.12,
			        "word": "2",
			      },
			      {
			        "end": 36.68,
			        "start": 36.4,
			        "word": " and",
			      },
			      {
			        "end": 36.73,
			        "start": 36.68,
			        "word": " it",
			      },
			      {
			        "end": 36.79,
			        "start": 36.73,
			        "word": "'s",
			      },
			      {
			        "end": 37.32,
			        "start": 36.79,
			        "word": " higher",
			      },
			    ],
			  },
			  {
			    "end": 41.68,
			    "start": 37.98,
			    "text": "And if you include other things so the aid that's been promised but hasn't yet been delivered",
			    "words": [
			      {
			        "end": 38.15,
			        "start": 37.98,
			        "word": " And",
			      },
			      {
			        "end": 38.26,
			        "start": 38.15,
			        "word": " if",
			      },
			      {
			        "end": 38.49,
			        "start": 38.26,
			        "word": " you",
			      },
			      {
			        "end": 38.84,
			        "start": 38.49,
			        "word": " include",
			      },
			      {
			        "end": 39.13,
			        "start": 38.84,
			        "word": " other",
			      },
			      {
			        "end": 39.48,
			        "start": 39.13,
			        "word": " things",
			      },
			      {
			        "end": 39.59,
			        "start": 39.48,
			        "word": ",",
			      },
			      {
			        "end": 39.72,
			        "start": 39.59,
			        "word": " so",
			      },
			      {
			        "end": 39.87,
			        "start": 39.72,
			        "word": " the",
			      },
			      {
			        "end": 40.06,
			        "start": 39.87,
			        "word": " aid",
			      },
			      {
			        "end": 40.27,
			        "start": 40.06,
			        "word": " that",
			      },
			      {
			        "end": 40.56,
			        "start": 40.27,
			        "word": "'s",
			      },
			      {
			        "end": 40.78,
			        "start": 40.56,
			        "word": " been",
			      },
			      {
			        "end": 40.96,
			        "start": 40.78,
			        "word": " promised",
			      },
			      {
			        "end": 41.16,
			        "start": 40.96,
			        "word": " but",
			      },
			      {
			        "end": 41.43,
			        "start": 41.16,
			        "word": " hasn",
			      },
			      {
			        "end": 41.68,
			        "start": 41.43,
			        "word": "'t",
			      },
			    ],
			  },
			  {
			    "end": 44.25,
			    "start": 42.77,
			    "text": "Europe looks even further ahead",
			    "words": [
			      {
			        "end": 43.42,
			        "start": 42.77,
			        "word": " Europe",
			      },
			      {
			        "end": 43.51,
			        "start": 43.42,
			        "word": " looks",
			      },
			      {
			        "end": 43.77,
			        "start": 43.51,
			        "word": " even",
			      },
			      {
			        "end": 44.25,
			        "start": 43.77,
			        "word": " further",
			      },
			    ],
			  },
			  {
			    "end": 45.82,
			    "start": 44.83,
			    "text": "And interestingly",
			    "words": [
			      {
			        "end": 45.43,
			        "start": 44.83,
			        "word": " And",
			      },
			      {
			        "end": 45.82,
			        "start": 45.43,
			        "word": " interestingly",
			      },
			    ],
			  },
			  {
			    "end": 50.61,
			    "start": 45.96,
			    "text": "if you look back through the kind of history of this conflict and just how much that aid has crept up",
			    "words": [
			      {
			        "end": 46.12,
			        "start": 45.96,
			        "word": " if",
			      },
			      {
			        "end": 46.38,
			        "start": 46.12,
			        "word": " you",
			      },
			      {
			        "end": 46.74,
			        "start": 46.38,
			        "word": " look",
			      },
			      {
			        "end": 46.92,
			        "start": 46.74,
			        "word": " back",
			      },
			      {
			        "end": 47.39,
			        "start": 46.92,
			        "word": " through",
			      },
			      {
			        "end": 47.63,
			        "start": 47.39,
			        "word": " the",
			      },
			      {
			        "end": 47.86,
			        "start": 47.63,
			        "word": " kind",
			      },
			      {
			        "end": 47.99,
			        "start": 47.86,
			        "word": " of",
			      },
			      {
			        "end": 48.45,
			        "start": 47.99,
			        "word": " history",
			      },
			      {
			        "end": 48.59,
			        "start": 48.45,
			        "word": " of",
			      },
			      {
			        "end": 48.86,
			        "start": 48.59,
			        "word": " this",
			      },
			      {
			        "end": 49.41,
			        "start": 48.86,
			        "word": " conflict",
			      },
			      {
			        "end": 49.6,
			        "start": 49.41,
			        "word": " and",
			      },
			      {
			        "end": 49.87,
			        "start": 49.6,
			        "word": " just",
			      },
			      {
			        "end": 50.07,
			        "start": 49.87,
			        "word": " how",
			      },
			      {
			        "end": 50.34,
			        "start": 50.07,
			        "word": " much",
			      },
			      {
			        "end": 50.61,
			        "start": 50.34,
			        "word": " that",
			      },
			    ],
			  },
			  {
			    "end": 53.32,
			    "start": 51.58,
			    "text": "that's European aid and how much it's crept up since 2022",
			    "words": [
			      {
			        "end": 51.83,
			        "start": 51.58,
			        "word": " that",
			      },
			      {
			        "end": 51.85,
			        "start": 51.83,
			        "word": "'s",
			      },
			      {
			        "end": 52.22,
			        "start": 51.85,
			        "word": " European",
			      },
			      {
			        "end": 52.37,
			        "start": 52.22,
			        "word": " aid",
			      },
			      {
			        "end": 52.5,
			        "start": 52.37,
			        "word": " and",
			      },
			      {
			        "end": 52.64,
			        "start": 52.5,
			        "word": " how",
			      },
			      {
			        "end": 52.88,
			        "start": 52.64,
			        "word": " much",
			      },
			      {
			        "end": 52.91,
			        "start": 52.88,
			        "word": " it",
			      },
			      {
			        "end": 53.01,
			        "start": 52.91,
			        "word": "'s",
			      },
			      {
			        "end": 53.16,
			        "start": 53.01,
			        "word": " cre",
			      },
			      {
			        "end": 53.22,
			        "start": 53.16,
			        "word": "pt",
			      },
			      {
			        "end": 53.32,
			        "start": 53.22,
			        "word": " up",
			      },
			    ],
			  },
			  {
			    "end": 56,
			    "start": 54.19,
			    "text": "that's Europe. It's gone up relatively steadily",
			    "words": [
			      {
			        "end": 54.19,
			        "start": 54.19,
			        "word": " that",
			      },
			      {
			        "end": 54.58,
			        "start": 54.19,
			        "word": "'s",
			      },
			      {
			        "end": 54.8,
			        "start": 54.58,
			        "word": " Europe",
			      },
			      {
			        "end": 54.86,
			        "start": 54.8,
			        "word": ".",
			      },
			      {
			        "end": 54.95,
			        "start": 54.86,
			        "word": " It",
			      },
			      {
			        "end": 55.09,
			        "start": 54.95,
			        "word": "'s",
			      },
			      {
			        "end": 55.32,
			        "start": 55.09,
			        "word": " gone",
			      },
			      {
			        "end": 55.46,
			        "start": 55.32,
			        "word": " up",
			      },
			      {
			        "end": 56,
			        "start": 55.46,
			        "word": " relatively",
			      },
			    ],
			  },
			  {
			    "end": 57.22,
			    "start": 56.68,
			    "text": "Look at the U.S",
			    "words": [
			      {
			        "end": 56.81,
			        "start": 56.68,
			        "word": " Look",
			      },
			      {
			        "end": 57.18,
			        "start": 56.81,
			        "word": " at",
			      },
			      {
			        "end": 57.22,
			        "start": 57.18,
			        "word": " the",
			      },
			    ],
			  },
			  {
			    "end": 58.33,
			    "start": 57.66,
			    "text": "That's gone up",
			    "words": [
			      {
			        "end": 57.89,
			        "start": 57.66,
			        "word": " That",
			      },
			      {
			        "end": 58.05,
			        "start": 57.89,
			        "word": "'s",
			      },
			      {
			        "end": 58.33,
			        "start": 58.05,
			        "word": " gone",
			      },
			    ],
			  },
			  {
			    "end": 61.57,
			    "start": 58.6,
			    "text": "It was steady for a while. Then it was flatlining and then it went up again",
			    "words": [
			      {
			        "end": 58.7,
			        "start": 58.6,
			        "word": " It",
			      },
			      {
			        "end": 58.93,
			        "start": 58.7,
			        "word": " was",
			      },
			      {
			        "end": 59.26,
			        "start": 58.93,
			        "word": " steady",
			      },
			      {
			        "end": 59.34,
			        "start": 59.26,
			        "word": " for",
			      },
			      {
			        "end": 59.39,
			        "start": 59.34,
			        "word": " a",
			      },
			      {
			        "end": 59.66,
			        "start": 59.39,
			        "word": " while",
			      },
			      {
			        "end": 59.86,
			        "start": 59.66,
			        "word": ".",
			      },
			      {
			        "end": 60.25,
			        "start": 59.86,
			        "word": " Then",
			      },
			      {
			        "end": 60.28,
			        "start": 60.25,
			        "word": " it",
			      },
			      {
			        "end": 60.44,
			        "start": 60.28,
			        "word": " was",
			      },
			      {
			        "end": 60.69,
			        "start": 60.44,
			        "word": " flat",
			      },
			      {
			        "end": 61.12,
			        "start": 60.69,
			        "word": "lining",
			      },
			      {
			        "end": 61.27,
			        "start": 61.12,
			        "word": " and",
			      },
			      {
			        "end": 61.47,
			        "start": 61.27,
			        "word": " then",
			      },
			      {
			        "end": 61.57,
			        "start": 61.47,
			        "word": " it",
			      },
			    ],
			  },
			  {
			    "end": 65.94,
			    "start": 62.3,
			    "text": "What was going on there? It was that when Congress was blocking the new support",
			    "words": [
			      {
			        "end": 62.48,
			        "start": 62.3,
			        "word": " What",
			      },
			      {
			        "end": 62.86,
			        "start": 62.48,
			        "word": " was",
			      },
			      {
			        "end": 63.19,
			        "start": 62.86,
			        "word": " going",
			      },
			      {
			        "end": 63.22,
			        "start": 63.19,
			        "word": " on",
			      },
			      {
			        "end": 63.55,
			        "start": 63.22,
			        "word": " there",
			      },
			      {
			        "end": 63.75,
			        "start": 63.55,
			        "word": "?",
			      },
			      {
			        "end": 63.88,
			        "start": 63.75,
			        "word": " It",
			      },
			      {
			        "end": 64.08,
			        "start": 63.88,
			        "word": " was",
			      },
			      {
			        "end": 64.34,
			        "start": 64.08,
			        "word": " that",
			      },
			      {
			        "end": 64.6,
			        "start": 64.34,
			        "word": " when",
			      },
			      {
			        "end": 65.23,
			        "start": 64.6,
			        "word": " Congress",
			      },
			      {
			        "end": 65.33,
			        "start": 65.23,
			        "word": " was",
			      },
			      {
			        "end": 65.94,
			        "start": 65.33,
			        "word": " blocking",
			      },
			    ],
			  },
			  {
			    "end": 73.3,
			    "start": 67.01,
			    "text": "So you really see it there kind of visually in terms of the aid that was handed over or wasn't handed over to Ukraine. But kind of back to this",
			    "words": [
			      {
			        "end": 67.14,
			        "start": 67.01,
			        "word": " So",
			      },
			      {
			        "end": 67.36,
			        "start": 67.14,
			        "word": " you",
			      },
			      {
			        "end": 67.74,
			        "start": 67.36,
			        "word": " really",
			      },
			      {
			        "end": 67.94,
			        "start": 67.74,
			        "word": " see",
			      },
			      {
			        "end": 68.07,
			        "start": 67.94,
			        "word": " it",
			      },
			      {
			        "end": 68.4,
			        "start": 68.07,
			        "word": " there",
			      },
			      {
			        "end": 68.68,
			        "start": 68.4,
			        "word": " kind",
			      },
			      {
			        "end": 68.93,
			        "start": 68.68,
			        "word": " of",
			      },
			      {
			        "end": 69.33,
			        "start": 68.93,
			        "word": " visually",
			      },
			      {
			        "end": 69.45,
			        "start": 69.33,
			        "word": " in",
			      },
			      {
			        "end": 69.78,
			        "start": 69.45,
			        "word": " terms",
			      },
			      {
			        "end": 70.11,
			        "start": 69.78,
			        "word": " of",
			      },
			      {
			        "end": 70.15,
			        "start": 70.11,
			        "word": " the",
			      },
			      {
			        "end": 70.31,
			        "start": 70.15,
			        "word": " aid",
			      },
			      {
			        "end": 70.61,
			        "start": 70.31,
			        "word": " that",
			      },
			      {
			        "end": 70.86,
			        "start": 70.61,
			        "word": " was",
			      },
			      {
			        "end": 71.25,
			        "start": 70.86,
			        "word": " handed",
			      },
			      {
			        "end": 71.51,
			        "start": 71.25,
			        "word": " over",
			      },
			      {
			        "end": 71.64,
			        "start": 71.51,
			        "word": " or",
			      },
			      {
			        "end": 71.9,
			        "start": 71.64,
			        "word": " wasn",
			      },
			      {
			        "end": 72.03,
			        "start": 71.9,
			        "word": "'t",
			      },
			      {
			        "end": 72.67,
			        "start": 72.03,
			        "word": " handed",
			      },
			      {
			        "end": 72.68,
			        "start": 72.67,
			        "word": " over",
			      },
			      {
			        "end": 72.81,
			        "start": 72.68,
			        "word": " to",
			      },
			      {
			        "end": 73.3,
			        "start": 72.81,
			        "word": " Ukraine",
			      },
			    ],
			  },
			  {
			    "end": 77.86,
			    "start": 75.08,
			    "text": "the big picture here okay so this includes a lot of different countries",
			    "words": [
			      {
			        "end": 75.12,
			        "start": 75.08,
			        "word": " the",
			      },
			      {
			        "end": 75.32,
			        "start": 75.12,
			        "word": " big",
			      },
			      {
			        "end": 75.84,
			        "start": 75.32,
			        "word": " picture",
			      },
			      {
			        "end": 76.02,
			        "start": 75.84,
			        "word": " here",
			      },
			      {
			        "end": 76.12,
			        "start": 76.02,
			        "word": ",",
			      },
			      {
			        "end": 76.32,
			        "start": 76.12,
			        "word": " okay",
			      },
			      {
			        "end": 76.45,
			        "start": 76.32,
			        "word": ",",
			      },
			      {
			        "end": 76.52,
			        "start": 76.45,
			        "word": " so",
			      },
			      {
			        "end": 76.71,
			        "start": 76.52,
			        "word": " this",
			      },
			      {
			        "end": 77.17,
			        "start": 76.71,
			        "word": " includes",
			      },
			      {
			        "end": 77.19,
			        "start": 77.17,
			        "word": " a",
			      },
			      {
			        "end": 77.33,
			        "start": 77.19,
			        "word": " lot",
			      },
			      {
			        "end": 77.42,
			        "start": 77.33,
			        "word": " of",
			      },
			      {
			        "end": 77.86,
			        "start": 77.42,
			        "word": " different",
			      },
			    ],
			  },
			  {
			    "end": 81.8,
			    "start": 78.47,
			    "text": "So if we want to get a better sense of comparing different countries and how much they've given",
			    "words": [
			      {
			        "end": 78.57,
			        "start": 78.47,
			        "word": " So",
			      },
			      {
			        "end": 78.68,
			        "start": 78.57,
			        "word": " if",
			      },
			      {
			        "end": 78.78,
			        "start": 78.68,
			        "word": " we",
			      },
			      {
			        "end": 78.97,
			        "start": 78.78,
			        "word": " want",
			      },
			      {
			        "end": 79.07,
			        "start": 78.97,
			        "word": " to",
			      },
			      {
			        "end": 79.22,
			        "start": 79.07,
			        "word": " get",
			      },
			      {
			        "end": 79.27,
			        "start": 79.22,
			        "word": " a",
			      },
			      {
			        "end": 79.57,
			        "start": 79.27,
			        "word": " better",
			      },
			      {
			        "end": 79.86,
			        "start": 79.57,
			        "word": " sense",
			      },
			      {
			        "end": 80,
			        "start": 79.86,
			        "word": " of",
			      },
			      {
			        "end": 80.44,
			        "start": 80,
			        "word": " comparing",
			      },
			      {
			        "end": 81.01,
			        "start": 80.44,
			        "word": " different",
			      },
			      {
			        "end": 81.48,
			        "start": 81.01,
			        "word": " countries",
			      },
			      {
			        "end": 81.71,
			        "start": 81.48,
			        "word": " and",
			      },
			      {
			        "end": 81.8,
			        "start": 81.71,
			        "word": " how",
			      },
			    ],
			  },
			  {
			    "end": 85.34,
			    "start": 82.86,
			    "text": "you really need to divide it by every single individual nation",
			    "words": [
			      {
			        "end": 82.97,
			        "start": 82.86,
			        "word": " you",
			      },
			      {
			        "end": 83.31,
			        "start": 82.97,
			        "word": " really",
			      },
			      {
			        "end": 83.56,
			        "start": 83.31,
			        "word": " need",
			      },
			      {
			        "end": 83.84,
			        "start": 83.56,
			        "word": " to",
			      },
			      {
			        "end": 83.98,
			        "start": 83.84,
			        "word": " divide",
			      },
			      {
			        "end": 84.13,
			        "start": 83.98,
			        "word": " it",
			      },
			      {
			        "end": 84.2,
			        "start": 84.13,
			        "word": " by",
			      },
			      {
			        "end": 84.48,
			        "start": 84.2,
			        "word": " every",
			      },
			      {
			        "end": 84.92,
			        "start": 84.48,
			        "word": " single",
			      },
			      {
			        "end": 84.92,
			        "start": 84.92,
			        "word": "",
			      },
			      {
			        "end": 85.34,
			        "start": 84.92,
			        "word": " individual",
			      },
			    ],
			  },
			  {
			    "end": 89.46,
			    "start": 85.71,
			    "text": "And we can do that here. Okay so this is individual countries not just Europe as a whole",
			    "words": [
			      {
			        "end": 85.83,
			        "start": 85.71,
			        "word": " And",
			      },
			      {
			        "end": 85.94,
			        "start": 85.83,
			        "word": " we",
			      },
			      {
			        "end": 86.07,
			        "start": 85.94,
			        "word": " can",
			      },
			      {
			        "end": 86.11,
			        "start": 86.07,
			        "word": " do",
			      },
			      {
			        "end": 86.28,
			        "start": 86.11,
			        "word": " that",
			      },
			      {
			        "end": 86.44,
			        "start": 86.28,
			        "word": " here",
			      },
			      {
			        "end": 86.79,
			        "start": 86.44,
			        "word": ".",
			      },
			      {
			        "end": 87,
			        "start": 86.79,
			        "word": " Okay",
			      },
			      {
			        "end": 87.04,
			        "start": 87,
			        "word": ",",
			      },
			      {
			        "end": 87.17,
			        "start": 87.04,
			        "word": " so",
			      },
			      {
			        "end": 87.44,
			        "start": 87.17,
			        "word": " this",
			      },
			      {
			        "end": 87.6,
			        "start": 87.44,
			        "word": " is",
			      },
			      {
			        "end": 88.25,
			        "start": 87.6,
			        "word": " individual",
			      },
			      {
			        "end": 88.86,
			        "start": 88.25,
			        "word": " countries",
			      },
			      {
			        "end": 89.04,
			        "start": 88.86,
			        "word": ",",
			      },
			      {
			        "end": 89.22,
			        "start": 89.04,
			        "word": " not",
			      },
			      {
			        "end": 89.46,
			        "start": 89.22,
			        "word": " just",
			      },
			    ],
			  },
			  {
			    "end": 91.08,
			    "start": 90.29,
			    "text": "individual countries",
			    "words": [
			      {
			        "end": 90.77,
			        "start": 90.29,
			        "word": " individual",
			      },
			      {
			        "end": 91.08,
			        "start": 90.77,
			        "word": " countries",
			      },
			    ],
			  },
			  {
			    "end": 92.14,
			    "start": 91.54,
			    "text": "And it's clear the U.S",
			    "words": [
			      {
			        "end": 91.6,
			        "start": 91.54,
			        "word": " And",
			      },
			      {
			        "end": 91.64,
			        "start": 91.6,
			        "word": " it",
			      },
			      {
			        "end": 91.74,
			        "start": 91.64,
			        "word": "'s",
			      },
			      {
			        "end": 91.99,
			        "start": 91.74,
			        "word": " clear",
			      },
			      {
			        "end": 92.14,
			        "start": 91.99,
			        "word": " the",
			      },
			    ],
			  },
			  {
			    "end": 94.67,
			    "start": 92.54,
			    "text": "is comfortably the single biggest donor in cash terms",
			    "words": [
			      {
			        "end": 92.76,
			        "start": 92.54,
			        "word": " is",
			      },
			      {
			        "end": 93.2,
			        "start": 92.76,
			        "word": " comfortably",
			      },
			      {
			        "end": 93.35,
			        "start": 93.2,
			        "word": " the",
			      },
			      {
			        "end": 93.76,
			        "start": 93.35,
			        "word": " single",
			      },
			      {
			        "end": 94.21,
			        "start": 93.76,
			        "word": " biggest",
			      },
			      {
			        "end": 94.54,
			        "start": 94.21,
			        "word": " donor",
			      },
			      {
			        "end": 94.67,
			        "start": 94.54,
			        "word": " in",
			      },
			    ],
			  },
			  {
			    "end": 96.63,
			    "start": 95.63,
			    "text": "There you've got the U.K",
			    "words": [
			      {
			        "end": 95.8,
			        "start": 95.63,
			        "word": " There",
			      },
			      {
			        "end": 96,
			        "start": 95.8,
			        "word": " you",
			      },
			      {
			        "end": 96.22,
			        "start": 96,
			        "word": "'ve",
			      },
			      {
			        "end": 96.4,
			        "start": 96.22,
			        "word": " got",
			      },
			      {
			        "end": 96.63,
			        "start": 96.4,
			        "word": " the",
			      },
			    ],
			  },
			  {
			    "end": 100.54,
			    "start": 97.16,
			    "text": "down there and Germany among the biggest donors, but nowhere near where the U.S",
			    "words": [
			      {
			        "end": 97.38,
			        "start": 97.16,
			        "word": " down",
			      },
			      {
			        "end": 97.71,
			        "start": 97.38,
			        "word": " there",
			      },
			      {
			        "end": 97.91,
			        "start": 97.71,
			        "word": " and",
			      },
			      {
			        "end": 98.37,
			        "start": 97.91,
			        "word": " Germany",
			      },
			      {
			        "end": 98.78,
			        "start": 98.37,
			        "word": " among",
			      },
			      {
			        "end": 99.32,
			        "start": 98.78,
			        "word": " the",
			      },
			      {
			        "end": 99.56,
			        "start": 99.32,
			        "word": " biggest",
			      },
			      {
			        "end": 99.82,
			        "start": 99.56,
			        "word": " donors",
			      },
			      {
			        "end": 99.91,
			        "start": 99.82,
			        "word": ",",
			      },
			      {
			        "end": 100.05,
			        "start": 99.91,
			        "word": " but",
			      },
			      {
			        "end": 100.36,
			        "start": 100.05,
			        "word": " nowhere",
			      },
			      {
			        "end": 100.54,
			        "start": 100.36,
			        "word": " near",
			      },
			    ],
			  },
			  {
			    "end": 101.32,
			    "start": 101.23,
			    "text": "is",
			    "words": [
			      {
			        "end": 101.32,
			        "start": 101.23,
			        "word": " is",
			      },
			    ],
			  },
			  {
			    "end": 103.29,
			    "start": 101.7,
			    "text": "But that's the key point, the cash terms",
			    "words": [
			      {
			        "end": 101.7,
			        "start": 101.7,
			        "word": " But",
			      },
			      {
			        "end": 101.95,
			        "start": 101.7,
			        "word": " that",
			      },
			      {
			        "end": 102.07,
			        "start": 101.95,
			        "word": "'s",
			      },
			      {
			        "end": 102.34,
			        "start": 102.07,
			        "word": " the",
			      },
			      {
			        "end": 102.43,
			        "start": 102.34,
			        "word": " key",
			      },
			      {
			        "end": 102.74,
			        "start": 102.43,
			        "word": " point",
			      },
			      {
			        "end": 102.86,
			        "start": 102.74,
			        "word": ",",
			      },
			      {
			        "end": 103.04,
			        "start": 102.86,
			        "word": " the",
			      },
			      {
			        "end": 103.29,
			        "start": 103.04,
			        "word": " cash",
			      },
			    ],
			  },
			  {
			    "end": 105.94,
			    "start": 103.86,
			    "text": "Okay, now do it as a percentage of the size of the economy",
			    "words": [
			      {
			        "end": 104.09,
			        "start": 103.86,
			        "word": " Okay",
			      },
			      {
			        "end": 104.2,
			        "start": 104.09,
			        "word": ",",
			      },
			      {
			        "end": 104.37,
			        "start": 104.2,
			        "word": " now",
			      },
			      {
			        "end": 104.48,
			        "start": 104.37,
			        "word": " do",
			      },
			      {
			        "end": 104.59,
			        "start": 104.48,
			        "word": " it",
			      },
			      {
			        "end": 104.7,
			        "start": 104.59,
			        "word": " as",
			      },
			      {
			        "end": 104.98,
			        "start": 104.7,
			        "word": " a",
			      },
			      {
			        "end": 105.33,
			        "start": 104.98,
			        "word": " percentage",
			      },
			      {
			        "end": 105.44,
			        "start": 105.33,
			        "word": " of",
			      },
			      {
			        "end": 105.61,
			        "start": 105.44,
			        "word": " the",
			      },
			      {
			        "end": 105.84,
			        "start": 105.61,
			        "word": " size",
			      },
			      {
			        "end": 105.94,
			        "start": 105.84,
			        "word": " of",
			      },
			    ],
			  },
			  {
			    "end": 110.61,
			    "start": 106.69,
			    "text": "And it's a different picture. Okay, so same data, but as a percentage of GDP",
			    "words": [
			      {
			        "end": 106.86,
			        "start": 106.69,
			        "word": " And",
			      },
			      {
			        "end": 106.97,
			        "start": 106.86,
			        "word": " it",
			      },
			      {
			        "end": 107.08,
			        "start": 106.97,
			        "word": "'s",
			      },
			      {
			        "end": 107.55,
			        "start": 107.08,
			        "word": " a",
			      },
			      {
			        "end": 107.65,
			        "start": 107.55,
			        "word": " different",
			      },
			      {
			        "end": 108.05,
			        "start": 107.65,
			        "word": " picture",
			      },
			      {
			        "end": 108.36,
			        "start": 108.05,
			        "word": ".",
			      },
			      {
			        "end": 108.53,
			        "start": 108.5,
			        "word": "",
			      },
			      {
			        "end": 108.75,
			        "start": 108.53,
			        "word": " Okay",
			      },
			      {
			        "end": 108.87,
			        "start": 108.75,
			        "word": ",",
			      },
			      {
			        "end": 108.99,
			        "start": 108.87,
			        "word": " so",
			      },
			      {
			        "end": 109.28,
			        "start": 108.99,
			        "word": " same",
			      },
			      {
			        "end": 109.61,
			        "start": 109.28,
			        "word": " data",
			      },
			      {
			        "end": 109.69,
			        "start": 109.61,
			        "word": ",",
			      },
			      {
			        "end": 109.8,
			        "start": 109.69,
			        "word": " but",
			      },
			      {
			        "end": 109.93,
			        "start": 109.8,
			        "word": " as",
			      },
			      {
			        "end": 109.99,
			        "start": 109.93,
			        "word": " a",
			      },
			      {
			        "end": 110.61,
			        "start": 109.99,
			        "word": " percentage",
			      },
			    ],
			  },
			  {
			    "end": 112.49,
			    "start": 111.11,
			    "text": "And look, it's different",
			    "words": [
			      {
			        "end": 111.3,
			        "start": 111.11,
			        "word": " And",
			      },
			      {
			        "end": 111.67,
			        "start": 111.3,
			        "word": " look",
			      },
			      {
			        "end": 111.77,
			        "start": 111.67,
			        "word": ",",
			      },
			      {
			        "end": 111.79,
			        "start": 111.77,
			        "word": " it",
			      },
			      {
			        "end": 111.91,
			        "start": 111.79,
			        "word": "'s",
			      },
			      {
			        "end": 112.49,
			        "start": 111.91,
			        "word": " different",
			      },
			    ],
			  },
			  {
			    "end": 113.6,
			    "start": 112.67,
			    "text": "Okay, so the U.S",
			    "words": [
			      {
			        "end": 112.92,
			        "start": 112.67,
			        "word": " Okay",
			      },
			      {
			        "end": 113.14,
			        "start": 112.92,
			        "word": ",",
			      },
			      {
			        "end": 113.32,
			        "start": 113.14,
			        "word": " so",
			      },
			      {
			        "end": 113.6,
			        "start": 113.32,
			        "word": " the",
			      },
			    ],
			  },
			  {
			    "end": 114.35,
			    "start": 114,
			    "text": "and the U.K",
			    "words": [
			      {
			        "end": 114.18,
			        "start": 114,
			        "word": " and",
			      },
			      {
			        "end": 114.3,
			        "start": 114.18,
			        "word": " the",
			      },
			      {
			        "end": 114.35,
			        "start": 114.3,
			        "word": " U",
			      },
			    ],
			  },
			  {
			    "end": 117.45,
			    "start": 114.71,
			    "text": "about 0.5% of their GDP, which is a better way of comparing it, really",
			    "words": [
			      {
			        "end": 114.95,
			        "start": 114.71,
			        "word": " about",
			      },
			      {
			        "end": 115.14,
			        "start": 114.95,
			        "word": " 0",
			      },
			      {
			        "end": 115.27,
			        "start": 115.14,
			        "word": ".",
			      },
			      {
			        "end": 115.4,
			        "start": 115.27,
			        "word": "5",
			      },
			      {
			        "end": 115.55,
			        "start": 115.4,
			        "word": "%",
			      },
			      {
			        "end": 115.59,
			        "start": 115.55,
			        "word": " of",
			      },
			      {
			        "end": 115.8,
			        "start": 115.59,
			        "word": " their",
			      },
			      {
			        "end": 115.95,
			        "start": 115.8,
			        "word": " GDP",
			      },
			      {
			        "end": 116.12,
			        "start": 115.95,
			        "word": ",",
			      },
			      {
			        "end": 116.3,
			        "start": 116.12,
			        "word": " which",
			      },
			      {
			        "end": 116.4,
			        "start": 116.3,
			        "word": " is",
			      },
			      {
			        "end": 116.45,
			        "start": 116.4,
			        "word": " a",
			      },
			      {
			        "end": 116.75,
			        "start": 116.45,
			        "word": " better",
			      },
			      {
			        "end": 116.91,
			        "start": 116.75,
			        "word": " way",
			      },
			      {
			        "end": 116.99,
			        "start": 116.91,
			        "word": " of",
			      },
			      {
			        "end": 117.45,
			        "start": 116.99,
			        "word": " comparing",
			      },
			    ],
			  },
			  {
			    "end": 122.86,
			    "start": 118.2,
			    "text": "Whereas it's countries like Estonia and Denmark the Baltics Finland Sweden places like that",
			    "words": [
			      {
			        "end": 118.65,
			        "start": 118.2,
			        "word": " Whereas",
			      },
			      {
			        "end": 118.78,
			        "start": 118.65,
			        "word": " it",
			      },
			      {
			        "end": 118.95,
			        "start": 118.78,
			        "word": "'s",
			      },
			      {
			        "end": 119.48,
			        "start": 118.95,
			        "word": " countries",
			      },
			      {
			        "end": 119.72,
			        "start": 119.48,
			        "word": " like",
			      },
			      {
			        "end": 120.09,
			        "start": 119.72,
			        "word": " Est",
			      },
			      {
			        "end": 120.18,
			        "start": 120.09,
			        "word": "onia",
			      },
			      {
			        "end": 120.37,
			        "start": 120.18,
			        "word": " and",
			      },
			      {
			        "end": 120.83,
			        "start": 120.37,
			        "word": " Denmark",
			      },
			      {
			        "end": 120.94,
			        "start": 120.83,
			        "word": ",",
			      },
			      {
			        "end": 121.13,
			        "start": 120.94,
			        "word": " the",
			      },
			      {
			        "end": 121.43,
			        "start": 121.13,
			        "word": " Balt",
			      },
			      {
			        "end": 121.58,
			        "start": 121.43,
			        "word": "ics",
			      },
			      {
			        "end": 121.73,
			        "start": 121.58,
			        "word": ",",
			      },
			      {
			        "end": 122.15,
			        "start": 121.73,
			        "word": " Finland",
			      },
			      {
			        "end": 122.36,
			        "start": 122.15,
			        "word": ",",
			      },
			      {
			        "end": 122.86,
			        "start": 122.36,
			        "word": " Sweden",
			      },
			    ],
			  },
			  {
			    "end": 129.6,
			    "start": 123.98,
			    "text": "which are giving much more of their national income to support Ukraine. And then places like Germany",
			    "words": [
			      {
			        "end": 124.38,
			        "start": 123.98,
			        "word": " which",
			      },
			      {
			        "end": 124.62,
			        "start": 124.38,
			        "word": " are",
			      },
			      {
			        "end": 125.1,
			        "start": 124.62,
			        "word": " giving",
			      },
			      {
			        "end": 125.42,
			        "start": 125.1,
			        "word": " much",
			      },
			      {
			        "end": 125.74,
			        "start": 125.42,
			        "word": " more",
			      },
			      {
			        "end": 125.89,
			        "start": 125.74,
			        "word": " of",
			      },
			      {
			        "end": 126.3,
			        "start": 125.89,
			        "word": " their",
			      },
			      {
			        "end": 127.38,
			        "start": 126.3,
			        "word": " national",
			      },
			      {
			        "end": 127.42,
			        "start": 127.38,
			        "word": " income",
			      },
			      {
			        "end": 127.58,
			        "start": 127.42,
			        "word": " to",
			      },
			      {
			        "end": 128.14,
			        "start": 127.58,
			        "word": " support",
			      },
			      {
			        "end": 128.7,
			        "start": 128.14,
			        "word": " Ukraine",
			      },
			      {
			        "end": 129.04,
			        "start": 128.7,
			        "word": ".",
			      },
			      {
			        "end": 129.18,
			        "start": 129.04,
			        "word": " And",
			      },
			      {
			        "end": 129.6,
			        "start": 129.18,
			        "word": " then",
			      },
			    ],
			  },
			  {
			    "end": 132.49,
			    "start": 130.62,
			    "text": "even further down because it's got a bigger GDP",
			    "words": [
			      {
			        "end": 130.85,
			        "start": 130.62,
			        "word": " even",
			      },
			      {
			        "end": 131.38,
			        "start": 130.85,
			        "word": " further",
			      },
			      {
			        "end": 131.49,
			        "start": 131.38,
			        "word": " down",
			      },
			      {
			        "end": 131.6,
			        "start": 131.49,
			        "word": ",",
			      },
			      {
			        "end": 132,
			        "start": 131.6,
			        "word": " because",
			      },
			      {
			        "end": 132.12,
			        "start": 132,
			        "word": " it",
			      },
			      {
			        "end": 132.27,
			        "start": 132.12,
			        "word": "'s",
			      },
			      {
			        "end": 132.4,
			        "start": 132.27,
			        "word": " got",
			      },
			      {
			        "end": 132.49,
			        "start": 132.4,
			        "word": " a",
			      },
			    ],
			  },
			  {
			    "end": 138.24,
			    "start": 133,
			    "text": "So quite striking there. Worth saying though to get a bit of a historical context here",
			    "words": [
			      {
			        "end": 133.42,
			        "start": 133,
			        "word": " So",
			      },
			      {
			        "end": 133.58,
			        "start": 133.42,
			        "word": " quite",
			      },
			      {
			        "end": 134.01,
			        "start": 133.58,
			        "word": " striking",
			      },
			      {
			        "end": 134.3,
			        "start": 134.01,
			        "word": " there",
			      },
			      {
			        "end": 134.58,
			        "start": 134.3,
			        "word": ".",
			      },
			      {
			        "end": 135.01,
			        "start": 134.58,
			        "word": " Worth",
			      },
			      {
			        "end": 135.53,
			        "start": 135.01,
			        "word": " saying",
			      },
			      {
			        "end": 135.72,
			        "start": 135.53,
			        "word": ",",
			      },
			      {
			        "end": 135.91,
			        "start": 135.72,
			        "word": " though",
			      },
			      {
			        "end": 135.98,
			        "start": 135.91,
			        "word": ",",
			      },
			      {
			        "end": 136.77,
			        "start": 136.76,
			        "word": "",
			      },
			      {
			        "end": 136.92,
			        "start": 136.77,
			        "word": " to",
			      },
			      {
			        "end": 137.09,
			        "start": 136.92,
			        "word": " get",
			      },
			      {
			        "end": 137.15,
			        "start": 137.09,
			        "word": " a",
			      },
			      {
			        "end": 137.35,
			        "start": 137.15,
			        "word": " bit",
			      },
			      {
			        "end": 137.48,
			        "start": 137.35,
			        "word": " of",
			      },
			      {
			        "end": 137.54,
			        "start": 137.48,
			        "word": " a",
			      },
			      {
			        "end": 138.24,
			        "start": 137.54,
			        "word": " historical",
			      },
			    ],
			  },
			  {
			    "end": 142.95,
			    "start": 139.27,
			    "text": "let's compare how much aid has been given this time around with previous conflicts",
			    "words": [
			      {
			        "end": 139.27,
			        "start": 139.27,
			        "word": " let",
			      },
			      {
			        "end": 139.52,
			        "start": 139.27,
			        "word": "'s",
			      },
			      {
			        "end": 139.87,
			        "start": 139.52,
			        "word": " compare",
			      },
			      {
			        "end": 140.07,
			        "start": 139.87,
			        "word": " how",
			      },
			      {
			        "end": 140.33,
			        "start": 140.07,
			        "word": " much",
			      },
			      {
			        "end": 140.53,
			        "start": 140.33,
			        "word": " aid",
			      },
			      {
			        "end": 140.73,
			        "start": 140.53,
			        "word": " has",
			      },
			      {
			        "end": 141.04,
			        "start": 140.73,
			        "word": " been",
			      },
			      {
			        "end": 141.4,
			        "start": 141.04,
			        "word": " given",
			      },
			      {
			        "end": 141.68,
			        "start": 141.4,
			        "word": " this",
			      },
			      {
			        "end": 141.94,
			        "start": 141.68,
			        "word": " time",
			      },
			      {
			        "end": 142.5,
			        "start": 141.94,
			        "word": " around",
			      },
			      {
			        "end": 142.57,
			        "start": 142.5,
			        "word": " with",
			      },
			      {
			        "end": 142.95,
			        "start": 142.57,
			        "word": " previous",
			      },
			    ],
			  },
			  {
			    "end": 144.75,
			    "start": 143.7,
			    "text": "So this is specifically U.S",
			    "words": [
			      {
			        "end": 143.74,
			        "start": 143.7,
			        "word": " So",
			      },
			      {
			        "end": 143.96,
			        "start": 143.74,
			        "word": " this",
			      },
			      {
			        "end": 144.07,
			        "start": 143.96,
			        "word": " is",
			      },
			      {
			        "end": 144.75,
			        "start": 144.07,
			        "word": " specifically",
			      },
			    ],
			  },
			  {
			    "end": 146.38,
			    "start": 145.36,
			    "text": "aid to Ukraine this time around",
			    "words": [
			      {
			        "end": 145.36,
			        "start": 145.36,
			        "word": " aid",
			      },
			      {
			        "end": 145.53,
			        "start": 145.36,
			        "word": " to",
			      },
			      {
			        "end": 145.86,
			        "start": 145.53,
			        "word": " Ukraine",
			      },
			      {
			        "end": 146.08,
			        "start": 145.86,
			        "word": " this",
			      },
			      {
			        "end": 146.38,
			        "start": 146.08,
			        "word": " time",
			      },
			    ],
			  },
			  {
			    "end": 150.2,
			    "start": 146.74,
			    "text": "That bar is there. It's 0.3 because it's just that's the annual figure rather than for the entire period",
			    "words": [
			      {
			        "end": 146.9,
			        "start": 146.74,
			        "word": " That",
			      },
			      {
			        "end": 147.02,
			        "start": 146.9,
			        "word": " bar",
			      },
			      {
			        "end": 147.1,
			        "start": 147.02,
			        "word": " is",
			      },
			      {
			        "end": 147.3,
			        "start": 147.1,
			        "word": " there",
			      },
			      {
			        "end": 147.42,
			        "start": 147.3,
			        "word": ".",
			      },
			      {
			        "end": 147.5,
			        "start": 147.42,
			        "word": " It",
			      },
			      {
			        "end": 147.59,
			        "start": 147.5,
			        "word": "'s",
			      },
			      {
			        "end": 147.7,
			        "start": 147.59,
			        "word": " 0",
			      },
			      {
			        "end": 147.82,
			        "start": 147.7,
			        "word": ".",
			      },
			      {
			        "end": 148.03,
			        "start": 147.82,
			        "word": "3",
			      },
			      {
			        "end": 148.21,
			        "start": 148.03,
			        "word": " because",
			      },
			      {
			        "end": 148.3,
			        "start": 148.21,
			        "word": " it",
			      },
			      {
			        "end": 148.45,
			        "start": 148.3,
			        "word": "'s",
			      },
			      {
			        "end": 148.54,
			        "start": 148.45,
			        "word": " just",
			      },
			      {
			        "end": 148.7,
			        "start": 148.54,
			        "word": " that",
			      },
			      {
			        "end": 148.78,
			        "start": 148.7,
			        "word": "'s",
			      },
			      {
			        "end": 148.9,
			        "start": 148.78,
			        "word": " the",
			      },
			      {
			        "end": 149.19,
			        "start": 148.9,
			        "word": " annual",
			      },
			      {
			        "end": 149.38,
			        "start": 149.19,
			        "word": " figure",
			      },
			      {
			        "end": 149.62,
			        "start": 149.38,
			        "word": " rather",
			      },
			      {
			        "end": 149.84,
			        "start": 149.62,
			        "word": " than",
			      },
			      {
			        "end": 150.2,
			        "start": 149.84,
			        "word": " for",
			      },
			    ],
			  },
			  {
			    "end": 152.59,
			    "start": 151.7,
			    "text": "This is World War II",
			    "words": [
			      {
			        "end": 151.76,
			        "start": 151.7,
			        "word": " This",
			      },
			      {
			        "end": 151.91,
			        "start": 151.76,
			        "word": " is",
			      },
			      {
			        "end": 152.3,
			        "start": 151.91,
			        "word": " World",
			      },
			      {
			        "end": 152.59,
			        "start": 152.3,
			        "word": " War",
			      },
			    ],
			  },
			  {
			    "end": 155.13,
			    "start": 153.06,
			    "text": "So World War II lend-lease far more. U.S",
			    "words": [
			      {
			        "end": 153.26,
			        "start": 153.06,
			        "word": " So",
			      },
			      {
			        "end": 153.45,
			        "start": 153.26,
			        "word": " World",
			      },
			      {
			        "end": 153.68,
			        "start": 153.45,
			        "word": " War",
			      },
			      {
			        "end": 153.91,
			        "start": 153.68,
			        "word": " II",
			      },
			      {
			        "end": 154.14,
			        "start": 153.91,
			        "word": " lend",
			      },
			      {
			        "end": 154.21,
			        "start": 154.14,
			        "word": "-",
			      },
			      {
			        "end": 154.82,
			        "start": 154.21,
			        "word": "lease",
			      },
			      {
			        "end": 154.84,
			        "start": 154.82,
			        "word": " far",
			      },
			      {
			        "end": 155.13,
			        "start": 154.84,
			        "word": " more",
			      },
			    ],
			  },
			  {
			    "end": 158.33,
			    "start": 156.04,
			    "text": "and Korea far more. Vietnam far more. Gulf War",
			    "words": [
			      {
			        "end": 156.34,
			        "start": 156.04,
			        "word": " and",
			      },
			      {
			        "end": 156.5,
			        "start": 156.34,
			        "word": " Korea",
			      },
			      {
			        "end": 156.5,
			        "start": 156.5,
			        "word": ",",
			      },
			      {
			        "end": 156.73,
			        "start": 156.5,
			        "word": " far",
			      },
			      {
			        "end": 156.99,
			        "start": 156.73,
			        "word": " more",
			      },
			      {
			        "end": 157.2,
			        "start": 156.99,
			        "word": ".",
			      },
			      {
			        "end": 157.7,
			        "start": 157.2,
			        "word": " Vietnam",
			      },
			      {
			        "end": 157.84,
			        "start": 157.7,
			        "word": ",",
			      },
			      {
			        "end": 158.05,
			        "start": 157.84,
			        "word": " far",
			      },
			      {
			        "end": 158.33,
			        "start": 158.05,
			        "word": " more",
			      },
			    ],
			  },
			  {
			    "end": 162.23,
			    "start": 159.17,
			    "text": "far more. Ukraine is tiny in comparison to all of those things",
			    "words": [
			      {
			        "end": 159.38,
			        "start": 159.17,
			        "word": " far",
			      },
			      {
			        "end": 159.87,
			        "start": 159.38,
			        "word": " more",
			      },
			      {
			        "end": 159.94,
			        "start": 159.87,
			        "word": ".",
			      },
			      {
			        "end": 160.37,
			        "start": 159.94,
			        "word": " Ukraine",
			      },
			      {
			        "end": 160.51,
			        "start": 160.37,
			        "word": " is",
			      },
			      {
			        "end": 160.79,
			        "start": 160.51,
			        "word": " tiny",
			      },
			      {
			        "end": 160.93,
			        "start": 160.79,
			        "word": " in",
			      },
			      {
			        "end": 161.64,
			        "start": 160.93,
			        "word": " comparison",
			      },
			      {
			        "end": 161.78,
			        "start": 161.64,
			        "word": " to",
			      },
			      {
			        "end": 161.99,
			        "start": 161.78,
			        "word": " all",
			      },
			      {
			        "end": 162.23,
			        "start": 161.99,
			        "word": " of",
			      },
			    ],
			  },
			  {
			    "end": 166.01,
			    "start": 162.84,
			    "text": "Still, you know, sizable in cash terms, but compared with those, really quite small",
			    "words": [
			      {
			        "end": 163.08,
			        "start": 162.84,
			        "word": " Still",
			      },
			      {
			        "end": 163.17,
			        "start": 163.08,
			        "word": ",",
			      },
			      {
			        "end": 163.5,
			        "start": 163.17,
			        "word": " you",
			      },
			      {
			        "end": 163.5,
			        "start": 163.5,
			        "word": " know",
			      },
			      {
			        "end": 163.59,
			        "start": 163.5,
			        "word": ",",
			      },
			      {
			        "end": 163.73,
			        "start": 163.59,
			        "word": " siz",
			      },
			      {
			        "end": 163.92,
			        "start": 163.73,
			        "word": "able",
			      },
			      {
			        "end": 164.02,
			        "start": 163.92,
			        "word": " in",
			      },
			      {
			        "end": 164.21,
			        "start": 164.02,
			        "word": " cash",
			      },
			      {
			        "end": 164.48,
			        "start": 164.21,
			        "word": " terms",
			      },
			      {
			        "end": 164.54,
			        "start": 164.48,
			        "word": ",",
			      },
			      {
			        "end": 164.68,
			        "start": 164.54,
			        "word": " but",
			      },
			      {
			        "end": 165.08,
			        "start": 164.68,
			        "word": " compared",
			      },
			      {
			        "end": 165.26,
			        "start": 165.08,
			        "word": " with",
			      },
			      {
			        "end": 165.59,
			        "start": 165.26,
			        "word": " those",
			      },
			      {
			        "end": 165.59,
			        "start": 165.59,
			        "word": ",",
			      },
			      {
			        "end": 166.01,
			        "start": 165.59,
			        "word": " really",
			      },
			    ],
			  },
			  {
			    "end": 167.96,
			    "start": 166.68,
			    "text": "And it's not just the U.S",
			    "words": [
			      {
			        "end": 167.26,
			        "start": 166.68,
			        "word": " And",
			      },
			      {
			        "end": 167.32,
			        "start": 167.26,
			        "word": " it",
			      },
			      {
			        "end": 167.39,
			        "start": 167.32,
			        "word": "'s",
			      },
			      {
			        "end": 167.55,
			        "start": 167.39,
			        "word": " not",
			      },
			      {
			        "end": 167.76,
			        "start": 167.55,
			        "word": " just",
			      },
			      {
			        "end": 167.96,
			        "start": 167.76,
			        "word": " the",
			      },
			    ],
			  },
			  {
			    "end": 172.96,
			    "start": 168.46,
			    "text": "So take the Gulf War and look at how much different countries paid for the Gulf War in terms of support",
			    "words": [
			      {
			        "end": 168.62,
			        "start": 168.46,
			        "word": " So",
			      },
			      {
			        "end": 168.85,
			        "start": 168.62,
			        "word": " take",
			      },
			      {
			        "end": 169.05,
			        "start": 168.85,
			        "word": " the",
			      },
			      {
			        "end": 169.31,
			        "start": 169.05,
			        "word": " Gulf",
			      },
			      {
			        "end": 169.49,
			        "start": 169.31,
			        "word": " War",
			      },
			      {
			        "end": 169.7,
			        "start": 169.49,
			        "word": " and",
			      },
			      {
			        "end": 170,
			        "start": 169.7,
			        "word": " look",
			      },
			      {
			        "end": 170.3,
			        "start": 170,
			        "word": " at",
			      },
			      {
			        "end": 170.3,
			        "start": 170.3,
			        "word": " how",
			      },
			      {
			        "end": 170.56,
			        "start": 170.3,
			        "word": " much",
			      },
			      {
			        "end": 171.17,
			        "start": 170.56,
			        "word": " different",
			      },
			      {
			        "end": 171.77,
			        "start": 171.17,
			        "word": " countries",
			      },
			      {
			        "end": 172,
			        "start": 171.77,
			        "word": " paid",
			      },
			      {
			        "end": 172.4,
			        "start": 172,
			        "word": " for",
			      },
			      {
			        "end": 172.48,
			        "start": 172.4,
			        "word": " the",
			      },
			      {
			        "end": 172.66,
			        "start": 172.48,
			        "word": " Gulf",
			      },
			      {
			        "end": 172.96,
			        "start": 172.66,
			        "word": " War",
			      },
			    ],
			  },
			  {
			    "end": 174.85,
			    "start": 173.82,
			    "text": "particularly for Kuwait",
			    "words": [
			      {
			        "end": 174.44,
			        "start": 173.82,
			        "word": " particularly",
			      },
			      {
			        "end": 174.64,
			        "start": 174.44,
			        "word": " for",
			      },
			      {
			        "end": 174.85,
			        "start": 174.64,
			        "word": " Ku",
			      },
			    ],
			  },
			  {
			    "end": 177.58,
			    "start": 175.04,
			    "text": "U.S., Germany, U.K., Japan, that's Gulf War, those bars",
			    "words": [
			      {
			        "end": 175.09,
			        "start": 175.04,
			        "word": " U",
			      },
			      {
			        "end": 175.26,
			        "start": 175.09,
			        "word": ".",
			      },
			      {
			        "end": 175.29,
			        "start": 175.26,
			        "word": "S",
			      },
			      {
			        "end": 175.55,
			        "start": 175.29,
			        "word": ".,",
			      },
			      {
			        "end": 175.94,
			        "start": 175.55,
			        "word": " Germany",
			      },
			      {
			        "end": 176.01,
			        "start": 175.94,
			        "word": ",",
			      },
			      {
			        "end": 176.06,
			        "start": 176.01,
			        "word": " U",
			      },
			      {
			        "end": 176.26,
			        "start": 176.06,
			        "word": ".",
			      },
			      {
			        "end": 176.32,
			        "start": 176.26,
			        "word": "K",
			      },
			      {
			        "end": 176.52,
			        "start": 176.32,
			        "word": ".,",
			      },
			      {
			        "end": 176.88,
			        "start": 176.52,
			        "word": " Japan",
			      },
			      {
			        "end": 177.08,
			        "start": 176.88,
			        "word": ",",
			      },
			      {
			        "end": 177.11,
			        "start": 177.08,
			        "word": " that",
			      },
			      {
			        "end": 177.18,
			        "start": 177.11,
			        "word": "'s",
			      },
			      {
			        "end": 177.38,
			        "start": 177.18,
			        "word": " Gulf",
			      },
			      {
			        "end": 177.58,
			        "start": 177.38,
			        "word": " War",
			      },
			    ],
			  },
			  {
			    "end": 180.51,
			    "start": 178.24,
			    "text": "Now compare it to Ukraine. I'll bring up those bars",
			    "words": [
			      {
			        "end": 178.54,
			        "start": 178.24,
			        "word": " Now",
			      },
			      {
			        "end": 178.84,
			        "start": 178.54,
			        "word": " compare",
			      },
			      {
			        "end": 179.07,
			        "start": 178.84,
			        "word": " it",
			      },
			      {
			        "end": 179.1,
			        "start": 179.07,
			        "word": " to",
			      },
			      {
			        "end": 179.7,
			        "start": 179.1,
			        "word": " Ukraine",
			      },
			      {
			        "end": 179.8,
			        "start": 179.7,
			        "word": ".",
			      },
			      {
			        "end": 179.85,
			        "start": 179.8,
			        "word": " I",
			      },
			      {
			        "end": 180.05,
			        "start": 179.85,
			        "word": "'ll",
			      },
			      {
			        "end": 180.39,
			        "start": 180.05,
			        "word": " bring",
			      },
			      {
			        "end": 180.51,
			        "start": 180.39,
			        "word": " up",
			      },
			    ],
			  },
			  {
			    "end": 182.18,
			    "start": 181.33,
			    "text": "So it was smaller",
			    "words": [
			      {
			        "end": 181.47,
			        "start": 181.33,
			        "word": " So",
			      },
			      {
			        "end": 181.59,
			        "start": 181.47,
			        "word": " it",
			      },
			      {
			        "end": 181.79,
			        "start": 181.59,
			        "word": " was",
			      },
			      {
			        "end": 182.18,
			        "start": 181.79,
			        "word": " smaller",
			      },
			    ],
			  },
			  {
			    "end": 188.51,
			    "start": 182.54,
			    "text": "So less money going to support Ukraine this time around than went for the Gulf War from basically all of those major economies",
			    "words": [
			      {
			        "end": 182.6,
			        "start": 182.54,
			        "word": " So",
			      },
			      {
			        "end": 182.87,
			        "start": 182.6,
			        "word": " less",
			      },
			      {
			        "end": 183.21,
			        "start": 182.87,
			        "word": " money",
			      },
			      {
			        "end": 183.55,
			        "start": 183.21,
			        "word": " going",
			      },
			      {
			        "end": 183.68,
			        "start": 183.55,
			        "word": " to",
			      },
			      {
			        "end": 184.24,
			        "start": 183.68,
			        "word": " support",
			      },
			      {
			        "end": 184.84,
			        "start": 184.24,
			        "word": " Ukraine",
			      },
			      {
			        "end": 185.3,
			        "start": 184.84,
			        "word": " this",
			      },
			      {
			        "end": 185.4,
			        "start": 185.3,
			        "word": " time",
			      },
			      {
			        "end": 185.82,
			        "start": 185.4,
			        "word": " around",
			      },
			      {
			        "end": 186.1,
			        "start": 185.82,
			        "word": " than",
			      },
			      {
			        "end": 186.42,
			        "start": 186.1,
			        "word": " went",
			      },
			      {
			        "end": 186.59,
			        "start": 186.42,
			        "word": " for",
			      },
			      {
			        "end": 186.8,
			        "start": 186.59,
			        "word": " the",
			      },
			      {
			        "end": 187.22,
			        "start": 186.8,
			        "word": " Gulf",
			      },
			      {
			        "end": 187.29,
			        "start": 187.22,
			        "word": " War",
			      },
			      {
			        "end": 187.6,
			        "start": 187.29,
			        "word": " from",
			      },
			      {
			        "end": 188.24,
			        "start": 187.6,
			        "word": " basically",
			      },
			      {
			        "end": 188.51,
			        "start": 188.24,
			        "word": " all",
			      },
			    ],
			  },
			  {
			    "end": 191.55,
			    "start": 190.2,
			    "text": "Quite striking, really, isn't it",
			    "words": [
			      {
			        "end": 190.48,
			        "start": 190.2,
			        "word": " Quite",
			      },
			      {
			        "end": 190.96,
			        "start": 190.48,
			        "word": " striking",
			      },
			      {
			        "end": 190.96,
			        "start": 190.96,
			        "word": ",",
			      },
			      {
			        "end": 190.96,
			        "start": 190.96,
			        "word": "",
			      },
			      {
			        "end": 191.29,
			        "start": 190.96,
			        "word": " really",
			      },
			      {
			        "end": 191.4,
			        "start": 191.29,
			        "word": ",",
			      },
			      {
			        "end": 191.55,
			        "start": 191.4,
			        "word": " isn",
			      },
			    ],
			  },
			  {
			    "end": 195.27,
			    "start": 192.08,
			    "text": "However okay every country can contribute to more. Worth just saying okay",
			    "words": [
			      {
			        "end": 192.32,
			        "start": 192.08,
			        "word": " However",
			      },
			      {
			        "end": 192.42,
			        "start": 192.32,
			        "word": ",",
			      },
			      {
			        "end": 192.73,
			        "start": 192.42,
			        "word": " okay",
			      },
			      {
			        "end": 192.76,
			        "start": 192.73,
			        "word": ",",
			      },
			      {
			        "end": 193.03,
			        "start": 192.76,
			        "word": " every",
			      },
			      {
			        "end": 193.41,
			        "start": 193.03,
			        "word": " country",
			      },
			      {
			        "end": 193.57,
			        "start": 193.41,
			        "word": " can",
			      },
			      {
			        "end": 194.12,
			        "start": 193.57,
			        "word": " contribute",
			      },
			      {
			        "end": 194.23,
			        "start": 194.12,
			        "word": " to",
			      },
			      {
			        "end": 194.46,
			        "start": 194.23,
			        "word": " more",
			      },
			      {
			        "end": 194.66,
			        "start": 194.46,
			        "word": ".",
			      },
			      {
			        "end": 195.27,
			        "start": 194.66,
			        "word": " Worth",
			      },
			    ],
			  },
			  {
			    "end": 200.06,
			    "start": 196.34,
			    "text": "so when it comes to these bars there's been so much debate recently particularly from Donald Trump",
			    "words": [
			      {
			        "end": 196.65,
			        "start": 196.34,
			        "word": " so",
			      },
			      {
			        "end": 196.75,
			        "start": 196.65,
			        "word": " when",
			      },
			      {
			        "end": 196.81,
			        "start": 196.75,
			        "word": " it",
			      },
			      {
			        "end": 197.01,
			        "start": 196.81,
			        "word": " comes",
			      },
			      {
			        "end": 197.11,
			        "start": 197.01,
			        "word": " to",
			      },
			      {
			        "end": 197.37,
			        "start": 197.11,
			        "word": " these",
			      },
			      {
			        "end": 197.58,
			        "start": 197.37,
			        "word": " bars",
			      },
			      {
			        "end": 197.68,
			        "start": 197.58,
			        "word": ",",
			      },
			      {
			        "end": 197.94,
			        "start": 197.68,
			        "word": " there",
			      },
			      {
			        "end": 198.04,
			        "start": 197.94,
			        "word": "'s",
			      },
			      {
			        "end": 198.25,
			        "start": 198.04,
			        "word": " been",
			      },
			      {
			        "end": 198.41,
			        "start": 198.25,
			        "word": " so",
			      },
			      {
			        "end": 198.56,
			        "start": 198.41,
			        "word": " much",
			      },
			      {
			        "end": 198.87,
			        "start": 198.56,
			        "word": " debate",
			      },
			      {
			        "end": 199.29,
			        "start": 198.87,
			        "word": " recently",
			      },
			      {
			        "end": 199.38,
			        "start": 199.29,
			        "word": ",",
			      },
			      {
			        "end": 200.06,
			        "start": 199.38,
			        "word": " particularly",
			      },
			    ],
			  },
			  {
			    "end": 202.78,
			    "start": 200.94,
			    "text": "a bit of a conversation with Emmanuel Macron about this",
			    "words": [
			      {
			        "end": 200.98,
			        "start": 200.94,
			        "word": " a",
			      },
			      {
			        "end": 201.21,
			        "start": 200.98,
			        "word": " bit",
			      },
			      {
			        "end": 201.24,
			        "start": 201.21,
			        "word": " of",
			      },
			      {
			        "end": 201.29,
			        "start": 201.24,
			        "word": " a",
			      },
			      {
			        "end": 201.9,
			        "start": 201.29,
			        "word": " conversation",
			      },
			      {
			        "end": 202.09,
			        "start": 201.9,
			        "word": " with",
			      },
			      {
			        "end": 202.49,
			        "start": 202.09,
			        "word": " Emmanuel",
			      },
			      {
			        "end": 202.78,
			        "start": 202.49,
			        "word": " Macron",
			      },
			    ],
			  },
			  {
			    "end": 205.86,
			    "start": 203.59,
			    "text": "about how much of this European money was actually a loan",
			    "words": [
			      {
			        "end": 203.62,
			        "start": 203.59,
			        "word": " about",
			      },
			      {
			        "end": 203.74,
			        "start": 203.62,
			        "word": " how",
			      },
			      {
			        "end": 203.94,
			        "start": 203.74,
			        "word": " much",
			      },
			      {
			        "end": 204.04,
			        "start": 203.94,
			        "word": " of",
			      },
			      {
			        "end": 204.24,
			        "start": 204.04,
			        "word": " this",
			      },
			      {
			        "end": 204.71,
			        "start": 204.24,
			        "word": " European",
			      },
			      {
			        "end": 205.08,
			        "start": 204.71,
			        "word": " money",
			      },
			      {
			        "end": 205.28,
			        "start": 205.08,
			        "word": " was",
			      },
			      {
			        "end": 205.86,
			        "start": 205.28,
			        "word": " actually",
			      },
			    ],
			  },
			  {
			    "end": 207.45,
			    "start": 206.31,
			    "text": "So it's going to come back",
			    "words": [
			      {
			        "end": 206.44,
			        "start": 206.31,
			        "word": " So",
			      },
			      {
			        "end": 206.57,
			        "start": 206.44,
			        "word": " it",
			      },
			      {
			        "end": 206.7,
			        "start": 206.57,
			        "word": "'s",
			      },
			      {
			        "end": 207.02,
			        "start": 206.7,
			        "word": " going",
			      },
			      {
			        "end": 207.15,
			        "start": 207.02,
			        "word": " to",
			      },
			      {
			        "end": 207.45,
			        "start": 207.15,
			        "word": " come",
			      },
			    ],
			  },
			  {
			    "end": 209.44,
			    "start": 207.86,
			    "text": "And that's what Donald Trump claimed",
			    "words": [
			      {
			        "end": 208.06,
			        "start": 207.86,
			        "word": " And",
			      },
			      {
			        "end": 208.31,
			        "start": 208.06,
			        "word": " that",
			      },
			      {
			        "end": 208.66,
			        "start": 208.31,
			        "word": "'s",
			      },
			      {
			        "end": 208.7,
			        "start": 208.66,
			        "word": " what",
			      },
			      {
			        "end": 209.17,
			        "start": 208.7,
			        "word": " Donald",
			      },
			      {
			        "end": 209.44,
			        "start": 209.17,
			        "word": " Trump",
			      },
			    ],
			  },
			  {
			    "end": 213.34,
			    "start": 210.05,
			    "text": "It's not entirely true. It's about kind of one third true because some of this money",
			    "words": [
			      {
			        "end": 210.18,
			        "start": 210.05,
			        "word": " It",
			      },
			      {
			        "end": 210.31,
			        "start": 210.18,
			        "word": "'s",
			      },
			      {
			        "end": 210.58,
			        "start": 210.31,
			        "word": " not",
			      },
			      {
			        "end": 211.12,
			        "start": 210.58,
			        "word": " entirely",
			      },
			      {
			        "end": 211.32,
			        "start": 211.12,
			        "word": " true",
			      },
			      {
			        "end": 211.45,
			        "start": 211.32,
			        "word": ".",
			      },
			      {
			        "end": 211.54,
			        "start": 211.45,
			        "word": " It",
			      },
			      {
			        "end": 211.63,
			        "start": 211.54,
			        "word": "'s",
			      },
			      {
			        "end": 211.87,
			        "start": 211.63,
			        "word": " about",
			      },
			      {
			        "end": 212.06,
			        "start": 211.87,
			        "word": " kind",
			      },
			      {
			        "end": 212.15,
			        "start": 212.06,
			        "word": " of",
			      },
			      {
			        "end": 212.36,
			        "start": 212.15,
			        "word": " one",
			      },
			      {
			        "end": 212.52,
			        "start": 212.36,
			        "word": " third",
			      },
			      {
			        "end": 212.72,
			        "start": 212.52,
			        "word": " true",
			      },
			      {
			        "end": 213.06,
			        "start": 212.72,
			        "word": " because",
			      },
			      {
			        "end": 213.34,
			        "start": 213.06,
			        "word": " some",
			      },
			    ],
			  },
			  {
			    "end": 217.6,
			    "start": 213.86,
			    "text": "particularly the financial aid was structured as a loan",
			    "words": [
			      {
			        "end": 214.53,
			        "start": 213.86,
			        "word": " particularly",
			      },
			      {
			        "end": 214.59,
			        "start": 214.53,
			        "word": " the",
			      },
			      {
			        "end": 215.2,
			        "start": 214.59,
			        "word": " financial",
			      },
			      {
			        "end": 215.92,
			        "start": 215.2,
			        "word": " aid",
			      },
			      {
			        "end": 216.4,
			        "start": 215.92,
			        "word": ",",
			      },
			      {
			        "end": 217.02,
			        "start": 216.96,
			        "word": "",
			      },
			      {
			        "end": 217.09,
			        "start": 217.02,
			        "word": " was",
			      },
			      {
			        "end": 217.6,
			        "start": 217.09,
			        "word": " structured",
			      },
			    ],
			  },
			  {
			    "end": 220.61,
			    "start": 217.96,
			    "text": "So some of that money theoretically will come back to Europe after a long period",
			    "words": [
			      {
			        "end": 218.04,
			        "start": 217.96,
			        "word": " So",
			      },
			      {
			        "end": 218.24,
			        "start": 218.04,
			        "word": " some",
			      },
			      {
			        "end": 218.35,
			        "start": 218.24,
			        "word": " of",
			      },
			      {
			        "end": 218.48,
			        "start": 218.35,
			        "word": " that",
			      },
			      {
			        "end": 218.7,
			        "start": 218.48,
			        "word": " money",
			      },
			      {
			        "end": 219.29,
			        "start": 218.7,
			        "word": " theoretically",
			      },
			      {
			        "end": 219.45,
			        "start": 219.29,
			        "word": " will",
			      },
			      {
			        "end": 219.62,
			        "start": 219.45,
			        "word": " come",
			      },
			      {
			        "end": 219.79,
			        "start": 219.62,
			        "word": " back",
			      },
			      {
			        "end": 219.88,
			        "start": 219.79,
			        "word": " to",
			      },
			      {
			        "end": 220.24,
			        "start": 219.88,
			        "word": " Europe",
			      },
			      {
			        "end": 220.61,
			        "start": 220.24,
			        "word": " after",
			      },
			    ],
			  },
			  {
			    "end": 222.41,
			    "start": 221.6,
			    "text": "It's a pretty lax loan",
			    "words": [
			      {
			        "end": 221.75,
			        "start": 221.6,
			        "word": " It",
			      },
			      {
			        "end": 221.8,
			        "start": 221.75,
			        "word": "'s",
			      },
			      {
			        "end": 221.86,
			        "start": 221.8,
			        "word": " a",
			      },
			      {
			        "end": 222.35,
			        "start": 221.86,
			        "word": " pretty",
			      },
			      {
			        "end": 222.37,
			        "start": 222.35,
			        "word": " la",
			      },
			      {
			        "end": 222.41,
			        "start": 222.37,
			        "word": "x",
			      },
			    ],
			  },
			  {
			    "end": 224.81,
			    "start": 222.87,
			    "text": "But still, it is a loan, whereas that's a grant",
			    "words": [
			      {
			        "end": 223.11,
			        "start": 222.87,
			        "word": " But",
			      },
			      {
			        "end": 223.45,
			        "start": 223.11,
			        "word": " still",
			      },
			      {
			        "end": 223.5,
			        "start": 223.45,
			        "word": ",",
			      },
			      {
			        "end": 223.57,
			        "start": 223.5,
			        "word": " it",
			      },
			      {
			        "end": 223.73,
			        "start": 223.57,
			        "word": " is",
			      },
			      {
			        "end": 223.75,
			        "start": 223.73,
			        "word": " a",
			      },
			      {
			        "end": 224,
			        "start": 223.75,
			        "word": " loan",
			      },
			      {
			        "end": 224.11,
			        "start": 224,
			        "word": ",",
			      },
			      {
			        "end": 224.6,
			        "start": 224.11,
			        "word": " whereas",
			      },
			      {
			        "end": 224.81,
			        "start": 224.6,
			        "word": " that",
			      },
			    ],
			  },
			  {
			    "end": 228.22,
			    "start": 225.62,
			    "text": "And that is why Donald Trump is saying, look, we take that money",
			    "words": [
			      {
			        "end": 226.09,
			        "start": 225.62,
			        "word": " And",
			      },
			      {
			        "end": 226.34,
			        "start": 226.09,
			        "word": " that",
			      },
			      {
			        "end": 226.42,
			        "start": 226.34,
			        "word": " is",
			      },
			      {
			        "end": 226.54,
			        "start": 226.42,
			        "word": " why",
			      },
			      {
			        "end": 226.87,
			        "start": 226.54,
			        "word": " Donald",
			      },
			      {
			        "end": 227.18,
			        "start": 226.87,
			        "word": " Trump",
			      },
			      {
			        "end": 227.21,
			        "start": 227.18,
			        "word": " is",
			      },
			      {
			        "end": 227.52,
			        "start": 227.21,
			        "word": " saying",
			      },
			      {
			        "end": 227.64,
			        "start": 227.52,
			        "word": ",",
			      },
			      {
			        "end": 227.87,
			        "start": 227.64,
			        "word": " look",
			      },
			      {
			        "end": 227.92,
			        "start": 227.87,
			        "word": ",",
			      },
			      {
			        "end": 228.02,
			        "start": 227.92,
			        "word": " we",
			      },
			      {
			        "end": 228.22,
			        "start": 228.02,
			        "word": " take",
			      },
			    ],
			  },
			  {
			    "end": 229.84,
			    "start": 228.84,
			    "text": "We need to get something back",
			    "words": [
			      {
			        "end": 228.93,
			        "start": 228.84,
			        "word": " We",
			      },
			      {
			        "end": 229.13,
			        "start": 228.93,
			        "word": " need",
			      },
			      {
			        "end": 229.23,
			        "start": 229.13,
			        "word": " to",
			      },
			      {
			        "end": 229.38,
			        "start": 229.23,
			        "word": " get",
			      },
			      {
			        "end": 229.84,
			        "start": 229.38,
			        "word": " something",
			      },
			    ],
			  },
			  {
			    "end": 230.54,
			    "start": 230.18,
			    "text": "Okay",
			    "words": [
			      {
			        "end": 230.54,
			        "start": 230.18,
			        "word": " Okay",
			      },
			    ],
			  },
			  {
			    "end": 233.07,
			    "start": 230.62,
			    "text": "And he says he's done a deal or at least he's in the process of doing a deal",
			    "words": [
			      {
			        "end": 230.71,
			        "start": 230.62,
			        "word": " And",
			      },
			      {
			        "end": 230.79,
			        "start": 230.71,
			        "word": " he",
			      },
			      {
			        "end": 231.12,
			        "start": 230.79,
			        "word": " says",
			      },
			      {
			        "end": 231.2,
			        "start": 231.12,
			        "word": " he",
			      },
			      {
			        "end": 231.28,
			        "start": 231.2,
			        "word": "'s",
			      },
			      {
			        "end": 231.47,
			        "start": 231.28,
			        "word": " done",
			      },
			      {
			        "end": 231.58,
			        "start": 231.47,
			        "word": " a",
			      },
			      {
			        "end": 231.71,
			        "start": 231.58,
			        "word": " deal",
			      },
			      {
			        "end": 231.8,
			        "start": 231.71,
			        "word": ",",
			      },
			      {
			        "end": 231.89,
			        "start": 231.8,
			        "word": " or",
			      },
			      {
			        "end": 232.2,
			        "start": 231.89,
			        "word": " at",
			      },
			      {
			        "end": 232.24,
			        "start": 232.2,
			        "word": " least",
			      },
			      {
			        "end": 232.34,
			        "start": 232.24,
			        "word": " he",
			      },
			      {
			        "end": 232.42,
			        "start": 232.34,
			        "word": "'s",
			      },
			      {
			        "end": 232.53,
			        "start": 232.42,
			        "word": " in",
			      },
			      {
			        "end": 232.67,
			        "start": 232.53,
			        "word": " the",
			      },
			      {
			        "end": 233.07,
			        "start": 232.67,
			        "word": " process",
			      },
			    ],
			  },
			  {
			    "end": 237.01,
			    "start": 233.68,
			    "text": "certainly nothing's been signed yet with the Ukrainian president",
			    "words": [
			      {
			        "end": 234.27,
			        "start": 233.68,
			        "word": " certainly",
			      },
			      {
			        "end": 234.46,
			        "start": 234.27,
			        "word": " nothing",
			      },
			      {
			        "end": 234.55,
			        "start": 234.46,
			        "word": "'s",
			      },
			      {
			        "end": 234.74,
			        "start": 234.55,
			        "word": " been",
			      },
			      {
			        "end": 235.06,
			        "start": 234.74,
			        "word": " signed",
			      },
			      {
			        "end": 235.17,
			        "start": 235.06,
			        "word": " yet",
			      },
			      {
			        "end": 235.42,
			        "start": 235.17,
			        "word": ",",
			      },
			      {
			        "end": 235.77,
			        "start": 235.76,
			        "word": "",
			      },
			      {
			        "end": 236.07,
			        "start": 235.77,
			        "word": " with",
			      },
			      {
			        "end": 236.3,
			        "start": 236.07,
			        "word": " the",
			      },
			      {
			        "end": 237.01,
			        "start": 236.3,
			        "word": " Ukrainian",
			      },
			    ],
			  },
			  {
			    "end": 242.42,
			    "start": 237.87,
			    "text": "where he thinks it could be $500 billion back in return for all of that aid given",
			    "words": [
			      {
			        "end": 238.32,
			        "start": 237.87,
			        "word": " where",
			      },
			      {
			        "end": 238.46,
			        "start": 238.32,
			        "word": " he",
			      },
			      {
			        "end": 238.89,
			        "start": 238.46,
			        "word": " thinks",
			      },
			      {
			        "end": 239.03,
			        "start": 238.89,
			        "word": " it",
			      },
			      {
			        "end": 239.42,
			        "start": 239.03,
			        "word": " could",
			      },
			      {
			        "end": 239.57,
			        "start": 239.42,
			        "word": " be",
			      },
			      {
			        "end": 239.64,
			        "start": 239.57,
			        "word": " $",
			      },
			      {
			        "end": 240.35,
			        "start": 239.64,
			        "word": "500",
			      },
			      {
			        "end": 241.17,
			        "start": 240.35,
			        "word": " billion",
			      },
			      {
			        "end": 241.21,
			        "start": 241.17,
			        "word": " back",
			      },
			      {
			        "end": 241.36,
			        "start": 241.21,
			        "word": " in",
			      },
			      {
			        "end": 241.9,
			        "start": 241.36,
			        "word": " return",
			      },
			      {
			        "end": 242.18,
			        "start": 241.9,
			        "word": " for",
			      },
			      {
			        "end": 242.3,
			        "start": 242.18,
			        "word": " all",
			      },
			      {
			        "end": 242.42,
			        "start": 242.3,
			        "word": " of",
			      },
			    ],
			  },
			  {
			    "end": 246.42,
			    "start": 243.08,
			    "text": "You're probably wondering at this stage how on earth do you get $500 billion out of Ukraine? Well",
			    "words": [
			      {
			        "end": 243.22,
			        "start": 243.08,
			        "word": " You",
			      },
			      {
			        "end": 243.33,
			        "start": 243.22,
			        "word": "'re",
			      },
			      {
			        "end": 243.87,
			        "start": 243.33,
			        "word": " probably",
			      },
			      {
			        "end": 244.12,
			        "start": 243.87,
			        "word": " wondering",
			      },
			      {
			        "end": 244.21,
			        "start": 244.12,
			        "word": " at",
			      },
			      {
			        "end": 244.39,
			        "start": 244.21,
			        "word": " this",
			      },
			      {
			        "end": 244.62,
			        "start": 244.39,
			        "word": " stage",
			      },
			      {
			        "end": 244.73,
			        "start": 244.62,
			        "word": ",",
			      },
			      {
			        "end": 244.85,
			        "start": 244.73,
			        "word": " how",
			      },
			      {
			        "end": 245.01,
			        "start": 244.85,
			        "word": " on",
			      },
			      {
			        "end": 245.16,
			        "start": 245.01,
			        "word": " earth",
			      },
			      {
			        "end": 245.25,
			        "start": 245.16,
			        "word": " do",
			      },
			      {
			        "end": 245.45,
			        "start": 245.25,
			        "word": " you",
			      },
			      {
			        "end": 245.51,
			        "start": 245.45,
			        "word": " get",
			      },
			      {
			        "end": 245.54,
			        "start": 245.51,
			        "word": " $",
			      },
			      {
			        "end": 246.06,
			        "start": 245.54,
			        "word": "500",
			      },
			      {
			        "end": 246.42,
			        "start": 246.06,
			        "word": " billion",
			      },
			    ],
			  },
			  {
			    "end": 249.52,
			    "start": 247.91,
			    "text": "the answer he says is rare earths",
			    "words": [
			      {
			        "end": 248.12,
			        "start": 247.91,
			        "word": " the",
			      },
			      {
			        "end": 248.46,
			        "start": 248.12,
			        "word": " answer",
			      },
			      {
			        "end": 248.58,
			        "start": 248.46,
			        "word": ",",
			      },
			      {
			        "end": 248.7,
			        "start": 248.58,
			        "word": " he",
			      },
			      {
			        "end": 248.94,
			        "start": 248.7,
			        "word": " says",
			      },
			      {
			        "end": 249.06,
			        "start": 248.94,
			        "word": ",",
			      },
			      {
			        "end": 249.17,
			        "start": 249.06,
			        "word": " is",
			      },
			      {
			        "end": 249.52,
			        "start": 249.17,
			        "word": " rare",
			      },
			    ],
			  },
			  {
			    "end": 250.91,
			    "start": 249.97,
			    "text": "What are rare earths",
			    "words": [
			      {
			        "end": 250.25,
			        "start": 249.97,
			        "word": " What",
			      },
			      {
			        "end": 250.39,
			        "start": 250.25,
			        "word": " are",
			      },
			      {
			        "end": 250.63,
			        "start": 250.39,
			        "word": " rare",
			      },
			      {
			        "end": 250.91,
			        "start": 250.63,
			        "word": " earth",
			      },
			    ],
			  },
			  {
			    "end": 255.48,
			    "start": 251.42,
			    "text": "They're a type of critical mineral, mostly used in electronics and military equipment as well",
			    "words": [
			      {
			        "end": 251.5,
			        "start": 251.42,
			        "word": " They",
			      },
			      {
			        "end": 251.6,
			        "start": 251.5,
			        "word": "'re",
			      },
			      {
			        "end": 251.66,
			        "start": 251.6,
			        "word": " a",
			      },
			      {
			        "end": 252.05,
			        "start": 251.66,
			        "word": " type",
			      },
			      {
			        "end": 252.18,
			        "start": 252.05,
			        "word": " of",
			      },
			      {
			        "end": 252.7,
			        "start": 252.18,
			        "word": " critical",
			      },
			      {
			        "end": 253.22,
			        "start": 252.7,
			        "word": " mineral",
			      },
			      {
			        "end": 253.28,
			        "start": 253.22,
			        "word": ",",
			      },
			      {
			        "end": 253.67,
			        "start": 253.28,
			        "word": " mostly",
			      },
			      {
			        "end": 253.94,
			        "start": 253.67,
			        "word": " used",
			      },
			      {
			        "end": 254.06,
			        "start": 253.94,
			        "word": " in",
			      },
			      {
			        "end": 254.82,
			        "start": 254.06,
			        "word": " electronics",
			      },
			      {
			        "end": 254.96,
			        "start": 254.82,
			        "word": " and",
			      },
			      {
			        "end": 255.48,
			        "start": 254.96,
			        "word": " military",
			      },
			    ],
			  },
			  {
			    "end": 260.79,
			    "start": 256.83,
			    "text": "And there are some rare earths deposits in Ukraine. This is a kind of mineral map of the country",
			    "words": [
			      {
			        "end": 256.92,
			        "start": 256.83,
			        "word": " And",
			      },
			      {
			        "end": 257.15,
			        "start": 256.92,
			        "word": " there",
			      },
			      {
			        "end": 257.4,
			        "start": 257.15,
			        "word": " are",
			      },
			      {
			        "end": 257.66,
			        "start": 257.4,
			        "word": " some",
			      },
			      {
			        "end": 257.92,
			        "start": 257.66,
			        "word": " rare",
			      },
			      {
			        "end": 258.27,
			        "start": 257.92,
			        "word": " earth",
			      },
			      {
			        "end": 258.29,
			        "start": 258.27,
			        "word": "s",
			      },
			      {
			        "end": 258.85,
			        "start": 258.29,
			        "word": " deposits",
			      },
			      {
			        "end": 259,
			        "start": 258.85,
			        "word": " in",
			      },
			      {
			        "end": 259.38,
			        "start": 259,
			        "word": " Ukraine",
			      },
			      {
			        "end": 259.55,
			        "start": 259.38,
			        "word": ".",
			      },
			      {
			        "end": 259.8,
			        "start": 259.55,
			        "word": " This",
			      },
			      {
			        "end": 259.92,
			        "start": 259.8,
			        "word": " is",
			      },
			      {
			        "end": 259.98,
			        "start": 259.92,
			        "word": " a",
			      },
			      {
			        "end": 260.25,
			        "start": 259.98,
			        "word": " kind",
			      },
			      {
			        "end": 260.38,
			        "start": 260.25,
			        "word": " of",
			      },
			      {
			        "end": 260.79,
			        "start": 260.38,
			        "word": " mineral",
			      },
			    ],
			  },
			  {
			    "end": 265.9,
			    "start": 261.92,
			    "text": "If we zoom into this area here it's in actually the occupied territory which is I think",
			    "words": [
			      {
			        "end": 262.1,
			        "start": 261.92,
			        "word": " If",
			      },
			      {
			        "end": 262.16,
			        "start": 262.1,
			        "word": " we",
			      },
			      {
			        "end": 262.41,
			        "start": 262.16,
			        "word": " zoom",
			      },
			      {
			        "end": 262.66,
			        "start": 262.41,
			        "word": " into",
			      },
			      {
			        "end": 263.04,
			        "start": 262.66,
			        "word": " this",
			      },
			      {
			        "end": 263.36,
			        "start": 263.04,
			        "word": " area",
			      },
			      {
			        "end": 263.73,
			        "start": 263.36,
			        "word": " here",
			      },
			      {
			        "end": 263.92,
			        "start": 263.73,
			        "word": ",",
			      },
			      {
			        "end": 263.92,
			        "start": 263.92,
			        "word": "",
			      },
			      {
			        "end": 264.14,
			        "start": 263.92,
			        "word": " it",
			      },
			      {
			        "end": 264.14,
			        "start": 264.14,
			        "word": "'s",
			      },
			      {
			        "end": 264.59,
			        "start": 264.14,
			        "word": " in",
			      },
			      {
			        "end": 264.75,
			        "start": 264.59,
			        "word": " actually",
			      },
			      {
			        "end": 264.88,
			        "start": 264.75,
			        "word": " the",
			      },
			      {
			        "end": 265.34,
			        "start": 264.88,
			        "word": " occupied",
			      },
			      {
			        "end": 265.9,
			        "start": 265.34,
			        "word": " territory",
			      },
			    ],
			  },
			  {
			    "end": 270.27,
			    "start": 266.96,
			    "text": "part of the point here. And the Ukrainians were suggesting this",
			    "words": [
			      {
			        "end": 267.13,
			        "start": 266.96,
			        "word": " part",
			      },
			      {
			        "end": 267.27,
			        "start": 267.13,
			        "word": " of",
			      },
			      {
			        "end": 267.41,
			        "start": 267.27,
			        "word": " the",
			      },
			      {
			        "end": 267.73,
			        "start": 267.41,
			        "word": " point",
			      },
			      {
			        "end": 267.92,
			        "start": 267.73,
			        "word": " here",
			      },
			      {
			        "end": 268.44,
			        "start": 267.92,
			        "word": ".",
			      },
			      {
			        "end": 268.52,
			        "start": 268.44,
			        "word": " And",
			      },
			      {
			        "end": 268.7,
			        "start": 268.52,
			        "word": " the",
			      },
			      {
			        "end": 268.91,
			        "start": 268.7,
			        "word": " Ukrain",
			      },
			      {
			        "end": 269.06,
			        "start": 268.91,
			        "word": "ians",
			      },
			      {
			        "end": 269.34,
			        "start": 269.06,
			        "word": " were",
			      },
			      {
			        "end": 270.27,
			        "start": 269.34,
			        "word": " suggesting",
			      },
			    ],
			  },
			  {
			    "end": 273.28,
			    "start": 270.75,
			    "text": "Old Soviet deposit here supposedly has lots of rare earths",
			    "words": [
			      {
			        "end": 270.82,
			        "start": 270.75,
			        "word": " Old",
			      },
			      {
			        "end": 271.18,
			        "start": 270.82,
			        "word": " Soviet",
			      },
			      {
			        "end": 271.66,
			        "start": 271.18,
			        "word": " deposit",
			      },
			      {
			        "end": 271.94,
			        "start": 271.66,
			        "word": " here",
			      },
			      {
			        "end": 272.65,
			        "start": 271.94,
			        "word": " supposedly",
			      },
			      {
			        "end": 272.9,
			        "start": 272.65,
			        "word": " has",
			      },
			      {
			        "end": 273.14,
			        "start": 272.9,
			        "word": " lots",
			      },
			      {
			        "end": 273.28,
			        "start": 273.14,
			        "word": " of",
			      },
			    ],
			  },
			  {
			    "end": 277.78,
			    "start": 274.32,
			    "text": "The issue though and the reason of course obviously Donald Trump wants to do this",
			    "words": [
			      {
			        "end": 274.93,
			        "start": 274.32,
			        "word": " The",
			      },
			      {
			        "end": 275.38,
			        "start": 274.93,
			        "word": " issue",
			      },
			      {
			        "end": 275.66,
			        "start": 275.38,
			        "word": " though",
			      },
			      {
			        "end": 275.75,
			        "start": 275.66,
			        "word": ",",
			      },
			      {
			        "end": 275.89,
			        "start": 275.75,
			        "word": " and",
			      },
			      {
			        "end": 276.03,
			        "start": 275.89,
			        "word": " the",
			      },
			      {
			        "end": 276.35,
			        "start": 276.03,
			        "word": " reason",
			      },
			      {
			        "end": 276.4,
			        "start": 276.35,
			        "word": ",",
			      },
			      {
			        "end": 276.49,
			        "start": 276.4,
			        "word": " of",
			      },
			      {
			        "end": 276.77,
			        "start": 276.49,
			        "word": " course",
			      },
			      {
			        "end": 276.86,
			        "start": 276.77,
			        "word": ",",
			      },
			      {
			        "end": 277.29,
			        "start": 276.86,
			        "word": " obviously",
			      },
			      {
			        "end": 277.56,
			        "start": 277.29,
			        "word": " Donald",
			      },
			      {
			        "end": 277.78,
			        "start": 277.56,
			        "word": " Trump",
			      },
			    ],
			  },
			  {
			    "end": 280.99,
			    "start": 278.5,
			    "text": "is when you look at total rare earth production around the world",
			    "words": [
			      {
			        "end": 278.57,
			        "start": 278.5,
			        "word": " is",
			      },
			      {
			        "end": 278.76,
			        "start": 278.57,
			        "word": " when",
			      },
			      {
			        "end": 278.9,
			        "start": 278.76,
			        "word": " you",
			      },
			      {
			        "end": 279.09,
			        "start": 278.9,
			        "word": " look",
			      },
			      {
			        "end": 279.27,
			        "start": 279.09,
			        "word": " at",
			      },
			      {
			        "end": 279.68,
			        "start": 279.27,
			        "word": " total",
			      },
			      {
			        "end": 279.89,
			        "start": 279.68,
			        "word": " rare",
			      },
			      {
			        "end": 280.15,
			        "start": 279.89,
			        "word": " earth",
			      },
			      {
			        "end": 280.68,
			        "start": 280.15,
			        "word": " production",
			      },
			      {
			        "end": 280.99,
			        "start": 280.68,
			        "word": " around",
			      },
			    ],
			  },
			  {
			    "end": 284.36,
			    "start": 281.63,
			    "text": "and you need rare earths for like electric cars for the magnets in those cars",
			    "words": [
			      {
			        "end": 281.65,
			        "start": 281.63,
			        "word": " and",
			      },
			      {
			        "end": 281.8,
			        "start": 281.65,
			        "word": " you",
			      },
			      {
			        "end": 282.01,
			        "start": 281.8,
			        "word": " need",
			      },
			      {
			        "end": 282.22,
			        "start": 282.01,
			        "word": " rare",
			      },
			      {
			        "end": 282.46,
			        "start": 282.22,
			        "word": " earth",
			      },
			      {
			        "end": 282.61,
			        "start": 282.46,
			        "word": "s",
			      },
			      {
			        "end": 282.68,
			        "start": 282.61,
			        "word": " for",
			      },
			      {
			        "end": 282.97,
			        "start": 282.68,
			        "word": " like",
			      },
			      {
			        "end": 283.31,
			        "start": 282.97,
			        "word": " electric",
			      },
			      {
			        "end": 283.52,
			        "start": 283.31,
			        "word": " cars",
			      },
			      {
			        "end": 283.62,
			        "start": 283.52,
			        "word": ",",
			      },
			      {
			        "end": 283.82,
			        "start": 283.62,
			        "word": " for",
			      },
			      {
			        "end": 284.04,
			        "start": 283.82,
			        "word": " the",
			      },
			      {
			        "end": 284.36,
			        "start": 284.04,
			        "word": " magnets",
			      },
			    ],
			  },
			  {
			    "end": 288.73,
			    "start": 285.26,
			    "text": "for all of those wind turbines it's magnets it's military equipment",
			    "words": [
			      {
			        "end": 285.63,
			        "start": 285.26,
			        "word": " for",
			      },
			      {
			        "end": 285.73,
			        "start": 285.63,
			        "word": " all",
			      },
			      {
			        "end": 285.76,
			        "start": 285.73,
			        "word": " of",
			      },
			      {
			        "end": 286.1,
			        "start": 285.76,
			        "word": " those",
			      },
			      {
			        "end": 286.37,
			        "start": 286.1,
			        "word": " wind",
			      },
			      {
			        "end": 286.96,
			        "start": 286.37,
			        "word": " turbines",
			      },
			      {
			        "end": 287.05,
			        "start": 286.96,
			        "word": ",",
			      },
			      {
			        "end": 287.18,
			        "start": 287.05,
			        "word": " it",
			      },
			      {
			        "end": 287.36,
			        "start": 287.18,
			        "word": "'s",
			      },
			      {
			        "end": 287.82,
			        "start": 287.36,
			        "word": " magnets",
			      },
			      {
			        "end": 287.92,
			        "start": 287.82,
			        "word": ",",
			      },
			      {
			        "end": 288.05,
			        "start": 287.92,
			        "word": " it",
			      },
			      {
			        "end": 288.26,
			        "start": 288.05,
			        "word": "'s",
			      },
			      {
			        "end": 288.73,
			        "start": 288.26,
			        "word": " military",
			      },
			    ],
			  },
			  {
			    "end": 292.19,
			    "start": 289.65,
			    "text": "China is massively dominant when it comes to mining rare earths",
			    "words": [
			      {
			        "end": 289.88,
			        "start": 289.65,
			        "word": " China",
			      },
			      {
			        "end": 290.13,
			        "start": 289.88,
			        "word": " is",
			      },
			      {
			        "end": 290.64,
			        "start": 290.13,
			        "word": " massively",
			      },
			      {
			        "end": 290.64,
			        "start": 290.64,
			        "word": "",
			      },
			      {
			        "end": 291.1,
			        "start": 290.64,
			        "word": " dominant",
			      },
			      {
			        "end": 291.32,
			        "start": 291.1,
			        "word": " when",
			      },
			      {
			        "end": 291.44,
			        "start": 291.32,
			        "word": " it",
			      },
			      {
			        "end": 291.73,
			        "start": 291.44,
			        "word": " comes",
			      },
			      {
			        "end": 291.84,
			        "start": 291.73,
			        "word": " to",
			      },
			      {
			        "end": 292.19,
			        "start": 291.84,
			        "word": " mining",
			      },
			    ],
			  },
			  {
			    "end": 295.86,
			    "start": 292.81,
			    "text": "It's massively dominant when it comes to refining rare earths",
			    "words": [
			      {
			        "end": 293.15,
			        "start": 292.81,
			        "word": " It",
			      },
			      {
			        "end": 293.19,
			        "start": 293.15,
			        "word": "'s",
			      },
			      {
			        "end": 293.68,
			        "start": 293.19,
			        "word": " massively",
			      },
			      {
			        "end": 294.13,
			        "start": 293.68,
			        "word": " dominant",
			      },
			      {
			        "end": 294.38,
			        "start": 294.13,
			        "word": " when",
			      },
			      {
			        "end": 294.47,
			        "start": 294.38,
			        "word": " it",
			      },
			      {
			        "end": 294.76,
			        "start": 294.47,
			        "word": " comes",
			      },
			      {
			        "end": 295.22,
			        "start": 294.76,
			        "word": " to",
			      },
			      {
			        "end": 295.31,
			        "start": 295.22,
			        "word": " ref",
			      },
			      {
			        "end": 295.86,
			        "start": 295.31,
			        "word": "ining",
			      },
			    ],
			  },
			  {
			    "end": 298.31,
			    "start": 296.54,
			    "text": "which is really the hardest thing to do when it comes to rare earths",
			    "words": [
			      {
			        "end": 296.72,
			        "start": 296.54,
			        "word": " which",
			      },
			      {
			        "end": 296.8,
			        "start": 296.72,
			        "word": " is",
			      },
			      {
			        "end": 297.04,
			        "start": 296.8,
			        "word": " really",
			      },
			      {
			        "end": 297.2,
			        "start": 297.04,
			        "word": " the",
			      },
			      {
			        "end": 297.52,
			        "start": 297.2,
			        "word": " hardest",
			      },
			      {
			        "end": 297.64,
			        "start": 297.52,
			        "word": " thing",
			      },
			      {
			        "end": 297.71,
			        "start": 297.64,
			        "word": " to",
			      },
			      {
			        "end": 297.83,
			        "start": 297.71,
			        "word": " do",
			      },
			      {
			        "end": 298.04,
			        "start": 297.83,
			        "word": " when",
			      },
			      {
			        "end": 298.07,
			        "start": 298.04,
			        "word": " it",
			      },
			      {
			        "end": 298.24,
			        "start": 298.07,
			        "word": " comes",
			      },
			      {
			        "end": 298.31,
			        "start": 298.24,
			        "word": " to",
			      },
			    ],
			  },
			  {
			    "end": 301.72,
			    "start": 298.8,
			    "text": "because it's really expensive. It's really energy intensive. Totally totally dominant",
			    "words": [
			      {
			        "end": 299.08,
			        "start": 298.8,
			        "word": " because",
			      },
			      {
			        "end": 299.21,
			        "start": 299.08,
			        "word": " it",
			      },
			      {
			        "end": 299.28,
			        "start": 299.21,
			        "word": "'s",
			      },
			      {
			        "end": 299.42,
			        "start": 299.28,
			        "word": " really",
			      },
			      {
			        "end": 299.86,
			        "start": 299.42,
			        "word": " expensive",
			      },
			      {
			        "end": 300,
			        "start": 299.86,
			        "word": ".",
			      },
			      {
			        "end": 300.09,
			        "start": 300,
			        "word": " It",
			      },
			      {
			        "end": 300.18,
			        "start": 300.09,
			        "word": "'s",
			      },
			      {
			        "end": 300.49,
			        "start": 300.18,
			        "word": " really",
			      },
			      {
			        "end": 300.76,
			        "start": 300.49,
			        "word": " energy",
			      },
			      {
			        "end": 301.34,
			        "start": 300.76,
			        "word": " intensive",
			      },
			      {
			        "end": 301.34,
			        "start": 301.34,
			        "word": ".",
			      },
			      {
			        "end": 301.72,
			        "start": 301.34,
			        "word": " Totally",
			      },
			    ],
			  },
			  {
			    "end": 303.27,
			    "start": 302.64,
			    "text": "So you can see again",
			    "words": [
			      {
			        "end": 302.73,
			        "start": 302.64,
			        "word": " So",
			      },
			      {
			        "end": 302.89,
			        "start": 302.73,
			        "word": " you",
			      },
			      {
			        "end": 303.03,
			        "start": 302.89,
			        "word": " can",
			      },
			      {
			        "end": 303.15,
			        "start": 303.03,
			        "word": " see",
			      },
			      {
			        "end": 303.27,
			        "start": 303.15,
			        "word": ",",
			      },
			    ],
			  },
			  {
			    "end": 307.51,
			    "start": 303.72,
			    "text": "the geopolitical reasons why Donald Trump might want to think Ukraine might solve you know",
			    "words": [
			      {
			        "end": 304.38,
			        "start": 303.72,
			        "word": " the",
			      },
			      {
			        "end": 304.79,
			        "start": 304.38,
			        "word": " geopolit",
			      },
			      {
			        "end": 304.99,
			        "start": 304.79,
			        "word": "ical",
			      },
			      {
			        "end": 305.35,
			        "start": 304.99,
			        "word": " reasons",
			      },
			      {
			        "end": 305.5,
			        "start": 305.35,
			        "word": " why",
			      },
			      {
			        "end": 305.83,
			        "start": 305.5,
			        "word": " Donald",
			      },
			      {
			        "end": 306.07,
			        "start": 305.83,
			        "word": " Trump",
			      },
			      {
			        "end": 306.33,
			        "start": 306.07,
			        "word": " might",
			      },
			      {
			        "end": 306.53,
			        "start": 306.33,
			        "word": " want",
			      },
			      {
			        "end": 306.63,
			        "start": 306.53,
			        "word": " to",
			      },
			      {
			        "end": 307.11,
			        "start": 306.63,
			        "word": " think",
			      },
			      {
			        "end": 307.28,
			        "start": 307.11,
			        "word": " Ukraine",
			      },
			      {
			        "end": 307.51,
			        "start": 307.28,
			        "word": " might",
			      },
			    ],
			  },
			  {
			    "end": 311.38,
			    "start": 308.32,
			    "text": "kill two birds with one stone here. However look at the actual data",
			    "words": [
			      {
			        "end": 308.52,
			        "start": 308.32,
			        "word": " kill",
			      },
			      {
			        "end": 308.78,
			        "start": 308.52,
			        "word": " two",
			      },
			      {
			        "end": 308.96,
			        "start": 308.78,
			        "word": " birds",
			      },
			      {
			        "end": 309.2,
			        "start": 308.96,
			        "word": " with",
			      },
			      {
			        "end": 309.38,
			        "start": 309.2,
			        "word": " one",
			      },
			      {
			        "end": 309.68,
			        "start": 309.38,
			        "word": " stone",
			      },
			      {
			        "end": 309.91,
			        "start": 309.68,
			        "word": " here",
			      },
			      {
			        "end": 310.44,
			        "start": 309.91,
			        "word": ".",
			      },
			      {
			        "end": 310.52,
			        "start": 310.44,
			        "word": " However",
			      },
			      {
			        "end": 310.64,
			        "start": 310.52,
			        "word": ",",
			      },
			      {
			        "end": 310.88,
			        "start": 310.64,
			        "word": " look",
			      },
			      {
			        "end": 311.18,
			        "start": 310.88,
			        "word": " at",
			      },
			      {
			        "end": 311.38,
			        "start": 311.18,
			        "word": " the",
			      },
			    ],
			  },
			  {
			    "end": 316.35,
			    "start": 311.9,
			    "text": "and it's not altogether obvious that there are many rare earths in Ukraine. Even if you take account of that mine",
			    "words": [
			      {
			        "end": 312.08,
			        "start": 311.9,
			        "word": " and",
			      },
			      {
			        "end": 312.2,
			        "start": 312.08,
			        "word": " it",
			      },
			      {
			        "end": 312.32,
			        "start": 312.2,
			        "word": "'s",
			      },
			      {
			        "end": 312.51,
			        "start": 312.32,
			        "word": " not",
			      },
			      {
			        "end": 313.1,
			        "start": 312.51,
			        "word": " altogether",
			      },
			      {
			        "end": 313.51,
			        "start": 313.1,
			        "word": " obvious",
			      },
			      {
			        "end": 313.83,
			        "start": 313.51,
			        "word": " that",
			      },
			      {
			        "end": 314.15,
			        "start": 313.83,
			        "word": " there",
			      },
			      {
			        "end": 314.42,
			        "start": 314.15,
			        "word": " are",
			      },
			      {
			        "end": 314.7,
			        "start": 314.42,
			        "word": " many",
			      },
			      {
			        "end": 314.89,
			        "start": 314.7,
			        "word": " rare",
			      },
			      {
			        "end": 315.13,
			        "start": 314.89,
			        "word": " earth",
			      },
			      {
			        "end": 315.22,
			        "start": 315.13,
			        "word": "s",
			      },
			      {
			        "end": 315.56,
			        "start": 315.22,
			        "word": " in",
			      },
			      {
			        "end": 315.6,
			        "start": 315.56,
			        "word": " Ukraine",
			      },
			      {
			        "end": 315.74,
			        "start": 315.6,
			        "word": ".",
			      },
			      {
			        "end": 315.93,
			        "start": 315.74,
			        "word": " Even",
			      },
			      {
			        "end": 316.02,
			        "start": 315.93,
			        "word": " if",
			      },
			      {
			        "end": 316.16,
			        "start": 316.02,
			        "word": " you",
			      },
			      {
			        "end": 316.35,
			        "start": 316.16,
			        "word": " take",
			      },
			    ],
			  },
			  {
			    "end": 318.84,
			    "start": 317.25,
			    "text": "which like I say it's been around for a long time",
			    "words": [
			      {
			        "end": 317.49,
			        "start": 317.25,
			        "word": " which",
			      },
			      {
			        "end": 317.58,
			        "start": 317.49,
			        "word": ",",
			      },
			      {
			        "end": 317.81,
			        "start": 317.58,
			        "word": " like",
			      },
			      {
			        "end": 317.81,
			        "start": 317.81,
			        "word": " I",
			      },
			      {
			        "end": 317.95,
			        "start": 317.81,
			        "word": " say",
			      },
			      {
			        "end": 318.04,
			        "start": 317.95,
			        "word": ",",
			      },
			      {
			        "end": 318.22,
			        "start": 318.04,
			        "word": " it",
			      },
			      {
			        "end": 318.26,
			        "start": 318.22,
			        "word": "'s",
			      },
			      {
			        "end": 318.42,
			        "start": 318.26,
			        "word": " been",
			      },
			      {
			        "end": 318.75,
			        "start": 318.42,
			        "word": " around",
			      },
			      {
			        "end": 318.84,
			        "start": 318.75,
			        "word": " for",
			      },
			    ],
			  },
			  {
			    "end": 321.77,
			    "start": 319.78,
			    "text": "entirely sure if you can get those rare earths out of it",
			    "words": [
			      {
			        "end": 320.2,
			        "start": 319.78,
			        "word": " entirely",
			      },
			      {
			        "end": 320.44,
			        "start": 320.2,
			        "word": " sure",
			      },
			      {
			        "end": 320.51,
			        "start": 320.44,
			        "word": " if",
			      },
			      {
			        "end": 320.67,
			        "start": 320.51,
			        "word": " you",
			      },
			      {
			        "end": 320.87,
			        "start": 320.67,
			        "word": " can",
			      },
			      {
			        "end": 320.99,
			        "start": 320.87,
			        "word": " get",
			      },
			      {
			        "end": 321.27,
			        "start": 320.99,
			        "word": " those",
			      },
			      {
			        "end": 321.45,
			        "start": 321.27,
			        "word": " rare",
			      },
			      {
			        "end": 321.77,
			        "start": 321.45,
			        "word": " earth",
			      },
			    ],
			  },
			  {
			    "end": 323.48,
			    "start": 322.33,
			    "text": "It's still China way in the lead",
			    "words": [
			      {
			        "end": 322.39,
			        "start": 322.33,
			        "word": " It",
			      },
			      {
			        "end": 322.54,
			        "start": 322.39,
			        "word": "'s",
			      },
			      {
			        "end": 322.75,
			        "start": 322.54,
			        "word": " still",
			      },
			      {
			        "end": 323.01,
			        "start": 322.75,
			        "word": " China",
			      },
			      {
			        "end": 323.17,
			        "start": 323.01,
			        "word": " way",
			      },
			      {
			        "end": 323.38,
			        "start": 323.17,
			        "word": " in",
			      },
			      {
			        "end": 323.48,
			        "start": 323.38,
			        "word": " the",
			      },
			    ],
			  },
			  {
			    "end": 325.62,
			    "start": 323.83,
			    "text": "Brazil, India, Russia, Vietnam, the US",
			    "words": [
			      {
			        "end": 324.05,
			        "start": 323.83,
			        "word": " Brazil",
			      },
			      {
			        "end": 324.18,
			        "start": 324.05,
			        "word": ",",
			      },
			      {
			        "end": 324.5,
			        "start": 324.18,
			        "word": " India",
			      },
			      {
			        "end": 324.62,
			        "start": 324.5,
			        "word": ",",
			      },
			      {
			        "end": 325,
			        "start": 324.62,
			        "word": " Russia",
			      },
			      {
			        "end": 325.12,
			        "start": 325,
			        "word": ",",
			      },
			      {
			        "end": 325.62,
			        "start": 325.12,
			        "word": " Vietnam",
			      },
			    ],
			  },
			  {
			    "end": 326.7,
			    "start": 326.5,
			    "text": "Actually",
			    "words": [
			      {
			        "end": 326.7,
			        "start": 326.5,
			        "word": " Actually",
			      },
			    ],
			  },
			  {
			    "end": 331.24,
			    "start": 326.81,
			    "text": "Ukraine doesn't even show up in the most definitive measures of how much rare earths there are around the world",
			    "words": [
			      {
			        "end": 327.25,
			        "start": 326.81,
			        "word": " Ukraine",
			      },
			      {
			        "end": 327.57,
			        "start": 327.25,
			        "word": " doesn",
			      },
			      {
			        "end": 327.69,
			        "start": 327.57,
			        "word": "'t",
			      },
			      {
			        "end": 327.94,
			        "start": 327.69,
			        "word": " even",
			      },
			      {
			        "end": 328.27,
			        "start": 327.94,
			        "word": " show",
			      },
			      {
			        "end": 328.31,
			        "start": 328.27,
			        "word": " up",
			      },
			      {
			        "end": 328.43,
			        "start": 328.31,
			        "word": " in",
			      },
			      {
			        "end": 328.63,
			        "start": 328.43,
			        "word": " the",
			      },
			      {
			        "end": 329.04,
			        "start": 328.63,
			        "word": " most",
			      },
			      {
			        "end": 329.4,
			        "start": 329.04,
			        "word": " definitive",
			      },
			      {
			        "end": 329.8,
			        "start": 329.4,
			        "word": " measures",
			      },
			      {
			        "end": 329.91,
			        "start": 329.8,
			        "word": " of",
			      },
			      {
			        "end": 330.07,
			        "start": 329.91,
			        "word": " how",
			      },
			      {
			        "end": 330.31,
			        "start": 330.07,
			        "word": " much",
			      },
			      {
			        "end": 330.49,
			        "start": 330.31,
			        "word": " rare",
			      },
			      {
			        "end": 330.76,
			        "start": 330.49,
			        "word": " earth",
			      },
			      {
			        "end": 330.81,
			        "start": 330.76,
			        "word": "s",
			      },
			      {
			        "end": 331.24,
			        "start": 330.81,
			        "word": " there",
			      },
			    ],
			  },
			  {
			    "end": 334.32,
			    "start": 332.15,
			    "text": "So some people have been wondering some people have wondered",
			    "words": [
			      {
			        "end": 332.26,
			        "start": 332.15,
			        "word": " So",
			      },
			      {
			        "end": 332.46,
			        "start": 332.26,
			        "word": " some",
			      },
			      {
			        "end": 332.99,
			        "start": 332.46,
			        "word": " people",
			      },
			      {
			        "end": 333.07,
			        "start": 332.99,
			        "word": " have",
			      },
			      {
			        "end": 333.21,
			        "start": 333.07,
			        "word": " been",
			      },
			      {
			        "end": 333.7,
			        "start": 333.21,
			        "word": " wondering",
			      },
			      {
			        "end": 333.91,
			        "start": 333.7,
			        "word": ",",
			      },
			      {
			        "end": 334.12,
			        "start": 333.91,
			        "word": " some",
			      },
			      {
			        "end": 334.32,
			        "start": 334.12,
			        "word": " people",
			      },
			    ],
			  },
			  {
			    "end": 337.08,
			    "start": 335.13,
			    "text": "was he not really talking about critical minerals in general",
			    "words": [
			      {
			        "end": 335.17,
			        "start": 335.13,
			        "word": " was",
			      },
			      {
			        "end": 335.23,
			        "start": 335.17,
			        "word": " he",
			      },
			      {
			        "end": 335.39,
			        "start": 335.23,
			        "word": " not",
			      },
			      {
			        "end": 335.68,
			        "start": 335.39,
			        "word": " really",
			      },
			      {
			        "end": 336.03,
			        "start": 335.68,
			        "word": " talking",
			      },
			      {
			        "end": 336.28,
			        "start": 336.03,
			        "word": " about",
			      },
			      {
			        "end": 336.68,
			        "start": 336.28,
			        "word": " critical",
			      },
			      {
			        "end": 337.08,
			        "start": 336.68,
			        "word": " minerals",
			      },
			    ],
			  },
			  {
			    "end": 339.56,
			    "start": 337.68,
			    "text": "Maybe he was talking not about rare earths but about lithium",
			    "words": [
			      {
			        "end": 337.93,
			        "start": 337.68,
			        "word": " Maybe",
			      },
			      {
			        "end": 338.03,
			        "start": 337.93,
			        "word": " he",
			      },
			      {
			        "end": 338.25,
			        "start": 338.03,
			        "word": " was",
			      },
			      {
			        "end": 338.53,
			        "start": 338.25,
			        "word": " talking",
			      },
			      {
			        "end": 338.68,
			        "start": 338.53,
			        "word": " not",
			      },
			      {
			        "end": 338.96,
			        "start": 338.68,
			        "word": " about",
			      },
			      {
			        "end": 339.12,
			        "start": 338.96,
			        "word": " rare",
			      },
			      {
			        "end": 339.32,
			        "start": 339.12,
			        "word": " earth",
			      },
			      {
			        "end": 339.44,
			        "start": 339.32,
			        "word": "s",
			      },
			      {
			        "end": 339.48,
			        "start": 339.44,
			        "word": ",",
			      },
			      {
			        "end": 339.56,
			        "start": 339.48,
			        "word": " but",
			      },
			    ],
			  },
			  {
			    "end": 343.46,
			    "start": 340.12,
			    "text": "which technically speaking is a different part of the periodic table. Well if that's the case yes",
			    "words": [
			      {
			        "end": 340.35,
			        "start": 340.12,
			        "word": " which",
			      },
			      {
			        "end": 340.76,
			        "start": 340.35,
			        "word": " technically",
			      },
			      {
			        "end": 341.08,
			        "start": 340.76,
			        "word": " speaking",
			      },
			      {
			        "end": 341.17,
			        "start": 341.08,
			        "word": " is",
			      },
			      {
			        "end": 341.2,
			        "start": 341.17,
			        "word": " a",
			      },
			      {
			        "end": 341.56,
			        "start": 341.2,
			        "word": " different",
			      },
			      {
			        "end": 341.72,
			        "start": 341.56,
			        "word": " part",
			      },
			      {
			        "end": 341.8,
			        "start": 341.72,
			        "word": " of",
			      },
			      {
			        "end": 341.93,
			        "start": 341.8,
			        "word": " the",
			      },
			      {
			        "end": 342.24,
			        "start": 341.93,
			        "word": " periodic",
			      },
			      {
			        "end": 342.44,
			        "start": 342.24,
			        "word": " table",
			      },
			      {
			        "end": 342.6,
			        "start": 342.44,
			        "word": ".",
			      },
			      {
			        "end": 343.03,
			        "start": 342.6,
			        "word": " Well",
			      },
			      {
			        "end": 343.04,
			        "start": 343.03,
			        "word": ",",
			      },
			      {
			        "end": 343.46,
			        "start": 343.04,
			        "word": " if",
			      },
			    ],
			  },
			  {
			    "end": 349.41,
			    "start": 344.61,
			    "text": "there's a big lithium deposit in Ukraine potentially the biggest in Europe. But here's the thing",
			    "words": [
			      {
			        "end": 344.98,
			        "start": 344.61,
			        "word": " there",
			      },
			      {
			        "end": 345.12,
			        "start": 344.98,
			        "word": "'s",
			      },
			      {
			        "end": 345.23,
			        "start": 345.12,
			        "word": " a",
			      },
			      {
			        "end": 345.41,
			        "start": 345.23,
			        "word": " big",
			      },
			      {
			        "end": 345.93,
			        "start": 345.41,
			        "word": " lithium",
			      },
			      {
			        "end": 346.59,
			        "start": 345.93,
			        "word": " deposit",
			      },
			      {
			        "end": 346.61,
			        "start": 346.59,
			        "word": " in",
			      },
			      {
			        "end": 347.25,
			        "start": 346.61,
			        "word": " Ukraine",
			      },
			      {
			        "end": 347.47,
			        "start": 347.25,
			        "word": ",",
			      },
			      {
			        "end": 348.06,
			        "start": 347.47,
			        "word": " potentially",
			      },
			      {
			        "end": 348.4,
			        "start": 348.06,
			        "word": " the",
			      },
			      {
			        "end": 348.6,
			        "start": 348.4,
			        "word": " biggest",
			      },
			      {
			        "end": 348.86,
			        "start": 348.6,
			        "word": " in",
			      },
			      {
			        "end": 348.92,
			        "start": 348.92,
			        "word": "",
			      },
			      {
			        "end": 349.25,
			        "start": 348.92,
			        "word": " Europe",
			      },
			      {
			        "end": 349.41,
			        "start": 349.25,
			        "word": ".",
			      },
			    ],
			  },
			  {
			    "end": 351.83,
			    "start": 350.58,
			    "text": "Europe doesn't have that much lithium",
			    "words": [
			      {
			        "end": 350.78,
			        "start": 350.58,
			        "word": " Europe",
			      },
			      {
			        "end": 351.06,
			        "start": 350.78,
			        "word": " doesn",
			      },
			      {
			        "end": 351.17,
			        "start": 351.06,
			        "word": "'t",
			      },
			      {
			        "end": 351.4,
			        "start": 351.17,
			        "word": " have",
			      },
			      {
			        "end": 351.64,
			        "start": 351.4,
			        "word": " that",
			      },
			      {
			        "end": 351.83,
			        "start": 351.64,
			        "word": " much",
			      },
			    ],
			  },
			  {
			    "end": 354.75,
			    "start": 352.38,
			    "text": "And compare this with other deposits around the world",
			    "words": [
			      {
			        "end": 352.55,
			        "start": 352.38,
			        "word": " And",
			      },
			      {
			        "end": 352.93,
			        "start": 352.55,
			        "word": " compare",
			      },
			      {
			        "end": 353.15,
			        "start": 352.93,
			        "word": " this",
			      },
			      {
			        "end": 353.48,
			        "start": 353.15,
			        "word": " with",
			      },
			      {
			        "end": 353.86,
			        "start": 353.48,
			        "word": " other",
			      },
			      {
			        "end": 354.37,
			        "start": 353.86,
			        "word": " deposits",
			      },
			      {
			        "end": 354.75,
			        "start": 354.37,
			        "word": " around",
			      },
			    ],
			  },
			  {
			    "end": 358.31,
			    "start": 355.33,
			    "text": "I've put it over here. And that, by the way, is a best case scenario",
			    "words": [
			      {
			        "end": 355.7,
			        "start": 355.33,
			        "word": " I",
			      },
			      {
			        "end": 355.8,
			        "start": 355.7,
			        "word": "'ve",
			      },
			      {
			        "end": 355.94,
			        "start": 355.8,
			        "word": " put",
			      },
			      {
			        "end": 356.01,
			        "start": 355.94,
			        "word": " it",
			      },
			      {
			        "end": 356.26,
			        "start": 356.01,
			        "word": " over",
			      },
			      {
			        "end": 356.51,
			        "start": 356.26,
			        "word": " here",
			      },
			      {
			        "end": 356.89,
			        "start": 356.51,
			        "word": ".",
			      },
			      {
			        "end": 356.89,
			        "start": 356.89,
			        "word": " And",
			      },
			      {
			        "end": 357.14,
			        "start": 356.89,
			        "word": " that",
			      },
			      {
			        "end": 357.34,
			        "start": 357.14,
			        "word": ",",
			      },
			      {
			        "end": 357.38,
			        "start": 357.34,
			        "word": " by",
			      },
			      {
			        "end": 357.57,
			        "start": 357.38,
			        "word": " the",
			      },
			      {
			        "end": 357.76,
			        "start": 357.57,
			        "word": " way",
			      },
			      {
			        "end": 358,
			        "start": 357.76,
			        "word": ",",
			      },
			      {
			        "end": 358.02,
			        "start": 358,
			        "word": " is",
			      },
			      {
			        "end": 358.06,
			        "start": 358.02,
			        "word": " a",
			      },
			      {
			        "end": 358.31,
			        "start": 358.06,
			        "word": " best",
			      },
			    ],
			  },
			  {
			    "end": 360.98,
			    "start": 359.4,
			    "text": "And Ukraine is still a minnow",
			    "words": [
			      {
			        "end": 360,
			        "start": 359.4,
			        "word": " And",
			      },
			      {
			        "end": 360.38,
			        "start": 360,
			        "word": " Ukraine",
			      },
			      {
			        "end": 360.62,
			        "start": 360.38,
			        "word": " is",
			      },
			      {
			        "end": 360.77,
			        "start": 360.62,
			        "word": " still",
			      },
			      {
			        "end": 360.82,
			        "start": 360.77,
			        "word": " a",
			      },
			      {
			        "end": 360.98,
			        "start": 360.82,
			        "word": " min",
			      },
			    ],
			  },
			  {
			    "end": 362.46,
			    "start": 361.3,
			    "text": "It's smaller than Canada",
			    "words": [
			      {
			        "end": 361.38,
			        "start": 361.3,
			        "word": " It",
			      },
			      {
			        "end": 361.63,
			        "start": 361.38,
			        "word": "'s",
			      },
			      {
			        "end": 361.91,
			        "start": 361.63,
			        "word": " smaller",
			      },
			      {
			        "end": 362.13,
			        "start": 361.91,
			        "word": " than",
			      },
			      {
			        "end": 362.46,
			        "start": 362.13,
			        "word": " Canada",
			      },
			    ],
			  },
			  {
			    "end": 365.89,
			    "start": 362.62,
			    "text": "It's smaller than the US when it comes to lithium, even bearing that in mind",
			    "words": [
			      {
			        "end": 362.73,
			        "start": 362.62,
			        "word": " It",
			      },
			      {
			        "end": 362.95,
			        "start": 362.73,
			        "word": "'s",
			      },
			      {
			        "end": 363.23,
			        "start": 362.95,
			        "word": " smaller",
			      },
			      {
			        "end": 363.45,
			        "start": 363.23,
			        "word": " than",
			      },
			      {
			        "end": 363.61,
			        "start": 363.45,
			        "word": " the",
			      },
			      {
			        "end": 363.77,
			        "start": 363.61,
			        "word": " US",
			      },
			      {
			        "end": 364,
			        "start": 363.77,
			        "word": " when",
			      },
			      {
			        "end": 364.05,
			        "start": 364,
			        "word": " it",
			      },
			      {
			        "end": 364.37,
			        "start": 364.05,
			        "word": " comes",
			      },
			      {
			        "end": 364.52,
			        "start": 364.37,
			        "word": " to",
			      },
			      {
			        "end": 364.92,
			        "start": 364.52,
			        "word": " lithium",
			      },
			      {
			        "end": 365.04,
			        "start": 364.92,
			        "word": ",",
			      },
			      {
			        "end": 365.66,
			        "start": 365.04,
			        "word": " even",
			      },
			      {
			        "end": 365.89,
			        "start": 365.66,
			        "word": " bearing",
			      },
			    ],
			  },
			  {
			    "end": 372.11,
			    "start": 366.89,
			    "text": "And so perhaps it just might be you know there are lots of minerals in Ukraine. But for the most part",
			    "words": [
			      {
			        "end": 367.16,
			        "start": 366.89,
			        "word": " And",
			      },
			      {
			        "end": 367.68,
			        "start": 367.16,
			        "word": " so",
			      },
			      {
			        "end": 367.81,
			        "start": 367.68,
			        "word": " perhaps",
			      },
			      {
			        "end": 367.96,
			        "start": 367.81,
			        "word": " it",
			      },
			      {
			        "end": 368.26,
			        "start": 367.96,
			        "word": " just",
			      },
			      {
			        "end": 368.66,
			        "start": 368.26,
			        "word": " might",
			      },
			      {
			        "end": 368.81,
			        "start": 368.66,
			        "word": " be",
			      },
			      {
			        "end": 368.96,
			        "start": 368.81,
			        "word": ",",
			      },
			      {
			        "end": 369.21,
			        "start": 368.96,
			        "word": " you",
			      },
			      {
			        "end": 369.5,
			        "start": 369.21,
			        "word": " know",
			      },
			      {
			        "end": 369.84,
			        "start": 369.5,
			        "word": ",",
			      },
			      {
			        "end": 370.22,
			        "start": 369.84,
			        "word": " there",
			      },
			      {
			        "end": 370.27,
			        "start": 370.22,
			        "word": " are",
			      },
			      {
			        "end": 370.59,
			        "start": 370.27,
			        "word": " lots",
			      },
			      {
			        "end": 370.73,
			        "start": 370.59,
			        "word": " of",
			      },
			      {
			        "end": 371.46,
			        "start": 370.73,
			        "word": " minerals",
			      },
			      {
			        "end": 371.76,
			        "start": 371.46,
			        "word": " in",
			      },
			      {
			        "end": 371.76,
			        "start": 371.76,
			        "word": "",
			      },
			      {
			        "end": 372.11,
			        "start": 371.76,
			        "word": " Ukraine",
			      },
			    ],
			  },
			  {
			    "end": 374.17,
			    "start": 373.21,
			    "text": "it's the old fashioned stuff",
			    "words": [
			      {
			        "end": 373.35,
			        "start": 373.21,
			        "word": " it",
			      },
			      {
			        "end": 373.41,
			        "start": 373.35,
			        "word": "'s",
			      },
			      {
			        "end": 373.57,
			        "start": 373.41,
			        "word": " the",
			      },
			      {
			        "end": 373.71,
			        "start": 373.57,
			        "word": " old",
			      },
			      {
			        "end": 374.17,
			        "start": 373.71,
			        "word": " fashioned",
			      },
			    ],
			  },
			  {
			    "end": 377.63,
			    "start": 374.6,
			    "text": "It's coal it's iron ore there's lots of iron ore around",
			    "words": [
			      {
			        "end": 375.01,
			        "start": 374.6,
			        "word": " It",
			      },
			      {
			        "end": 375.06,
			        "start": 375.01,
			        "word": "'s",
			      },
			      {
			        "end": 375.48,
			        "start": 375.06,
			        "word": " coal",
			      },
			      {
			        "end": 375.7,
			        "start": 375.48,
			        "word": ",",
			      },
			      {
			        "end": 375.95,
			        "start": 375.7,
			        "word": " it",
			      },
			      {
			        "end": 376.05,
			        "start": 375.95,
			        "word": "'s",
			      },
			      {
			        "end": 376.41,
			        "start": 376.05,
			        "word": " iron",
			      },
			      {
			        "end": 376.63,
			        "start": 376.41,
			        "word": " ore",
			      },
			      {
			        "end": 376.82,
			        "start": 376.63,
			        "word": ",",
			      },
			      {
			        "end": 376.92,
			        "start": 376.82,
			        "word": " there",
			      },
			      {
			        "end": 376.98,
			        "start": 376.92,
			        "word": "'s",
			      },
			      {
			        "end": 377.24,
			        "start": 376.98,
			        "word": " lots",
			      },
			      {
			        "end": 377.37,
			        "start": 377.24,
			        "word": " of",
			      },
			      {
			        "end": 377.63,
			        "start": 377.37,
			        "word": " iron",
			      },
			    ],
			  },
			  {
			    "end": 380.58,
			    "start": 378.46,
			    "text": "around there. And it's also things like titanium",
			    "words": [
			      {
			        "end": 378.72,
			        "start": 378.46,
			        "word": " around",
			      },
			      {
			        "end": 379.04,
			        "start": 378.72,
			        "word": " there",
			      },
			      {
			        "end": 379.42,
			        "start": 379.04,
			        "word": ".",
			      },
			      {
			        "end": 379.45,
			        "start": 379.42,
			        "word": " And",
			      },
			      {
			        "end": 379.55,
			        "start": 379.45,
			        "word": " it",
			      },
			      {
			        "end": 379.67,
			        "start": 379.55,
			        "word": "'s",
			      },
			      {
			        "end": 379.93,
			        "start": 379.67,
			        "word": " also",
			      },
			      {
			        "end": 380.32,
			        "start": 379.93,
			        "word": " things",
			      },
			      {
			        "end": 380.58,
			        "start": 380.32,
			        "word": " like",
			      },
			    ],
			  },
			  {
			    "end": 386.54,
			    "start": 381.44,
			    "text": "And so probably the most plausible explanation is that the president maybe thinks he can make some money out of those things",
			    "words": [
			      {
			        "end": 381.48,
			        "start": 381.44,
			        "word": " And",
			      },
			      {
			        "end": 381.61,
			        "start": 381.48,
			        "word": " so",
			      },
			      {
			        "end": 382.14,
			        "start": 381.61,
			        "word": " probably",
			      },
			      {
			        "end": 382.38,
			        "start": 382.14,
			        "word": " the",
			      },
			      {
			        "end": 382.56,
			        "start": 382.38,
			        "word": " most",
			      },
			      {
			        "end": 383.09,
			        "start": 382.56,
			        "word": " plausible",
			      },
			      {
			        "end": 383.73,
			        "start": 383.09,
			        "word": " explanation",
			      },
			      {
			        "end": 383.86,
			        "start": 383.73,
			        "word": " is",
			      },
			      {
			        "end": 384.28,
			        "start": 383.86,
			        "word": " that",
			      },
			      {
			        "end": 384.31,
			        "start": 384.28,
			        "word": " the",
			      },
			      {
			        "end": 384.81,
			        "start": 384.31,
			        "word": " president",
			      },
			      {
			        "end": 385.15,
			        "start": 384.81,
			        "word": " maybe",
			      },
			      {
			        "end": 385.46,
			        "start": 385.15,
			        "word": " thinks",
			      },
			      {
			        "end": 385.58,
			        "start": 385.46,
			        "word": " he",
			      },
			      {
			        "end": 385.8,
			        "start": 385.58,
			        "word": " can",
			      },
			      {
			        "end": 386,
			        "start": 385.8,
			        "word": " make",
			      },
			      {
			        "end": 386.24,
			        "start": 386,
			        "word": " some",
			      },
			      {
			        "end": 386.54,
			        "start": 386.24,
			        "word": " money",
			      },
			    ],
			  },
			  {
			    "end": 390.25,
			    "start": 387.72,
			    "text": "But I would still question even bearing all of that in mind",
			    "words": [
			      {
			        "end": 387.91,
			        "start": 387.72,
			        "word": " But",
			      },
			      {
			        "end": 387.96,
			        "start": 387.91,
			        "word": " I",
			      },
			      {
			        "end": 388.54,
			        "start": 387.96,
			        "word": " would",
			      },
			      {
			        "end": 388.61,
			        "start": 388.54,
			        "word": " still",
			      },
			      {
			        "end": 389.19,
			        "start": 388.61,
			        "word": " question",
			      },
			      {
			        "end": 389.24,
			        "start": 389.19,
			        "word": ",",
			      },
			      {
			        "end": 389.49,
			        "start": 389.24,
			        "word": " even",
			      },
			      {
			        "end": 389.94,
			        "start": 389.49,
			        "word": " bearing",
			      },
			      {
			        "end": 390.13,
			        "start": 389.94,
			        "word": " all",
			      },
			      {
			        "end": 390.25,
			        "start": 390.13,
			        "word": " of",
			      },
			    ],
			  },
			  {
			    "end": 395.28,
			    "start": 391.08,
			    "text": "it's going to be very difficult to get to that $500 billion total",
			    "words": [
			      {
			        "end": 391.2,
			        "start": 391.08,
			        "word": " it",
			      },
			      {
			        "end": 391.6,
			        "start": 391.2,
			        "word": "'s",
			      },
			      {
			        "end": 391.61,
			        "start": 391.6,
			        "word": " going",
			      },
			      {
			        "end": 391.75,
			        "start": 391.61,
			        "word": " to",
			      },
			      {
			        "end": 391.84,
			        "start": 391.75,
			        "word": " be",
			      },
			      {
			        "end": 392.09,
			        "start": 391.84,
			        "word": " very",
			      },
			      {
			        "end": 392.64,
			        "start": 392.09,
			        "word": " difficult",
			      },
			      {
			        "end": 392.9,
			        "start": 392.64,
			        "word": " to",
			      },
			      {
			        "end": 393.11,
			        "start": 392.9,
			        "word": " get",
			      },
			      {
			        "end": 393.2,
			        "start": 393.11,
			        "word": " to",
			      },
			      {
			        "end": 393.21,
			        "start": 393.2,
			        "word": "",
			      },
			      {
			        "end": 393.55,
			        "start": 393.21,
			        "word": " that",
			      },
			      {
			        "end": 393.55,
			        "start": 393.55,
			        "word": " $",
			      },
			      {
			        "end": 394.38,
			        "start": 393.55,
			        "word": "500",
			      },
			      {
			        "end": 394.69,
			        "start": 394.38,
			        "word": " billion",
			      },
			      {
			        "end": 395.07,
			        "start": 394.69,
			        "word": " total",
			      },
			      {
			        "end": 395.28,
			        "start": 395.07,
			        "word": ".",
			      },
			    ],
			  },
			]
		`)
	})
})
