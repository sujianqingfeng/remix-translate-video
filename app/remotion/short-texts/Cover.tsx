import { Img } from 'remotion'

type CoverProps = {
	direction: number
	coverFileName: string
}

export default function Cover({ direction, coverFileName }: CoverProps) {
	return (
		<div className={`${direction ? 'w-[400px] relative' : 'h-[500px] relative'}`}>
			<Img className={`${direction ? 'h-full' : 'h-full w-full'} object-cover`} src={coverFileName} />
			{direction ? (
				<div
					className="absolute top-0 right-0 h-full w-[200px]"
					style={{
						background: 'linear-gradient(to right, transparent, #EAE0CD)',
					}}
				/>
			) : (
				<div
					className="absolute bottom-0 left-0 w-full h-[100px]"
					style={{
						background: 'linear-gradient(to bottom, transparent, #EFEADB)',
					}}
				/>
			)}
		</div>
	)
}
