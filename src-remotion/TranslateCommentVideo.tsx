import { Video, staticFile, AbsoluteFill, Sequence } from 'remotion'

export function TranslateCommentVideo() {
  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      <AbsoluteFill>
        <Video
          className="w-full"
          style={{ width: '200px' }}
          startFrom={0}
          crossOrigin="anonymous"
          src={staticFile('test.mp4')}
        />
      </AbsoluteFill>

      <AbsoluteFill>
        <Sequence from={0} durationInFrames={30 * 10}>
          <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
            <p>ffff</p>
            <p>ffff</p>
            <p className="text-red-500">xxx</p>
          </div>
        </Sequence>

        <Sequence from={30 * 10}>
          <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
            <p>xxx</p>
            <p>xxx</p>
            <p className="text-red-500">xxx</p>
          </div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
