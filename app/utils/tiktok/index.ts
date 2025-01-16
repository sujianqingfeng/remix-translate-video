import Tiktok from '@tobyg74/tiktok-api-dl'
import { PROXY } from '~/constants'
import { getCommentList } from './comment'

export async function tiktokDownloadInfo(url: string) {
	return Tiktok.Downloader(url, {
		version: 'v2',
		proxy: PROXY,
		showOriginalResponse: true,
	})
}

export async function tiktokGetComments({ url, proxy, cursor = 0 }: { url: string; proxy: string; cursor?: number }) {
	return getCommentList(url, proxy, cursor)
}

export type { Comments } from './comment'
