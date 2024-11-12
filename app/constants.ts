import path from 'node:path'

export const PUBLIC_DIR = path.join(process.cwd(), 'public')

export const OUT_DIR = 'out'
export const YOUTUBE_COMMENTS_FILE = 'comments.json'
export const YOUTUBE_INFO_FILE = 'info.json'
export const YOUTUBE_ORIGINAL_HTML_FILE = 'original.html'
export const YOUTUBE_MAYBE_ORIGINAL_DOWNLOAD_FILE_SUFFIXES = ['.webm', '.mp4']
export const YOUTUBE_NAME_FILE = 'original'

export const YOUTUBE_RE_XML_TRANSCRIPT =
	/<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g

export const SHORT_TEXT_INFO_FILE = 'info.json'
export const SHORT_TEXT_AUDIO_FILE = 'audio.webm'
export const SHORT_TEXT_TRANSCRIPTS_FILE = 'audio.webm.json'

export const PROXY = 'http://127.0.0.1:7890'
export const USER_AGENT =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
