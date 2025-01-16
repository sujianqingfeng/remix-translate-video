import qs from 'node:querystring'
import { fetch } from 'undici'
import { ProxyAgent } from 'undici'
import { getMsToken, getUserAgent, getXBogus } from './utils'

type User = {
	uid: string
	avatarThumb: string[]
	nickname: string
	username: string
	isVerified: boolean
}

export type Comments = {
	cid: string
	text: string
	commentLanguage: string
	createTime: number
	likeCount: number
	isAuthorLiked: boolean
	isCommentTranslatable: boolean
	replyCommentTotal: number
	replyComment: Comments[] | null
	user: User
	url: string
}

const commentListHeaders = {
	'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
	'sec-ch-ua-mobile': '?0',
	'User-Agent': getUserAgent(),
	'sec-ch-ua-platform': '"macOS"',
	Accept: '*/*',
	'Sec-Fetch-Site': 'same-origin',
	'Sec-Fetch-Mode': 'cors',
	'Sec-Fetch-Dest': 'empty',
	'Accept-Language': 'en-US,en;q=0.9',
}

export async function getCommentList(reqUrl: string, proxyUrl: string, cursor = 0): Promise<Comments[]> {
	// 从URL中提取aweme_id
	const awemeId = new URL(reqUrl).pathname.split('/').pop()
	const msToken = await getMsToken()

	const params = {
		WebIdLastTime: Date.now(),
		aid: '1988',
		app_language: 'en',
		app_name: 'tiktok_web',
		aweme_id: awemeId,
		browser_language: 'en-US',
		browser_name: 'Mozilla',
		browser_online: true,
		browser_platform: 'MacIntel',
		browser_version: '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
		channel: 'tiktok_web',
		cookie_enabled: true,
		count: 20,
		cursor,
		device_id: '7436735084885050896',
		os: 'mac',
		region: 'US',
		screen_height: 1890,
		screen_width: 3360,
		tz_name: 'Asia/Shanghai',
		user_is_login: true,
		verifyFp: 'verify_m3fuay8u_z0hW8b32_349R_45Cg_8Jjh_vQzTMJKO6Ve2',
		webcast_language: 'en',
		msToken: msToken,
	}

	let commentUrl = `https://www.tiktok.com/api/comment/list/?${qs.stringify(params)}`

	// 获取X-Bogus
	const xBogus = await getXBogus(commentUrl, commentListHeaders['User-Agent'])
	commentUrl = `${commentUrl}&X-Bogus=${xBogus}&_signature=_02B4Z6wo00001vdqg2AAAIDBpZWje0cEdTb3aofAANqS4d`
	// 发送请求
	const response = await fetch(commentUrl, {
		headers: commentListHeaders,
		dispatcher: new ProxyAgent({
			uri: proxyUrl,
		}),
		signal: AbortSignal.timeout(3000),
	})

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	const data = (await response.json()) as any

	if (!data) {
		throw new Error('Failed to fetch comments')
	}

	const comments: Comments[] = []

	for (const comment of data.comments) {
		const formattedComment: Comments = {
			cid: comment.cid,
			text: comment.text,
			commentLanguage: comment.comment_language,
			createTime: comment.create_time,
			likeCount: comment.digg_count,
			isAuthorLiked: comment.is_author_digged,
			isCommentTranslatable: comment.is_comment_translatable,
			replyCommentTotal: comment.reply_comment_total,
			user: {
				uid: comment.user.uid,
				avatarThumb: comment.user.avatar_thumb.url_list,
				nickname: comment.user.nickname,
				username: comment.user.unique_id,
				isVerified: comment.user.custom_verify !== '',
			},
			url: comment.share_info?.url || '',
			replyComment: [],
		}

		if (comment.reply_comment !== null) {
			for (const reply of comment.reply_comment) {
				formattedComment.replyComment?.push({
					cid: reply.cid,
					text: reply.text,
					commentLanguage: reply.comment_language,
					createTime: reply.create_time,
					likeCount: reply.digg_count,
					isAuthorLiked: reply.is_author_digged,
					isCommentTranslatable: reply.is_comment_translatable,
					replyCommentTotal: reply.reply_comment_total,
					user: {
						uid: reply.user.uid,
						avatarThumb: reply.user.avatar_thumb.url_list,
						nickname: reply.user.nickname,
						username: reply.user.unique_id,
						isVerified: reply.user.custom_verify !== '',
					},
					url: reply.share_info?.url || '',
					replyComment: [],
				})
			}
		}
		comments.push(formattedComment)
	}

	return comments
}
