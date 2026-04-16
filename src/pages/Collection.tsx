import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { products } from '../data/products'

const paletteSurface: Record<string, string> = {
  violet: 'bg-[#C9BBD1]',
  bronze: 'bg-[#6B4A2A]',
  sage: 'bg-[#CDE0D4]',
  clay: 'bg-[#E3C9B0]',
  bone: 'bg-[#E8E2D6]',
}

const filters = ['All', 'The Signature Collection', 'The Daily Ritual', 'The Rituals']

export default function Collection() {
  const [active, setActive] = useState('All')

  const filtered = useMemo(
    () => (active === 'All' ? products : products.filter((p) => p.collection === active)),
    [active],
  )

  return (
    <div>
      <section className="pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container-wide">
          <Reveal>
            <p className="label-caps text-ink/50 mb-6">The Atelier Collection</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-display-lg md:text-display-xl leading-[0.98] tracking-tighter text-balance max-w-5xl">
              Compositions, <span className="italic font-light text-primary">not products.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-body-lg text-ink/65 leading-relaxed">
              A small, deliberate library. Each formula is composed in-house, measured in-clinic, and revised only when science offers us a reason to.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 md:gap-4 mb-16 md:mb-20">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.18em] transition-all duration-400 ${
                  active === f
                    ? 'bg-ink text-bone'
                    : 'bg-secondary-container text-ink/70 hover:bg-ink/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 md:gap-x-10 md:gap-y-28">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <Link to={`/product/${p.slug}`} className="group block">
                  <div
                    className={`relative aspect-[4/5] overflow-hidden ${paletteSurface[p.palette]}`}
                  >
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute top-5 left-5 label-caps text-bone/90">
                      {p.tagline}
                    </div>
                  </div>
                  <div className="pt-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="label-caps text-ink/45 mb-2">{p.collection}</p>
                      <h3 className="font-serif text-2xl tracking-tight">{p.name}</h3>
                      <p className="mt-2 text-body-sm text-ink/55">{p.volume}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-title">${p.price}</p>
                      <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-ink/50 group-hover:text-primary transition-colors">
                        View →
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
