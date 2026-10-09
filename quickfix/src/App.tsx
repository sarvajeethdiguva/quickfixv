import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceCategoryPage from './pages/ServiceCategoryPage'
import ProvidersPage from './pages/ProvidersPage'
import ProviderDetailPage from './pages/ProviderDetailPage'
import HowItWorksPage from './pages/HowItWorksPage'
import BookingsPage from './pages/BookingsPage'
import JoinProPage from './pages/JoinProPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:categoryId" element={<ServiceCategoryPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/provider/:providerId" element={<ProviderDetailPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/join-pro" element={<JoinProPage />} />
        {/* Auth routes redirect to 404 until implemented */}
        <Route path="/login" element={<Navigate to="/providers" replace />} />
        <Route path="/profile" element={<Navigate to="/bookings" replace />} />
        <Route path="/404" element={<NotFoundPage />} />
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
