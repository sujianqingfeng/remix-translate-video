import { Player } from '@remotion/player'
import { TranslateCommentVideo } from '../../src-remotion/TranslateCommentVideo'
import { Form, json, useLoaderData } from '@remix-run/react'
import path from 'path'
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction
} from '@remix-run/node'
import { webpackOverride } from '../../src-remotion/webpack-override'
import { getYoutubeComments } from '~/utils/youtube-comment'
import { HttpsProxyAgent } from 'https-proxy-agent'
import invariant from 'tiny-invariant'
import fsp from 'fs/promises'
import { Languages } from 'lucide-react'
import { getOut } from '~/utils/video'
import type { Comment } from '~/types'
export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ]
}

export async function action(_: ActionFunctionArgs) {
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
          inputProps: { text: 'World' }
        })

        await renderMedia({
          codec: 'h264',
          composition,
          serveUrl: bundled,
          inputProps: { text: 'World' },
          outputLocation: `out/${composition.id}.mp4`
        })
      }
    )
  })

  return null // Add this line to return null
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.videoId, 'videoId is required')

  const videoId = params.videoId

  const { outDir, commentFile } = getOut(videoId)
  await fsp.mkdir(outDir, { recursive: true })

  let comments: Comment[] = []
  try {
    const str = await fsp.readFile(commentFile, 'utf-8')
    comments = JSON.parse(str)
  } catch (e) {
    console.log('no comments file')
  }

  if (comments.length === 0) {
    comments = await getYoutubeComments({
      videoId,
      agent: new HttpsProxyAgent(`http://127.0.0.1:7890`)
    })

    await fsp.writeFile(commentFile, JSON.stringify(comments))
  }
  return json({ videoId, comments })
}

export default function VideoCommentPage() {
  const { videoId, comments } = useLoaderData<typeof loader>()
  return (
    <div className="p-4 h-full w-full flex">
      <div>
        <Player
          component={TranslateCommentVideo}
          inputProps={{ text: 'World' }}
          durationInFrames={30 * 20}
          compositionWidth={1280}
          compositionHeight={720}
          fps={30}
          style={{
            width: 1280,
            height: 720
          }}
          controls
        />

        <Form method="post">
          <button type="submit">render</button>
        </Form>
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
