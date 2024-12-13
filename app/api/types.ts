import type { SubmissionResult } from '@conform-to/react'

export type SubmissionReply = {
	submissionReply?: SubmissionResult<string[]>
}

export type CreateNewDownloadActionData = {
	success: boolean
} & SubmissionReply
