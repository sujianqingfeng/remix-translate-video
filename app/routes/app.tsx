import { NavLink, Outlet } from '@remix-run/react'
import { Download, FileCheck, Headset, Languages, MessageSquare, SquarePlay } from 'lucide-react'

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

				<NavLink className={({ isActive }) => `${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`} to="/app/translate-video">
					<Languages />
					Translate Video
				</NavLink>

				<NavLink className={({ isActive }) => `${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`} to="/app/tasks">
					<FileCheck />
					Tasks
				</NavLink>
			</div>

			<div className="flex-1 p-4">
				<Outlet />
			</div>
		</div>
	)
}
