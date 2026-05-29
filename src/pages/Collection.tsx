import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const products = [
  {
    slug: 'zayin-rare-elements-vital-facial-essence',
    name: 'Zayin Rare Elements Vital Facial Essence',
    type: 'Essence · 50ml',
    price: '7.400.000 VNĐ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7eJc6_0gqyXNGd8xqJIK_l4RnTWCLrD0ooZi1AaOCNsKrMUoLq600CB5F2g7QmWqr-xtjxN3mX2JKfZH_ZrC8c8W8otHDYSE5HXjHFZTmp_gsDFgwDHg9lkVZRy345tKgJuWD7D3uUPtmkzXI8LjYkttakCdHvF1oCYuPwXC3x1qZkuH3KpSJRxKaOZ6bpa4YAnW72VCjho_KwuuY_j8hr0OkFKeDeP2QeUfivSe9CwvNk9FAIHsk0hOTWzo4XzKK5lEnygf-jmg',
  },
  {
    slug: 'chet-energy-restoration-facial-treatment',
    name: 'Chet Energy Restoration Facial Treatment',
    type: 'Treatment · 50ml',
    price: '7.000.000 VNĐ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfMwRWsYS805o8jj19KszixOzu-bzVzJ9OTuPjVqP0_aYwhsb8IQUBTS2fMoLtp_fgw9neSWjBMmb-tap4xMCsxfNyrnBjveTNVKZZ-yZez-Uvkvp2IyCMzRZteQfSGhYf6fKkXFTivYLCzdaT3Cfll_1Z-ViaZMzp2vCAj97mrNakl5215sn2ACHqZ_SCdN65gQyl4grnosr6n-La60Gyck_Xvgk0XouYAxvGfBRYdsKbMI3BYAg0_7BYkm3KqBylG_QhpdmBMEo',
  },
  {
    slug: 'smtrs-100-de-secret',
    name: 'SMTRs-100 De Secret',
    type: 'Concentrate · 10ml',
    price: '6.300.000 VNĐ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB21AEUKG6hjM4YjeCIm8Y3996kemCFPhLqNzu5pTixvQSEgrj_ecxsqa34PpjcEDmW-SlI8VbmXCF3YqxUMOHXjYvwLBKoAF8K3CI9s0rCDLykF1QMq2enf7rOM27y1Ho8OqLMMFbDlZ_sBG0c4GqeoiYmAbYRuTir2yywq1ckvAMRet8q0kfxplWCIq0Ob_-IBDw4_8g7CObtDsE80AkwYU9Crb368m_6d9Zh6MncVYJCTqXD4ryASMeadTrITRWrx67m_rOyjHg',
    tag: 'Mới',
  },
  {
    slug: '500-000-stem-media-skin-booster',
    name: '500,000 Stem Media Skin Booster',
    type: 'Skin Booster · 30ml',
    price: '11.200.000 VNĐ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHmjcQPHaUrDN9jcQHX2Rnnw9aSyh4oNKjRrkoFzvZGONQS_Aj_ZP8FGtpSCBB6uaY977OO8oABmcqoNS3gffajI5qmXm-dncnVOMbcbVaEiUGjSxVJRKEto9M7wjt-hh56qvwOHMO-Ei1hHrMwuPcR_3gQ_6yHYaxglTuudoyUT-vl_PfrKKn1Ptw4t3tfKzKKoPdDW4m-VWklwrYIhDQW5XqwOZJvZ8lQSx79I7V7LjKzRji8Mz7tPZFljNHyI7WvOhhymZJnSg',
  },
  {
    slug: 'alpeh-mito-viv-first-treatment-essence',
    name: 'Alpeh / Mito-viv First Treatment Essence',
    type: 'Essence · 100ml',
    price: '6.700.000 VNĐ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5RSeMd5UG_ooKumvprkn7nl8ivb_pfS5MvCLdDhrwElNCHLZf5gD3wzZWnpfbKGv27O-_9jh9NetEZD2EUQtENB1vIJLQ4C-zrbJxTN7cGPzN74aLtg7OAVqj9NsJwwD6Rq4zTJcj6GvXjj5qhh21lVUQUeym1q8p-n43DXp6-AGFtRstY1H6-ICkTfSOvo7yEJMLFGtUqO3Kd2CEUwPxn6QCB6S-x7A3zuWOA5kima_NErn3LthVOKM6grQ44cS1MqHuOk50FBk',
  },
  {
    slug: 'comprehensive-skincare-solution-quintet',
    name: 'Comprehensive Skincare Solution Quintet',
    type: 'Gift Set',
    price: '5.000.000 VNĐ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg1uHSgzsuJXG9o80KaffRF_OteJwJO7vdw7CZGMyQQ5k9yifTE8_o0aUmOSpudKv-4UiKCBLAILeHzkWGVLcR_xcPU3ZcEy0JE2xHcNe2BsQKKucb9TQjCvZ9wzJUmyMaL3OIdqgEEvxwL3uBgrlbno-pOc0SwbQKDxB-RxNk8AQL_4NdZCPOLAChlcEVRsYbUI-FE_0zzNAy3izN_shZRZdlaLw05NhOJCIh-a3dz1k30F42WECFyOys6YErdSmYZWrr9MQ3eaA',
  },
  {
    slug: 'platinum-stemcell-reverse-aging-solution',
    name: 'Platinum StemCell Reverse-Aging Solution',
    type: 'Set full size',
    price: '31.000.000 VNĐ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8-Ca8Z1L-JRupGJtApBOQ9pRJuwjloQyd9mCYo_uGk7f5UGYKf1a7a8r9H5cqnlD0c1t8k4enP0sUJ7ePQioJBSbpZLl5u2gzl0yHx9ewbA8V7-d3TyzDGbk8Ff0mJGGJgvA7xH1e0s0n2k_5_t2pBbJr0e1v1yIFx3jEWOOv8Sf1AR2X5_U5pXjzSxkIh05m7JqhI_FAbvzECVbQTRFY88rGo1c3gT8hL6Vt7v_56JnX9Kiyr9dA1fqy6ohmQ',
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
  const prices = useMemo(() => products.map((item) => parsePriceValue(item.price)), [])
  const minLimit = Math.min(...prices)
  const maxLimit = Math.max(...prices)
  const priceSpan = maxLimit - minLimit || 1
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [priceMin, setPriceMin] = useState(minLimit)
  const [priceMax, setPriceMax] = useState(maxLimit)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const type = normalizeType(product.type)
      const priceValue = parsePriceValue(product.price)
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(type)
      const matchesPrice = priceValue >= priceMin && priceValue <= priceMax
      return matchesType && matchesPrice
    })
  }, [priceMax, priceMin, selectedTypes])

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    )
  }

  return (
    <div>
      <section className="pt-8 pb-section-gap">
        <div className="container-wide">
          <nav className="flex text-sm text-on-surface-variant mb-12 font-body-md">
            <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link className="hover:text-primary transition-colors" to="/brand">Thương hiệu</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">Le Laffé</span>
          </nav>

          <section className="mb-section-gap">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
              <div className="pr-0 lg:pr-12">
                <h1 className="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6">
                  Le Laffé
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-4 leading-relaxed">
                  A minimalist approach to high-performance skincare, Le Laffé represents the zenith of bio-cellular research. Utilizing the proprietary Cellular Secretome technology and the unparalleled Platinum StemCell solution, we deliver targeted, transformative results for discerning skin.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter lg:gap-16">
            <aside className="hidden lg:block lg:col-span-1 space-y-10 border-r border-outline-variant/30 pr-8">
              <div>
                <h3 className="font-label-caps text-label-caps uppercase text-primary mb-6 tracking-widest">Loại Sản Phẩm</h3>
                <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant">
                  {typeOptions.map((label) => {
                    const checked = selectedTypes.includes(label)
                    return (
                      <li key={label} className="flex items-center group">
                        <label className="flex items-center cursor-pointer select-none">
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
                    )}
                  )}
                </ul>
              </div>
              <hr className="border-outline-variant/30" />
              <div>
                <h3 className="font-label-caps text-label-caps uppercase text-primary mb-6 tracking-widest">Thương Hiệu</h3>
                <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant">
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
                <h3 className="font-label-caps text-label-caps uppercase text-primary mb-6 tracking-widest">Mức Giá</h3>
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
                <div className="flex justify-between text-sm text-on-surface-variant font-body-md mt-4">
                  <span>{formatPrice(priceMin)}</span>
                  <span>{formatPrice(priceMax)}</span>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8 border-b border-outline-variant/30 pb-4">
                <span className="text-sm text-on-surface-variant font-body-md">{filteredProducts.length} Sản phẩm</span>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-on-surface-variant">Sắp xếp theo:</span>
                  <select className="bg-transparent border-none text-primary font-medium focus:ring-0 cursor-pointer p-0 pr-4">
                    <option>Được đề xuất</option>
                    <option>Giá: Thấp đến Cao</option>
                    <option>Giá: Cao đến Thấp</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => (
                  <article key={product.slug} className="group flex flex-col h-full">
                    <div className="relative aspect-square mb-6 bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center p-8 overflow-hidden">
                      <img alt={product.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" src={product.image} />
                      {product.tag && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary/5 text-primary text-[10px] px-2 py-1 uppercase tracking-wider font-semibold border border-outline-variant/30">
                            {product.tag}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex flex-col flex-grow text-center">
                      <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-2">Le Laffé</span>
                      <h2 className="font-headline-md text-[18px] leading-tight text-primary mb-2 flex-grow">{product.name}</h2>
                      <p className="text-sm text-on-surface-variant mb-4">{product.type}</p>
                      <p className="font-body-md text-body-md text-secondary mb-6">{product.price}</p>
                      <Link
                        to={`/product/${product.slug}`}
                        className="mt-auto w-full border border-secondary text-secondary hover:bg-secondary hover:text-surface py-3 text-sm tracking-widest font-label-caps uppercase transition-colors duration-300"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
