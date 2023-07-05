import { json, redirect, type DataFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { Button } from '~/components/ui/button.tsx'
import { db } from '~/utils/db.server.ts'

export async function loader({ params }: DataFunctionArgs) {
	const note = db.note.findFirst({
		where: {
			id: {
				equals: params.noteId,
			},
		},
	})
	if (!note) {
		throw new Response('Note note found', { status: 404 })
	}
	return json({
		note: { title: note.title, content: note.content },
	})
}

export async function action({ params }: DataFunctionArgs) {
	// 🐨 get the formData from the request
	// 🐨 get the intent from the formData
	// 🐨 if the intent is "delete" then proceed
	// 🐨 if the intent is not, then throw a 400 Response
	// 💰 you can use invariantResponse from '~/utils/misc.ts' for this
	db.note.delete({ where: { id: { equals: params.noteId } } })
	return redirect(`/users/${params.username}/notes`)
}

export default function NoteRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="flex h-full flex-col">
			<div className="flex-grow">
				<h2 className="mb-2 text-h2 lg:mb-6">{data.note.title}</h2>
				<p className="text-sm md:text-lg">{data.note.content}</p>
			</div>
			<div className="flex justify-end gap-4">
				<Form method="post">
					<Button
						type="submit"
						variant="destructive"
						// 🐨 add a name="intent" and value="delete" to this button
					>
						Delete
					</Button>
				</Form>
				<Button asChild>
					<Link to="edit">Edit</Link>
				</Button>
			</div>
		</div>
	)
}