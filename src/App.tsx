import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'
import Collection from './pages/Collection'
import ProductDetail from './pages/ProductDetail'
import Journal from './pages/Journal'
import JournalArticle from './pages/JournalArticle'
import About from './pages/About'
import Faq from './pages/Faq'
import PolicyPrivacy from './pages/PolicyPrivacy'
import PolicyReturns from './pages/PolicyReturns'
import PolicyPurchaseGuide from './pages/PolicyPurchaseGuide'
import PolicyTerms from './pages/PolicyTerms'
import Contact from './pages/Contact'
import Stores from './pages/Stores'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/brand" element={<Collection />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/rituals" element={<ComingSoon />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<JournalArticle />} />
        <Route path="/about" element={<About />} />
        <Route path="/bespoke" element={<ComingSoon />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/policy/privacy" element={<PolicyPrivacy />} />
        <Route path="/policy/returns" element={<PolicyReturns />} />
        <Route path="/policy/purchase-guide" element={<PolicyPurchaseGuide />} />
        <Route path="/policy/terms" element={<PolicyTerms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  )
}
