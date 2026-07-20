import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { useCart } from '../context/CartContext'
import LoadingScreen from '../components/LoadingScreen'

import type { HeroSlide } from '../services/api'

const certifications = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-auto text-primary">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
    title: 'Cruelty Free Clinical',
    subtitle: 'CAM KẾT KHÔNG THỬ NGHIỆM ĐỘNG VẬT',
    description: 'Toàn bộ quy trình nghiên cứu lâm sàng của dòng sản phẩm Le Laffé được thực hiện 100% bằng phương pháp in-vitro và nuôi cấy tế bào nhân tạo.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-auto text-primary">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: 'Korean Bio-Cellular Certified',
    subtitle: 'CHỨNG NHẬN Y KHOA SEOUL',
    description: 'Được chứng nhận kiểm định chất lượng nghiêm ngặt bởi Hiệp hội Công nghệ Sinh học Tế bào Hàn Quốc về độ dung nạp an toàn trên da nhạy cảm.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-auto text-primary">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Clinical Exosome Association',
    subtitle: '100% HOẠT CHẤT TINH KHIẾT',
    description: 'Ứng dụng công nghệ màng bao Liposome tinh khiết giúp dẫn truyền sâu tế bào gốc nguyên vẹn vào hạ bì da mà không bị biến tính.'
  }
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
  const [slidesData, setSlidesData] = useState<HeroSlide[]>([])
  const [articles, setArticles] = useState(blogArticlesDefault)
  const [bestSellers, setBestSellers] = useState<any[]>([])
  const [currentHero, setCurrentHero] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Carousel slider refs & states
  const productSliderRef = useRef<HTMLDivElement | null>(null)
  const certSliderRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [productScrollProgress, setProductScrollProgress] = useState(0)
  const [certScrollProgress, setCertScrollProgress] = useState(0)

  // Load dynamic data from api client
  useEffect(() => {
    let active = true
    async function loadHomeData() {
      try {
        const bannersData = await api.banners.getAll()
        if (bannersData && bannersData.length > 0 && active) {
          setSlidesData(bannersData)
        }
      } catch (err) {
        console.error('Error fetching banners from API:', err)
      }

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
      const minDelay = new Promise((resolve) => setTimeout(resolve, 1000))
      await Promise.all([loadHomeData(), minDelay])
      if (active) setIsLoading(false)
    }
    init()

    return () => {
      active = false
    }
  }, [])

  const heroSliderRef = useRef<HTMLDivElement | null>(null)

  // Track scroll to update dot indicator on swipe
  const handleHeroScroll = () => {
    const el = heroSliderRef.current
    if (el) {
      const index = Math.round(el.scrollLeft / el.clientWidth)
      if (index >= 0 && index < slidesData.length) {
        setCurrentHero(index)
      }
    }
  }

  const autoPlayIntervalRef = useRef<any>(null)
  const resumeTimeoutRef = useRef<any>(null)
  const isUserInteractingRef = useRef(false)

  // Scroll programmatically when clicking dots or auto-changing
  const scrollToHero = (index: number) => {
    const el = heroSliderRef.current
    if (el) {
      el.scrollTo({
        left: index * el.clientWidth,
        behavior: 'smooth'
      })
      setCurrentHero(index)
    }
  }

  // Start auto-play helper
  const startAutoPlay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
    }
    autoPlayIntervalRef.current = setInterval(() => {
      if (!isUserInteractingRef.current && slidesData.length > 0) {
        setCurrentHero((prev) => {
          const next = (prev + 1) % slidesData.length
          scrollToHero(next)
          return next
        })
      }
    }, 6000)
  }

  // Stop auto-play helper
  const stopAutoPlay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
      autoPlayIntervalRef.current = null
    }
  }

  // Handle user interaction start (touch start / mouse down)
  const handleInteractionStart = () => {
    isUserInteractingRef.current = true
    stopAutoPlay()
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }
  }

  // Handle user interaction end (touch end / mouse up)
  const handleInteractionEnd = () => {
    isUserInteractingRef.current = false
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }
    // Resume auto-play after 5 seconds of inactivity
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoPlay()
    }, 5000)
  }

  // Handle dot navigation click
  const handleDotClick = (index: number) => {
    handleInteractionStart()
    scrollToHero(index)
    handleInteractionEnd()
  }

  // Auto scroll setup and cleanup
  useEffect(() => {
    startAutoPlay()
    return () => {
      stopAutoPlay()
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
    }
  }, [slidesData])

  // Handle product scroll progress line
  const handleProductScroll = () => {
    const el = productSliderRef.current
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10)
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
      const maxScroll = el.scrollWidth - el.clientWidth
      const progress = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0
      setProductScrollProgress(progress)
    }
  }

  // Handle certification scroll progress line
  const handleCertScroll = () => {
    const el = certSliderRef.current
    if (el) {
      const maxScroll = el.scrollWidth - el.clientWidth
      const progress = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0
      setCertScrollProgress(progress)
    }
  }

  const handleArrowScroll = (direction: 'left' | 'right') => {
    const el = productSliderRef.current
    if (el) {
      const scrollAmount = direction === 'left' ? -290 : 290
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setTimeout(handleProductScroll, 300)
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div>
      {/* 1. Cocoon Editorial Split Hero Banner */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest">
        <div
          ref={heroSliderRef}
          onScroll={handleHeroScroll}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onMouseDown={handleInteractionStart}
          onMouseUp={handleInteractionEnd}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar w-full"
        >
          {slidesData.map((slide, idx) => {
            const isActive = currentHero === idx
            return (
              <div key={idx} className="w-full shrink-0 snap-start flex flex-col md:flex-row min-h-[65vh] md:min-h-[80vh]">
                {/* Photo Area */}
                <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative bg-surface-container-low overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${
                      isActive ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  {/* Subtle vignette mix overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent mix-blend-multiply" />
                </div>

                {/* Solid Color Content Block */}
                <div className={`w-full md:w-1/2 ${slide.bgColor} ${slide.textColor} p-6 md:p-16 lg:p-24 flex flex-col justify-center items-start text-left relative overflow-hidden`}>
                  {/* Staggered text fade/slide mix transitions */}
                  <span className={`font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold opacity-80 mb-3 md:mb-6 transition-all duration-700 delay-100 transform ${
                    isActive ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {slide.tagline}
                  </span>
                  
                  <h2 className={`font-serif text-2xl md:text-4xl lg:text-5xl leading-[1.1] mb-1 font-medium transition-all duration-700 delay-200 transform ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {slide.title}
                  </h2>
                  
                  <h3 className={`font-serif italic text-lg md:text-3xl mb-4 md:mb-6 font-light opacity-90 transition-all duration-700 delay-300 transform ${
                    isActive ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {slide.titleSuffix}
                  </h3>
                  
                  <p className={`font-sans text-xs md:text-base leading-relaxed opacity-75 max-w-md mb-6 md:mb-8 transition-all duration-700 delay-400 transform ${
                    isActive ? 'opacity-75 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {slide.description}
                  </p>
                  
                  <div className={`w-full sm:w-auto transition-all duration-700 delay-500 transform ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <Link
                      to={slide.link}
                      className={`w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 ${slide.btnClass} text-xs uppercase tracking-widest font-semibold transition-colors text-center rounded block`}
                    >
                      XEM NGAY ➔
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Slide Dots Indicator Overlay */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2.5 z-10">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                currentHero === index ? 'bg-secondary w-5' : 'bg-outline-variant/65'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Brand Logo Marquee Bar */}
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

      {/* 3. Sản Phẩm Bán Chạy (Carousel with Progress Line) */}
      <section className="py-12 md:py-24 bg-surface relative">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative">
            {/* Left aligned title */}
            <div className="lg:col-span-4 flex flex-col items-start lg:sticky top-32 self-start mb-4 lg:mb-0">
              <span className="font-sans text-[10px] uppercase tracking-widest text-secondary mb-3 font-semibold block">THE ESSENTIALS</span>
              <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight font-medium">
                Sản phẩm <span className="font-sans font-bold uppercase tracking-wide">BÁN CHẠY</span>
              </h2>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 border-b border-primary pb-1 font-sans text-xs uppercase tracking-widest text-primary hover:text-secondary hover:border-secondary transition-colors duration-300 font-semibold mt-6"
              >
                KHÁM PHÁ TẤT CẢ ➔
              </Link>
            </div>

            {/* Carousel Right */}
            <div className="lg:col-span-8 relative">
              {/* Desktop Nav Arrows */}
              <button
                className={`hidden md:flex absolute -left-5 top-[188px] -translate-y-1/2 z-10 w-10 h-14 bg-primary text-bone items-center justify-center transition-all duration-300 shadow-float hover:bg-secondary ${
                  canScrollLeft ? 'opacity-100' : 'opacity-30 pointer-events-none'
                }`}
                onClick={() => handleArrowScroll('left')}
                aria-label="Previous"
              >
                ←
              </button>

              <button
                className={`hidden md:flex absolute -right-5 top-[188px] -translate-y-1/2 z-10 w-10 h-14 bg-primary text-bone items-center justify-center transition-all duration-300 shadow-float hover:bg-secondary ${
                  canScrollRight ? 'opacity-100' : 'opacity-30 pointer-events-none'
                }`}
                onClick={() => handleArrowScroll('right')}
                aria-label="Next"
              >
                →
              </button>

              {/* Slider list */}
              <div className="overflow-hidden">
                <div
                  className="flex gap-5 md:gap-8 overflow-x-auto no-scrollbar md:overflow-x-hidden pb-6"
                  ref={productSliderRef}
                  onScroll={handleProductScroll}
                >
                  {bestSellers.map((product) => (
                    <div
                      key={product.slug}
                      className="group flex flex-col w-[260px] md:w-[320px] shrink-0 relative transition-all duration-300"
                    >
                      {/* Image Card on Grey Background */}
                      <div className="aspect-square bg-white border border-outline-variant/30 mb-5 relative flex items-center justify-center overflow-hidden transition-all duration-300 rounded-lg group-hover:border-primary/50 shadow-ambient-sm">
                        <img
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-[1.03] transition-transform duration-700 mix-blend-multiply"
                          src={product.image}
                        />
                        <Link to={`/product/${product.slug}`} className="absolute inset-0 z-10" aria-label={product.name} />
                      </div>

                      {/* Details (Left aligned like Cocoon style) */}
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

      {/* 4. Triết lý Thương hiệu (Overlay Card on Botanicals image) */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center py-20 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1600&q=80')` }}>
        {/* Semi-transparent dark overlay */}
        <div className="absolute inset-0 bg-black/25 z-0" />

        {/* Center off-white Overlay Card */}
        <div className="relative z-10 w-[90%] max-w-md bg-surface-bright/95 backdrop-blur-sm border border-secondary/15 p-8 md:p-12 text-center rounded-lg shadow-ambient">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-semibold mb-3 block">ROYAL SKIN CARE ETHOS</span>
          <h2 className="font-serif text-3xl text-primary font-medium mb-1">Triết lý</h2>
          <h3 className="font-sans font-bold text-2xl uppercase tracking-wider text-primary mb-6">THƯƠNG HIỆU</h3>
          
          <p className="font-sans text-sm md:text-base leading-relaxed text-on-surface-variant/90 max-w-sm mx-auto">
            Tại IMPERIAL, chúng tôi tin rằng làn da phản ánh sự cân bằng sinh học hoàn hảo. Kết hợp di sản y khoa Seoul và công nghệ Exosome hiện đại, chúng tôi kiến tạo các nghi thức chăm sóc da chuẩn mực hoàng gia, tái phục hồi sinh lực biểu bì từ cấp độ tế bào.
          </p>

          <Link
            to="/about/imperial"
            className="inline-block mt-8 bg-primary text-on-primary hover:bg-secondary h-12 px-8 flex items-center justify-center text-xs uppercase tracking-widest font-semibold transition-colors duration-300 w-full rounded"
          >
            TÌM HIỂU THÊM ➔
          </Link>
        </div>
      </section>

      {/* 5. Chứng nhận Quốc tế (Certifications Slider) */}
      <section className="py-16 md:py-24 bg-surface border-b border-outline-variant/30">
        <div className="container-wide text-center">
          <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold mb-3 block">ASSURED QUALITY</span>
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-12 font-medium">Chứng nhận bởi các tổ chức quốc tế</h2>

          {/* Swipeable certifications list */}
          <div className="relative max-w-5xl mx-auto">
            <div 
              className="flex gap-8 overflow-x-auto no-scrollbar md:grid md:grid-cols-3 pb-6"
              ref={certSliderRef}
              onScroll={handleCertScroll}
            >
              {certifications.map((cert, idx) => (
                <div key={idx} className="w-[280px] shrink-0 md:w-auto flex flex-col items-center px-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6">
                    {cert.icon}
                  </div>
                  <h3 className="font-serif text-lg text-primary mb-2 font-medium">{cert.title}</h3>
                  <h4 className="font-sans text-[9px] text-secondary uppercase tracking-widest font-semibold mb-3">{cert.subtitle}</h4>
                  <p className="font-sans text-xs leading-relaxed text-on-surface-variant/80 max-w-xs">{cert.description}</p>
                </div>
              ))}
            </div>

            {/* Mobile Scroll Progress Line */}
            <div className="w-28 h-[2px] bg-outline-variant/30 mx-auto mt-4 relative rounded-full overflow-hidden md:hidden">
              <div
                className="absolute top-0 bottom-0 left-0 bg-secondary transition-all duration-150 rounded-full"
                style={{
                  width: '35%',
                  transform: `translateX(${certScrollProgress * 1.85}%)`
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Recycle / Campaign Banner (Hành trình Xanh) */}
      <section className="relative w-full h-[45vh] md:h-[50vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="absolute inset-0 bg-black/35 z-0" />

        <div className="relative z-10 text-center px-6">
          <h2 className="font-sans font-bold text-3xl md:text-4xl uppercase tracking-wider text-white mb-2">THU HỒI VỎ CHAI</h2>
          <h3 className="font-serif italic text-xl md:text-2xl text-secondary mb-6 font-light">Hành Trình Xanh</h3>
          
          <Link
            to="/contact"
            className="inline-block bg-white text-primary hover:bg-secondary hover:text-white py-3.5 px-8 text-xs uppercase tracking-widest font-semibold transition-colors duration-300 rounded shadow-md"
          >
            TÌM HIỂU THÊM ➔
          </Link>
          
          <p className="font-sans text-xs text-white/80 mt-6 max-w-md mx-auto leading-relaxed">
            Mang vỏ chai Le Laffé cũ đến showroom của chúng tôi để quy đổi điểm tích lũy và đồng hành cùng IMPERIAL kiến tạo lá phổi xanh cho trái đất.
          </p>
        </div>
      </section>

      {/* 7. Instagram Feed */}
      <section className="py-12 md:py-24 border-t border-outline-variant/30 bg-surface">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <h2 className="font-serif text-2xl md:text-[36px] text-primary italic">@imperialskincare</h2>
            <a
              className="px-6 py-3.5 border border-outline-variant hover:border-primary transition-colors flex items-center gap-2 font-sans text-[10px] md:text-[11px] tracking-widest text-primary bg-white font-semibold text-center rounded"
              href="https://www.instagram.com/imperialskincare/"
              target="_blank"
              rel="noreferrer"
            >
              THEO DÕI INSTAGRAM IMPERIAL SKINCARE
            </a>
          </div>

          <div className="relative w-full overflow-hidden pb-6">
            <div className="elfsight-app-11d76882-8cf7-4750-9293-fe8b97970904" data-elfsight-app-lazy />
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-12 bg-surface"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* 8. Blog / Journal Section */}
      <section className="py-12 md:py-24 bg-surface border-t border-outline-variant/40">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold mb-3 block">JOURNAL</span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary font-medium">Blog chăm sóc da</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {articles.map((article) => (
              <Link key={article.title} className="group cursor-pointer flex flex-col" to={article.slug ? `/journal/${article.slug}` : '/journal'}>
                <div className="aspect-[4/3] bg-white border border-outline-variant/30 rounded-lg overflow-hidden mb-6 relative flex items-center justify-center shadow-ambient-sm group-hover:border-primary/50 transition-colors">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={article.image} alt={article.title} />
                </div>
                <span className="font-sans text-[9px] text-on-surface-variant/70 mb-2 block tracking-widest uppercase font-semibold">{article.category}</span>
                <h3 className="font-serif text-xl text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant/80 mb-5 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                <div className="mt-auto">
                  <span className="font-sans text-[10px] font-semibold text-primary border-b border-primary pb-1 group-hover:border-secondary group-hover:text-secondary transition-colors tracking-widest">
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
