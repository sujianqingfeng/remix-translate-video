import { ProxyAgent } from 'undici'
import { describe, expect, test } from 'vitest'
import { createProxyYoutubeInnertube } from '../common'

describe('comment', () => {
	test.skip(
		'fetch comments',
		async () => {
			const proxyAgent = new ProxyAgent({
				uri: 'http://127.0.0.1:7890',
			})
			const innertube = await createProxyYoutubeInnertube(proxyAgent)

			const info = await innertube.getBasicInfo('Q6jJjCOJEzE')

			expect(info).toMatchInlineSnapshot(`
				VideoInfo {
				  "annotations": [
				    PlayerAnnotationsExpanded {
				      "allow_swipe_dismiss": true,
				      "annotation_id": "5f61e2c1-0000-2cbe-a607-089e082f3844",
				      "featured_channel": {
				        "channel_name": "DW Planet A",
				        "end_time_ms": "758000",
				        "endpoint": NavigationEndpoint {
				          "metadata": {
				            "api_url": "browse",
				            "page_type": "WEB_PAGE_TYPE_CHANNEL",
				            "url": "/channel/UCb72Gn5LXaLEcsOuPKGfQOg",
				          },
				          "payload": {
				            "browseId": "UCb72Gn5LXaLEcsOuPKGfQOg",
				          },
				          "type": "NavigationEndpoint",
				        },
				        "start_time_ms": "0",
				        "subscribe_button": SubscribeButton {
				          "channel_id": "UCb72Gn5LXaLEcsOuPKGfQOg",
				          "enabled": true,
				          "endpoint": NavigationEndpoint {
				            "metadata": {
				              "api_url": "subscription/subscribe",
				              "send_post": true,
				            },
				            "payload": {
				              "channelIds": [
				                "UCb72Gn5LXaLEcsOuPKGfQOg",
				              ],
				              "params": "EgIIBBgA",
				            },
				            "type": "NavigationEndpoint",
				          },
				          "item_type": "FREE",
				          "notification_preference_button": null,
				          "show_preferences": false,
				          "subscribed": false,
				          "subscribed_text": Text {
				            "runs": [
				              TextRun {
				                "attachment": undefined,
				                "bold": false,
				                "italics": false,
				                "strikethrough": false,
				                "text": "SUBSCRIBED",
				              },
				            ],
				            "text": "SUBSCRIBED",
				          },
				          "title": Text {
				            "runs": [
				              TextRun {
				                "attachment": undefined,
				                "bold": false,
				                "italics": false,
				                "strikethrough": false,
				                "text": "SUBSCRIBE",
				              },
				            ],
				            "text": "SUBSCRIBE",
				          },
				          "type": "SubscribeButton",
				          "unsubscribed_text": Text {
				            "runs": [
				              TextRun {
				                "attachment": undefined,
				                "bold": false,
				                "italics": false,
				                "strikethrough": false,
				                "text": "SUBSCRIBE",
				              },
				            ],
				            "text": "SUBSCRIBE",
				          },
				        },
				        "watermark": [
				          Thumbnail {
				            "height": 40,
				            "url": "https://i.ytimg.com/an/b72Gn5LXaLEcsOuPKGfQOg/featured_channel.jpg?v=6655b3e9",
				            "width": 40,
				          },
				        ],
				      },
				      "type": "PlayerAnnotationsExpanded",
				    },
				  ],
				  "basic_info": {
				    "allow_ratings": true,
				    "author": "DW Planet A",
				    "category": "Education",
				    "channel": {
				      "id": "UCb72Gn5LXaLEcsOuPKGfQOg",
				      "name": "DW Planet A",
				      "url": "http://www.youtube.com/@DWPlanetA",
				    },
				    "channel_id": "UCb72Gn5LXaLEcsOuPKGfQOg",
				    "duration": 778,
				    "embed": {
				      "flash_secure_url": undefined,
				      "flash_url": undefined,
				      "height": 720,
				      "iframe_url": "https://www.youtube.com/embed/Q6jJjCOJEzE",
				      "width": 1280,
				    },
				    "end_timestamp": null,
				    "has_ypc_metadata": false,
				    "id": "Q6jJjCOJEzE",
				    "is_crawlable": true,
				    "is_disliked": undefined,
				    "is_family_safe": true,
				    "is_liked": undefined,
				    "is_live": false,
				    "is_live_content": false,
				    "is_live_dvr_enabled": false,
				    "is_low_latency_live_stream": false,
				    "is_owner_viewing": false,
				    "is_post_live_dvr": false,
				    "is_private": false,
				    "is_unlisted": false,
				    "is_upcoming": false,
				    "keywords": [
				      "DW",
				      "Deutsche Welle",
				      "DW Planet A",
				      "Planet A",
				      "yt:cc=on",
				      "lithium serbia",
				      "lithium mining serbia",
				      "lithium serbia protest",
				      "lithium mining europe",
				      "lithium mining europe potential",
				      "lithium europe",
				      "lithium ion batteries europe",
				      "lithium mining",
				      "lithium mining effects on environment",
				      "lithium mining environment",
				      "lithium mining environmental damage",
				      "lithium mining environmental impact",
				      "lithium mining projects europe",
				      "lithium ion batteries",
				      "lithium portugal",
				      "lithium battery production europe",
				    ],
				    "like_count": undefined,
				    "live_chunk_readahead": undefined,
				    "short_description": "Right now, Europe is almost entirely dependent on China for its lithium battery needs. Can the bloc develop its own supply chain in time for its ambitious climate goals?
				 
				#planeta #batteries #energystorage

				We're destroying our environment at an alarming rate. But it doesn't need to be this way. Planet A explores the shift towards an eco-friendly world — and challenges our ideas about what dealing with climate change means. We look at the big and the small: What we can do and how the system needs to change. Every Friday we'll take a truly global look at how to get us out of this mess.

				Follow Planet A on TikTok: https://www.tiktok.com/@dw_planeta?lang=en

				Credits:
				Reporter: Beina Xu
				Camera: Marco Borowski
				Video Editor: Markus Otto Mörtz
				Supervising Editors: Malte Rohwer-Kahlmann, Michael Trobridge
				Factcheck: Alexander Paquet
				Thumbnail: Em Chabridon

				Update: As some of you have sharply pointed out, at 8:38 our reporter says "almost 50 times more" instead of "almost 50% more", as the video and subtitles correctly point out. Apologies for the mistake.

				Read more:  
				Trends in electric vehicle batteries – Global EV Outlook 2024:
				https://www.iea.org/reports/global-ev-outlook-2024/trends-in-electric-vehicle-batteries


				Lithium ion batteries' supply-chain in Europe: Material flow and environmental assessment:
				https://www.sciencedirect.com/science/article/pii/S0301479724007448
				 
				The EU’s industrial policy on batteries:
				https://www.eca.europa.eu/ECAPublications/SR-2023-15/SR-2023-15_EN.pdf

				Lithium Mining Projects in Europe:
				https://emag.directindustry.com/2022/11/03/lithium-what-are-the-main-mining-projects-in-europe/
				 
				Chapters:
				00:00 Intro  
				1:03 The European situation 
				3:09 Europe's potential 
				4:25 Serbian interlude 
				6:27 Looking down the stream
				9:49 Show me the money
				11:38 The future supply chain",
				    "start_timestamp": null,
				    "tags": null,
				    "thumbnail": [
				      Thumbnail {
				        "height": 1080,
				        "url": "https://i.ytimg.com/vi/Q6jJjCOJEzE/maxresdefault.jpg",
				        "width": 1920,
				      },
				      Thumbnail {
				        "height": 188,
				        "url": "https://i.ytimg.com/vi/Q6jJjCOJEzE/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAsLgNYZOZyb3nIiYDqb7xKkRfkUA",
				        "width": 336,
				      },
				      Thumbnail {
				        "height": 138,
				        "url": "https://i.ytimg.com/vi/Q6jJjCOJEzE/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCp2v6Bu3KajVCdHiJKWiADNa1bAA",
				        "width": 246,
				      },
				      Thumbnail {
				        "height": 110,
				        "url": "https://i.ytimg.com/vi/Q6jJjCOJEzE/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAuObtNnkrO8pA6NCr7Zyf1276zZQ",
				        "width": 196,
				      },
				      Thumbnail {
				        "height": 94,
				        "url": "https://i.ytimg.com/vi/Q6jJjCOJEzE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAO0knJMzHlXYmMnwQoWWSrJrPFFg",
				        "width": 168,
				      },
				    ],
				    "title": "Has the EU already lost the lithium battery war?",
				    "url_canonical": null,
				    "view_count": 138750,
				  },
				  "captions": PlayerCaptionsTracklist {
				    "audio_tracks": [
				      {
				        "audio_track_id": undefined,
				        "caption_track_indices": [
				          0,
				          1,
				        ],
				        "captions_initial_state": "CAPTIONS_INITIAL_STATE_ON_REQUIRED",
				        "default_caption_track_index": 0,
				        "has_default_track": true,
				        "visibility": "ON",
				      },
				    ],
				    "caption_tracks": [
				      {
				        "base_url": "https://www.youtube.com/api/timedtext?v=Q6jJjCOJEzE&ei=0UI3Z4nyGO-z1d8P88agoAY&caps=asr&opi=112496729&exp=xbt&xoaf=5&hl=en&ip=0.0.0.0&ipbits=0&expire=1731700033&sparams=ip,ipbits,expire,v,ei,caps,opi,exp,xoaf&signature=1B7433EB6EB6F77DFB007D9B7BE5522028C77687.A47AC331D5136B5644D46AC014B30629CAF5E3B0&key=yt8&lang=en",
				        "is_translatable": true,
				        "kind": undefined,
				        "language_code": "en",
				        "name": Text {
				          "text": "English",
				        },
				        "vss_id": ".en",
				      },
				      {
				        "base_url": "https://www.youtube.com/api/timedtext?v=Q6jJjCOJEzE&ei=0UI3Z4nyGO-z1d8P88agoAY&caps=asr&opi=112496729&exp=xbt&xoaf=5&hl=en&ip=0.0.0.0&ipbits=0&expire=1731700033&sparams=ip,ipbits,expire,v,ei,caps,opi,exp,xoaf&signature=1B7433EB6EB6F77DFB007D9B7BE5522028C77687.A47AC331D5136B5644D46AC014B30629CAF5E3B0&key=yt8&kind=asr&lang=en",
				        "is_translatable": true,
				        "kind": "asr",
				        "language_code": "en",
				        "name": Text {
				          "text": "English (auto-generated)",
				        },
				        "vss_id": "a.en",
				      },
				    ],
				    "default_audio_track_index": 0,
				    "translation_languages": [
				      {
				        "language_code": "ab",
				        "language_name": Text {
				          "text": "Abkhazian",
				        },
				      },
				      {
				        "language_code": "aa",
				        "language_name": Text {
				          "text": "Afar",
				        },
				      },
				      {
				        "language_code": "af",
				        "language_name": Text {
				          "text": "Afrikaans",
				        },
				      },
				      {
				        "language_code": "ak",
				        "language_name": Text {
				          "text": "Akan",
				        },
				      },
				      {
				        "language_code": "sq",
				        "language_name": Text {
				          "text": "Albanian",
				        },
				      },
				      {
				        "language_code": "am",
				        "language_name": Text {
				          "text": "Amharic",
				        },
				      },
				      {
				        "language_code": "ar",
				        "language_name": Text {
				          "text": "Arabic",
				        },
				      },
				      {
				        "language_code": "hy",
				        "language_name": Text {
				          "text": "Armenian",
				        },
				      },
				      {
				        "language_code": "as",
				        "language_name": Text {
				          "text": "Assamese",
				        },
				      },
				      {
				        "language_code": "ay",
				        "language_name": Text {
				          "text": "Aymara",
				        },
				      },
				      {
				        "language_code": "az",
				        "language_name": Text {
				          "text": "Azerbaijani",
				        },
				      },
				      {
				        "language_code": "bn",
				        "language_name": Text {
				          "text": "Bangla",
				        },
				      },
				      {
				        "language_code": "ba",
				        "language_name": Text {
				          "text": "Bashkir",
				        },
				      },
				      {
				        "language_code": "eu",
				        "language_name": Text {
				          "text": "Basque",
				        },
				      },
				      {
				        "language_code": "be",
				        "language_name": Text {
				          "text": "Belarusian",
				        },
				      },
				      {
				        "language_code": "bho",
				        "language_name": Text {
				          "text": "Bhojpuri",
				        },
				      },
				      {
				        "language_code": "bs",
				        "language_name": Text {
				          "text": "Bosnian",
				        },
				      },
				      {
				        "language_code": "br",
				        "language_name": Text {
				          "text": "Breton",
				        },
				      },
				      {
				        "language_code": "bg",
				        "language_name": Text {
				          "text": "Bulgarian",
				        },
				      },
				      {
				        "language_code": "my",
				        "language_name": Text {
				          "text": "Burmese",
				        },
				      },
				      {
				        "language_code": "ca",
				        "language_name": Text {
				          "text": "Catalan",
				        },
				      },
				      {
				        "language_code": "ceb",
				        "language_name": Text {
				          "text": "Cebuano",
				        },
				      },
				      {
				        "language_code": "zh-Hans",
				        "language_name": Text {
				          "text": "Chinese (Simplified)",
				        },
				      },
				      {
				        "language_code": "zh-Hant",
				        "language_name": Text {
				          "text": "Chinese (Traditional)",
				        },
				      },
				      {
				        "language_code": "co",
				        "language_name": Text {
				          "text": "Corsican",
				        },
				      },
				      {
				        "language_code": "hr",
				        "language_name": Text {
				          "text": "Croatian",
				        },
				      },
				      {
				        "language_code": "cs",
				        "language_name": Text {
				          "text": "Czech",
				        },
				      },
				      {
				        "language_code": "da",
				        "language_name": Text {
				          "text": "Danish",
				        },
				      },
				      {
				        "language_code": "dv",
				        "language_name": Text {
				          "text": "Divehi",
				        },
				      },
				      {
				        "language_code": "nl",
				        "language_name": Text {
				          "text": "Dutch",
				        },
				      },
				      {
				        "language_code": "dz",
				        "language_name": Text {
				          "text": "Dzongkha",
				        },
				      },
				      {
				        "language_code": "en",
				        "language_name": Text {
				          "text": "English",
				        },
				      },
				      {
				        "language_code": "eo",
				        "language_name": Text {
				          "text": "Esperanto",
				        },
				      },
				      {
				        "language_code": "et",
				        "language_name": Text {
				          "text": "Estonian",
				        },
				      },
				      {
				        "language_code": "ee",
				        "language_name": Text {
				          "text": "Ewe",
				        },
				      },
				      {
				        "language_code": "fo",
				        "language_name": Text {
				          "text": "Faroese",
				        },
				      },
				      {
				        "language_code": "fj",
				        "language_name": Text {
				          "text": "Fijian",
				        },
				      },
				      {
				        "language_code": "fil",
				        "language_name": Text {
				          "text": "Filipino",
				        },
				      },
				      {
				        "language_code": "fi",
				        "language_name": Text {
				          "text": "Finnish",
				        },
				      },
				      {
				        "language_code": "fr",
				        "language_name": Text {
				          "text": "French",
				        },
				      },
				      {
				        "language_code": "gaa",
				        "language_name": Text {
				          "text": "Ga",
				        },
				      },
				      {
				        "language_code": "gl",
				        "language_name": Text {
				          "text": "Galician",
				        },
				      },
				      {
				        "language_code": "lg",
				        "language_name": Text {
				          "text": "Ganda",
				        },
				      },
				      {
				        "language_code": "ka",
				        "language_name": Text {
				          "text": "Georgian",
				        },
				      },
				      {
				        "language_code": "de",
				        "language_name": Text {
				          "text": "German",
				        },
				      },
				      {
				        "language_code": "el",
				        "language_name": Text {
				          "text": "Greek",
				        },
				      },
				      {
				        "language_code": "gn",
				        "language_name": Text {
				          "text": "Guarani",
				        },
				      },
				      {
				        "language_code": "gu",
				        "language_name": Text {
				          "text": "Gujarati",
				        },
				      },
				      {
				        "language_code": "ht",
				        "language_name": Text {
				          "text": "Haitian Creole",
				        },
				      },
				      {
				        "language_code": "ha",
				        "language_name": Text {
				          "text": "Hausa",
				        },
				      },
				      {
				        "language_code": "haw",
				        "language_name": Text {
				          "text": "Hawaiian",
				        },
				      },
				      {
				        "language_code": "iw",
				        "language_name": Text {
				          "text": "Hebrew",
				        },
				      },
				      {
				        "language_code": "hi",
				        "language_name": Text {
				          "text": "Hindi",
				        },
				      },
				      {
				        "language_code": "hmn",
				        "language_name": Text {
				          "text": "Hmong",
				        },
				      },
				      {
				        "language_code": "hu",
				        "language_name": Text {
				          "text": "Hungarian",
				        },
				      },
				      {
				        "language_code": "is",
				        "language_name": Text {
				          "text": "Icelandic",
				        },
				      },
				      {
				        "language_code": "ig",
				        "language_name": Text {
				          "text": "Igbo",
				        },
				      },
				      {
				        "language_code": "id",
				        "language_name": Text {
				          "text": "Indonesian",
				        },
				      },
				      {
				        "language_code": "iu",
				        "language_name": Text {
				          "text": "Inuktitut",
				        },
				      },
				      {
				        "language_code": "ga",
				        "language_name": Text {
				          "text": "Irish",
				        },
				      },
				      {
				        "language_code": "it",
				        "language_name": Text {
				          "text": "Italian",
				        },
				      },
				      {
				        "language_code": "ja",
				        "language_name": Text {
				          "text": "Japanese",
				        },
				      },
				      {
				        "language_code": "jv",
				        "language_name": Text {
				          "text": "Javanese",
				        },
				      },
				      {
				        "language_code": "kl",
				        "language_name": Text {
				          "text": "Kalaallisut",
				        },
				      },
				      {
				        "language_code": "kn",
				        "language_name": Text {
				          "text": "Kannada",
				        },
				      },
				      {
				        "language_code": "kk",
				        "language_name": Text {
				          "text": "Kazakh",
				        },
				      },
				      {
				        "language_code": "kha",
				        "language_name": Text {
				          "text": "Khasi",
				        },
				      },
				      {
				        "language_code": "km",
				        "language_name": Text {
				          "text": "Khmer",
				        },
				      },
				      {
				        "language_code": "rw",
				        "language_name": Text {
				          "text": "Kinyarwanda",
				        },
				      },
				      {
				        "language_code": "ko",
				        "language_name": Text {
				          "text": "Korean",
				        },
				      },
				      {
				        "language_code": "kri",
				        "language_name": Text {
				          "text": "Krio",
				        },
				      },
				      {
				        "language_code": "ku",
				        "language_name": Text {
				          "text": "Kurdish",
				        },
				      },
				      {
				        "language_code": "ky",
				        "language_name": Text {
				          "text": "Kyrgyz",
				        },
				      },
				      {
				        "language_code": "lo",
				        "language_name": Text {
				          "text": "Lao",
				        },
				      },
				      {
				        "language_code": "la",
				        "language_name": Text {
				          "text": "Latin",
				        },
				      },
				      {
				        "language_code": "lv",
				        "language_name": Text {
				          "text": "Latvian",
				        },
				      },
				      {
				        "language_code": "ln",
				        "language_name": Text {
				          "text": "Lingala",
				        },
				      },
				      {
				        "language_code": "lt",
				        "language_name": Text {
				          "text": "Lithuanian",
				        },
				      },
				      {
				        "language_code": "lua",
				        "language_name": Text {
				          "text": "Luba-Lulua",
				        },
				      },
				      {
				        "language_code": "luo",
				        "language_name": Text {
				          "text": "Luo",
				        },
				      },
				      {
				        "language_code": "lb",
				        "language_name": Text {
				          "text": "Luxembourgish",
				        },
				      },
				      {
				        "language_code": "mk",
				        "language_name": Text {
				          "text": "Macedonian",
				        },
				      },
				      {
				        "language_code": "mg",
				        "language_name": Text {
				          "text": "Malagasy",
				        },
				      },
				      {
				        "language_code": "ms",
				        "language_name": Text {
				          "text": "Malay",
				        },
				      },
				      {
				        "language_code": "ml",
				        "language_name": Text {
				          "text": "Malayalam",
				        },
				      },
				      {
				        "language_code": "mt",
				        "language_name": Text {
				          "text": "Maltese",
				        },
				      },
				      {
				        "language_code": "gv",
				        "language_name": Text {
				          "text": "Manx",
				        },
				      },
				      {
				        "language_code": "mi",
				        "language_name": Text {
				          "text": "Māori",
				        },
				      },
				      {
				        "language_code": "mr",
				        "language_name": Text {
				          "text": "Marathi",
				        },
				      },
				      {
				        "language_code": "mn",
				        "language_name": Text {
				          "text": "Mongolian",
				        },
				      },
				      {
				        "language_code": "mfe",
				        "language_name": Text {
				          "text": "Morisyen",
				        },
				      },
				      {
				        "language_code": "ne",
				        "language_name": Text {
				          "text": "Nepali",
				        },
				      },
				      {
				        "language_code": "new",
				        "language_name": Text {
				          "text": "Newari",
				        },
				      },
				      {
				        "language_code": "nso",
				        "language_name": Text {
				          "text": "Northern Sotho",
				        },
				      },
				      {
				        "language_code": "no",
				        "language_name": Text {
				          "text": "Norwegian",
				        },
				      },
				      {
				        "language_code": "ny",
				        "language_name": Text {
				          "text": "Nyanja",
				        },
				      },
				      {
				        "language_code": "oc",
				        "language_name": Text {
				          "text": "Occitan",
				        },
				      },
				      {
				        "language_code": "or",
				        "language_name": Text {
				          "text": "Odia",
				        },
				      },
				      {
				        "language_code": "om",
				        "language_name": Text {
				          "text": "Oromo",
				        },
				      },
				      {
				        "language_code": "os",
				        "language_name": Text {
				          "text": "Ossetic",
				        },
				      },
				      {
				        "language_code": "pam",
				        "language_name": Text {
				          "text": "Pampanga",
				        },
				      },
				      {
				        "language_code": "ps",
				        "language_name": Text {
				          "text": "Pashto",
				        },
				      },
				      {
				        "language_code": "fa",
				        "language_name": Text {
				          "text": "Persian",
				        },
				      },
				      {
				        "language_code": "pl",
				        "language_name": Text {
				          "text": "Polish",
				        },
				      },
				      {
				        "language_code": "pt",
				        "language_name": Text {
				          "text": "Portuguese",
				        },
				      },
				      {
				        "language_code": "pt-PT",
				        "language_name": Text {
				          "text": "Portuguese (Portugal)",
				        },
				      },
				      {
				        "language_code": "pa",
				        "language_name": Text {
				          "text": "Punjabi",
				        },
				      },
				      {
				        "language_code": "qu",
				        "language_name": Text {
				          "text": "Quechua",
				        },
				      },
				      {
				        "language_code": "ro",
				        "language_name": Text {
				          "text": "Romanian",
				        },
				      },
				      {
				        "language_code": "rn",
				        "language_name": Text {
				          "text": "Rundi",
				        },
				      },
				      {
				        "language_code": "ru",
				        "language_name": Text {
				          "text": "Russian",
				        },
				      },
				      {
				        "language_code": "sm",
				        "language_name": Text {
				          "text": "Samoan",
				        },
				      },
				      {
				        "language_code": "sg",
				        "language_name": Text {
				          "text": "Sango",
				        },
				      },
				      {
				        "language_code": "sa",
				        "language_name": Text {
				          "text": "Sanskrit",
				        },
				      },
				      {
				        "language_code": "gd",
				        "language_name": Text {
				          "text": "Scottish Gaelic",
				        },
				      },
				      {
				        "language_code": "sr",
				        "language_name": Text {
				          "text": "Serbian",
				        },
				      },
				      {
				        "language_code": "crs",
				        "language_name": Text {
				          "text": "Seselwa Creole French",
				        },
				      },
				      {
				        "language_code": "sn",
				        "language_name": Text {
				          "text": "Shona",
				        },
				      },
				      {
				        "language_code": "sd",
				        "language_name": Text {
				          "text": "Sindhi",
				        },
				      },
				      {
				        "language_code": "si",
				        "language_name": Text {
				          "text": "Sinhala",
				        },
				      },
				      {
				        "language_code": "sk",
				        "language_name": Text {
				          "text": "Slovak",
				        },
				      },
				      {
				        "language_code": "sl",
				        "language_name": Text {
				          "text": "Slovenian",
				        },
				      },
				      {
				        "language_code": "so",
				        "language_name": Text {
				          "text": "Somali",
				        },
				      },
				      {
				        "language_code": "st",
				        "language_name": Text {
				          "text": "Southern Sotho",
				        },
				      },
				      {
				        "language_code": "es",
				        "language_name": Text {
				          "text": "Spanish",
				        },
				      },
				      {
				        "language_code": "su",
				        "language_name": Text {
				          "text": "Sundanese",
				        },
				      },
				      {
				        "language_code": "sw",
				        "language_name": Text {
				          "text": "Swahili",
				        },
				      },
				      {
				        "language_code": "ss",
				        "language_name": Text {
				          "text": "Swati",
				        },
				      },
				      {
				        "language_code": "sv",
				        "language_name": Text {
				          "text": "Swedish",
				        },
				      },
				      {
				        "language_code": "tg",
				        "language_name": Text {
				          "text": "Tajik",
				        },
				      },
				      {
				        "language_code": "ta",
				        "language_name": Text {
				          "text": "Tamil",
				        },
				      },
				      {
				        "language_code": "tt",
				        "language_name": Text {
				          "text": "Tatar",
				        },
				      },
				      {
				        "language_code": "te",
				        "language_name": Text {
				          "text": "Telugu",
				        },
				      },
				      {
				        "language_code": "th",
				        "language_name": Text {
				          "text": "Thai",
				        },
				      },
				      {
				        "language_code": "bo",
				        "language_name": Text {
				          "text": "Tibetan",
				        },
				      },
				      {
				        "language_code": "ti",
				        "language_name": Text {
				          "text": "Tigrinya",
				        },
				      },
				      {
				        "language_code": "to",
				        "language_name": Text {
				          "text": "Tongan",
				        },
				      },
				      {
				        "language_code": "ts",
				        "language_name": Text {
				          "text": "Tsonga",
				        },
				      },
				      {
				        "language_code": "tn",
				        "language_name": Text {
				          "text": "Tswana",
				        },
				      },
				      {
				        "language_code": "tum",
				        "language_name": Text {
				          "text": "Tumbuka",
				        },
				      },
				      {
				        "language_code": "tr",
				        "language_name": Text {
				          "text": "Turkish",
				        },
				      },
				      {
				        "language_code": "tk",
				        "language_name": Text {
				          "text": "Turkmen",
				        },
				      },
				      {
				        "language_code": "uk",
				        "language_name": Text {
				          "text": "Ukrainian",
				        },
				      },
				      {
				        "language_code": "ur",
				        "language_name": Text {
				          "text": "Urdu",
				        },
				      },
				      {
				        "language_code": "ug",
				        "language_name": Text {
				          "text": "Uyghur",
				        },
				      },
				      {
				        "language_code": "uz",
				        "language_name": Text {
				          "text": "Uzbek",
				        },
				      },
				      {
				        "language_code": "ve",
				        "language_name": Text {
				          "text": "Venda",
				        },
				      },
				      {
				        "language_code": "vi",
				        "language_name": Text {
				          "text": "Vietnamese",
				        },
				      },
				      {
				        "language_code": "war",
				        "language_name": Text {
				          "text": "Waray",
				        },
				      },
				      {
				        "language_code": "cy",
				        "language_name": Text {
				          "text": "Welsh",
				        },
				      },
				      {
				        "language_code": "fy",
				        "language_name": Text {
				          "text": "Western Frisian",
				        },
				      },
				      {
				        "language_code": "wo",
				        "language_name": Text {
				          "text": "Wolof",
				        },
				      },
				      {
				        "language_code": "xh",
				        "language_name": Text {
				          "text": "Xhosa",
				        },
				      },
				      {
				        "language_code": "yi",
				        "language_name": Text {
				          "text": "Yiddish",
				        },
				      },
				      {
				        "language_code": "yo",
				        "language_name": Text {
				          "text": "Yoruba",
				        },
				      },
				      {
				        "language_code": "zu",
				        "language_name": Text {
				          "text": "Zulu",
				        },
				      },
				    ],
				    "type": "PlayerCaptionsTracklist",
				  },
				  "cards": CardCollection {
				    "allow_teaser_dismiss": true,
				    "cards": [
				      Card {
				        "content": null,
				        "cue_ranges": [
				          {
				            "end_card_active_ms": "5000",
				            "icon_after_teaser_ms": "5000",
				            "start_card_active_ms": "0",
				            "teaser_duration_ms": "6000",
				          },
				        ],
				        "teaser": SimpleCardTeaser {
				          "message": Text {
				            "text": "View corrections",
				          },
				          "prominent": true,
				          "type": "SimpleCardTeaser",
				        },
				        "type": "Card",
				      },
				    ],
				    "header": Text {
				      "text": "From DW Planet A",
				    },
				    "type": "CardCollection",
				  },
				  "endscreen": Endscreen {
				    "elements": [
				      EndscreenElement {
				        "aspect_ratio": 1,
				        "call_to_action": Text {
				          "text": "VISIT CHANNEL",
				        },
				        "end_ms": 778240,
				        "endpoint": NavigationEndpoint {
				          "metadata": {
				            "api_url": "browse",
				            "page_type": "WEB_PAGE_TYPE_CHANNEL",
				            "url": "/channel/UCb72Gn5LXaLEcsOuPKGfQOg",
				          },
				          "payload": {
				            "browseId": "UCb72Gn5LXaLEcsOuPKGfQOg",
				          },
				          "type": "NavigationEndpoint",
				        },
				        "hovercard_button": SubscribeButton {
				          "channel_id": "UCb72Gn5LXaLEcsOuPKGfQOg",
				          "enabled": true,
				          "endpoint": NavigationEndpoint {
				            "metadata": {
				              "api_url": "subscription/subscribe",
				              "send_post": true,
				            },
				            "payload": {
				              "channelIds": [
				                "UCb72Gn5LXaLEcsOuPKGfQOg",
				              ],
				              "params": "EgIIBBgA",
				            },
				            "type": "NavigationEndpoint",
				          },
				          "item_type": "FREE",
				          "notification_preference_button": null,
				          "show_preferences": false,
				          "subscribed": false,
				          "subscribed_text": Text {
				            "runs": [
				              TextRun {
				                "attachment": undefined,
				                "bold": false,
				                "italics": false,
				                "strikethrough": false,
				                "text": "SUBSCRIBED",
				              },
				            ],
				            "text": "SUBSCRIBED",
				          },
				          "title": Text {
				            "runs": [
				              TextRun {
				                "attachment": undefined,
				                "bold": false,
				                "italics": false,
				                "strikethrough": false,
				                "text": "SUBSCRIBE",
				              },
				            ],
				            "text": "SUBSCRIBE",
				          },
				          "type": "SubscribeButton",
				          "unsubscribed_text": Text {
				            "runs": [
				              TextRun {
				                "attachment": undefined,
				                "bold": false,
				                "italics": false,
				                "strikethrough": false,
				                "text": "SUBSCRIBE",
				              },
				            ],
				            "text": "SUBSCRIBE",
				          },
				        },
				        "icon": [
				          Thumbnail {
				            "height": undefined,
				            "url": "https://www.gstatic.com/youtube/img/annotations/youtube.png",
				            "width": undefined,
				          },
				        ],
				        "id": "6469021218194988650",
				        "image": [
				          Thumbnail {
				            "height": 400,
				            "url": "https://yt3.ggpht.com/TRZsXt5brkdBvfhNy0UZcEAzZsC6SpRNqkSvLjP53KX0udN1HZIfQBLDV-UoNaJlwAEOU1T5MjI=s400-c-k-c0x00ffffff-no-rj",
				            "width": 400,
				          },
				          Thumbnail {
				            "height": 250,
				            "url": "https://yt3.ggpht.com/TRZsXt5brkdBvfhNy0UZcEAzZsC6SpRNqkSvLjP53KX0udN1HZIfQBLDV-UoNaJlwAEOU1T5MjI=s250-c-k-c0x00ffffff-no-rj",
				            "width": 250,
				          },
				        ],
				        "is_subscribe": true,
				        "left": 0.40175438,
				        "metadata": Text {
				          "text": "We're destroying our environment at an alarming rate. But it doesn't need to be this way. Planet A explores the shift towards an eco-friendly world — and challenges our ideas about what dealing with climate change means. We look at the big and the small: What we can do and how the system needs to change. Every Friday we'll take a truly global look at how to get us out of this mess.  

				If you have any story ideas or leads, please contact us at planeta@dw.com. 

				This is a Deutsche Welle YouTube channel. Deutsche Welle is Germany's international broadcaster, producing TV, radio and internet programming for you in 30 languages – wherever you are in the world.

				Channel lead: Kiyo Dörrer
				Supervising editors: Kiyo Dörrer, Joanna Gottschalk, Malte Rohwer-Kahlmann
				",
				        },
				        "start_ms": 766878,
				        "style": "CHANNEL",
				        "title": Text {
				          "text": "DW Planet A",
				        },
				        "top": 0.5728881,
				        "type": "EndscreenElement",
				        "width": 0.15438597,
				      },
				      EndscreenElement {
				        "aspect_ratio": 1.7777778,
				        "end_ms": 778240,
				        "endpoint": NavigationEndpoint {
				          "metadata": {
				            "api_url": "/player",
				            "page_type": "WEB_PAGE_TYPE_WATCH",
				            "url": "/watch?v=gAZV1Ut6DDs",
				          },
				          "payload": {
				            "videoId": "gAZV1Ut6DDs",
				            "watchEndpointSupportedOnesieConfig": {
				              "html5PlaybackOnesieConfig": {
				                "commonConfig": {
				                  "url": "https://rr1---sn-i3b7knld.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=800655d54b7a0c3b&ip=91.186.218.35&initcwndbps=4868750&mt=1731673996&oweuc=&pxtags=Cg4KAnR4Egg1MTI0MTQ4Mw&rxtags=Cg4KAnR4Egg1MTI0MTQ4MQ%2CCg4KAnR4Egg1MTI0MTQ4Mg%2CCg4KAnR4Egg1MTI0MTQ4Mw%2CCg4KAnR4Egg1MTI0MTQ4NA%2CCg4KAnR4Egg1MTI0MTQ4NQ%2CCg4KAnR4Egg1MTI0MTQ4Ng",
				                },
				              },
				            },
				          },
				          "type": "NavigationEndpoint",
				        },
				        "id": "9394269594004856781",
				        "image": [
				          Thumbnail {
				            "height": 1080,
				            "url": "https://i.ytimg.com/vi/gAZV1Ut6DDs/maxresdefault.jpg",
				            "width": 1920,
				          },
				          Thumbnail {
				            "height": 188,
				            "url": "https://i.ytimg.com/vi/gAZV1Ut6DDs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBul2mFHCjd3Vf-YriyhyRGit3ceA",
				            "width": 336,
				          },
				          Thumbnail {
				            "height": 138,
				            "url": "https://i.ytimg.com/vi/gAZV1Ut6DDs/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBDU_UmPc9vt0c8V4I7nG7qhbE_Hg",
				            "width": 246,
				          },
				          Thumbnail {
				            "height": 110,
				            "url": "https://i.ytimg.com/vi/gAZV1Ut6DDs/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBlGdKmc2GF4Z9PWI-pf5ffJMZx4w",
				            "width": 196,
				          },
				          Thumbnail {
				            "height": 94,
				            "url": "https://i.ytimg.com/vi/gAZV1Ut6DDs/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDNoMczoI4eNEfh83JdWkNKOipjpQ",
				            "width": 168,
				          },
				        ],
				        "left": 0.654386,
				        "metadata": Text {
				          "text": "32,075 views",
				        },
				        "start_ms": 768859,
				        "style": "VIDEO",
				        "thumbnail_overlays": [
				          ThumbnailOverlayTimeStatus {
				            "style": "DEFAULT",
				            "text": "11:33",
				            "type": "ThumbnailOverlayTimeStatus",
				          },
				        ],
				        "title": Text {
				          "text": "Why our future depends on lithium",
				        },
				        "top": 0.524545,
				        "type": "EndscreenElement",
				        "width": 0.322807,
				      },
				      EndscreenElement {
				        "aspect_ratio": 1.7777778,
				        "end_ms": 778240,
				        "endpoint": NavigationEndpoint {
				          "metadata": {
				            "api_url": "/player",
				            "page_type": "WEB_PAGE_TYPE_WATCH",
				            "url": "/watch?v=MrNmr2UAuYY",
				          },
				          "payload": {
				            "videoId": "MrNmr2UAuYY",
				            "watchEndpointSupportedOnesieConfig": {
				              "html5PlaybackOnesieConfig": {
				                "commonConfig": {
				                  "url": "https://rr4---sn-i3b7knzl.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=32b366af6500b986&ip=91.186.218.35&initcwndbps=2483750&mt=1731673996&oweuc=&pxtags=Cg4KAnR4Egg1MTI0MTQ4Mw&rxtags=Cg4KAnR4Egg1MTI0MTQ4MQ%2CCg4KAnR4Egg1MTI0MTQ4Mg%2CCg4KAnR4Egg1MTI0MTQ4Mw%2CCg4KAnR4Egg1MTI0MTQ4NA%2CCg4KAnR4Egg1MTI0MTQ4NQ%2CCg4KAnR4Egg1MTI0MTQ4Ng",
				                },
				              },
				            },
				          },
				          "type": "NavigationEndpoint",
				        },
				        "id": "188259019640781989",
				        "image": [
				          Thumbnail {
				            "height": 1080,
				            "url": "https://i.ytimg.com/vi_webp/MrNmr2UAuYY/maxresdefault.webp",
				            "width": 1920,
				          },
				          Thumbnail {
				            "height": 188,
				            "url": "https://i.ytimg.com/vi/MrNmr2UAuYY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCvLatYPFh7Dhy9DzVsuvkfI1Ga5Q",
				            "width": 336,
				          },
				          Thumbnail {
				            "height": 138,
				            "url": "https://i.ytimg.com/vi/MrNmr2UAuYY/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBzTlG7Vm-BVX1NiJ9Nu7GFHjN5Xw",
				            "width": 246,
				          },
				          Thumbnail {
				            "height": 110,
				            "url": "https://i.ytimg.com/vi/MrNmr2UAuYY/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBZplKkhiBmtcbJluEsFjqQjIJCLA",
				            "width": 196,
				          },
				          Thumbnail {
				            "height": 94,
				            "url": "https://i.ytimg.com/vi/MrNmr2UAuYY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBdUhtXJ2m1nRv1DCGq2skT5Jt6Ng",
				            "width": 168,
				          },
				        ],
				        "left": 0.654386,
				        "metadata": Text {
				          "text": "148,445 views",
				        },
				        "start_ms": 768859,
				        "style": "VIDEO",
				        "thumbnail_overlays": [
				          ThumbnailOverlayTimeStatus {
				            "style": "DEFAULT",
				            "text": "11:12",
				            "type": "ThumbnailOverlayTimeStatus",
				          },
				        ],
				        "title": Text {
				          "text": "The problem with recycling electric car batteries",
				        },
				        "top": 0.13084112,
				        "type": "EndscreenElement",
				        "width": 0.322807,
				      },
				    ],
				    "start_ms": "766878",
				    "type": "Endscreen",
				  },
				  "playability_status": {
				    "audio_only_playablility": null,
				    "embeddable": true,
				    "error_screen": null,
				    "reason": "",
				    "status": "OK",
				  },
				  "player_config": {
				    "audio_config": {
				      "enable_per_format_loudness": true,
				      "loudness_db": -1.21,
				      "perceptual_loudness_db": -15.21,
				    },
				    "media_common_config": {
				      "dynamic_readahead_config": {
				        "max_read_ahead_media_time_ms": 120000,
				        "min_read_ahead_media_time_ms": 15000,
				        "read_ahead_growth_rate_ms": 1000,
				      },
				      "media_ustreamer_request_config": {
				        "video_playback_ustreamer_config": "Cr8LCtgHCAAlAACAPy0zM3M_NT0Klz9YAWgBchoKFm1mczJfY21mc193ZWJfdjNfMl8wMDMYAHiPTqABAagBAJACAbgCAMgCAdoC4AEQsOoBGIDd2wEgoJwBKKCcATCYdXCIJ4AB9AO4AQHgAQOQAgGYAgygAgHAAgHQAgLgAgHoAgSAAwKIA4gnmAMBqAMDwAMByAMB0AMB-AMBgAQBiAQBkAQBmAQBoAQBqAQByAQB0AQB2AQB4AQA6AQB-AQHgAV9iAUBsAUBuAUBwAUByAUB0AUB2AUB4AXQD-gFAfgF0A-ABgGQBgG4BgHABgHQBgHYBgHoBgHwBgH4BgGAB9APkAcBqAcBwAcByAcB0AcB2AcB8AcBgAgBkAgBnQgAAIC_oAjoB_i1keUMAfoCngItAACgQjUAAKpCSAFlAACAQGjAcKgB0IYDsAHgA7gBAc0BAACAP_ABAf0BAACAP4UCmpkZP40CAACAP5UCAAACQpgCAbUCAACAP8AC4APSAhGw__________8BHjxGWlxdXtoCBTIwOjAw4AJ46ALoAvUCCtejO_0CzczMPYADAZADAZ0DCtcjPaADAbgDAcgDAdgDAeUDYkpEQO0DMsrzPvADAf0DZmaGP4UEAACAQJgEAdUEAAAgQegE8BDwBAHIBQGYBgGoBgG1Br03hjW9BjMzg0CQBwGwBwHABwHIBwHVBwCAnUPlBwCACUTwBwGACAGhCAAAAAAAAPC_qQgAAAAAAADwv7AI8AG4CAHYCPAB6AgBiAkBlQkAgJ1DggMAkAMBqAMBsAMD0AMB2AMB4AOQTrgEAcoEHAoTCMCpBxCYdRjoByUAAAAAKAAwABDg1AMY0A_SBA0KCAiwCRCwCSABIIgn2gQLCgYI8C4Q8C4g8C74BAGQBQGoBQHQBQHYBQHoBQHwBQGIBgGYBgGoBoCAAsAGAcgGAdIGFAjoBxBkGg0IiCcVAAAAPx3NzEw_4AYBggcLFQAAgD8YZCCgjQaIBwGgBwG4BwHABwGACAGgCAGwCAG4CAHSCAYIARABGAGpCQAAAAAAAPC_sQkAAAAAAADwv8gJAdoJJHU4b3JHY3RIT1F0NmZoMVZ0cFJuSUNZSUloT1grL21XY3RhYuAJAZgKi8S3GKIKGInEtxiKxLcYi8S3GIzEtxiNxLcYjsS3GKgKicS3GLAKAYgLAZgLAcALAcgLAdALAdgLAeoLBIsGjAbwCwH4CwGQDAGoDJABsAwBuAwBwAwByAwB0AwB4AwBgA0BoA0B0A0B2A0B4A0BiA4BsA4ByA4BiA8B0A8BoBABiKehygsBGAEgATIMCIkBELmOoa_s14kDMgwI-AEQ4cWJru_XiQMyDAiPAxDOjZLc-NeJAzIMCIgBEMuFhI7r14kDMgwI9wEQhpj5gvLXiQMyDAiOAxDRz_3Q79eJAzIMCIcBEPbH0-_q14kDMgwI9AEQh6n4gfLXiQMyDAiNAxCJm6_F79eJAzIMCIYBEK-_5Kbr14kDMgwI8wEQyaTwgvLXiQMyDAiMAxDU6o257deJAzIMCIUBEKaRhPjp14kDMgwI8gEQuI-UhPLXiQMyDAiLAxDusIe77deJAzIMCKABEMuxp9fq14kDMgwIlgIQjqvKgfLXiQMyDAiKAxDLmYOh59eJAzIMCIwBENrWjv7g14kDMhwIjAEQ-8m0nuHXiQMaDkNnZ0tBMlJ5WXhJQk1RMgwI-QEQtYOi-eHXiQMyHAj5ARCIpbur4deJAxoOQ2dnS0EyUnlZeElCTVEyDAj6ARDjg5754deJAzIcCPoBEPyQw6vh14kDGg5DZ2dLQTJSeVl4SUJNUTIMCPsBEIaUo_nh14kDMhwI-wEQ-cu7q-HXiQMaDkNnZ0tBMlJ5WXhJQk1ROgBIAFIoGgJlbigAMhhVQ2I3MkduNUxYYUxFY3NPdVBLR2ZRT2c4AEAAWABgAJDL048OARJMAIHdvpYwRQIhAJRIHuXCxkYJYZ8QoZ8QKOnQTJwvq1aeHNkXj47RMGSrAiBD1OVXprw0gnBqgCrub3z7B1dSi5hw-fJ5bUgNHLyC3BoCZWk=",
				      },
				    },
				    "stream_selection_config": {
				      "max_bitrate": "19870000",
				    },
				  },
				  "storyboards": PlayerStoryboardSpec {
				    "boards": [
				      {
				        "columns": 10,
				        "interval": 0,
				        "rows": 10,
				        "storyboard_count": 1,
				        "template_url": "https://i.ytimg.com/sb/Q6jJjCOJEzE/storyboard3_L0/default.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgi-lY65Bg%3D%3D&sigh=rs%24AOn4CLBuvlS41tZxNLA_nxehW48dA78yvw",
				        "thumbnail_count": 100,
				        "thumbnail_height": 27,
				        "thumbnail_width": 48,
				        "type": "vod",
				      },
				      {
				        "columns": 10,
				        "interval": 5000,
				        "rows": 10,
				        "storyboard_count": 2,
				        "template_url": "https://i.ytimg.com/sb/Q6jJjCOJEzE/storyboard3_L1/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgi-lY65Bg%3D%3D&sigh=rs%24AOn4CLBxZ6yXzDbiOA1qzQu_igx7ATkE9A",
				        "thumbnail_count": 157,
				        "thumbnail_height": 45,
				        "thumbnail_width": 80,
				        "type": "vod",
				      },
				      {
				        "columns": 5,
				        "interval": 5000,
				        "rows": 5,
				        "storyboard_count": 7,
				        "template_url": "https://i.ytimg.com/sb/Q6jJjCOJEzE/storyboard3_L2/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgi-lY65Bg%3D%3D&sigh=rs%24AOn4CLBCOzdVC6lqqDuTNPU411OE7ELSmQ",
				        "thumbnail_count": 157,
				        "thumbnail_height": 90,
				        "thumbnail_width": 160,
				        "type": "vod",
				      },
				      {
				        "columns": 3,
				        "interval": 5000,
				        "rows": 3,
				        "storyboard_count": 18,
				        "template_url": "https://i.ytimg.com/sb/Q6jJjCOJEzE/storyboard3_L3/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgi-lY65Bg%3D%3D&sigh=rs%24AOn4CLC1Qu0FvJPdHKTFWUNd8tT3tSvzLQ",
				        "thumbnail_count": 157,
				        "thumbnail_height": 180,
				        "thumbnail_width": 320,
				        "type": "vod",
				      },
				    ],
				    "type": "PlayerStoryboardSpec",
				  },
				  "streaming_data": {
				    "adaptive_formats": [
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 1541400,
				        "bitrate": 4661674,
				        "content_length": 149947452,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 1080,
				        "index_range": {
				          "end": 2549,
				          "start": 742,
				        },
				        "init_range": {
				          "end": 741,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 137,
				        "last_modified": 2024-11-12T22:31:06.239Z,
				        "last_modified_ms": "1731450666239801",
				        "mime_type": "video/mp4; codecs="avc1.640028"",
				        "projection_type": "RECTANGULAR",
				        "quality": "hd1080",
				        "quality_label": "1080p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=149947452&dur=778.240&lmt=1731450666239801&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAMdOCOxAT1O7q6OU31fLPUUHVdLl7pvHdlGHlFtIVjpsAiBtOc64v7uaYtXQeKPm7KWvLp8mqVqW4DzZEJG1NTOKPA%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 1920,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 931830,
				        "bitrate": 2559567,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 90648477,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 1080,
				        "index_range": {
				          "end": 2847,
				          "start": 220,
				        },
				        "init_range": {
				          "end": 219,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 248,
				        "last_modified": 2024-11-12T22:44:29.062Z,
				        "last_modified_ms": "1731451469062881",
				        "mime_type": "video/webm; codecs="vp9"",
				        "projection_type": "RECTANGULAR",
				        "quality": "hd1080",
				        "quality_label": "1080p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=248&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=90648477&dur=778.240&lmt=1731451469062881&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhANQ6-JQ-73uvq2w8chCtP7hTGTw8FbuQSG1O6hvdX_E2AiAtVLm5lPjt4Nbo-mxfZX31akzXZJEuR_uMSLrBY0CA8A%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 1920,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 767486,
				        "bitrate": 2714992,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 74661066,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 1080,
				        "index_range": {
				          "end": 2507,
				          "start": 700,
				        },
				        "init_range": {
				          "end": 699,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 399,
				        "last_modified": 2024-11-12T23:26:21.591Z,
				        "last_modified_ms": "1731453981591246",
				        "mime_type": "video/mp4; codecs="av01.0.08M.08"",
				        "projection_type": "RECTANGULAR",
				        "quality": "hd1080",
				        "quality_label": "1080p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=399&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=74661066&dur=778.240&lmt=1731453981591246&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4537434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgTuL9t2fQino-rSycHQgqIFO1dyaoMnkXADqrG9fukhsCIAfbKULKlkI_egSo1lxfs0y6btTtTszDp942gFaLEbk5&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 1920,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 369111,
				        "bitrate": 1595836,
				        "content_length": 35907140,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 720,
				        "index_range": {
				          "end": 2547,
				          "start": 740,
				        },
				        "init_range": {
				          "end": 739,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 136,
				        "last_modified": 2024-11-12T22:25:28.122Z,
				        "last_modified_ms": "1731450328122059",
				        "mime_type": "video/mp4; codecs="avc1.4d401f"",
				        "projection_type": "RECTANGULAR",
				        "quality": "hd720",
				        "quality_label": "720p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=136&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=35907140&dur=778.240&lmt=1731450328122059&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAJmFyaeel2lWbONO73SFLRu6z4X31R4Kr2DyIXzjsp_NAiEA90qyGksNSFg8EJChjdE2HTzzWPC4riS5zibtrei3tsg%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 1280,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 431701,
				        "bitrate": 1519570,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 41995887,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 720,
				        "index_range": {
				          "end": 2815,
				          "start": 220,
				        },
				        "init_range": {
				          "end": 219,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 247,
				        "last_modified": 2024-11-12T22:56:23.923Z,
				        "last_modified_ms": "1731452183923718",
				        "mime_type": "video/webm; codecs="vp9"",
				        "projection_type": "RECTANGULAR",
				        "quality": "hd720",
				        "quality_label": "720p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=247&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=41995887&dur=778.240&lmt=1731452183923718&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIge6T8zF1A7HgeL2Delz3PxlDruns6mBM7_js6l2e1lpMCIQDDsCqFRMg6aMca-OYp8yJ0VZrn2w9HD-0yWjisDiq2lA%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 1280,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 406026,
				        "bitrate": 1291630,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 39498261,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 720,
				        "index_range": {
				          "end": 2507,
				          "start": 700,
				        },
				        "init_range": {
				          "end": 699,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 398,
				        "last_modified": 2024-11-12T22:45:42.267Z,
				        "last_modified_ms": "1731451542267857",
				        "mime_type": "video/mp4; codecs="av01.0.05M.08"",
				        "projection_type": "RECTANGULAR",
				        "quality": "hd720",
				        "quality_label": "720p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=398&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=39498261&dur=778.240&lmt=1731451542267857&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4537434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgSKM6NPDvjuEaZDja9TVSgTxweulj0O5kguDglw3J_GgCIQCngHu05Kx6MXDSAN6Lj9KY5rdSn4axBZdZsPQhYLQL_g%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 1280,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 202315,
				        "bitrate": 857231,
				        "content_length": 19681257,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 480,
				        "index_range": {
				          "end": 2548,
				          "start": 741,
				        },
				        "init_range": {
				          "end": 740,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 135,
				        "last_modified": 2024-11-12T22:24:24.413Z,
				        "last_modified_ms": "1731450264413174",
				        "mime_type": "video/mp4; codecs="avc1.4d401e"",
				        "projection_type": "RECTANGULAR",
				        "quality": "large",
				        "quality_label": "480p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=135&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=19681257&dur=778.240&lmt=1731450264413174&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgOnJRPE_AhdfdzTMLGiJCBNfoK-OaqzPLDhjwYn1IdPoCIQCcBQ0677wIU-lqhJhqPLgflRfvypRu2tDS9LdvnLO8QA%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 854,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 252795,
				        "bitrate": 767891,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 24591931,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 480,
				        "index_range": {
				          "end": 2778,
				          "start": 220,
				        },
				        "init_range": {
				          "end": 219,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 244,
				        "last_modified": 2024-11-12T22:56:21.812Z,
				        "last_modified_ms": "1731452181812359",
				        "mime_type": "video/webm; codecs="vp9"",
				        "projection_type": "RECTANGULAR",
				        "quality": "large",
				        "quality_label": "480p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=244&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=24591931&dur=778.240&lmt=1731452181812359&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgd25oUfpguC0mB2Yfa1upbCX3V1IF71dJ8jFWmyxqvz8CIQC1XIfGQXCbRE2lEqcNmsOnVC8w0COLqQXS3hpZ52_7yQ%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 854,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 226054,
				        "bitrate": 659217,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 21990599,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 480,
				        "index_range": {
				          "end": 2507,
				          "start": 700,
				        },
				        "init_range": {
				          "end": 699,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 397,
				        "last_modified": 2024-11-12T22:45:17.914Z,
				        "last_modified_ms": "1731451517914505",
				        "mime_type": "video/mp4; codecs="av01.0.04M.08"",
				        "projection_type": "RECTANGULAR",
				        "quality": "large",
				        "quality_label": "480p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=397&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=21990599&dur=778.240&lmt=1731451517914505&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4537434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhALnthGPfIBcUEFpzVfb7CMep4cPpXmHUS5J0DzIjn98oAiEAkown4ZuILgcs7oG3jjDrGlsAj2hvNDbKxsz2pt4L90U%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 854,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 134509,
				        "bitrate": 527873,
				        "content_length": 13085040,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 360,
				        "high_replication": true,
				        "index_range": {
				          "end": 2548,
				          "start": 741,
				        },
				        "init_range": {
				          "end": 740,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 134,
				        "last_modified": 2024-11-12T22:26:20.033Z,
				        "last_modified_ms": "1731450380033967",
				        "mime_type": "video/mp4; codecs="avc1.4d401e"",
				        "projection_type": "RECTANGULAR",
				        "quality": "medium",
				        "quality_label": "360p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=134&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=13085040&dur=778.240&lmt=1731450380033967&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAIR0h3jwBlyeSJ68cJyaGA7LQYxTj6de7balGCG31fI0AiEAkJTarpIRRm0FjZRWUzVb4PNz4nMoeIXsu4GsyrqN8jE%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 640,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 162064,
				        "bitrate": 411383,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 15765682,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 360,
				        "index_range": {
				          "end": 2726,
				          "start": 220,
				        },
				        "init_range": {
				          "end": 219,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 243,
				        "last_modified": 2024-11-12T22:56:23.777Z,
				        "last_modified_ms": "1731452183777865",
				        "mime_type": "video/webm; codecs="vp9"",
				        "projection_type": "RECTANGULAR",
				        "quality": "medium",
				        "quality_label": "360p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=243&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=15765682&dur=778.240&lmt=1731452183777865&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgEDi_VOQlIafmiKLNu4AqXNtISVh8KXIUCoamgeLeLGICIQCcwKzYoZXbdL9-QC7NpJrdc7BADt2IWWB2mFgyXWyEvQ%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 640,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 130528,
				        "bitrate": 366153,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 12697845,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 360,
				        "index_range": {
				          "end": 2507,
				          "start": 700,
				        },
				        "init_range": {
				          "end": 699,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 396,
				        "last_modified": 2024-11-12T22:35:55.330Z,
				        "last_modified_ms": "1731450955330900",
				        "mime_type": "video/mp4; codecs="av01.0.01M.08"",
				        "projection_type": "RECTANGULAR",
				        "quality": "medium",
				        "quality_label": "360p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=396&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=12697845&dur=778.240&lmt=1731450955330900&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4537434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAP42foTJlvByfXEX14LzkVXHm2PVEasAxV4hlgYmlpCAAiBuInlDQ48LbiLD2cxO5ttpHHRzhdt7cfH2U30xY-Rj7w%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 640,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 72170,
				        "bitrate": 214452,
				        "content_length": 7020743,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 240,
				        "index_range": {
				          "end": 2547,
				          "start": 740,
				        },
				        "init_range": {
				          "end": 739,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 133,
				        "last_modified": 2024-11-12T22:20:13.550Z,
				        "last_modified_ms": "1731450013550758",
				        "mime_type": "video/mp4; codecs="avc1.4d4015"",
				        "projection_type": "RECTANGULAR",
				        "quality": "small",
				        "quality_label": "240p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=133&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=7020743&dur=778.240&lmt=1731450013550758&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAI8AWcoZJFJxzXskP3P8Ssq1f07pGzI302BZfzTACX6JAiEAjUTFPeMirMA4nY3B1xluyg4xpucnnOudTD8oEU6tRDQ%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 426,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 90790,
				        "bitrate": 224334,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 8832133,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 240,
				        "index_range": {
				          "end": 2724,
				          "start": 219,
				        },
				        "init_range": {
				          "end": 218,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 242,
				        "last_modified": 2024-11-12T22:56:26.462Z,
				        "last_modified_ms": "1731452186462136",
				        "mime_type": "video/webm; codecs="vp9"",
				        "projection_type": "RECTANGULAR",
				        "quality": "small",
				        "quality_label": "240p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=242&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=8832133&dur=778.240&lmt=1731452186462136&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAKHDA_IwLQkjpymHAf0WyKwmZRxzZV-s8hGb3bmBl8_1AiEAwAqRRAQzOoUSl-y7GiivJajdw_TUW7TElsBxmYashUg%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 426,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 69845,
				        "bitrate": 197013,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 6794584,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 240,
				        "index_range": {
				          "end": 2507,
				          "start": 700,
				        },
				        "init_range": {
				          "end": 699,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 395,
				        "last_modified": 2024-11-12T22:35:59.419Z,
				        "last_modified_ms": "1731450959419502",
				        "mime_type": "video/mp4; codecs="av01.0.00M.08"",
				        "projection_type": "RECTANGULAR",
				        "quality": "small",
				        "quality_label": "240p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=395&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=6794584&dur=778.240&lmt=1731450959419502&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4537434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgIiwNvtRRwVDIg3cDYBCBVIwD-zZ0BndtNKDx0Ufzuy4CIHOWbK9qb-gwax-cIh0FzjmcoZNtiq81McAm00FROCB0&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 426,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 43284,
				        "bitrate": 101659,
				        "content_length": 4210710,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 144,
				        "index_range": {
				          "end": 2546,
				          "start": 739,
				        },
				        "init_range": {
				          "end": 738,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 160,
				        "last_modified": 2024-11-12T22:23:33.357Z,
				        "last_modified_ms": "1731450213357771",
				        "mime_type": "video/mp4; codecs="avc1.4d400c"",
				        "projection_type": "RECTANGULAR",
				        "quality": "tiny",
				        "quality_label": "144p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=160&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=4210710&dur=778.240&lmt=1731450213357771&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgBNN4AkYuUkWq9C4rreO_UPH4g6GxSkLJrXJtO0HhCZoCICpOAB2-vYKX4b-bqhl2l8_cKCNEZ7xt62R5Tpl3Soxz&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 256,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 65254,
				        "bitrate": 98130,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 6347971,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 144,
				        "index_range": {
				          "end": 2725,
				          "start": 219,
				        },
				        "init_range": {
				          "end": 218,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 278,
				        "last_modified": 2024-11-12T22:56:21.058Z,
				        "last_modified_ms": "1731452181058958",
				        "mime_type": "video/webm; codecs="vp9"",
				        "projection_type": "RECTANGULAR",
				        "quality": "tiny",
				        "quality_label": "144p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=278&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=6347971&dur=778.240&lmt=1731452181058958&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4535434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgKL9B5WkCyZHQ7LStk9Non6YXDCFG_CLs8azWpVvp1TsCIHGkBV_RHYnnlVqpuq8qyTenQ511vaE6FQtNnVHkEWiQ&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 256,
				      },
				      Format {
				        "approx_duration_ms": 778240,
				        "average_bitrate": 45336,
				        "bitrate": 93538,
				        "color_info": {
				          "matrix_coefficients": "BT709",
				          "primaries": "BT709",
				          "transfer_characteristics": "BT709",
				        },
				        "content_length": 4410342,
				        "fps": 25,
				        "has_audio": false,
				        "has_text": false,
				        "has_video": true,
				        "height": 144,
				        "index_range": {
				          "end": 2507,
				          "start": 700,
				        },
				        "init_range": {
				          "end": 699,
				          "start": 0,
				        },
				        "is_type_otf": false,
				        "itag": 394,
				        "last_modified": 2024-11-12T22:08:14.212Z,
				        "last_modified_ms": "1731449294212299",
				        "mime_type": "video/mp4; codecs="av01.0.00M.08"",
				        "projection_type": "RECTANGULAR",
				        "quality": "tiny",
				        "quality_label": "144p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=394&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=4410342&dur=778.240&lmt=1731449294212299&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4537434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAOO2MughGIIueEoMRkV-e3oEpqKX004C2-i3wDxYJ96ZAiBRn7RtLASKYA2HXMQx9xHeVV23A2u7Eq3-tdbPlS0dzA%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 256,
				      },
				      Format {
				        "approx_duration_ms": 778286,
				        "audio_channels": 2,
				        "audio_quality": "AUDIO_QUALITY_MEDIUM",
				        "audio_sample_rate": 44100,
				        "average_bitrate": 129478,
				        "bitrate": 130994,
				        "content_length": 12596458,
				        "has_audio": true,
				        "has_text": false,
				        "has_video": false,
				        "high_replication": true,
				        "index_range": {
				          "end": 1690,
				          "start": 723,
				        },
				        "init_range": {
				          "end": 722,
				          "start": 0,
				        },
				        "is_auto_dubbed": false,
				        "is_descriptive": false,
				        "is_drc": false,
				        "is_dubbed": false,
				        "is_original": true,
				        "is_secondary": false,
				        "is_type_otf": false,
				        "itag": 140,
				        "language": "en",
				        "last_modified": 2024-11-12T21:40:10.387Z,
				        "last_modified_ms": "1731447610387290",
				        "loudness_db": -1.21,
				        "mime_type": "audio/mp4; codecs="mp4a.40.2"",
				        "projection_type": "RECTANGULAR",
				        "quality": "tiny",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=audio%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=12596458&dur=778.286&lmt=1731447610387290&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4532434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAKrCx8YngmjntfcUef2SWrLuSMLN3P24TsEE521OYcXVAiAYWsNkjdB-CErupI-Iv4Fg11wQ7l_oViDcF9TPKkOHwg%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				      },
				      Format {
				        "approx_duration_ms": 778286,
				        "audio_channels": 2,
				        "audio_quality": "AUDIO_QUALITY_MEDIUM",
				        "audio_sample_rate": 44100,
				        "average_bitrate": 129478,
				        "bitrate": 130994,
				        "content_length": 12596458,
				        "has_audio": true,
				        "has_text": false,
				        "has_video": false,
				        "high_replication": true,
				        "index_range": {
				          "end": 1690,
				          "start": 723,
				        },
				        "init_range": {
				          "end": 722,
				          "start": 0,
				        },
				        "is_auto_dubbed": false,
				        "is_descriptive": false,
				        "is_drc": true,
				        "is_dubbed": false,
				        "is_original": false,
				        "is_secondary": false,
				        "is_type_otf": false,
				        "itag": 140,
				        "language": "en",
				        "last_modified": 2024-11-12T21:41:18.117Z,
				        "last_modified_ms": "1731447678117115",
				        "loudness_db": -1.21,
				        "mime_type": "audio/mp4; codecs="mp4a.40.2"",
				        "projection_type": "RECTANGULAR",
				        "quality": "tiny",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fmp4&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=12596458&dur=778.286&lmt=1731447678117115&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4532434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgaTqrbiQO8lrPbe-95L003NaUuLp6sk7toMsNbbJWKRkCIQCKyIKdx0ZhzZlPK5RI4kGEuklnNpsL-0D7J3_Mz6XSXw%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "xtags": "CggKA2RyYxIBMQ",
				      },
				      Format {
				        "approx_duration_ms": 778261,
				        "audio_channels": 2,
				        "audio_quality": "AUDIO_QUALITY_LOW",
				        "audio_sample_rate": 48000,
				        "average_bitrate": 51177,
				        "bitrate": 56788,
				        "content_length": 4978705,
				        "has_audio": true,
				        "has_text": false,
				        "has_video": false,
				        "index_range": {
				          "end": 1587,
				          "start": 266,
				        },
				        "init_range": {
				          "end": 265,
				          "start": 0,
				        },
				        "is_auto_dubbed": false,
				        "is_descriptive": false,
				        "is_drc": false,
				        "is_dubbed": false,
				        "is_original": true,
				        "is_secondary": false,
				        "is_type_otf": false,
				        "itag": 249,
				        "language": "en",
				        "last_modified": 2024-11-12T21:44:28.654Z,
				        "last_modified_ms": "1731447868654005",
				        "loudness_db": -1.21,
				        "mime_type": "audio/webm; codecs="opus"",
				        "projection_type": "RECTANGULAR",
				        "quality": "tiny",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=249&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=4978705&dur=778.261&lmt=1731447868654005&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4532434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgcP4VAGCdOzI9Tb45HIbXCARojgL9rb2JiUeniE4zHC8CIQC9d5Ri-c3_7avjaNLZuQDvewwpZ-Y9pVB08t2oulNIsw%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				      },
				      Format {
				        "approx_duration_ms": 778261,
				        "audio_channels": 2,
				        "audio_quality": "AUDIO_QUALITY_LOW",
				        "audio_sample_rate": 48000,
				        "average_bitrate": 51181,
				        "bitrate": 56787,
				        "content_length": 4979100,
				        "has_audio": true,
				        "has_text": false,
				        "has_video": false,
				        "index_range": {
				          "end": 1587,
				          "start": 266,
				        },
				        "init_range": {
				          "end": 265,
				          "start": 0,
				        },
				        "is_auto_dubbed": false,
				        "is_descriptive": false,
				        "is_drc": true,
				        "is_dubbed": false,
				        "is_original": false,
				        "is_secondary": false,
				        "is_type_otf": false,
				        "itag": 249,
				        "language": "en",
				        "last_modified": 2024-11-12T21:41:45.490Z,
				        "last_modified_ms": "1731447705490056",
				        "loudness_db": -1.21,
				        "mime_type": "audio/webm; codecs="opus"",
				        "projection_type": "RECTANGULAR",
				        "quality": "tiny",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=249&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=4979100&dur=778.261&lmt=1731447705490056&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4532434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgLNK8sFOj6q2EqYf00Jd4EmietoXqU3ekftNTZrCy3hYCIHoqhwLqrCZoBz0w_io_rlJGFVp1nam3O8qDZ-_2mb4F&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "xtags": "CggKA2RyYxIBMQ",
				      },
				      Format {
				        "approx_duration_ms": 778261,
				        "audio_channels": 2,
				        "audio_quality": "AUDIO_QUALITY_LOW",
				        "audio_sample_rate": 48000,
				        "average_bitrate": 63294,
				        "bitrate": 69136,
				        "content_length": 6157469,
				        "has_audio": true,
				        "has_text": false,
				        "has_video": false,
				        "index_range": {
				          "end": 1588,
				          "start": 266,
				        },
				        "init_range": {
				          "end": 265,
				          "start": 0,
				        },
				        "is_auto_dubbed": false,
				        "is_descriptive": false,
				        "is_drc": false,
				        "is_dubbed": false,
				        "is_original": true,
				        "is_secondary": false,
				        "is_type_otf": false,
				        "itag": 250,
				        "language": "en",
				        "last_modified": 2024-11-12T21:44:28.588Z,
				        "last_modified_ms": "1731447868588515",
				        "loudness_db": -1.21,
				        "mime_type": "audio/webm; codecs="opus"",
				        "projection_type": "RECTANGULAR",
				        "quality": "tiny",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=250&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=6157469&dur=778.261&lmt=1731447868588515&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4532434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhANcilRKd9QjTi0LhVqQx8UfJToJEVmj5MIpLVUv5hVF_AiEAhiA3pYI0sX9bWpJZrbxKGU_5OKTRJ9vBqajWlufCyy4%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				      },
				      Format {
				        "approx_duration_ms": 778261,
				        "audio_channels": 2,
				        "audio_quality": "AUDIO_QUALITY_LOW",
				        "audio_sample_rate": 48000,
				        "average_bitrate": 63298,
				        "bitrate": 69135,
				        "content_length": 6157820,
				        "has_audio": true,
				        "has_text": false,
				        "has_video": false,
				        "index_range": {
				          "end": 1588,
				          "start": 266,
				        },
				        "init_range": {
				          "end": 265,
				          "start": 0,
				        },
				        "is_auto_dubbed": false,
				        "is_descriptive": false,
				        "is_drc": true,
				        "is_dubbed": false,
				        "is_original": false,
				        "is_secondary": false,
				        "is_type_otf": false,
				        "itag": 250,
				        "language": "en",
				        "last_modified": 2024-11-12T21:41:45.618Z,
				        "last_modified_ms": "1731447705618556",
				        "loudness_db": -1.21,
				        "mime_type": "audio/webm; codecs="opus"",
				        "projection_type": "RECTANGULAR",
				        "quality": "tiny",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=250&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=6157820&dur=778.261&lmt=1731447705618556&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4532434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhALHwTbPVr88RR7z76L_upjyAtf-grm5RddyrvsgJsNYwAiAO9bXaiLpQ-zazQEGDb4EB8Q0soI9MJSpAC3Nf7-ITCQ%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "xtags": "CggKA2RyYxIBMQ",
				      },
				      Format {
				        "approx_duration_ms": 778261,
				        "audio_channels": 2,
				        "audio_quality": "AUDIO_QUALITY_MEDIUM",
				        "audio_sample_rate": 48000,
				        "average_bitrate": 113151,
				        "bitrate": 123379,
				        "content_length": 11007635,
				        "has_audio": true,
				        "has_text": false,
				        "has_video": false,
				        "index_range": {
				          "end": 1588,
				          "start": 266,
				        },
				        "init_range": {
				          "end": 265,
				          "start": 0,
				        },
				        "is_auto_dubbed": false,
				        "is_descriptive": false,
				        "is_drc": false,
				        "is_dubbed": false,
				        "is_original": true,
				        "is_secondary": false,
				        "is_type_otf": false,
				        "itag": 251,
				        "language": "en",
				        "last_modified": 2024-11-12T21:44:28.672Z,
				        "last_modified_ms": "1731447868672518",
				        "loudness_db": -1.21,
				        "mime_type": "audio/webm; codecs="opus"",
				        "projection_type": "RECTANGULAR",
				        "quality": "tiny",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=11007635&dur=778.261&lmt=1731447868672518&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4532434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAKbC08v5rNbdc1dOd5J59j_8i-2nKXC25weZm4Omu7w7AiAnkHHnUMnaepFsFJM9VMfxjByZz_zPxT4OwNM4Eq4z4w%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				      },
				      Format {
				        "approx_duration_ms": 778261,
				        "audio_channels": 2,
				        "audio_quality": "AUDIO_QUALITY_MEDIUM",
				        "audio_sample_rate": 48000,
				        "average_bitrate": 113163,
				        "bitrate": 123254,
				        "content_length": 11008837,
				        "has_audio": true,
				        "has_text": false,
				        "has_video": false,
				        "index_range": {
				          "end": 1588,
				          "start": 266,
				        },
				        "init_range": {
				          "end": 265,
				          "start": 0,
				        },
				        "is_auto_dubbed": false,
				        "is_descriptive": false,
				        "is_drc": true,
				        "is_dubbed": false,
				        "is_original": false,
				        "is_secondary": false,
				        "is_type_otf": false,
				        "itag": 251,
				        "language": "en",
				        "last_modified": 2024-11-12T21:41:45.495Z,
				        "last_modified_ms": "1731447705495033",
				        "loudness_db": -1.21,
				        "mime_type": "audio/webm; codecs="opus"",
				        "projection_type": "RECTANGULAR",
				        "quality": "tiny",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFTbVcQZy8BzpGjilNViFFQ_wkUarNYt8gIcghQe0FM8xe6Ybze-Rx2iCPKAjQheEFm1RqP4-W_X&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fwebm&ns=MsMqojYrPFy17O0ZzLoVwKsQ&rqh=1&gir=yes&clen=11008837&dur=778.261&lmt=1731447705495033&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4532434&n=I7qE99tuh_NCfCy&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgZVwePKqHHbgVhH4XQfBeFnfknbNxuKQhYMYE8HhB9SYCIQC9SUKJMSHwMQOhf3l6BGF98yIq263pgRYLHp8Jn-OrjA%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "xtags": "CggKA2RyYxIBMQ",
				      },
				    ],
				    "dash_manifest_url": undefined,
				    "expires": 2024-11-15T18:46:13.519Z,
				    "formats": [
				      Format {
				        "approx_duration_ms": 778286,
				        "audio_channels": 2,
				        "audio_quality": "AUDIO_QUALITY_LOW",
				        "audio_sample_rate": 44100,
				        "average_bitrate": 443087,
				        "bitrate": 443113,
				        "content_length": 43106105,
				        "fps": 25,
				        "has_audio": true,
				        "has_text": false,
				        "has_video": true,
				        "height": 360,
				        "is_auto_dubbed": false,
				        "is_descriptive": false,
				        "is_drc": false,
				        "is_dubbed": false,
				        "is_original": true,
				        "is_secondary": false,
				        "is_type_otf": false,
				        "itag": 18,
				        "language": "en",
				        "last_modified": 2024-11-12T22:35:59.707Z,
				        "last_modified_ms": "1731450959707716",
				        "mime_type": "video/mp4; codecs="avc1.42001E, mp4a.40.2"",
				        "projection_type": "RECTANGULAR",
				        "quality": "medium",
				        "quality_label": "360p",
				        "url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&bui=AQn3pFSs6RVByunyqkNeN5l-C_mNWM_h1ldAxj1rDHsVS5-9RJ0QMkDPoPTMvYSvALWpg3F2XUbO7gP0&spc=qtApAQnxAba4OI5JMvMJB8imywQJTBPWOppCv51YfJGOOnFZnzvoDeG4UMjliR0&vprv=1&svpuc=1&mime=video%2Fmp4&ns=QW5dR9kWhWp6x5gci8I7jX8Q&rqh=1&gir=yes&clen=43106105&ratebypass=yes&dur=778.286&lmt=1731450959707716&mt=1731673996&fvip=1&fexp=51299154%2C51312688%2C51326932&c=WEB&sefc=1&txp=4538434&n=qJ1ChdnJcPMAVZl&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhALkfRW1rmeExPpbijuyuSvV85dEYbOw8yojfEmpQ7QxlAiB5kK1Z3g5U1Irf_XEdriF8DEDfIPwLutY7PAR9f9sH4g%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				        "width": 640,
				      },
				    ],
				    "hls_manifest_url": undefined,
				    "server_abr_streaming_url": "https://rr2---sn-i3belne6.googlevideo.com/videoplayback?expire=1731696433&ei=0UI3Z4nyGO-z1d8P88agoAY&ip=91.186.218.35&id=o-AHnjLWkylgUttSPYJwjL_W8hO496Q8WuFo01jFb52lt3&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1731674833%2C&mh=w2&mm=31%2C29&mn=sn-i3belne6%2Csn-i3b7knsl&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2483750&spc=qtApAQnyAba4OI5JMvMJB8imywQITBPWOppCv51YfJGOOnFZnzvoDeG4UPjg&svpuc=1&ns=CRjShNbGQ8jnZvnnp7Av994Q&sabr=1&rqh=1&mt=1731673996&fvip=1&keepalive=yes&fexp=51299154%2C51312688%2C51326932&c=WEB&n=27_4tOYfmiPnXVU&sparams=expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Cspc%2Csvpuc%2Cns%2Csabr%2Crqh&sig=AJfQdSswRAIgasXeClMXkkkFhsr3WCJgaenB0arWi5LehL53H5R_XqcCIGU55hQpiB5rESQqLeUX9vqdP0CWdwIsNZ2VIWuZPsIe&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgCYkiVoJ1SU2tngsIbmOzKxqAlHCBX6pXszIyz2F9kCACIQC4iDi83i6Y6feihJWWkJcdJTnhkojPMcYRAAcmsBbncg%3D%3D",
				  },
				}
			`)
		},
		{
			timeout: 20000,
		},
	)
})
