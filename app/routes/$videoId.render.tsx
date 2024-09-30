import path from 'path'
import { webpackOverride } from '../../src-remotion/webpack-override'
import invariant from 'tiny-invariant'
import fsp from 'fs/promises'
import { ActionFunctionArgs } from '@remix-run/node'
import { getOut, getVideoComment } from '~/utils/video'
import type { Comment } from '~/types'

export async function action({ params }: ActionFunctionArgs) {
  invariant(params.videoId, 'videoId is required')

  const { commentFile, titleFile } = getOut(params.videoId)
  const str = await fsp.readFile(commentFile, 'utf-8')
  const comments: Comment[] = JSON.parse(str)

  const titleStr = await fsp.readFile(titleFile, 'utf-8')
  const title = JSON.parse(titleStr).translatedTitle

  const { videoComments, totalDurationInFrames } = getVideoComment(comments)

  const p = path.join(process.cwd(), 'src-remotion', 'index.ts')

  import('@remotion/bundler').then(async ({ bundle }) => {
    const bundled = await bundle({
      entryPoint: p,
      webpackOverride
    })

    import('@remotion/renderer').then(
      async ({ renderMedia, selectComposition }) => {
        const composition = await selectComposition({
          serveUrl: bundled,
          id: 'TranslateCommentVideo',
          inputProps: { comments: videoComments, title }
        })

        composition.durationInFrames = totalDurationInFrames

        await renderMedia({
          codec: 'h264',
          composition,
          serveUrl: bundled,
          inputProps: { comments: videoComments, title },
          outputLocation: `out/${params.videoId}/${composition.id}.mp4`
        })
      }
    )
  })

  return null // Add this line to return null
}
