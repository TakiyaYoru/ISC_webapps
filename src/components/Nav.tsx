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
      { to: '/brand?name=shoo', label: 'Shoo (upcomming)' },
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
  const { pathname } = useLocation()
  const { cartCount, setCartOpen } = useCart()
  const navigate = useNavigate()
  const { user, setLoginModalOpen } = useUser()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-ink text-bone py-2 text-center">
        <p className="text-[0.68rem] uppercase tracking-[0.2em] font-medium">
          MIỄN PHÍ GIAO HÀNG CHO TẤT CẢ CÁC ĐƠN TRONG NỘI THÀNH TP.HCM
        </p>
      </div>

      <header className="bg-surface border-b border-outline-variant">
        <nav className="container-wide py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-start">
              <Link to="/" aria-label="IMPERIAL Skin Care home" className="flex items-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtx8Tj9XFuAIxxbtQt-WlTECXBYosGkV8OLe3IMXa8nzKZCX1R7QQbkEHHve47qjgI4v7EBwbO5Ju2-DjaO3-fswugkJ2ZJGb21N_xBaUEHPe4hIi0Ms8N5c8oOCIvCxnxsqNYWA8-eD_uUEc6ffyzybONx-bvsI2EJL01PNz5Yx_mqGM2jC-wVdfWto3e6wTJFa_HSSt9ZAcxrmeS1eXkW23ik5Nl-ROAVCjuBC_CAYq79cNwDxSWs51LHqoKJ9CZyNSCCWtn0SU"
                  alt="IMPERIAL SKINCARE"
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>

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
                    <div className="absolute left-0 top-full pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                      <div className="bg-surface border border-outline-variant/60 shadow-[0_18px_40px_rgba(0,0,0,0.06)] min-w-[240px]">
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

            <div className="flex items-center justify-end gap-5 flex-1 text-ink/80">
              <button aria-label="Search" className="hover:text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className="hover:text-primary transition-colors relative p-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="8" width="14" height="12" rx="2" ry="2" />
                  <path d="M9 8V5a3 3 0 0 1 6 0v3" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold leading-none scale-90">
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
                className="hover:text-primary transition-colors relative"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {user && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-surface" />
                )}
              </button>

              <button
                onClick={() => setOpen((o) => !o)}
                className="md:hidden flex flex-col gap-1.5 p-1 text-ink"
                aria-label="Menu"
              >
                <span className={`h-px w-6 bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
                <span className={`h-px w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
                <span className={`h-px w-6 bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
              </button>
            </div>
          </div>

          {open && (
            <div className="md:hidden border-t border-outline-variant mt-4">
              <div className="py-6 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <div key={link.to} className="flex flex-col gap-3">
                    <NavLink to={link.to} className="text-lg font-serif">
                      {link.label}
                    </NavLink>
                    {link.children && (
                      <div className="pl-4 flex flex-col gap-2">
                        {link.children.map((child) => (
                          <NavLink key={child.to} to={child.to} className="text-sm text-on-surface-variant">
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  )
}

