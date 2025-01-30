import { staticFile } from 'remotion'
import type { GeneralCommentProps } from './types'

export const Content: React.FC<Pick<GeneralCommentProps, 'content' | 'contentZh' | 'images' | 'fps'>> = ({ content, contentZh, images, fps }) => {
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
						// 如果是远程图片，使用原始 URL
						if (image.startsWith('http')) {
							return (
								<img
									key={image}
									src={image}
									alt=""
									className="w-full h-full object-cover rounded-lg"
									style={{
										aspectRatio: '1',
									}}
								/>
							)
						}

						// 如果是本地图片，使用 staticFile
						const normalizedPath = image.replace(/^\//, '').replace(/^public\//, '')
						const imageSrc = staticFile(normalizedPath)

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
