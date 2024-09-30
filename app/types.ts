export type Comment = {
  content: string
  author: string
  translatedContent?: string
}

export type VideoComment = {
  author: string
  content: string
  translatedContent?: string
  durationInFrames: number
  form: number
}
