import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

export default function About() {
  return (
    <div>
      <section className="pt-36 md:pt-44 pb-8">
        <div className="container-wide">
          <Reveal>
            <p className="label-caps text-ink/50 mb-6">The Atelier</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-display-lg md:text-display-xl leading-[0.98] tracking-tighter max-w-5xl text-balance">
              A house built on <span className="italic font-light text-primary">quiet precision.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-wide grid grid-cols-12 gap-6 md:gap-12 items-end">
          <Reveal className="col-span-12 md:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80"
                alt="A quiet interior of the Imperial atelier"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-5" delay={0.15}>
            <p className="font-serif italic text-3xl md:text-4xl leading-[1.25] tracking-tight text-balance">
              "We are not a beauty brand. We are a clinical atelier that happens to make beauty work."
            </p>
            <p className="mt-8 label-caps text-ink/50">— The Founding Principle</p>
          </Reveal>
        </div>
      </section>

      <section id="provenance" className="py-24 md:py-32 bg-surface-container-low">
        <div className="container-wide grid grid-cols-12 gap-6 md:gap-12 items-start">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <p className="label-caps text-ink/50 mb-6">Provenance</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-display-md leading-[1.08] tracking-tight text-balance">
                From clinic<br /><span className="italic text-primary">to vanity.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal className="col-span-12 md:col-span-7" delay={0.15}>
            <div className="space-y-7 text-body-lg text-ink/75 leading-relaxed text-pretty">
              <p>
                Imperial Skin Care is the consumer house of <span className="link-serif">IMPERIAL Beauty Clinic</span> — a medical group quietly serving a small, considered clientele for over a decade.
              </p>
              <p>
                Every formula begins inside our clinical research wing. It is tested by our physicians, refined by our cosmetic chemists, and released only when it earns its place on the vanity of a client who asked us for something better than what the market offered.
              </p>
              <p>
                We do not discount. We do not launch seasonally. We do not chase trends. The work that matters — the work we are proud of — is measured in decades, not quarters.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="mb-16">
            <Reveal>
              <p className="label-caps text-ink/50 mb-4">Our Principles</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-display-md leading-[1.08] tracking-tight max-w-3xl text-balance">
                Four lines we do not cross.
              </h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
            {[
              ['Clinical before cosmetic', 'A formula must be studied by physicians before it is styled for a vanity.'],
              ['Provenance, always signed', 'Every active we use can be traced — and we will tell you where it came from if you ask.'],
              ['Restraint over abundance', 'A small, considered library. We would rather release nothing than release noise.'],
              ['Personalisation, by hand', 'Your ritual is composed around your skin, not around our inventory.'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 0.08}>
                <div className="border-t border-ink/10 pt-7">
                  <p className="font-serif italic text-primary text-xl mb-4">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-serif text-2xl tracking-tight mb-4 text-balance">{t}</h3>
                  <p className="text-body text-ink/65 leading-relaxed text-pretty">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-ink text-bone">
        <div className="container-editorial text-center">
          <Reveal>
            <p className="label-caps text-bone/50 mb-6">An invitation</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-display-md md:text-display-lg leading-[1.05] tracking-tight text-balance max-w-3xl mx-auto">
              Consider a private consultation with<br />
              <span className="italic text-primary-fixed">our scientists.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-wrap gap-5 justify-center">
              <Link to="/bespoke" className="btn-primary">Request a consultation</Link>
              <Link to="/collection" className="inline-flex items-center gap-3 border border-bone/30 text-bone px-8 py-4 text-[0.8125rem] uppercase tracking-widest font-medium hover:bg-bone hover:text-ink transition-all duration-500">
                Explore the collection
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
