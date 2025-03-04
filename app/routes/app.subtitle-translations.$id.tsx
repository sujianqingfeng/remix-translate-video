import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import { AlignLeft, Languages, Mic, MonitorPlay } from 'lucide-react'
import { useState } from 'react'
import invariant from 'tiny-invariant'
import { ASRTabContent, AlignmentTabContent, DisplayTabContent, TranslationTabContent } from '~/components/business/subtitle-translation'
import { Card, CardContent } from '~/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { db, schema } from '~/lib/drizzle'
export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const subtitleTranslation = await db.query.subtitleTranslations.findFirst({
		where: eq(schema.subtitleTranslations.id, id),
	})
	invariant(subtitleTranslation, 'subtitleTranslation not found')

	return {
		subtitleTranslation,
	}
}

export default function SubtitleTranslationPage() {
	const { subtitleTranslation } = useLoaderData<typeof loader>()
	const [activeTab, setActiveTab] = useState('asr')

	return (
		<div className="container mx-auto py-8 px-4 max-w-6xl">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Subtitle Translation</h1>
					<p className="text-muted-foreground mt-1">Process and translate your video subtitles</p>
				</div>
			</div>

			<Card className="shadow-md border-0">
				<CardContent className="p-0">
					<Tabs defaultValue="asr" className="w-full" onValueChange={setActiveTab} value={activeTab}>
						<TabsList className="w-full grid grid-cols-4 rounded-none bg-muted/50 p-0">
							<TabsTrigger value="asr" className="rounded-none data-[state=active]:bg-background py-3 border-b-2 border-transparent data-[state=active]:border-primary">
								<div className="flex items-center gap-2">
									<Mic className="h-4 w-4" />
									<span>ASR</span>
								</div>
							</TabsTrigger>
							<TabsTrigger value="alignment" className="rounded-none data-[state=active]:bg-background py-3 border-b-2 border-transparent data-[state=active]:border-primary">
								<div className="flex items-center gap-2">
									<AlignLeft className="h-4 w-4" />
									<span>Alignment</span>
								</div>
							</TabsTrigger>
							<TabsTrigger value="translation" className="rounded-none data-[state=active]:bg-background py-3 border-b-2 border-transparent data-[state=active]:border-primary">
								<div className="flex items-center gap-2">
									<Languages className="h-4 w-4" />
									<span>Translation</span>
								</div>
							</TabsTrigger>
							<TabsTrigger value="display" className="rounded-none data-[state=active]:bg-background py-3 border-b-2 border-transparent data-[state=active]:border-primary">
								<div className="flex items-center gap-2">
									<MonitorPlay className="h-4 w-4" />
									<span>Display</span>
								</div>
							</TabsTrigger>
						</TabsList>

						{/* ASR Tab Content */}
						<TabsContent value="asr" className="p-6 focus:outline-none">
							<ASRTabContent subtitleTranslation={subtitleTranslation} />
						</TabsContent>

						{/* Alignment Tab Content */}
						<TabsContent value="alignment" className="p-6 focus:outline-none">
							<AlignmentTabContent subtitleTranslation={subtitleTranslation} />
						</TabsContent>

						{/* Translation Tab Content */}
						<TabsContent value="translation" className="p-6 focus:outline-none">
							<TranslationTabContent subtitleTranslation={subtitleTranslation} />
						</TabsContent>

						{/* Optimized Display Tab Content */}
						<TabsContent value="display" className="p-6 focus:outline-none">
							<DisplayTabContent subtitleTranslation={subtitleTranslation} />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	)
}
