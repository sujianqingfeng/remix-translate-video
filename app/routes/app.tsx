import { NavLink, Outlet } from '@remix-run/react'
import { BookOpen, ChevronLeft, ChevronRight, Download, FileCheck, Languages, type LucideIcon, MessageSquare, Type } from 'lucide-react'
import { useState } from 'react'

interface MenuItem {
	to: string
	title: string
	icon: LucideIcon
	text: string
}

const menuItems: MenuItem[] = [
	{
		to: '/app/downloads',
		title: 'Downloads',
		icon: Download,
		text: 'Downloads',
	},
	{
		to: '/app/translate-comment',
		title: 'Comment Translation',
		icon: MessageSquare,
		text: 'Comment Translation',
	},
	{
		to: '/app/translate-video',
		title: 'Video Translation',
		icon: Languages,
		text: 'Video Translation',
	},
	{
		to: '/app/short-text',
		title: 'Short Text',
		icon: Type,
		text: 'Short Text',
	},
	{
		to: '/app/fill-in-blank',
		title: 'Fill in Blanks',
		icon: BookOpen,
		text: 'Fill in Blanks',
	},
	{
		to: '/app/tasks',
		title: 'Task List',
		icon: FileCheck,
		text: 'Task List',
	},
]

export default function LayoutPage() {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Sidebar */}
			<div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r shadow-sm flex flex-col transition-all duration-300 relative`}>
				<div className={`p-4 border-b ${isSidebarCollapsed ? 'opacity-0' : ''}`}>
					<h1 className="text-xl font-semibold text-gray-800">Workspace</h1>
					<p className="text-sm text-gray-500 mt-1">Select a feature to use</p>
				</div>

				{/* Toggle Button */}
				<button
					type="button"
					onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
					className="absolute -right-3 top-20 bg-white border rounded-full p-1 shadow-sm hover:bg-gray-50"
				>
					{isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
				</button>

				<nav className="flex-1 p-4 space-y-2 overflow-hidden">
					{menuItems.map((item) => {
						const Icon = item.icon
						return (
							<NavLink
								key={item.to}
								className={({ isActive }) => `
									flex items-center
									px-2 py-2 rounded-lg min-h-[40px]
									${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
								`}
								to={item.to}
								title={item.title}
							>
								<div className={`flex items-center transition-transform duration-300 ${isSidebarCollapsed ? '-ml-2' : ''}`}>
									<Icon size={20} />
								</div>
								<span className={`ml-3 transition-all duration-300 ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>{item.text}</span>
							</NavLink>
						)
					})}
				</nav>
			</div>

			{/* Main Content */}
			<div className="flex-1 overflow-auto">
				<div className="max-w-7xl mx-auto p-6">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
