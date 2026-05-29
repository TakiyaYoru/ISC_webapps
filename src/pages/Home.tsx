import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const heroImages = [
  'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Hero%20Header/Hero_001.png',
  'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Hero%20Header/Hero_002.png',
  'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Hero%20Header/Hero_003.png',
]

const bestSellers = [
  {
    slug: 'smtrs-100-de-secret',
    brand: 'LE LAFFÉ',
    name: 'SMTRs-100 De Secret',
    subtitle: 'Concentrated Renewal',
    price: 'Liên hệ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbnyKPc4MrfbZ5sn4zQ2DGTdbHtnBJr6xK8yBFsAlCZfGK-XcI6lEArc5wnS6trlQfPdxuN4f1pa6eW0RXAkd6CHPthEqvZCdBaqylFZdB3sFk2OQXP0GTTf_irLEhgChzyIvjwJ17BFIsmRFJ3BFDn0X10C5vlLuYIP6yfY-fNT1AKySecAfnZdUFUYxh0FpbTv3qt7TOk2IODi5GV_dAMa8pfI6-_Si2giBBNG0PAyvY4BJe9RcYxJappmBzLKMIEI1_cJ6oXKQ',
  },
  {
    slug: '500-000-stem-media-skin-booster',
    brand: 'LE LAFFÉ',
    name: '500,000 Stem Media Skin Booster',
    subtitle: 'Cellular Energy',
    price: 'Liên hệ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKHhzwYi39ShbfxRe8i2N4WBFv1WS0Pt9jzgzJmaD8wS_FFQl8FqwAw03MvsQA0YQFgsw1FtXyxIeJUoAuUozMlqW7YiJEFwBOWy-o4_R3WocW9in96_AcPeeISLrESKWRb-phLqAPvGrh9bcSQC3I8RffLjJwhvAPBnFx18uSAJ495tNAkaFLrkudf_QiVInDOUI4K93SDuiDzYKfLP4kXq3rGAPmgGplqaNL9VHMZtcVKnd2oAruVhViUqK1O2ERLXgAjW9MJW4',
  },
  {
    slug: 'zayin-rare-elements-vital-facial-essence',
    brand: 'LE LAFFÉ',
    name: 'Zayin Rare Elements Vital Facial Essence',
    subtitle: 'Deep Hydration',
    price: 'Liên hệ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrtm89bAtt80XNi9lHiUzHbaJLlxIAXHMwRogyAeSPKq-5YvNvaUg8mKGwODTVmXWR0k7hUNWBsh7r90G5jpcpVZ0NgH6x9J616Lfn9UlNANZBZEco2Tqpt8uq5X2olwaDAN81Xo7Zm7NPXPYHqgDAm3cx5Tz8aHYkDaW7mzA9i3-KjKLqR69U7kANB4Lc2yZBBQiyQ440Z2JsmNC2kH5WY72vV0VilSt9vUdNg0pvw6rkQ3ktsNf69ho6UqtEAgjCBzqQ3dq1YCg',
  },
  {
    slug: 'chet-energy-restoration-facial-treatment',
    brand: 'LE LAFFÉ',
    name: 'Chet Energy Restoration Facial Treatment',
    subtitle: 'Intensive Repair',
    price: 'Liên hệ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3MP90PxQUVTEp7xe7K5YySaOYkqzd7WSAt8YmlbTEc2W05zvB3l98teYm1LqouqhWCWeykj5shq2-SF7exE5H40nYwuSh17ToT5VUpkO1RSVdtyr-3Wvq8MmW3Bl-XGbGciE9gthVbAPW7x1_mwy7FggZRFAEVhEFxkf7YSqoTMgsHC2NR00rRU5odZCt8O2JN1tvTggmpGCdakML8n8_4aag1AApMGj-1JOdfwWiYmXdxDgBujW8G4NVBlTQ3JEP1tEpTrMkuzo',
  },
  {
    slug: 'aleph-mito-viv-first-treatment-essence',
    brand: 'LE LAFFÉ',
    name: 'Aleph Mito-viv First Treatment Essence',
    subtitle: 'Prep & Prime',
    price: 'Liên hệ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWqBc7EW7sbSbuDcLKkEZfMNlr6K68gSvD65xEVYPF45c4RkV3tC4dwdmRCCLFSkgqOGtZFxpKdsZLAmaa9qzM4q1b6tUU-oNSo5Z637HnvlbBXUF2BPIUoj4Dih3r-oLCjcPVpdLMtUAFAm0GgPcsPtL5pNq0TC8CUWVfP0fD_JJcE2dwYBAT-CugHEienypOKAmQSqqt_5PIYOQwXqw2IjQ-Vn-ikBt_TR3mUMEjBnfcQMeV-4SnYMGeBIUHOTsPRon1pK1btOQ',
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
  const [currentHero, setCurrentHero] = useState(0)
  const productSliderRef = useRef<HTMLDivElement | null>(null)

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
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Sản phẩm bán chạy</h2>
              <p className="font-body-md text-on-surface-variant mb-10 leading-relaxed">
                Discover our most coveted formulations. These signature pieces represent the core of the IMPERIAL regimen, beloved for their undeniable efficacy and luxurious sensory experience.
              </p>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 border-b border-primary pb-1 font-label-caps text-label-caps text-primary hover:text-secondary hover:border-secondary transition-colors duration-300"
              >
                KHÁM PHÁ TẤT CẢ <span className="text-[16px]">→</span>
              </Link>
              <div className="flex gap-4 mt-12">
                <button
                  className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                  onClick={() => productSliderRef.current?.scrollBy({ left: -332, behavior: 'smooth' })}
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                  onClick={() => productSliderRef.current?.scrollBy({ left: 332, behavior: 'smooth' })}
                  aria-label="Next"
                >
                  →
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 overflow-hidden relative">
              <div className="flex gap-8 overflow-x-hidden pb-8" ref={productSliderRef}>
                {bestSellers.map((product) => (
                  <div key={product.slug} className="group flex flex-col w-[300px] shrink-0">
                    <div className="aspect-[4/5] bg-white border border-secondary/10 mb-6 p-8 relative flex items-center justify-center overflow-hidden">
                      <img
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                        src={product.image}
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="font-label-caps text-[10px] text-secondary mb-2 block tracking-widest">{product.brand}</span>
                      <h3 className="font-headline-md text-[22px] text-primary mb-2 line-clamp-2">{product.name}</h3>
                      <p className="font-body-md text-[14px] text-on-surface-variant mb-6">{product.subtitle}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-secondary/20">
                        <span className="font-body-md text-primary">{product.price}</span>
                        <Link
                          to={`/product/${product.slug}`}
                          className="font-label-caps text-[11px] text-primary hover:text-secondary transition-colors tracking-widest"
                        >
                          XEM CHI TIẾT
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
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
            {blogArticles.map((article) => (
              <Link key={article.title} className="group cursor-pointer flex flex-col" to="/journal">
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
