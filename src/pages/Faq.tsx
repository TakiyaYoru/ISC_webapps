import { useState } from 'react'
import { Link } from 'react-router-dom'

type FaqItem = { id: string; question: string; answer: string }

type FaqSection = { id: string; title: string; items: FaqItem[] }

const sections: FaqSection[] = [
  {
    id: 'san-pham',
    title: 'Sản phẩm',
    items: [
      {
        id: 'san-pham-1',
        question: 'Sản phẩm của IMPERIAL có phù hợp với da nhạy cảm không?',
        answer:
          'Tất cả sản phẩm của IMPERIAL Skin Care đều được phát triển dựa trên nền tảng khoa học da liễu và kiểm nghiệm nghiêm ngặt. Tuy nhiên, da nhạy cảm có nhiều cấp độ. Chúng tôi khuyến khích bạn đặt lịch tư vấn chuyên sâu hoặc thử nghiệm ở một vùng da nhỏ trước khi sử dụng toàn mặt.',
      },
      {
        id: 'san-pham-2',
        question: 'Các thành phần có nguồn gốc tự nhiên hay hóa học?',
        answer:
          'Chúng tôi kết hợp những tinh túy từ tự nhiên với các hoạt chất khoa học tiên tiến (như Peptides, Niacinamide, AHA/BHA) để đạt hiệu quả tối ưu. Sự minh bạch về thành phần là ưu tiên hàng đầu, mọi thông tin chi tiết đều có trên nhãn và website.',
      },
    ],
  },
  {
    id: 'dat-hang',
    title: 'Đặt hàng & thanh toán',
    items: [
      {
        id: 'dat-hang-1',
        question: 'Tôi có thể thanh toán bằng những hình thức nào?',
        answer:
          'Chúng tôi chấp nhận chuyển khoản ngân hàng, thanh toán qua cổng VNPay, thẻ tín dụng (Visa/Mastercard) và hình thức thanh toán khi nhận hàng (COD) cho một số khu vực nhất định.',
      },
    ],
  },
  {
    id: 'van-chuyen',
    title: 'Vận chuyển',
    items: [
      {
        id: 'van-chuyen-1',
        question: 'Thời gian giao hàng dự kiến là bao lâu?',
        answer:
          'Thời gian giao hàng dao động từ 2–5 ngày làm việc tùy khu vực. Bạn sẽ nhận được mã vận đơn để theo dõi trạng thái giao hàng.',
      },
    ],
  },
  {
    id: 'doi-tra',
    title: 'Đổi trả & hoàn tiền',
    items: [
      {
        id: 'doi-tra-1',
        question: 'Tôi có thể đổi trả trong bao lâu?',
        answer:
          'Yêu cầu đổi trả cần được gửi trong vòng 48 giờ kể từ thời điểm nhận hàng. Vui lòng chuẩn bị video mở hộp liền mạch để hỗ trợ xác minh.',
      },
    ],
  },
]

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>('san-pham-1')

  return (
    <div>
      <div className="container-wide py-6">
        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
          Trang chủ / <span className="text-primary">Hỏi đáp</span>
        </p>
      </div>

      <section className="container-wide py-section-gap text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="font-display-lg text-display-lg text-primary">Câu hỏi thường gặp</h1>
          <p className="font-headline-md text-headline-md text-on-surface-variant italic">
            Những thông tin cần biết trước khi lựa chọn sản phẩm chăm sóc da tại IMPERIAL Skin Care.
          </p>
          <div className="w-12 h-px bg-outline-variant mx-auto" />
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            IMPERIAL Skin Care cung cấp thông tin minh bạch nhằm hỗ trợ khách hàng lựa chọn sản phẩm phù hợp với tình trạng da thực tế, trải nghiệm mua hàng rõ ràng và an tâm hơn.
          </p>
        </div>
      </section>

      <section className="container-wide pb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <aside className="md:col-span-3">
            <div className="sticky top-[120px]">
              <ul className="space-y-4 font-body-lg text-body-lg text-on-surface-variant no-scrollbar overflow-x-auto flex md:block whitespace-nowrap md:whitespace-normal pb-4 md:pb-0 border-b border-outline-variant md:border-b-0">
                {sections.map((section) => (
                  <li key={section.id} className="pr-6 md:pr-0">
                    <a
                      className="hover:text-primary transition-colors"
                      href={`#${section.id}`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="md:col-span-8 md:col-start-5 space-y-16">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="font-headline-md text-headline-md text-primary mb-8 pb-4 border-b border-outline-variant">
                  {section.title}
                </h2>
                <div className="space-y-0">
                  {section.items.map((item) => {
                    const isOpen = openId === item.id
                    return (
                      <div key={item.id} className="border-b border-surface-variant py-6">
                        <button
                          type="button"
                          className="w-full flex justify-between items-center text-left"
                          onClick={() => setOpenId(isOpen ? null : item.id)}
                        >
                          <h3 className="font-body-lg text-body-lg font-medium pr-8">{item.question}</h3>
                          <span className={`text-outline ${isOpen ? 'hidden' : 'block'}`}>+</span>
                          <span className={`text-primary ${isOpen ? 'block' : 'hidden'}`}>−</span>
                        </button>
                        {isOpen && (
                          <div className="font-body-md text-body-md text-on-surface-variant pt-4 pr-12">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-section-gap">
        <div className="container-wide text-center">
          <div className="max-w-2xl mx-auto bg-surface border border-outline-variant p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-fixed opacity-10" />
            <div className="relative z-10">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Bạn cần tư vấn thêm?</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                Đội ngũ IMPERIAL Skin Care sẵn sàng hỗ trợ bạn lựa chọn sản phẩm phù hợp với tình trạng da thực tế.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
                <Link to="/contact" className="btn-primary">Đặt lịch tư vấn</Link>
                <Link to="/contact" className="btn-ghost">Liên hệ IMPERIAL</Link>
              </div>
              <div className="font-body-md text-body-md text-on-surface-variant space-y-2">
                <p>Hotline: <a className="text-primary hover:underline" href="tel:0869733288">0869 733 288</a></p>
                <p>Email: <a className="text-primary hover:underline" href="mailto:info.imperialskincare@gmail.com">info.imperialskincare@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
