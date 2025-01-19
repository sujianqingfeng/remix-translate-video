import type { LoaderFunctionArgs } from '@remix-run/node'
import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { eq } from 'drizzle-orm'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { db, schema } from '~/lib/drizzle'
import { LandscapeGeneralComment } from '~/remotion/general-comment/LandscapeGeneralComment'
import { PortraitGeneralComment } from '~/remotion/general-comment/PortraitGeneralComment'
import { VerticalGeneralComment } from '~/remotion/general-comment/VerticalGeneralComment'
import type { GeneralCommentTypeTextInfo } from '~/types'
import { type VideoMode, calculateDurations, getVideoConfig } from '~/utils/general-comment'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params

	if (!id) {
		throw new Error('Comment ID is required')
	}

	const comment = await db.query.generalComments.findFirst({
		where: eq(schema.generalComments.id, id),
	})

	if (!comment) {
		throw new Error('Comment not found')
	}

	return { comment }
}

export default function AppGeneralCommentRender() {
	const { comment } = useLoaderData<typeof loader>()
	const typeInfo = comment.typeInfo as GeneralCommentTypeTextInfo
	const [mode, setMode] = useState<VideoMode>('landscape')
	const durations = calculateDurations(comment)
	const videoConfig = getVideoConfig(mode)
	const renderFetcher = useFetcher<{ error?: string }>()

	const getVideoComponent = () => {
		switch (mode) {
			case 'portrait':
				return PortraitGeneralComment
			case 'vertical':
				return VerticalGeneralComment
			default:
				return LandscapeGeneralComment
		}
	}

	const isRendering = renderFetcher.state !== 'idle'

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Render Configuration</h1>
					<p className="mt-2 text-gray-600">Configure rendering settings for your general comment video</p>
				</div>

				{/* Video Preview */}
				<div className="mb-8">
					<Card>
						<CardHeader>
							<CardTitle>Video Preview</CardTitle>
							<CardDescription>Preview how your video will look</CardDescription>
						</CardHeader>
						<CardContent>
							<div className={`bg-black rounded-lg overflow-hidden mx-auto ${mode === 'landscape' ? 'max-w-5xl aspect-video' : 'max-w-md aspect-[9/16]'}`}>
								<Player
									component={getVideoComponent()}
									durationInFrames={durations.totalDurationInSeconds * durations.fps}
									fps={durations.fps}
									compositionWidth={videoConfig.width}
									compositionHeight={videoConfig.height}
									style={{
										width: '100%',
										height: '100%',
									}}
									controls
									inputProps={{
										title: typeInfo.title,
										content: typeInfo.content,
										contentZh: typeInfo.contentZh,
										author: comment.author,
										images: typeInfo.images,
										comments: comment.comments || [],
										fps: durations.fps,
										coverDurationInSeconds: durations.coverDurationInSeconds,
										contentDurationInSeconds: durations.contentDurationInSeconds,
										commentDurations: durations.commentDurations,
									}}
								/>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Settings */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Content Preview */}
					<Card>
						<CardHeader>
							<CardTitle>Content Preview</CardTitle>
							<CardDescription>Review your content before rendering</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Author Info */}
							<div className="flex items-center gap-4">
								<div className="flex-1">
									<h3 className="font-medium text-gray-900">{typeInfo.title || 'Untitled'}</h3>
									<p className="text-sm text-gray-600">By {comment.author}</p>
								</div>
								<div>
									<span
										className="px-2.5 py-1 rounded-full text-xs font-medium capitalize"
										style={{
											backgroundColor: comment.source === 'twitter' ? '#1DA1F2' : comment.source === 'youtube' ? '#FF0000' : '#6B7280',
											color: comment.source === 'tiktok' ? 'white' : 'inherit',
										}}
									>
										{comment.source}
									</span>
								</div>
							</div>

							{/* Content */}
							<div className="space-y-4">
								<div className="bg-gray-50 rounded-lg p-4">
									<p className="text-gray-900 whitespace-pre-wrap">{typeInfo.content}</p>
								</div>
								<div className="flex justify-end">
									<Form action="translate" method="post">
										<Button type="submit" variant="outline" size="sm" disabled={!typeInfo.content || !!typeInfo.contentZh}>
											Translate
										</Button>
									</Form>
								</div>
								{typeInfo.contentZh && (
									<div className="bg-gray-50 rounded-lg p-4">
										<p className="text-gray-600 whitespace-pre-wrap">{typeInfo.contentZh}</p>
									</div>
								)}
							</div>

							{/* Images */}
							{typeInfo.images && typeInfo.images.length > 0 && (
								<div className="grid grid-cols-3 gap-2">
									{typeInfo.images.map((image) => (
										<img key={image} src={image} alt="" className="aspect-square w-full object-cover rounded-lg" />
									))}
								</div>
							)}

							{/* Comments */}
							{comment.comments && comment.comments.length > 0 && (
								<div className="border-t pt-4">
									<div className="flex items-center justify-between mb-4">
										<h4 className="text-sm font-medium text-gray-900">Comments ({comment.comments.length})</h4>
										<Form action="translate-comments" method="post">
											<Button type="submit" variant="outline" size="sm" disabled={comment.comments.every((c) => !!c.translatedContent)}>
												Translate Comments
											</Button>
										</Form>
									</div>
									<div className="space-y-4 max-h-60 overflow-y-auto">
										{comment.comments.map((c, i) => (
											<div key={`${c.author}-${c.publishedTime}-${i}`} className="flex gap-3">
												{c.authorThumbnail && <img src={c.authorThumbnail} alt={c.author} className="w-8 h-8 rounded-full shrink-0" />}
												<div className="flex-1">
													<div className="flex items-center gap-2">
														<span className="font-medium text-sm text-gray-900">{c.author}</span>
														<span className="text-xs text-gray-500">•</span>
														<span className="text-xs text-gray-500">👍 {c.likes}</span>
													</div>
													<p className="text-sm text-gray-700 mt-1">{c.content}</p>
													{c.translatedContent && <p className="text-sm text-gray-500 mt-1">{c.translatedContent}</p>}
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Render Settings Form */}
					<renderFetcher.Form action="render" method="post">
						<Card>
							<CardHeader>
								<CardTitle>Video Settings</CardTitle>
								<CardDescription>Configure how your video will be rendered</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Mode Selection */}
								<div className="space-y-3">
									<Label>Video Mode</Label>
									<div className="grid grid-cols-3 gap-4">
										<button
											type="button"
											className={`relative aspect-video cursor-pointer rounded-lg border-2 ${mode === 'landscape' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
											onClick={() => setMode('landscape')}
											onKeyDown={(e) => e.key === 'Enter' && setMode('landscape')}
											disabled={isRendering}
										>
											<input type="radio" name="mode" value="landscape" className="sr-only" checked={mode === 'landscape'} onChange={() => {}} />
											<div className="absolute inset-0 flex items-center justify-center">
												<span className="text-xs font-medium">16:9</span>
											</div>
										</button>
										<button
											type="button"
											className={`relative aspect-[9/16] cursor-pointer rounded-lg border-2 ${mode === 'portrait' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
											onClick={() => setMode('portrait')}
											onKeyDown={(e) => e.key === 'Enter' && setMode('portrait')}
											disabled={isRendering}
										>
											<input type="radio" name="mode" value="portrait" className="sr-only" checked={mode === 'portrait'} onChange={() => {}} />
											<div className="absolute inset-0 flex items-center justify-center">
												<span className="text-xs font-medium">9:16</span>
											</div>
										</button>
										<button
											type="button"
											className={`relative aspect-[4/5] cursor-pointer rounded-lg border-2 ${mode === 'vertical' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
											onClick={() => setMode('vertical')}
											onKeyDown={(e) => e.key === 'Enter' && setMode('vertical')}
											disabled={isRendering}
										>
											<input type="radio" name="mode" value="vertical" className="sr-only" checked={mode === 'vertical'} onChange={() => {}} />
											<div className="absolute inset-0 flex items-center justify-center">
												<span className="text-xs font-medium">4:5</span>
											</div>
										</button>
									</div>
								</div>

								{/* FPS Setting */}
								<div className="space-y-3">
									<Label htmlFor="fps">FPS</Label>
									<Input type="number" id="fps" name="fps" defaultValue={comment.fps} disabled={isRendering} />
								</div>

								{/* Cover Duration */}
								<div className="space-y-3">
									<Label htmlFor="coverDurationInSeconds">Cover Duration (seconds)</Label>
									<Input type="number" id="coverDurationInSeconds" name="coverDurationInSeconds" defaultValue={comment.coverDurationInSeconds} disabled={isRendering} />
								</div>

								{/* Words Duration */}
								<div className="space-y-3">
									<Label htmlFor="secondsForEvery30Words">Seconds per 30 Words</Label>
									<Input type="number" id="secondsForEvery30Words" name="secondsForEvery30Words" defaultValue={comment.secondsForEvery30Words} disabled={isRendering} />
								</div>

								<Button type="submit" className="w-full" disabled={isRendering}>
									{isRendering ? 'Rendering...' : 'Start Rendering'}
								</Button>

								{renderFetcher.data?.error && <p className="text-sm text-red-500 mt-2">{renderFetcher.data.error}</p>}
							</CardContent>
						</Card>
					</renderFetcher.Form>
				</div>
			</div>
		</div>
	)
}
