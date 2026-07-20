import { Link } from 'react-router-dom'

const pricingRules = [
  {
    title: 'Đơn Vị Tiền Tệ',
    description: 'Giá sản phẩm trên website được niêm yết công khai bằng Đồng Việt Nam (VND).',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M6 12h.01M18 12h.01" />
      </svg>
    ),
  },
  {
    title: 'Giá Niêm Yết & Thuế',
    description: 'Giá niêm yết là giá bán sản phẩm tại thời điểm khách hàng đặt hàng, đã bao gồm các loại thuế theo quy định pháp luật và chưa bao gồm phí vận chuyển, trừ trường hợp website có thông báo khác.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Phí Phát Sinh',
    description: 'Phí vận chuyển, phí đóng gói và các khoản chi phí phát sinh khác nếu có sẽ được hiển thị hoặc thông báo đầy đủ cho khách hàng trước khi xác nhận đặt hàng. Tổng số tiền khách hàng phải thanh toán được thể hiện tại bước xác nhận đơn hàng.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: 'Khuyến Mại & Ưu Đãi',
    description: 'Các chương trình giảm giá, ưu đãi và khuyến mại được áp dụng theo thời gian, đối tượng và điều kiện được công bố cụ thể trên website.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" />
      </svg>
    ),
  },
  {
    title: 'Sai Lệch Thông Tin Giá',
    description: 'Trường hợp xảy ra sai lệch về giá do lỗi kỹ thuật hoặc lỗi hiển thị, IMPERIAL Skin Care sẽ liên hệ với khách hàng để xác nhận lại thông tin trước khi tiếp tục xử lý đơn hàng. Khách hàng có quyền tiếp tục hoặc hủy đơn và được hoàn lại khoản tiền đã thanh toán nếu có.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
]

export default function PolicyPricing() {
  return (
    <div>
      <div className="container-wide py-8">
        <nav className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span className="text-outline-variant">/</span>
          <span className="hover:text-primary transition-colors">Chính sách</span>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-medium">Quy định về giá cả</span>
        </nav>
      </div>

      <section className="container-wide mb-16 text-center max-w-3xl">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6">Quy định về giá cả</h1>
        <p className="font-headline-md text-headline-md text-on-surface-variant mb-6 italic">
          Bản quy định về giá cả niêm yết của các sản phẩm và dịch vụ trên trang thông tin chính thức của IMPERIAL Skin Care.
        </p>
        <div className="bg-surface-container-low p-8 border border-outline-variant/30 rounded">
          <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
            Chúng tôi cam kết công khai, minh bạch tất cả các thông tin về giá bán sản phẩm, thuế suất và các chi phí phát sinh liên quan trong quá trình giao dịch của khách hàng.
          </p>
        </div>
      </section>

      <section className="container-wide mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingRules.map((item) => (
            <div key={item.title} className="border border-outline-variant/60 p-8 flex flex-col items-center text-center bg-surface-container-lowest hover:border-primary transition-all duration-300 rounded">
              {item.icon}
              <h3 className="font-sans text-base font-semibold text-primary mb-3 uppercase tracking-wider">{item.title}</h3>
              <p className="font-sans text-sm text-on-surface-variant/90 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
