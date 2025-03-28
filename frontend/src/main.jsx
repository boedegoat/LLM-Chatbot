import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterProvider, { useRouter } from './Router'
import BackendProvider from './Backend'
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
import HackathonPage from './HackathonPage'
import CreateHackathonPage from './CreateHackathon'

const App = () => {
	const { currentPage } = useRouter()

	const renderPage = () => {
		switch (currentPage) {
			case '/':
				return <Home />
			case '/ai':
				return <AI />
			case '/explore':
				return <Explore />
      		case '/explore/1':
				return <HackathonPage/>
			case '/tools':
				return <ToolsPage/>
			case '/idea-generator':
				return <IdeaGeneratorPage/>
			case '/team-finder':
				return <TeamFinderPage/>
			case '/code-templates':
				return <CodeTemplatesPage/>
			case '/create-wallet':
				return <WalletManagerPage/>
			case '/create':
				return <CreateHackathonPage/>
			default:
				return <NotFound />
		}
	}

	return <main>{renderPage()}</main>
}

export default App

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider>
			<BackendProvider>
				<App />
			</BackendProvider>
		</RouterProvider>
	</React.StrictMode>
)
