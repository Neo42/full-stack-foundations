import { Link, NavLink, Outlet } from '@remix-run/react'

export default function NotesRoute() {
	return (
		<div className="flex h-full justify-between pb-12 border-8 border-blue-500">
			<h1 className="text-h1">Notes</h1>
			{/* 🐨 add two links here.
				One to go back to the parent *path* (💰 not parent "route" that's why you need to use the relative="path" prop)
				and the other to go to the some-note-id route
			*/}
			<Link to=".." relative="path">
				Back to Kody
			</Link>
			<NavLink
				to="some-note-id"
				className={({ isActive }) => `underline ${isActive ? 'bg-accent' : ''}`}
			>
				Some Note
			</NavLink>
			{/* 💰 feel free to restructure things however you like to make them look nice */}
			<Outlet />
		</div>
	)
}
