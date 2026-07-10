import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setIsSubmitting(true)

    // Save to localStorage for Admin Dashboard demo persistence
    const savedInquiries = localStorage.getItem('imperial_skincare_inquiries')
    const inquiries = savedInquiries ? JSON.parse(savedInquiries) : []
    const newInquiry = {
      id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      name,
      email,
      message,
      date: new Date().toISOString(),
      status: 'new'
    }
    localStorage.setItem('imperial_skincare_inquiries', JSON.stringify([newInquiry, ...inquiries]))

    try {
      await api.contact.submit({
        name,
        email,
        message,
      })
    } catch (err) {
      console.error('Error submitting contact form:', err)
    } finally {
      setIsSubmitting(false)
      setSuccess(true)
      setName('')
      setEmail('')
      setMessage('')
    }
  }

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
          {success ? (
            <div className="text-center py-8 flex flex-col items-center">
              <div className="w-16 h-16 mb-6 rounded-full border border-secondary flex items-center justify-center bg-secondary/5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-secondary animate-reveal"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-headline-md text-headline-md text-primary mb-3">Gửi liên hệ thành công</h2>
              <p className="font-body-md text-on-surface-variant mb-6 text-center leading-relaxed">
                Cảm ơn bạn đã liên hệ với IMPERIAL. Chúng tôi đã nhận được thông tin và sẽ phản hồi sớm nhất có thể qua email hoặc số điện thoại của bạn.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="btn-primary w-full text-center flex justify-center py-3.5"
              >
                Gửi thêm yêu cầu
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-headline-md text-headline-md text-primary mb-4">Gửi yêu cầu</h2>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-outline-variant/60 px-4 py-3 bg-transparent text-body-md focus:outline-none focus:border-primary"
                placeholder="Họ và tên"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-outline-variant/60 px-4 py-3 bg-transparent text-body-md focus:outline-none focus:border-primary"
                placeholder="Email"
              />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-outline-variant/60 px-4 py-3 bg-transparent text-body-md resize-none focus:outline-none focus:border-primary"
                rows={4}
                placeholder="Nội dung"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
