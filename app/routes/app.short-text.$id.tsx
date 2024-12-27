import type { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { eq } from 'drizzle-orm'
import { Copy } from 'lucide-react'
import invariant from 'tiny-invariant'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { toast } from '~/hooks/use-toast'
import { db, schema } from '~/lib/drizzle'
import { ShortTexts } from '~/remotion/short-texts/ShortTexts'
import { copyFileToPublic, fileExist } from '~/utils/file'
import { buildShortRenderData } from '~/utils/short-text'

async function safeCopyFileToPublic(filePath: string | null) {
	if (filePath && (await fileExist(filePath))) {
		copyFileToPublic({
			filePath,
		})
	}
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const shortText = await db.query.shortTexts.findFirst({
		where: eq(schema.shortTexts.id, id),
	})

	invariant(shortText, 'shortText not found')

	await safeCopyFileToPublic(shortText.audioFilePath)
	await safeCopyFileToPublic(shortText.coverFilePath)

	const { totalDurationInFrames, audioDuration, shortTextBgFile, shortTextCoverFile, playAudioFile, compositionWidth, compositionHeight, playWidth, playHeight } =
		await buildShortRenderData(shortText)

	return {
		shortText,
		audioDuration,
		shortTextBgFile,
		shortTextCoverFile,
		playAudioFile,
		totalDurationInFrames,
		compositionWidth,
		compositionHeight,
		playWidth,
		playHeight,
	}
}

const shortTextDirectionOptions = [
	{
		label: 'vertical',
		value: '0',
	},
	{
		label: 'horizontal',
		value: '1',
	},
]

export default function ShortTextPage() {
	const { shortText, audioDuration, shortTextBgFile, shortTextCoverFile, playAudioFile, totalDurationInFrames, compositionWidth, compositionHeight, playWidth, playHeight } =
		useLoaderData<typeof loader>()

	const generateAudioFetcher = useFetcher()
	const updateFetcher = useFetcher()
	const uploadCoverFetcher = useFetcher()
	const renderFetcher = useFetcher()
	const remoteRenderFetcher = useFetcher()

	const title = `坚持100天打卡 每日英语听读小短文 | ${shortText.titleZh}`

	const onCopy = async (text: string | undefined) => {
		if (!text) return
		await navigator.clipboard.writeText(text)
		toast({
			title: 'copy successful!',
		})
	}

	const words = shortText.littleDifficultWords?.map((word) => `${word.word}：${word.translation}`).join('\n')

	return (
		<div className="flex">
			<div>
				<Player
					component={ShortTexts}
					inputProps={{
						wordTranscripts: shortText.wordTranscripts || [],
						littleDifficultWords: shortText.littleDifficultWords?.map((item) => item.word) || [],
						title: shortText.title,
						titleZh: shortText.titleZh,
						audioDuration,
						shortTextZh: shortText.shortTextZh,
						sentenceTranscript: shortText.sentenceTranscripts || [],
						direction: shortText.direction,
						shortTextBgFile,
						shortTextCoverFile,
						playAudioFile,
					}}
					durationInFrames={totalDurationInFrames}
					compositionWidth={compositionWidth}
					compositionHeight={compositionHeight}
					fps={shortText.fps}
					style={{
						width: playWidth,
						height: playHeight,
					}}
					controls
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div>
					<p className="flex items-center gap-2">
						{title}
						<Copy className="cursor-pointer" onClick={() => onCopy(title)} />
					</p>

					<p className="flex items-center gap-2 whitespace-pre-wrap">
						{words}
						<Copy className="cursor-pointer" onClick={() => onCopy(words)} />
					</p>
				</div>
				<div>
					<updateFetcher.Form action="update" method="post">
						<div className="flex gap-2">
							<Select name="direction" defaultValue={`${shortText.direction}`}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="select mode" />
								</SelectTrigger>
								<SelectContent>
									{shortTextDirectionOptions.map((item) => (
										<SelectItem key={item.value} value={item.value}>
											{item.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<LoadingButtonWithState state={updateFetcher.state} idleText="Update" />
						</div>
					</updateFetcher.Form>
				</div>
				<div>
					<uploadCoverFetcher.Form action="upload-cover" method="post" encType="multipart/form-data">
						<input
							type="file"
							name="file"
							accept=".png"
							className="file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
							required
						/>

						<LoadingButtonWithState state={uploadCoverFetcher.state} idleText="Upload cover" />
					</uploadCoverFetcher.Form>
				</div>

				<div className="flex gap-2">
					<generateAudioFetcher.Form action="generate-audio" method="post">
						<LoadingButtonWithState state={generateAudioFetcher.state} idleText="Generate audio" />
					</generateAudioFetcher.Form>

					<renderFetcher.Form action="render" method="post">
						<LoadingButtonWithState state={renderFetcher.state} idleText="Render" />
					</renderFetcher.Form>

					<remoteRenderFetcher.Form action="remote-render" method="post">
						<LoadingButtonWithState state={remoteRenderFetcher.state} idleText="Remote render" />
					</remoteRenderFetcher.Form>

					{shortText.outputFilePath && (
						<Link to="download" target="_blank" rel="noopener noreferrer">
							<Button>Download</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
