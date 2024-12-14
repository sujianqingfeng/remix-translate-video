import Tiktok from '@tobyg74/tiktok-api-dl'
import { PROXY } from '~/constants'

export async function tiktokDownloadInfo(url: string) {
	return Tiktok.Downloader(url, {
		version: 'v2',
		proxy: PROXY,
		showOriginalResponse: true,
	})
}

export async function tiktokGetComments(url: string, commentLimit = 20) {
	return Tiktok.GetComments(url, {
		commentLimit,
		proxy: PROXY,
	})
}
