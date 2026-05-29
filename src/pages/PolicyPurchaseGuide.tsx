import { Link } from 'react-router-dom'

const highlights = [
  { title: 'Lựa chọn có định hướng', description: 'Tìm sản phẩm theo thương hiệu, danh mục, loại da hoặc nhu cầu da.', icon: '🎯' },
  { title: 'Khuyến nghị tư vấn', description: 'Khách hàng nên nhận tư vấn trước khi mua để lựa chọn sản phẩm phù hợp hơn.', icon: '💬' },
  { title: 'Thanh toán linh hoạt', description: 'Hỗ trợ COD, chuyển khoản ngân hàng và thanh toán thẻ.', icon: '💳' },
  { title: 'Kiểm tra khi nhận hàng', description: 'Khách hàng cần quay video mở hộp để làm căn cứ hỗ trợ khi có phát sinh.', icon: '📦' },
]

export default function PolicyPurchaseGuide() {
  return (
    <div>
      <div className="container-wide py-8">
        <nav className="text-sm text-on-surface-variant flex items-center gap-2">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span>/</span>
          <span className="hover:text-primary transition-colors">Chính sách</span>
          <span>/</span>
          <span className="text-primary">Hướng dẫn mua hàng</span>
        </nav>
      </div>

      <section className="container-wide mb-section-gap text-center max-w-3xl">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6">Hướng dẫn mua hàng</h1>
        <p className="font-headline-md text-headline-md text-on-surface-variant mb-6 italic">
          Quy trình mua hàng tại IMPERIAL Skin Care được thiết kế rõ ràng, tối giản và minh bạch nhằm giúp khách hàng lựa chọn sản phẩm phù hợp với tình trạng da thực tế.
        </p>
        <div className="bg-surface-container-low p-8 border border-outline-variant/30 rounded">
          <p className="font-body-lg text-body-lg text-on-surface">
            IMPERIAL Skin Care khuyến nghị khách hàng tìm hiểu kỹ thông tin sản phẩm hoặc nhận tư vấn trước khi mua để hạn chế rủi ro lựa chọn sai sản phẩm và tối ưu trải nghiệm chăm sóc da.
          </p>
        </div>
      </section>

      <section className="container-wide mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {highlights.map((item) => (
            <div key={item.title} className="border border-[#E6DED2] p-8 text-center flex flex-col items-center bg-white/50 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(18,29,39,0.02)]">
              <span className="text-3xl text-primary mb-4">{item.icon}</span>
              <h3 className="font-label-caps text-label-caps uppercase mb-3 text-primary">{item.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
