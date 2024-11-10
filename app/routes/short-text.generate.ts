import { type ActionFunctionArgs, json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { GenerateShortTextActionData } from '~/types'
import { generateShortText } from '~/utils/ai'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const theme = formData.get('theme')
	invariant(theme, 'theme is required')

	const shortText = await generateShortText(theme as string)

	return json<GenerateShortTextActionData>({ success: true, shortText })
}
