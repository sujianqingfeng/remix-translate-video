import { Link, redirect } from '@remix-run/react'

export async function loader() {
	return redirect('/app/downloads')
}

export default function IndexPage() {
	return (
		<div>
			<Link to="/app/downloads">Downloads</Link>
		</div>
	)
}
