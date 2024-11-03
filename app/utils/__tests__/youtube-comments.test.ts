import fsp from 'node:fs/promises'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { describe, expect, it } from 'vitest'
import {
	findContinuation,
	getTitle,
	getYoutubeComments,
} from '../youtube-comments'

describe('youtube-comment', () => {
	it.skip('should return html', async () => {
		const agent = new HttpsProxyAgent('http://127.0.0.1:7890')

		const html = await getYoutubeComments({
			videoId: 'dQw4w9WgXcQ',
			agent,
		})

		expect(html).toMatchInlineSnapshot(`
        [
          {
            "author": "@RickAstleyYT",
            "content": "1 BILLION views for Never Gonna Give You Up!  Amazing, crazy, wonderful! Rick ♥️",
          },
          {
            "author": "@comfyghost",
            "content": "I looked up this video forgot that I did, clicked the tab and got rick rolled by my past self",
          },
          {
            "author": "@BonnieBuggie",
            "content": "I can’t believe this showed up in my recommended 

        youtube itself rickrolled me",
          },
          {
            "author": "@Footy_710",
            "content": "Who came here bc someone said this vid got taken down?

        Edit: Damn I didn’t expect this many people to reply😭",
          },
          {
            "author": "@RagaThrone",
            "content": "We got rickrolled so many times that we don't even care anymore",
          },
          {
            "author": "@amogu_",
            "content": "It's April 1st, we're all here again",
          },
          {
            "author": "@endermage77",
            "content": "When is this gonna hit a billion views already
        Edit: Huzzah, it is here",
          },
          {
            "author": "@peasant-kun7656",
            "content": ""You know the rules and so do I
        "

        PROCEEDS TO RICKROLL EVERONE TO REACH 2 BILLION VIEWS",
          },
          {
            "author": "@kaitlynszwonek",
            "content": "I personaly actually really like this song.",
          },
          {
            "author": "@woolis697",
            "content": "I feel like this is the only comments section that is always active",
          },
          {
            "author": "@randomnobodyrides",
            "content": "Who all came here after watching the reel saying that this song was taken down from YouTube 💀",
          },
          {
            "author": "@markulyssestabasan3064",
            "content": "Everybody: Dosen't rick roll me
        Me: Fine, I'll do it myself.",
          },
          {
            "author": "@ultimateracer_",
            "content": "This song will never die",
          },
          {
            "author": "@triturtle",
            "content": "Kings and Queens, today we celebrate a great achievement in internet history.",
          },
          {
            "author": "@gabrielaparanhos213",
            "content": "I'm just rickrolling myself on april fools because i have no friends to do it for me",
          },
          {
            "author": "@TheLoneHarambe",
            "content": "YOU ARE APPROACHING THE CENTER OF THE INTERNET!!!!",
          },
          {
            "author": "@-Lucake-",
            "content": "Never gonna give you up: *Changes thumbnail*

        Everyone: "Wait, that's illegal!"",
          },
          {
            "author": "@starrythestar",
            "content": "Other people when they get rolled: Pissed as fuck

        Me: laughs or smiles",
          },
          {
            "author": "@alex-fs9yt",
            "content": "Okay but I always thought he looks like he could be 17 but sounds 45",
          },
          {
            "author": "@bhavishyzzz",
            "content": "Dont let this meme say goodbye, not give 
        Up,not let it down",
          },
        ]
      `)
	})

	it.skip('find token', async () => {
		const html = await fsp.readFile('./dQw4w9WgXcQ.html', 'utf-8')
		const token = findContinuation(html)
		expect(token).toMatchInlineSnapshot('')
	})

	it.skip('get title', async () => {
		const html = await fsp.readFile('./out/mmE-C-OzRXQ/original.html', 'utf-8')
		const title = getTitle(html)
		expect(title).toMatchInlineSnapshot(
			`"China test-fires intercontinental ballistic missile into Pacific Ocean"`,
		)
	})
})
