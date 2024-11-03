import fetch, { RequestInit } from 'node-fetch'
import { Comment } from '~/types'
import fsp from 'node:fs/promises'
import { getOut } from './video'

export function findContinuation(html: string) {
  const index = html.indexOf('"targetId":"comments-section"')
  const startIndex = index - 400
  const token = html.slice(startIndex, index).match(/"token":\s*"([^"]+)"/)
  if (!token) {
    throw new Error('Failed to extract token')
  }
  return token[1]
}

export function getTitle(html: string) {
  const startIndex = html.indexOf('videoPrimaryInfoRenderer')
  const end = startIndex + 200
  const str = html.slice(startIndex, end)
  const titleMatch = str.match(/"text":"([^"]+)"/)
  const title = titleMatch ? titleMatch[1] : 'Unknown Title'
  return title
}

export async function getYoutubeComments({
  videoId,
  agent
}: {
  videoId: string
  agent?: RequestInit['agent']
}): Promise<{ title: string; comments: Comment[] }> {
  const url = `https://www.youtube.com/watch?v=${videoId}`

  const response = await fetch(url, {
    agent
  })
  const html = await response.text()

  const { htmlFile } = getOut(videoId)
  fsp.writeFile(htmlFile, html)

  const title = getTitle(html)
  const continuation = findContinuation(html)

  const apiUrl = 'https://www.youtube.com/youtubei/v1/next?prettyPrint=false'
  const requestBody = {
    context: {
      client: {
        hl: 'en',
        gl: 'SG',
        clientName: 'WEB',
        clientVersion: '2.20240926.00.00'
      },
      user: {
        lockedSafetyMode: false
      },
      request: {
        useSsl: true,
        internalExperimentFlags: [],
        consistencyTokenJars: []
      }
    },
    continuation
  }

  const apiResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-YouTube-Client-Name': '1',
      'X-YouTube-Client-Version': '2.20240926.00.00'
    },
    body: JSON.stringify(requestBody),
    agent
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiData = (await apiResponse.json()) as any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getContent = (comment: any) => {
    return comment.payload.commentEntityPayload?.properties?.content?.content
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAuthor = (comment: any) => {
    return comment.payload.commentEntityPayload?.properties?.authorButtonA11y
  }

  let commentMutations =
    apiData.frameworkUpdates.entityBatchUpdate.mutations.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => item.type === 'ENTITY_MUTATION_TYPE_REPLACE'
    )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commentMutations = commentMutations.filter((comment: any) => {
    return getAuthor(comment) && getContent(comment)
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const comments = commentMutations.map((comment: any) => {
    return {
      content: getContent(comment),
      author: getAuthor(comment)
    }
  })

  return { comments, title }
}
