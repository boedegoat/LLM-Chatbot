import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterProvider, { useRouter } from './Router'
import BackendProvider from './Backend'
import '/index.css'

import NotFound from './NotFound'
import Home from './Home'
import Explore from './Explore'
import AI from './AI'

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
