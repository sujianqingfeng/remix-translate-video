import { Video, staticFile, AbsoluteFill, Sequence } from 'remotion'
import type { VideoComment } from '~/types'

export function TranslateCommentVideo({
  comments,
  title
}: {
  comments: VideoComment[]
  title: string
}) {
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
            {title}
          </div>
          <Video
            className="w-full"
            loop
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
                padding: '20px',
                height: '160px'
              }}
            >
              <p style={{ fontSize: '16px', lineHeight: '30px' }}>
                {comment.author}
              </p>
              <p style={{ fontSize: '16px', lineHeight: '30px' }}>
                {comment.content}
              </p>
              <p style={{ color: 'red', fontSize: '30px', lineHeight: '46px' }}>
                {comment.translatedContent}
              </p>
            </div>
          </Sequence>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
