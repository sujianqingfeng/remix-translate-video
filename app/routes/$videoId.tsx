import { Player } from '@remotion/player'
import { TranslateCommentVideo } from '../../src-remotion/TranslateCommentVideo'
import { Form, json, useLoaderData, useFetcher } from '@remix-run/react'
import type {
  LoaderFunctionArgs,
  MetaFunction,
  ActionFunctionArgs
} from '@remix-run/node'
import { getYoutubeComments } from '~/utils/youtube'
import { HttpsProxyAgent } from 'https-proxy-agent'
import invariant from 'tiny-invariant'
import fsp from 'fs/promises'
import { Languages, Trash } from 'lucide-react'
import { getOut, getVideoComment } from '~/utils/video'
import type { Comment } from '~/types'
import { Button } from '~/components/ui/button'

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

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get('intent')
  const commentContent = formData.get('commentContent')

  if (intent === 'delete' && commentContent) {
    const videoId = params.videoId
    invariant(videoId, 'videoId is required')

    const { commentFile } = getOut(videoId)

    // 读取现有评论
    const commentsStr = await fsp.readFile(commentFile, 'utf-8')
    const comments: Comment[] = JSON.parse(commentsStr)

    // 过滤掉要删除的评论
    const newComments = comments.filter(
      (comment) => comment.content !== commentContent
    )

    // 保存更新后的评论
    await fsp.writeFile(commentFile, JSON.stringify(newComments))

    return json({ success: true })
  }

  return json({ success: false })
}

export default function VideoCommentPage() {
  const { videoId, comments, title } = useLoaderData<typeof loader>()
  const fetcher = useFetcher()
  const { videoComments, totalDurationInFrames } = getVideoComment(comments)

  return (
    <div className="p-4 h-screen w-full flex gap-2">
      <div className="flex flex-col gap-2">
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

        <p>{title}</p>
        <p className="text-sm">https://www.youtube.com/watch?v={videoId}</p>
        <Form method="post" action="render">
          <Button type="submit">render</Button>
        </Form>
      </div>

      <div className="overflow-y-auto">
        <div className="text-xl p-2 flex justify-between items-center">
          <p className="text-sm">videoId : {videoId}</p>
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
                <p className="text-sm flex items-center justify-between gap-1">
                  {comment.author}

                  <fetcher.Form method="post">
                    <input type="hidden" name="intent" value="delete" />
                    <input
                      type="hidden"
                      name="commentContent"
                      value={comment.content}
                    />
                    <button
                      type="submit"
                      className="cursor-pointer hover:text-red-500"
                    >
                      <Trash size={16} />
                    </button>
                  </fetcher.Form>
                </p>
                <p className="text-md">{comment.content}</p>
                <p className="text-md">{comment.translatedContent}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
