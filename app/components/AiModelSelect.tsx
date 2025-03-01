import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

export default function AiModelSelect({ name, defaultValue }: { name: string; defaultValue: string }) {
	return (
		<Select name={name} defaultValue={defaultValue}>
			<SelectTrigger className="w-[140px]">
				<SelectValue placeholder="Select Model" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="r1">R1</SelectItem>
				<SelectItem value="deepseek">DeepSeek</SelectItem>
				<SelectItem value="openai">OpenAI</SelectItem>
			</SelectContent>
		</Select>
	)
}
