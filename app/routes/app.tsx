import { NavLink, Outlet } from '@remix-run/react'
import { Download, FileCheck, Languages, MessageSquare, Type } from 'lucide-react'

export default function LayoutPage() {
	return (
		<div className="flex h-screen">
			<div className="p-4 border-r flex flex-col gap-2">
				<NavLink className={({ isActive }) => `${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`} to="/app/downloads">
					<Download />
				</NavLink>

				<NavLink className={({ isActive }) => `${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`} to="/app/translate-comment">
					<MessageSquare />
				</NavLink>

				<NavLink className={({ isActive }) => `${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`} to="/app/translate-video">
					<Languages />
				</NavLink>

				<NavLink className={({ isActive }) => `${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`} to="/app/short-text">
					<Type />
				</NavLink>

				<NavLink className={({ isActive }) => `${isActive ? 'text-blue-500' : ''} flex items-center gap-2 px-2 py-1`} to="/app/tasks">
					<FileCheck />
				</NavLink>
			</div>

			<div className="flex-1 p-4">
				<Outlet />
			</div>
		</div>
	)
}
