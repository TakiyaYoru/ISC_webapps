import { Link } from 'react-router-dom'

const stores = [
  {
    name: 'IMPERIAL Beauty Clinic · Quận 1',
    address: '1 Lý Tự Trọng, Phường Bến Nghé, Quận 1, Tp. HCM',
    phone: '0869 733 288',
    hours: '09:00 – 19:00',
  },
  {
    name: 'IMPERIAL Consultation Lounge · Thảo Điền',
    address: '24 Nguyễn Ư Dĩ, Thảo Điền, Quận 2, Tp. HCM',
    phone: '0869 733 288',
    hours: '10:00 – 18:00',
  },
]

export default function Stores() {
  return (
    <div>
      <div className="container-wide py-8">
        <nav className="text-sm text-on-surface-variant flex items-center gap-2">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span>/</span>
          <span className="text-primary">Hệ thống cửa hàng</span>
        </nav>
      </div>

      <section className="container-wide mb-section-gap">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6">Hệ thống cửa hàng</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl">
          Ghé thăm không gian trải nghiệm IMPERIAL để được tư vấn chuyên sâu và thử sản phẩm trực tiếp.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stores.map((store) => (
            <div key={store.name} className="border border-outline-variant p-8 bg-surface-container-lowest">
              <h2 className="font-headline-md text-headline-md text-primary mb-3">{store.name}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">{store.address}</p>
              <p className="font-body-md text-body-md text-on-surface-variant">Hotline: {store.phone}</p>
              <p className="font-body-md text-body-md text-on-surface-variant">Giờ mở cửa: {store.hours}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
