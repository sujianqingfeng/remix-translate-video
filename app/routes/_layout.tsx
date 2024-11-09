import { Link, Outlet, redirect } from '@remix-run/react'

export default function LayoutPage() {
	return (
		<div className="flex ">
			<div className="w-[200px]">
				<p>
					<Link to="/youtube-comment">youtube</Link>
				</p>
				<p>
					<Link to="/short-text">short text</Link>
				</p>
			</div>

			<div>
				<Outlet />
			</div>
		</div>
	)
}
