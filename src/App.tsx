import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'
import Collection from './pages/Collection'
import ProductDetail from './pages/ProductDetail'
import Journal from './pages/Journal'
import JournalArticle from './pages/JournalArticle'
import About from './pages/About'
import Faq from './pages/Faq'
import PolicyPurchaseGuide from './pages/PolicyPurchaseGuide'
import PolicyPricing from './pages/PolicyPricing'
import PolicyPage from './pages/PolicyPage'
import { policies } from './data/policies'
import Contact from './pages/Contact'
import BankTransfer from './pages/BankTransfer'
import OrderSuccess from './pages/OrderSuccess'
import Account from './pages/Account'
import AdminDashboard from './pages/AdminDashboard'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import LoginModal from './components/LoginModal'

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Routes>
          <Route path="/payment/gateway" element={<Navigate to="/policy/payment" replace />} />
          <Route path="/imperial-admin" element={<AdminDashboard />} />
          <Route element={<MainLayout />}>
            <Route path="/payment/bank-transfer" element={<BankTransfer />} />
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/brand" element={<Collection />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/rituals" element={<ComingSoon />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<JournalArticle />} />
            <Route path="/about/imperial" element={<About page="imperial" />} />
            <Route path="/about/brands" element={<About page="brands" />} />
            <Route path="/about/stores" element={<About page="stores" />} />
            <Route path="/about/experience" element={<About page="experience" />} />
            <Route path="/about" element={<About page="imperial" />} />
            <Route path="/bespoke" element={<ComingSoon />} />
            <Route path="/faq" element={<Faq />} />
            {policies.map(policy => (
              <Route key={policy.slug} path={`/policy/${policy.slug}`} element={<PolicyPage slug={policy.slug} />} />
            ))}
            <Route path="/policy/purchase-guide" element={<PolicyPurchaseGuide />} />
            <Route path="/policy/pricing" element={<PolicyPricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/account" element={<Account />} />
            <Route path="/stores" element={<About page="stores" />} />
            <Route path="*" element={<ComingSoon />} />
          </Route>
        </Routes>
        <LoginModal />
      </CartProvider>
    </UserProvider>
  )
}
