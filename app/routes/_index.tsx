import { redirect } from '@remix-run/react'

export async function loader() {
	return redirect('/youtube-comment')
}

export default function IndexPage() {
	return <div>index</div>
}
