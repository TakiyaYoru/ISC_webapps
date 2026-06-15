import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useCart } from '../context/CartContext'

const heroImages = [
  'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Hero%20Header/Hero_001.png',
  'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Hero%20Header/Hero_002.png',
  'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Hero%20Header/Hero_003.png?v=2',
]

const bestSellers = [
  {
    slug: 'smtrs-100-de-secret',
    brand: 'LE LAFFÉ',
    name: 'SMTRs-100 De Secret',
    subtitle: 'Skin Booster Pre-Treatment',
    price: 'Liên hệ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/SMTRs100/SMTRs-100.png',
  },
  {
    slug: '500-000-stem-media-skin-booster',
    brand: 'LE LAFFÉ',
    name: '500,000 Stem Media Skin Booster',
    subtitle: 'Skin Booster',
    price: 'Liên hệ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/500,000%20Stem/500,000%20Stem.png',
  },
  {
    slug: 'zayin-rare-elements-vital-facial-essence',
    brand: 'LE LAFFÉ',
    name: 'Zayin Rare Elements Vital Facial Essence',
    subtitle: 'Essence',
    price: 'Liên hệ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Zayin/Zayin.png',
  },
  {
    slug: 'chet-energy-restoration-facial-treatment',
    brand: 'LE LAFFÉ',
    name: 'Chet Energy Restoration Facial Treatment',
    subtitle: 'Cream',
    price: 'Liên hệ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Chet/Chet.png',
  },
  {
    slug: 'alpeh-mito-viv-first-treatment-essence',
    brand: 'LE LAFFÉ',
    name: 'Aleph Mito-viv First Treatment Essence',
    subtitle: 'Essence',
    price: 'Liên hệ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Alpeh/Aleph.png',
  },
]

const blogArticles = [
  {
    category: 'KIẾN THỨC',
    title: 'Hiểu đúng về lão hoá da sau tuổi 35',
    excerpt: 'Khám phá những thay đổi cốt lõi của làn da khi bước qua tuổi 35 và các biện pháp can thiệp khoa học giúp tái tạo mạnh mẽ từ cấp độ tế bào.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAxqaynvOt1R0Ya1_QszHFS1XzlKyQrBRSafsWmkIpD3NpiVVphrrmddurx_78FSXj6er0CFJ-jQyX98OiJV8mD83zRuhUi_iaJtUkT9VmFLUgglKID51KCMANaNAIc5sxIuhfxY__ToDAxHsQfCvwDhgJDbX-gHS_upWB1DRW_9rX0uoBuzsqO6IZwkpoml9PtNs8b2m-Xv8WqTp-IiCunbN0kt1Wp1eO0oaAXuTrmX3CYqFyC-TkTo95hIiDW2Bg_CAfhunDdwI',
  },
  {
    category: 'CHĂM SÓC DA',
    title: 'Phục hồi hàng rào bảo vệ da trong môi trường đô thị',
    excerpt: 'Môi trường ô nhiễm và khói bụi là tác nhân phá vỡ cấu trúc da. Tìm hiểu cách thiết lập lại lá chắn bảo vệ hoàn hảo cho làn da thị thành.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYxt_sChuuLcGLncyk8dBQbnRXc7lJ7CskdSEMvKCqOQG31Txrkx16qOJY-3K1WkJnPq8R7d-CelWO_Hvs2xgEgAnDPBTAl1iBniBdAA7eawALZ7LJl7aKVDKT4lb-RUWWL9Js-ywujq_8S7KMLn6x_1gJ0ta2N5hT52KdsyPLMw-NSoq8ti5ZTGVh_0xe7UALWwfkaV4Sjk_6DV1zTHphog4bOuZdqLUzqO5WlYYZWwpkkj5H5dJghetVcatTtqpHi1seKkMahoc',
  },
  {
    category: 'TƯ VẤN CHUYÊN SÂU',
    title: 'Cách lựa chọn sản phẩm chống lão hoá phù hợp',
    excerpt: 'Không phải mọi hoạt chất đều mang lại kết quả như nhau. Hướng dẫn chi tiết cách chọn lựa công thức tối ưu cho từng nền da và độ tuổi.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc7yCUHtzv01mcZbhAYWXaCh0xxVwT7Yg8H8AWjR43XOXwxPNxaFbH-rJVhKmQbMRrJdTGMz-M73efjYwoESqT225NFLucCrskcCpVkgRnc4EMWeL8tI5sf0b0BKuII1uemNsuONhX-eblflbUhlU1xDPjGlMMppWBF-w5JmvWREPxnAjd1L_kRqJD4YprrdYZs-bYo8TJZxIQrwP5N6DAU-41YOpnWnU6idK7xyzpNZXWytpNm_Ebc5HZIQyscKelZQokvS9ZFv0',
  },
]

export default function Home() {
  const { addToCart } = useCart()
  const [articles, setArticles] = useState<Array<{
    category: string
    title: string
    excerpt: string
    image: string
    slug?: string
  }>>(blogArticles)

  useEffect(() => {
    let active = true
    async function fetchArticles() {
      try {
        const { data, error } = await supabase
          .from('journal')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3)
        if (!active) return
        if (data && !error && data.length > 0) {
          const mapped = data.map((dbArt: any) => ({
            category: dbArt.category,
            title: dbArt.title,
            excerpt: dbArt.excerpt,
            image: dbArt.image,
            slug: dbArt.slug,
          }))
          setArticles(mapped)
        }
      } catch (err) {
        console.error('Error fetching blog articles from Supabase:', err)
      }
    }
    fetchArticles()
    return () => {
      active = false
    }
  }, [])

  const [currentHero, setCurrentHero] = useState(0)
  const productSliderRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [sliderWidth, setSliderWidth] = useState(0)

  const checkScroll = () => {
    const el = productSliderRef.current
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10)
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
      setScrollLeft(el.scrollLeft)
      setSliderWidth(el.clientWidth)
    }
  }

  const handleScroll = (direction: 'left' | 'right') => {
    const el = productSliderRef.current
    if (el) {
      const scrollAmount = direction === 'left' ? -352 : 352
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      const nextScroll = el.scrollLeft + scrollAmount
      setCanScrollLeft(nextScroll > 10)
      setCanScrollRight(nextScroll + el.clientWidth < el.scrollWidth - 10)
      setTimeout(checkScroll, 400)
    }
  }

  useEffect(() => {
    const el = productSliderRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll)
      // Check after rendering
      setTimeout(checkScroll, 500)
      window.addEventListener('resize', checkScroll)
    }
    return () => {
      el?.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const scriptSrc = 'https://elfsightcdn.com/platform.js'
    if (document.querySelector(`script[src="${scriptSrc}"]`)) return

    const script = document.createElement('script')
    script.src = scriptSrc
    script.async = true
    document.body.appendChild(script)
  }, [])

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

  return (
    <div>
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

      <section className="py-16 bg-surface border-y border-secondary/20 overflow-hidden relative flex flex-col items-center">
        <h2 className="sr-only md:not-sr-only text-center w-full uppercase tracking-widest text-[14px] font-label-caps text-secondary mb-16">
          THƯƠNG HIỆU TẠI IMPERIAL SKIN CARE
        </h2>
        <div className="relative w-full flex items-center">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />
          <div className="flex whitespace-nowrap animate-marquee items-center text-primary w-max">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="mx-12 font-headline-md italic text-3xl">Le Laffé</span>
                <span className="text-secondary text-sm">◆</span>
                <span className="mx-12 font-body-lg text-2xl tracking-[0.2em] uppercase">Shoo</span>
                <span className="text-secondary text-sm">◆</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section-gap bg-surface relative">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
            <div className="lg:col-span-4 flex flex-col items-start lg:sticky top-32 self-start">
              <span className="font-label-caps text-label-caps text-secondary mb-4 tracking-widest">THE ESSENTIALS</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Sản phẩm bán chạy</h2>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 border-b border-primary pb-1 font-label-caps text-label-caps text-primary hover:text-secondary hover:border-secondary transition-colors duration-300"
              >
                KHÁM PHÁ TẤT CẢ <span className="text-[16px]">→</span>
              </Link>
            </div>

            <div className="lg:col-span-8 relative">
              {/* Previous Button (Cocoon Style) */}
              <button
                className={`absolute left-0 top-[188px] -translate-y-1/2 z-10 w-10 h-16 bg-primary/90 text-bone flex items-center justify-center transition-all duration-300 shadow-float hover:bg-secondary hover:scale-105 ${
                  canScrollLeft ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
                onClick={() => handleScroll('left')}
                aria-label="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Next Button (Cocoon Style) */}
              <button
                className={`absolute right-0 top-[188px] -translate-y-1/2 z-10 w-10 h-16 bg-primary/90 text-bone flex items-center justify-center transition-all duration-300 shadow-float hover:bg-secondary hover:scale-105 ${
                  canScrollRight ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
                onClick={() => handleScroll('right')}
                aria-label="Next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Slider wrapper with overflow hidden to clip items */}
              <div className="overflow-hidden">
                <div className="flex gap-8 overflow-x-hidden pb-8" ref={productSliderRef}>
                  {bestSellers.map((product, index) => {
                    const cardStart = index * 352
                    const cardEnd = cardStart + 320
                    const isFullyVisible = sliderWidth === 0 || (cardStart >= scrollLeft - 10 && cardEnd <= scrollLeft + sliderWidth + 10)

                    return (
                      <div
                        key={product.slug}
                        className={`group flex flex-col w-[320px] shrink-0 relative transition-all duration-300 ${
                          !isFullyVisible ? 'pointer-events-none select-none' : ''
                        }`}
                      >
                        {/* Image Container with pure white background to blend with cool grey JPGs and transparent PNGs */}
                        <div className="aspect-square bg-white border border-secondary/5 mb-4 relative flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-secondary/10">
                          <img
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                            src={product.image}
                          />
                          <Link to={`/product/${product.slug}`} className="absolute inset-0 z-10" aria-label={product.name} />
                        </div>

                        {/* Info Container */}
                        <div className="flex flex-col flex-1 px-1">
                          <span className="font-label-caps text-[10px] text-secondary mb-1 block tracking-widest">{product.brand}</span>
                          <Link to={`/product/${product.slug}`} className="hover:text-secondary transition-colors">
                            <h3 className="font-body-lg font-medium text-[16px] text-primary mb-1 line-clamp-2 min-h-[44px] leading-snug">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="font-label-caps text-[10px] text-on-surface-variant/60 uppercase tracking-wider mb-4">
                            {product.subtitle}
                          </p>

                          {/* Bottom row: Price and Add to Cart */}
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-secondary/10">
                            <span className="font-body-md font-semibold text-primary">{product.price}</span>
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
                              className="relative z-20 w-10 h-10 bg-[#EADECC] hover:bg-[#D9CCBA] text-primary flex items-center justify-center transition-colors duration-300 flex-shrink-0"
                              title="Thêm vào giỏ hàng"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                                <line x1="12" y1="13" x2="12" y2="17" />
                                <line x1="10" y1="15" x2="14" y2="15" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface border-t border-secondary/20">
        <img
          alt="Giải pháp đảo ngược dấu hiệu lão hóa"
          className="w-full h-auto object-cover block"
          src="https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Hero%20Header/Section_001.png"
        />
      </section>

      <section className="py-section-gap border-t border-secondary/20 bg-surface">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <h2 className="font-headline-lg text-primary text-[32px] md:text-[40px] italic">@imperialskincare</h2>
            <a
              className="px-6 py-3 border border-outline-variant hover:border-primary transition-colors flex items-center gap-2 font-label-caps text-[12px] tracking-widest text-primary bg-white"
              href="https://www.instagram.com/imperialskincare/"
              target="_blank"
              rel="noreferrer"
            >
              THEO DÕI INSTAGRAM IMPERIAL SKINCARE <span className="text-[16px]"></span>
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

      <section className="py-section-gap bg-surface border-t border-secondary/20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-secondary mb-4 block tracking-widest">JOURNAL</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Blog chăm sóc da</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {articles.map((article) => (
              <Link key={article.title} className="group cursor-pointer flex flex-col" to={article.slug ? `/journal/${article.slug}` : '/journal'}>
                <div className="aspect-[4/3] bg-white border border-secondary/10 overflow-hidden mb-6 relative flex items-center justify-center">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={article.image} alt={article.title} />
                </div>
                <span className="font-label-caps text-[10px] text-secondary mb-3 block tracking-widest">{article.category}</span>
                <h3 className="font-headline-md text-[24px] text-primary mb-4 group-hover:text-secondary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-body-md text-on-surface-variant mb-6 line-clamp-2">{article.excerpt}</p>
                <div className="mt-auto">
                  <span className="font-label-caps text-[11px] text-primary border-b border-primary pb-1 group-hover:border-secondary group-hover:text-secondary transition-colors tracking-widest">
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
