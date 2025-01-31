import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { AnecdoteContextProvider } from './AnecdoteContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AnecdoteContextProvider>
    <Router>
      <App />
    </Router>
  </AnecdoteContextProvider>
)