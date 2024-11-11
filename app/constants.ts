export const OUT_DIR = 'out'
export const YOUTUBE_COMMENTS_FILE = 'comments.json'
export const YOUTUBE_INFO_FILE = 'info.json'
export const YOUTUBE_ORIGINAL_HTML_FILE = 'original.html'
export const YOUTUBE_DOWNLOAD_ID = import.meta.env.VITE_YOUTUBE_DOWNLOAD_ID
export const YOUTUBE_MAYBE_ORIGINAL_DOWNLOAD_FILES = [
	'original.webm',
	'original.mp4',
]
export const YOUTUBE_RE_XML_TRANSCRIPT =
	/<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g

export const SHORT_TEXT_DIR = 'short-text'
export const SHORT_TEXT_INPUT_FILE = 'input.json'

export const PROXY = 'http://127.0.0.1:7890'

export const USER_AGENT =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
