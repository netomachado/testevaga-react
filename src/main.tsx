import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//desabilitado o strictMode para nao chamar duas vezes a api em dev.
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />,
)
