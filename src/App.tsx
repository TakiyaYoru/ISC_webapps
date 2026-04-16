import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* Phase 2 — all sub-pages in preparation */}
        <Route path="/collection" element={<ComingSoon />} />
        <Route path="/product/:slug" element={<ComingSoon />} />
        <Route path="/rituals" element={<ComingSoon />} />
        <Route path="/journal" element={<ComingSoon />} />
        <Route path="/journal/:slug" element={<ComingSoon />} />
        <Route path="/about" element={<ComingSoon />} />
        <Route path="/bespoke" element={<ComingSoon />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  )
}
