import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SafeImage from '../components/SafeImage'
import BrandMarquee from '../components/BrandMarquee'
import { products } from '../data/products'
import { journal } from '../data/journal'

const heroImage =
  'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1600&q=85'

const paletteSurface: Record<string, string> = {
  violet: 'bg-[#C9BBD1]',
  bronze: 'bg-[#6B4A2A]',
  sage: 'bg-[#CDE0D4]',
  clay: 'bg-[#E3C9B0]',
  bone: 'bg-[#E8E2D6]',
}

export default function Home() {
  const signature = products.slice(0, 3)
  const latestJournal = journal.slice(0, 3)

  return (
    <div>
      {/* HERO — mobile: full-bleed overlay · desktop: asymmetric */}

      {/* MOBILE HERO (< md) */}
      <section className="md:hidden relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <SafeImage
            src={heroImage}
            alt="Editorial portrait of luminous skin"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '50% 30%' }}
          />
          {/* Atmospheric scrim — dark bottom, light breath at top */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(28,28,25,0.32) 0%, rgba(28,28,25,0) 26%, rgba(28,28,25,0) 42%, rgba(28,28,25,0.55) 80%, rgba(28,28,25,0.82) 100%)',
            }}
          />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-end px-7 pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(3.2rem,15vw,5rem)] leading-[0.94] tracking-tighter text-bone text-balance"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.25)' }}
          >
            Skin,<br />Perfected<br />
            <span className="italic font-light">by Science.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10"
          >
            <Link
              to="/collection"
              className="inline-flex items-center justify-center gap-3 text-on-primary px-8 py-4 text-[0.78rem] uppercase tracking-[0.22em] font-medium transition-all duration-500"
              style={{ backgroundImage: 'linear-gradient(135deg, #705731 0%, #8B6F47 100%)' }}
            >
              Discover the Collection
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="absolute bottom-5 left-0 right-0 z-10 flex items-center justify-center text-[0.62rem] uppercase tracking-[0.3em] text-bone/60"
        >
          <span>↓</span>
        </motion.div>
      </section>

      {/* DESKTOP HERO (md+) — asymmetric editorial */}
      <section className="hidden md:block relative pt-36 pb-32 overflow-hidden">
        <div className="container-wide grid grid-cols-12 gap-10 items-end">
          <div className="col-span-5 relative z-10 pb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="label-caps text-ink/50 mb-8"
            >
              Imperial Skin Care · Est. MMXXV
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-display-xl leading-[0.95] tracking-tighter text-ink text-balance"
            >
              Skin,<br />Perfected<br />
              <span className="italic font-light text-primary">by Science.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 max-w-sm text-body-lg text-ink/70 leading-relaxed text-pretty"
            >
              A house of clinical formulations, composed with the precision of a laboratory and the restraint of an atelier.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85 }}
              className="mt-12 flex flex-wrap items-center gap-5"
            >
              <Link to="/collection" className="btn-primary">
                Discover the Collection
              </Link>
              <Link to="/bespoke" className="btn-underline">
                Bespoke Consultation
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-7 relative h-[78vh] overflow-hidden"
          >
            <SafeImage
              src={heroImage}
              alt="Editorial portrait of luminous skin"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="container-wide mt-10 flex items-center justify-between text-[0.72rem] uppercase tracking-[0.2em] text-ink/40"
        >
          <span>Clinical · Personalised · Provenanced</span>
          <div className="flex gap-8">
            <span>Sérum</span>
            <span>Essence</span>
            <span>Balme</span>
            <span>Rituels</span>
          </div>
          <span>Scroll ↓</span>
        </motion.div>
      </section>

      {/* HOUSE OF BRANDS — slow marquee */}
      <BrandMarquee />

      {/* SIGNATURE COLLECTION */}
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
            <div>
              <Reveal>
                <p className="label-caps text-ink/50 mb-4">I. Flagship</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-serif text-display-lg leading-[1.02] tracking-tight text-balance">
                  The Signature<br />Collection
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link to="/collection" className="btn-underline">
                See the full atelier →
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-10">
            {/* Hero product — large */}
            <Reveal className="col-span-12 md:col-span-7">
              <Link to={`/product/${signature[0].slug}`} className="group block">
                <div className={`relative aspect-[4/5] ${paletteSurface[signature[0].palette]} overflow-hidden`}>
                  <SafeImage
                    src={signature[0].image}
                    alt={signature[0].imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute top-6 left-6 label-caps text-bone/90">
                    {signature[0].tagline}
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-headline tracking-tight">{signature[0].name}</h3>
                    <p className="text-body-sm text-ink/55 mt-1">{signature[0].volume}</p>
                  </div>
                  <p className="font-serif text-title text-ink/80">${signature[0].price}</p>
                </div>
              </Link>
            </Reveal>

            <div className="col-span-12 md:col-span-5 flex flex-col gap-10 md:gap-16 md:pt-20">
              {signature.slice(1).map((p, i) => (
                <Reveal key={p.id} delay={0.1 + i * 0.1}>
                  <Link to={`/product/${p.slug}`} className="group block">
                    <div className={`relative aspect-[4/3] ${paletteSurface[p.palette]} overflow-hidden`}>
                      <SafeImage
                        src={p.image}
                        alt={p.imageAlt}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="label-caps text-ink/45 mb-2">{p.tagline}</p>
                        <h3 className="font-serif text-2xl tracking-tight">{p.name}</h3>
                      </div>
                      <p className="font-serif text-title text-ink/80">${p.price}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL PROVENANCE */}
      <section className="py-24 md:py-32 bg-ink text-bone overflow-hidden">
        <div className="container-wide grid grid-cols-12 gap-6 md:gap-16 items-center">
          <Reveal className="col-span-12 md:col-span-6 order-2 md:order-1">
            <div className="relative aspect-[4/5] overflow-hidden">
              <SafeImage
                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1400&q=80"
                alt="Laboratory vials backlit in warm amber"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="col-span-12 md:col-span-6 order-1 md:order-2">
            <Reveal>
              <p className="label-caps text-bone/50 mb-6">II. Clinical Provenance</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-display-md leading-[1.08] tracking-tight text-balance text-bone">
                Every molecule has a story.<br />
                <span className="italic text-primary-fixed">We insist on telling it.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-body-lg text-bone/70 leading-relaxed text-pretty">
                Our formulations are developed inside the clinical research wing of IMPERIAL Beauty Clinic. Each active is sourced, studied, and signed — never borrowed from a catalogue.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-12 grid grid-cols-2 gap-8 max-w-md">
                {[
                  ['12 yrs', 'Of clinical research'],
                  ['94%', 'Measurable results'],
                  ['3 ateliers', 'Across Europe'],
                  ['0 compromises', 'On provenance'],
                ].map(([k, v]) => (
                  <div key={v} className="border-t border-bone/15 pt-5">
                    <p className="font-serif text-2xl text-bone mb-1">{k}</p>
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-bone/55">{v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <Link
                to="/about"
                className="mt-14 inline-flex items-center gap-3 text-[0.8125rem] uppercase tracking-widest font-medium pb-1 border-b border-bone/50 hover:border-primary-fixed hover:text-primary-fixed transition-all"
              >
                Inside the Atelier →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BESPOKE RITUAL — personalised */}
      <section className="py-20 md:py-32">
        <div className="container-wide grid grid-cols-12 gap-6 md:gap-16 items-center">
          <div className="col-span-12 md:col-span-6">
            <Reveal>
              <p className="label-caps text-ink/50 mb-6">III. Personalisation</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-display-md leading-[1.08] tracking-tight text-balance">
                A ritual, composed<br />
                <span className="italic text-primary">only for you.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-body-lg text-ink/70 leading-relaxed text-pretty">
                Begin with a private consultation — in our Paris atelier or by video concierge. Our scientists compose a ritual around the rhythm of your skin, your environment, and your hours.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ol className="mt-12 space-y-6 max-w-md">
                {[
                  ['01', 'A forty-five minute private consultation.'],
                  ['02', 'A bespoke diagnostic, quietly documented.'],
                  ['03', 'A composition tailored to your months ahead.'],
                ].map(([n, t]) => (
                  <li key={n} className="flex gap-6 items-baseline border-t border-ink/10 pt-5">
                    <span className="font-serif italic text-primary text-2xl w-8">{n}</span>
                    <span className="text-body text-ink/75">{t}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.4}>
              <Link to="/bespoke" className="btn-primary mt-14">
                Request a consultation
              </Link>
            </Reveal>
          </div>

          <Reveal className="col-span-12 md:col-span-6" delay={0.2}>
            <div className="relative aspect-[4/5] bg-[#EBDCBF] overflow-hidden">
              <SafeImage
                src="https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=1400&q=80"
                alt="A hand holding a dropper of serum in warm light"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="py-20 md:py-32 bg-surface-container-low">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <Reveal>
                <p className="label-caps text-ink/50 mb-4">IV. Essays</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-serif text-display-lg leading-[1.02] tracking-tight">The Journal</h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link to="/journal" className="btn-underline">Read all essays →</Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {latestJournal.map((entry, i) => (
              <Reveal key={entry.id} delay={i * 0.1}>
                <Link to={`/journal/${entry.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
                    <SafeImage
                      src={entry.image}
                      alt={entry.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-6">
                    <p className="label-caps text-ink/45 mb-3">
                      {entry.category} · {entry.readingTime}
                    </p>
                    <h3 className="font-serif text-2xl tracking-tight leading-[1.2] group-hover:text-primary transition-colors text-balance">
                      {entry.title}
                    </h3>
                    <p className="mt-3 text-body-sm text-ink/60 line-clamp-2">{entry.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section className="py-20 md:py-32">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <p className="label-caps text-ink/50 mb-6">Join the atelier</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-display-md leading-[1.1] tracking-tight text-balance">
                Private correspondence on science, provenance, and the rituals we reserve for our clients.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-12 flex items-end gap-4 max-w-lg mx-auto border-b border-ink/25 focus-within:border-ink transition-colors"
              >
                <input
                  type="email"
                  placeholder="Your correspondence address"
                  className="flex-1 bg-transparent py-3 outline-none placeholder:text-ink/40 text-body text-center md:text-left"
                />
                <button type="submit" className="pb-3 text-[0.78rem] uppercase tracking-widest font-medium hover:text-primary transition-colors">
                  Accept →
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
