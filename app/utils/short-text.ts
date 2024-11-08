import path from 'node:path'
import { OUT_DIR, SHORT_TEXT_DIR, SHORT_TEXT_INPUT_FILE } from '~/constants'

export function getShortTextOut() {
	const outDir = path.join(process.cwd(), OUT_DIR)
	const shortTextDir = path.join(outDir, SHORT_TEXT_DIR)
	const shortTextInputFile = path.join(shortTextDir, SHORT_TEXT_INPUT_FILE)
	return {
		outDir,
		shortTextDir,
		shortTextInputFile,
	}
}
