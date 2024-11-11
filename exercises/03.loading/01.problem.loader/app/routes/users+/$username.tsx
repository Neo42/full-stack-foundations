import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
// 🐨 get the database from the utils directory using
import { db } from '#app/utils/db.server.ts'

// 🐨 add a `loader` export here which uses the params from the LoaderFunctionArgs
// 🐨 you'll get the username from params.username
// 💰 Here's how you get the user from the database:
// const user = db.user.findFirst({
// 	where: {
// 		username: { equals: username },
// 	},
// })
// 🐨 Return the necessary user data using Remix's json util
// 🦺 TypeScript will complain about the user being possibly undefined, we'll
// fix that in the next section
// 💯 as extra credit, try to do it with new Response instead of using the json util just for fun
// 🦉 Note, you should definitely use the json helper as it's easier and works better with TypeScript
// but feel free to try it with new Response if you want to see how it works.
export async function loader({ params }: LoaderFunctionArgs) {
	const { username } = params
	const user = db.user.findFirst({
		where: {
			username: { equals: username },
		},
	})
	return json({
		user: {
			name: user.name,
			username: user.username,
		},
	})
}

export default function ProfileRoute() {
	// � we no longer need to get the params in the UI, delete this:
	// const params = useParams()
	// �🐨 get the data from the loader with useLoaderData
	const { user } = useLoaderData<typeof loader>()
	return (
		<div className="container mb-48 mt-36">
			{/*
				🐨 swap params.username with the user's name
				(💯 note, the user's name is not required, so as extra credit, add a
				fallback to the username)
			*/}
			<h1 className="text-h1">{user.name ?? user.username}</h1>
			<Link to="notes" className="underline">
				Notes
			</Link>
		</div>
	)
}
