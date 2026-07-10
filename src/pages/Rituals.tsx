import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { api } from '../services/api'
import type { Product } from '../services/api'

const rituals = [
  {
    id: 'r01',
    name: 'Nghi thức Buổi sáng',
    tagline: 'Sự khởi đầu thanh tĩnh',
    duration: 'Sáu phút',
    steps: [
      'alpeh-mito-viv-first-treatment-essence',
      'zayin-rare-elements-vital-facial-essence',
      'chet-energy-restoration-facial-treatment'
    ],
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80',
    description:
      'Một chu trình tối giản thiết kế riêng để chuẩn bị làn da cho ngày mới — cấp nước, bảo vệ và đem lại vẻ ngoài rạng rỡ tự nhiên tràn đầy năng lượng.',
  },
  {
    id: 'r02',
    name: 'Nghi thức Buổi tối',
    tagline: 'Kích hoạt tế bào, phục hồi chuyên sâu',
    duration: 'Mười hai phút',
    steps: [
      'smtrs-100-de-secret',
      '500-000-stem-media-skin-booster',
      'chet-energy-restoration-facial-treatment'
    ],
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1600&q=80',
    description:
      'Nghi thức quan trọng nhất trong ngày. Giải tỏa căng thẳng của làn da, chuẩn bị nền da dẫn truyền, phục hồi đa tầng ở cấp độ tế bào và nuôi dưỡng sâu qua đêm.',
  },
  {
    id: 'r03',
    name: 'Liệu trình Cuối tuần',
    tagline: 'Một buổi tối tái sinh',
    duration: 'Bốn mươi phút',
    steps: [
      'alpeh-mito-viv-first-treatment-essence',
      'smtrs-100-de-secret',
      '500-000-stem-media-skin-booster',
      'chet-energy-restoration-facial-treatment'
    ],
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80',
    description:
      'Dành riêng cho ngày cuối tuần hoặc bất cứ khi nào da cần phục hồi khẩn cấp. Thanh lọc sâu, kích hoạt năng lượng và khóa ẩm toàn phần, mang lại vẻ tươi trẻ tức thì.',
  },
]

export default function Rituals() {
  const [productsList, setProductsList] = useState<Product[]>([])

  useEffect(() => {
    let active = true
    async function fetchProducts() {
      try {
        const data = await api.products.getAll()
        if (active) {
          setProductsList(data)
        }
      } catch (err) {
        console.error('Error fetching products for Rituals:', err)
      }
    }
    fetchProducts()
    return () => {
      active = false
    }
  }, [])

  return (
    <div>
      <section className="pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="container-wide">
          <Reveal>
            <p className="label-caps text-ink/50 mb-6">Nghi thức Chăm Sóc</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-3xl md:text-5xl leading-tight max-w-5xl text-balance">
              Nghi thức hoàng gia, <span className="italic font-light text-primary">không chỉ là thói quen.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl font-sans text-sm md:text-base text-ink/65 leading-relaxed">
              Một nghi thức hoàn chỉnh là cấu trúc thời gian giúp các công thức hoạt chất phát huy tối đa công dụng. Chúng tôi thiết kế ba nghi thức cho buổi sáng, buổi tối và liệu trình tái sinh chuyên sâu.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32 space-y-28 md:space-y-40">
        {rituals.map((r, rIndex) => {
          const steps = r.steps
            .map((slug) => productsList.find((p) => p.slug === slug))
            .filter((p): p is Product => !!p)

          const reversed = rIndex % 2 === 1
          return (
            <div key={r.id} className="container-wide">
              <div className="grid grid-cols-12 gap-6 md:gap-12 items-center">
                <Reveal className={`col-span-12 md:col-span-6 ${reversed ? 'md:order-2' : ''}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low rounded-lg shadow-ambient">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Reveal>

                <div className={`col-span-12 md:col-span-6 ${reversed ? 'md:order-1' : ''}`}>
                  <Reveal>
                    <p className="label-caps text-ink/50 mb-5">
                      {String(rIndex + 1).padStart(2, '0')} · {r.duration}
                    </p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="font-serif text-2xl md:text-3xl leading-[1.1] text-primary">
                      {r.name}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <p className="mt-2 font-serif italic text-secondary text-lg">{r.tagline}</p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-6 max-w-md font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-pretty">
                      {r.description}
                    </p>
                  </Reveal>

                  <Reveal delay={0.3}>
                    <ol className="mt-10 space-y-4 max-w-md">
                      {steps.map((p, i) => (
                        <li key={p.slug}>
                          <Link
                            to={`/product/${p.slug}`}
                            className="group flex items-baseline justify-between gap-6 border-t border-outline-variant/40 pt-5 hover:text-secondary transition-colors"
                          >
                            <div className="flex gap-5 items-baseline">
                              <span className="font-serif italic text-secondary text-lg w-8">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span>
                                <p className="font-serif text-lg leading-tight text-primary group-hover:text-secondary transition-colors">{p.name}</p>
                                <p className="font-sans text-xs text-on-surface-variant/70 mt-1">
                                  Dòng sản phẩm: {p.type}
                                </p>
                              </span>
                            </div>
                            <span className="text-[0.72rem] uppercase tracking-[0.18em] text-outline group-hover:text-secondary">
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </Reveal>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
