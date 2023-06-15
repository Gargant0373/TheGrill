import ReactDOM from 'react-dom/client'
import MainPage from './pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import './styles/Page.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
