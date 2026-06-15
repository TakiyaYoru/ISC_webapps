import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import Reveal from '../components/Reveal'

export default function OrderSuccess() {
  const [searchParams] = useSearchParams()
  const { clearCart } = useCart()
  const { addOrder } = useUser()

  const name = searchParams.get('name') || 'Quý khách'
  const phone = searchParams.get('phone') || ''
  const code = searchParams.get('code') || `IP-${Math.floor(100000 + Math.random() * 900000)}`
  const method = searchParams.get('method') || 'cod'

  useEffect(() => {
    // Clear cart and pending order metadata when success page renders
    const pendingData = localStorage.getItem('imperial_skincare_pending_order')
    if (pendingData) {
      try {
        const pending = JSON.parse(pendingData)
        addOrder({
          code: pending.code,
          total: pending.total,
          paymentMethod: pending.method,
          clientName: pending.name,
          clientPhone: pending.phone,
          items: pending.items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          })),
        })
      } catch (err) {
        console.error('Error recording success order:', err)
      }
    }
    clearCart()
    localStorage.removeItem('imperial_skincare_pending_order')
  }, [clearCart, addOrder])

  const getMethodLabel = (m: string) => {
    if (m === 'momo') return 'Ví điện tử MoMo (Đã thanh toán)'
    if (m === 'vnpay') return 'Cổng thanh toán VNPAY (Đã thanh toán)'
    return 'Thanh toán khi nhận hàng (COD)'
  }

  return (
    <div className="min-h-[85vh] bg-background text-on-background py-16 md:py-24 relative overflow-hidden flex items-center">
      {/* Soft atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 85% 15%, rgba(200, 169, 106, 0.04), transparent 60%), radial-gradient(ellipse 70% 50% at 10% 90%, rgba(15, 26, 36, 0.02), transparent 55%)',
        }}
      />

      <div className="container-wide relative max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Success Icon */}
        <Reveal>
          <div className="w-20 h-20 mb-8 rounded-full border border-secondary flex items-center justify-center relative bg-secondary/5 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-secondary"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </Reveal>

        {/* Title */}
        <Reveal delay={0.1}>
          <p className="label-caps text-secondary mb-3 tracking-[0.2em] font-semibold">THANK YOU</p>
          <h1 className="font-serif text-display-md leading-tight text-primary mb-6">
            Đơn hàng hoàn tất
          </h1>
          <p className="font-body-lg text-on-surface-variant/80 max-w-md mx-auto leading-relaxed mb-10">
            Cảm ơn quý khách <strong className="text-primary font-medium">{name}</strong> đã lựa chọn các sản phẩm chăm sóc tế bào da chuyên sâu từ <strong className="font-serif text-primary">IMPERIAL</strong>.
          </p>
        </Reveal>

        {/* Receipt Box */}
        <Reveal delay={0.2}>
          <div className="w-full bg-surface-container-low border border-outline-variant/35 p-6 md:p-8 text-left mb-10 space-y-4">
            <h3 className="font-serif text-lg text-primary border-b border-outline-variant/30 pb-3 mb-4 font-semibold">
              Chi tiết đơn hàng
            </h3>
            
            <div className="flex justify-between items-center text-sm font-body-md">
              <span className="text-on-surface-variant/70">Mã đơn hàng:</span>
              <span className="font-mono font-semibold text-primary">{code}</span>
            </div>

            <div className="flex justify-between items-center text-sm font-body-md">
              <span className="text-on-surface-variant/70">Số điện thoại khách hàng:</span>
              <span className="text-primary font-medium">{phone}</span>
            </div>

            <div className="flex justify-between items-start text-sm font-body-md">
              <span className="text-on-surface-variant/70">Phương thức:</span>
              <span className="text-primary font-medium text-right max-w-[280px]">
                {getMethodLabel(method)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm font-body-md pt-2 border-t border-outline-variant/20">
              <span className="text-on-surface-variant/70">Trạng thái:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200/50 rounded-full text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Đang xử lý
              </span>
            </div>
          </div>
        </Reveal>

        {/* Order Progress Flow */}
        <Reveal delay={0.35}>
          <div className="w-full max-w-md mx-auto grid grid-cols-4 items-center mb-12 text-xs relative">
            {/* Horizontal progress bar background */}
            <div className="absolute left-[12.5%] right-[12.5%] top-[14px] h-0.5 bg-outline-variant/40 -z-10" />
            <div className="absolute left-[12.5%] w-[37.5%] top-[14px] h-0.5 bg-secondary -z-10" />

            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold font-serif text-sm">
                ✓
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">Đặt hàng</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold font-serif text-sm">
                ✓
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">Thanh toán</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant text-outline flex items-center justify-center font-bold font-serif text-sm">
                3
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-outline">Chuẩn bị</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant text-outline flex items-center justify-center font-bold font-serif text-sm">
                4
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-outline">Giao nhận</span>
            </div>
          </div>
        </Reveal>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
          <Link to="/" className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 text-[0.8125rem] uppercase tracking-widest font-medium transition-all duration-300 hover:bg-secondary">
            Quay lại Trang chủ
          </Link>
          <Link to="/collection" className="inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-widest font-semibold pb-1 border-b border-primary/60 transition-all duration-300 hover:border-secondary hover:text-secondary">
            Tiếp tục mua sắm →
          </Link>
        </div>
      </div>
    </div>
  )
}
