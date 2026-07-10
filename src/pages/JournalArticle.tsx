import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { api } from '../services/api'
import type { JournalArticle as JournalEntry } from '../services/api'

export default function JournalArticle() {
  const { slug } = useParams()
  const [article, setArticle] = useState<JournalEntry | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [more, setMore] = useState<JournalEntry[]>([])

  useEffect(() => {
    let active = true
    async function getArticle() {
      if (!slug) return
      setLoading(true)
      try {
        const data = await api.journal.getBySlug(slug)

        if (!active) return

        if (data) {
          const mapped: JournalEntry = {
            id: data.id,
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt,
            category: data.category,
            readingTime: data.readingTime || '5 min',
            image: data.image,
            imageAlt: data.imageAlt || data.title,
            date: data.date,
            body: data.body,
          }
          setArticle(mapped)

          // Load other articles for "Continue reading"
          const allArticles = await api.journal.getAll()
          if (active) {
            const filtered = allArticles
              .filter((j) => j.slug !== mapped.slug)
              .slice(0, 2)
              .map((dbArt) => ({
                id: dbArt.id,
                slug: dbArt.slug,
                title: dbArt.title,
                excerpt: dbArt.excerpt,
                category: dbArt.category,
                readingTime: dbArt.readingTime || '5 min',
                image: dbArt.image,
                imageAlt: dbArt.imageAlt || dbArt.title,
                date: dbArt.date,
                body: dbArt.body,
              }))
            setMore(filtered)
          }
        }
      } catch (err) {
        console.error('Error fetching journal article from API:', err)
      } finally {
        if (active) setLoading(false)
      }
    }

    getArticle()
    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return (
      <div className="container-editorial pt-40 pb-32 text-center">
        <svg className="animate-spin h-8 w-8 text-secondary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="font-body-md text-on-surface-variant">Đang tải bài viết...</p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container-editorial pt-40 pb-32 text-center">
        <p className="label-caps text-ink/50 mb-4">Not found</p>
        <h1 className="font-serif text-display-md tracking-tight">This essay has been filed away.</h1>
        <Link to="/journal" className="btn-underline mt-10">Return to the journal</Link>
      </div>
    )
  }

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
