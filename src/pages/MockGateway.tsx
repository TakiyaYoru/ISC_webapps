import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function MockGateway() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const method = searchParams.get('method') || 'momo'
  const [isProcessing, setIsProcessing] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes timer

  useEffect(() => {
    const pendingData = localStorage.getItem('imperial_skincare_pending_order')
    if (pendingData) {
      setOrder(JSON.parse(pendingData))
    } else {
      // If no pending order data, redirect back to home
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatVND = (num: number) => {
    return num.toLocaleString('vi-VN') + ' VNĐ'
  }

  const handlePaymentSuccess = () => {
    if (!order) return
    setIsProcessing(true)

    // Simulate 2 seconds network delay
    setTimeout(() => {
      const methodLabel = method === 'momo' ? 'MoMo' : 'VNPAY'
      
      // Fire-and-forget database insertion so it doesn't block navigation if it hangs or fails
      const insertOrder = async () => {
        try {
          const { error } = await supabase.from('orders').insert([
            {
              client_name: order.name,
              client_phone: order.phone,
              note: `[Đã thanh toán qua ${methodLabel} - Mã GD: ${order.code}] ${order.note || ''}`,
              items: order.items,
            }
          ])
          if (error) {
            console.error('Error inserting order to Supabase:', error)
          }
        } catch (err) {
          console.error('Error in gateway database insertion:', err)
        }
      }
      insertOrder()

      setIsProcessing(false)
      navigate(`/order-success?method=${method}&code=${order.code}&name=${encodeURIComponent(order.name)}&phone=${order.phone}`)
    }, 2000)
  }

  const handleCancel = () => {
    // If canceled, redirect back to home
    navigate('/')
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <p className="text-gray-600 font-medium">Đang tải thông tin giao dịch...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-800 font-sans flex flex-col justify-between">
      {/* Top Banner */}
      <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif italic text-lg tracking-wider text-black font-semibold">IMPERIAL</span>
            <span className="text-gray-300 font-light">|</span>
            <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-mono">Cổng thanh toán kiểm thử</span>
          </div>
          <button onClick={handleCancel} className="text-sm text-gray-500 hover:text-red-600 hover:underline transition-colors">
            Hủy giao dịch
          </button>
        </div>
      </header>

      {/* Main Payment Section */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 flex-grow flex items-center justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Order Info Panel (Left) */}
          <div className="md:col-span-5 bg-white border border-gray-200 p-6 flex flex-col justify-between shadow-sm rounded-lg">
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs uppercase tracking-wider text-gray-400 block mb-1">Đơn vị chấp nhận</span>
                <h3 className="font-serif text-lg text-black font-medium">IMPERIAL Skin Care</h3>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-gray-400 block mb-1">Số tiền thanh toán</span>
                <p className="text-3xl font-serif text-primary font-bold text-black">{formatVND(order.total)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400 block mb-0.5">Mã đơn hàng</span>
                  <p className="font-mono font-medium text-gray-900">{order.code}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400 block mb-0.5">Khách hàng</span>
                  <p className="font-medium text-gray-900 truncate">{order.name}</p>
                </div>
              </div>

              <div className="bg-red-50 text-red-600/90 text-xs p-3 rounded border border-red-100 font-medium flex items-center justify-between">
                <span>Giao dịch hết hạn trong:</span>
                <span className="font-mono text-sm font-semibold">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 mt-6 text-xs text-gray-400 leading-relaxed">
              Mã giao dịch được mã hóa an toàn. Vui lòng không tải lại trang này trong khi thực hiện thanh toán.
            </div>
          </div>

          {/* QR Code and Actions Panel (Right) */}
          <div className="md:col-span-7 bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden flex flex-col">
            {/* Header styled depending on payment method */}
            {method === 'momo' ? (
              <div className="bg-[#A50064] text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white text-[#A50064] rounded-lg flex items-center justify-center font-bold text-[9px] tracking-tighter">
                    momo
                  </div>
                  <div>
                    <h4 className="font-medium text-base leading-tight">Ví điện tử MoMo</h4>
                    <p className="text-xs opacity-75">Quét mã QR để thanh toán đơn hàng</p>
                  </div>
                </div>
                <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded uppercase tracking-wider font-semibold">MoMo QR</span>
              </div>
            ) : (
              <div className="bg-[#005BAA] text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white text-[#005BAA] rounded-lg flex items-center justify-center font-bold text-[9px] tracking-tighter uppercase">
                    vnpay
                  </div>
                  <div>
                    <h4 className="font-medium text-base leading-tight font-serif">Cổng VNPAY-QR</h4>
                    <p className="text-xs opacity-75">Thanh toán qua cổng VNPAY</p>
                  </div>
                </div>
                <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded uppercase tracking-wider font-semibold">VNPAY-QR</span>
              </div>
            )}

            {/* QR Code Box */}
            <div className="p-8 flex-grow flex flex-col items-center justify-center text-center">
              {isProcessing ? (
                <div className="py-12 flex flex-col items-center gap-4">
                  <svg className="animate-spin h-10 w-10 text-primary text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="font-medium text-gray-700">Đang xác thực giao dịch thanh toán...</p>
                  <p className="text-xs text-gray-400">Vui lòng không đóng cửa sổ này</p>
                </div>
              ) : (
                <>
                  <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm mb-6">
                    {/* Simulated SVG QR Code */}
                    <svg width="180" height="180" viewBox="0 0 29 29" shapeRendering="crispEdges">
                      <path fill="#ffffff" d="M0,0h29v29h-29z" />
                      {method === 'momo' ? (
                        <>
                          <path fill="#a50064" d="M0,0h7v1h-7zm0,1h1v5h1v-5h1v5h1v-5h1v5h1v-5h1v7h-7zm22,0h7v1h-7zm0,1h1v5h1v-5h1v5h1v-5h1v5h1v-5h1v7h-7zM8,8h3v1h-3zm10,0h3v1h-3zM0,22h7v1h-7zm0,1h1v5h1v-5h1v5h1v-5h1v5h1v-5h1v7h-7zM8,18h1v3h-1zM2,2h3v3h-3zM24,2h3v3h-3zM2,24h3v3h-3z" />
                          <path fill="#a50064" d="M9,2h2v2h-2z M12,4h3v1h-3z M15,2h2v3h-2z M9,6h4v1h-4z M18,9h2v2h-2z M22,9h3v2h-3z M9,11h3v2h-3z M14,12h2v3h-2z M10,15h3v2h-3z M17,16h4v2h-4z M20,20h3v3h-3z M24,19h3v2h-3z M25,23h2v2h-2z" />
                        </>
                      ) : (
                        <>
                          <path fill="#005baa" d="M0,0h7v1h-7zm0,1h1v5h1v-5h1v5h1v-5h1v5h1v-5h1v7h-7zm22,0h7v1h-7zm0,1h1v5h1v-5h1v5h1v-5h1v5h1v-5h1v7h-7zM8,8h3v1h-3zm10,0h3v1h-3zM0,22h7v1h-7zm0,1h1v5h1v-5h1v5h1v-5h1v5h1v-5h1v7h-7zM8,18h1v3h-1zM2,2h3v3h-3zM24,2h3v3h-3zM2,24h3v3h-3z" />
                          <path fill="#005baa" d="M9,3h3v2h-3z M13,2h3v2h-3z M17,4h2v2h-2z M10,9h4v2h-4z M15,10h3v2h-3z M20,11h3v2h-3z M11,14h3v1h-3z M16,14h2v3h-2z M9,18h4v2h-4z M15,18h3v3h-3z M19,20h4v2h-4z M24,22h3v2h-3z" />
                        </>
                      )}
                    </svg>
                  </div>

                  <div className="max-w-md space-y-4">
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      {method === 'momo' ? (
                        <>Sử dụng tính năng quét mã QR trên ứng dụng <strong>MoMo</strong> để quét mã chuyển tiền tự động.</>
                      ) : (
                        <>Sử dụng tính năng <strong>QR Pay</strong> trên ứng dụng ngân hàng hoặc ví VNPAY của bạn để quét mã thanh toán.</>
                      )}
                    </p>
                    
                    <button
                      onClick={handlePaymentSuccess}
                      className={`w-full py-3.5 px-6 rounded-lg text-white font-semibold text-sm transition-all duration-300 shadow-md ${
                        method === 'momo' ? 'bg-[#A50064] hover:bg-[#860051]' : 'bg-[#005BAA] hover:bg-[#004A8A]'
                      }`}
                    >
                      Giả lập thanh toán thành công (Demo)
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        © 2026 IMPERIAL Skin Care. Demo Payment Gateways Integration. All rights reserved.
      </footer>
    </div>
  )
}
