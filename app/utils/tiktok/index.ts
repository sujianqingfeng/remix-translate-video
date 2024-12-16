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

export async function tiktokGetComments({ url, proxy }: { url: string; proxy: string }) {
	return getCommentList(url, proxy)
}

export type { Comments } from './comment'
