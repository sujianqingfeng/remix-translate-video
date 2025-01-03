import { type ActionFunctionArgs, data } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { GenerateShortTextActionData } from '~/types'
import { generateShortText } from '~/utils/ai'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const theme = formData.get('theme')
	invariant(theme, 'theme is required')

	const shortText = await generateShortText(theme as string)

	return data<GenerateShortTextActionData>(
		{ success: true, shortText },
		{
			headers: {
				'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
				Pragma: 'no-cache',
				Expires: '0',
			},
		},
	)
}
