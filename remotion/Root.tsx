import { Composition } from 'remotion'
import { MyComposition } from './Composition'
import '../app/tailwind.css'

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="MyComposition"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  )
}
