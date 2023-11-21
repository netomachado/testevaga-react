
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AppRoutes } from './routes'
import { UserProvider } from './shared/contexts'

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
      
    </>
  )
}

export default App
