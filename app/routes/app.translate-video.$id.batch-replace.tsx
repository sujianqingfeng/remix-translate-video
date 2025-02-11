import type { LoaderFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, useLoaderData, useNavigate } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import { ArrowLeftCircle, Replace, Wand2 } from 'lucide-react'
import invariant from 'tiny-invariant'
import BackPrevious from '~/components/BackPrevious'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { useToast } from '~/hooks/use-toast'
import { db, schema } from '~/lib/drizzle'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params
  invariant(id, 'id is required')

  const translateVideo = await db.query.translateVideos.findFirst({
    where: eq(schema.translateVideos.id, id),
  })
  invariant(translateVideo, 'translateVideo not found')

  return { translateVideo }
}

export async function action({ request, params }: LoaderFunctionArgs) {
  const { id } = params
  invariant(id, 'id is required')

  const formData = await request.formData()
  const searchText = formData.get('searchText')?.toString() || ''
  const replaceText = formData.get('replaceText')?.toString() || ''
  const field = formData.get('field')?.toString() || ''

  const translateVideo = await db.query.translateVideos.findFirst({
    where: eq(schema.translateVideos.id, id),
  })
  invariant(translateVideo, 'translateVideo not found')

  const transcripts = translateVideo.transcripts || []
  const updatedTranscripts = transcripts.map((transcript) => {
    if (field === 'all') {
      return {
        ...transcript,
        text: transcript.text.replaceAll(searchText, replaceText),
        textLiteralTranslation: (transcript.textLiteralTranslation || '').replaceAll(searchText, replaceText),
        textInterpretation: (transcript.textInterpretation || '').replaceAll(searchText, replaceText),
      }
    }
    if (field === 'text') {
      return {
        ...transcript,
        text: transcript.text.replaceAll(searchText, replaceText),
      }
    }
    if (field === 'literal') {
      return {
        ...transcript,
        textLiteralTranslation: (transcript.textLiteralTranslation || '').replaceAll(searchText, replaceText),
      }
    }
    if (field === 'interpretation') {
      return {
        ...transcript,
        textInterpretation: (transcript.textInterpretation || '').replaceAll(searchText, replaceText),
      }
    }
    return transcript
  })

  await db
    .update(schema.translateVideos)
    .set({
      transcripts: updatedTranscripts,
    })
    .where(eq(schema.translateVideos.id, id))

  return redirect(`/app/translate-video/${id}`)
}

export default function BatchReplacePage() {
  const { translateVideo } = useLoaderData<typeof loader>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleBack = () => navigate(-1)

  return (
    <div className="container mx-auto py-8 px-4">
      <button type="button" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" onClick={handleBack}>
        <ArrowLeftCircle size={20} />
        <span>Back</span>
      </button>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Batch Replace Transcripts</CardTitle>
            <CardDescription>Replace text across multiple transcripts at once</CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Field to Replace</Label>
                  <Select name="field" defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select field to replace" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Fields</SelectItem>
                      <SelectItem value="text">Original Text</SelectItem>
                      <SelectItem value="literal">Literal Translation</SelectItem>
                      <SelectItem value="interpretation">Free Translation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-6 pt-2">
                  <div className="space-y-2">
                    <Label>Search Text</Label>
                    <Textarea name="searchText" placeholder="Enter text to search for..." className="min-h-[100px] resize-y" />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Replace with</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Replace With</Label>
                    <Textarea name="replaceText" placeholder="Enter text to replace with..." className="min-h-[100px] resize-y" />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full gap-2">
                <Replace size={16} />
                Replace All
              </Button>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="text-primary" size={20} />
              Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Select "All Fields" to replace text in original, literal, and free translations at once</p>
            <p>• The replacement is case-sensitive</p>
            <p>• Empty fields will be skipped during replacement</p>
            <p>• Changes are applied immediately to all matching transcripts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
