import { Label } from './ui/label'

export default function FormLabel({ name }: { name: string }) {
	return (
		<Label className="first-letter:uppercase leading-8" htmlFor={name}>
			{name}
		</Label>
	)
}
