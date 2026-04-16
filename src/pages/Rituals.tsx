import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { products } from '../data/products'

const rituals = [
  {
    id: 'r01',
    name: 'The Morning Protocol',
    tagline: 'A quiet beginning',
    duration: 'Six minutes',
    steps: ['bespoke-mist', 'atelier-essence', 'celestial-serum', 'provenance-balm'],
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80',
    description:
      'A brief, measured composition designed to prepare the skin for the day — hydration, protection, and the kind of luminosity that reads as rest, not retouching.',
  },
  {
    id: 'r02',
    name: 'The Evening Ritual',
    tagline: 'Cellular repair, repeated',
    duration: 'Twelve minutes',
    steps: ['clarity-oil', 'atelier-essence', 'celestial-serum', 'provenance-balm'],
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1600&q=80',
    description:
      'The ritual that matters most. Dissolve the day, prepare the skin, deliver repair, then seal. Your skin sleeps with you — ours insists on keeping pace.',
  },
  {
    id: 'r03',
    name: 'The Weekly Rite',
    tagline: 'One evening, one hour',
    duration: 'Forty minutes',
    steps: ['clarity-oil', 'imperial-mask', 'atelier-essence', 'provenance-balm'],
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80',
    description:
      'Reserved for Sundays, or any evening you set aside. Polish, restore, replenish — a chapter of quiet cellular reset.',
  },
]

export default function Rituals() {
  return (
    <div>
      <section className="pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="container-wide">
          <Reveal>
            <p className="label-caps text-ink/50 mb-6">The Rituals</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-display-lg md:text-display-xl leading-[0.98] tracking-tighter max-w-5xl text-balance">
              Compositions, <span className="italic font-light text-primary">not routines.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-body-lg text-ink/65 leading-relaxed">
              A ritual is the temporal structure that allows a formula to do its work. We compose three — one for waking, one for resting, one for renewal.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32 space-y-28 md:space-y-40">
        {rituals.map((r, rIndex) => {
          const steps = r.steps
            .map((slug) => products.find((p) => p.slug === slug))
            .filter(Boolean)
          const reversed = rIndex % 2 === 1
          return (
            <div key={r.id} className="container-wide">
              <div className="grid grid-cols-12 gap-6 md:gap-12 items-center">
                <Reveal className={`col-span-12 md:col-span-6 ${reversed ? 'md:order-2' : ''}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#E3C9B0]">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Reveal>

                <div className={`col-span-12 md:col-span-6 ${reversed ? 'md:order-1' : ''}`}>
                  <Reveal>
                    <p className="label-caps text-ink/50 mb-5">
                      {String(rIndex + 1).padStart(2, '0')} · {r.duration}
                    </p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="font-serif text-display-md leading-[1.05] tracking-tight text-balance">
                      {r.name}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <p className="mt-4 font-serif italic text-primary text-xl">{r.tagline}</p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-8 max-w-md text-body-lg text-ink/70 leading-relaxed text-pretty">
                      {r.description}
                    </p>
                  </Reveal>

                  <Reveal delay={0.3}>
                    <ol className="mt-12 space-y-4 max-w-md">
                      {steps.map((p, i) => (
                        <li key={p!.id}>
                          <Link
                            to={`/product/${p!.slug}`}
                            className="group flex items-baseline justify-between gap-6 border-t border-ink/10 pt-5 hover:text-primary transition-colors"
                          >
                            <div className="flex gap-5 items-baseline">
                              <span className="font-serif italic text-primary text-lg w-8">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span>
                                <p className="font-serif text-xl tracking-tight">{p!.name}</p>
                                <p className="label-caps text-ink/45 mt-1 group-hover:text-primary/70">
                                  {p!.tagline}
                                </p>
                              </span>
                            </div>
                            <span className="text-[0.72rem] uppercase tracking-[0.18em] text-ink/40 group-hover:text-primary">
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </Reveal>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
