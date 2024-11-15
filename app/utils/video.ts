import { execCommand } from './exec'

export function sliceVideo({
	videoPath,
	start,
	end,
	outputPath,
}: {
	videoPath: string
	start: number
	end: number
	outputPath: string
}) {
	return execCommand(
		`ffmpeg -ss ${start} -i ${videoPath} -t ${end} -c copy ${outputPath}`,
	)
}
