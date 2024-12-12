import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import FormLabel from '~/components/FormLabel'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { type action, downloadsInsertSchema } from './new'

export default function NewDownloadDialog() {
	const lastResult = useActionData<typeof action>()
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'

	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: downloadsInsertSchema })
		},
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	return (
		<Dialog>
			<DialogTrigger>
				<Button>New Download</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Download</DialogTitle>
					<DialogDescription>Create a new download</DialogDescription>
				</DialogHeader>
				<Form action="/downloads/new" method="post" id={form.id} onSubmit={form.onSubmit} noValidate>
					<div className="space-y-4">
						<div>
							<FormLabel name={fields.type.name} />
							<Select key={fields.type.key} name={fields.type.name} defaultValue={fields.type.initialValue}>
								<SelectTrigger>
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="youtube">Youtube</SelectItem>
									<SelectItem value="tiktok">Tiktok</SelectItem>
								</SelectContent>
							</Select>
							<div className="text-red-500 text-sm">{fields.type.errors}</div>
						</div>

						<div>
							<FormLabel name={fields.link.name} />
							<Input type="url" key={fields.link.key} name={fields.link.name} defaultValue={fields.link.initialValue} />
							<div className="text-red-500 text-sm">{fields.link.errors}</div>
						</div>

						<DialogFooter>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? 'Creating...' : 'Confirm'}
							</Button>
						</DialogFooter>
					</div>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
