import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const labels: Record<string, { label: string; sub: string; detail: string }> = {
  '/collection': {
    label: 'The Collection',
    sub: 'Compositions, not products.',
    detail:
      'Our signed library is being photographed in-atelier and catalogued for a quiet release in the coming weeks.',
  },
  '/rituals': {
    label: 'The Rituals',
    sub: 'Composed routines.',
    detail:
      'The Morning, Evening, and Weekly compositions are being recorded with our scientists. Correspondence will follow.',
  },
  '/journal': {
    label: 'The Journal',
    sub: 'Essays from the laboratory.',
    detail:
      'Our first three essays are in the final edit. Please return — or join the atelier to receive them first.',
  },
  '/about': {
    label: 'The Atelier',
    sub: 'A house of quiet precision.',
    detail:
      'The story of IMPERIAL Beauty Clinic and its consumer house is being written with the care it deserves.',
  },
  '/bespoke': {
    label: 'Bespoke Consultation',
    sub: 'A ritual composed only for you.',
    detail:
      'Our concierge booking channel opens at launch. For early access, please join the atelier below.',
  },
}

function resolveLabel(pathname: string) {
  const base = '/' + (pathname.split('/')[1] ?? '')
  return (
    labels[base] ?? {
      label: 'In Preparation',
      sub: 'A chapter, composed slowly.',
      detail:
        'This page is being quietly prepared. Please return, or join the atelier to be the first to know.',
    }
  )
}

export default function ComingSoon() {
  const { pathname } = useLocation()
  const { label, sub, detail } = resolveLabel(pathname)

  return (
    <div className="min-h-[92vh] flex items-center relative overflow-hidden">
      {/* Soft atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 85% 15%, rgba(139, 111, 71, 0.14), transparent 60%), radial-gradient(ellipse 70% 50% at 10% 90%, rgba(112, 87, 49, 0.08), transparent 55%)',
        }}
      />

      <div className="container-wide relative grid grid-cols-12 gap-6 md:gap-12 items-center py-28 md:py-36">
        <div className="col-span-12 md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="label-caps text-ink/50 mb-8"
          >
            {label} · In preparation
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-display-lg md:text-display-xl leading-[0.98] tracking-tighter text-balance"
          >
            Composed slowly.<br />
            <span className="italic font-light text-primary">Arriving shortly.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-10 max-w-lg font-serif italic text-xl md:text-2xl text-ink/70 leading-relaxed"
          >
            {sub}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-6 max-w-md text-body-lg text-ink/60 leading-relaxed text-pretty"
          >
            {detail}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-14 flex flex-wrap items-center gap-5"
          >
            <Link to="/" className="btn-primary">
              Return to the Home
            </Link>
            <a href="#atelier-join" className="btn-underline">
              Join the atelier →
            </a>
          </motion.div>
        </div>

        {/* Editorial mark */}
        <div className="col-span-12 md:col-span-5 hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.5), transparent 55%), linear-gradient(135deg, #EBDCBF 0%, #8B6F47 100%)',
            }}
          >
            <div className="text-center text-bone/90">
              <p className="font-serif text-[1rem] tracking-[0.5em] mb-6">IMPERIAL</p>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                className="mx-auto opacity-90"
              >
                <path
                  d="M32 6l6 16.4L54 26l-13 11.2L44 55l-12-7.8L20 55l3-17.8L10 26l16-3.6L32 6z"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="font-serif italic text-lg mt-8">Composed at the atelier</p>
              <p className="label-caps mt-4 text-bone/70">Paris · Est. MMXXV</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
