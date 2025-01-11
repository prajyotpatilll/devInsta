import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AppContextProvide from './context/Appcontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvide>
    <App />
  </AppContextProvide>
  </BrowserRouter>,
)
