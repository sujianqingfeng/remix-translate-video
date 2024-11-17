import { fetch } from 'undici'
import { SILICON_FLOW_API_KEY } from '~/constants'

type GenerateImageResp = {
	images: { url: string }[]
	timings: { inference: number }
	seed: number
}
export async function generateImage({
	model,
	width,
	height,
	prompt,
}: {
	model: string
	width: number
	height: number
	prompt: string
}): Promise<GenerateImageResp> {
	if (!SILICON_FLOW_API_KEY) {
		throw new Error('silicon flow key is empty')
	}

	const body = {
		model,
		prompt,
		image_size: `${width}x${height}`,
		batch_size: 1,
		num_inference_steps: 25,
		guidance_scale: 4.5,
	}

	const options = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${SILICON_FLOW_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	}

	const res = await fetch(
		'https://api.siliconflow.cn/v1/images/generations',
		options,
	)
	const data = (await res.json()) as unknown as GenerateImageResp
	return data
}
