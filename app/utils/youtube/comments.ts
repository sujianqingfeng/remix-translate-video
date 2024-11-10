import fetch, { type RequestInit } from 'node-fetch'
import { USER_AGENT } from '~/constants'
import type { YoutubeComment } from '~/types'

export function findContinuation(html: string) {
	const index = html.indexOf('"targetId":"comments-section"')
	const startIndex = index - 400
	const token = html.slice(startIndex, index).match(/"token":\s*"([^"]+)"/)
	if (!token) {
		throw new Error('Failed to extract token')
	}
	return token[1]
}

export async function fetchYoutubeComments({
	agent,
	html,
}: {
	agent?: RequestInit['agent']
	html: string
}): Promise<YoutubeComment[]> {
	const continuation = findContinuation(html)

	const apiUrl = 'https://www.youtube.com/youtubei/v1/next?prettyPrint=false'
	const requestBody = {
		context: {
			client: {
				hl: 'en',
				gl: 'SG',
				clientName: 'WEB',
				clientVersion: '2.20240926.00.00',
			},
			user: {
				lockedSafetyMode: false,
			},
			request: {
				useSsl: true,
				internalExperimentFlags: [],
				consistencyTokenJars: [],
			},
		},
		continuation,
	}

	const apiResponse = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-YouTube-Client-Name': '1',
			'X-YouTube-Client-Version': '2.20240926.00.00',
			'User-Agent': USER_AGENT,
		},
		body: JSON.stringify(requestBody),
		agent,
	})

	const apiData = (await apiResponse.json()) as any

	const getContent = (comment: any) => {
		return comment.payload.commentEntityPayload?.properties?.content?.content
	}
	const getAuthor = (comment: any) => {
		return comment.payload.commentEntityPayload?.properties?.authorButtonA11y
	}

	const getPublishedTime = (comment: any) => {
		return comment.payload.commentEntityPayload?.properties?.publishedTime
	}

	const getLikes = (comment: any) => {
		return comment.payload.commentEntityPayload?.toolbar?.likeCountLiked
	}

	const getAuthorThumbnail = (comment: any) => {
		return comment.payload.commentEntityPayload?.author?.avatarThumbnailUrl
	}

	let commentMutations =
		apiData.frameworkUpdates.entityBatchUpdate.mutations.filter(
			(item: any) => item.type === 'ENTITY_MUTATION_TYPE_REPLACE',
		)

	commentMutations = commentMutations.filter((comment: any) => {
		return getAuthor(comment) && getContent(comment)
	})

	const comments = commentMutations.map((comment: any) => {
		return {
			content: getContent(comment),
			author: getAuthor(comment),
			likes: getLikes(comment),
			authorThumbnail: getAuthorThumbnail(comment),
			publishedTime: getPublishedTime(comment),
		}
	})

	return comments
}
