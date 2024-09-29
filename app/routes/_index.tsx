import { Form } from '@remix-run/react'
import { ActionFunctionArgs, redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import getVideoId from 'get-video-id'

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
    <div>
      <Form method="post">
        <input
          name="url"
          className="border p-2"
          placeholder="please enter your youtube url"
          defaultValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ></input>

        <button type="submit">start</button>
      </Form>
    </div>
  )
}
