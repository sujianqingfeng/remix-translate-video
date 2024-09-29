import { ActionFunctionArgs, redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getOut } from '~/utils/video'
import { translate } from '~/utils/translate'
import fsp from 'fs/promises'
import type { Comment } from '~/types'

export async function action({ params }: ActionFunctionArgs) {
  invariant(params.videoId, 'missing videoId')

  const videoId = params.videoId

  const { commentFile } = getOut(videoId)

  const commentStr = await fsp.readFile(commentFile, 'utf-8')
  const comments: Comment[] = JSON.parse(commentStr)

  const translatedComments = await Promise.all(
    comments.map(async (comment) => {
      const translated = await translate(comment.content)
      comment.translatedContent = translated
      return comment
    })
  )

  await fsp.writeFile(commentFile, JSON.stringify(translatedComments, null, 2))

  return redirect(`/${videoId}`)
}
