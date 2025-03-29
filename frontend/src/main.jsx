import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterProvider, { useRouter } from './Router'
import BackendProvider, { useBackend } from './Backend'
import '/index.css'

import NotFound from './NotFound'
import Home from './Home'
import Explore from './Explore'
import AI from './AI'
import ToolsPage from './Tools'
import IdeaGeneratorPage from './Idea-generator'
import TeamFinderPage from './Team-finder'
import CodeTemplatesPage from './Code-Templates'
import WalletManagerPage from './Create-Wallet'
import CommunityPage from './Community'
import HackathonPage from './HackathonPage'
import CreateHackathonPage from './CreateHackathon'
import ProfilePage from './profile'
import Footer from './Footer'
import Navbar from './Navbar'

const App = () => {
	const { currentPage, matchPattern, getParams } = useRouter()

	const renderPage = () => {
		switch (currentPage) {
			case '/':
				return <Home />
			case '/ai':
				return <AI />
			case '/explore':
				return <Explore />
			case '/explore/1':
				return <HackathonPage />
			case '/tools':
				return <ToolsPage />
			case '/idea-generator':
				return <IdeaGeneratorPage />
			case '/team-finder':
				return <TeamFinderPage />
			case '/code-templates':
				return <CodeTemplatesPage />
			case '/create-wallet':
				return <WalletManagerPage />
			case '/community':
				return <CommunityPage />
			case '/create':
				return <CreateHackathonPage />
			case '/profile':
				return <ProfilePage />
		}

		if (matchPattern('/explore/:hackathonId')) {
			const params = getParams('/explore/:hackathonId')
			return <HackathonPage hackathonId={params.hackathonId} />
		}

		return <NotFound />
	}

	return (
		<main>
			<Navbar />
			{renderPage()}
			<Footer />
		</main>
	)
}

export default App

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider>
		<BackendProvider>
			<App />
		</BackendProvider>
	</RouterProvider>
)
