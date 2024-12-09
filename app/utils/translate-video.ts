import path from 'node:path'
import {
	OUT_DIR,
	RENDER_ZIP_OUTPUT_FILE_NAME,
	TRANSLATE_VIDEO_ASR_RESULT_FILE,
	TRANSLATE_VIDEO_COMBINED_SRT_FILE,
	TRANSLATE_VIDEO_ID_PREFIX,
	TRANSLATE_VIDEO_INFO_FILE,
	TRANSLATE_VIDEO_RENDER_INFO_FILE,
	TRANSLATE_VIDEO_TRANSCRIPTS_FILE,
} from '~/constants'

export function getTranslateVideoFullId(id: string) {
	return `${TRANSLATE_VIDEO_ID_PREFIX}${id}`
}

export function getTranslateVideoOut(id: string) {
	const outDir = path.join(process.cwd(), OUT_DIR, getTranslateVideoFullId(id))

	const join = path.join.bind(null, outDir)

	return {
		outDir,
		get infoFile() {
			return join(TRANSLATE_VIDEO_INFO_FILE)
		},
		get transcriptsFile() {
			return join(TRANSLATE_VIDEO_TRANSCRIPTS_FILE)
		},
		get asrResultFile() {
			return join(TRANSLATE_VIDEO_ASR_RESULT_FILE)
		},
		get combinedSrtFile() {
			return join(TRANSLATE_VIDEO_COMBINED_SRT_FILE)
		},
		get renderInfoFile() {
			return join(TRANSLATE_VIDEO_RENDER_INFO_FILE)
		},
		get renderZipFile() {
			return join(RENDER_ZIP_OUTPUT_FILE_NAME)
		},
	}
}
