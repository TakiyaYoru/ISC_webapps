import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { api } from '../services/api'

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

  const { user, addOrder, setLoginModalOpen } = useUser()

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [province, setProvince] = useState('Thành phố Hồ Chí Minh')
  const [district, setDistrict] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'momo' | 'vnpay'>('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationError, setValidationError] = useState(false)

  useEffect(() => {
    if (user && checkoutStep === 'form') {
      if (!name) setName(user.name)
      if (!phone) setPhone(user.phone)
    }
  }, [user, checkoutStep, name, phone])

  const processCheckout = async () => {
    if (!name || !phone || !address || !district) {
      setValidationError(true)
      return
    }
    setValidationError(false)

    const fullAddress = `${address}, ${district}, ${province}`
    const noteWithAddress = `[Địa chỉ: ${fullAddress}] ${note || ''}`

    if (paymentMethod === 'cod') {
      setIsSubmitting(true)
      
      const orderCode = `COD-${Math.floor(100000 + Math.random() * 900000)}`

      // Add to user account history
      addOrder({
        code: orderCode,
        total: cartTotal,
        paymentMethod: 'cod',
        clientName: name,
        clientPhone: phone,
        items: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
      })

      // Fire-and-forget database insertion so it doesn't block the UI transition
      const insertOrder = async () => {
        try {
          await api.orders.create({
            client_name: name,
            client_phone: phone,
            note: `[COD] [Mã DH: ${orderCode}] ${noteWithAddress}`,
            items: cartItems,
          })
        } catch (err) {
          console.error('Error during checkout submission:', err)
        }
      }
      insertOrder()

      // Simulate a quick 600ms processing delay and transition immediately
      setTimeout(() => {
        setIsSubmitting(false)
        setCheckoutStep('success')
        clearCart()
      }, 600)
    } else if (paymentMethod === 'momo') {
      const code = `MOMO-${Math.floor(100000 + Math.random() * 900000)}`
      localStorage.setItem('imperial_skincare_pending_order', JSON.stringify({
        name,
        phone,
        note: noteWithAddress,
        items: cartItems,
        method: 'momo',
        code,
        total: cartTotal,
      }))
      setCartOpen(false)
      // Redirect to external simulated gateway page
      window.location.href = `/payment/gateway?method=momo`
    } else if (paymentMethod === 'vnpay') {
      const code = `VNPAY-${Math.floor(100000 + Math.random() * 900000)}`
      localStorage.setItem('imperial_skincare_pending_order', JSON.stringify({
        name,
        phone,
        note: noteWithAddress,
        items: cartItems,
        method: 'vnpay',
        code,
        total: cartTotal,
      }))
      setCartOpen(false)
      // Redirect to external simulated gateway page
      window.location.href = `/payment/gateway?method=vnpay`
    }
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    processCheckout()
  }

  const handleClose = () => {
    setCartOpen(false)
    // Revert form states after transition completes
    setTimeout(() => {
      setCheckoutStep('cart')
      setName('')
      setPhone('')
      setNote('')
      setProvince('Thành phố Hồ Chí Minh')
      setDistrict('')
      setAddress('')
      setPaymentMethod('cod')
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
                {checkoutStep === 'form' && 'Thông tin đặt hàng'}
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
                  {!user && (
                    <div className="bg-primary/[0.02] border border-outline-variant/40 p-4 flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant/85 font-body-md leading-relaxed">
                        Đăng nhập để tích lũy điểm thưởng và lưu lịch sử đơn hàng.
                      </span>
                      <button
                        type="button"
                        onClick={() => setLoginModalOpen(true)}
                        className="text-secondary hover:underline font-semibold uppercase tracking-wider font-mono shrink-0 ml-4"
                      >
                        Đăng nhập
                      </button>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="client-name" className="label-caps text-xs text-primary font-semibold">
                      Họ và Tên <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        if (validationError && e.target.value) setValidationError(false)
                      }}
                      placeholder="Nguyễn Văn A"
                      className={`w-full h-12 px-4 border bg-transparent focus:outline-none focus:border-primary text-body-md ${
                        validationError && !name ? 'border-red-500/80 focus:border-red-500 bg-red-500/[0.01]' : 'border-outline-variant'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="client-phone" className="label-caps text-xs text-primary font-semibold">
                      Số điện thoại <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        if (validationError && e.target.value) setValidationError(false)
                      }}
                      placeholder="0901234567"
                      className={`w-full h-12 px-4 border bg-transparent focus:outline-none focus:border-primary text-body-md ${
                        validationError && !phone ? 'border-red-500/80 focus:border-red-500 bg-red-500/[0.01]' : 'border-outline-variant'
                      }`}
                    />
                  </div>

                  {/* Province Selection */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="client-province" className="label-caps text-xs text-primary font-semibold">
                      Tỉnh / Thành Phố <span className="text-secondary">*</span>
                    </label>
                    <select
                      id="client-province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full h-12 px-4 border border-outline-variant bg-transparent focus:outline-none focus:border-primary text-body-md text-primary font-sans cursor-pointer"
                    >
                      <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
                      <option value="Thành phố Hà Nội">Thành phố Hà Nội</option>
                      <option value="Thành phố Đà Nẵng">Thành phố Đà Nẵng</option>
                      <option value="Tỉnh Bình Dương">Tỉnh Bình Dương</option>
                      <option value="Tỉnh Đồng Nai">Tỉnh Đồng Nai</option>
                      <option value="Tỉnh Bà Rịa - Vũng Tàu">Tỉnh Bà Rịa - Vũng Tàu</option>
                    </select>
                  </div>

                  {/* District Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="client-district" className="label-caps text-xs text-primary font-semibold">
                      Quận / Huyện <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="client-district"
                      type="text"
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value)
                        if (validationError && e.target.value) setValidationError(false)
                      }}
                      placeholder="Ví dụ: Quận 1 hoặc Huyện Bình Chánh"
                      className={`w-full h-12 px-4 border bg-transparent focus:outline-none focus:border-primary text-body-md ${
                        validationError && !district ? 'border-red-500/80 focus:border-red-500 bg-red-500/[0.01]' : 'border-outline-variant'
                      }`}
                    />
                  </div>

                  {/* Address Detail Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="client-address" className="label-caps text-xs text-primary font-semibold">
                      Địa chỉ chi tiết (Số nhà, Tên đường, Phường/Xã) <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="client-address"
                      type="text"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value)
                        if (validationError && e.target.value) setValidationError(false)
                      }}
                      placeholder="Ví dụ: 123 Đường Nguyễn Huệ, Phường Bến Nghé"
                      className={`w-full h-12 px-4 border bg-transparent focus:outline-none focus:border-primary text-body-md ${
                        validationError && !address ? 'border-red-500/80 focus:border-red-500 bg-red-500/[0.01]' : 'border-outline-variant'
                      }`}
                    />
                  </div>

                  {validationError && (
                    <div className="bg-red-500/5 border border-red-500/20 text-red-500 text-xs p-3.5 rounded leading-relaxed text-center font-semibold">
                      * Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Địa chỉ giao nhận hàng!
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label htmlFor="client-note" className="label-caps text-xs text-primary font-semibold">
                      Ghi chú thêm (Thời gian nhận hàng, chỉ dẫn giao...)
                    </label>
                    <textarea
                      id="client-note"
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ví dụ: Giao hàng vào giờ hành chính..."
                      className="w-full p-4 border border-outline-variant bg-transparent focus:outline-none focus:border-primary text-body-md resize-none"
                    />
                  </div>

                  {/* Payment Method Cards */}
                  <div className="flex flex-col gap-3 mt-2">
                    <label className="label-caps text-xs text-primary font-semibold">
                      Phương thức thanh toán <span className="text-secondary">*</span>
                    </label>
                    <div className="flex flex-col gap-3">
                      {/* COD */}
                      <div 
                        onClick={() => setPaymentMethod('cod')}
                        className={`flex gap-4 p-4 border cursor-pointer transition-all items-center ${paymentMethod === 'cod' ? 'border-primary bg-primary/[0.03]' : 'border-outline-variant hover:border-primary/50'}`}
                      >
                        <div className="w-9 h-9 rounded bg-[#C8A96A]/10 text-[#C8A96A] flex items-center justify-center flex-shrink-0">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="1" y="3" width="15" height="13" />
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                            <circle cx="5.5" cy="18.5" r="2.5" />
                            <circle cx="18.5" cy="18.5" r="2.5" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body-md text-sm font-semibold text-primary">Thanh toán khi nhận hàng (COD)</p>
                          <p className="text-xs text-on-surface-variant/70 truncate">Thanh toán trực tiếp bằng tiền mặt khi nhận hàng.</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${paymentMethod === 'cod' ? 'border-primary' : 'border-outline'}`}>
                          {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                      </div>

                      {/* MoMo */}
                      <div 
                        onClick={() => setPaymentMethod('momo')}
                        className={`flex gap-4 p-4 border cursor-pointer transition-all items-center ${paymentMethod === 'momo' ? 'border-primary bg-primary/[0.03]' : 'border-outline-variant hover:border-primary/50'}`}
                      >
                        <div className="w-9 h-9 rounded bg-[#A50064] text-white flex items-center justify-center font-bold text-[9px] tracking-tighter flex-shrink-0">
                          momo
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body-md text-sm font-semibold text-primary">Ví MoMo (Redirect)</p>
                          <p className="text-xs text-on-surface-variant/70 truncate">Chuyển hướng đến cổng thanh toán MoMo.</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${paymentMethod === 'momo' ? 'border-primary' : 'border-outline'}`}>
                          {paymentMethod === 'momo' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                      </div>

                      {/* VNPAY */}
                      <div 
                        onClick={() => setPaymentMethod('vnpay')}
                        className={`flex gap-4 p-4 border cursor-pointer transition-all items-center ${paymentMethod === 'vnpay' ? 'border-primary bg-primary/[0.03]' : 'border-outline-variant hover:border-primary/50'}`}
                      >
                        <div className="w-9 h-9 rounded bg-[#005BAA] text-white flex items-center justify-center font-bold text-[9px] tracking-tighter flex-shrink-0 uppercase">
                          vnpay
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body-md text-sm font-semibold text-primary">Cổng VNPAY (Redirect)</p>
                          <p className="text-xs text-on-surface-variant/70 truncate">Chuyển hướng đến cổng thanh toán VNPAY.</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${paymentMethod === 'vnpay' ? 'border-primary' : 'border-outline'}`}>
                          {paymentMethod === 'vnpay' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {checkoutStep === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  {/* Success Checkmark Animation */}
                  <div className="w-20 h-20 mb-8 rounded-full border border-secondary flex items-center justify-center relative bg-secondary/5 mx-auto">
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

                  <h3 className="font-serif text-2xl text-primary mb-4">Gửi yêu cầu thành công</h3>
                  <p className="font-body-md text-on-surface-variant/80 mb-8 max-w-[320px] leading-relaxed">
                    Yêu cầu đặt hàng của quý khách <strong className="text-primary font-medium">{name}</strong> đã được hệ thống ghi nhận.
                    <br /><br />
                    Chuyên viên của chúng tôi sẽ gọi điện xác nhận đơn hàng qua số điện thoại <strong className="text-primary font-medium">{phone}</strong> trong vòng 2 giờ làm việc.
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

            {/* Footer Summary */}
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
                    Tiến hành thanh toán
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
                    type="button"
                    onClick={processCheckout}
                    disabled={isSubmitting}
                    className="w-full bg-primary text-on-primary h-14 text-label-caps uppercase tracking-widest font-medium transition-colors hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed duration-300 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : (
                      paymentMethod === 'cod' ? 'Xác nhận đặt hàng (COD)' : (paymentMethod === 'momo' ? 'Thanh toán qua ví MoMo' : 'Thanh toán qua cổng VNPAY')
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
