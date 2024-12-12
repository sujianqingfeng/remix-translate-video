export default function FormLabel({ name }: { name: string }) {
	return (
		<label className="first-letter:uppercase" htmlFor={name}>
			{name}
		</label>
	)
}
