import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart()

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return
    setIsSubmitting(true)

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      setCheckoutStep('success')
      clearCart()
    }, 1800)
  }

  const handleClose = () => {
    setCartOpen(false)
    // Revert form states after transition completes
    setTimeout(() => {
      setCheckoutStep('cart')
      setName('')
      setPhone('')
      setNote('')
    }, 300)
  }

  const formatVND = (num: number) => {
    return num.toLocaleString('vi-VN') + ' VNĐ'
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black z-[100]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[480px] bg-background border-l border-outline-variant/30 z-[101] shadow-[0_0_50px_rgba(0,0,0,0.15)] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-outline-variant flex items-center justify-between">
              <h2 className="font-serif text-2xl text-primary tracking-tight">
                {checkoutStep === 'cart' && 'Giỏ hàng của bạn'}
                {checkoutStep === 'form' && 'Thông tin nhận tư vấn'}
                {checkoutStep === 'success' && 'Gửi thành công'}
              </h2>
              <button
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center text-primary/60 hover:text-primary transition-colors"
                aria-label="Close cart"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content body */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {checkoutStep === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20">
                      <span className="text-primary/30 text-5xl mb-6 font-light">✦</span>
                      <p className="font-serif text-lg text-primary/80 mb-2">Giỏ hàng của bạn đang trống</p>
                      <p className="font-body-md text-on-surface-variant/70 mb-8 max-w-[280px]">
                        Hãy chọn cho mình sản phẩm phục hồi tế bào da phù hợp từ bộ sưu tập của chúng tôi.
                      </p>
                      <button
                        onClick={handleClose}
                        className="bg-primary text-on-primary px-8 py-3.5 text-xs uppercase tracking-widest font-medium transition-colors hover:bg-secondary"
                      >
                        Khám phá sản phẩm
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {cartItems.map((item) => (
                        <div key={item.slug} className="flex gap-4 border-b border-outline-variant/30 pb-6 items-start">
                          <div className="w-20 h-20 border border-outline-variant/30 flex items-center justify-center p-1 bg-surface-container-lowest overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain mix-blend-multiply"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/80 block mb-1">
                              {item.type}
                            </span>
                            <h4 className="font-serif text-base text-primary leading-snug truncate mb-1">
                              {item.name}
                            </h4>
                            <p className="font-body-md text-sm text-primary font-medium mb-3">
                              {item.price}
                            </p>

                            {/* Quantity and Remove row */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-outline-variant/60 h-8 w-24">
                                <button
                                  onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                                  className="flex-1 h-full flex items-center justify-center text-primary/70 hover:bg-surface-container-low transition-colors"
                                >
                                  −
                                </button>
                                <span className="font-body-md text-xs text-primary w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                                  className="flex-1 h-full flex items-center justify-center text-primary/70 hover:bg-surface-container-low transition-colors"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.slug)}
                                className="text-xs text-on-surface-variant/60 hover:text-red-500 hover:underline transition-colors"
                              >
                                Xóa sản phẩm
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'form' && (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="flex flex-col gap-6 py-2">
                  <div className="bg-surface-container-low p-4 border border-outline-variant/40 rounded">
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                      <span className="text-secondary font-medium">Lưu ý:</span> Chức năng đặt hàng trực tuyến hiện tại đang được chuẩn hóa. Quý khách vui lòng để lại thông tin liên hệ dưới đây. Chuyên viên chăm sóc khách hàng của <strong className="text-primary font-serif">IMPERIAL</strong> sẽ gọi điện tư vấn chuyên sâu về tình trạng da và xác nhận thông tin giao nhận hàng cho quý khách.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="client-name" className="label-caps text-xs text-primary font-semibold">
                      Họ và Tên <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full h-12 px-4 border border-outline-variant bg-transparent focus:outline-none focus:border-primary text-body-md"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="client-phone" className="label-caps text-xs text-primary font-semibold">
                      Số điện thoại <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0901234567"
                      className="w-full h-12 px-4 border border-outline-variant bg-transparent focus:outline-none focus:border-primary text-body-md"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="client-note" className="label-caps text-xs text-primary font-semibold">
                      Ghi chú thêm (Tình trạng da, thời gian gọi điện...)
                    </label>
                    <textarea
                      id="client-note"
                      rows={4}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ví dụ: Da tôi nhạy cảm, muốn được tư vấn kỹ hơn về essence. Hãy gọi cho tôi ngoài giờ hành chính."
                      className="w-full p-4 border border-outline-variant bg-transparent focus:outline-none focus:border-primary text-body-md resize-none"
                    />
                  </div>
                </form>
              )}

              {checkoutStep === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  {/* Premium Success Checkmark Animation */}
                  <div className="w-20 h-20 mb-8 rounded-full border border-secondary flex items-center justify-center relative bg-secondary/5">
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-secondary"
                    >
                      <motion.polyline
                        points="20 6 9 17 4 12"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </motion.svg>
                  </div>

                  <h3 className="font-serif text-2xl text-primary mb-4">Gửi thông tin thành công</h3>
                  <p className="font-body-md text-on-surface-variant/80 mb-8 max-w-[320px] leading-relaxed">
                    Yêu cầu tư vấn và đặt hàng của quý khách <strong className="text-primary font-medium">{name}</strong> đã được hệ thống ghi nhận.
                    <br /><br />
                    Chuyên viên của chúng tôi sẽ liên hệ trực tiếp tới số điện thoại <strong className="text-primary font-medium">{phone}</strong> trong vòng 2 giờ làm việc tiếp theo.
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-primary text-on-primary px-8 py-3.5 text-xs uppercase tracking-widest font-medium transition-colors hover:bg-secondary"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary (Sticky at bottom) */}
            {cartItems.length > 0 && checkoutStep === 'cart' && (
              <div className="p-6 border-t border-outline-variant bg-surface-container-lowest">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif text-lg text-primary">Tổng tạm tính</span>
                  <span className="font-serif text-xl text-primary font-semibold">{formatVND(cartTotal)}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setCheckoutStep('form')}
                    className="w-full bg-primary text-on-primary h-14 text-label-caps uppercase tracking-widest font-medium transition-colors hover:bg-secondary duration-300"
                  >
                    Đặt hàng / Nhận tư vấn mua hàng
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-full border border-outline-variant text-primary h-14 text-label-caps uppercase tracking-widest hover:bg-surface-container-low transition-colors duration-300"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 'form' && (
              <div className="p-6 border-t border-outline-variant bg-surface-container-lowest">
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting || !name || !phone}
                    className="w-full bg-primary text-on-primary h-14 text-label-caps uppercase tracking-widest font-medium transition-colors hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed duration-300 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang gửi thông tin...
                      </>
                    ) : (
                      'Xác nhận thông tin'
                    )}
                  </button>
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full border border-outline-variant text-primary h-14 text-label-caps uppercase tracking-widest hover:bg-surface-container-low transition-colors duration-300"
                  >
                    Quay lại giỏ hàng
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
