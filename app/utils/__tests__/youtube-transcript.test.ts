import fsp from 'node:fs/promises'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { describe, expect, it } from 'vitest'
import {
	getYoutubeTranscript,
	parseTranscriptCaptionUrl,
} from '../youtube-transcripts'

describe('youtube-transcript', () => {
	const videoId = 'q6m1T0aZDn4'

	it.skip('should parse transcript caption url successfully', async () => {
		const html = await fsp.readFile(`./out/${videoId}/original.html`, 'utf-8')
		const url = parseTranscriptCaptionUrl(html)
		expect(url).toMatchInlineSnapshot(
			`"https://www.youtube.com/api/timedtext?v=q6m1T0aZDn4&ei=wl8nZ7rrJOvs2roP5vbLwQs&caps=asr&opi=112496729&exp=xbt&xoaf=5&hl=zh-TW&ip=0.0.0.0&ipbits=0&expire=1730658866&sparams=ip,ipbits,expire,v,ei,caps,opi,exp,xoaf&signature=880D11C3D97AED29A0ACFFFD0C8E8C51FB841CF9.84B7C5DC6237A3BC2575A92BE961E83C005C54AA&key=yt8&kind=asr&lang=en"`,
		)
	})

	it.skip('should get transcript', async () => {
		const agent = new HttpsProxyAgent('http://127.0.0.1:7890')
		const transcript = await getYoutubeTranscript({
			videoId,
			agent,
		})
		expect(transcript).toMatchInlineSnapshot(`
			[
			  {
			    "duration": 4,
			    "offset": 0.04,
			    "text": "it seems like the GitHub team can&amp;#39;t stop",
			  },
			  {
			    "duration": 4.279,
			    "offset": 2,
			    "text": "thinking about cursor if you haven&amp;#39;t",
			  },
			  {
			    "duration": 5.4,
			    "offset": 4.04,
			    "text": "kept up with the history here way back",
			  },
			  {
			    "duration": 5.52,
			    "offset": 6.279,
			    "text": "in what end of 2021 beginning of 2022",
			  },
			  {
			    "duration": 4.44,
			    "offset": 9.44,
			    "text": "co-pilot was introduced as an AI tool to",
			  },
			  {
			    "duration": 3.76,
			    "offset": 11.799,
			    "text": "help us autocomplete our code as we",
			  },
			  {
			    "duration": 4.479,
			    "offset": 13.88,
			    "text": "write it and honestly it was",
			  },
			  {
			    "duration": 4.56,
			    "offset": 15.559,
			    "text": "revolutionary I was so so skeptical at",
			  },
			  {
			    "duration": 3.641,
			    "offset": 18.359,
			    "text": "the time and was surprised how quickly I",
			  },
			  {
			    "duration": 4.201,
			    "offset": 20.119,
			    "text": "grew to like it and then eventually love",
			  },
			  {
			    "duration": 3.96,
			    "offset": 22,
			    "text": "it not co-pilot itself because it was",
			  },
			  {
			    "duration": 3.32,
			    "offset": 24.32,
			    "text": "atrociously slow and didn&amp;#39;t have the",
			  },
			  {
			    "duration": 3.399,
			    "offset": 25.96,
			    "text": "best recommendations when I started",
			  },
			  {
			    "duration": 4.36,
			    "offset": 27.64,
			    "text": "trying other models specifically super",
			  },
			  {
			    "duration": 4.481,
			    "offset": 29.359,
			    "text": "maven I was blown away at the speed and",
			  },
			  {
			    "duration": 3.719,
			    "offset": 32,
			    "text": "accuracy of the code it was giving me",
			  },
			  {
			    "duration": 4.36,
			    "offset": 33.84,
			    "text": "and then I gave cursor a shot didn&amp;#39;t",
			  },
			  {
			    "duration": 5.241,
			    "offset": 35.719,
			    "text": "like it went back to vs code then I gave",
			  },
			  {
			    "duration": 5.039,
			    "offset": 38.2,
			    "text": "it one last chance and ended up being",
			  },
			  {
			    "duration": 4.56,
			    "offset": 40.96,
			    "text": "blown away having now used cursor for",
			  },
			  {
			    "duration": 3.561,
			    "offset": 43.239,
			    "text": "quite a bit it is definitely my editor",
			  },
			  {
			    "duration": 2.679,
			    "offset": 45.52,
			    "text": "of choice there are things I would",
			  },
			  {
			    "duration": 3.12,
			    "offset": 46.8,
			    "text": "change there are things that need to",
			  },
			  {
			    "duration": 3.441,
			    "offset": 48.199,
			    "text": "improve especially the speed when",
			  },
			  {
			    "duration": 4.119,
			    "offset": 49.92,
			    "text": "compared to something like super Maven",
			  },
			  {
			    "duration": 4.68,
			    "offset": 51.64,
			    "text": "but overall it has improved how I write",
			  },
			  {
			    "duration": 4.761,
			    "offset": 54.039,
			    "text": "code it has also caused me to cancel my",
			  },
			  {
			    "duration": 4.36,
			    "offset": 56.32,
			    "text": "subscription to GitHub co-pilot and it",
			  },
			  {
			    "duration": 3.84,
			    "offset": 58.8,
			    "text": "has also resulted in me not using vs",
			  },
			  {
			    "duration": 4.479,
			    "offset": 60.68,
			    "text": "code directly because cursor is a fork",
			  },
			  {
			    "duration": 5,
			    "offset": 62.64,
			    "text": "of vs code GitHub is taking this very",
			  },
			  {
			    "duration": 4.041,
			    "offset": 65.159,
			    "text": "seriously they&amp;#39;re taking it so seriously",
			  },
			  {
			    "duration": 3.119,
			    "offset": 67.64,
			    "text": "that they are putting existing",
			  },
			  {
			    "duration": 3.84,
			    "offset": 69.2,
			    "text": "relationships that Microsoft has at",
			  },
			  {
			    "duration": 4.521,
			    "offset": 70.759,
			    "text": "Jeopardy in the process one of the big",
			  },
			  {
			    "duration": 4.16,
			    "offset": 73.04,
			    "text": "differentiators between cursor and VSS",
			  },
			  {
			    "duration": 4.199,
			    "offset": 75.28,
			    "text": "code is that VSS code is built on",
			  },
			  {
			    "duration": 5.04,
			    "offset": 77.2,
			    "text": "co-pilot which is built on top of open",
			  },
			  {
			    "duration": 4.361,
			    "offset": 79.479,
			    "text": "ai&amp;#39;s models cursor has a list of",
			  },
			  {
			    "duration": 3.36,
			    "offset": 82.24,
			    "text": "different models you can pick from",
			  },
			  {
			    "duration": 3.319,
			    "offset": 83.84,
			    "text": "that&amp;#39;s a huge difference because cursor",
			  },
			  {
			    "duration": 2.76,
			    "offset": 85.6,
			    "text": "isn&amp;#39;t trying to make a perfect model or",
			  },
			  {
			    "duration": 2.92,
			    "offset": 87.159,
			    "text": "do all of those things they&amp;#39;re just",
			  },
			  {
			    "duration": 4.96,
			    "offset": 88.36,
			    "text": "trying to make the user experience of",
			  },
			  {
			    "duration": 5.201,
			    "offset": 90.079,
			    "text": "writing code with AI better and GitHub",
			  },
			  {
			    "duration": 4.68,
			    "offset": 93.32,
			    "text": "has to catch up and they&amp;#39;re taking it",
			  },
			  {
			    "duration": 6.519,
			    "offset": 95.28,
			    "text": "very seriously do you know how I know",
			  },
			  {
			    "duration": 6.04,
			    "offset": 98,
			    "text": "that this is how despite Microsoft&amp;#39;s",
			  },
			  {
			    "duration": 5.441,
			    "offset": 101.799,
			    "text": "close relationship with open AI GitHub",
			  },
			  {
			    "duration": 5.92,
			    "offset": 104.04,
			    "text": "now supports anthropic and Claude and",
			  },
			  {
			    "duration": 5.44,
			    "offset": 107.24,
			    "text": "co-pilot it&amp;#39;s not a secret that Claude",
			  },
			  {
			    "duration": 4.56,
			    "offset": 109.96,
			    "text": "is better at code than open ai&amp;#39;s models",
			  },
			  {
			    "duration": 4.359,
			    "offset": 112.68,
			    "text": "we have pretty well establish that at",
			  },
			  {
			    "duration": 4.32,
			    "offset": 114.52,
			    "text": "this point but for Microsoft and GitHub",
			  },
			  {
			    "duration": 4.321,
			    "offset": 117.039,
			    "text": "to be willing to make a change like this",
			  },
			  {
			    "duration": 5.36,
			    "offset": 118.84,
			    "text": "and no longer be a full open AI house",
			  },
			  {
			    "duration": 5.32,
			    "offset": 121.36,
			    "text": "that means things are about to change",
			  },
			  {
			    "duration": 4.919,
			    "offset": 124.2,
			    "text": "Microsoft is no longer betting entirely",
			  },
			  {
			    "duration": 5.919,
			    "offset": 126.68,
			    "text": "on open Ai and GitHub isn&amp;#39;t either",
			  },
			  {
			    "duration": 5.361,
			    "offset": 129.119,
			    "text": "co-pilot has been rethought as a real",
			  },
			  {
			    "duration": 3.481,
			    "offset": 132.599,
			    "text": "competitor to cursor before we go any",
			  },
			  {
			    "duration": 3.16,
			    "offset": 134.48,
			    "text": "further real quick disclosure I&amp;#39;m an",
			  },
			  {
			    "duration": 3.08,
			    "offset": 136.08,
			    "text": "investor in all three companies that I",
			  },
			  {
			    "duration": 3.08,
			    "offset": 137.64,
			    "text": "just mentioned about equal across the",
			  },
			  {
			    "duration": 3.439,
			    "offset": 139.16,
			    "text": "three of them between super Maven cursor",
			  },
			  {
			    "duration": 3.159,
			    "offset": 140.72,
			    "text": "and Microsoft but none of them know I&amp;#39;m",
			  },
			  {
			    "duration": 2.961,
			    "offset": 142.599,
			    "text": "making this video none of them are",
			  },
			  {
			    "duration": 3.801,
			    "offset": 143.879,
			    "text": "paying me anything to talk about any of",
			  },
			  {
			    "duration": 3.759,
			    "offset": 145.56,
			    "text": "this but I do have to get paid so let&amp;#39;s",
			  },
			  {
			    "duration": 3.559,
			    "offset": 147.68,
			    "text": "quickly hear from today&amp;#39;s sponsor post",
			  },
			  {
			    "duration": 3.64,
			    "offset": 149.319,
			    "text": "hog post Hog&amp;#39;s the all-in-one Suite of",
			  },
			  {
			    "duration": 3.36,
			    "offset": 151.239,
			    "text": "product tools you wish you started with",
			  },
			  {
			    "duration": 3.201,
			    "offset": 152.959,
			    "text": "I can&amp;#39;t tell you how many analytics",
			  },
			  {
			    "duration": 3.561,
			    "offset": 154.599,
			    "text": "providers I&amp;#39;ve used over the past 5",
			  },
			  {
			    "duration": 4.32,
			    "offset": 156.16,
			    "text": "years alone and post Hog&amp;#39;s the first one",
			  },
			  {
			    "duration": 3.719,
			    "offset": 158.16,
			    "text": "that I honestly stuck with they have a",
			  },
			  {
			    "duration": 2.96,
			    "offset": 160.48,
			    "text": "bunch of tools that actually help your",
			  },
			  {
			    "duration": 3.881,
			    "offset": 161.879,
			    "text": "products from session replays to feature",
			  },
			  {
			    "duration": 4.879,
			    "offset": 163.44,
			    "text": "Flags to surveys yes a good survey",
			  },
			  {
			    "duration": 4.399,
			    "offset": 165.76,
			    "text": "product no more Google forms by the way",
			  },
			  {
			    "duration": 3.121,
			    "offset": 168.319,
			    "text": "they&amp;#39;re open source so you can self-host",
			  },
			  {
			    "duration": 2.921,
			    "offset": 170.159,
			    "text": "if you really want to but they&amp;#39;re",
			  },
			  {
			    "duration": 4.12,
			    "offset": 171.44,
			    "text": "honestly so cheap you probably won&amp;#39;t",
			  },
			  {
			    "duration": 5.4,
			    "offset": 173.08,
			    "text": "bother also look at this website really",
			  },
			  {
			    "duration": 4.44,
			    "offset": 175.56,
			    "text": "quick not this part that&amp;#39;s cool this",
			  },
			  {
			    "duration": 3.8,
			    "offset": 178.48,
			    "text": "part",
			  },
			  {
			    "duration": 3.92,
			    "offset": 180,
			    "text": "it&amp;#39;s silly but trust me once you start",
			  },
			  {
			    "duration": 3.84,
			    "offset": 182.28,
			    "text": "using the product you&amp;#39;ll get it their",
			  },
			  {
			    "duration": 3.72,
			    "offset": 183.92,
			    "text": "Vibes they&amp;#39;re Immaculate that&amp;#39;s all I",
			  },
			  {
			    "duration": 2.92,
			    "offset": 186.12,
			    "text": "know how to put it as thank you post",
			  },
			  {
			    "duration": 3.72,
			    "offset": 187.64,
			    "text": "talk for sponsoring today&amp;#39;s video check",
			  },
			  {
			    "duration": 5.559,
			    "offset": 189.04,
			    "text": "them out at po hog.com Theo and let them",
			  },
			  {
			    "duration": 5.36,
			    "offset": 191.36,
			    "text": "know Theo sent you let&amp;#39;s dive in quick",
			  },
			  {
			    "duration": 4.36,
			    "offset": 194.599,
			    "text": "thing because it came up in chat and I",
			  },
			  {
			    "duration": 4.32,
			    "offset": 196.72,
			    "text": "wasn&amp;#39;t clear about it super Maven is",
			  },
			  {
			    "duration": 4.28,
			    "offset": 198.959,
			    "text": "using their own model they are just a",
			  },
			  {
			    "duration": 4.96,
			    "offset": 201.04,
			    "text": "small extension in your editor but the",
			  },
			  {
			    "duration": 4.72,
			    "offset": 203.239,
			    "text": "model is what they&amp;#39;re building so super",
			  },
			  {
			    "duration": 4.319,
			    "offset": 206,
			    "text": "mavens all in on the model cursors all",
			  },
			  {
			    "duration": 4.48,
			    "offset": 207.959,
			    "text": "in on the ux co-piloted somewhere",
			  },
			  {
			    "duration": 4.92,
			    "offset": 210.319,
			    "text": "between the two and it&amp;#39;s not fully",
			  },
			  {
			    "duration": 4.561,
			    "offset": 212.439,
			    "text": "committed they do use Claude and open AI",
			  },
			  {
			    "duration": 3.64,
			    "offset": 215.239,
			    "text": "for their chat but the actual",
			  },
			  {
			    "duration": 5.04,
			    "offset": 217,
			    "text": "autocomplete is entirely super maven&amp;#39;s",
			  },
			  {
			    "duration": 5.121,
			    "offset": 218.879,
			    "text": "model and it flies if I recall the tab 9",
			  },
			  {
			    "duration": 3.759,
			    "offset": 222.04,
			    "text": "founder is the super Maven founder I",
			  },
			  {
			    "duration": 4.92,
			    "offset": 224,
			    "text": "might be wrong on that but I&amp;#39;m pretty",
			  },
			  {
			    "duration": 5.041,
			    "offset": 225.799,
			    "text": "sure this slide broke me I did not",
			  },
			  {
			    "duration": 3.959,
			    "offset": 228.92,
			    "text": "expect this in the slightest I thought",
			  },
			  {
			    "duration": 4.52,
			    "offset": 230.84,
			    "text": "co-pilot would slowly die on top of the",
			  },
			  {
			    "duration": 4.841,
			    "offset": 232.879,
			    "text": "wrong model as I said here this is",
			  },
			  {
			    "duration": 4.079,
			    "offset": 235.36,
			    "text": "Monumental the open Ai and Microsoft",
			  },
			  {
			    "duration": 3.719,
			    "offset": 237.72,
			    "text": "partnership is starting to crumble",
			  },
			  {
			    "duration": 4.201,
			    "offset": 239.439,
			    "text": "people freaked out here and as you see",
			  },
			  {
			    "duration": 3.561,
			    "offset": 241.439,
			    "text": "in the replies chbt is not usable for",
			  },
			  {
			    "duration": 3,
			    "offset": 243.64,
			    "text": "anything coding related when you compare",
			  },
			  {
			    "duration": 3.599,
			    "offset": 245,
			    "text": "it to Claude it makes sense probably",
			  },
			  {
			    "duration": 3.08,
			    "offset": 246.64,
			    "text": "didn&amp;#39;t like the little apple stun the S",
			  },
			  {
			    "duration": 3.72,
			    "offset": 248.599,
			    "text": "yeah there&amp;#39;s a lot of little things I&amp;#39;m",
			  },
			  {
			    "duration": 5.079,
			    "offset": 249.72,
			    "text": "sure they&amp;#39;re not happy about and Claude",
			  },
			  {
			    "duration": 4.241,
			    "offset": 252.319,
			    "text": "is a better model for code what a mess",
			  },
			  {
			    "duration": 3.16,
			    "offset": 254.799,
			    "text": "if this was just the models that we were",
			  },
			  {
			    "duration": 5,
			    "offset": 256.56,
			    "text": "talking about that&amp;#39;d be one thing but",
			  },
			  {
			    "duration": 5.321,
			    "offset": 257.959,
			    "text": "they they did a lot of changes here I I",
			  },
			  {
			    "duration": 4.76,
			    "offset": 261.56,
			    "text": "hate to do this to you guys and I",
			  },
			  {
			    "duration": 5.359,
			    "offset": 263.28,
			    "text": "promise I promise we&amp;#39;ll make it as",
			  },
			  {
			    "duration": 5.24,
			    "offset": 266.32,
			    "text": "valuable as possible no one should have",
			  },
			  {
			    "duration": 5.161,
			    "offset": 268.639,
			    "text": "to watch 50 minutes of GitHub Universe",
			  },
			  {
			    "duration": 4.079,
			    "offset": 271.56,
			    "text": "keynote we&amp;#39;ll do our best to go through",
			  },
			  {
			    "duration": 3.6,
			    "offset": 273.8,
			    "text": "this and chop it down so only the",
			  },
			  {
			    "duration": 3.161,
			    "offset": 275.639,
			    "text": "important parts become your problem",
			  },
			  {
			    "duration": 4.48,
			    "offset": 277.4,
			    "text": "we&amp;#39;re talking about the models so let&amp;#39;s",
			  },
			  {
			    "duration": 5.56,
			    "offset": 278.8,
			    "text": "start with this bit I am so not excited",
			  },
			  {
			    "duration": 6.039,
			    "offset": 281.88,
			    "text": "and finally in phase two we will go from",
			  },
			  {
			    "duration": 7.32,
			    "offset": 284.36,
			    "text": "multimodal functionality to multimodal",
			  },
			  {
			    "duration": 5.321,
			    "offset": 287.919,
			    "text": "Choice I&amp;#39;ve never seen a slide from a an",
			  },
			  {
			    "duration": 4.48,
			    "offset": 291.68,
			    "text": "established software development",
			  },
			  {
			    "duration": 6.799,
			    "offset": 293.24,
			    "text": "business that has this many meaningless",
			  },
			  {
			    "duration": 6.68,
			    "offset": 296.16,
			    "text": "terms on it AI infused AI native AI",
			  },
			  {
			    "duration": 5.081,
			    "offset": 300.039,
			    "text": "agents conversational coding multimodel",
			  },
			  {
			    "duration": 4.28,
			    "offset": 302.84,
			    "text": "functionality and multimodel choice none",
			  },
			  {
			    "duration": 5.76,
			    "offset": 305.12,
			    "text": "of these mean a",
			  },
			  {
			    "duration": 6.639,
			    "offset": 307.12,
			    "text": "thing I I hate this era I hate this so",
			  },
			  {
			    "duration": 5.48,
			    "offset": 310.88,
			    "text": "much it sucks cuz there is actual value",
			  },
			  {
			    "duration": 5.44,
			    "offset": 313.759,
			    "text": "in these tools cursor has made my life",
			  },
			  {
			    "duration": 5.279,
			    "offset": 316.36,
			    "text": "better Claude has been a great model to",
			  },
			  {
			    "duration": 4.481,
			    "offset": 319.199,
			    "text": "work with nothing on this slide means",
			  },
			  {
			    "duration": 3.28,
			    "offset": 321.639,
			    "text": " anything if you was saying in",
			  },
			  {
			    "duration": 2.4,
			    "offset": 323.68,
			    "text": "chat this feels like they&amp;#39;re the you",
			  },
			  {
			    "duration": 2.4,
			    "offset": 324.919,
			    "text": "know what I&amp;#39;m going to pull chat up so",
			  },
			  {
			    "duration": 3.72,
			    "offset": 326.08,
			    "text": "you guys can hang out with me so I&amp;#39;m not",
			  },
			  {
			    "duration": 4.72,
			    "offset": 327.319,
			    "text": "suffering alone with this God",
			  },
			  {
			    "duration": 3.76,
			    "offset": 329.8,
			    "text": "God I can&amp;#39;t believe we&amp;#39;re at this point",
			  },
			  {
			    "duration": 4.961,
			    "offset": 332.039,
			    "text": "this is this is straight up from a",
			  },
			  {
			    "duration": 6.68,
			    "offset": 333.56,
			    "text": "sitcom go from multimodal functionality",
			  },
			  {
			    "duration": 6.08,
			    "offset": 337,
			    "text": "to multi model Choice there was a boom",
			  },
			  {
			    "duration": 5.239,
			    "offset": 340.24,
			    "text": "of high quality model are these the next",
			  },
			  {
			    "duration": 5.16,
			    "offset": 343.08,
			    "text": "steps for these so conversational coding",
			  },
			  {
			    "duration": 6.081,
			    "offset": 345.479,
			    "text": "becomes AI agents I hate this I hate",
			  },
			  {
			    "duration": 6.48,
			    "offset": 348.24,
			    "text": "every second of this and you know what",
			  },
			  {
			    "duration": 6.32,
			    "offset": 351.56,
			    "text": "GitHub is still GitHub we are an open",
			  },
			  {
			    "duration": 5.64,
			    "offset": 354.72,
			    "text": "developer platform and developers expect",
			  },
			  {
			    "duration": 5.08,
			    "offset": 357.88,
			    "text": "the agency to build with the models that",
			  },
			  {
			    "duration": 5.36,
			    "offset": 360.36,
			    "text": "work best for them just the way he",
			  },
			  {
			    "duration": 4.959,
			    "offset": 362.96,
			    "text": "enunciated developers there developers",
			  },
			  {
			    "duration": 4.52,
			    "offset": 365.72,
			    "text": "developers developers developers",
			  },
			  {
			    "duration": 4.481,
			    "offset": 367.919,
			    "text": "developers developers developers",
			  },
			  {
			    "duration": 4.359,
			    "offset": 370.24,
			    "text": "developers developers developers",
			  },
			  {
			    "duration": 5.48,
			    "offset": 372.4,
			    "text": "developers developers developers",
			  },
			  {
			    "duration": 6.201,
			    "offset": 374.599,
			    "text": "developers open developer platform and",
			  },
			  {
			    "duration": 5.56,
			    "offset": 377.88,
			    "text": "developers expect the agency to build",
			  },
			  {
			    "duration": 4.56,
			    "offset": 380.8,
			    "text": "with the models that work best for them",
			  },
			  {
			    "duration": 5.479,
			    "offset": 383.44,
			    "text": "this is just German Steve Balmer with",
			  },
			  {
			    "duration": 5.8,
			    "offset": 385.36,
			    "text": "less to say developers developers I so",
			  },
			  {
			    "duration": 5.801,
			    "offset": 388.919,
			    "text": "today we deliver just that and we",
			  },
			  {
			    "duration": 3.56,
			    "offset": 391.16,
			    "text": "deliver it right here right",
			  },
			  {
			    "duration": 4.96,
			    "offset": 396.88,
			    "text": "now can they they say anything real here",
			  },
			  {
			    "duration": 4.2,
			    "offset": 400.24,
			    "text": "okay this is they they show you have",
			  },
			  {
			    "duration": 4.44,
			    "offset": 401.84,
			    "text": "multiple model choices cool I think the",
			  },
			  {
			    "duration": 3.92,
			    "offset": 404.44,
			    "text": "fact that developers have to know the",
			  },
			  {
			    "duration": 5.319,
			    "offset": 406.28,
			    "text": "difference between these models and make",
			  },
			  {
			    "duration": 5.44,
			    "offset": 408.36,
			    "text": "choices is a fundamental failure in the",
			  },
			  {
			    "duration": 4.32,
			    "offset": 411.599,
			    "text": "adoption of these things it reminds me",
			  },
			  {
			    "duration": 4.16,
			    "offset": 413.8,
			    "text": "of the era where to use a computer you",
			  },
			  {
			    "duration": 4,
			    "offset": 415.919,
			    "text": "had to know how a terminal worked the",
			  },
			  {
			    "duration": 3.959,
			    "offset": 417.96,
			    "text": "fact that people who are coding or",
			  },
			  {
			    "duration": 6.56,
			    "offset": 419.919,
			    "text": "working with these AI models need to",
			  },
			  {
			    "duration": 6.4,
			    "offset": 421.919,
			    "text": "know that Claude 3.5 Sonet 104 behaves",
			  },
			  {
			    "duration": 3.72,
			    "offset": 426.479,
			    "text": "fundamentally differently then Claude",
			  },
			  {
			    "duration": 5.72,
			    "offset": 428.319,
			    "text": "3.5 Sonet",
			  },
			  {
			    "duration": 5.56,
			    "offset": 430.199,
			    "text": "0415 or whatever the why why in my",
			  },
			  {
			    "duration": 5.041,
			    "offset": 434.039,
			    "text": "goddamn editor and I go to curser",
			  },
			  {
			    "duration": 6.921,
			    "offset": 435.759,
			    "text": "settings do I have all of these",
			  },
			  {
			    "duration": 5.559,
			    "offset": 439.08,
			    "text": "options why is this a thing why okay",
			  },
			  {
			    "duration": 4.359,
			    "offset": 442.68,
			    "text": "let&amp;#39;s do a poll real quick I&amp;#39;m curious",
			  },
			  {
			    "duration": 4.56,
			    "offset": 444.639,
			    "text": "and remember y&amp;#39;all on YouTube seeing",
			  },
			  {
			    "duration": 4.761,
			    "offset": 447.039,
			    "text": "this this is a representative group of",
			  },
			  {
			    "duration": 4.4,
			    "offset": 449.199,
			    "text": "hard cor nerds that hang out live to",
			  },
			  {
			    "duration": 5.48,
			    "offset": 451.8,
			    "text": "watch me talk about software stuff do",
			  },
			  {
			    "duration": 5.361,
			    "offset": 453.599,
			    "text": "you know the difference between Claude",
			  },
			  {
			    "duration": 7.16,
			    "offset": 457.28,
			    "text": "Sonet and",
			  },
			  {
			    "duration": 8.32,
			    "offset": 458.96,
			    "text": "Opus yes me no idea reminder this is an",
			  },
			  {
			    "duration": 4.319,
			    "offset": 464.44,
			    "text": "Enthusiast group these are the people",
			  },
			  {
			    "duration": 3.72,
			    "offset": 467.28,
			    "text": "who are the most invested and are the",
			  },
			  {
			    "duration": 4.12,
			    "offset": 468.759,
			    "text": "most likely to know these things and",
			  },
			  {
			    "duration": 3.159,
			    "offset": 471,
			    "text": "what the differences are between them",
			  },
			  {
			    "duration": 3.521,
			    "offset": 472.879,
			    "text": "we&amp;#39;re still at a",
			  },
			  {
			    "duration": 4.841,
			    "offset": 474.159,
			    "text": "62% no",
			  },
			  {
			    "duration": 6.44,
			    "offset": 476.4,
			    "text": "idea that&amp;#39;s the problem the fact that",
			  },
			  {
			    "duration": 6.199,
			    "offset": 479,
			    "text": "all of these choices exist is like meme",
			  },
			  {
			    "duration": 4.079,
			    "offset": 482.84,
			    "text": "tier also I mentioned before this Cloud",
			  },
			  {
			    "duration": 3.521,
			    "offset": 485.199,
			    "text": "3.5 Sonet is very different from this",
			  },
			  {
			    "duration": 3.081,
			    "offset": 486.919,
			    "text": "Cloud 3.5 Sonet because this is using",
			  },
			  {
			    "duration": 3.12,
			    "offset": 488.72,
			    "text": "the newest model this is using a",
			  },
			  {
			    "duration": 4.039,
			    "offset": 490,
			    "text": "slightly older one if it was just in",
			  },
			  {
			    "duration": 4.359,
			    "offset": 491.84,
			    "text": "this hidden models setting page that&amp;#39;d",
			  },
			  {
			    "duration": 4.481,
			    "offset": 494.039,
			    "text": "be one thing effect that you can provide",
			  },
			  {
			    "duration": 4.4,
			    "offset": 496.199,
			    "text": "your own API Keys is just kind of funny",
			  },
			  {
			    "duration": 4.44,
			    "offset": 498.52,
			    "text": "but it&amp;#39;s not just there when I do",
			  },
			  {
			    "duration": 3.961,
			    "offset": 500.599,
			    "text": "command a command K I have a little drop",
			  },
			  {
			    "duration": 4.16,
			    "offset": 502.96,
			    "text": "down here where I can change between the",
			  },
			  {
			    "duration": 5.12,
			    "offset": 504.56,
			    "text": "different models it is in your face",
			  },
			  {
			    "duration": 4.079,
			    "offset": 507.12,
			    "text": "about which of these things you&amp;#39;re using",
			  },
			  {
			    "duration": 3.32,
			    "offset": 509.68,
			    "text": "this is like like imagine if every time",
			  },
			  {
			    "duration": 3.601,
			    "offset": 511.199,
			    "text": "you opened an app on your Mac there was",
			  },
			  {
			    "duration": 4.56,
			    "offset": 513,
			    "text": "a little drop down that said do you want",
			  },
			  {
			    "duration": 4,
			    "offset": 514.8,
			    "text": "to use this in zish or bash or if you&amp;#39;re",
			  },
			  {
			    "duration": 2.32,
			    "offset": 517.56,
			    "text": "on Linux and every time you opened an",
			  },
			  {
			    "duration": 3.679,
			    "offset": 518.8,
			    "text": "app it&amp;#39;s like do you want to use this in",
			  },
			  {
			    "duration": 4.68,
			    "offset": 519.88,
			    "text": "Wayland or zorg these aren&amp;#39;t things that",
			  },
			  {
			    "duration": 3.961,
			    "offset": 522.479,
			    "text": "people should have to know or give a",
			  },
			  {
			    "duration": 3.88,
			    "offset": 524.56,
			    "text": " about and the fact that these",
			  },
			  {
			    "duration": 4.28,
			    "offset": 526.44,
			    "text": "abstractions are leaking to the users",
			  },
			  {
			    "duration": 6.36,
			    "offset": 528.44,
			    "text": "shows just how early and unprepared this",
			  },
			  {
			    "duration": 5.679,
			    "offset": 530.72,
			    "text": " is oh and even Gemini got a little",
			  },
			  {
			    "duration": 4.479,
			    "offset": 534.8,
			    "text": "spot but see the difference in how much",
			  },
			  {
			    "duration": 6.761,
			    "offset": 536.399,
			    "text": "Gemini got versus anthropic that says a",
			  },
			  {
			    "duration": 7.641,
			    "offset": 539.279,
			    "text": "lot we mean it when we say multimodal",
			  },
			  {
			    "duration": 5.88,
			    "offset": 543.16,
			    "text": "Choice today lightning strikes twice so",
			  },
			  {
			    "duration": 5.28,
			    "offset": 546.92,
			    "text": "we&amp;#39;re thrilled to share a partnership",
			  },
			  {
			    "duration": 5.52,
			    "offset": 549.04,
			    "text": "with Google bringing Gemini 1.5 Pro to",
			  },
			  {
			    "duration": 2.36,
			    "offset": 552.2,
			    "text": "get up",
			  },
			  {
			    "duration": 4.4,
			    "offset": 555.92,
			    "text": "co-pilot I don&amp;#39;t think I have that",
			  },
			  {
			    "duration": 3.52,
			    "offset": 558.72,
			    "text": "option here not that anyone would want",
			  },
			  {
			    "duration": 3.92,
			    "offset": 560.32,
			    "text": "it yeah it&amp;#39;s not even in here good it it",
			  },
			  {
			    "duration": 4.4,
			    "offset": 562.24,
			    "text": "shows again Microsoft doing Microsoft",
			  },
			  {
			    "duration": 4.76,
			    "offset": 564.24,
			    "text": "thing like what they actually wanted was",
			  },
			  {
			    "duration": 5.16,
			    "offset": 566.64,
			    "text": "anthropic and Sonet but in order to make",
			  },
			  {
			    "duration": 5.48,
			    "offset": 569,
			    "text": "it not piss off open AI too much like no",
			  },
			  {
			    "duration": 6.92,
			    "offset": 571.8,
			    "text": "we support everyone no one wants this",
			  },
			  {
			    "duration": 4.24,
			    "offset": 574.48,
			    "text": "nobody wants Gemini except for Google",
			  },
			  {
			    "duration": 4.48,
			    "offset": 578.76,
			    "text": "employees what does matter is the",
			  },
			  {
			    "duration": 4.199,
			    "offset": 580.76,
			    "text": "changes they&amp;#39;re making to vs code um so",
			  },
			  {
			    "duration": 3.76,
			    "offset": 583.24,
			    "text": "this is the website that we&amp;#39;re going to",
			  },
			  {
			    "duration": 4.041,
			    "offset": 584.959,
			    "text": "be working on throughout the day-to-day",
			  },
			  {
			    "duration": 4.44,
			    "offset": 587,
			    "text": "and building some cool things with it so",
			  },
			  {
			    "duration": 4.839,
			    "offset": 589,
			    "text": "before I get into oh is that cido cool",
			  },
			  {
			    "duration": 3.68,
			    "offset": 591.44,
			    "text": "finally like a human I can trust some",
			  },
			  {
			    "duration": 2.481,
			    "offset": 593.839,
			    "text": "amount on stage don&amp;#39;t want to think",
			  },
			  {
			    "duration": 4,
			    "offset": 595.12,
			    "text": "about how much they paid her to do this",
			  },
			  {
			    "duration": 5.639,
			    "offset": 596.32,
			    "text": "but yeah to it I&amp;#39;m going to head over to",
			  },
			  {
			    "duration": 3.959,
			    "offset": 599.12,
			    "text": "the code who here has used GitHub",
			  },
			  {
			    "duration": 4.081,
			    "offset": 601.959,
			    "text": "co-pilot",
			  },
			  {
			    "duration": 4.521,
			    "offset": 603.079,
			    "text": "before wow that is awesome that is an",
			  },
			  {
			    "duration": 4.16,
			    "offset": 606.04,
			    "text": "embarrassingly small number of hands but",
			  },
			  {
			    "duration": 4.32,
			    "offset": 607.6,
			    "text": "to be fair GitHub Universe has a",
			  },
			  {
			    "duration": 3.8,
			    "offset": 610.2,
			    "text": "surprisingly small number of devs I was",
			  },
			  {
			    "duration": 4.039,
			    "offset": 611.92,
			    "text": "supposed to go today I chose not to",
			  },
			  {
			    "duration": 3.48,
			    "offset": 614,
			    "text": "because I preferred to record I tried",
			  },
			  {
			    "duration": 4.201,
			    "offset": 615.959,
			    "text": "using Gemini and it converted my react",
			  },
			  {
			    "duration": 4.68,
			    "offset": 617.48,
			    "text": "app to angular even if that&amp;#39;s fake it&amp;#39;s",
			  },
			  {
			    "duration": 3.799,
			    "offset": 620.16,
			    "text": "funny and you&amp;#39;re making my job so much",
			  },
			  {
			    "duration": 4.239,
			    "offset": 622.16,
			    "text": "easier for those who haven&amp;#39;t used it",
			  },
			  {
			    "duration": 4.12,
			    "offset": 623.959,
			    "text": "before that&amp;#39;s okay I&amp;#39;m going to show you",
			  },
			  {
			    "duration": 3.961,
			    "offset": 626.399,
			    "text": "an example of what it can do so what I",
			  },
			  {
			    "duration": 7,
			    "offset": 628.079,
			    "text": "could do is I could type aun function",
			  },
			  {
			    "duration": 7.159,
			    "offset": 630.36,
			    "text": "get coolest developer in the world and",
			  },
			  {
			    "duration": 3.401,
			    "offset": 635.079,
			    "text": "then try to autocomplete it and see what",
			  },
			  {
			    "duration": 3.641,
			    "offset": 637.519,
			    "text": "it",
			  },
			  {
			    "duration": 4.72,
			    "offset": 638.48,
			    "text": "returns no offense",
			  },
			  {
			    "duration": 4.2,
			    "offset": 641.16,
			    "text": "cido that was",
			  },
			  {
			    "duration": 4.439,
			    "offset": 643.2,
			    "text": "better it&amp;#39;s a small thing but like as",
			  },
			  {
			    "duration": 3.44,
			    "offset": 645.36,
			    "text": "I&amp;#39;m typing oh it&amp;#39;s already autoc",
			  },
			  {
			    "duration": 3.081,
			    "offset": 647.639,
			    "text": "correcting like I probably want to get",
			  },
			  {
			    "duration": 4.88,
			    "offset": 648.8,
			    "text": "rid of that cuz it&amp;#39;s saw I just deleted",
			  },
			  {
			    "duration": 6.359,
			    "offset": 650.72,
			    "text": "things but if I go back to typing it get",
			  },
			  {
			    "duration": 5.24,
			    "offset": 653.68,
			    "text": "coolest developer in the world it",
			  },
			  {
			    "duration": 2.841,
			    "offset": 657.079,
			    "text": "autocompletes more than just the Open",
			  },
			  {
			    "duration": 2.479,
			    "offset": 658.92,
			    "text": "Bracket",
			  },
			  {
			    "duration": 3.599,
			    "offset": 659.92,
			    "text": "and also this has been a big thing for",
			  },
			  {
			    "duration": 4.521,
			    "offset": 661.399,
			    "text": "me using co-pilot it would often screw",
			  },
			  {
			    "duration": 4,
			    "offset": 663.519,
			    "text": "up the ends of things so it would miss a",
			  },
			  {
			    "duration": 3.56,
			    "offset": 665.92,
			    "text": "semicolon or it would screw it the",
			  },
			  {
			    "duration": 4.081,
			    "offset": 667.519,
			    "text": "brackets at the end this doesn&amp;#39;t have",
			  },
			  {
			    "duration": 3.52,
			    "offset": 669.48,
			    "text": "those problems which is really nice it&amp;#39;s",
			  },
			  {
			    "duration": 4.039,
			    "offset": 671.6,
			    "text": "still slow compared to what I like with",
			  },
			  {
			    "duration": 4.399,
			    "offset": 673,
			    "text": "super Maven but it&amp;#39;s pretty fast it",
			  },
			  {
			    "duration": 4,
			    "offset": 675.639,
			    "text": "gives good answers and it doesn&amp;#39;t do the",
			  },
			  {
			    "duration": 5.68,
			    "offset": 677.399,
			    "text": "weird syntax like open closing",
			  },
			  {
			    "duration": 8.601,
			    "offset": 679.639,
			    "text": "that I had a lot of with co-pilot",
			  },
			  {
			    "duration": 7.681,
			    "offset": 683.079,
			    "text": "anyways what AI has never lied okay so",
			  },
			  {
			    "duration": 4.159,
			    "offset": 688.24,
			    "text": "it does a very very smart autocomplete",
			  },
			  {
			    "duration": 3.48,
			    "offset": 690.76,
			    "text": "but you can also use GitHub co-pilot",
			  },
			  {
			    "duration": 4.201,
			    "offset": 692.399,
			    "text": "chat so I could highlight this right",
			  },
			  {
			    "duration": 5.32,
			    "offset": 694.24,
			    "text": "here and I don&amp;#39;t even have to just ask",
			  },
			  {
			    "duration": 2.96,
			    "offset": 696.6,
			    "text": "in English I could",
			  },
			  {
			    "duration": 6.56,
			    "offset": 700.32,
			    "text": "say in Spanish and then it will explain",
			  },
			  {
			    "duration": 5.201,
			    "offset": 704.519,
			    "text": "what this code does in Spanish for me",
			  },
			  {
			    "duration": 4.8,
			    "offset": 706.88,
			    "text": "right here in the chat so unironically",
			  },
			  {
			    "duration": 4.64,
			    "offset": 709.72,
			    "text": "cool use case this is a thing I think",
			  },
			  {
			    "duration": 5.12,
			    "offset": 711.68,
			    "text": "about a lot the fact that to be a",
			  },
			  {
			    "duration": 5.52,
			    "offset": 714.36,
			    "text": "successful developer you almost have to",
			  },
			  {
			    "duration": 5.2,
			    "offset": 716.8,
			    "text": "know English sucks it&amp;#39;s not not just",
			  },
			  {
			    "duration": 4.68,
			    "offset": 719.88,
			    "text": "like the resources are in English it&amp;#39;s",
			  },
			  {
			    "duration": 4.88,
			    "offset": 722,
			    "text": "like the languages are in English in",
			  },
			  {
			    "duration": 4.399,
			    "offset": 724.56,
			    "text": "JavaScript to define a function you",
			  },
			  {
			    "duration": 3.959,
			    "offset": 726.88,
			    "text": "write the English word function to",
			  },
			  {
			    "duration": 5.24,
			    "offset": 728.959,
			    "text": "import something you write the English",
			  },
			  {
			    "duration": 5.44,
			    "offset": 730.839,
			    "text": "word import code is written in English",
			  },
			  {
			    "duration": 4.721,
			    "offset": 734.199,
			    "text": "even if you&amp;#39;re not an English speaker",
			  },
			  {
			    "duration": 5.201,
			    "offset": 736.279,
			    "text": "and it&amp;#39;s sometimes jarring to see",
			  },
			  {
			    "duration": 6.279,
			    "offset": 738.92,
			    "text": "English function followed by a Spanish",
			  },
			  {
			    "duration": 5.039,
			    "offset": 741.48,
			    "text": "or a German or other languages word but",
			  },
			  {
			    "duration": 3.041,
			    "offset": 745.199,
			    "text": "now imagine you&amp;#39;re a Dev that doesn&amp;#39;t",
			  },
			  {
			    "duration": 2.76,
			    "offset": 746.519,
			    "text": "speak native English you know some of",
			  },
			  {
			    "duration": 2.719,
			    "offset": 748.24,
			    "text": "these words because you&amp;#39;ve written",
			  },
			  {
			    "duration": 3.281,
			    "offset": 749.279,
			    "text": "enough code but you don&amp;#39;t really know",
			  },
			  {
			    "duration": 3.12,
			    "offset": 750.959,
			    "text": "them and now you&amp;#39;re reading a code base",
			  },
			  {
			    "duration": 3.68,
			    "offset": 752.56,
			    "text": "that is complex and you don&amp;#39;t know which",
			  },
			  {
			    "duration": 3.88,
			    "offset": 754.079,
			    "text": "words are things they defined versus are",
			  },
			  {
			    "duration": 3.68,
			    "offset": 756.24,
			    "text": "things that are part of the language and",
			  },
			  {
			    "duration": 4.161,
			    "offset": 757.959,
			    "text": "you&amp;#39;re struggling to keep up the idea of",
			  },
			  {
			    "duration": 3.68,
			    "offset": 759.92,
			    "text": "chat as a way to like understand code",
			  },
			  {
			    "duration": 4.36,
			    "offset": 762.12,
			    "text": "that&amp;#39;s in a language you aren&amp;#39;t familiar",
			  },
			  {
			    "duration": 4.919,
			    "offset": 763.6,
			    "text": "with not JavaScript versus python but",
			  },
			  {
			    "duration": 4.799,
			    "offset": 766.48,
			    "text": "English versus Spanish is actually a",
			  },
			  {
			    "duration": 4.721,
			    "offset": 768.519,
			    "text": "compelling use case I can&amp;#39;t believe I",
			  },
			  {
			    "duration": 4.521,
			    "offset": 771.279,
			    "text": "have been trolled into saying that",
			  },
			  {
			    "duration": 5.32,
			    "offset": 773.24,
			    "text": "co-pilot chat can be useful but this is",
			  },
			  {
			    "duration": 4.279,
			    "offset": 775.8,
			    "text": "a good use case as you see in chat",
			  },
			  {
			    "duration": 3.04,
			    "offset": 778.56,
			    "text": "Spanish speaker here me and my whole",
			  },
			  {
			    "duration": 3.281,
			    "offset": 780.079,
			    "text": "team write code in English and everyone",
			  },
			  {
			    "duration": 4.919,
			    "offset": 781.6,
			    "text": "else I know only did it in Spanish and",
			  },
			  {
			    "duration": 6.64,
			    "offset": 783.36,
			    "text": "University these are fair points anyways",
			  },
			  {
			    "duration": 6.76,
			    "offset": 786.519,
			    "text": "if only we could edit multiple files at",
			  },
			  {
			    "duration": 6.399,
			    "offset": 790,
			    "text": "once well now we can co-pilot from",
			  },
			  {
			    "duration": 4.8,
			    "offset": 793.279,
			    "text": "multifile editing is now available did",
			  },
			  {
			    "duration": 6.201,
			    "offset": 796.399,
			    "text": "co-pilot really not have multifile",
			  },
			  {
			    "duration": 6.88,
			    "offset": 798.079,
			    "text": "editing before like actually I haven&amp;#39;t",
			  },
			  {
			    "duration": 4.64,
			    "offset": 802.6,
			    "text": "used it in so long did that actually",
			  },
			  {
			    "duration": 4.401,
			    "offset": 804.959,
			    "text": "just not have it I&amp;#39;ve had that in cursor",
			  },
			  {
			    "duration": 3.92,
			    "offset": 807.24,
			    "text": "forever now if I so this is this is an",
			  },
			  {
			    "duration": 5.599,
			    "offset": 809.36,
			    "text": "app I was working on it&amp;#39;s um building",
			  },
			  {
			    "duration": 6.6,
			    "offset": 811.16,
			    "text": "the Pokemon app in the new next patterns",
			  },
			  {
			    "duration": 3.961,
			    "offset": 814.959,
			    "text": "uh let&amp;#39;s try doing something across",
			  },
			  {
			    "duration": 3.24,
			    "offset": 817.76,
			    "text": "files I&amp;#39;m not even going to give it the",
			  },
			  {
			    "duration": 4.56,
			    "offset": 818.92,
			    "text": "context I&amp;#39;m just going to open this file",
			  },
			  {
			    "duration": 5.48,
			    "offset": 821,
			    "text": "that I&amp;#39;m in let&amp;#39;s clear everything I",
			  },
			  {
			    "duration": 8.12,
			    "offset": 823.48,
			    "text": "have reset it suggest other files I can",
			  },
			  {
			    "duration": 11.12,
			    "offset": 826.48,
			    "text": "add let&amp;#39;s add an accurate metadata",
			  },
			  {
			    "duration": 6,
			    "offset": 831.6,
			    "text": "export for every page. TSX file",
			  },
			  {
			    "duration": 2.64,
			    "offset": 842.759,
			    "text": "I didn&amp;#39;t do",
			  },
			  {
			    "duration": 5.88,
			    "offset": 845.56,
			    "text": "anything now it went through and added a",
			  },
			  {
			    "duration": 4.641,
			    "offset": 848.399,
			    "text": "metadata export to all of my routes we",
			  },
			  {
			    "duration": 3.319,
			    "offset": 851.44,
			    "text": "can look at all the things it changed",
			  },
			  {
			    "duration": 3.919,
			    "offset": 853.04,
			    "text": "here here is what it added to each of",
			  },
			  {
			    "duration": 3.601,
			    "offset": 854.759,
			    "text": "the different pages and when you look at",
			  },
			  {
			    "duration": 2.8,
			    "offset": 856.959,
			    "text": "them here you can actually see behind",
			  },
			  {
			    "duration": 2.719,
			    "offset": 858.36,
			    "text": "that I don&amp;#39;t even know the H key to",
			  },
			  {
			    "duration": 2.481,
			    "offset": 859.759,
			    "text": "minimize because I usually just accept",
			  },
			  {
			    "duration": 3.801,
			    "offset": 861.079,
			    "text": "and then go and check the code that it",
			  },
			  {
			    "duration": 4.599,
			    "offset": 862.24,
			    "text": "changed after so I&amp;#39;ll just do that and",
			  },
			  {
			    "duration": 5,
			    "offset": 864.88,
			    "text": "now we see it created this with a title",
			  },
			  {
			    "duration": 5.12,
			    "offset": 866.839,
			    "text": "a description and open graph nice see",
			  },
			  {
			    "duration": 3.959,
			    "offset": 869.88,
			    "text": "how easy that is let&amp;#39;s see how they do",
			  },
			  {
			    "duration": 3.161,
			    "offset": 871.959,
			    "text": "it in multifile editing and vs code",
			  },
			  {
			    "duration": 3.8,
			    "offset": 873.839,
			    "text": "which I I I actually can&amp;#39;t believe I",
			  },
			  {
			    "duration": 2.519,
			    "offset": 875.12,
			    "text": "didn&amp;#39;t have this",
			  },
			  {
			    "duration": 5.919,
			    "offset": 877.72,
			    "text": "before",
			  },
			  {
			    "duration": 5.759,
			    "offset": 879.88,
			    "text": "so we have this new edit mode right here",
			  },
			  {
			    "duration": 5.76,
			    "offset": 883.639,
			    "text": "and what&amp;#39;s cool about this new edit mode",
			  },
			  {
			    "duration": 7.64,
			    "offset": 885.639,
			    "text": "is first of all I can God the UI is so",
			  },
			  {
			    "duration": 5.88,
			    "offset": 889.399,
			    "text": "close that&amp;#39;s like insulting it&amp;#39;s weird",
			  },
			  {
			    "duration": 4.641,
			    "offset": 893.279,
			    "text": "go down here and change the model so",
			  },
			  {
			    "duration": 4.601,
			    "offset": 895.279,
			    "text": "I&amp;#39;ll choose Claude for this one and oh",
			  },
			  {
			    "duration": 4.4,
			    "offset": 897.92,
			    "text": "boy I wonder why you chose CL",
			  },
			  {
			    "duration": 5.24,
			    "offset": 899.88,
			    "text": "and then I can say hey can you create a",
			  },
			  {
			    "duration": 5.759,
			    "offset": 902.32,
			    "text": "new reusable area graph from our points",
			  },
			  {
			    "duration": 4.839,
			    "offset": 905.12,
			    "text": "activity service and it I want it to be",
			  },
			  {
			    "duration": 3.961,
			    "offset": 908.079,
			    "text": "displayed below that points activity",
			  },
			  {
			    "duration": 4.481,
			    "offset": 909.959,
			    "text": "table and I want it to behave very",
			  },
			  {
			    "duration": 5.799,
			    "offset": 912.04,
			    "text": "similarly to the on timeline chart and",
			  },
			  {
			    "duration": 5.199,
			    "offset": 914.44,
			    "text": "then of course don&amp;#39;t forget to write",
			  },
			  {
			    "duration": 4.92,
			    "offset": 917.839,
			    "text": "tests and",
			  },
			  {
			    "duration": 6.32,
			    "offset": 919.639,
			    "text": "then we so you have to manually tag the",
			  },
			  {
			    "duration": 5.08,
			    "offset": 922.759,
			    "text": "files I&amp;#39;ve lost all interest here here&amp;#39;s",
			  },
			  {
			    "duration": 3.601,
			    "offset": 925.959,
			    "text": "what I actually did recently I just want",
			  },
			  {
			    "duration": 3.201,
			    "offset": 927.839,
			    "text": "to I&amp;#39;m not going to rep at it perfectly",
			  },
			  {
			    "duration": 3.959,
			    "offset": 929.56,
			    "text": "I just want to show you guys an actual",
			  },
			  {
			    "duration": 4.68,
			    "offset": 931.04,
			    "text": "thing I did that was uh oh this is",
			  },
			  {
			    "duration": 4,
			    "offset": 933.519,
			    "text": "really useful for me this is an app I",
			  },
			  {
			    "duration": 3.84,
			    "offset": 935.72,
			    "text": "made called quickpi it&amp;#39;s really useful",
			  },
			  {
			    "duration": 4.041,
			    "offset": 937.519,
			    "text": "for YouTubers and not many other people",
			  },
			  {
			    "duration": 4.839,
			    "offset": 939.56,
			    "text": "it&amp;#39;s a quick way to convert svgs to pgs",
			  },
			  {
			    "duration": 4.639,
			    "offset": 941.56,
			    "text": "at highres to make an image square and",
			  },
			  {
			    "duration": 3.041,
			    "offset": 944.399,
			    "text": "somebody else contributed a corner",
			  },
			  {
			    "duration": 3.2,
			    "offset": 946.199,
			    "text": "rounder that will round the corners of",
			  },
			  {
			    "duration": 3.199,
			    "offset": 947.44,
			    "text": "an image all really useful tools to just",
			  },
			  {
			    "duration": 2.24,
			    "offset": 949.399,
			    "text": "have in the browser they don&amp;#39;t cost",
			  },
			  {
			    "duration": 2.801,
			    "offset": 950.639,
			    "text": "money because they&amp;#39;re running in your",
			  },
			  {
			    "duration": 3.601,
			    "offset": 951.639,
			    "text": "browser anyways I don&amp;#39;t care but",
			  },
			  {
			    "duration": 4.28,
			    "offset": 953.44,
			    "text": "when I was working on this I did a first",
			  },
			  {
			    "duration": 4.32,
			    "offset": 955.24,
			    "text": "pass on the SVG to PNG tool got it",
			  },
			  {
			    "duration": 3.4,
			    "offset": 957.72,
			    "text": "working pretty well I went and made the",
			  },
			  {
			    "duration": 3.32,
			    "offset": 959.56,
			    "text": "square image generator and while I was",
			  },
			  {
			    "duration": 4.199,
			    "offset": 961.12,
			    "text": "working on this I came up with a better",
			  },
			  {
			    "duration": 4.439,
			    "offset": 962.88,
			    "text": "way to style and make it look okay so if",
			  },
			  {
			    "duration": 3.721,
			    "offset": 965.319,
			    "text": "I take like the fastify bench thumbnail",
			  },
			  {
			    "duration": 4.041,
			    "offset": 967.319,
			    "text": "I had this set up I had like the text",
			  },
			  {
			    "duration": 3.599,
			    "offset": 969.04,
			    "text": "and content here way I liked I had the",
			  },
			  {
			    "duration": 3.36,
			    "offset": 971.36,
			    "text": "toggles here for white and black",
			  },
			  {
			    "duration": 4.2,
			    "offset": 972.639,
			    "text": "background the save image button that&amp;#39;s",
			  },
			  {
			    "duration": 4.32,
			    "offset": 974.72,
			    "text": "uh green and the cancel that&amp;#39;s red I had",
			  },
			  {
			    "duration": 5.041,
			    "offset": 976.839,
			    "text": "this in a way I liked and the page I had",
			  },
			  {
			    "duration": 5.64,
			    "offset": 979.04,
			    "text": "built before was ugly as so what I",
			  },
			  {
			    "duration": 5.92,
			    "offset": 981.88,
			    "text": "did I you not just out of curiosity",
			  },
			  {
			    "duration": 6.599,
			    "offset": 984.68,
			    "text": "if it would work I went to the rounded",
			  },
			  {
			    "duration": 5.64,
			    "offset": 987.8,
			    "text": "tool and I just command a I don&amp;#39;t think",
			  },
			  {
			    "duration": 3.761,
			    "offset": 991.279,
			    "text": "command a I think I just command shift K",
			  },
			  {
			    "duration": 4.639,
			    "offset": 993.44,
			    "text": "it knew I was in this file so that&amp;#39;s the",
			  },
			  {
			    "duration": 6.919,
			    "offset": 995.04,
			    "text": "context I said fix the Styles so this",
			  },
			  {
			    "duration": 5,
			    "offset": 998.079,
			    "text": "looks just like the square tool that&amp;#39;s",
			  },
			  {
			    "duration": 4.44,
			    "offset": 1001.959,
			    "text": "all I",
			  },
			  {
			    "duration": 4.841,
			    "offset": 1003.079,
			    "text": "did and it just did it now it won&amp;#39;t have",
			  },
			  {
			    "duration": 4.321,
			    "offset": 1006.399,
			    "text": "much to do because I already did it",
			  },
			  {
			    "duration": 4.839,
			    "offset": 1007.92,
			    "text": "before but the fact that I could do that",
			  },
			  {
			    "duration": 4.799,
			    "offset": 1010.72,
			    "text": "and it could go find the other file it",
			  },
			  {
			    "duration": 4.88,
			    "offset": 1012.759,
			    "text": "needs for context and do it correctly",
			  },
			  {
			    "duration": 5.041,
			    "offset": 1015.519,
			    "text": "was nuts it just makes these types of",
			  },
			  {
			    "duration": 4.721,
			    "offset": 1017.639,
			    "text": "things significantly easier to do and",
			  },
			  {
			    "duration": 3.759,
			    "offset": 1020.56,
			    "text": "work around so yeah has nothing to",
			  },
			  {
			    "duration": 3.479,
			    "offset": 1022.36,
			    "text": "change cuz it was already fine but if it",
			  },
			  {
			    "duration": 3.24,
			    "offset": 1024.319,
			    "text": "wasn&amp;#39;t it would have changed a bunch of",
			  },
			  {
			    "duration": 3.08,
			    "offset": 1025.839,
			    "text": "things yeah I&amp;#39;ve been impressed with",
			  },
			  {
			    "duration": 4.24,
			    "offset": 1027.559,
			    "text": "these types of things it&amp;#39;s been a really",
			  },
			  {
			    "duration": 5.481,
			    "offset": 1028.919,
			    "text": "useful tool and I&amp;#39;m amazed that co-pilot",
			  },
			  {
			    "duration": 4.681,
			    "offset": 1031.799,
			    "text": "is both still in catchup mode and their",
			  },
			  {
			    "duration": 3.72,
			    "offset": 1034.4,
			    "text": "implementation requires you to tag the",
			  },
			  {
			    "duration": 4.479,
			    "offset": 1036.48,
			    "text": "files you want it to have access to",
			  },
			  {
			    "duration": 4.839,
			    "offset": 1038.12,
			    "text": "manually we hit go and we see what it",
			  },
			  {
			    "duration": 3.521,
			    "offset": 1040.959,
			    "text": "does and I&amp;#39;m very excited about it so it",
			  },
			  {
			    "duration": 3.24,
			    "offset": 1042.959,
			    "text": "gives us our step byep saying we&amp;#39;re",
			  },
			  {
			    "duration": 3.439,
			    "offset": 1044.48,
			    "text": "going to create a chart component we&amp;#39;re",
			  },
			  {
			    "duration": 3.441,
			    "offset": 1046.199,
			    "text": "going to add it to the profile page and",
			  },
			  {
			    "duration": 3.88,
			    "offset": 1047.919,
			    "text": "we&amp;#39;re going to create t test for that",
			  },
			  {
			    "duration": 4.72,
			    "offset": 1049.64,
			    "text": "new component and it starts creating",
			  },
			  {
			    "duration": 4.481,
			    "offset": 1051.799,
			    "text": "those files right away and so as you can",
			  },
			  {
			    "duration": 4.439,
			    "offset": 1054.36,
			    "text": "see here we already have this monthly",
			  },
			  {
			    "duration": 4.8,
			    "offset": 1056.28,
			    "text": "ports area chart graph and it&amp;#39;s based on",
			  },
			  {
			    "duration": 4,
			    "offset": 1058.799,
			    "text": "what already exists in our code base and",
			  },
			  {
			    "duration": 3.839,
			    "offset": 1061.08,
			    "text": "it has the green diff there so you can",
			  },
			  {
			    "duration": 4,
			    "offset": 1062.799,
			    "text": "see what&amp;#39;s new which is everything does",
			  },
			  {
			    "duration": 3.561,
			    "offset": 1064.919,
			    "text": "it really have the red diff on top for",
			  },
			  {
			    "duration": 3.561,
			    "offset": 1066.799,
			    "text": "empty file being deleted they haven&amp;#39;t",
			  },
			  {
			    "duration": 4,
			    "offset": 1068.48,
			    "text": "even fixed the vs code ux around it",
			  },
			  {
			    "duration": 4.799,
			    "offset": 1070.36,
			    "text": "that&amp;#39;s hilarious H I don&amp;#39;t want it to",
			  },
			  {
			    "duration": 3.92,
			    "offset": 1072.48,
			    "text": "keep roasting vs code catching up I am",
			  },
			  {
			    "duration": 2.921,
			    "offset": 1075.159,
			    "text": "actually curious about co-pilot",
			  },
			  {
			    "duration": 4.04,
			    "offset": 1076.4,
			    "text": "extensions I have no idea what these are",
			  },
			  {
			    "duration": 5.079,
			    "offset": 1078.08,
			    "text": "and I really hope they&amp;#39;re useful I",
			  },
			  {
			    "duration": 4.68,
			    "offset": 1080.44,
			    "text": "really hope so and um you can use it to",
			  },
			  {
			    "duration": 4.361,
			    "offset": 1083.159,
			    "text": "extend GitHub co-pilot to do all kinds",
			  },
			  {
			    "duration": 4.6,
			    "offset": 1085.12,
			    "text": "of things and in this particular case",
			  },
			  {
			    "duration": 5.279,
			    "offset": 1087.52,
			    "text": "I&amp;#39;m going to head back to our chat and",
			  },
			  {
			    "duration": 6.16,
			    "offset": 1089.72,
			    "text": "I&amp;#39;m going to flag launch Darkly create a",
			  },
			  {
			    "duration": 4.841,
			    "offset": 1092.799,
			    "text": "flag based on our monthly points chart",
			  },
			  {
			    "duration": 3.12,
			    "offset": 1095.88,
			    "text": "and then it will run the extension and",
			  },
			  {
			    "duration": 3.56,
			    "offset": 1097.64,
			    "text": "so we&amp;#39;ve already got a little pop up",
			  },
			  {
			    "duration": 4.12,
			    "offset": 1099,
			    "text": "here saying we want to create the flag",
			  },
			  {
			    "duration": 3.959,
			    "offset": 1101.2,
			    "text": "we have a key for it make it available",
			  },
			  {
			    "duration": 4.76,
			    "offset": 1103.12,
			    "text": "on the server and then I can toggle the",
			  },
			  {
			    "duration": 4.921,
			    "offset": 1105.159,
			    "text": "flag right here in VSS code without ever",
			  },
			  {
			    "duration": 3.96,
			    "offset": 1107.88,
			    "text": "having to leave and it just works and",
			  },
			  {
			    "duration": 4.52,
			    "offset": 1110.08,
			    "text": "there&amp;#39;s so many cool extensions out",
			  },
			  {
			    "duration": 4.36,
			    "offset": 1111.84,
			    "text": "there now that&amp;#39;s unironically cool the",
			  },
			  {
			    "duration": 4.52,
			    "offset": 1114.6,
			    "text": "ability to interface with a service that",
			  },
			  {
			    "duration": 5.479,
			    "offset": 1116.2,
			    "text": "your codebase works with via the chat",
			  },
			  {
			    "duration": 3.88,
			    "offset": 1119.12,
			    "text": "and that interface allows for you to",
			  },
			  {
			    "duration": 2.681,
			    "offset": 1121.679,
			    "text": "access things without having to install",
			  },
			  {
			    "duration": 4.52,
			    "offset": 1123,
			    "text": "a bunch of weird extensions and figure",
			  },
			  {
			    "duration": 5.6,
			    "offset": 1124.36,
			    "text": "out their weird ux a a unified method to",
			  },
			  {
			    "duration": 4.56,
			    "offset": 1127.52,
			    "text": "command things externally is powerful",
			  },
			  {
			    "duration": 5.36,
			    "offset": 1129.96,
			    "text": "the fact that everything they just did",
			  },
			  {
			    "duration": 6.36,
			    "offset": 1132.08,
			    "text": "worked via text prompts that come up as",
			  },
			  {
			    "duration": 5.32,
			    "offset": 1135.32,
			    "text": "like alerts in the editor is absurd and",
			  },
			  {
			    "duration": 3.56,
			    "offset": 1138.44,
			    "text": "hilar ious that this is just like five",
			  },
			  {
			    "duration": 2.88,
			    "offset": 1140.64,
			    "text": "text prompts they don&amp;#39;t even happen in",
			  },
			  {
			    "duration": 4.24,
			    "offset": 1142,
			    "text": "chat they happen separately on the top",
			  },
			  {
			    "duration": 4,
			    "offset": 1143.52,
			    "text": "of the view that&amp;#39;s like meme tier the",
			  },
			  {
			    "duration": 3.28,
			    "offset": 1146.24,
			    "text": "concept is awesome I see a lot of",
			  },
			  {
			    "duration": 4.519,
			    "offset": 1147.52,
			    "text": "potential that is the implementation",
			  },
			  {
			    "duration": 4.44,
			    "offset": 1149.52,
			    "text": "almost feels like a joke and so it is",
			  },
			  {
			    "duration": 4.081,
			    "offset": 1152.039,
			    "text": "called GitHub co-pilot custom",
			  },
			  {
			    "duration": 4.04,
			    "offset": 1153.96,
			    "text": "instructions it&amp;#39;s a file that you add",
			  },
			  {
			    "duration": 3.6,
			    "offset": 1156.12,
			    "text": "inside of your GitHub folder and it&amp;#39;s",
			  },
			  {
			    "duration": 3.76,
			    "offset": 1158,
			    "text": "just a markdown file called co-pilot",
			  },
			  {
			    "duration": 3.839,
			    "offset": 1159.72,
			    "text": "instructions and you can just say what",
			  },
			  {
			    "duration": 4.08,
			    "offset": 1161.76,
			    "text": "you want co-pilot to do and this has",
			  },
			  {
			    "duration": 4.521,
			    "offset": 1163.559,
			    "text": "been one of our most requested features",
			  },
			  {
			    "duration": 3.68,
			    "offset": 1165.84,
			    "text": "so in this particular code base we say",
			  },
			  {
			    "duration": 2.959,
			    "offset": 1168.08,
			    "text": "whenever we make a reusable react",
			  },
			  {
			    "duration": 3.36,
			    "offset": 1169.52,
			    "text": "component make sure you add the launch",
			  },
			  {
			    "duration": 3.201,
			    "offset": 1171.039,
			    "text": "Darkly service but you can put whatever",
			  },
			  {
			    "duration": 3,
			    "offset": 1172.88,
			    "text": "you want in here you could say I want",
			  },
			  {
			    "duration": 3.28,
			    "offset": 1174.24,
			    "text": "all of my functions to have certain dock",
			  },
			  {
			    "duration": 3.919,
			    "offset": 1175.88,
			    "text": "strings I wanted to follow certain",
			  },
			  {
			    "duration": 3.56,
			    "offset": 1177.52,
			    "text": "linting rules I wanted to add a comment",
			  },
			  {
			    "duration": 2.561,
			    "offset": 1179.799,
			    "text": "saying that Cassidy is the coolest",
			  },
			  {
			    "duration": 3.24,
			    "offset": 1181.08,
			    "text": "developer in the world at the bottom of",
			  },
			  {
			    "duration": 4.559,
			    "offset": 1182.36,
			    "text": "every component so your demo looks",
			  },
			  {
			    "duration": 4.4,
			    "offset": 1184.32,
			    "text": "awesome you never know but you can do",
			  },
			  {
			    "duration": 3.681,
			    "offset": 1186.919,
			    "text": "whatever you want here and that&amp;#39;s all",
			  },
			  {
			    "duration": 4.28,
			    "offset": 1188.72,
			    "text": "that&amp;#39;s happening right under the hood to",
			  },
			  {
			    "duration": 4.439,
			    "offset": 1190.6,
			    "text": "make this I will say I have not seen",
			  },
			  {
			    "duration": 4.159,
			    "offset": 1193,
			    "text": "many compelling examples using these",
			  },
			  {
			    "duration": 4.081,
			    "offset": 1195.039,
			    "text": "types of instruction prompts like as",
			  },
			  {
			    "duration": 3.4,
			    "offset": 1197.159,
			    "text": "part of your editor experience I see",
			  },
			  {
			    "duration": 3.6,
			    "offset": 1199.12,
			    "text": "them more as a patch when you&amp;#39;re",
			  },
			  {
			    "duration": 4.281,
			    "offset": 1200.559,
			    "text": "consistently seeing bad behaviors for",
			  },
			  {
			    "duration": 3.52,
			    "offset": 1202.72,
			    "text": "example if it keeps trying to rewrite",
			  },
			  {
			    "duration": 3.88,
			    "offset": 1204.84,
			    "text": "your typescript code in JavaScript or",
			  },
			  {
			    "duration": 4.96,
			    "offset": 1206.24,
			    "text": "try and insert types into your JS code a",
			  },
			  {
			    "duration": 5.079,
			    "offset": 1208.72,
			    "text": "rule that is stop using typescript",
			  },
			  {
			    "duration": 4.04,
			    "offset": 1211.2,
			    "text": "always give me Js could be useful I&amp;#39;ve",
			  },
			  {
			    "duration": 4.041,
			    "offset": 1213.799,
			    "text": "tried those things here in there to try",
			  },
			  {
			    "duration": 4.72,
			    "offset": 1215.24,
			    "text": "and get co-pilot to behave I don&amp;#39;t have",
			  },
			  {
			    "duration": 4.56,
			    "offset": 1217.84,
			    "text": "any rules set on any of my AI tools",
			  },
			  {
			    "duration": 4.52,
			    "offset": 1219.96,
			    "text": "right now on my like CLA setup in the",
			  },
			  {
			    "duration": 4.04,
			    "offset": 1222.4,
			    "text": "browser I have a workspace I think it&amp;#39;s",
			  },
			  {
			    "duration": 4.16,
			    "offset": 1224.48,
			    "text": "called where I dumped my schema for one",
			  },
			  {
			    "duration": 3.52,
			    "offset": 1226.44,
			    "text": "of my projects using drizzle so I can",
			  },
			  {
			    "duration": 3.32,
			    "offset": 1228.64,
			    "text": "ask to write queries for me and it&amp;#39;s",
			  },
			  {
			    "duration": 3.56,
			    "offset": 1229.96,
			    "text": "slightly more accurate like that part&amp;#39;s",
			  },
			  {
			    "duration": 2.88,
			    "offset": 1231.96,
			    "text": "cool but the fact that you have to care",
			  },
			  {
			    "duration": 2.639,
			    "offset": 1233.52,
			    "text": "about these things and write this type",
			  },
			  {
			    "duration": 3.04,
			    "offset": 1234.84,
			    "text": "of and now you have multiple",
			  },
			  {
			    "duration": 3.561,
			    "offset": 1236.159,
			    "text": "sources of Truth for how the AI is going",
			  },
			  {
			    "duration": 3.72,
			    "offset": 1237.88,
			    "text": "to behave between the actual code and",
			  },
			  {
			    "duration": 3.92,
			    "offset": 1239.72,
			    "text": "your instructions that&amp;#39;s terrifying to",
			  },
			  {
			    "duration": 3.72,
			    "offset": 1241.6,
			    "text": "me I don&amp;#39;t dig this at all do they have",
			  },
			  {
			    "duration": 4.399,
			    "offset": 1243.64,
			    "text": "anything else to show with extensions no",
			  },
			  {
			    "duration": 5.04,
			    "offset": 1245.32,
			    "text": "that&amp;#39;s it weird here&amp;#39;s an actually cool",
			  },
			  {
			    "duration": 4.281,
			    "offset": 1248.039,
			    "text": "One xcode support because Apple will",
			  },
			  {
			    "duration": 4.12,
			    "offset": 1250.36,
			    "text": "never figure this out themselves xcode",
			  },
			  {
			    "duration": 4.4,
			    "offset": 1252.32,
			    "text": "is not improved meaningfully in over a",
			  },
			  {
			    "duration": 6.559,
			    "offset": 1254.48,
			    "text": "decade at this point Apple developers",
			  },
			  {
			    "duration": 4.319,
			    "offset": 1256.72,
			    "text": "GitHub cop is it available in code",
			  },
			  {
			    "duration": 4.32,
			    "offset": 1264.44,
			    "text": "today mountains had to move for that to",
			  },
			  {
			    "duration": 3.52,
			    "offset": 1267.159,
			    "text": "happen talk to a few people what it",
			  },
			  {
			    "duration": 4.76,
			    "offset": 1268.76,
			    "text": "would take to get xcode to a better",
			  },
			  {
			    "duration": 5.6,
			    "offset": 1270.679,
			    "text": "place both internally and externally",
			  },
			  {
			    "duration": 4.32,
			    "offset": 1273.52,
			    "text": "this is a good sign on the Apple side",
			  },
			  {
			    "duration": 3.76,
			    "offset": 1276.279,
			    "text": "that they&amp;#39;re more willing to embrace",
			  },
			  {
			    "duration": 4.12,
			    "offset": 1277.84,
			    "text": "things that developers like inside of",
			  },
			  {
			    "duration": 3.801,
			    "offset": 1280.039,
			    "text": "xcode instead of just continuing to",
			  },
			  {
			    "duration": 6.079,
			    "offset": 1281.96,
			    "text": "reinvent everything with no value being",
			  },
			  {
			    "duration": 5.56,
			    "offset": 1283.84,
			    "text": "added cool weird but cool GitHub models",
			  },
			  {
			    "duration": 3.721,
			    "offset": 1288.039,
			    "text": "oh God",
			  },
			  {
			    "duration": 6.48,
			    "offset": 1289.4,
			    "text": "oh they made a way to choose different",
			  },
			  {
			    "duration": 6.039,
			    "offset": 1291.76,
			    "text": "models and host them through GitHub cool",
			  },
			  {
			    "duration": 3.6,
			    "offset": 1295.88,
			    "text": "oh God co-pilot workspaces I don&amp;#39;t want",
			  },
			  {
			    "duration": 3.561,
			    "offset": 1297.799,
			    "text": "to get nerd sniped by this but I already",
			  },
			  {
			    "duration": 4.4,
			    "offset": 1299.48,
			    "text": "have a video I&amp;#39;ve never been more",
			  },
			  {
			    "duration": 4.16,
			    "offset": 1301.36,
			    "text": "embarrassed on someone else&amp;#39;s behalf as",
			  },
			  {
			    "duration": 3.72,
			    "offset": 1303.88,
			    "text": "I was trying to look through the",
			  },
			  {
			    "duration": 3.279,
			    "offset": 1305.52,
			    "text": "co-pilot workspaces stuff the one",
			  },
			  {
			    "duration": 5.559,
			    "offset": 1307.6,
			    "text": "example they used for all of their",
			  },
			  {
			    "duration": 6.681,
			    "offset": 1308.799,
			    "text": "marketing the code was wrong and the AI",
			  },
			  {
			    "duration": 4.241,
			    "offset": 1313.159,
			    "text": "quick context on copilot workspaces it&amp;#39;s",
			  },
			  {
			    "duration": 4.48,
			    "offset": 1315.48,
			    "text": "a a bot that will look at your GitHub",
			  },
			  {
			    "duration": 4.48,
			    "offset": 1317.4,
			    "text": "issues and automatically file PRS based",
			  },
			  {
			    "duration": 3.44,
			    "offset": 1319.96,
			    "text": "on the issue as you described it which",
			  },
			  {
			    "duration": 3.56,
			    "offset": 1321.88,
			    "text": "did a great job at because it took an",
			  },
			  {
			    "duration": 5.12,
			    "offset": 1323.4,
			    "text": "issue which was add a URL validator to",
			  },
			  {
			    "duration": 5.32,
			    "offset": 1325.44,
			    "text": "validate GitHub URLs it did it wrong and",
			  },
			  {
			    "duration": 3.759,
			    "offset": 1328.52,
			    "text": "it added a new license file to the repo",
			  },
			  {
			    "duration": 3.56,
			    "offset": 1330.76,
			    "text": "and it added a contributing MD to the",
			  },
			  {
			    "duration": 3.801,
			    "offset": 1332.279,
			    "text": "repo none of those things are fixing the",
			  },
			  {
			    "duration": 2.88,
			    "offset": 1334.32,
			    "text": "problem that was in the issue but all of",
			  },
			  {
			    "duration": 2.88,
			    "offset": 1336.08,
			    "text": "them were things the bot thought would",
			  },
			  {
			    "duration": 3.839,
			    "offset": 1337.2,
			    "text": "be a good idea to sneck into that PR and",
			  },
			  {
			    "duration": 3.92,
			    "offset": 1338.96,
			    "text": "they used the screenshots of that PR",
			  },
			  {
			    "duration": 4.12,
			    "offset": 1341.039,
			    "text": "intentionally cropped for all their",
			  },
			  {
			    "duration": 4.039,
			    "offset": 1342.88,
			    "text": " marketing someone found the pr",
			  },
			  {
			    "duration": 3.481,
			    "offset": 1345.159,
			    "text": "and showed how bad it was and I got to",
			  },
			  {
			    "duration": 3,
			    "offset": 1346.919,
			    "text": "cover that in my video so check that out",
			  },
			  {
			    "duration": 3.039,
			    "offset": 1348.64,
			    "text": "if you haven&amp;#39;t if you want to see just",
			  },
			  {
			    "duration": 3.24,
			    "offset": 1349.919,
			    "text": "how little faith I have in co-pilot",
			  },
			  {
			    "duration": 4.801,
			    "offset": 1351.679,
			    "text": "workspace I&amp;#39;m just going to skip this",
			  },
			  {
			    "duration": 4.681,
			    "offset": 1353.159,
			    "text": "part oh is the rest a demo of it God",
			  },
			  {
			    "duration": 3.76,
			    "offset": 1356.48,
			    "text": "okay what the is spark one more",
			  },
			  {
			    "duration": 4.52,
			    "offset": 1357.84,
			    "text": "advancement to show you an advancement",
			  },
			  {
			    "duration": 5.36,
			    "offset": 1360.24,
			    "text": "that fundamentally blur the line between",
			  },
			  {
			    "duration": 6.84,
			    "offset": 1362.36,
			    "text": "a developer and the everyday person",
			  },
			  {
			    "duration": 3.6,
			    "offset": 1365.6,
			    "text": "introducing GitHub",
			  },
			  {
			    "duration": 6.12,
			    "offset": 1370.6,
			    "text": "spark the Applause is as unsure as I am",
			  },
			  {
			    "duration": 4.52,
			    "offset": 1374.72,
			    "text": "the AI native tool to build apps in",
			  },
			  {
			    "duration": 5.439,
			    "offset": 1376.72,
			    "text": "natural language can we stop saying AI",
			  },
			  {
			    "duration": 7.439,
			    "offset": 1379.24,
			    "text": "native can that term just die can we",
			  },
			  {
			    "duration": 9.841,
			    "offset": 1382.159,
			    "text": "agree as a community stop using the term",
			  },
			  {
			    "duration": 9.561,
			    "offset": 1386.679,
			    "text": "AI native it&amp;#39;s borderline web 3 and how",
			  },
			  {
			    "duration": 4.24,
			    "offset": 1392,
			    "text": "meaningless and grifty it",
			  },
			  {
			    "duration": 6.56,
			    "offset": 1397.76,
			    "text": "is get up spark is an AI native tool to",
			  },
			  {
			    "duration": 6.239,
			    "offset": 1401.32,
			    "text": "build applications entirely in natural",
			  },
			  {
			    "duration": 4.839,
			    "offset": 1404.32,
			    "text": "language now any person no matter their",
			  },
			  {
			    "duration": 4.761,
			    "offset": 1407.559,
			    "text": "experience can create create and share",
			  },
			  {
			    "duration": 6.201,
			    "offset": 1409.159,
			    "text": "an application in a matter of minutes",
			  },
			  {
			    "duration": 5.239,
			    "offset": 1412.32,
			    "text": "why don&amp;#39;t we do another life demo it&amp;#39;s",
			  },
			  {
			    "duration": 4.24,
			    "offset": 1415.36,
			    "text": "not an IDE in the classic sense I don&amp;#39;t",
			  },
			  {
			    "duration": 4.921,
			    "offset": 1417.559,
			    "text": "have to install python first or or",
			  },
			  {
			    "duration": 5.84,
			    "offset": 1419.6,
			    "text": "figure out how sudo works with hu I that",
			  },
			  {
			    "duration": 5.36,
			    "offset": 1422.48,
			    "text": "looks familiar that looks familiar point",
			  },
			  {
			    "duration": 5.119,
			    "offset": 1425.44,
			    "text": "being there&amp;#39;s been a handful of these",
			  },
			  {
			    "duration": 6.719,
			    "offset": 1427.84,
			    "text": "now hell I&amp;#39;ve invested in one that looks",
			  },
			  {
			    "duration": 6.041,
			    "offset": 1430.559,
			    "text": "familiar it&amp;#39;s kind of insane that GitHub",
			  },
			  {
			    "duration": 4.441,
			    "offset": 1434.559,
			    "text": "is just making a almost certainly going",
			  },
			  {
			    "duration": 4.319,
			    "offset": 1436.6,
			    "text": "to be worse version of the the exact",
			  },
			  {
			    "duration": 4.12,
			    "offset": 1439,
			    "text": "same thing and also once again they&amp;#39;re",
			  },
			  {
			    "duration": 4.76,
			    "offset": 1440.919,
			    "text": "defaulting to Sonet because the other",
			  },
			  {
			    "duration": 4.4,
			    "offset": 1443.12,
			    "text": "models aren&amp;#39;t good at this I se input",
			  },
			  {
			    "duration": 3.761,
			    "offset": 1445.679,
			    "text": "field of what I&amp;#39;m going to create I of",
			  },
			  {
			    "duration": 3.68,
			    "offset": 1447.52,
			    "text": "course have our new model picker here",
			  },
			  {
			    "duration": 3.32,
			    "offset": 1449.44,
			    "text": "with different models and I have all my",
			  },
			  {
			    "duration": 3.64,
			    "offset": 1451.2,
			    "text": "recent Sparks you can kind of get an",
			  },
			  {
			    "duration": 3.76,
			    "offset": 1452.76,
			    "text": "idea what you can do with Spark by just",
			  },
			  {
			    "duration": 4.64,
			    "offset": 1454.84,
			    "text": "reading you know through the list a",
			  },
			  {
			    "duration": 4.92,
			    "offset": 1456.52,
			    "text": "podcast Timer app a karoke night planner",
			  },
			  {
			    "duration": 4.439,
			    "offset": 1459.48,
			    "text": "vehicle World game and you know speaking",
			  },
			  {
			    "duration": 3.88,
			    "offset": 1461.44,
			    "text": "of games I always love to build little",
			  },
			  {
			    "duration": 3.721,
			    "offset": 1463.919,
			    "text": "games when I have time to play with",
			  },
			  {
			    "duration": 3.56,
			    "offset": 1465.32,
			    "text": "large language models so let&amp;#39;s do a tic",
			  },
			  {
			    "duration": 4.56,
			    "offset": 1467.64,
			    "text": "tac toe game",
			  },
			  {
			    "duration": 5.44,
			    "offset": 1468.88,
			    "text": "with a hippo and a D Duck or a duck my",
			  },
			  {
			    "duration": 4.16,
			    "offset": 1472.2,
			    "text": "eyes glazed over can we actually see",
			  },
			  {
			    "duration": 4.2,
			    "offset": 1474.32,
			    "text": "this and you have to figure out which",
			  },
			  {
			    "duration": 4.28,
			    "offset": 1476.36,
			    "text": "code goes into which file you know have",
			  },
			  {
			    "duration": 4.159,
			    "offset": 1478.52,
			    "text": "to copy and paste stuff you have to try",
			  },
			  {
			    "duration": 3.759,
			    "offset": 1480.64,
			    "text": "to figure I I&amp;#39;m already seeing something",
			  },
			  {
			    "duration": 4.761,
			    "offset": 1482.679,
			    "text": "I detest let me get out of phot screen",
			  },
			  {
			    "duration": 6.681,
			    "offset": 1484.399,
			    "text": "so I can zoom in on that iterate theme",
			  },
			  {
			    "duration": 5.4,
			    "offset": 1487.44,
			    "text": "settings data menu what the is that",
			  },
			  {
			    "duration": 3.76,
			    "offset": 1491.08,
			    "text": "bottom nav do you know what this reminds",
			  },
			  {
			    "duration": 4.959,
			    "offset": 1492.84,
			    "text": "me of the worst ux I&amp;#39;ve ever seen in a",
			  },
			  {
			    "duration": 4,
			    "offset": 1494.84,
			    "text": "product D Vinci resolve always has these",
			  },
			  {
			    "duration": 3.441,
			    "offset": 1497.799,
			    "text": "giant",
			  },
			  {
			    "duration": 4.199,
			    "offset": 1498.84,
			    "text": "icons in this tab bar at the bottom no",
			  },
			  {
			    "duration": 4.039,
			    "offset": 1501.24,
			    "text": "matter what you do this is taking up a",
			  },
			  {
			    "duration": 3.76,
			    "offset": 1503.039,
			    "text": "bunch of your vertical real estate like",
			  },
			  {
			    "duration": 2.681,
			    "offset": 1505.279,
			    "text": "these should even be different tabs just",
			  },
			  {
			    "duration": 4.041,
			    "offset": 1506.799,
			    "text": "be part of the editor it&amp;#39;s",
			  },
			  {
			    "duration": 4.28,
			    "offset": 1507.96,
			    "text": "insane and now you have sure you don&amp;#39;t",
			  },
			  {
			    "duration": 2.6,
			    "offset": 1510.84,
			    "text": "have to worry about code it&amp;#39;s not an",
			  },
			  {
			    "duration": 3.319,
			    "offset": 1512.24,
			    "text": "editor but instead you have to worry",
			  },
			  {
			    "duration": 3,
			    "offset": 1513.44,
			    "text": "about iteration themes settings and data",
			  },
			  {
			    "duration": 2.521,
			    "offset": 1515.559,
			    "text": "and for some reason they&amp;#39;re all",
			  },
			  {
			    "duration": 4,
			    "offset": 1516.44,
			    "text": "different things out how to",
			  },
			  {
			    "duration": 4.36,
			    "offset": 1518.08,
			    "text": "terminal run the thing on the terminal",
			  },
			  {
			    "duration": 4.56,
			    "offset": 1520.44,
			    "text": "here it just does it all for us",
			  },
			  {
			    "duration": 4.04,
			    "offset": 1522.44,
			    "text": "streaming in digital as you as you can",
			  },
			  {
			    "duration": 3.72,
			    "offset": 1525,
			    "text": "see on the screen and at the bottom you",
			  },
			  {
			    "duration": 5.679,
			    "offset": 1526.48,
			    "text": "already see I feel like I&amp;#39;m having an",
			  },
			  {
			    "duration": 7.04,
			    "offset": 1528.72,
			    "text": "aneurysm cool Tic Tac Toe works just to",
			  },
			  {
			    "duration": 7.12,
			    "offset": 1532.159,
			    "text": "emphasize how dumb this is build me a",
			  },
			  {
			    "duration": 7.08,
			    "offset": 1535.76,
			    "text": "tick tac toe game in",
			  },
			  {
			    "duration": 5.921,
			    "offset": 1539.279,
			    "text": "react oh no I could see code this is",
			  },
			  {
			    "duration": 5.959,
			    "offset": 1542.84,
			    "text": "unusable who the are they targeting",
			  },
			  {
			    "duration": 6.52,
			    "offset": 1545.2,
			    "text": "with this and in just a moment&amp;#39;s time we",
			  },
			  {
			    "duration": 5.721,
			    "offset": 1548.799,
			    "text": "now have a fully functioning game of tic",
			  },
			  {
			    "duration": 6.079,
			    "offset": 1551.72,
			    "text": "tac toe what&amp;#39;s going on oh no it loaded",
			  },
			  {
			    "duration": 3.279,
			    "offset": 1554.52,
			    "text": "that&amp;#39;s hilarious",
			  },
			  {
			    "duration": 5.32,
			    "offset": 1559.2,
			    "text": "okay that&amp;#39;s even funnier notice",
			  },
			  {
			    "duration": 5.441,
			    "offset": 1561.679,
			    "text": "something wrong with the layout I do",
			  },
			  {
			    "duration": 3.48,
			    "offset": 1564.52,
			    "text": "have to screenshot that that&amp;#39;s the one",
			  },
			  {
			    "duration": 2.279,
			    "offset": 1567.12,
			    "text": "annoying thing when you have these",
			  },
			  {
			    "duration": 4.159,
			    "offset": 1568,
			    "text": "browser environments is you the Hut Keys",
			  },
			  {
			    "duration": 4.601,
			    "offset": 1569.399,
			    "text": "you&amp;#39;re used to affect the browser not",
			  },
			  {
			    "duration": 6,
			    "offset": 1572.159,
			    "text": "the thing you&amp;#39;re in let&amp;#39;s see if I got",
			  },
			  {
			    "duration": 7.24,
			    "offset": 1574,
			    "text": "to write this time no make the grid",
			  },
			  {
			    "duration": 5.481,
			    "offset": 1578.159,
			    "text": "3x3 you know what I I love bolt it&amp;#39;s",
			  },
			  {
			    "duration": 8.72,
			    "offset": 1581.24,
			    "text": "usually much better at these things make",
			  },
			  {
			    "duration": 10.639,
			    "offset": 1583.64,
			    "text": "me a game of tic tac toe in react",
			  },
			  {
			    "duration": 8.24,
			    "offset": 1589.96,
			    "text": "cool now we have theoretically a working",
			  },
			  {
			    "duration": 6.081,
			    "offset": 1594.279,
			    "text": "game of tic taac toe cool dope how did",
			  },
			  {
			    "duration": 6,
			    "offset": 1598.2,
			    "text": "bolt do",
			  },
			  {
			    "duration": 7.559,
			    "offset": 1600.36,
			    "text": "bolt supposed to be the good",
			  },
			  {
			    "duration": 5.479,
			    "offset": 1604.2,
			    "text": "one rip I will say both has one awesome",
			  },
			  {
			    "duration": 4.64,
			    "offset": 1607.919,
			    "text": "benefit which once this loads I&amp;#39;ll show",
			  },
			  {
			    "duration": 4.801,
			    "offset": 1609.679,
			    "text": "you guys cool so even though I couldn&amp;#39;t",
			  },
			  {
			    "duration": 3.961,
			    "offset": 1612.559,
			    "text": "get it to fix this there are two cool",
			  },
			  {
			    "duration": 4.52,
			    "offset": 1614.48,
			    "text": "things you can do here the first is you",
			  },
			  {
			    "duration": 4,
			    "offset": 1616.52,
			    "text": "can edit the code yourself",
			  },
			  {
			    "duration": 5.12,
			    "offset": 1619,
			    "text": "which is really nice so if I wanted to",
			  },
			  {
			    "duration": 5.72,
			    "offset": 1620.52,
			    "text": "go fix the layout here I could so we",
			  },
			  {
			    "duration": 4.039,
			    "offset": 1624.12,
			    "text": "have the board component I can go find",
			  },
			  {
			    "duration": 2.84,
			    "offset": 1626.24,
			    "text": "the code for IT board is in SL",
			  },
			  {
			    "duration": 4.921,
			    "offset": 1628.159,
			    "text": "components",
			  },
			  {
			    "duration": 5.8,
			    "offset": 1629.08,
			    "text": "slbo so in here we can make sure this is",
			  },
			  {
			    "duration": 4.079,
			    "offset": 1633.08,
			    "text": "correct I&amp;#39;m not going to bother with a",
			  },
			  {
			    "duration": 5.48,
			    "offset": 1634.88,
			    "text": "grid instead we&amp;#39;re going to do Flex Flex",
			  },
			  {
			    "duration": 4.081,
			    "offset": 1637.159,
			    "text": "call and now I did that and saved it",
			  },
			  {
			    "duration": 3.319,
			    "offset": 1640.36,
			    "text": "it&amp;#39;s",
			  },
			  {
			    "duration": 3.84,
			    "offset": 1641.24,
			    "text": "fixed and I can even add a gap in both",
			  },
			  {
			    "duration": 4.161,
			    "offset": 1643.679,
			    "text": "of these we&amp;#39;ll do Gap three is what I&amp;#39;m",
			  },
			  {
			    "duration": 4.719,
			    "offset": 1645.08,
			    "text": "using below and look at that it&amp;#39;s fixed",
			  },
			  {
			    "duration": 4.12,
			    "offset": 1647.84,
			    "text": "dope it&amp;#39;s really easy to do that what&amp;#39;s",
			  },
			  {
			    "duration": 4.161,
			    "offset": 1649.799,
			    "text": "even easier is deploying I could say",
			  },
			  {
			    "duration": 3.079,
			    "offset": 1651.96,
			    "text": "deploy this and it will and I could even",
			  },
			  {
			    "duration": 2.599,
			    "offset": 1653.96,
			    "text": "click the little deploy button that my",
			  },
			  {
			    "duration": 3.64,
			    "offset": 1655.039,
			    "text": "face is covering in the corner if I do",
			  },
			  {
			    "duration": 4.281,
			    "offset": 1656.559,
			    "text": "that there you go and now we&amp;#39;re Auto",
			  },
			  {
			    "duration": 3.6,
			    "offset": 1658.679,
			    "text": "deploying to netlify I do actually",
			  },
			  {
			    "duration": 2.64,
			    "offset": 1660.84,
			    "text": "unironically think this is pretty cool",
			  },
			  {
			    "duration": 3.361,
			    "offset": 1662.279,
			    "text": "especially for people who aren&amp;#39;t coders",
			  },
			  {
			    "duration": 3.559,
			    "offset": 1663.48,
			    "text": "to be able to deploy a thing and see it",
			  },
			  {
			    "duration": 3.96,
			    "offset": 1665.64,
			    "text": "actually working in production that",
			  },
			  {
			    "duration": 4.281,
			    "offset": 1667.039,
			    "text": "easily is dope and you could even claim",
			  },
			  {
			    "duration": 3.36,
			    "offset": 1669.6,
			    "text": "it for your netlify project so if",
			  },
			  {
			    "duration": 4.719,
			    "offset": 1671.32,
			    "text": "somebody gets this URL before me cool",
			  },
			  {
			    "duration": 4.76,
			    "offset": 1672.96,
			    "text": "you can have my Tic Tac Toe app go nuts",
			  },
			  {
			    "duration": 4.601,
			    "offset": 1676.039,
			    "text": "yeah there&amp;#39;s a lot of options for this",
			  },
			  {
			    "duration": 4.48,
			    "offset": 1677.72,
			    "text": "and all them mostly work I don&amp;#39;t care",
			  },
			  {
			    "duration": 5.159,
			    "offset": 1680.64,
			    "text": "about GitHub making their own worse",
			  },
			  {
			    "duration": 5.04,
			    "offset": 1682.2,
			    "text": "version spark apparently goes further as",
			  },
			  {
			    "duration": 3.201,
			    "offset": 1685.799,
			    "text": "devs we love to customize our",
			  },
			  {
			    "duration": 3.559,
			    "offset": 1687.24,
			    "text": "environments and to build tools that fit",
			  },
			  {
			    "duration": 3.64,
			    "offset": 1689,
			    "text": "our unique preferences and workflows",
			  },
			  {
			    "duration": 3.681,
			    "offset": 1690.799,
			    "text": "what are you speak for yourself I&amp;#39;m",
			  },
			  {
			    "duration": 3.24,
			    "offset": 1692.64,
			    "text": "joking obviously we&amp;#39;re into that we do",
			  },
			  {
			    "duration": 2.88,
			    "offset": 1694.48,
			    "text": "this not just because it improves",
			  },
			  {
			    "duration": 2.6,
			    "offset": 1695.88,
			    "text": "productivity and ergonomics but also",
			  },
			  {
			    "duration": 3.08,
			    "offset": 1697.36,
			    "text": "because it makes their daily routine",
			  },
			  {
			    "duration": 4.319,
			    "offset": 1698.48,
			    "text": "feel more personal and when things feel",
			  },
			  {
			    "duration": 4.079,
			    "offset": 1700.44,
			    "text": "personal they&amp;#39;re typically more fun",
			  },
			  {
			    "duration": 3.081,
			    "offset": 1702.799,
			    "text": "however while we may invest in things",
			  },
			  {
			    "duration": 2.88,
			    "offset": 1704.519,
			    "text": "like managing dot files writing",
			  },
			  {
			    "duration": 3.279,
			    "offset": 1705.88,
			    "text": "automation scripts or configuring editor",
			  },
			  {
			    "duration": 3.28,
			    "offset": 1707.399,
			    "text": "settings how often often do we pass up",
			  },
			  {
			    "duration": 2.721,
			    "offset": 1709.159,
			    "text": "ideas for making our own apps not",
			  },
			  {
			    "duration": 2.24,
			    "offset": 1710.679,
			    "text": "necessarily because we couldn&amp;#39;t build",
			  },
			  {
			    "duration": 2.76,
			    "offset": 1711.88,
			    "text": "them but because they seem too",
			  },
			  {
			    "duration": 3.921,
			    "offset": 1712.919,
			    "text": "shortlived Niche or timeconsuming to",
			  },
			  {
			    "duration": 4.48,
			    "offset": 1714.64,
			    "text": "prioritize the thing blocking me isn&amp;#39;t",
			  },
			  {
			    "duration": 3.8,
			    "offset": 1716.84,
			    "text": "that they&amp;#39;re too shortlived or timec",
			  },
			  {
			    "duration": 3.32,
			    "offset": 1719.12,
			    "text": "consuming to prioritize it&amp;#39;s that stripe",
			  },
			  {
			    "duration": 3.039,
			    "offset": 1720.64,
			    "text": "setup sucks as soon as strip&amp;#39;s easier to",
			  },
			  {
			    "duration": 2.68,
			    "offset": 1722.44,
			    "text": "set up I&amp;#39;m going to be putting out like",
			  },
			  {
			    "duration": 3.081,
			    "offset": 1723.679,
			    "text": "three times more apps and even then I&amp;#39;m",
			  },
			  {
			    "duration": 3.6,
			    "offset": 1725.12,
			    "text": "still putting out a ton and I also have",
			  },
			  {
			    "duration": 3,
			    "offset": 1726.76,
			    "text": "a YouTube channel and I run a company",
			  },
			  {
			    "duration": 3.079,
			    "offset": 1728.72,
			    "text": "and I do a bunch of investing in",
			  },
			  {
			    "duration": 3.56,
			    "offset": 1729.76,
			    "text": "advisory it&amp;#39;s not that hard I I think",
			  },
			  {
			    "duration": 2.88,
			    "offset": 1731.799,
			    "text": "we&amp;#39;re kidding ourselves saying and I see",
			  },
			  {
			    "duration": 3.28,
			    "offset": 1733.32,
			    "text": "this all the time this I need a good",
			  },
			  {
			    "duration": 3.84,
			    "offset": 1734.679,
			    "text": "term for this fallacy they like the",
			  },
			  {
			    "duration": 4.04,
			    "offset": 1736.6,
			    "text": "tools are the problem fallacy is how I",
			  },
			  {
			    "duration": 4.4,
			    "offset": 1738.519,
			    "text": "see it it&amp;#39;s if only the tools were",
			  },
			  {
			    "duration": 4.919,
			    "offset": 1740.64,
			    "text": "better then we would have so many more",
			  },
			  {
			    "duration": 4.281,
			    "offset": 1742.919,
			    "text": "things if only it was easier to record a",
			  },
			  {
			    "duration": 3.401,
			    "offset": 1745.559,
			    "text": "YouTube video we&amp;#39;d have so many more",
			  },
			  {
			    "duration": 4,
			    "offset": 1747.2,
			    "text": "YouTubers if only it was easier to use",
			  },
			  {
			    "duration": 4.24,
			    "offset": 1748.96,
			    "text": "OBS we&amp;#39;d have so many more streamers if",
			  },
			  {
			    "duration": 4.56,
			    "offset": 1751.2,
			    "text": "only edit if only the IDE was simpler",
			  },
			  {
			    "duration": 4.8,
			    "offset": 1753.2,
			    "text": "we&amp;#39;d have so many more developers no",
			  },
			  {
			    "duration": 4.519,
			    "offset": 1755.76,
			    "text": "it&amp;#39;s not how this Works doing it is",
			  },
			  {
			    "duration": 5.679,
			    "offset": 1758,
			    "text": "hard making the entry point marginally",
			  },
			  {
			    "duration": 6.161,
			    "offset": 1760.279,
			    "text": "easier does nothing but delay when that",
			  },
			  {
			    "duration": 4.84,
			    "offset": 1763.679,
			    "text": "huge cliff occurs it is jumping off a",
			  },
			  {
			    "duration": 4.44,
			    "offset": 1766.44,
			    "text": "cliff to learn how to code if the AI",
			  },
			  {
			    "duration": 4.961,
			    "offset": 1768.519,
			    "text": "tools let you do something before you",
			  },
			  {
			    "duration": 4.32,
			    "offset": 1770.88,
			    "text": "get to that Cliff cool you still got to",
			  },
			  {
			    "duration": 3.919,
			    "offset": 1773.48,
			    "text": "jump up the cliff when you get",
			  },
			  {
			    "duration": 3.56,
			    "offset": 1775.2,
			    "text": "there that&amp;#39;s just reality and pretending",
			  },
			  {
			    "duration": 2.76,
			    "offset": 1777.399,
			    "text": "that fixing all the tools is going to",
			  },
			  {
			    "duration": 3.56,
			    "offset": 1778.76,
			    "text": "make the cliff go away is delusional",
			  },
			  {
			    "duration": 5.281,
			    "offset": 1780.159,
			    "text": "it&amp;#39;s just shifting where it happens I",
			  },
			  {
			    "duration": 4.599,
			    "offset": 1782.32,
			    "text": "can&amp;#39;t pretend to care anymore I am sorry",
			  },
			  {
			    "duration": 3.32,
			    "offset": 1785.44,
			    "text": "for dragging all of you guys through",
			  },
			  {
			    "duration": 4.561,
			    "offset": 1786.919,
			    "text": "this I am",
			  },
			  {
			    "duration": 5.639,
			    "offset": 1788.76,
			    "text": "done thank you co-pilot for making me",
			  },
			  {
			    "duration": 5.72,
			    "offset": 1791.48,
			    "text": "content at least I I don&amp;#39;t see a future",
			  },
			  {
			    "duration": 4.321,
			    "offset": 1794.399,
			    "text": "where they succeed meaningfully I cannot",
			  },
			  {
			    "duration": 4,
			    "offset": 1797.2,
			    "text": "believe the state of things things here",
			  },
			  {
			    "duration": 4.199,
			    "offset": 1798.72,
			    "text": "I I had higher hopes and I missed the",
			  },
			  {
			    "duration": 3.839,
			    "offset": 1801.2,
			    "text": "era where GitHub was Innovative I feel",
			  },
			  {
			    "duration": 4.401,
			    "offset": 1802.919,
			    "text": "like The Innovation at GitHub quit or",
			  },
			  {
			    "duration": 3.801,
			    "offset": 1805.039,
			    "text": "retired long ago and now all of the",
			  },
			  {
			    "duration": 3.12,
			    "offset": 1807.32,
			    "text": "Innovation happens externally so the",
			  },
			  {
			    "duration": 3.92,
			    "offset": 1808.84,
			    "text": "GitHub can copy",
			  },
			  {
			    "duration": 4.119,
			    "offset": 1810.44,
			    "text": "it we&amp;#39;ll see where we end up next year",
			  },
			  {
			    "duration": 7.6,
			    "offset": 1812.76,
			    "text": "and how much AI native I have",
			  },
			  {
			    "duration": 5.801,
			    "offset": 1814.559,
			    "text": "to talk about and until then peace nerds",
			  },
			]
		`)
	})
})
