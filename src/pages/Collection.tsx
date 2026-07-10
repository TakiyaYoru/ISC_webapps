import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../services/api'

// Fallback hardcoded data in case API connection fails
const FALLBACK_PRODUCTS = [
  {
    slug: 'zayin-rare-elements-vital-facial-essence',
    name: 'Zayin Rare Elements Vital Facial Essence',
    type: 'Essence · 50ml',
    price: '7.400.000 VNĐ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Zayin/Zayin.png',
  },
  {
    slug: 'chet-energy-restoration-facial-treatment',
    name: 'Chet Energy Restoration Facial Treatment',
    type: 'Treatment · 50ml',
    price: '7.000.000 VNĐ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Chet/Chet.png',
  },
  {
    slug: 'smtrs-100-de-secret',
    name: 'SMTRs-100 De Secret',
    type: 'Concentrate · 10ml',
    price: '6.300.000 VNĐ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/SMTRs100/SMTRs-100.png',
    tag: 'Mới',
  },
  {
    slug: '500-000-stem-media-skin-booster',
    name: '500,000 Stem Media Skin Booster',
    type: 'Skin Booster · 30ml',
    price: '11.200.000 VNĐ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/500,000%20Stem/500,000%20Stem.png',
  },
  {
    slug: 'alpeh-mito-viv-first-treatment-essence',
    name: 'Alpeh / Mito-viv First Treatment Essence',
    type: 'Essence · 100ml',
    price: '6.700.000 VNĐ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Alpeh/Aleph.png',
  },
  {
    slug: 'comprehensive-skincare-solution-quintet',
    name: 'Comprehensive Skincare Solution Quintet',
    type: 'Gift Set',
    price: '5.000.000 VNĐ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Comprehensive/quintet_001.jpg',
  },
  {
    slug: 'platinum-stemcell-reverse-aging-solution',
    name: 'Platinum StemCell Reverse-Aging Solution',
    type: 'Set full size',
    price: '31.000.000 VNĐ',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Platinum%20StemCell%20Full/Full.png',
  },
]

const typeOptions = ['Essence', 'Cream', 'Skin Booster', 'Treatment', 'Bộ Mini', 'Set full size', 'Gift Set']

const parsePriceValue = (value: string) =>
  Number(value.replace(/[^0-9]/g, '')) || 0

const formatPrice = (value: number) =>
  `${value.toLocaleString('vi-VN')}đ`

const normalizeType = (value: string) => {
  const base = value.split('·')[0].trim()
  if (/essence/i.test(base)) return 'Essence'
  if (/cream/i.test(base)) return 'Cream'
  if (/skin\s*booster/i.test(base)) return 'Skin Booster'
  if (/treatment|concentrate/i.test(base)) return 'Treatment'
  if (/bộ\s*mini/i.test(base)) return 'Bộ Mini'
  if (/set\s*full\s*size/i.test(base)) return 'Set full size'
  if (/gift\s*set/i.test(base)) return 'Gift Set'
  return base
}

export default function Collection() {
  const [productsList, setProductsList] = useState(FALLBACK_PRODUCTS)
  const [loading, setLoading] = useState(true)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    let active = true
    async function fetchProducts() {
      setLoading(true)
      try {
        const data = await api.products.getAll()
        if (!active) return
        if (data && data.length > 0) {
          const mapped = data.map((dbProduct) => {
            const volumeLine = dbProduct.info ? dbProduct.info.split('\n').find((l) => l.toLowerCase().includes('dung tích')) : ''
            const volume = volumeLine ? volumeLine.split(':')[1]?.trim() || '' : ''
            const typeDisplay = volume ? `${dbProduct.type} · ${volume}` : dbProduct.type

            return {
              slug: dbProduct.slug,
              name: dbProduct.name,
              type: typeDisplay,
              price: dbProduct.price,
              image: dbProduct.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcQ-yxyN5hfuj_R1_6Y-X-pwIbUVISq6RVMm-qM7HvtRu-21ArQFYNGGrgqrrFzc_w2JpfNqF2gq5g_Z93yrMv-R4v2YefUc1MxALmcvM0Pxgkoahf1q-r9lljWXNlsl1D-uzv94LMqpMiGAscWj302hsGPBz6Jcqft1gnsNOeCqA47YQY-DgmE_XGD4xStP9XHCxLx-qJqyQEvrU6HQMBnRA3jrFkEb1_jwxDCajDegxVl1CdK1X770yfqvNCVv-OH_IOOeBE10w',
            }
          })
          setProductsList(mapped)
        }
      } catch (err) {
        console.error('Error fetching products from API:', err)
        // Fallback is already set in state
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchProducts()
    return () => {
      active = false
    }
  }, [])

  const prices = useMemo(() => productsList.map((item) => parsePriceValue(item.price)), [productsList])
  const minLimit = useMemo(() => Math.min(...prices), [prices])
  const maxLimit = useMemo(() => Math.max(...prices), [prices])
  const priceSpan = useMemo(() => maxLimit - minLimit || 1, [minLimit, maxLimit])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [priceMin, setPriceMin] = useState(minLimit)
  const [priceMax, setPriceMax] = useState(maxLimit)

  useEffect(() => {
    setPriceMin(minLimit)
    setPriceMax(maxLimit)
  }, [minLimit, maxLimit])

  const filteredProducts = useMemo(() => {
    let list = productsList.filter((product) => {
      const type = normalizeType(product.type)
      const priceValue = parsePriceValue(product.price)
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(type)
      const matchesPrice = priceValue >= priceMin && priceValue <= priceMax
      return matchesType && matchesPrice
    })

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => parsePriceValue(a.price) - parsePriceValue(b.price))
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => parsePriceValue(b.price) - parsePriceValue(a.price))
    }

    return list
  }, [productsList, priceMax, priceMin, selectedTypes, sortBy])

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    )
  }

  const renderFiltersContent = () => (
    <div className="space-y-10">
      <div>
        <h3 className="font-sans font-semibold text-xs uppercase tracking-widest text-primary mb-6">Loại Sản Phẩm</h3>
        <ul className="space-y-4 font-sans text-sm text-on-surface-variant">
          {typeOptions.map((label) => {
            const checked = selectedTypes.includes(label)
            return (
              <li key={label} className="flex items-center group">
                <label className="flex items-center cursor-pointer select-none w-full">
                  <span className={`w-4 h-4 border mr-3 flex items-center justify-center transition-colors ${checked ? 'border-secondary bg-secondary/10' : 'border-outline group-hover:border-secondary'}`}>
                    <span className={`text-[12px] text-secondary transition-opacity ${checked ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}>✓</span>
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleType(label)}
                  />
                  <span className="group-hover:text-primary transition-colors">{label}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </div>
      <hr className="border-outline-variant/30" />
      <div>
        <h3 className="font-sans font-semibold text-xs uppercase tracking-widest text-primary mb-6">Thương Hiệu</h3>
        <ul className="space-y-4 font-sans text-sm text-on-surface-variant">
          <li className="flex items-center">
            <div className="w-4 h-4 border border-secondary bg-secondary/10 mr-3 flex items-center justify-center">
              <span className="text-[12px] text-secondary">✓</span>
            </div>
            <span className="text-primary font-medium">Le Laffé</span>
          </li>
        </ul>
      </div>
      <hr className="border-outline-variant/30" />
      <div>
        <h3 className="font-sans font-semibold text-xs uppercase tracking-widest text-primary mb-6">Mức Giá</h3>
        <div className="mt-6 space-y-5">
          <div className="relative w-full h-1 bg-surface-container-high rounded">
            <div
              className="absolute top-0 h-full bg-secondary rounded"
              style={{
                left: `${((priceMin - minLimit) / priceSpan) * 100}%`,
                right: `${100 - ((priceMax - minLimit) / priceSpan) * 100}%`,
              }}
            />
          </div>
          <div className="relative h-6">
            <input
              type="range"
              min={minLimit}
              max={maxLimit}
              step={100000}
              value={priceMin}
              onChange={(event) => {
                const next = Math.min(Number(event.target.value), priceMax - 100000)
                setPriceMin(next)
              }}
              className="price-range absolute w-full h-6 cursor-pointer"
            />
            <input
              type="range"
              min={minLimit}
              max={maxLimit}
              step={100000}
              value={priceMax}
              onChange={(event) => {
                const next = Math.max(Number(event.target.value), priceMin + 100000)
                setPriceMax(next)
              }}
              className="price-range absolute w-full h-6 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-between text-sm text-on-surface-variant font-sans mt-4">
          <span>{formatPrice(priceMin)}</span>
          <span>{formatPrice(priceMax)}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <section className="pt-8 pb-16 md:pb-24">
        <div className="container-wide">
          <nav className="flex text-xs text-on-surface-variant mb-8 font-sans uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link className="hover:text-primary transition-colors" to="/collection">Thương hiệu</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">Le Laffé</span>
          </nav>

          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="pr-0 lg:pr-12">
                <h1 className="font-serif text-3xl md:text-5xl text-primary mb-6 leading-tight">
                  Le Laffé
                </h1>
                <p className="font-sans text-base md:text-lg text-on-surface-variant mb-4 leading-relaxed">
                  A minimalist approach to high-performance skincare, Le Laffé represents the zenith of bio-cellular research. Utilizing the proprietary Cellular Secretome technology and the unparalleled Platinum StemCell solution, we deliver targeted, transformative results for discerning skin.
                </p>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Embrace the quiet luxury of profound cellular renewal. Each formulation is a testament to scientific precision and editorial elegance, designed to awaken your skin's inherent vitality.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 relative aspect-[4/3] bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/30 group">
                <img
                  alt="Le Laffé Brand Image"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFJUTjvw_4bqgnV6gCQjw3wAxWEcp8a3QdeyvjwFS9m-bAWWnEqeOL5SHHr_jrTpAULYQsD_RoXf6FD_nYAmlgkQidOmyLWhycrpwVFosyysSAbV3dUQ0T8VGY-e0mOaM_aR_082eyYZA-vQ9PRlI4Nv_PTaKLGJ99C0ifc0ZKYMOvbsyRjbo0ODokUVYFEZrfKPQeqcPE-qASZz53x66lYgT8q_GMmYO3BYXt3sNQ-TUzqERHJrVVROchThwxFH1zRlVs4kWIdyI"
                />
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-16">
            {/* Desktop Sidebar (Left side) */}
            <aside className="hidden lg:block lg:col-span-1 space-y-10 border-r border-outline-variant/30 pr-8">
              {renderFiltersContent()}
            </aside>

            {/* Products List (Right side) */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8 border-b border-outline-variant/30 pb-4">
                <span className="text-sm text-on-surface-variant font-sans">{filteredProducts.length} Sản phẩm</span>
                
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Toggle Button */}
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-primary border border-outline-variant/60 px-4 py-2 hover:bg-surface-container-low transition-colors"
                  >
                    <span>Bộ lọc</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 6h16M4 12h12M4 18h6" />
                    </svg>
                  </button>

                  {/* Sorting dropdown */}
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-on-surface-variant hidden sm:inline">Sắp xếp:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent border-none text-primary font-semibold focus:ring-0 cursor-pointer p-0 pr-4 text-sm"
                    >
                      <option value="featured">Đề xuất</option>
                      <option value="price-asc">Giá: Thấp đến Cao</option>
                      <option value="price-desc">Giá: Cao đến Thấp</option>
                    </select>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="py-28 flex flex-col items-center justify-center text-center bg-surface-container-low/30 border border-outline-variant/20 rounded-xl shadow-ambient-sm">
                  {/* Premium circular loader (Cocoon style) */}
                  <div className="w-10 h-10 border-[3.5px] border-[#C8A96A]/20 border-t-[#C8A96A] rounded-full animate-spin mb-6 mx-auto" />
                  <p className="font-sans text-xs uppercase tracking-widest text-[#C8A96A] font-semibold mb-2">Imperial Skincare</p>
                  <p className="font-sans text-sm text-on-surface-variant/80 font-medium">Đang tải thông tin sản phẩm...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-24 text-center">
                  <span className="text-3xl block mb-4">✦</span>
                  <p className="font-serif text-lg text-primary mb-2">Không tìm thấy sản phẩm phù hợp</p>
                  <p className="font-sans text-sm text-on-surface-variant/70">Vui lòng điều chỉnh lại mức giá hoặc các bộ lọc đang chọn.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16">
                  {filteredProducts.map((product) => (
                    <article key={product.slug} className="group flex flex-col h-full bg-surface-container-lowest md:bg-transparent p-3 md:p-0 border border-outline-variant/20 md:border-none rounded-lg shadow-ambient-sm md:shadow-none transition-all duration-300 hover:shadow-ambient">
                      <div className="relative aspect-square mb-4 md:mb-6 border border-outline-variant/20 md:border-outline-variant/30 flex items-center justify-center p-2 overflow-hidden bg-white rounded-md">
                        <img
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                          src={product.image}
                        />
                        {product.tag && (
                          <div className="absolute top-2 left-2 md:top-4 md:left-4">
                            <span className="bg-primary/5 text-primary text-[8px] md:text-[10px] px-1.5 py-0.5 md:px-2 md:py-1 uppercase tracking-wider font-semibold border border-outline-variant/30">
                              {product.tag}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="flex flex-col flex-grow text-center">
                        <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 md:mb-2">Le Laffé</span>
                        <h2 className="font-serif text-sm md:text-lg leading-snug md:leading-tight text-primary mb-1 md:mb-2 flex-grow line-clamp-2 min-h-[36px] md:min-h-[48px]">{product.name}</h2>
                        <p className="text-[10px] md:text-xs text-on-surface-variant mb-2 md:mb-4">{product.type}</p>
                        <p className="font-sans text-xs md:text-sm text-secondary mb-4 md:mb-6 font-semibold">{product.price}</p>
                        <Link
                          to={`/product/${product.slug}`}
                          className="mt-auto w-full border border-secondary text-secondary hover:bg-secondary hover:text-white py-2 md:py-3 text-[10px] md:text-xs tracking-widest font-sans uppercase transition-colors duration-300 font-semibold text-center block"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer Overlay */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black z-[110] lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[360px] bg-background z-[111] shadow-[0_0_50px_rgba(0,0,0,0.15)] flex flex-col lg:hidden border-l border-outline-variant/30"
            >
              <div className="p-6 border-b border-outline-variant flex items-center justify-between">
                <h2 className="font-serif text-xl text-primary">Bộ lọc sản phẩm</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-primary/60 hover:text-primary transition-colors"
                  aria-label="Đóng bộ lọc"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                {renderFiltersContent()}
              </div>
              <div className="p-6 border-t border-outline-variant">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full bg-primary text-on-primary py-4 text-xs uppercase tracking-widest font-semibold hover:bg-secondary transition-colors"
                >
                  Áp dụng bộ lọc ({filteredProducts.length} sản phẩm)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
