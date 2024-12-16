import { generate_rc4_bb_str } from './a-bogus'

export function getUserAgent(): string {
	return 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
	// return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
}

export async function getMsToken(): Promise<string> {
	return '7366941338308609569'
}

export async function getXBogus(url: string, userAgent: string): Promise<string> {
	const windowEnvStr = '1920,1080,1,24,1920,1080,1920,1080,1920,1080'
	const urlParams = new URL(url).search.substring(1)
	return generate_rc4_bb_str(urlParams, userAgent, windowEnvStr)
}
