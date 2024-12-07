import fsp from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { assembleLongSentences, mergeSentencesWithAbbreviations, processScientificNotation, processSentenceSegmentation } from '../transcript'

describe('transcript', () => {
	it.skip('processSentenceSegmentation', async () => {
		const result = await fsp.readFile('./out/tv-rwXYj1NalIw/result.json', 'utf-8')
		const data = JSON.parse(result)

		const words = data.segments.flatMap((segment: any) =>
			segment.words.map((word: any) => {
				word.word = word.word.trim()
				return word
			}),
		)

		const segments = processSentenceSegmentation({ words })

		const texts = segments.map((item) => item.text)

		expect(texts).toMatchInlineSnapshot(`
			[
			  "Imagine driving along a road that's almost 200 meters higher than the tip of the Empire State Building.",
			  "A road so high that you're literally driving through the clouds.",
			  "Well, suspended 625 meters above the Huajian Grand Canyon in China,",
			  "a road like this is actually being built.",
			  "And it's a massive bridge.",
			  "One that crosses mountains,",
			  "that breaks records,",
			  "and that very few people actually know anything about.",
			  "In today's video,",
			  "we're diving into China's insane plan to build the world's highest bridge and uncover how it fits into China's plan to modernize one of its wildest regions.",
			  "I'm your host, Regis, and this is the Huajian Bridge.",
			  "Before we get into it,",
			  "we'd just like to take a second to thank Eric Sikowski from highestbridges .com.",
			  "Eric reached out to us about the Huajian Bridge a little while ago and very kindly gave us access to a load of incredible drone footage that he took himself when he visited the construction site.",
			  "There's actually been very little coverage of this megaproject in Western media,",
			  "and this video wouldn't have been possible without Eric's help.",
			  "We've linked his website in the description below.",
			  "It's an encyclopedia of everything bridge -related,",
			  "so definitely check it out if you're interested.",
			  "We hope you like the video, Eric, and thanks again for all of your help.",
			  "In a remote part of China,",
			  "over 1 ,800",
			  "kilometers from Beijing,",
			  "the Huajiang Bridge has been under construction for the last three years.",
			  "It's a suspension bridge the likes of which have never been attempted before.",
			  "And the sheer scale of it is just breathtaking.",
			  "The whole thing stretches nearly three kilometers in length,",
			  "with the main span of the bridge reaching 1 ,420",
			  "meters across the Huajiang Grand Canyon.",
			  "That's 10 meters further than the Humber Bridge in the United Kingdom,",
			  "which has held the record as the world's longest suspension bridge for 17 years.",
			  "The deck of the bridge is 625 meters above the base of the canyon,",
			  "meaning that it'll be the highest ever built when it opens next year,",
			  "beating the previous record by 60 meters.",
			  "Even watching this guy walk along the catwalk makes me nervous.",
			  "I'm not even afraid of heights, but man, no thank you.",
			  "The Huajiang Bridge is supported by two enormous towers,",
			  "measuring 262 meters on the north side and 205 meters on the south side.",
			  "They're built right on the mountainside,",
			  "hundreds of meters above the canyon,",
			  "and together with two enormous cables weighing over 9 ,000",
			  "tons each, they hold up the bridge the same way as two trees hold up a hammock.",
			  "In terms of engineering, this bridge is pretty incredible.",
			  "But it's also a vital piece of regional infrastructure.",
			  "It's part of the Liuzhou -Anlang Expressway,",
			  "and it'll cut travel time across the canyon from 90 minutes to just two.",
			  "And on top of all of that,",
			  "the Huajiang Bridge has a bunch of hidden features that really make it stand out from other massive suspension bridges.",
			  "In fact, they added so much weight that the engineers actually had to increase the side of the support trusses just to make up for it.",
			  "But we'll come back to that later,",
			  "because before we get into the nitty -gritty here,",
			  "it's important to say that the story of the Huajiang Bridge isn't just the story of a record -breaking bridge.",
			  "It's also the story of a wild province of China and the government's efforts to catapult it into the 21st century.",
			  "So let's zoom out a little bit and put it all into perspective.",
			  "This is Guizhou,",
			  "a mountainous region in southwestern China that was for centuries considered of little importance to the great Chinese Empire.",
			  "Historically, outsiders rarely traveled there,",
			  "and the local people rarely left,",
			  "making Guizhou mysterious and unknown.",
			  "In fact, in ancient Chinese,",
			  ""Guizhou" actually translates to "the land of the demons."",
			  "Despite being about the same size as Missouri or Uruguay,",
			  "Guizhou is almost completely covered by mountains and hills.",
			  "And we're not talking about gentle rolling hills, either.",
			  "Guizhou is a land of extremes,",
			  "from stunning waterfalls to enormous canyons to insane rock formations.",
			  "To get technical for a second,",
			  "all of these geological phenomena are actually features of something called a karst,",
			  "which basically just means a region made up of soft,",
			  "soluble rock, like limestone.",
			  "Karsts are easily eroded by water,",
			  "and over time,",
			  "the rock dissolves to create these insane landscapes.",
			  "Guizhou is part of the South China Karst,",
			  "which stretches across several regions,",
			  "and is known by UNESCO as one of our planet's great landscapes.",
			  "Anyway, the point that we're trying to make here is that Guizhou is inhospitable,",
			  "let's say.",
			  "An old Chinese saying sums it up nicely.",
			  "Guizhou is a land where there are no three days without rain,",
			  "no three fields without a mountain,",
			  "and no three coins in anyone's pocket.",
			  "In other words, Guizhou is wet, poor, and covered in mountains.",
			  "Rain can set in for literal weeks at a time,",
			  "which, combined with the terrain,",
			  "makes agriculture very difficult here.",
			  "As such, Guizhou has historically been one of the poorest regions in China,",
			  "with low levels of literacy in its rural communities.",
			  "Development was slower there than most other regions of the country,",
			  "so slow, in fact,",
			  "that the Chinese government didn't successfully build a proper road there until the 1970s.",
			  "The story goes that not long after the road opened,",
			  "a group of government officials visited one of the villages that had just been connected to the outside world for the first time.",
			  "When they arrived,",
			  "they discovered that there was no accommodation for tourists,",
			  "and that only a few people spoke Chinese.",
			  "Local tradition meant the visitors were welcomed,",
			  "and they were soon invited into the home of the village leader.",
			  "But while they were inside,",
			  "a group of local women who had never seen a car before mistook their 4x4s for a strange new kind of animal and tried to feed them by stuffing the engines full of straw.",
			  "Who knows, there may be some poetic license there,",
			  "but the point is simple.",
			  "Guizhou is remote, wild, and notoriously difficult to build in.",
			  "But since 1989,",
			  "the Chinese government has been on a road -building spree.",
			  "They've literally built roads everywhere.",
			  "By 2020, China had over 160 ,000",
			  "kilometers of highway,",
			  "overtaking the United States with the world's longest expressway system by length.",
			  "Now, they're working on the next stage of development,",
			  "which will link many of the smaller cities across the nation.",
			  "Why are they going so hard on this roadwork project?",
			  "Well, transport infrastructure is fundamental to economic growth,",
			  "China wants to connect all of its disparate regions and allow people,",
			  "goods, and services to travel anywhere in the country on reliable roads.",
			  "And in true Chinese fashion,",
			  "nothing is getting in the way of development,",
			  "not even the impenetrable mountains of Guizhou.",
			  "Today, towns and cities across the province are connected by an extensive road network,",
			  "with some of the expressways allowing up to six lanes of traffic.",
			  "And it's all thanks to bridges.",
			  "Guizhou now has more high bridges than the rest of the world combined.",
			  "Yeah, combined.",
			  "To put that into context,",
			  "a high bridge is a bridge over 100 meters tall,",
			  "and Guizhou has over 250 of them.",
			  "Italy, who's number two on the list as a whole country,",
			  "only has 60 in total.",
			  "In fact, three of the highest bridges in the world,",
			  "including those under construction,",
			  "are in Guizhou.",
			  "And what's even crazier is that all three of them cross the same river,",
			  "the Beipan.",
			  "And that's not to mention all its other bridges.",
			  "No river in the world has as many record -breaking bridges as the Beipan,",
			  "and it's easy to see why.",
			  "The river flows through these insane canyons for hundreds of kilometers before merging with the Nanpan River to form the Hangshui.",
			  "Connecting Guizhou with the rest of the country means mastering the Beipan and its immense canyons.",
			  "And it's kind of working.",
			  "The road network that's been built over the last 30 years has opened Guizhou to the rest of the world.",
			  "It's now a popular tourist destination thanks to its stunning scenery,",
			  "and it's quickly becoming a national hub for big data infrastructure.",
			  "The karst landscape that once made construction so difficult in Guizhou is now exactly what's attracting investment.",
			  "Its deep gorges and cool winds are being used to funnel cold air onto the huge servers that make up big data centers,",
			  "stopping them from overheating without the need for expensive cooling equipment.",
			  "Not only that,",
			  "but thanks to all its rivers,",
			  "Guizhou is also a prime location for hydropower facilities.",
			  "As a result,",
			  "companies like Apple,",
			  "Huawei, and Tencent are all building their regional data centers in Guizhou to benefit from its natural resources,",
			  "and Guizhou's economy is improving year over year.",
			  "With the economy on the rise,",
			  "development is in full swing,",
			  "and more transportation links are required to meet the influx of investment and tourists.",
			  "And that's why the government is pulling out all the stops to build the Huajiang Bridge.",
			  "As we said earlier,",
			  "it'll shorten travel time on the Liuzhi -Anlang Expressway by over an hour and massively improve regional connectivity.",
			  "But that's not all.",
			  "The Huajiang Bridge isn't just a transport link,",
			  "it's also a destination.",
			  "Building this bridge in a region as unforgiving as Guizhou is an incredible achievement,",
			  "even more so if you think about the fact that construction only started in 2021.",
			  "That's why the regional government has decided to turn the bridge into a full -blown tourist attraction in its own right.",
			  "They're going to give visitors a unique experience that makes Huajiang unlike any other bridge in the world,",
			  "welcoming tourists as they "carry the highway to the sky,"",
			  "as the information board puts it.",
			  "Before tourists even step foot on the bridge,",
			  "they'll be able to stop at a state -of -the -art visitor center,",
			  "where they can learn about the bridge's construction as well as the history of the region.",
			  "There will also be private accommodation on -site that overlooks the bridge and the canyon,",
			  "so guests will actually be able to stay the night.",
			  "To see the canyon from a different angle,",
			  "visitors will be able to take a glass elevator to the top of the South Tower,",
			  "180 meters above the road.",
			  "There will be a bar and a cafe up there to relax and enjoy the views.",
			  "And that's not all.",
			  "The elevator will also drop visitors off underneath the road deck,",
			  "inside the support trusses themselves.",
			  "As cars pass overhead,",
			  "people can explore the walkway that stretches 800 meters out to the middle of the bridge.",
			  "There'll be rooms with glass floors,",
			  "a restaurant, and at the very end of the walkway,",
			  "at the bridge's highest point,",
			  "the world's highest bungee jump.",
			  "Yeah, that's definitely a no from me, but hey, more power to ya.",
			  "Visitors will literally be able to jump off the bridge at its highest point and experience the canyon like never before.",
			  "And if that's not their thing,",
			  "like me, they can take the time to explore the incredible natural surroundings of the bridge.",
			  "Because that's also an important part of this tourism project.",
			  "They don't just want to bring people to see the bridge,",
			  "they want to use the bridge to bring people to see Guizhou as well.",
			  "With all that in mind,",
			  "you're probably wondering how much this is all gonna cost.",
			  "Well, we're not gonna lie,",
			  "finding a price tag for this was pretty darn difficult.",
			  "The Chinese government often keeps these details to themselves,",
			  "and with little interest from western media,",
			  "we didn't have much to go on.",
			  "But thanks again to Eric's help, we finally found an answer.",
			  "The bridge has an estimated cost of 280 million dollars,",
			  "and with construction due to finish on schedule next year,",
			  "the project may well come in on budget.",
			  "We'll be keeping an eye out for any more information that comes out about this project,",
			  "so be sure to subscribe to make sure you don't miss it.",
			  "So the question we all want answered,",
			  "would you do the world's highest bungee jump off of this bridge?",
			  "Let us know in the comments down below.",
			  "If you want to see another of China's insane megaprojects,",
			  "watch our video about China's insane 100 billion megadam in the Himalayan mountains.",
			  "Thanks again to Eric for helping us with this video,",
			  "thank all of you for watching,",
			  "and as always,",
			  "we'll see you in the next one.",
			]
		`)
	})

	it.skip('mergeSentencesWithAbbreviations', () => {
		const words = [
			[
				{ word: 'assembly', start: 329.28, end: 330.24 },
				{ word: 'and', start: 330.24, end: 330.46 },
				{ word: 'shipment', start: 330.46, end: 331.06 },
				{ word: 'to', start: 331.06, end: 331.21 },
				{ word: 'the', start: 331.21, end: 331.43 },
				{ word: 'U', start: 331.43, end: 331.5 },
				{ word: '.', start: 331.5, end: 331.72 },
			],
			[
				{ word: 'S', start: 331.72, end: 331.79 },
				{ word: '.', start: 331.79, end: 332.01 },
			],
			[
				{ word: 'and', start: 332.01, end: 332.23 },
				{ word: 'Canada', start: 332.23, end: 332.78 },
				{ word: '.', start: 332.78, end: 332.93 },
			],
		]

		const result = mergeSentencesWithAbbreviations(words)

		expect(result).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "end": 330.24,
			      "start": 329.28,
			      "word": "assembly",
			    },
			    {
			      "end": 330.46,
			      "start": 330.24,
			      "word": "and",
			    },
			    {
			      "end": 331.06,
			      "start": 330.46,
			      "word": "shipment",
			    },
			    {
			      "end": 331.21,
			      "start": 331.06,
			      "word": "to",
			    },
			    {
			      "end": 331.43,
			      "start": 331.21,
			      "word": "the",
			    },
			    {
			      "end": 331.5,
			      "start": 331.43,
			      "word": "U",
			    },
			    {
			      "end": 331.72,
			      "start": 331.5,
			      "word": ".",
			    },
			    {
			      "end": 331.79,
			      "start": 331.72,
			      "word": "S",
			    },
			    {
			      "end": 332.01,
			      "start": 331.79,
			      "word": ".",
			    },
			  ],
			  [
			    {
			      "end": 332.23,
			      "start": 332.01,
			      "word": "and",
			    },
			    {
			      "end": 332.78,
			      "start": 332.23,
			      "word": "Canada",
			    },
			    {
			      "end": 332.93,
			      "start": 332.78,
			      "word": ".",
			    },
			  ],
			]
		`)
	})

	it('processScientificNotation', async () => {
		// const str = await fsp.readFile('./out/tv-mXPMXVLs3-Q/audio.wav.json', 'utf-8')
		// const data = JSON.parse(str)
		// const words = data.transcription.map((item: any) => ({
		// 	word: item.text.trim(),
		// 	start: item.offsets.from / 1000,
		// 	end: item.offsets.to / 1000,
		// }))
		// const longSentences = assembleLongSentences(words)
		// console.log('🚀 ~ it ~ longSentences:', longSentences)

		const words = [
			{
				end: 57.2,
				start: 57.02,
				word: 'going',
			},
			{
				end: 57.44,
				start: 57.2,
				word: 'over',
			},
			{
				end: 57.55,
				start: 57.44,
				word: '',
			},
			{
				end: 57.57,
				start: 57.55,
				word: '3',
			},
			{
				end: 57.66,
				start: 57.57,
				word: ',',
			},
			{
				end: 58.06,
				start: 57.66,
				word: '000',
			},
			{
				end: 58.39,
				start: 58.06,
				word: 'degrees',
			},
			{
				end: 58.82,
				start: 58.39,
				word: 'Fahrenheit',
			},
		]

		const result = processScientificNotation(words)

		expect(result).toMatchInlineSnapshot(`
			[
			  {
			    "end": 57.2,
			    "start": 57.02,
			    "word": "going",
			  },
			  {
			    "end": 57.44,
			    "start": 57.2,
			    "word": "over",
			  },
			  {
			    "end": 57.57,
			    "start": 57.55,
			    "word": "3",
			  },
			  {
			    "end": 58.06,
			    "start": 57.66,
			    "word": "000",
			  },
			  {
			    "end": 58.39,
			    "start": 58.06,
			    "word": "degrees",
			  },
			  {
			    "end": 58.82,
			    "start": 58.39,
			    "word": "Fahrenheit",
			  },
			]
		`)
	})
})
