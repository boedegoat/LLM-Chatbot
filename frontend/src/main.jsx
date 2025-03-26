import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterProvider, { useRouter } from './Router'
import BackendProvider from './Backend'
import '/index.css'

import Home from './Home'
import Explore from './Explore'
import AI from './AI'
import HackathonPage from './HackathonPage'

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
