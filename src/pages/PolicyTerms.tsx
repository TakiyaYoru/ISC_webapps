import { Link } from 'react-router-dom'

export default function PolicyTerms() {
  return (
    <div>
      <div className="container-wide py-8">
        <nav className="text-sm text-on-surface-variant flex items-center gap-2">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span>/</span>
          <span className="hover:text-primary transition-colors">Chính sách</span>
          <span>/</span>
          <span className="text-primary">Điều khoản dịch vụ</span>
        </nav>
      </div>

      <section className="container-wide mb-section-gap text-center max-w-3xl">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6">Điều khoản dịch vụ</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Nội dung điều khoản dịch vụ đang được cập nhật. Vui lòng quay lại sau hoặc liên hệ IMPERIAL để được hỗ trợ.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/contact" className="btn-primary">Liên hệ hỗ trợ</Link>
          <Link to="/" className="btn-ghost">Về trang chủ</Link>
        </div>
      </section>
    </div>
  )
}
