import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterProvider, { useRouter } from './Router'
import BackendProvider from './Backend'
import '/index.css'

import Home from './Home'
import Explore from './Explore'
import AI from './AI'
import ToolsPage from './Tools'
import IdeaGeneratorPage from './Idea-generator'
import TeamFinderPage from './Team-finder'
import CodeTemplatesPage from './Code-Templates'
import WalletManagerPage from './Create-Wallet'
import CommunityPage from './Community'

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
			case '/Tools':
				return <ToolsPage/>
			case '/Idea-generator':
				return <IdeaGeneratorPage/>
			case '/Team-finder':
				return <TeamFinderPage/>
			case '/Code-Templates':
				return <CodeTemplatesPage/>
			case '/Create-Wallet':
				return <WalletManagerPage/>
			case '/Community':
				return <CommunityPage/>
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
