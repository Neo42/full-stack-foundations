import {
	Link,
	NavLink,
	Outlet,
	useLoaderData,
	useParams,
} from '@remix-run/react'
import { cn } from '#app/utils/misc.tsx'
// 🐨 get the db utility using:
import { db } from '#app/utils/db.server.ts'
import { json, LoaderFunctionArgs } from '@remix-run/node'

// 🐨 add a `loader` export here which uses the params from the LoaderFunctionArgs
// 🐨 you'll get the username from params.username
// 💰 Here's how you get the owner information and the note from the database:
// const owner = db.user.findFirst({
// 	where: {
// 		username: { equals: username, },
// 	},
// })
// const notes = db.note
// 	.findMany({
// 		where: {
// 			owner: {
// 				username: { equals: username, },
// 			},
// 		},
// 	})
// 🐨 return the necessary data using Remix's json util
// 🦺 TypeScript will complain about the owner being possibly undefined, we'll
// fix that in the next section
// 💯 as extra credit, try to do it with new Response instead of using the json util just for fun
// 🦉 Note, you should definitely use the json helper as it's easier and works better with TypeScript
// but feel free to try it with new Response if you want to see how it works.
export async function loader({ params }: LoaderFunctionArgs) {
	const { username } = params
	const owner = db.user.findFirst({
		where: {
			username: { equals: username },
		},
	})
	const notes = db.note.findMany({
		where: {
			owner: {
				username: { equals: username },
			},
		},
	})
	return json({
		owner: { name: owner.name, username: owner.username },
		notes: notes.map(note => ({ id: note.id, title: note.title })),
	})
}

export default function NotesRoute() {
	// 💣 we no longer need the params, delete this
	// const params = useParams()
	// 🐨 get the data from useLoaderData
	// 🐨 update the ownerDisplayName to be what you get from the loader data
	// 💯 note, the user's name is not required, so as extra credit, add a
	// fallback to the username
	const { owner, notes } = useLoaderData<typeof loader>()
	const ownerDisplayName = owner.name ?? owner.username
	const navLinkDefaultClassName =
		'line-clamp-2 block rounded-l-full py-2 pl-8 pr-6 text-base lg:text-xl'
	return (
		<main className="container flex h-full min-h-[400px] pb-12 px-0 md:px-8">
			<div className="grid w-full grid-cols-4 bg-muted pl-2 md:container md:mx-2 md:rounded-3xl md:pr-0">
				<div className="relative col-span-1">
					<div className="absolute inset-0 flex flex-col">
						<Link to=".." relative="path" className="pb-4 pl-8 pr-4 pt-12">
							<h1 className="text-base font-bold md:text-lg lg:text-left lg:text-2xl">
								{ownerDisplayName}'s Notes
							</h1>
						</Link>
						<ul className="overflow-y-auto overflow-x-hidden pb-12">
							{/*
							🐨 instead of hard coding the note, create one <li> for each note
							in the database with data.notes.map
						*/}
							{notes.map(note => (
								<li key={note.id} className="p-1 pr-0">
									<NavLink
										to={note.id}
										className={({ isActive }) =>
											cn(navLinkDefaultClassName, isActive && 'bg-accent')
										}
									>
										{note.title}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="relative col-span-3 bg-accent md:rounded-r-3xl">
					<Outlet />
				</div>
			</div>
		</main>
	)
}
