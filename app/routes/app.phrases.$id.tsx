import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import BackPrevious from '~/components/BackPrevious'
import { Phrases } from '~/remotion'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id
	return {
		title: 'Phrases',
		phrases: [
			{
				phrase: 'Hello',
				text: 'Hello, how are you?',
				textZh: '你好，你怎么样？',
				cover: 'https://picsum.photos/200/300',
			},
			{
				phrase: 'Goodbye',
				text: 'Goodbye, see you next time!',
				textZh: '再见，下次见！',
				cover: 'https://picsum.photos/200/300',
			},
			{
				phrase: 'Thank you',
				text: 'Thank you, see you next time!',
				textZh: '谢谢，下次见！',
				cover: 'https://picsum.photos/200/300',
			},
			{
				phrase: 'I love you',
				text: 'I love you, I love you!',
				textZh: '我爱你，我爱你！',
				cover: 'https://picsum.photos/200/300',
			},
			{
				phrase: 'I am sorry',
				text: 'I am sorry, I will be better next time!',
				textZh: '对不起，下次我会更好！',
				cover: 'https://picsum.photos/200/300',
			},
			{
				phrase: 'I am happy',
				text: 'I am happy, I am happy!',
				textZh: '我高兴，我高兴！',
				cover: 'https://picsum.photos/200/300',
			},
			{
				phrase: 'I am sad',
				text: 'I am sad, I am sad!',
				textZh: '我伤心，我伤心！',
				cover: 'https://picsum.photos/200/300',
			},
			{
				phrase: 'I am hungry',
				text: 'I am hungry, I am hungry!',
				textZh: '我饿了，我饿了！',
				cover: 'https://picsum.photos/200/300',
			},
			{
				phrase: 'I am tired',
				text: 'I am tired, I am tired, I am tired!',
				textZh: '我累了，我累了，我累了！',
				cover: 'https://picsum.photos/200/300',
			},
		],
	}
}

export default function AppPhrasesPage() {
	const { title, phrases } = useLoaderData<typeof loader>()

	return (
		<div>
			<BackPrevious />

			<div className="flex">
				<div>
					<Player
						component={Phrases}
						inputProps={{
							phrases,
							title,
						}}
						durationInFrames={60 * 20}
						compositionWidth={1080}
						compositionHeight={1920}
						fps={60}
						style={{
							width: 720,
							height: 1280,
						}}
						controls
					/>
				</div>
			</div>
		</div>
	)
}
