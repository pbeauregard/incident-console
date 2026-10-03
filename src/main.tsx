import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const CONTAINER = document.getElementById('root') as HTMLElement

if(!CONTAINER) {
  throw new Error('Root container missing in index.html')
}

createRoot(CONTAINER).render(<App />) 
