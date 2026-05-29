import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <div>
      <div className="container-wide py-8">
        <nav className="text-sm text-on-surface-variant flex items-center gap-2">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span>/</span>
          <span className="text-primary">Liên hệ</span>
        </nav>
      </div>

      <section className="container-wide mb-section-gap grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6">Liên hệ IMPERIAL</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ. Hãy liên hệ để được tư vấn chuyên sâu hoặc hỗ trợ đơn hàng.
          </p>
          <div className="space-y-3 font-body-md text-body-md text-on-surface-variant">
            <p>Địa chỉ: 1 Lý Tự Trọng, Phường Bến Nghé, Quận 1, Tp. HCM</p>
            <p>Hotline: 0869 733 288</p>
            <p>Email: info.imperialskincare@gmail.com</p>
          </div>
        </div>
        <div className="border border-outline-variant p-8 bg-surface-container-lowest">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Gửi yêu cầu</h2>
          <form className="space-y-4">
            <input className="w-full border border-outline-variant/60 px-4 py-3 bg-transparent" placeholder="Họ và tên" />
            <input className="w-full border border-outline-variant/60 px-4 py-3 bg-transparent" placeholder="Email" />
            <textarea className="w-full border border-outline-variant/60 px-4 py-3 bg-transparent" rows={4} placeholder="Nội dung" />
            <button type="button" className="btn-primary w-full">Gửi yêu cầu</button>
          </form>
        </div>
      </section>
    </div>
  )
}
