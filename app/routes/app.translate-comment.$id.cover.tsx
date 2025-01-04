import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import invariant from 'tiny-invariant'
import BackPrevious from '~/components/BackPrevious'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import { getTranslateCommentAndDownloadInfo } from '~/utils/translate-comment.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')
	const { translateComment, download } = await getTranslateCommentAndDownloadInfo(id)

	return { translateComment, download }
}

function splitTitle(title: string, isLandscape: boolean) {
	const segments: string[] = []
	let currentSegment = ''

	for (const char of title) {
		currentSegment += char
		if (currentSegment.length >= (isLandscape ? 20 : 12)) {
			segments.push(currentSegment)
			currentSegment = ''
		}
	}

	if (currentSegment) {
		segments.push(currentSegment)
	}

	return segments
}

function measureText(ctx: CanvasRenderingContext2D, text: string) {
	return ctx.measureText(text).width
}

function calculateFontSize(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, initialSize: number): number {
	let fontSize = initialSize
	ctx.font = `bold ${fontSize}px "PingFang SC"`
	let width = measureText(ctx, text)

	while (width > maxWidth && fontSize > 80) {
		fontSize -= 5
		ctx.font = `bold ${fontSize}px "PingFang SC"`
		width = measureText(ctx, text)
	}

	return fontSize
}

export default function TranslateCommentPage() {
	const { translateComment, download } = useLoaderData<typeof loader>()
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [headerText, setHeaderText] = useState('外网评论')
	const [titleText, setTitleText] = useState(() => translateComment.translatedTitle || '')
	const [isLandscape, setIsLandscape] = useState(false)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// Set canvas size based on orientation
		if (isLandscape) {
			canvas.width = 1920
			canvas.height = 1080
		} else {
			canvas.width = 1080
			canvas.height = 1920
		}

		// Fill background with gradient
		const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
		gradient.addColorStop(0, '#ffffff')
		gradient.addColorStop(1, '#f5f5f5')
		ctx.fillStyle = gradient
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		// Add a subtle pattern
		ctx.fillStyle = '#fafafa'
		for (let i = 0; i < canvas.width; i += 20) {
			for (let j = 0; j < canvas.height; j += 20) {
				ctx.fillRect(i, j, 1, 1)
			}
		}

		// Draw content
		const author = download.author || ''
		const viewCount = download.viewCountText || '0'

		// Set maximum width for text based on orientation
		const maxTextWidth = isLandscape ? canvas.width * 0.7 : canvas.width * 0.85

		// Calculate font sizes
		const headerFontSize = isLandscape ? 64 : 56
		const authorFontSize = isLandscape ? 48 : 48
		const titleFontSize = calculateFontSize(ctx, titleText, maxTextWidth, isLandscape ? 160 : 180)

		// Calculate text heights
		const titleLines = splitTitle(titleText, isLandscape)
		const lineHeight = titleFontSize * (isLandscape ? 1.1 : 1.2)
		const totalTitleHeight = titleLines.length * lineHeight

		// Adjust spacing based on orientation
		const headerToAuthorSpacing = isLandscape ? 20 : 10
		const authorToViewCountSpacing = isLandscape ? 20 : 30
		const viewCountToTitleSpacing = isLandscape ? 80 : 80

		const totalContentHeight = headerFontSize + headerToAuthorSpacing + authorFontSize + authorToViewCountSpacing + authorFontSize + viewCountToTitleSpacing + totalTitleHeight

		// Calculate vertical centering with offset for landscape mode
		const startY = (canvas.height - totalContentHeight) / 2 + (isLandscape ? 60 : 0)

		// Calculate text widths for centering the block
		ctx.font = `bold ${headerFontSize}px "PingFang SC"`
		const headerWidth = measureText(ctx, headerText)

		ctx.font = `${authorFontSize}px "PingFang SC"`
		const authorWidth = measureText(ctx, `@${author}`)
		const viewCountWidth = measureText(ctx, `播放量：${viewCount}`)

		ctx.font = `bold ${titleFontSize}px "PingFang SC"`
		const titleWidths = titleLines.map((line) => measureText(ctx, line))
		const maxWidth = Math.max(headerWidth, authorWidth, viewCountWidth, ...titleWidths)

		// Calculate left position to center the text block
		const startX = (canvas.width - maxWidth) / 2

		// Reset text alignment to left
		ctx.textAlign = 'left'

		// Draw decorative elements with adjusted size and position for landscape
		ctx.fillStyle = '#ee3f4d15'
		ctx.beginPath()
		const circleRadius = isLandscape ? 140 : 100
		const circleOffsetY = isLandscape ? -20 : -40
		ctx.arc(startX - 80, startY + circleOffsetY, circleRadius, 0, Math.PI * 2)
		ctx.fill()

		// Draw header text with shadow
		ctx.font = `bold ${headerFontSize}px "PingFang SC"`
		ctx.fillStyle = '#000000'
		ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
		ctx.shadowBlur = isLandscape ? 15 : 10
		ctx.shadowOffsetX = isLandscape ? 3 : 2
		ctx.shadowOffsetY = isLandscape ? 3 : 2
		ctx.fillText(headerText, startX, startY)

		// Reset shadow
		ctx.shadowColor = 'transparent'
		ctx.shadowBlur = 0
		ctx.shadowOffsetX = 0
		ctx.shadowOffsetY = 0

		// Draw author and view count with gradient
		const textGradient = ctx.createLinearGradient(startX, 0, startX + Math.max(authorWidth, viewCountWidth), 0)
		textGradient.addColorStop(0, '#1a1a1a')
		textGradient.addColorStop(1, '#4a4a4a')
		ctx.fillStyle = textGradient
		ctx.font = `${authorFontSize}px "PingFang SC"`

		const authorY = startY + headerFontSize + headerToAuthorSpacing
		const viewCountY = authorY + authorFontSize + authorToViewCountSpacing
		const titleStartY = viewCountY + authorFontSize + viewCountToTitleSpacing

		ctx.fillText(`@${author}`, startX, authorY)
		ctx.fillText(`播放量：${viewCount}`, startX, viewCountY)

		// Draw title lines with gradient and shadow
		const titleGradient = ctx.createLinearGradient(startX, 0, startX + Math.max(...titleWidths), 0)
		titleGradient.addColorStop(0, '#ee3f4d')
		titleGradient.addColorStop(1, '#ff6b81')

		ctx.font = `bold ${titleFontSize}px "PingFang SC"`
		ctx.fillStyle = titleGradient
		ctx.shadowColor = 'rgba(238, 63, 77, 0.15)'
		ctx.shadowBlur = isLandscape ? 20 : 15
		ctx.shadowOffsetX = isLandscape ? 4 : 3
		ctx.shadowOffsetY = isLandscape ? 4 : 3

		titleLines.forEach((line, index) => {
			ctx.fillText(line, startX, titleStartY + index * lineHeight)
		})
	}, [download.author, download.viewCountText, headerText, titleText, isLandscape])

	const handleDownload = () => {
		const canvas = canvasRef.current
		if (!canvas) return

		const link = document.createElement('a')
		link.download = `translate-video-${translateComment.id}-cover.png`
		link.href = canvas.toDataURL('image/png')
		link.click()
	}

	return (
		<div className="h-[calc(100vh-2rem)] overflow-hidden">
			<BackPrevious />

			<div className="mt-4 grid grid-cols-[2fr,1fr] gap-4 h-[calc(100vh-6rem)]">
				<div className="bg-card rounded-lg p-4 shadow-sm flex flex-col">
					<div className="flex-1 overflow-hidden flex items-center justify-center">
						<div className={`${isLandscape ? 'h-auto w-full max-h-full' : 'h-full w-auto'} relative`} style={{ aspectRatio: isLandscape ? '16/9' : '9/16' }}>
							<canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain border border-red-500" />
						</div>
					</div>
				</div>

				<div className="bg-card rounded-lg p-4 shadow-sm">
					<div className="space-y-6">
						<div>
							<Label>标题</Label>
							<Input className="mt-1.5" value={titleText} onChange={(e) => setTitleText(e.target.value)} placeholder="输入标题" />
						</div>

						<div>
							<Label>顶部文字</Label>
							<Input className="mt-1.5" value={headerText} onChange={(e) => setHeaderText(e.target.value)} placeholder="输入顶部文字" />
						</div>

						<div className="flex items-center justify-between">
							<Label>横屏模式</Label>
							<Switch checked={isLandscape} onCheckedChange={setIsLandscape} />
						</div>

						<div>
							<div className="text-sm text-muted-foreground">作者</div>
							<div className="mt-1">@{download.author}</div>
						</div>

						<div>
							<div className="text-sm text-muted-foreground">播放量</div>
							<div className="mt-1">{download.viewCountText}</div>
						</div>

						<Button onClick={handleDownload} className="w-full" size="lg">
							<Download className="mr-2 h-4 w-4" />
							下载封面
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
