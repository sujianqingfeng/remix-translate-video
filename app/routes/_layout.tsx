import { Link, Outlet } from '@remix-run/react'

export default function LayoutPage() {
	return (
		<div className="flex h-screen">
			<div className="w-[200px] p-4 border-r">
				<p>
					<Link to="/youtube-comment">youtube</Link>
				</p>
				<p>
					<Link to="/short-text">short text</Link>
				</p>
			</div>

			<div className="flex-1 p-4">
				<Outlet />
			</div>
		</div>
	)
}
