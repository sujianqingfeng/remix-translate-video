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
	const titleHeight = 120
	const timelineCenter = fixedWidth / 2
	const positions: { left: string; top: string; isLeft: boolean }[] = []

	const availableHeight = fixedHeight - titleHeight - 80
	const spacing = availableHeight / (count - 1 || 1)
	const horizontalOffset = 200

	for (let i = 0; i < count; i++) {
		const isLeft = i % 2 === 1
		const x = isLeft ? timelineCenter - horizontalOffset : timelineCenter + horizontalOffset
		const y = titleHeight + spacing * i

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
		<AbsoluteFill className="bg-gradient-to-br from-blue-50 via-white to-blue-50 font-sans w-full h-full relative">
			{/* Enhanced title with modern gradient and animation */}
			<div className="absolute top-[30px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-12 py-4 rounded-full text-white text-3xl font-bold tracking-tight z-10 shadow-xl shadow-blue-200/50 whitespace-nowrap border border-white/20 backdrop-blur-sm">
				{title}
			</div>

			{/* Enhanced timeline with gradient and glow effect */}
			<div className="absolute left-1/2 -translate-x-px top-[100px] bottom-10 w-[3px] bg-gradient-to-b from-blue-400 via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

			{phrases.map((phrase, index) => {
				const position = positions[index] || { left: '50%', top: '50%', isLeft: true }
				return (
					<div key={`phrase-${phrase.phrase}`} className="contents">
						{/* Enhanced node design */}
						<div
							className="absolute z-20"
							style={{
								left: '50%',
								top: position.top,
								transform: 'translate(-50%, -50%)',
							}}
						>
							<div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-200/50 border-2 border-white transition-transform duration-300 hover:scale-110 overflow-hidden">
								<div className="w-[90%] h-[90%] rounded-full overflow-hidden">{phrase.cover && <img src={phrase.cover} alt="" className="w-full h-full object-cover" />}</div>
							</div>
						</div>

						{/* Enhanced card design */}
						<div
							style={{
								left: position.left,
								top: position.top,
								transform: position.isLeft ? 'translate(-100%, -50%)' : 'translate(0, -50%)',
							}}
							className="absolute w-[340px]"
						>
							{/* Enhanced connection line */}
							<div
								className={`absolute top-1/2 ${position.isLeft ? '-right-[80px]' : '-left-[80px]'} w-[80px] h-[3px] bg-gradient-to-r ${
									position.isLeft ? 'from-blue-500 to-transparent' : 'from-transparent to-blue-500'
								}`}
							/>

							{/* Enhanced content card */}
							<div
								className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-blue-100/50 border border-blue-100 transition-transform duration-300 hover:scale-[1.02] ${
									position.isLeft ? 'text-right' : 'text-left'
								}`}
							>
								<div className="text-xl font-bold text-blue-600 mb-3 tracking-tight">{phrase.phrase}</div>
								<div className="text-gray-800 font-medium">{phrase.text}</div>
								<div className="text-gray-500 text-sm mt-2 font-medium">{phrase.textZh}</div>
							</div>
						</div>
					</div>
				)
			})}
		</AbsoluteFill>
	)
}
