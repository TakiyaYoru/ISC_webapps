import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { findArticle, journal } from '../data/journal'

export default function JournalArticle() {
  const { slug } = useParams()
  const article = slug ? findArticle(slug) : undefined

  if (!article) {
    return (
      <div className="container-editorial pt-40 pb-32 text-center">
        <p className="label-caps text-ink/50 mb-4">Not found</p>
        <h1 className="font-serif text-display-md tracking-tight">This essay has been filed away.</h1>
        <Link to="/journal" className="btn-underline mt-10">Return to the journal</Link>
      </div>
    )
  }

  const more = journal.filter((j) => j.id !== article.id).slice(0, 2)

  return (
    <div>
      <section className="pt-32 md:pt-40 pb-16">
        <div className="container-editorial max-w-3xl">
          <Reveal>
            <p className="label-caps text-ink/50 mb-8 text-center">
              {article.category} · {article.date} · {article.readingTime}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-display-md md:text-display-lg leading-[1.05] tracking-tight text-balance text-center">
              {article.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-wide">
          <Reveal>
            <div className="relative aspect-[16/9] max-h-[78vh] overflow-hidden bg-surface-container">
              <img
                src={article.image}
                alt={article.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-editorial max-w-2xl">
          {article.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p
                className={`text-body-lg text-ink/80 leading-[1.75] text-pretty mb-7 ${
                  i === 0 ? 'first-letter:font-serif first-letter:italic first-letter:text-primary first-letter:text-5xl first-letter:mr-2 first-letter:float-left first-letter:leading-[0.9] first-letter:mt-1' : ''
                }`}
              >
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal>
            <div className="divider-tonal my-14" />
            <p className="text-center font-serif italic text-ink/55">
              — Written in the IMPERIAL atelier, Paris
            </p>
          </Reveal>
        </div>
      </section>

      {more.length > 0 && (
        <section className="py-24 bg-surface-container-low">
          <div className="container-wide">
            <Reveal>
              <h2 className="font-serif text-display-md leading-[1.08] tracking-tight mb-16">
                Continue reading
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {more.map((entry, i) => (
                <Reveal key={entry.id} delay={i * 0.1}>
                  <Link to={`/journal/${entry.slug}`} className="group block">
                    <div className="relative aspect-[5/6] overflow-hidden bg-surface-container">
                      <img
                        src={entry.image}
                        alt={entry.imageAlt}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="pt-6">
                      <p className="label-caps text-ink/45 mb-3">
                        {entry.category} · {entry.readingTime}
                      </p>
                      <h3 className="font-serif text-2xl md:text-3xl tracking-tight leading-[1.15] group-hover:text-primary transition-colors text-balance">
                        {entry.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
