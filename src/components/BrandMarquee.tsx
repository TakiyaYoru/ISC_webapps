// House brands under IMPERIAL Beauty Clinic — edit this list to match your roster.
const brands = [
  'Imperial',
  'Atelier Noir',
  'Celeste',
  'La Réserve',
  'Maison Provence',
  'Veridian',
  'Blanche',
  'Sérum de Nuit',
]

export default function BrandMarquee() {
  // Duplicate the list so the translateX(-50%) loop is seamless
  const loop = [...brands, ...brands]

  return (
    <section className="py-16 md:py-24 bg-surface-container-low relative overflow-hidden">
      <div className="container-wide mb-10 md:mb-14">
        <div className="flex items-center justify-center gap-5 text-[0.68rem] md:text-[0.72rem] uppercase tracking-[0.28em] text-ink/45">
          <span className="h-px w-10 md:w-14 bg-ink/25" />
          <span>A House of Brands · Imperial Beauty Clinic</span>
          <span className="h-px w-10 md:w-14 bg-ink/25" />
        </div>
      </div>

      <div className="marquee-mask">
        <div className="marquee-track flex w-max gap-14 md:gap-24">
          {loop.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="shrink-0 flex items-center gap-14 md:gap-24"
            >
              <span className="font-serif italic text-ink/80 text-3xl md:text-5xl tracking-tight whitespace-nowrap">
                {name}
              </span>
              <span className="text-primary/50 text-xl md:text-2xl select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
