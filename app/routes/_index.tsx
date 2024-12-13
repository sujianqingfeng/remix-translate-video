import { Link, redirect } from '@remix-run/react'

export async function loader() {
	return redirect('/youtube-comment')
}

export default function IndexPage() {
	return (
		<div>
			<Link to="/youtube-comment">Youtube Comment</Link>
		</div>
	)
}
