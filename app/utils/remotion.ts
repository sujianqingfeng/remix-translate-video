import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import type { RenderMediaOnProgress } from '@remotion/renderer'
import { throttle } from './timer'

export const bundleOnProgress = throttle(
	(progress: number) => {
		console.log(`Webpack bundling progress: ${progress}%`)
	},
	1000,
	{ trailing: true },
)

export const renderOnProgress: RenderMediaOnProgress = ({ progress }) => {
	console.log(`Rendering is ${progress * 100}% complete`)
}

export const throttleRenderOnProgress = throttle(renderOnProgress, 2000, {
	trailing: true,
})

export async function cleanupRemotionTempFiles() {
	const tempDir = path.join(os.tmpdir(), 'remotion-webpack-bundle-*')
	try {
		const files = await fsp.readdir(os.tmpdir())
		for (const file of files) {
			if (file.startsWith('remotion-webpack-bundle-')) {
				const fullPath = path.join(os.tmpdir(), file)
				await fsp.rm(fullPath, { recursive: true, force: true })
			}
		}
	} catch (error) {
		console.error('清理Remotion临时文件失败:', error)
	}
}
