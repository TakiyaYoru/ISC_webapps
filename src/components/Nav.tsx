import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'

const links = [
  { to: '/collection', label: 'Collection' },
  { to: '/rituals', label: 'Rituals' },
  { to: '/journal', label: 'Journal' },
  { to: '/about', label: 'Atelier' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Home page has a dark mobile hero → nav uses bone tone on mobile before scroll.
  const onHome = pathname === '/'
  const mobileBone = onHome && !scrolled

  const iconTone = mobileBone ? 'text-bone/90 md:text-ink/70' : 'text-ink/70'
  const burgerBar = mobileBone ? 'bg-bone md:bg-ink' : 'bg-ink'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-4' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        <Link to="/" aria-label="IMPERIAL Skin Care home">
          <Logo tone={mobileBone ? 'mobileBone' : 'ink'} />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[0.78rem] uppercase tracking-[0.22em] font-medium transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-ink/80 hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <button aria-label="Search" className="text-ink/70 hover:text-ink transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </button>
          <Link
            to="/bespoke"
            className="text-[0.78rem] uppercase tracking-[0.22em] font-medium text-ink/80 hover:text-ink"
          >
            Bespoke
          </Link>
          <button aria-label="Cart" className="relative text-ink/70 hover:text-ink transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7z" strokeLinejoin="round" />
              <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className={`md:hidden flex flex-col gap-1.5 p-1 ${iconTone}`}
          aria-label="Menu"
        >
          <span className={`h-px w-6 transition-transform ${burgerBar} ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-px w-6 transition-opacity ${burgerBar} ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-6 transition-transform ${burgerBar} ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-outline-variant/20 mt-4">
          <div className="container-editorial py-8 flex flex-col gap-6">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className="font-serif text-2xl tracking-tight">
                {link.label}
              </NavLink>
            ))}
            <Link to="/bespoke" className="font-serif text-2xl tracking-tight">
              Bespoke Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

