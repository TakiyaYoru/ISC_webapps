import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Thu thập minh bạch',
    description: 'Chúng tôi chỉ thu thập những gì cần thiết để phục vụ bạn tốt hơn.',
    icon: '👁️',
  },
  {
    title: 'Không bán dữ liệu',
    description: 'Thông tin của bạn thuộc về bạn. Chúng tôi cam kết không bao giờ bán nó cho bên thứ ba.',
    icon: '⛔',
  },
  {
    title: 'Bảo vệ thông tin',
    description: 'Dữ liệu được lưu trữ và mã hóa theo chuẩn an toàn để hạn chế truy cập trái phép.',
    icon: '🛡️',
  },
  {
    title: 'Quyền kiểm soát',
    description: 'Bạn có thể yêu cầu chỉnh sửa hoặc xóa dữ liệu bất cứ lúc nào.',
    icon: '✅',
  },
]

export default function PolicyPrivacy() {
  return (
    <div>
      <div className="container-wide py-8">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-on-surface-variant">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span>/</span>
          <span className="hover:text-primary transition-colors">Chính sách</span>
          <span>/</span>
          <span className="text-primary font-medium">Chính sách bảo mật</span>
        </nav>
      </div>

      <section className="container-wide mb-section-gap text-center max-w-3xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-6">Chính sách bảo mật</h1>
        <h2 className="font-headline-md text-headline-md text-primary mb-4 italic">Cam kết về sự riêng tư của bạn</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Tại IMPERIAL Skin Care, chúng tôi hiểu rằng sự tin tưởng của bạn là tài sản quý giá nhất. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn, đảm bảo trải nghiệm của bạn luôn an toàn và minh bạch như chính làn da của bạn.
        </p>
      </section>

      <section className="container-wide mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => (
            <div key={item.title} className="border border-outline-variant p-8 bg-surface-container-lowest flex flex-col items-start hover:shadow-[0_40px_80px_-20px_rgba(18,29,39,0.06)] transition-shadow duration-300">
              <span className="text-3xl mb-4">{item.icon}</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2 text-lg">{item.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide mb-section-gap grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <h3 className="font-headline-md text-headline-md text-primary mb-4">Thông tin chúng tôi thu thập</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Chúng tôi chỉ thu thập các dữ liệu cần thiết để xử lý đơn hàng, chăm sóc khách hàng và cải thiện trải nghiệm sử dụng dịch vụ.
          </p>
        </div>
        <div className="md:col-span-8 space-y-6">
          <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest">
            <h4 className="font-body-lg text-body-lg text-primary mb-2">Thông tin cá nhân</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">Họ tên, số điện thoại, email, địa chỉ giao hàng.</p>
          </div>
          <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest">
            <h4 className="font-body-lg text-body-lg text-primary mb-2">Thông tin giao dịch</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">Lịch sử mua hàng, phương thức thanh toán, tình trạng đơn.</p>
          </div>
          <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest">
            <h4 className="font-body-lg text-body-lg text-primary mb-2">Dữ liệu sử dụng</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">Các tương tác trên website để tối ưu trải nghiệm người dùng.</p>
          </div>
        </div>
      </section>

      <section className="container-wide mb-section-gap">
        <div className="border border-outline-variant p-10 bg-surface-container-lowest">
          <h3 className="font-headline-md text-headline-md text-primary mb-4">Liên hệ về quyền riêng tư</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Nếu bạn có yêu cầu chỉnh sửa hoặc xóa dữ liệu, vui lòng liên hệ với chúng tôi qua email hoặc hotline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a className="btn-primary" href="mailto:info.imperialskincare@gmail.com">Email hỗ trợ</a>
            <a className="btn-ghost" href="tel:0869733288">Hotline 0869 733 288</a>
          </div>
        </div>
      </section>
    </div>
  )
}
