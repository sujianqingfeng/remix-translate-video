import { useEffect, useState } from 'react'
import { AbsoluteFill } from 'remotion'

type PhrasesProps = {
	title: string
	phrases: {
		phrase: string
		text: string
		textZh: string
		cover: string
	}[]
}

function calculatePositions(count: number) {
	const fixedWidth = 1920
	const fixedHeight = 1080
	const titleHeight = 200
	const timelineCenter = fixedWidth / 2
	const positions: { left: string; top: string; isLeft: boolean }[] = []

	// Calculate spacing between items on the timeline
	const availableHeight = fixedHeight - titleHeight
	const spacing = availableHeight / (count + 1)
	const horizontalOffset = 180 // Distance from timeline to cards

	// Generate positions
	for (let i = 0; i < count; i++) {
		const isLeft = i % 2 === 1 // Alternate between right (false) and left (true)
		const x = isLeft
			? timelineCenter - horizontalOffset // Left side card position - now closer to timeline
			: timelineCenter + horizontalOffset // Right side card position
		const y = titleHeight + spacing * (i + 1) // Evenly space vertically

		positions.push({
			left: `${(x / fixedWidth) * 100}%`,
			top: `${(y / fixedHeight) * 100}%`,
			isLeft,
		})
	}

	return positions
}

export default function Phrases({ title, phrases }: PhrasesProps) {
	const [positions, setPositions] = useState<{ left: string; top: string; isLeft: boolean }[]>([])

	useEffect(() => {
		const initialPositions = calculatePositions(phrases.length)
		setPositions(initialPositions)
	}, [phrases])

	return (
		<AbsoluteFill className="bg-gradient-to-tr from-gray-50 to-white font-sans w-full h-full relative">
			<div className="absolute top-[30px] left-1/2 -translate-x-1/2 bg-gradient-to-tr from-blue-600 to-blue-500 px-10 py-3 rounded-3xl text-white text-2xl font-semibold tracking-tight z-10 shadow-lg shadow-blue-200 whitespace-nowrap">
				{title}
			</div>

			{/* 中间的时间轴线 */}
			<div className="absolute left-1/2 -translate-x-px top-[120px] bottom-10 w-[2px] bg-black" />

			{phrases.map((phrase, index) => {
				const position = positions[index] || { left: '50%', top: '50%', isLeft: true }
				return (
					<div key={`phrase-${phrase.phrase}`} className="contents">
						{/* 图片节点 - 位于时间轴正中央 */}
						<div
							className="absolute"
							style={{
								left: '50%',
								top: position.top,
								transform: 'translate(-50%, -50%)',
							}}
						>
							<div className="w-14 h-14 bg-red-100 rotate-45 flex items-center justify-center">
								<div className="-rotate-45">{phrase.cover && <img src={phrase.cover} alt="" className="w-10 h-10 object-cover rounded" />}</div>
							</div>
						</div>

						{/* 短语卡片和连接线 */}
						<div
							style={{
								left: position.left,
								top: position.top,
								transform: position.isLeft ? 'translate(-100%, -50%)' : 'translate(0, -50%)',
							}}
							className="absolute w-[320px]"
						>
							{/* 连接线 */}
							<div className={`absolute top-1/2 ${position.isLeft ? '-right-[60px]' : '-left-[60px]'} w-[60px] h-[2px] bg-blue-500`} />

							{/* 短语内容 */}
							<div className={`bg-blue-50 rounded-xl p-4 ${position.isLeft ? 'text-right' : 'text-left'}`}>
								<div className="text-lg font-medium text-blue-600 mb-2">{phrase.phrase}</div>
								<div className="text-gray-700">{phrase.text}</div>
								<div className="text-gray-500 text-sm mt-1">{phrase.textZh}</div>
							</div>
						</div>
					</div>
				)
			})}
		</AbsoluteFill>
	)
}
