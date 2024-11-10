import { type LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Scripts } from '@remix-run/react'
import { EpicShop } from './epicshop.tsx'

// 🐨 export a links function here that adds the favicon
// 💰 It should have the following properties:
// - rel: 'icon'
// - type: 'image/svg+xml'
// - href: '/favicon.svg'
export const links: LinksFunction = () => [
	{
		rel: 'icon',
		type: 'image/svg+xml',
		href: '/favicon.svg',
	},
]

export default function App() {
	return (
		<html lang="en">
			<head>
				<Links />
			</head>
			<body>
				<p>Hello World</p>
				<Scripts />
				<EpicShop />
				<LiveReload />
			</body>
		</html>
	)
}
