import { Video, staticFile, AbsoluteFill, Sequence } from 'remotion'

const comments = [
  {
    author: '@RickAstleyYT',
    content:
      '1 BILLION views for Never Gonna Give You Up!  Amazing, crazy, wonderful! Rick ♥️',
    form: 0,
    durationInFrames: 30 * 10
  },
  {
    author: '@comfyghost',
    content:
      'I looked up this video forgot that I did, clicked the tab and got rick rolled by my past self',
    form: 30 * 10,
    durationInFrames: 30 * 10
  }
]

export function TranslateCommentVideo() {
  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      <AbsoluteFill>
        <div style={{ display: 'flex', height: 'calc(100% - 160px)' }}>
          <div
            style={{
              width: '300px',
              flexShrink: 0,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'red',
              fontSize: '30px',
              padding: '20px'
            }}
          >
            fffffffffffffffffffff fffffffffffffffffffffff
          </div>
          <Video
            className="w-full"
            style={{ flex: 1, objectFit: 'contain' }}
            startFrom={0}
            crossOrigin="anonymous"
            src={staticFile('test.mp4')}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill>
        {comments.map((comment) => (
          <Sequence
            key={comment.author}
            from={comment.form}
            durationInFrames={comment.durationInFrames}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                padding: '20px'
              }}
            >
              <p style={{ fontSize: '16px', lineHeight: '16px' }}>
                {comment.content}
              </p>
              <p style={{ color: 'red', fontSize: '30px', lineHeight: '30px' }}>
                {comment.author}
              </p>
            </div>
          </Sequence>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
