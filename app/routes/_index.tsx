import { Form } from '@remix-run/react'
import { ActionFunctionArgs, redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import getVideoId from 'get-video-id'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const url = formData.get('url')
  invariant(url, 'Missing url param')
  const { id } = getVideoId(url as string)
  invariant(id, 'invalid youtube url')
  return redirect(`/${id}`)
}

export default function IndexPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Form method="post" className="flex justify-center gap-10">
        <Input
          name="url"
          className="border p-2 w-96"
          placeholder="Please enter your YouTube URL"
          defaultValue="https://www.youtube.com/watch?v=Lpv7h4X77ho"
        />
        <Button type="submit">Start</Button>
      </Form>
    </div>
  )
}
