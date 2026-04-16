import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { findProduct, products } from '../data/products'

const paletteSurface: Record<string, string> = {
  violet: 'bg-[#C9BBD1]',
  bronze: 'bg-[#6B4A2A]',
  sage: 'bg-[#CDE0D4]',
  clay: 'bg-[#E3C9B0]',
  bone: 'bg-[#E8E2D6]',
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = slug ? findProduct(slug) : undefined
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="container-editorial pt-40 pb-32 text-center">
        <p className="label-caps text-ink/50 mb-4">Not found</p>
        <h1 className="font-serif text-display-md tracking-tight">This composition has been archived.</h1>
        <Link to="/collection" className="btn-underline mt-10">Return to the collection</Link>
      </div>
    )
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <div>
      {/* HERO */}
      <section className="pt-32 md:pt-40 pb-24">
        <div className="container-wide">
          <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-ink/45 mb-12">
            <Link to="/" className="hover:text-ink">Imperial</Link>
            <span>/</span>
            <Link to="/collection" className="hover:text-ink">Collection</Link>
            <span>/</span>
            <span className="text-ink/70">{product.name}</span>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-12">
            <Reveal className="col-span-12 md:col-span-7">
              <div className={`relative aspect-[4/5] overflow-hidden ${paletteSurface[product.palette]}`}>
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 label-caps text-bone/90">
                  {product.tagline}
                </div>
              </div>
            </Reveal>

            <div className="col-span-12 md:col-span-5 md:pt-10">
              <Reveal>
                <p className="label-caps text-ink/50 mb-6">{product.collection}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-serif text-display-md leading-[1.05] tracking-tight text-balance">
                  {product.name}
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 font-serif italic text-primary text-xl">{product.tagline}</p>
              </Reveal>

              <div className="divider-tonal my-10" />

              <Reveal delay={0.25}>
                <p className="text-body-lg text-ink/75 leading-relaxed text-pretty">
                  {product.description}
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-10 flex items-baseline gap-4">
                  <p className="font-serif text-3xl">${product.price}</p>
                  <p className="text-body-sm text-ink/50">· {product.volume}</p>
                </div>
              </Reveal>

              <Reveal delay={0.35}>
                <div className="mt-8 flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => {
                      setAdded(true)
                      setTimeout(() => setAdded(false), 2600)
                    }}
                    className="btn-primary"
                  >
                    {added ? 'Reserved ✓' : 'Reserve yours'}
                  </button>
                  <Link to="/bespoke" className="btn-ghost">
                    Consult a scientist
                  </Link>
                </div>
                <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-ink/45">
                  Complimentary concierge delivery · No questions, ever
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-5">
                  {product.clinical.map((c) => (
                    <div key={c.label} className="border-t border-ink/10 pt-4">
                      <p className="label-caps text-ink/50 mb-1">{c.label}</p>
                      <p className="font-serif text-lg">{c.value}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* INGREDIENTS + RITUAL */}
      <section className="py-24 md:py-32 bg-surface-container-low">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <Reveal>
              <p className="label-caps text-ink/50 mb-6">Composition</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-display-md leading-[1.08] tracking-tight text-balance">
                Signed, sourced,<br /><span className="italic text-primary">and studied.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-12 space-y-5 max-w-md">
                {product.ingredients.map((ing, i) => (
                  <li key={ing} className="flex gap-6 items-baseline border-t border-ink/10 pt-5">
                    <span className="font-serif italic text-primary text-lg w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body text-ink/80">{ing}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="label-caps text-ink/50 mb-6">The Ritual</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-display-md leading-[1.08] tracking-tight text-balance">
                A measured gesture,<br /><span className="italic text-primary">repeated slowly.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <ol className="mt-12 space-y-5 max-w-md">
                {product.ritual.map((step, i) => (
                  <li key={step} className="flex gap-6 items-baseline border-t border-ink/10 pt-5">
                    <span className="font-serif italic text-primary text-lg w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body text-ink/80">{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-14 p-8 bg-surface-container">
                <p className="label-caps text-ink/50 mb-4">Observed benefits</p>
                <ul className="space-y-3">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-body-sm text-ink/75">
                      <span className="text-primary">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="mb-16 flex items-end justify-between gap-6">
            <Reveal>
              <h2 className="font-serif text-display-md leading-[1.05] tracking-tight">
                Compose your ritual
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/collection" className="btn-underline">The full atelier →</Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <Link to={`/product/${p.slug}`} className="group block">
                  <div className={`relative aspect-[4/5] overflow-hidden ${paletteSurface[p.palette]}`}>
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="label-caps text-ink/45 mb-2">{p.tagline}</p>
                      <h3 className="font-serif text-2xl tracking-tight">{p.name}</h3>
                    </div>
                    <p className="font-serif text-title">${p.price}</p>
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
