import './index.css'

import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { LoginContextProvider } from './contexts/LoginContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <LoginContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </LoginContextProvider>
  </QueryClientProvider>
)
