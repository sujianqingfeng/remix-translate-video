import { NavLink, Outlet } from '@remix-run/react'
import { Download, Headset, Languages, MessageSquare, SquarePlay } from 'lucide-react'

export default function LayoutPage() {
	return (
		<div className="flex h-screen">
			<div className="w-[200px] p-4 border-r">
				<NavLink className={({ isActive }) => `${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`} to="/app/downloads">
					<Download />
					Downloads
				</NavLink>

				<NavLink className={({ isActive }) => `${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`} to="/app/translate-comment">
					<MessageSquare />
					Translate Comment
				</NavLink>
			</div>

			<div className="flex-1 p-4">
				<Outlet />
			</div>
		</div>
	)
}