import { Player } from '@remotion/player'
import { MyComposition } from '../../remotion/Composition'
import { Form } from '@remix-run/react'
import path from 'path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { webpackOverride } from '../../remotion/webpack-override'

export async function action(_: ActionFunctionArgs) {
  const p = path.join(process.cwd(), 'remotion', 'index.ts')

  import('@remotion/bundler').then(async ({ bundle }) => {
    const bundled = await bundle({
      entryPoint: p,
      webpackOverride
    })

    import('@remotion/renderer').then(
      async ({ renderMedia, selectComposition }) => {
        const composition = await selectComposition({
          serveUrl: bundled,
          id: 'MyComposition',
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
        component={MyComposition}
        inputProps={{ text: 'World' }}
        durationInFrames={120}
        compositionWidth={1920}
        compositionHeight={1080}
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
