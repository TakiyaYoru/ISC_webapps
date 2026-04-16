import { useState, type FormEvent } from 'react'
import Reveal from '../components/Reveal'

type Field = {
  name: string
  label: string
  placeholder?: string
  type?: string
  options?: string[]
  textarea?: boolean
  full?: boolean
}

const fields: Field[] = [
  { name: 'name', label: 'Your Name', placeholder: 'How would you like to be addressed?' },
  { name: 'email', label: 'Correspondence Address', placeholder: 'name@example.com', type: 'email' },
  { name: 'age', label: 'Age Range', options: ['30 – 39', '40 – 49', '50 – 59', '60+'] },
  { name: 'concern', label: 'Primary Concern', options: ['Firmness', 'Luminosity', 'Texture', 'Sensitivity', 'Photoageing', 'Other'] },
  { name: 'climate', label: 'Current Climate', options: ['Temperate', 'Humid', 'Arid', 'Alpine'] },
  { name: 'preference', label: 'Preferred Consultation', options: ['In-atelier (Paris)', 'In-atelier (Monaco)', 'Concierge video call'] },
  { name: 'notes', label: 'Anything else we should know', placeholder: 'A current routine, sensitivities, or a particular occasion on the horizon.', textarea: true, full: true },
]

export default function Bespoke() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <section className="pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container-wide grid grid-cols-12 gap-6 md:gap-12 items-end">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <p className="label-caps text-ink/50 mb-6">Bespoke Consultation</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-serif text-display-lg md:text-display-xl leading-[0.98] tracking-tighter text-balance">
                A ritual, composed <span className="italic font-light text-primary">for your months ahead.</span>
              </h1>
            </Reveal>
          </div>
          <Reveal className="col-span-12 md:col-span-5" delay={0.2}>
            <p className="text-body-lg text-ink/70 leading-relaxed text-pretty">
              Our scientists accept a limited number of consultations each month. Please share a few details and a member of our atelier will correspond within forty-eight hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-wide grid grid-cols-12 gap-6 md:gap-16">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#EBDCBF] md:sticky md:top-28">
                <img
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80"
                  alt="A quiet consultation corner of the atelier"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-7 md:pt-4">
            {submitted ? (
              <Reveal>
                <div className="py-16 md:py-24">
                  <p className="label-caps text-primary mb-6">Received</p>
                  <h2 className="font-serif text-display-md leading-[1.08] tracking-tight text-balance">
                    Thank you. A member of our atelier will correspond with you directly.
                  </h2>
                  <p className="mt-8 text-body-lg text-ink/65 max-w-lg leading-relaxed">
                    In the meantime, you may wish to read a recent essay from our laboratory, or explore the collection at your leisure.
                  </p>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                {fields.map((f, i) => (
                  <Reveal key={f.name} delay={i * 0.04} className={f.full ? 'md:col-span-2' : ''}>
                    <div className="border-b border-ink/20 focus-within:border-ink transition-colors pb-2">
                      <label className="label-caps text-ink/55 block mb-2" htmlFor={f.name}>
                        {f.label}
                      </label>
                      {f.options ? (
                        <select
                          id={f.name}
                          name={f.name}
                          required
                          defaultValue=""
                          className="w-full bg-transparent py-2 outline-none text-body appearance-none cursor-pointer"
                        >
                          <option value="" disabled>
                            Please select
                          </option>
                          {f.options.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      ) : f.textarea ? (
                        <textarea
                          id={f.name}
                          name={f.name}
                          rows={4}
                          placeholder={f.placeholder}
                          className="w-full bg-transparent py-2 outline-none placeholder:text-ink/35 text-body resize-none"
                        />
                      ) : (
                        <input
                          id={f.name}
                          name={f.name}
                          type={f.type ?? 'text'}
                          required
                          placeholder={f.placeholder}
                          className="w-full bg-transparent py-2 outline-none placeholder:text-ink/35 text-body"
                        />
                      )}
                    </div>
                  </Reveal>
                ))}

                <Reveal className="md:col-span-2 pt-6" delay={0.3}>
                  <div className="flex flex-wrap items-center gap-6 justify-between">
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-ink/50 max-w-sm">
                      Your details are held in strict confidence, reviewed only by our atelier team.
                    </p>
                    <button type="submit" className="btn-primary">
                      Request the consultation
                    </button>
                  </div>
                </Reveal>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
