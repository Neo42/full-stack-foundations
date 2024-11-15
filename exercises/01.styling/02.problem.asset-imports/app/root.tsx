import { type LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Scripts } from '@remix-run/react'
// 🐨 Import the SVG favicon, named as 'faviconAssetUrl', using a default import statement.
import faviconAssetUrl from './assets/favicon.svg'
import { EpicShop } from './epicshop.tsx'

export const links: LinksFunction = () => {
	// 🐨 swap the hard-coded href here with the default import of the favicon
	return [{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl }]
}

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
