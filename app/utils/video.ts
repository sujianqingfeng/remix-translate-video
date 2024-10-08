import path from 'path'
import {
  COMMENTS_FILE,
  OUT_DIR,
  VIDEO_FILE,
  TITLE_FILE,
  HTML_FILE
} from '~/constants'
import type { Comment, VideoComment } from '~/types'

export function getOut(videoId: string) {
  const outDir = path.join(process.cwd(), OUT_DIR, videoId)
  const commentFile = path.join(outDir, COMMENTS_FILE)
  const videoFile = path.join(outDir, VIDEO_FILE)
  const titleFile = path.join(outDir, TITLE_FILE)
  const htmlFile = path.join(outDir, HTML_FILE)

  return { outDir, commentFile, videoFile, titleFile, htmlFile }
}

export function getVideoComment(comments: Comment[]) {
  const videoComments: VideoComment[] = comments.map((comment, i) => {
    return {
      ...comment,
      durationInFrames: 30 * 10,
      form: 30 * 10 * i
    }
  })

  const totalDurationInFrames = 30 * 10 * comments.length

  return {
    videoComments,
    totalDurationInFrames
  }
}
