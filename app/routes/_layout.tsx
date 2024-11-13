import { NavLink, Outlet } from '@remix-run/react'
import { Headset, Languages, SquarePlay } from 'lucide-react'

export default function LayoutPage() {
	return (
		<div className="flex h-screen">
			<div className="w-[200px] p-4 border-r">
				<NavLink
					className={({ isActive }) =>
						`${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`
					}
					to="/youtube-comment"
				>
					<SquarePlay />
					youtube
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						`${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`
					}
					to="/short-text"
				>
					<Headset />
					short text
				</NavLink>

				<NavLink
					className={({ isActive }) =>
						`${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`
					}
					to="/translate-video"
				>
					<Languages />
					translate video
				</NavLink>
			</div>

			<div className="flex-1 p-4">
				<Outlet />
			</div>
		</div>
	)
}
