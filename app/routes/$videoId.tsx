import { Player } from '@remotion/player'
import { TranslateCommentVideo } from '../../src-remotion/TranslateCommentVideo'
import { Form, json, useLoaderData } from '@remix-run/react'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { getYoutubeComments } from '~/utils/youtube'
import { HttpsProxyAgent } from 'https-proxy-agent'
import invariant from 'tiny-invariant'
import fsp from 'fs/promises'
import { Languages } from 'lucide-react'
import { getOut, getVideoComment } from '~/utils/video'
import type { Comment } from '~/types'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ]
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.videoId, 'videoId is required')

  const videoId = params.videoId

  const { outDir, commentFile, titleFile } = getOut(videoId)
  await fsp.mkdir(outDir, { recursive: true })

  let comments: Comment[] = []
  try {
    const str = await fsp.readFile(commentFile, 'utf-8')
    comments = JSON.parse(str)
  } catch (e) {
    console.log('no comments file')
  }

  if (comments.length === 0) {
    const { comments: youtubeComments, title } = await getYoutubeComments({
      videoId,
      agent: new HttpsProxyAgent(`http://127.0.0.1:7890`)
    })

    comments = youtubeComments
    await fsp.writeFile(commentFile, JSON.stringify(comments))
    await fsp.writeFile(
      titleFile,
      JSON.stringify({
        title
      })
    )
  }

  let title = 'Unknown Title'
  try {
    const titleStr = await fsp.readFile(titleFile, 'utf-8')
    const titleObj = JSON.parse(titleStr)
    title = titleObj.translatedTitle
  } catch (error) {
    console.log('no title file')
  }

  return json({ videoId, comments, title })
}

export default function VideoCommentPage() {
  const { videoId, comments, title } = useLoaderData<typeof loader>()
  const { videoComments, totalDurationInFrames } = getVideoComment(comments)

  return (
    <div className="p-4 h-full w-full flex">
      <div>
        <Player
          component={TranslateCommentVideo}
          inputProps={{ comments: videoComments, title }}
          durationInFrames={totalDurationInFrames}
          compositionWidth={1280}
          compositionHeight={720}
          fps={30}
          style={{
            width: 1280,
            height: 720
          }}
          controls
        />

        <Form method="post" action="render">
          <button type="submit">render</button>
        </Form>

        <p> {title}</p>

        <p>https://www.youtube.com/watch?v={videoId}</p>
      </div>

      <div>
        <div className="text-xl p-2 flex justify-between items-center">
          videoId : {videoId}
          <Form method="post" action="translate">
            <button type="submit" className="cursor-pointer">
              <Languages />
            </button>
          </Form>
        </div>

        <div>
          {comments.map((comment) => {
            return (
              <div key={comment.content} className="p-2">
                <p>{comment.author}</p>
                <p>{comment.content}</p>
                <p>{comment.translatedContent}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
