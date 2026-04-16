import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { journal } from '../data/journal'

export default function Journal() {
  const [feature, ...rest] = journal

  return (
    <div>
      <section className="pt-36 md:pt-44 pb-12">
        <div className="container-wide">
          <Reveal>
            <p className="label-caps text-ink/50 mb-6">The Journal</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-display-lg md:text-display-xl leading-[0.98] tracking-tighter max-w-5xl text-balance">
              Essays from the <span className="italic font-light text-primary">laboratory.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-body-lg text-ink/65 leading-relaxed">
              Quiet, considered writing on the science, provenance, and rituals that compose our work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-wide">
          <Reveal>
            <Link to={`/journal/${feature.slug}`} className="group block mb-24 md:mb-32">
              <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
                <div className="col-span-12 md:col-span-8">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                    <img
                      src={feature.image}
                      alt={feature.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <p className="label-caps text-ink/45 mb-4">
                    {feature.category} · {feature.date} · {feature.readingTime}
                  </p>
                  <h2 className="font-serif text-display-md leading-[1.08] tracking-tight text-balance group-hover:text-primary transition-colors">
                    {feature.title}
                  </h2>
                  <p className="mt-6 text-body-lg text-ink/65 leading-relaxed text-pretty">
                    {feature.excerpt}
                  </p>
                  <p className="mt-10 text-[0.78rem] uppercase tracking-[0.22em] text-ink/60 group-hover:text-primary transition-colors">
                    Read the essay →
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {rest.map((entry, i) => (
              <Reveal key={entry.id} delay={i * 0.1}>
                <Link to={`/journal/${entry.slug}`} className="group block">
                  <div className="relative aspect-[5/6] overflow-hidden bg-surface-container">
                    <img
                      src={entry.image}
                      alt={entry.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-6">
                    <p className="label-caps text-ink/45 mb-3">
                      {entry.category} · {entry.date} · {entry.readingTime}
                    </p>
                    <h3 className="font-serif text-3xl tracking-tight leading-[1.15] group-hover:text-primary transition-colors text-balance">
                      {entry.title}
                    </h3>
                    <p className="mt-4 text-body text-ink/60 line-clamp-2">{entry.excerpt}</p>
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
