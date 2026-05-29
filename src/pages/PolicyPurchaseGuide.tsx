import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Lựa chọn có định hướng',
    description: 'Tìm sản phẩm theo thương hiệu, danh mục, loại da hoặc nhu cầu da.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: 'Khuyến nghị tư vấn',
    description: 'Khách hàng nên nhận tư vấn trước khi mua để lựa chọn sản phẩm phù hợp hơn.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Thanh toán linh hoạt',
    description: 'Hỗ trợ COD, chuyển khoản ngân hàng và thanh toán thẻ.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Kiểm tra khi nhận hàng',
    description: 'Khách hàng cần quay video mở hộp để làm căn cứ hỗ trợ khi có phát sinh.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    ),
  },
]

export default function PolicyPurchaseGuide() {
  return (
    <div>
      <div className="container-wide py-8">
        <nav className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span className="text-outline-variant">/</span>
          <span className="hover:text-primary transition-colors">Chính sách</span>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-medium">Hướng dẫn mua hàng</span>
        </nav>
      </div>

      <section className="container-wide mb-section-gap text-center max-w-3xl">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6">Hướng dẫn mua hàng</h1>
        <p className="font-headline-md text-headline-md text-on-surface-variant mb-6 italic">
          Quy trình mua hàng tại IMPERIAL Skin Care được thiết kế rõ ràng, tối giản và minh bạch nhằm giúp khách hàng lựa chọn sản phẩm phù hợp với tình trạng da thực tế.
        </p>
        <div className="bg-surface-container-low p-8 border border-outline-variant/30 rounded">
          <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
            IMPERIAL Skin Care khuyến nghị khách hàng tìm hiểu kỹ thông tin sản phẩm hoặc nhận tư vấn trước khi mua để hạn chế rủi ro lựa chọn sai sản phẩm và tối ưu trải nghiệm chăm sóc da.
          </p>
        </div>
      </section>

      <section className="container-wide mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {highlights.map((item) => (
            <div key={item.title} className="border border-outline-variant/60 p-8 flex flex-col items-center text-center bg-surface-container-lowest hover:border-primary transition-all duration-300">
              {item.icon}
              <h3 className="font-label-caps text-label-caps uppercase text-primary mb-3">{item.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant/80 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
