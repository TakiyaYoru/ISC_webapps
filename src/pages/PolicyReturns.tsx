import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Yêu cầu trong 48 giờ',
    description: 'Kể từ thời điểm nhận hàng thành công.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Cần video mở hộp',
    description: 'Quay liền mạch, rõ mã vận đơn và tình trạng kiện hàng.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    title: 'Xác minh 24–72 giờ',
    description: 'Đội ngũ CSKH sẽ kiểm tra và phản hồi qua email/zalo.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: 'Hoàn tiền 5–10 ngày',
    description: 'Kể từ khi xưởng nhận lại và xác nhận sản phẩm lỗi.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
]

export default function PolicyReturns() {
  return (
    <div>
      <div className="container-wide py-8">
        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span className="mx-2 text-outline-variant">/</span>
          <span className="text-outline">Chính sách</span>
          <span className="mx-2 text-outline-variant">/</span>
          <span className="text-primary">Đổi trả &amp; Hoàn tiền</span>
        </p>
      </div>

      <section className="container-wide py-16 text-center">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg mb-6">Chính sách đổi trả &amp; hoàn tiền</h1>
        <p className="font-body-lg text-body-lg text-primary max-w-3xl mx-auto mb-4">
          IMPERIAL Skin Care cam kết cung cấp sản phẩm chính hãng, đảm bảo chất lượng và tiêu chuẩn bảo quản.
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Chính sách đổi trả được áp dụng nhằm bảo vệ quyền lợi khách hàng trong các trường hợp phát sinh lỗi, đồng thời đảm bảo tiêu chuẩn vệ sinh và tính toàn vẹn của sản phẩm mỹ phẩm.
        </p>
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

      <section className="container-wide mb-section-gap grid grid-cols-1 lg:grid-cols-12 gap-16">
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-32">
            <h4 className="font-label-caps text-label-caps uppercase text-primary mb-6 border-b border-outline-variant pb-2">Danh mục chính sách</h4>
            <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#nguyen-tac">1. Nguyên tắc chung</a></li>
              <li><a className="hover:text-primary transition-colors" href="#pham-vi">2. Phạm vi áp dụng</a></li>
              <li><a className="hover:text-primary transition-colors" href="#quy-trinh">3. Quy trình thực hiện</a></li>
              <li><a className="hover:text-primary transition-colors" href="#hoan-tien">4. Quy định hoàn tiền</a></li>
            </ul>
          </div>
        </aside>

        <div className="lg:col-span-9 space-y-16">
          <div id="nguyen-tac">
            <h2 className="font-headline-md text-headline-md text-primary mb-6 border-b border-surface-container-high pb-4">1. Nguyên tắc chung</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Sản phẩm mỹ phẩm của IMPERIAL Skin Care liên quan trực tiếp đến sức khỏe làn da, do đó chúng tôi tuân thủ các nguyên tắc nghiêm ngặt về vệ sinh và an toàn. Đổi/trả chỉ được giải quyết khi lỗi thuộc về phía nhà sản xuất hoặc đối tác vận chuyển.
            </p>
            <div className="bg-surface-container-low border border-surface-container-highest p-6 mt-6">
              <p className="font-body-md text-body-md text-primary italic">
                Lưu ý: Chúng tôi không giải quyết đổi/trả với lý do "thay đổi ý định" hoặc "cảm thấy không phù hợp" sau khi sản phẩm đã bị bóc seal bảo vệ.
              </p>
            </div>
          </div>

          <div id="pham-vi">
            <h2 className="font-headline-md text-headline-md text-primary mb-6 border-b border-surface-container-high pb-4">2. Phạm vi áp dụng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-label-caps text-label-caps uppercase text-primary mb-3">Trường hợp được chấp nhận</h3>
                <ul className="list-disc pl-5 font-body-md text-body-md text-on-surface-variant space-y-2">
                  <li>Sản phẩm giao sai loại, sai dung tích so với đơn đặt hàng.</li>
                  <li>Sản phẩm bị lỗi vật lý từ nhà sản xuất (vòi pump hỏng, nắp không kín).</li>
                  <li>Sản phẩm có dấu hiệu bất thường về kết cấu, màu sắc, mùi hương khi vừa mở hộp.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps uppercase text-primary mb-3">Trường hợp từ chối</h3>
                <ul className="list-disc pl-5 font-body-md text-body-md text-on-surface-variant space-y-2">
                  <li>Quá thời hạn 48 giờ kể từ lúc nhận hàng.</li>
                  <li>Sản phẩm đã qua sử dụng, mất seal bảo vệ, hư hỏng do khách hàng bảo quản sai cách.</li>
                  <li>Kích ứng nhẹ trong quá trình làm quen với hoạt chất (retinol, acid).</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="quy-trinh">
            <h2 className="font-headline-md text-headline-md text-primary mb-6 border-b border-surface-container-high pb-4">3. Quy trình thực hiện</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                ['Tiếp nhận yêu cầu', 'Gửi video mở hộp và hình ảnh lỗi qua email hoặc Zalo CSKH.'],
                ['Xác minh & Đánh giá', 'Chuyên viên kiểm tra trong 24-72h và hướng dẫn gửi hoàn.'],
                ['Xử lý hoàn tất', 'Gửi sản phẩm thay thế hoặc tiến hành hoàn tiền qua tài khoản.'],
              ].map(([title, desc], index) => (
                <div key={title} className="flex flex-col items-center text-center px-4">
                  <div className="w-10 h-10 border border-secondary text-secondary bg-secondary/5 rounded-full flex items-center justify-center mb-6 font-serif text-lg shadow-sm">
                    {index + 1}
                  </div>
                  <h4 className="font-label-caps text-label-caps uppercase text-primary mb-3 tracking-widest">{title}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant/80 text-sm leading-relaxed max-w-[240px]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="hoan-tien">
            <h2 className="font-headline-md text-headline-md text-primary mb-6 border-b border-surface-container-high pb-4">4. Quy định hoàn tiền</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Tiền sẽ được hoàn về thẻ tín dụng/tài khoản ngân hàng của quý khách đã sử dụng để thanh toán. Thời gian nhận tiền phụ thuộc vào quy trình của từng ngân hàng, thông thường từ 5 đến 10 ngày làm việc sau khi yêu cầu được duyệt.
            </p>
          </div>
        </div>
      </section>

      <section className="container-wide mb-section-gap">
        <div className="border border-outline-variant p-12 text-center flex flex-col items-center bg-surface-container-lowest">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Bạn cần hỗ trợ đổi trả?</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-lg mx-auto">
            Đội ngũ chăm sóc khách hàng của IMPERIAL Skin Care luôn sẵn sàng lắng nghe và giải quyết nhanh chóng mọi vấn đề của bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary">Liên hệ hỗ trợ</Link>
            <a className="btn-ghost" href="mailto:info.imperialskincare@gmail.com">Email hỗ trợ</a>
          </div>
        </div>
      </section>
    </div>
  )
}
