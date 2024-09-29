import path from 'path'
import { COMMENTS_FILE, OUT_DIR } from '~/constants'

export function getOut(videoId: string) {
  const outDir = path.join(process.cwd(), OUT_DIR, videoId)
  const commentFile = path.join(outDir, COMMENTS_FILE)

  return { outDir, commentFile }
}
