import Tiktok from '@tobyg74/tiktok-api-dl'
import { PROXY } from '~/constants'

export async function tiktokDownloadInfo(url: string) {
	return Tiktok.Downloader(url, {
		version: 'v1',
		proxy: PROXY,
		showOriginalResponse: true,
	})
}

export async function downloadTiktok(url: string) {
	const info = await tiktokDownloadInfo(url)
	console.log('🚀 ~ downloadTiktok ~ info:', info)
}
