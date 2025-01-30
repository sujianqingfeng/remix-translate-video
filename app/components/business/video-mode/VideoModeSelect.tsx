import type { VideoMode } from '~/utils/general-comment'

interface VideoModeSelectProps {
	mode: VideoMode
	onChange: (mode: VideoMode) => void
	disabled?: boolean
}

const modes: Array<{
	id: VideoMode
	label: string
	ratio: string
}> = [
	{
		id: 'landscape',
		label: 'Landscape',
		ratio: '16:9',
	},
	{
		id: 'portrait',
		label: 'Portrait',
		ratio: '9:16',
	},
	{
		id: 'vertical',
		label: 'Vertical',
		ratio: '4:5',
	},
]

export function VideoModeSelect({ mode, onChange, disabled }: VideoModeSelectProps) {
	return (
		<div className="flex gap-4">
			{modes.map((item) => (
				<button
					key={item.id}
					type="button"
					className={`relative min-w-[100px] h-14 rounded-lg border-2 transition-all ${mode === item.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
					onClick={() => onChange(item.id)}
					disabled={disabled}
				>
					<input type="radio" name="mode" value={item.id} className="sr-only" checked={mode === item.id} onChange={() => {}} />
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span className="text-sm font-medium">{item.label}</span>
						<span className="text-xs text-gray-500 mt-0.5">{item.ratio}</span>
					</div>
				</button>
			))}
		</div>
	)
}
