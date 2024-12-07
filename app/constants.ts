import path from 'node:path'

export const PUBLIC_DIR = path.join(process.cwd(), 'public')

export const BUNDLE_DIR = 'bundle'
export const RENDER_INFO_FILE = 'render-info.json'

export const OUT_DIR = 'out'
export const YOUTUBE_COMMENTS_FILE = 'comments.json'
export const YOUTUBE_INFO_FILE = 'info.json'
export const YOUTUBE_ORIGINAL_HTML_FILE = 'original.html'
export const YOUTUBE_MAYBE_ORIGINAL_DOWNLOAD_FILE_SUFFIXES = ['.webm', '.mp4']
export const YOUTUBE_NAME_FILE = 'original'

export const YOUTUBE_COMMENT_ID_PREFIX = 'yc-'

export const YOUTUBE_RE_XML_TRANSCRIPT = /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g

export const SHORT_TEXT_INFO_FILE = 'info.json'
export const SHORT_TEXT_AUDIO_FILE = 'short-text.webm'
export const SHORT_TEXT_AUDIO_TRANSCRIPTS_FILE = 'short-text.webm.json'
export const SHORT_TEXT_SENTENCES_FILE = 'sentences.json'
export const SHORT_TEXT_COVER_FILE = 'cover.png'
export const SHORT_TEXT_PUBLIC_COVER_FILE = 'short-text-cover.png'
export const SHORT_TEXT_PUBLIC_BG_FILE = 'short-text-bg.png'

export const TRANSLATE_VIDEO_ID_PREFIX = 'tv-'
export const TRANSLATE_VIDEO_INFO_FILE = 'info.json'
export const TRANSLATE_VIDEO_ORIGINAL_HTML_FILE = 'original.html'
export const TRANSLATE_VIDEO_TRANSCRIPTS_FILE = 'tv-transcript.json'
export const TRANSLATE_VIDEO_ASR_RESULT_FILE = 'audio.wav.json'

export const PROXY = 'http://127.0.0.1:7890'
export const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'

export const SILICON_FLOW_API_KEY = process.env.SILICON_FLOW_API_KEY

export const REMOTION_ZIP_BUNDLE_DIR_NAME = 'bundle'
export const REMOTION_ZIP_RENDER_INFO_FILE = 'render-info.json'

export const REMOTION_ZIP_OUTPUT_FILE_NAME = 'render.zip'
