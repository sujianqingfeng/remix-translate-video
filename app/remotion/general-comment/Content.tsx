import { staticFile } from 'remotion'
import type { GeneralCommentProps } from './types'

export const Content: React.FC<Pick<GeneralCommentProps, 'content' | 'contentZh' | 'images'>> = ({ content, contentZh, images }) => {
	return (
		<div className="space-y-8">
			{/* Original Content */}
			<div>
				<p className="text-xl text-gray-900 leading-relaxed whitespace-pre-wrap">{content}</p>
			</div>

			{/* Translated Content */}
			{contentZh && (
				<div>
					<p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">{contentZh}</p>
				</div>
			)}

			{/* Images */}
			{images && images.length > 0 && (
				<div className={`grid ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
					{images.map((image) => {
						// 检查是否是远程 URL
						const isRemoteUrl = image.startsWith('http://') || image.startsWith('https://')
						const imageSrc = isRemoteUrl ? image : staticFile(image)

						return (
							<img
								key={image}
								src={imageSrc}
								alt=""
								className="w-full h-full object-cover rounded-lg"
								style={{
									aspectRatio: '1',
								}}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}
