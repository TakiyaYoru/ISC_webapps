import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { api } from '../services/api'
import type { JournalArticle } from '../services/api'

export default function Journal() {
  const [articles, setArticles] = useState<JournalArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function fetchArticles() {
      setLoading(true)
      try {
        const data = await api.journal.getAll()
        
        if (!active) return

        if (data && data.length > 0) {
          const mapped: JournalArticle[] = data.map((dbArt) => ({
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
          setArticles(mapped)
        }
      } catch (err) {
        console.error('Error fetching journal from API:', err)
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchArticles()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="min-h-[80vh] bg-background text-on-background relative overflow-hidden flex flex-col justify-between">
      {/* Soft atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 85% 15%, rgba(200, 169, 106, 0.05), transparent 60%), radial-gradient(ellipse 70% 50% at 10% 90%, rgba(15, 26, 36, 0.02), transparent 55%)',
        }}
      />

      <div className="container-wide relative pt-8 pb-24 flex-grow flex flex-col justify-start">
        {/* Breadcrumb */}
        <Reveal>
          <nav className="flex text-sm text-on-surface-variant mb-12 font-body-md">
            <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">Blog</span>
          </nav>
        </Reveal>

        {loading ? (
          <div className="flex-grow flex flex-col items-center justify-center py-20 text-center">
            <svg className="animate-spin h-8 w-8 text-secondary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="font-body-md text-on-surface-variant">Đang tải danh sách bài viết...</p>
          </div>
        ) : (
          <div>
            <header className="max-w-3xl mb-16">
              <Reveal>
                <p className="label-caps text-secondary mb-3 tracking-[0.2em] font-semibold">
                  THE JOURNAL
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-serif text-display-md md:text-display-lg leading-[1.1] tracking-tighter text-primary">
                  Nhật ký & Kiến thức Y khoa
                </h1>
              </Reveal>
            </header>

            {articles.length === 0 ? (
              <div className="max-w-2xl py-12">
                <Reveal delay={0.2}>
                  <p className="text-body-lg text-on-surface-variant/80 leading-relaxed mb-12">
                    Các bài viết chuyên sâu về khoa học tế bào, phác đồ trẻ hóa da và các nghi thức chăm sóc da lâm sàng từ phòng thí nghiệm của IMPERIAL đang được biên soạn, dịch thuật và hiệu đính để gửi tới quý khách trong thời gian sớm nhất. Xin quý khách vui lòng quay lại sau.
                  </p>
                </Reveal>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                {articles.map((entry, i) => (
                  <Reveal key={entry.id} delay={i * 0.08}>
                    <Link to={`/journal/${entry.slug}`} className="group block flex flex-col h-full">
                      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container mb-6 border border-secondary/10">
                        <img
                          src={entry.image}
                          alt={entry.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <p className="label-caps text-secondary text-[11px] mb-3 tracking-widest">
                          {entry.category} · {entry.date} · {entry.readingTime}
                        </p>
                        <h3 className="font-serif text-2xl tracking-tight leading-[1.2] group-hover:text-primary transition-colors text-balance mb-4">
                          {entry.title}
                        </h3>
                        <p className="text-body-md text-on-surface-variant/80 leading-relaxed mb-6 line-clamp-3">
                          {entry.excerpt}
                        </p>
                        <div className="mt-auto">
                          <span className="font-label-caps text-[11px] text-primary border-b border-primary pb-1 group-hover:border-secondary group-hover:text-secondary transition-colors tracking-widest">
                            ĐỌC THÊM
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
