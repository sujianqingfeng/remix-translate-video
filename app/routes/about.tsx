import { Player } from '@remotion/player'
import { TranslateCommentVideo } from '../../src-remotion/TranslateCommentVideo'
import { Form } from '@remix-run/react'
import path from 'path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { webpackOverride } from '../../src-remotion/webpack-override'

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

export default function About() {
  return (
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
  )
}
