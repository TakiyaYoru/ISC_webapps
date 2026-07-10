import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'

const navLinks = [
  {
    to: '/collection',
    label: 'Sản phẩm',
    withChevron: true,
    children: [
      { to: '/collection?cat=my-pham-tre-hoa', label: 'Mỹ phẩm trẻ hoá' },
      { to: '/collection?cat=chong-lao-hoa', label: 'Chống lão hoá' },
      { to: '/collection?cat=kem-chong-nang', label: 'Kem chống nắng' },
      { to: '/collection?cat=essence', label: 'Essence' },
      { to: '/collection?cat=kem-duong-da', label: 'Kem Dưỡng Da' },
    ],
  },
  {
    to: '/brand',
    label: 'Thương hiệu',
    withChevron: true,
    children: [
      { to: '/brand?name=le-laffe', label: 'Le Laffé' },
      { to: '/brand?name=shoo', label: 'Shoo (upcoming)' },
    ],
  },
  { to: '/journal', label: 'Blog' },
  {
    to: '/about/imperial',
    label: 'Về chúng tôi',
    withChevron: true,
    children: [
      { to: '/about/imperial', label: 'IMPERIAL Skin Care' },
      { to: '/about/brands', label: 'Hệ thống thương hiệu' },
      { to: '/about/stores', label: 'Hệ thống cửa hàng' },
      { to: '/about/experience', label: 'Trải nghiệm khách hàng' },
    ],
  },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [shake, setShake] = useState(false)
  const { pathname } = useLocation()
  const { cartCount, setCartOpen } = useCart()
  const navigate = useNavigate()
  const { user, setLoginModalOpen } = useUser()

  useEffect(() => {
    setOpen(false)
    setExpandedIndex(null)
  }, [pathname])

  useEffect(() => {
    const handleCartAdded = () => {
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
    window.addEventListener('cart-item-added', handleCartAdded)
    return () => window.removeEventListener('cart-item-added', handleCartAdded)
  }, [])

  const toggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx)
  }

  return (
    <div className="sticky top-0 z-50">
      {/* Top Banner Message */}
      <div className="bg-ink text-bone py-2 text-center shadow-sm">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium px-4 truncate">
          MIỄN PHÍ GIAO HÀNG CHO TẤT CẢ CÁC ĐƠN TRONG NỘI THÀNH TP.HCM
        </p>
      </div>

      {/* Header Glassmorphism styling */}
      <header className="bg-surface/85 backdrop-blur-md border-b border-outline-variant/40 transition-colors duration-300">
        <nav className="container-wide py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo Left */}
            <div className="flex-1 flex justify-start">
              <Link to="/" aria-label="IMPERIAL Skin Care home" className="flex items-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtx8Tj9XFuAIxxbtQt-WlTECXBYosGkV8OLe3IMXa8nzKZCX1R7QQbkEHHve47qjgI4v7EBwbO5Ju2-DjaO3-fswugkJ2ZJGb21N_xBaUEHPe4hIi0Ms8N5c8oOCIvCxnxsqNYWA8-eD_uUEc6ffyzybONx-bvsI2EJL01PNz5Yx_mqGM2jC-wVdfWto3e6wTJFa_HSSt9ZAcxrmeS1eXkW23ik5Nl-ROAVCjuBC_CAYq79cNwDxSWs51LHqoKJ9CZyNSCCWtn0SU"
                  alt="IMPERIAL SKINCARE"
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Menu Center */}
            <div className="hidden md:flex items-center justify-center gap-8 flex-1 whitespace-nowrap">
              {navLinks.map((link) => (
                <div key={link.to} className="relative group">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1 text-[0.86rem] normal-case tracking-[0.08em] font-medium transition-colors whitespace-nowrap ${
                        isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                      }`
                    }
                  >
                    {link.label}
                    {link.withChevron && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </NavLink>
                  {link.children && (
                    <div className="absolute left-0 top-full pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                      <div className="bg-surface border border-outline-variant/60 shadow-[0_18px_40px_rgba(0,0,0,0.06)] min-w-[240px] rounded-b-md overflow-hidden">
                        {link.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            className="block px-5 py-3 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Icons Right */}
            <div className="flex items-center justify-end gap-4 md:gap-5 flex-1 text-ink/80">
              <button aria-label="Search" className="hover:text-primary transition-colors p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className={`hover:text-primary transition-colors relative p-1 ${shake ? 'animate-shake' : ''}`}
                id="header-cart-icon"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="8" width="14" height="12" rx="2" ry="2" />
                  <path d="M9 8V5a3 3 0 0 1 6 0v3" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-secondary text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-semibold leading-none shadow-sm animate-pulse-subtle">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  if (user) {
                    navigate('/account')
                  } else {
                    setLoginModalOpen(true)
                  }
                }}
                aria-label="Account"
                className="hover:text-primary transition-colors relative p-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {user && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-surface" />
                )}
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setOpen(true)}
                className="md:hidden flex flex-col gap-1.5 p-1 text-ink"
                aria-label="Open Menu"
              >
                <span className="h-0.5 w-6 bg-ink" />
                <span className="h-0.5 w-6 bg-ink" />
                <span className="h-0.5 w-6 bg-ink" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Slide-out Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[100] md:hidden transition-all duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Dark Backdrop Overlay */}
        <div
          className="absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />

        {/* Menu Drawer Content */}
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-surface shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-outline-variant/40 bg-surface-container-low">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtx8Tj9XFuAIxxbtQt-WlTECXBYosGkV8OLe3IMXa8nzKZCX1R7QQbkEHHve47qjgI4v7EBwbO5Ju2-DjaO3-fswugkJ2ZJGb21N_xBaUEHPe4hIi0Ms8N5c8oOCIvCxnxsqNYWA8-eD_uUEc6ffyzybONx-bvsI2EJL01PNz5Yx_mqGM2jC-wVdfWto3e6wTJFa_HSSt9ZAcxrmeS1eXkW23ik5Nl-ROAVCjuBC_CAYq79cNwDxSWs51LHqoKJ9CZyNSCCWtn0SU"
                alt="IMPERIAL SKINCARE"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-primary text-xl"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Drawer Menu Links (with Accordion) */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 no-scrollbar">
            {navLinks.map((link, idx) => {
              const isExpanded = expandedIndex === idx
              return (
                <div key={link.to} className="border-b border-outline-variant/20 pb-4">
                  {link.children ? (
                    <div>
                      <button
                        onClick={() => toggleAccordion(idx)}
                        className="w-full flex items-center justify-between text-left font-serif text-lg text-primary py-1"
                      >
                        <span>{link.label}</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-secondary' : 'text-outline'}`}
                        >
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {/* Sub-menu items container */}
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          isExpanded ? 'max-h-60 mt-3 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pl-4 border-l border-outline-variant/60 flex flex-col gap-3.5 py-1">
                          {link.children.map((child) => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              onClick={() => setOpen(false)}
                              className={({ isActive }) =>
                                `font-sans text-sm tracking-wide transition-colors ${
                                  isActive ? 'text-secondary font-medium' : 'text-on-surface-variant hover:text-primary'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block font-serif text-lg py-1 transition-colors ${
                          isActive ? 'text-secondary' : 'text-primary'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>
              )
            })}
          </div>

          {/* Drawer Footer info */}
          <div className="p-6 border-t border-outline-variant/40 bg-surface-container-low">
            {user ? (
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center font-serif text-secondary text-sm font-semibold">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-primary">{user.name}</p>
                  <Link
                    to="/account"
                    onClick={() => setOpen(false)}
                    className="font-sans text-xs text-secondary hover:underline"
                  >
                    Xem tài khoản ➔
                  </Link>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setOpen(false)
                  setLoginModalOpen(true)
                }}
                className="w-full bg-primary text-on-primary hover:bg-secondary h-12 rounded text-xs uppercase tracking-widest font-semibold transition-colors duration-300 mb-5"
              >
                Đăng nhập
              </button>
            )}

            <div className="font-sans text-[11px] text-on-surface-variant/70 leading-relaxed text-center">
              <p className="font-medium text-primary">IMPERIAL SKIN CARE</p>
              <p className="mt-1">Dưỡng Da Y Khoa Hoàng Gia Seoul</p>
              <p className="mt-0.5">Hotline: 1900 xxxx (8:00 - 21:00)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
