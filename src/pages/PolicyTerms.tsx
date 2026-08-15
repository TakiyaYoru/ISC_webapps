import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Minh bạch thông tin',
    description: 'Quy trình hoạt động và thông tin sản phẩm luôn được làm rõ ràng, công khai.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  {
    title: 'Bảo vệ quyền lợi',
    description: 'Cam kết hỗ trợ giải quyết thắc mắc và đảm bảo quyền lợi mua sắm của bạn.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Sản phẩm chính hãng',
    description: 'Cam kết tất cả mỹ phẩm cung cấp đều có nguồn gốc và chứng nhận chất lượng rõ ràng.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <path d="M20 7h-7L10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Hỗ trợ chu đáo',
    description: 'Luôn sẵn sàng lắng nghe ý kiến phản hồi và tư vấn phù hợp với tình trạng da cá nhân.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

export default function PolicyTerms() {
  return (
    <div>
      <div className="container-wide py-8">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-on-surface-variant font-body-md">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span className="text-outline-variant">/</span>
          <span className="hover:text-primary transition-colors">Chính sách</span>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-medium">Điều khoản dịch vụ</span>
        </nav>
      </div>

      <section className="container-wide mb-16 text-center max-w-3xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-6">Điều khoản dịch vụ</h1>
        <h2 className="font-headline-md text-headline-md text-primary mb-4 italic">Bản quy chế hoạt động và giao dịch</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Chào mừng bạn đến với IMPERIAL Skin Care. Vui lòng đọc kỹ các điều khoản dịch vụ dưới đây trước khi thực hiện mua sắm hay tham khảo thông tin trên website của chúng tôi.
        </p>
      </section>

      <section className="container-wide mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => (
            <div key={item.title} className="border border-outline-variant/60 p-8 bg-surface-container-lowest flex flex-col items-start hover:border-primary transition-all duration-300 rounded">
              {item.icon}
              <h3 className="font-headline-md text-headline-md text-primary mb-2 text-lg">{item.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant/80 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Details Sections */}
      <div className="container-wide space-y-16 mb-24">
        {/* Section 1 */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-outline-variant/30">
          <div className="md:col-span-4">
            <h3 className="font-serif text-xl md:text-2xl text-primary font-medium mb-3">1. Phạm vi áp dụng</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Các quy định chung về đối tượng và điều kiện áp dụng khi tham gia sử dụng dịch vụ trên nền tảng của chúng tôi.
            </p>
          </div>
          <div className="md:col-span-8 space-y-6">
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Điều khoản Dịch vụ này áp dụng cho tất cả người dùng truy cập và sử dụng website của IMPERIAL Skin Care, bao gồm nhưng không giới hạn:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 font-sans text-sm text-on-surface-variant/90 pl-2">
                <li>Khách hàng mua sản phẩm</li>
                <li>Người truy cập tham khảo thông tin</li>
                <li>Người đăng ký tài khoản</li>
              </ul>
              <p className="font-sans text-sm text-on-surface font-medium mt-4">
                Bằng việc sử dụng website, bạn được hiểu là đã đồng ý tuân thủ toàn bộ các điều khoản được quy định tại đây.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-outline-variant/30">
          <div className="md:col-span-4">
            <h3 className="font-serif text-xl md:text-2xl text-primary font-medium mb-3">2. Quyền và nghĩa vụ của IMPERIAL Skin Care</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Trách nhiệm và giới hạn quyền hạn pháp lý của ban quản trị thương hiệu đối với dịch vụ cung cấp.
            </p>
          </div>
          <div className="md:col-span-8 space-y-6">
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">2.1. Quyền của IMPERIAL Skin Care</h4>
              <ul className="list-disc list-inside space-y-2 font-sans text-sm text-on-surface-variant/90 pl-2">
                <li>Từ chối hoặc hủy đơn hàng trong các trường hợp cần thiết.</li>
                <li>Từ chối cung cấp dịch vụ đối với các hành vi vi phạm điều khoản của website.</li>
                <li>Thay đổi giá sản phẩm, nội dung và các chương trình ưu đãi mà không cần thông báo trước.</li>
                <li>Cập nhật, chỉnh sửa giao diện và cấu trúc website bất kỳ lúc nào để nâng cấp dịch vụ.</li>
              </ul>
            </div>
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">2.2. Nghĩa vụ của IMPERIAL Skin Care</h4>
              <ul className="list-disc list-inside space-y-2 font-sans text-sm text-on-surface-variant/90 pl-2">
                <li>Cung cấp thông tin sản phẩm rõ ràng, chính xác và minh bạch.</li>
                <li>Xử lý và bàn giao đơn hàng cho đơn vị vận chuyển theo đúng quy trình đã công bố.</li>
                <li>Bảo mật tuyệt đối thông tin khách hàng theo Chính sách Bảo mật của hệ thống.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-outline-variant/30">
          <div className="md:col-span-4">
            <h3 className="font-serif text-xl md:text-2xl text-primary font-medium mb-3">3. Quyền và nghĩa vụ của khách hàng</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Hành lang quyền lợi và nghĩa vụ của khách hàng khi tham gia mua sắm trực tuyến.
            </p>
          </div>
          <div className="md:col-span-8 space-y-6">
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">3.1. Quyền của khách hàng</h4>
              <ul className="list-disc list-inside space-y-2 font-sans text-sm text-on-surface-variant/90 pl-2">
                <li>Được quyền tự do truy cập, tham khảo thông tin và mua sắm các sản phẩm chính hãng trên website.</li>
                <li>Yêu cầu đội ngũ chuyên viên hỗ trợ giải đáp các thắc mắc về sản phẩm hoặc quá trình vận chuyển.</li>
                <li>Được quyền khiếu nại, phản hồi về chất lượng dịch vụ trong phạm vi chính sách cho phép.</li>
              </ul>
            </div>
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">3.2. Nghĩa vụ của khách hàng</h4>
              <ul className="list-disc list-inside space-y-2 font-sans text-sm text-on-surface-variant/90 pl-2">
                <li>Cung cấp chính xác và đầy đủ các thông tin cá nhân (họ tên, số điện thoại, địa chỉ nhận hàng) khi tạo đơn hàng.</li>
                <li>Thanh toán đầy đủ và đúng hạn cho giá trị đơn hàng đã đặt.</li>
                <li>Đọc kỹ hướng dẫn sử dụng và tuân thủ các quy tắc bảo quản sản phẩm của nhà cung cấp.</li>
              </ul>
              <p className="font-sans text-sm text-secondary font-medium mt-4 italic">
                * Lưu ý: IMPERIAL Skin Care không chịu trách nhiệm đối với các hậu quả phát sinh từ việc khách hàng tự ý sử dụng sản phẩm không đúng cách hoặc không phù hợp với loại da khi chưa có tư vấn chuyên môn.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-outline-variant/30">
          <div className="md:col-span-4">
            <h3 className="font-serif text-xl md:text-2xl text-primary font-medium mb-3">4. Sản phẩm, Giá cả & Thanh toán</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Các quy chuẩn về phân phối hàng chính hãng, niêm yết giá bán trực tuyến và phương thức giao dịch được chấp nhận.
            </p>
          </div>
          <div className="md:col-span-8 space-y-6">
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">4.1. Sản phẩm và thông tin sản phẩm</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Tất cả sản phẩm được cung cấp bởi IMPERIAL Skin Care cam kết 100% là hàng chính hãng chất lượng cao. Các thông tin giới thiệu mang tính chất tham khảo khoa học và không thay thế cho các chỉ định y khoa chuyên môn. Hiệu quả phục hồi của sản phẩm có thể khác nhau tùy thuộc vào cơ địa và tình trạng da cá nhân.
              </p>
            </div>
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">4.2. Quy định về giá cả và thanh toán</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Giá sản phẩm được niêm yết công khai trên website dưới đơn vị Đồng Việt Nam (VND). Khách hàng có nghĩa vụ kiểm tra giá tại thời điểm thực hiện đặt hàng.
              </p>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mt-2 font-medium">
                Chúng tôi hỗ trợ đa dạng phương thức thanh toán an toàn bao gồm:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 font-sans text-sm text-on-surface-variant/90 pl-2">
                <li>Thanh toán tiền mặt khi nhận hàng (COD).</li>
                <li>Chuyển khoản trực tiếp qua ngân hàng.</li>
                <li>Thanh toán trực tuyến bằng thẻ tín dụng/thẻ ghi nợ.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-outline-variant/30">
          <div className="md:col-span-4">
            <h3 className="font-serif text-xl md:text-2xl text-primary font-medium mb-3">5. Đơn hàng, Vận chuyển & Đổi trả</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Quy chế vận chuyển, xác nhận đơn hàng bất thường và chính sách hoàn trả hàng hóa lỗi.
            </p>
          </div>
          <div className="md:col-span-8 space-y-6">
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">5.1. Xác nhận và xử lý đơn hàng</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Đơn hàng chỉ được xác nhận thành công sau khi hệ thống của IMPERIAL kiểm tra tính xác thực của thông tin. Chúng tôi có quyền liên hệ qua điện thoại để xác minh và từ chối xử lý các đơn hàng có dấu hiệu bất thường hoặc thông tin không rõ ràng.
              </p>
            </div>
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">5.2. Giao nhận & Vận chuyển</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Thời gian giao nhận hàng hóa mang tính ước tính dựa trên thông tin của đơn vị đối tác vận chuyển thứ ba. IMPERIAL Skin Care được miễn trừ trách nhiệm pháp lý đối với các trường hợp giao hàng chậm trễ do ảnh hưởng thời tiết, thiên tai hoặc lỗi trực tiếp từ bên vận chuyển.
              </p>
            </div>
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">5.3. Đổi trả và hoàn tiền</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Tất cả các giao dịch phát sinh yêu cầu hoàn trả hoặc đổi mới sản phẩm đều được áp dụng theo đúng khung Chính sách Đổi trả & Hoàn tiền chính thức được đăng tải trên website này. Khách hàng có trách nhiệm tìm hiểu kỹ quy định trước khi thanh toán mua hàng.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-outline-variant/30">
          <div className="md:col-span-4">
            <h3 className="font-serif text-xl md:text-2xl text-primary font-medium mb-3">6. Giới hạn pháp lý & Hành vi cấm</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Giới hạn trách nhiệm pháp lý cao nhất, bản quyền trí tuệ của nội dung và danh mục các hành vi bị cấm trên website.
            </p>
          </div>
          <div className="md:col-span-8 space-y-6">
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">6.1. Giới hạn trách nhiệm & Từ chối bảo đảm</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                IMPERIAL Skin Care được miễn trừ trách nhiệm hoàn toàn trong các trường hợp: sản phẩm không mang lại hiệu quả như kỳ vọng do yếu tố cơ địa đặc thù; khách hàng tự ý bảo quản hoặc sử dụng sai hướng dẫn; thông tin cung cấp sai lệch dẫn đến giao hàng lỗi; các sự cố bất khả kháng ngoài tầm kiểm soát của hệ thống.
              </p>
            </div>
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">6.2. Quyền sở hữu trí tuệ</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Toàn bộ dữ liệu chữ viết, hình ảnh thương hiệu, hình ảnh sản phẩm và giao diện thiết kế được hiển thị trên website đều thuộc quyền sở hữu trí tuệ độc quyền của IMPERIAL Skin Care. Nghiêm cấm mọi hành vi sao chép, phân phối hoặc sử dụng thương mại khi chưa có văn bản chấp thuận chính thức từ chúng tôi.
              </p>
            </div>
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">6.3. Các hành vi bị cấm</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Người dùng tuyệt đối không được thực hiện các hành vi: cung cấp thông tin giả mạo; sử dụng công cụ phá hoại hoặc can thiệp vào máy chủ web; lợi dụng hệ thống để thực hiện các giao dịch lừa đảo hoặc trái pháp luật hiện hành.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-outline-variant/30">
          <div className="md:col-span-4">
            <h3 className="font-serif text-xl md:text-2xl text-primary font-medium mb-3">7. Sửa đổi, Luật áp dụng & Liên hệ</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Quy chế cập nhật điều khoản dịch vụ, cơ quan trọng tài pháp lý và kênh tiếp nhận phản hồi chính thức.
            </p>
          </div>
          <div className="md:col-span-8 space-y-6">
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">7.1. Cập nhật và sửa đổi điều khoản</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Chúng tôi giữ toàn quyền thay đổi, điều chỉnh và cập nhật các nội dung trong văn bản Điều khoản Dịch vụ này tại bất kỳ thời điểm nào mà không cần báo trước. Các nội dung sửa đổi sẽ lập tức có hiệu lực pháp lý ngay khi được đăng tải công khai trên website.
              </p>
            </div>
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">7.2. Luật áp dụng</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Tất cả các điều khoản dịch vụ này được điều chỉnh, bảo hộ và giải thích theo các văn bản pháp luật hiện hành của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
              </p>
            </div>
            <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
              <h4 className="font-sans text-base font-semibold text-primary mb-2">7.3. Thông tin liên hệ giải quyết khiếu nại</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Nếu có bất kỳ câu hỏi hoặc phản hồi khiếu nại nào liên quan đến các điều khoản dịch vụ này, xin vui lòng kết nối với chúng tôi qua các cổng thông tin sau:
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-surface-container-low border border-outline-variant/30 rounded text-center">
                  <p className="font-sans text-xs uppercase tracking-wider text-secondary font-semibold">Đường dây nóng</p>
                  <p className="font-sans text-base font-bold text-primary mt-1">0869 733 288</p>
                </div>
                <div className="p-4 bg-surface-container-low border border-outline-variant/30 rounded text-center">
                  <p className="font-sans text-xs uppercase tracking-wider text-secondary font-semibold">Hòm thư điện tử</p>
                  <p className="font-sans text-sm font-semibold text-primary mt-2">Info.ImperialSkincare@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
