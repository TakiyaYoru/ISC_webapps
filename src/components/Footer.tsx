import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-surface-container-low mt-30 md:mt-38">
      <div className="container-wide pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-20">
          <div className="md:col-span-5 space-y-8">
            <Logo />
            <p className="font-serif text-2xl md:text-3xl leading-[1.2] text-ink/90 max-w-md text-balance">
              A clinical atelier, curated quietly.
            </p>
            <form
              id="atelier-join"
              onSubmit={(e) => e.preventDefault()}
              className="flex items-end gap-4 pt-4 max-w-md border-b border-ink/20 focus-within:border-ink transition-colors scroll-mt-24"
            >
              <div className="flex-1">
                <label className="label-caps text-ink/60">Join the atelier</label>
                <input
                  type="email"
                  placeholder="Your correspondence address"
                  className="w-full bg-transparent py-3 outline-none placeholder:text-ink/40 text-body"
                />
              </div>
              <button
                type="submit"
                className="pb-3 text-[0.78rem] uppercase tracking-widest font-medium hover:text-primary transition-colors"
              >
                Enter →
              </button>
            </form>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <h5 className="label-caps text-ink/50 mb-5">Atelier</h5>
              <ul className="space-y-3 text-body-sm text-ink/80">
                <li><Link to="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                <li><Link to="/bespoke" className="hover:text-primary transition-colors">Bespoke Consultation</Link></li>
                <li><Link to="/journal" className="hover:text-primary transition-colors">The Journal</Link></li>
                <li><Link to="/about#provenance" className="hover:text-primary transition-colors">Provenance</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="label-caps text-ink/50 mb-5">Collection</h5>
              <ul className="space-y-3 text-body-sm text-ink/80">
                <li><Link to="/collection" className="hover:text-primary transition-colors">Signature</Link></li>
                <li><Link to="/collection" className="hover:text-primary transition-colors">Daily Ritual</Link></li>
                <li><Link to="/rituals" className="hover:text-primary transition-colors">Weekly Rituals</Link></li>
                <li><Link to="/collection" className="hover:text-primary transition-colors">Gifting</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="label-caps text-ink/50 mb-5">Client Care</h5>
              <ul className="space-y-3 text-body-sm text-ink/80">
                <li><a href="#" className="hover:text-primary transition-colors">Concierge</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="label-caps text-ink/50 mb-5">Clinic</h5>
              <ul className="space-y-3 text-body-sm text-ink/80">
                <li>IMPERIAL Beauty Clinic</li>
                <li>1 Lý Tự Trọng</li>
                <li>Appointments by request</li>
                <li>+84 (0)28 0000 0000</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="divider-tonal" />
        <div className="pt-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-[0.72rem] uppercase tracking-[0.2em] text-ink/50">
          <p>© {new Date().getFullYear()} Imperial Skin Care — a house of IMPERIAL Beauty Clinic.</p>
          <div className="flex gap-8">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
