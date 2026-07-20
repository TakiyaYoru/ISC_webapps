import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { useCart } from '../context/CartContext'
import LoadingScreen from '../components/LoadingScreen'

const heroImages = [
  'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Hero%20Header/Hero_001.png',
  'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Hero%20Header/Hero_002.png',
  'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Hero%20Header/Hero_003.png?v=2',
]

const blogArticlesDefault = [
  {
    category: 'KIẾN THỨC',
    title: 'Hiểu đúng về lão hoá da sau tuổi 35',
    excerpt: 'Khám phá những thay đổi cốt lõi của làn da khi bước qua tuổi 35 và các biện pháp can thiệp khoa học giúp tái tạo mạnh mẽ từ cấp độ tế bào.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAxqaynvOt1R0Ya1_QszHFS1XzlKyQrBRSafsWmkIpD3NpiVVphrrmddurx_78FSXj6er0CFJ-jQyX98OiJV8mD83zRuhUi_iaJtUkT9VmFLUgglKID51KCMANaNAIc5sxIuhfxY__ToDAxHsQfCvwDhgJDbX-gHS_upWB1DRW_9rX0uoBuzsqO6IZwkpoml9PtNs8b2m-Xv8WqTp-IiCunbN0kt1Wp1eO0oaAXuTrmX3CYqFyC-TkTo95hIiDW2Bg_CAfhunDdwI',
    slug: 'hieu-dung-ve-lao-hoa-da-sau-tuoi-35',
  },
  {
    category: 'CHĂM SÓC DA',
    title: 'Phục hồi hàng rào bảo vệ da trong môi trường đô thị',
    excerpt: 'Môi trường ô nhiễm và khói bụi là tác nhân phá vỡ cấu trúc da. Tìm hiểu cách thiết lập lại lá chắn bảo vệ hoàn hảo cho làn da thị thành.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYxt_sChuuLcGLncyk8dBQbnRXc7lJ7CskdSEMvKCqOQG31Txrkx16qOJY-3K1WkJnPq8R7d-CelWO_Hvs2xgEgAnDPBTAl1iBniBdAA7eawALZ7LJl7aKVDKT4lb-RUWWL9Js-ywujq_8S7KMLn6x_1gJ0ta2N5hT52KdsyPLMw-NSoq8ti5ZTGVh_0xe7UALWwfkaV4Sjk_6DV1zTHphog4bOuZdqLUzqO5WlYYZWwpkkj5H5dJghetVcatTtqpHi1seKkMahoc',
    slug: 'phuc-hoi-hang-rao-bao-ve-da-trong-moi-truong-do-thi',
  },
  {
    category: 'TƯ VẤN CHUYÊN SÂU',
    title: 'Cách lựa chọn sản phẩm chống lão hoá phù hợp',
    excerpt: 'Không phải mọi hoạt chất đều mang lại kết quả như nhau. Hướng dẫn chi tiết cách chọn lựa công thức tối ưu cho từng nền da và độ tuổi.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc7yCUHtzv01mcZbhAYWXaCh0xxVwT7Yg8H8AWjR43XOXwxPNxaFbH-rJVhKmQbMRrJdTGMz-M73efjYwoESqT225NFLucCrskcCpVkgRnc4EMWeL8tI5sf0b0BKuII1uemNsuONhX-eblflbUhlU1xDPjGlMMppWBF-w5JmvWREPxnAjd1L_kRqJD4YprrdYZs-bYo8TJZxIQrwP5N6DAU-41YOpnWnU6idK7xyzpNZXWytpNm_Ebc5HZIQyscKelZQokvS9ZFv0',
    slug: 'cach-lua-chon-san-pham-chong-lao-hoa-phu-hop',
  },
]

export default function Home() {
  const { addToCart } = useCart()
  const [articles, setArticles] = useState(blogArticlesDefault)
  const [bestSellers, setBestSellers] = useState<any[]>([])
  const [currentHero, setCurrentHero] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Carousel slider refs & states
  const productSliderRef = useRef<HTMLDivElement | null>(null)
  const [productScrollProgress, setProductScrollProgress] = useState(0)

  // Load dynamic data from api client
  useEffect(() => {
    let active = true
    async function loadHomeData() {
      try {
        const blogData = await api.journal.getLatest(3)
        if (blogData && blogData.length > 0) {
          const mapped = blogData.map((dbArt) => ({
            category: dbArt.category,
            title: dbArt.title,
            excerpt: dbArt.excerpt,
            image: dbArt.image,
            slug: dbArt.slug,
          }))
          if (active) setArticles(mapped)
        }
      } catch (err) {
        console.error('Error fetching blog articles from API:', err)
      }

      try {
        const prodData = await api.products.getAll()
        if (prodData && prodData.length > 0) {
          const mapped = prodData.slice(0, 5).map((p) => ({
            slug: p.slug,
            brand: 'LE LAFFÉ',
            name: p.name,
            subtitle: p.type,
            price: p.price,
            image: p.images[0],
          }))
          if (active) setBestSellers(mapped)
        }
      } catch (err) {
        console.error('Error fetching products from API:', err)
      }
    }
    async function init() {
      setIsLoading(true)
      const minDelay = new Promise((resolve) => setTimeout(resolve, 1000))
      await Promise.all([loadHomeData(), minDelay])
      if (active) setIsLoading(false)
    }
    init()
    return () => {
      active = false
    }
  }, [])

  // Auto scroll setup for Hero Header
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Elfsight setup
  useEffect(() => {
    const scriptSrc = 'https://elfsightcdn.com/platform.js'
    if (document.querySelector(`script[src="${scriptSrc}"]`)) return

    const script = document.createElement('script')
    script.src = scriptSrc
    script.async = true
    document.body.appendChild(script)
  }, [])

  // Elfsight watermark remover style setup
  useEffect(() => {
    const styleText = `
      a[href*="elfsight"],
      [class*="eapps-link"],
      [class*="watermark"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        height: 0 !important;
        width: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        pointer-events: none !important;
      }
    `

    const hideWatermark = () => {
      const widgets = document.querySelectorAll('[class*="elfsight-app"]')
      widgets.forEach((widget) => {
        if (widget.shadowRoot) {
          if (!widget.shadowRoot.querySelector('#hide-elfsight-style')) {
            const style = document.createElement('style')
            style.id = 'hide-elfsight-style'
            style.textContent = styleText
            widget.shadowRoot.appendChild(style)
          }
        }
        widget.querySelectorAll('*').forEach((child) => {
          if (child.shadowRoot) {
            if (!child.shadowRoot.querySelector('#hide-elfsight-style')) {
              const style = document.createElement('style')
              style.id = 'hide-elfsight-style'
              style.textContent = styleText
              child.shadowRoot.appendChild(style)
            }
          }
        })
      })
    }

    hideWatermark()

    const observer = new MutationObserver(() => {
      hideWatermark()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    const interval = setInterval(hideWatermark, 1000)

    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  // Handle product scroll progress line
  const handleProductScroll = () => {
    const el = productSliderRef.current
    if (el) {
      const maxScroll = el.scrollWidth - el.clientWidth
      if (maxScroll > 0) {
        const progress = (el.scrollLeft / maxScroll) * 100
        setProductScrollProgress(progress)
      }
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div>
      {/* 1. Hero Slideshow (Old layout) */}
      <section className="w-full bg-surface relative overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out w-full"
          style={{ transform: `translateX(-${currentHero * 100}%)` }}
        >
          {heroImages.map((src, index) => (
            <img key={src} alt={`Imperial Skin Care Banner ${index + 1}`} className="w-full h-auto object-cover flex-shrink-0" src={src} />
          ))}
        </div>
      </section>

      {/* 2. Brand Logo Marquee Bar (Old layout with mobile optimizations) */}
      <section className="py-4 md:py-10 bg-surface border-y border-outline-variant/40 overflow-hidden relative flex flex-col items-center justify-center">
        <div className="relative w-full flex items-center">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface to-transparent z-10" />
          <div className="flex whitespace-nowrap animate-marquee items-center text-primary w-max">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="mx-6 md:mx-10 font-serif italic text-lg md:text-2xl text-primary">Le Laffé</span>
                <span className="text-secondary/70 text-[9px] md:text-xs">✦</span>
                <span className="mx-6 md:mx-10 font-sans text-base md:text-xl tracking-[0.25em] uppercase font-light text-primary">SHOO</span>
                <span className="text-secondary/70 text-[9px] md:text-xs">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Sản Phẩm Bán Chạy (New Carousel with Progress Line - The only part to keep!) */}
      <section className="py-12 md:py-24 bg-surface relative">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative">
            {/* Left aligned title */}
            <div className="lg:col-span-4 flex flex-col justify-center items-start text-left">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-semibold mb-3">BEST SELLERS</span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6 leading-tight">Sản phẩm nổi bật</h2>
              <p className="font-sans text-sm text-on-surface-variant/80 leading-relaxed mb-8 max-w-sm">
                Khám phá những công thức chăm sóc da bán chạy nhất, được hàng triệu khách hàng tin dùng để đánh thức nét thanh xuân tươi trẻ của làn da.
              </p>
              <Link
                to="/collection"
                className="hidden lg:inline-flex items-center text-xs uppercase tracking-widest font-semibold border-b border-primary pb-1 text-primary hover:text-secondary hover:border-secondary transition-colors"
              >
                XEM TẤT CẢ SẢN PHẨM ➔
              </Link>
            </div>

            {/* Right aligned snap scroll list */}
            <div className="lg:col-span-8 overflow-hidden relative">
              <div
                ref={productSliderRef}
                onScroll={handleProductScroll}
                className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-6"
              >
                {bestSellers.map((product) => (
                  <div
                    key={product.slug}
                    className="w-[240px] md:w-[280px] shrink-0 snap-start bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4 flex flex-col hover:border-primary transition-all duration-300 shadow-ambient-sm hover:shadow-ambient"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square mb-5 flex items-center justify-center p-4 bg-white border border-outline-variant/10 rounded-md overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col flex-grow text-left px-1">
                      <span className="font-sans text-[9px] uppercase tracking-widest text-on-surface-variant/70 mb-1.5 block font-semibold">Le Laffé</span>
                      <Link to={`/product/${product.slug}`} className="hover:text-secondary transition-colors">
                        <h3 className="font-serif text-lg leading-snug text-primary mb-1 line-clamp-2 min-h-[44px]">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="font-sans text-[10px] text-on-surface-variant/65 uppercase tracking-wider mb-4">
                        {product.subtitle}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-outline-variant/30">
                        <span className="font-sans text-base font-semibold text-secondary">{product.price}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addToCart({
                              slug: product.slug,
                              name: product.name,
                              type: 'Sản phẩm',
                              price: product.price,
                              image: product.image,
                            }, 1)
                          }}
                          className="w-9 h-9 bg-surface-container-high text-primary hover:bg-secondary hover:text-white flex items-center justify-center transition-colors duration-300 rounded-md"
                          title="Thêm vào giỏ hàng"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Scroll Progress Line (Like Cocoon's bottom carousel indicator) */}
              <div className="w-36 h-[2px] bg-outline-variant/30 mx-auto mt-6 relative rounded-full overflow-hidden md:hidden">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-secondary transition-all duration-150 rounded-full"
                  style={{
                    width: '35%',
                    transform: `translateX(${productScrollProgress * 1.85}%)` // 1.85 scales 35% thumb to fill 65% remaining
                  }}
                />
              </div>

              {/* Mobile-friendly "View All Products" CTA */}
              <div className="mt-8 text-center lg:hidden">
                <Link
                  to="/collection"
                  className="inline-flex items-center text-xs uppercase tracking-widest font-semibold border border-outline-variant px-6 py-3 text-primary hover:text-secondary hover:border-secondary transition-colors rounded"
                >
                  Xem tất cả sản phẩm ➔
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Banner Image (Old layout) */}
      <section className="w-full bg-surface border-t border-secondary/20">
        <img
          alt="Giải pháp đảo ngược dấu hiệu lão hóa"
          className="w-full h-auto object-cover block"
          src="https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Hero%20Header/Section_001.png"
        />
      </section>

      {/* 5. Instagram Section (Old layout) */}
      <section className="py-16 border-t border-secondary/20 bg-surface">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <h2 className="font-serif text-primary text-[32px] md:text-[40px] italic">@imperialskincare</h2>
            <a
              className="px-6 py-3.5 border border-outline-variant hover:border-primary transition-colors flex items-center gap-2 font-sans text-xs tracking-widest text-primary bg-white font-semibold rounded"
              href="https://www.instagram.com/imperialskincare/"
              target="_blank"
              rel="noreferrer"
            >
              THEO DÕI INSTAGRAM IMPERIAL SKINCARE
            </a>
          </div>

          <div className="relative w-full overflow-hidden pb-10">
            <div className="elfsight-app-11d76882-8cf7-4750-9293-fe8b97970904" data-elfsight-app-lazy />
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-12 bg-surface"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* 6. Blog / Journal Section (Old layout) */}
      <section className="py-16 bg-surface border-t border-secondary/20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="font-sans text-xs text-secondary mb-4 block tracking-widest uppercase font-semibold">JOURNAL</span>
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-medium">Blog chăm sóc da</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {articles.map((article) => (
              <Link key={article.title} className="group cursor-pointer flex flex-col" to={article.slug ? `/journal/${article.slug}` : '/journal'}>
                <div className="aspect-[4/3] bg-white border border-secondary/10 overflow-hidden mb-6 relative flex items-center justify-center rounded-lg">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={article.image} alt={article.title} />
                </div>
                <span className="font-sans text-[10px] text-secondary mb-3 block tracking-widest uppercase font-semibold">{article.category}</span>
                <h3 className="font-serif text-xl text-primary mb-4 group-hover:text-secondary transition-colors line-clamp-2 min-h-[56px] leading-snug">
                  {article.title}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant/80 mb-6 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                <div className="mt-auto">
                  <span className="font-sans text-[11px] text-primary border-b border-primary pb-1 group-hover:border-secondary group-hover:text-secondary transition-colors tracking-widest font-semibold uppercase">
                    ĐỌC THÊM
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
