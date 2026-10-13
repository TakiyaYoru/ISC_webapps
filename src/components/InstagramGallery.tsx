import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { instagramShowcase } from '../data/instagramShowcase'
import { loadInstagramPosts, type InstagramPost } from '../services/instagram'

function InstagramIcon({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
}

function ArrowIcon() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 18 18 6M6 6h12v12" /></svg>
}

type Card = {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  href: string
  kind: 'showcase' | InstagramPost['mediaType']
}

function GalleryCard({ card, featured }: { card: Card; featured: boolean }) {
  const [failed, setFailed] = useState(false)
  const isPost = card.kind !== 'showcase'
  const mediaLabel = card.kind === 'VIDEO' ? 'Video' : card.kind === 'CAROUSEL_ALBUM' ? 'Bộ ảnh' : isPost ? 'Bài viết' : 'Sản phẩm'
  const content: ReactNode = <>
    {!failed && <img
      src={card.imageUrl}
      alt={isPost ? card.title : card.subtitle}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04]"
    />}
    {failed && <div className="absolute inset-0 flex items-center justify-center bg-[#e8e1d5] text-primary/30"><InstagramIcon className="h-14 w-14" /></div>}
    <div className="absolute inset-0 bg-gradient-to-t from-[#101a22]/95 via-[#101a22]/55 to-transparent" />
    <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/35 bg-black/15 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-white backdrop-blur-sm">
      {card.kind === 'VIDEO' && <span aria-hidden="true">▷</span>}{mediaLabel}
    </span>
    {featured && <span className="absolute right-5 top-5 text-white/85"><InstagramIcon /></span>}
    <div className={`absolute inset-x-0 bottom-0 text-white ${featured ? 'p-6 md:p-9' : 'p-4 md:p-5'}`}>
      <p className={`mb-2 text-[9px] uppercase tracking-[0.18em] text-white/80 ${featured ? '' : 'hidden md:block'}`}>{card.subtitle}</p>
      <h3 className={`font-serif text-white leading-[1.15] line-clamp-2 ${featured ? 'text-3xl md:text-[2.6rem]' : 'text-lg md:text-xl'}`}>{card.title}</h3>
      <div className={`flex items-center justify-between border-t border-white/25 pt-3 ${featured ? 'mt-5' : 'mt-3'}`}>
        <span className="text-[9px] uppercase tracking-[0.16em]">{isPost ? 'Xem trên Instagram' : 'Khám phá sản phẩm'}</span><ArrowIcon />
      </div>
    </div>
  </>
  const className = `group relative block min-w-0 overflow-hidden rounded-[2px] bg-[#e8e1d5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary ${featured ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`
  return isPost
    ? <a href={card.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
    : <Link to={card.href} className={className}>{content}</Link>
}

export default function InstagramGallery() {
  const endpoint = import.meta.env.VITE_INSTAGRAM_FEED_URL?.trim()
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(Boolean(endpoint))

  useEffect(() => {
    if (!endpoint) return
    const controller = new AbortController()
    loadInstagramPosts(endpoint, controller.signal)
      .then(data => { if (!controller.signal.aborted) setPosts(data) })
      .catch(() => { /* Keep the product showcase available if the feed is unavailable. */ })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [endpoint])

  const cards: Card[] = posts.length > 0
    ? posts.map(post => ({
      id: post.id,
      title: post.caption.split('\n').find(line => line.trim())?.trim() || 'Một khoảnh khắc cùng IMPERIAL',
      subtitle: '@imperialskincare',
      imageUrl: post.imageUrl,
      href: post.permalink,
      kind: post.mediaType,
    }))
    : instagramShowcase.map(item => ({ ...item, kind: 'showcase' }))

  return (
    <section id="instagram" aria-labelledby="instagram-heading" className="scroll-mt-28 border-t border-secondary/20 bg-[#f0ece4] py-14 md:py-20">
      <div className="container-wide">
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-10 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary"><span className="h-px w-8 bg-secondary/50" />Kết nối cùng IMPERIAL</p>
            <h2 id="instagram-heading" className="font-serif text-3xl leading-tight text-primary md:text-[44px]">Chăm sóc da,<br /><span className="italic font-light">chuyện mỗi ngày.</span></h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-on-surface-variant">Những sản phẩm được yêu thích và cảm hứng chăm sóc da. Cùng khám phá thêm trên Instagram của IMPERIAL.</p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <span className="font-serif text-lg italic text-primary">@imperialskincare</span>
            <a href="https://www.instagram.com/imperialskincare/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-primary bg-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-on-primary transition-colors hover:border-secondary hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <InstagramIcon />Theo dõi trên Instagram<ArrowIcon />
            </a>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between gap-3 border-t border-primary/15 pt-4 text-[9px] uppercase tracking-[0.17em] text-on-surface-variant">
          <p>{posts.length ? 'Bài viết từ Instagram' : 'Bộ sưu tập sản phẩm'}</p>
          <p className="text-secondary">IMPERIAL × Le Laffé</p>
        </div>
        <div aria-busy={loading} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {loading
            ? Array.from({ length: 5 }, (_, index) => <div key={index} aria-hidden="true" className={`animate-pulse rounded-[2px] bg-primary/10 ${index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`} />)
            : cards.map((card, index) => <GalleryCard key={card.id} card={card} featured={index === 0} />)}
        </div>
        <div className="mt-5 flex flex-col gap-2 text-[10px] leading-relaxed text-on-surface-variant/75 sm:flex-row sm:items-center sm:justify-between">
          <p>Hình ảnh · Kiến thức · Chăm sóc da</p>
          <a href="https://www.instagram.com/imperialskincare/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">Ghé thăm Instagram của chúng tôi<ArrowIcon /></a>
        </div>
      </div>
    </section>
  )
}
