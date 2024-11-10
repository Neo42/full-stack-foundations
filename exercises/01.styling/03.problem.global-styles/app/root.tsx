import { type LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Scripts } from '@remix-run/react'
import faviconAssetUrl from './assets/favicon.svg'
import { EpicShop } from './epicshop.tsx'
// 🐨 get the fontStylesheetUrl from the ./styles/font.css file
import fontStylesheetUrl from './styles/font.css'

export const links: LinksFunction = () => {
	return [
		{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
		// 🐨 add a link for the fonts file here
		{ rel: 'stylesheet', href: fontStylesheetUrl },
	]
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
