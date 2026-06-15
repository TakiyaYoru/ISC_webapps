import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '../context/UserContext'

export default function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, login } = useUser()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Vui lòng nhập email đăng nhập')
      return
    }
    // Simple mock validation
    login(name || 'Khách Hàng', email, phone || '0901234567', address || 'TP. Hồ Chí Minh')
    resetForm()
  }

  const handleUseDemo = () => {
    login('Nguyễn Minh Quân', 'quan.nguyen@lelaffe.com', '0909123456', '123 Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh')
    resetForm()
  }

  const resetForm = () => {
    setEmail('')
    setName('')
    setPhone('')
    setAddress('')
    setError('')
  }

  return (
    <AnimatePresence>
      {loginModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setLoginModalOpen(false)}
            className="fixed inset-0 bg-black"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-[440px] bg-background border border-outline-variant/60 p-8 shadow-[0_24px_50px_rgba(0,0,0,0.15)] z-10 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-4 right-4 text-primary/50 hover:text-primary transition-colors p-1"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-primary/30 text-3xl font-light block mb-2">✦</span>
              <h2 className="font-serif text-2xl text-primary tracking-tight">Đăng Nhập Tài Khoản</h2>
              <p className="font-body-md text-xs text-on-surface-variant/70 mt-1 max-w-[280px] mx-auto leading-relaxed">
                Đăng nhập để tích điểm hội viên, theo dõi trạng thái đơn hàng và lưu địa chỉ giao nhận.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="label-caps text-[10px] text-primary font-semibold">Địa chỉ Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  placeholder="name@example.com"
                  className="w-full h-11 px-4 border border-outline-variant bg-transparent focus:outline-none focus:border-primary text-body-md"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="label-caps text-[10px] text-primary font-semibold">Họ và Tên (Không bắt buộc)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full h-11 px-4 border border-outline-variant bg-transparent focus:outline-none focus:border-primary text-body-md"
                />
              </div>

              {error && <span className="text-xs text-red-500 font-semibold">{error}</span>}

              <button
                type="submit"
                className="w-full bg-primary text-on-primary h-12 text-label-caps uppercase tracking-widest font-medium transition-colors hover:bg-secondary duration-300 mt-2"
              >
                Đăng nhập
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-outline-variant/30" />
              <span className="text-[10px] font-semibold text-on-surface-variant/40 uppercase tracking-wider">Hoặc</span>
              <div className="flex-1 h-px bg-outline-variant/30" />
            </div>

            {/* Quick Demo Login */}
            <button
              onClick={handleUseDemo}
              className="w-full border border-secondary text-secondary hover:bg-secondary hover:text-white h-12 text-label-caps uppercase tracking-widest font-medium transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Sử dụng tài khoản Demo
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
