import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Footer from './components/Footer.tsx'
import RedirectToForm from './components/RedirectToForm.tsx'
import Gallery from './Gallery'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/olympics" element={<RedirectToForm />} />
      </Routes>
    </HashRouter>
    <Footer />
  </StrictMode>,
);