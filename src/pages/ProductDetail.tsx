import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { api } from '../services/api'
import type { Product } from '../services/api'
import LoadingScreen from '../components/LoadingScreen'

const parseLines = (value: string) =>
  value
    .split(/\n+/)
    .map((line) => line.replace(/^[-\s]+/, '').trim())
    .filter(Boolean)

const parseParagraphs = (value: string) =>
  value
    .split(/\n\n+/)
    .map((line) => line.trim())
    .filter(Boolean)

const renderFormattedText = (text: string) => {
  if (!text) return null
  const hasList = /\d+\./.test(text)
  if (!hasList) {
    return <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">{text}</p>
  }

  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)
  const listItems: { num: string; title: string; desc: string }[] = []
  let introLines: string[] = []

  lines.forEach((line) => {
    const match = line.match(/^(\d+)\.\s*([^:]+)(?::\s*(.*))?$/)
    if (match) {
      listItems.push({
        num: match[1],
        title: match[2].trim(),
        desc: (match[3] || '').trim(),
      })
    } else {
      introLines.push(line)
    }
  })

  return (
    <div className="w-full text-center">
      {introLines.length > 0 && (
        <p className="font-sans text-base md:text-lg text-primary font-medium mb-8 max-w-[700px] mx-auto leading-relaxed">
          {introLines.join('\n')}
        </p>
      )}
      <div className="mt-8 space-y-4 text-left max-w-[680px] mx-auto">
        {listItems.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-5 items-start p-5 bg-surface-container-lowest border border-outline-variant/30 hover:border-secondary/50 shadow-ambient-sm transition-all duration-300 group"
          >
            <span className="w-8 h-8 rounded-full border border-secondary text-secondary bg-secondary/5 flex items-center justify-center font-serif text-sm flex-shrink-0 font-semibold mt-0.5 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-300">
              {item.num}
            </span>
            <div className="flex-1">
              <h4 className="font-sans text-base md:text-lg text-primary font-semibold mb-1 group-hover:text-secondary transition-colors duration-300">
                {item.title}
              </h4>
              {item.desc && (
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const parsePrice = (price: string) => {
  if (!price) return ''
  if (price.endsWith('VNĐ')) return price
  return `${price} VNĐ`
}

const parseVolume = (infoLines: string[]) => {
  const volumeLine = infoLines.find((line) => line.toLowerCase().includes('dung tích'))
  if (!volumeLine) return ''
  const parts = volumeLine.split(':')
  return parts.length > 1 ? parts.slice(1).join(':').trim() : volumeLine
}

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    setSelectedImageIndex(0)
    setQuantity(1)
  }, [slug])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyBar(true)
      } else {
        setShowStickyBar(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let active = true
    async function loadProductData() {
      try {
        const currentProduct = await api.products.getBySlug(slug || '')
        const allProducts = await api.products.getAll()

        if (!active) return

        if (currentProduct) {
          setProduct(currentProduct)
          setRelated(allProducts.filter((p) => p.slug !== currentProduct.slug))
        } else {
          setProduct(undefined)
          setRelated([])
        }
      } catch (err) {
        console.error('Error fetching product from API:', err)
      }
    }

    async function init() {
      setLoading(true)
      const minDelay = new Promise((resolve) => setTimeout(resolve, 800))
      await Promise.all([loadProductData(), minDelay])
      if (active) setLoading(false)
    }
    init()

    return () => {
      active = false
    }
  }, [slug])

  const infoLines = product ? parseLines(product.info) : []
  const descriptionParas = product ? parseParagraphs(product.description) : []

  const isSet = product?.slug === 'platinum-stemcell-reverse-aging-solution' || product?.slug === 'comprehensive-skincare-solution-quintet'
  const getSynergyText = () => {
    if (!product) return ''
    if (product.slug === 'platinum-stemcell-reverse-aging-solution') {
      return 'Giải pháp chăm sóc đồng bộ 5 bước kích hoạt năng lượng tế bào và đảo ngược lão hóa toàn diện. Thiết lập một chu trình hoàn chỉnh giúp nuôi dưỡng, phục hồi sâu và duy trì vẻ đẹp bền vững theo thời gian.'
    }
    if (product.slug === 'comprehensive-skincare-solution-quintet') {
      return 'Trải nghiệm trọn vẹn nghi thức chăm sóc da hoàng gia Seoul trong phiên bản thiết kế tinh giản, sang trọng. Thích hợp cho các chuyến du lịch hoặc hành trình khám phá giải pháp trẻ hóa tế bào da.'
    }
    return descriptionParas[1] ?? product.description
  }

  const skinTags = product ? product.skinType.split(',').map((item) => item.trim()).filter(Boolean) : []
  const volume = parseVolume(infoLines)

  const images = product?.images && product.images.length > 0
    ? product.images
    : ['https://lh3.googleusercontent.com/aida-public/AB6AXuCcQ-yxyN5hfuj_R1_6Y-X-pwIbUVISq6RVMm-qM7HvtRu-21ArQFYNGGrgqrrFzc_w2JpfNqF2gq5g_Z93yrMv-R4v2YefUc1MxALmcvM0Pxgkoahf1q-r9lljWXNlsl1D-uzv94LMqpMiGAscWj302hsGPBz6Jcqft1gnsNOeCqA47YQY-DgmE_XGD4xStP9XHCxLx-qJqyQEvrU6HQMBnRA3jrFkEb1_jwxDCajDegxVl1CdK1X770yfqvNCVv-OH_IOOeBE10w']

  const mainImage = images[selectedImageIndex] || images[0]

  const handleAddToCart = () => {
    if (!product) return
    addToCart(
      {
        slug: product.slug,
        name: product.name,
        type: product.type,
        price: product.price,
        image: images[0],
      },
      quantity
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (!product) {
    return (
      <div className="container-editorial pt-32 pb-24 text-center">
        <p className="label-caps mb-4">Không tìm thấy</p>
        <h1 className="font-serif text-3xl text-primary">Sản phẩm đang được cập nhật.</h1>
        <Link to="/collection" className="btn-underline mt-10">Trở về danh sách</Link>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <section className="hidden md:block container-wide py-8">
        <nav className="font-sans text-xs uppercase tracking-wider text-on-surface-variant flex flex-wrap gap-2 items-center">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span className="text-outline-variant">/</span>
          <Link className="hover:text-primary transition-colors" to="/collection">Thương hiệu</Link>
          <span className="text-outline-variant">/</span>
          <span className="text-primary">Le Laffé</span>
          <span className="text-outline-variant">/</span>
          <span className="text-primary truncate max-w-[200px]">{product.name}</span>
        </nav>
      </section>

      {/* Main Details Section */}
      <section className="container-wide pt-6 md:pt-0 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
          {/* Images Section */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="w-full aspect-square border border-outline-variant/30 flex items-center justify-center overflow-hidden p-4 bg-white rounded-lg">
              <img
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
                src={mainImage}
              />
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 border transition-all duration-300 flex items-center justify-center p-2 bg-white rounded overflow-hidden ${
                    selectedImageIndex === index ? 'border-primary shadow-sm' : 'border-outline-variant/30 hover:border-primary/50'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-6 flex flex-col justify-center">
            <div className="mb-8">
              <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 block">Le Laffé • {product.type}</span>
              <h1 className="font-serif text-2xl md:text-4xl text-primary mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="font-sans text-base text-on-surface-variant mb-6 leading-relaxed">
                {descriptionParas[0] ?? product.description}
              </p>
              <p className="font-sans text-xl font-semibold text-secondary">{parsePrice(product.price)}</p>
              {volume && <p className="font-sans text-sm text-outline mt-1">{volume}</p>}
            </div>
            <div className="w-full h-px bg-outline-variant/40 mb-8" />
            
            {/* Quantity Selector & Purchase Buttons */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="font-sans text-sm text-primary font-medium">Số lượng:</span>
                <div className="flex items-center border border-outline-variant/60 h-12 w-32 bg-white rounded-md overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-full flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors font-semibold text-base"
                  >
                    −
                  </button>
                  <span className="flex-1 font-sans text-sm font-semibold text-primary text-center select-none">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-full flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors font-semibold text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:flex-1 bg-primary text-on-primary hover:bg-secondary h-12 md:h-14 text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center rounded-md shadow-sm"
                >
                  {added ? 'Đã thêm ✓' : 'Thêm vào giỏ hàng'}
                </button>
                <Link
                  to="/contact"
                  className="w-full sm:flex-1 border border-outline-variant text-primary h-12 md:h-14 flex items-center justify-center text-xs uppercase tracking-widest font-semibold hover:border-primary hover:bg-surface-container-low transition-all duration-300 rounded-md"
                >
                  Tư vấn trước khi mua
                </Link>
              </div>
            </div>

            {/* Product Meta Details */}
            <div className="space-y-4 font-sans text-sm text-on-surface-variant border-t border-outline-variant/40 pt-8">
              <div className="flex items-center">
                <span className="text-primary font-medium text-xs uppercase tracking-wider w-24">Thời điểm:</span>
                <span className="text-xs">{product.timeUsage}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Center Description Block */}
      <section className="w-full bg-surface-container-low py-12 md:py-16 px-4 text-center">
        <div className="max-w-[800px] mx-auto flex flex-col items-center">
          <div className="w-full text-on-surface-variant font-sans">
            {renderFormattedText(descriptionParas[1] ?? product.description)}
          </div>
        </div>
      </section>

      {/* Benefit Cards Section (Hiệu Quả Đa Tầng) */}
      <section className="container-wide py-16 md:py-24">
        <div className="text-center mb-16">
          <h3 className="font-serif text-2xl md:text-3xl text-primary mb-4">Hiệu Quả Đa Tầng</h3>
          <div className="w-12 h-px bg-primary mx-auto" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-gutter">
          {[
            {
              title: 'Làm dịu & ổn định',
              desc: 'Giảm thiểu tức thì các dấu hiệu kích ứng, đỏ rát, đưa da về trạng thái tĩnh lặng.',
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3 md:mb-5">
                  <path d="M12 20c4.4-4.5 6-9 6-12.5C18 4.5 15.5 3 12 3S6 4.5 6 7.5C6 11 7.6 15.5 12 20z" />
                  <path d="M12 7.5a4.5 4.5 0 0 0-4.5 4.5M12 7.5a4.5 4.5 0 0 1 4.5 4.5" />
                </svg>
              ),
            },
            {
              title: 'Củng cố hàng rào bảo vệ',
              desc: 'Xây dựng lớp màng lipid vững chắc, ngăn chặn sự thất thoát độ ẩm và tác nhân gây hại.',
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3 md:mb-5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
            },
            {
              title: 'Tăng cường độ ẩm nội sinh',
              desc: 'Kích thích khả năng tự tổng hợp Hyaluronic Acid, duy trì làn da ngậm nước sâu.',
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3 md:mb-5">
                  <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
                  <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13v20z" fill="currentColor" fillOpacity="0.2" />
                </svg>
              ),
            },
            {
              title: 'Bảo vệ trước tác nhân lão hóa',
              desc: 'Chống oxy hóa mạnh mẽ, vô hiệu hóa gốc tự do, bảo toàn mạng lưới collagen.',
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3 md:mb-5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6a6 6 0 0 1 6 6 6 6 0 0 1-6 6 4.5 4.5 0 0 0 0-12z" fill="currentColor" />
                </svg>
              ),
            },
          ].map((benefit, index) => (
            <div key={index} className="border border-outline-variant bg-transparent p-4 md:p-6 flex flex-col items-center text-center hover:border-primary transition-colors duration-300 rounded-lg">
              {benefit.icon}
              <h4 className="font-serif text-sm md:text-base text-primary font-medium mb-2 md:mb-3 leading-snug">{benefit.title}</h4>
              <p className="font-sans text-[11px] md:text-xs text-on-surface-variant leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Suitable for Section */}
      {skinTags.length > 0 && (
        <section className="container-wide pb-16 md:pb-24 flex flex-col items-center">
          <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold mb-6">Giải pháp chuyên biệt cho</span>
          <div className="flex flex-wrap justify-center gap-4">
            {skinTags.map((tag) => (
              <div key={tag} className="px-6 py-2 bg-surface-container-high text-primary rounded-full font-sans text-xs font-semibold border border-outline-variant/30">
                {tag}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Oriental Herb Middle Split Section */}
      <section className="w-full bg-surface border-y border-outline-variant/40">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="py-16 lg:pr-24 flex flex-col justify-center bg-surface-container-low lg:bg-transparent lg:border-r border-outline-variant/40">
            <h3 className="font-serif text-2xl md:text-3xl text-primary mb-6 leading-tight">Thảo dược phương Đông & công nghệ phân tử hiện đại</h3>
            <p className="font-sans text-sm md:text-base text-on-surface-variant mb-8 leading-relaxed">
              {getSynergyText()}
            </p>
            <div className="w-12 h-px bg-outline-variant mb-8" />
            <h4 className="font-serif text-lg text-primary font-medium mb-4">Kết cấu mượt nhẹ, thẩm thấu tinh tế</h4>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              {isSet ? 'Kết cấu tinh tế mang lại cảm giác dịu nhẹ, giúp làn da trở nên mịn màng, ổn định và sẵn sàng cho quá trình phục hồi ở chuẩn mực cao hơn.' : (descriptionParas[2] ?? 'Kết cấu tinh tế mang lại cảm giác dịu nhẹ, giúp làn da trở nên mịn màng, ổn định và sẵn sàng cho quá trình phục hồi ở chuẩn mực cao hơn.')}
            </p>
          </div>
          <figure className="w-full h-[50vh] lg:h-auto min-h-[500px] relative bg-surface-container-low">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${images[3] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcQ-yxyN5hfuj_R1_6Y-X-pwIbUVISq6RVMm-qM7HvtRu-21ArQFYNGGrgqrrFzc_w2JpfNqF2gq5g_Z93yrMv-R4v2YefUc1MxALmcvM0Pxgkoahf1q-r9lljWXNlsl1D-uzv94LMqpMiGAscWj302hsGPBz6Jcqft1gnsNOeCqA47YQY-DgmE_XGD4xStP9XHCxLx-qJqyQEvrU6HQMBnRA3jrFkEb1_jwxDCajDegxVl1CdK1X770yfqvNCVv-OH_IOOeBE10w'}')`,
              }}
            />
            {!images[3] && (
              <figcaption className="absolute bottom-4 left-4 right-4 px-4 py-3 text-label text-label-md text-primary/60 bg-surface-container-low/90">
                Hình minh họa kết cấu sản phẩm (sẽ thay bằng ảnh thật).
              </figcaption>
            )}
          </figure>
        </div>
      </section>

      {/* Accordion Details Section */}
      <section className="max-w-[800px] w-full mx-auto px-4 py-12 md:py-20">
        <div className="border-b border-outline-variant/40">
          <details className="group py-6 cursor-pointer" open>
            <summary className="flex justify-between items-center font-serif text-lg text-primary list-none font-medium">
              Mô tả chi tiết
              <span className="group-open:rotate-180 transition-transform duration-300">⌄</span>
            </summary>
            <div className="pt-4 font-sans text-sm md:text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
              {product.description}
            </div>
          </details>
        </div>
        <div className="border-b border-outline-variant/40">
          <details className="group py-6 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg text-primary list-none font-medium">
              Thành phần hoạt chất
              <span className="group-open:rotate-180 transition-transform duration-300">⌄</span>
            </summary>
            <div className="pt-4 font-sans text-sm md:text-base text-on-surface-variant leading-relaxed whitespace-pre-line break-words">
              {product.ingredients || 'Thành phần chi tiết xem trên bao bì sản phẩm.'}
            </div>
          </details>
        </div>
        <div className="border-b border-outline-variant/40">
          <details className="group py-6 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg text-primary list-none font-medium">
              Hướng dẫn nghi thức
              <span className="group-open:rotate-180 transition-transform duration-300">⌄</span>
            </summary>
            <div className="pt-4 font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              {renderFormattedText(product.usage) || <p className="font-sans text-sm md:text-base text-on-surface-variant">Hướng dẫn sử dụng xem trong phần thông tin sản phẩm.</p>}
            </div>
          </details>
        </div>
        <div className="border-b border-outline-variant/40">
          <details className="group py-6 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg text-primary list-none font-medium">
              Phù hợp với làn da nào
              <span className="group-open:rotate-180 transition-transform duration-300">⌄</span>
            </summary>
            <div className="pt-4 font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              {product.skinType}
            </div>
          </details>
        </div>
        <div className="border-b border-outline-variant/40">
          <details className="group py-6 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg text-primary list-none font-medium">
              Lưu ý & Bảo quản
              <span className="group-open:rotate-180 transition-transform duration-300">⌄</span>
            </summary>
            <div className="pt-4 font-sans text-sm md:text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
              {product.info || 'Bảo quản nơi thoáng mát. Tránh ánh sáng mặt trời chiếu trực tiếp.'}
            </div>
          </details>
        </div>
      </section>

      {/* Synergy Products Section */}
      {isSet && (
        <section className="bg-surface-container-low py-16 md:py-24">
          <div className="max-w-[700px] w-full mx-auto text-center px-4">
            <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold mb-4 block">Royal Skincare Synergy</span>
            <h3 className="font-serif text-2xl md:text-3xl text-primary mb-6">Sự Tương Thích Hoàn Hảo</h3>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed mb-8">
              {getSynergyText()}
            </p>
            <Link to="/collection" className="btn-ghost py-3.5 text-xs font-semibold">Khám Phá Chu Trình Chăm Sóc</Link>
          </div>
        </section>
      )}

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="container-wide pb-16 md:pb-24 pt-16 border-t border-outline-variant/20">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl text-primary mb-2">Gợi ý hoàn thiện chu trình</h3>
            <p className="font-sans text-sm text-on-surface-variant">Những thiết kế tương thích hoàn hảo cùng {product.name}.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {related.slice(0, 3).map((item) => (
              <Link key={item.slug} to={`/product/${item.slug}`} className="group cursor-pointer">
                <div className="aspect-square border border-outline-variant/30 mb-6 overflow-hidden flex items-center justify-center p-4 bg-white rounded-lg transition-colors group-hover:border-primary">
                  <img
                    src={item.images[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcQ-yxyN5hfuj_R1_6Y-X-pwIbUVISq6RVMm-qM7HvtRu-21ArQFYNGGrgqrrFzc_w2JpfNqF2gq5g_Z93yrMv-R4v2YefUc1MxALmcvM0Pxgkoahf1q-r9lljWXNlsl1D-uzv94LMqpMiGAscWj302hsGPBz6Jcqft1gnsNOeCqA47YQY-DgmE_XGD4xStP9XHCxLx-qJqyQEvrU6HQMBnRA3jrFkEb1_jwxDCajDegxVl1CdK1X770yfqvNCVv-OH_IOOeBE10w'}
                    alt={item.name}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">{item.type}</span>
                  <h4 className="font-serif text-base text-primary mb-2 font-medium group-hover:text-secondary transition-colors duration-300">{item.name}</h4>
                  <p className="font-sans text-xs text-outline font-semibold uppercase tracking-wider">Khám phá</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Buy Bar for Mobile */}
      {product && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-t border-outline-variant/30 px-6 py-3.5 flex items-center justify-between gap-4 md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 ${
            showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex-1 min-w-0">
            <h4 className="font-serif text-sm text-primary truncate">{product.name}</h4>
            <p className="font-sans text-xs text-secondary font-semibold mt-0.5">{parsePrice(product.price)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-on-primary active:bg-secondary px-5 h-12 text-xs uppercase tracking-widest font-semibold transition-colors duration-200 flex items-center justify-center shrink-0 rounded-md"
          >
            {added ? 'Đã thêm ✓' : 'Mua ngay'}
          </button>
        </div>
      )}
    </div>
  )
}
