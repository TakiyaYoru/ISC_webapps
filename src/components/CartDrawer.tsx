import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cartState'
import { useUser } from '../context/userState'
import { api, ApiError } from '../services/api'
import { productTypeLabel } from '../utils/productLabels'
import BankTransferInstructions from './BankTransferInstructions'
import type { PendingBankOrder } from '../utils/bankTransfer'

export default function CartDrawer() {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
    refreshPrices,
  } = useCart()

  const { user, addOrder, setLoginModalOpen } = useUser()

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success' | 'transfer'>('cart')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [province, setProvince] = useState('Thành phố Hồ Chí Minh')
  const [district, setDistrict] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer'>('bank_transfer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationError, setValidationError] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [termsError, setTermsError] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [bankOrder, setBankOrder] = useState<PendingBankOrder | null>(null)
  const checkoutRequest = useRef<{ fingerprint: string; id: string } | null>(null)

  useEffect(() => {
    if (user && checkoutStep === 'form') {
      if (!name) setName(user.name)
      if (!phone) setPhone(user.phone)
    }
  }, [user, checkoutStep, name, phone])

  const processCheckout = async () => {
    if (isSubmitting) return
    if (!termsAccepted) {
      setTermsError(true)
      return
    }
    setTermsError(false)
    const normalizedPhone = phone.trim().replace(/[\s.()-]/g, '').replace(/^\+?84(?=\d{9}$)/, '0')
    const inputError = name.trim().length < 2 || name.trim().length > 100 ? 'Vui lòng nhập họ tên từ 2 đến 100 ký tự.'
      : !/^0\d{9}$/.test(normalizedPhone) ? 'Vui lòng nhập số điện thoại Việt Nam gồm 10 chữ số, bắt đầu bằng 0 (hoặc dùng mã +84).'
      : address.trim().length < 3 || address.trim().length > 300 ? 'Vui lòng nhập địa chỉ chi tiết từ 3 đến 300 ký tự.'
      : !district.trim() || district.trim().length > 100 ? 'Vui lòng nhập khu vực giao hàng, tối đa 100 ký tự.'
      : note.trim().length > 1000 ? 'Ghi chú tối đa 1.000 ký tự.'
      : null
    if (inputError) { setSubmissionError(inputError); return }
    if (!name || !phone || !address || !district) {
      setValidationError(true)
      return
    }
    setValidationError(false)

    setSubmissionError('')
    setIsSubmitting(true)
    const input = {
      client_name: name.trim(), client_phone: normalizedPhone, note: note.trim(),
      shippingAddress: { address: address.trim(), district: district.trim(), province },
      paymentMethod, termsAccepted: true as const, termsVersion: '2026-10-13' as const,
      expectedTotal: cartTotal, items: cartItems.map(item => ({ slug: item.slug, quantity: item.quantity })),
    }
    const fingerprint = JSON.stringify(input)
    if (!checkoutRequest.current) {
      try { checkoutRequest.current = JSON.parse(sessionStorage.getItem('isc_checkout_request') || 'null') } catch { /* New request below. */ }
    }
    if (checkoutRequest.current?.fingerprint !== fingerprint) {
      checkoutRequest.current = { fingerprint, id: crypto.randomUUID() }
      try { sessionStorage.setItem('isc_checkout_request', JSON.stringify(checkoutRequest.current)) } catch { /* In-memory retries still work. */ }
    }
    try {
      const result = await api.orders.create({
        ...input, idempotencyKey: checkoutRequest.current.id,
      })
      if (!result.success) throw new Error('Không thể ghi nhận đơn hàng')
      const orderCode = result.code
      const total = result.total
      addOrder({ code: orderCode, total, paymentMethod: result.paymentMethod, clientName: name, clientPhone: phone,
        items: result.items.map(item => ({ name: item.name, quantity: item.quantity, price: formatVND(item.priceAmount), image: item.image })) })
      if (paymentMethod === 'bank_transfer') {
        const pending = { code: orderCode, total }
        setBankOrder(pending)
        try { localStorage.setItem('imperial_skincare_bank_order', JSON.stringify(pending)) } catch { /* Instructions remain in the drawer. */ }
        setCheckoutStep('transfer')
      } else setCheckoutStep('success')
      clearCart()
      checkoutRequest.current = null
      try { sessionStorage.removeItem('isc_checkout_request') } catch { /* Order is already saved. */ }
    } catch (error) {
      if (error instanceof ApiError && error.code === 'PRICE_CHANGED') {
        try {
          refreshPrices(await api.products.getAll())
          setCheckoutStep('cart')
          setTermsAccepted(false)
        } catch { /* Keep current cart and show the error. */ }
      }
      setSubmissionError((error instanceof Error ? error.message : 'Chưa gửi được đơn hàng.') + ' Thông tin và giỏ hàng được giữ lại; vui lòng thử lại hoặc liên hệ 0869 733 288.')
    } finally { setIsSubmitting(false) }
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    processCheckout()
  }

  const handleClose = () => {
    setTermsAccepted(false)
    setTermsError(false)
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
      setPaymentMethod('bank_transfer')
      setValidationError(false)
    }, 300)
  }

  const formatVND = (num: number) => {
    return num.toLocaleString('vi-VN') + ' VNĐ'
  }

  const termsConsent = (
    <div className="mb-5 text-sm leading-relaxed text-on-surface-variant">
      <div className="flex items-start gap-3">
        <input
          id="checkout-terms"
          type="checkbox"
          required
          checked={termsAccepted}
          aria-invalid={termsError}
          aria-describedby={termsError ? 'checkout-terms-error' : undefined}
          onChange={(event) => {
            setTermsAccepted(event.target.checked)
            setTermsError(false)
          }}
          className="mt-1 h-4 w-4 shrink-0 accent-primary"
        />
        <label htmlFor="checkout-terms">
          Tôi đã đọc và đồng ý với các{' '}
          <Link to="/policy/terms" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
            Điều kiện giao dịch chung của website
          </Link>{' '}<span aria-hidden="true">*</span>
        </label>
      </div>
      {termsError && <p id="checkout-terms-error" role="alert" className="mt-2 text-red-600">Vui lòng đọc và đồng ý với điều kiện giao dịch trước khi đặt hàng.</p>}
    </div>
  )

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
                {checkoutStep === 'transfer' && 'Thông tin chuyển khoản'}
              </h2>
              <button
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center text-primary/60 hover:text-primary transition-colors"
                aria-label="Đóng giỏ hàng"
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
                              {productTypeLabel(item.type)}
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
                        Đăng nhập để lưu lịch sử đơn hàng, hoặc tiếp tục đặt hàng không cần tài khoản.
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

                      <label className={`flex gap-3 p-4 border cursor-pointer items-center ${paymentMethod === 'bank_transfer' ? 'border-primary bg-primary/[0.03]' : 'border-outline-variant'}`}>
                        <input type="radio" name="payment-method" checked={paymentMethod === 'bank_transfer'} onChange={() => setPaymentMethod('bank_transfer')} className="accent-primary" />
                        <span><span className="block font-semibold text-primary">Chuyển khoản ngân hàng</span><span className="block text-xs mt-1">Vietcombank · Tài khoản CÔNG TY CỔ PHẦN IMPERIAL CARE</span></span>
                      </label>
                    </div>
                  </div>
                </form>
              )}

              {checkoutStep === 'transfer' && bankOrder && <><BankTransferInstructions order={bankOrder} /><Link to="/payment/bank-transfer" onClick={handleClose} className="btn-primary mt-6 w-full">Mở trang thông tin chuyển khoản</Link></>}
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
                {submissionError && <p role="alert" className="mb-4 text-sm text-red-600">{submissionError}</p>}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif text-lg text-primary">Tổng tạm tính</span>
                  <span className="font-serif text-xl text-primary font-semibold">{formatVND(cartTotal)}</span>
                </div>
                {termsConsent}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      if (!termsAccepted) {
                        setTermsError(true)
                        return
                      }
                      setCheckoutStep('form')
                    }}
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
                {submissionError && <p role="alert" className="mb-4 text-sm text-red-600">{submissionError}</p>}
                {termsConsent}
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={processCheckout}
                    disabled={isSubmitting || !termsAccepted}
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
                      paymentMethod === 'cod' ? 'Xác nhận đặt hàng (COD)' : 'Đặt hàng và chuyển khoản'
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
