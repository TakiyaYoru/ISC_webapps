import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUser, type Order } from '../context/UserContext'
import Reveal from '../components/Reveal'

export default function Account() {
  const { user, logout, orders, updateProfile } = useUser()
  const navigate = useNavigate()

  // Form states for profile editing
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/')
    } else {
      setName(user.name)
      setPhone(user.phone)
      setAddress(user.address)
    }
  }, [user, navigate])

  if (!user) return null

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(name, phone, address)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const formatVND = (num: number) => {
    return num.toLocaleString('vi-VN') + ' VNĐ'
  }

  const formatDate = (isoString: string) => {
    const d = new Date(isoString)
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
  }

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/50 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Đang xử lý
          </span>
        )
      case 'shipping':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/50 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Đang giao hàng
          </span>
        )
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200/50 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Đã giao nhận
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-200/50 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Đã hủy đơn
          </span>
        )
      default:
        return null
    }
  }

  const getMethodLabel = (m: Order['paymentMethod']) => {
    if (m === 'momo') return 'Ví MoMo'
    if (m === 'vnpay') return 'Cổng VNPAY'
    return 'Giao hàng nhận tiền (COD)'
  }

  // Calculate points progress
  const pointsMax = user.tier === 'Imperial Silver Member' ? 1000 : 5000
  const pointsMin = user.tier === 'Imperial Silver Member' ? 0 : 1000
  const progressPercent = Math.min(100, Math.max(0, ((user.points - pointsMin) / (pointsMax - pointsMin)) * 100))

  return (
    <div className="min-h-screen bg-background text-on-background py-16 md:py-24 relative overflow-hidden">
      {/* Background radial soft light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 40% at 85% 15%, rgba(200, 169, 106, 0.03), transparent 60%), radial-gradient(ellipse 50% 50% at 10% 90%, rgba(15, 26, 36, 0.01), transparent 50%)',
        }}
      />

      <div className="container-wide relative">
        {/* Profile Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/30 pb-8 mb-12">
            <div>
              <span className="label-caps text-secondary mb-2 tracking-widest block">TÀI KHOẢN HỘI VIÊN</span>
              <h1 className="font-serif text-3xl md:text-4xl text-primary font-light">
                Chào mừng trở lại, {user.name}
              </h1>
              <p className="font-body-md text-sm text-on-surface-variant/70 mt-1">
                Quản lý thông tin, tích lũy điểm thưởng và theo dõi đơn hàng của bạn.
              </p>
            </div>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="px-6 py-2.5 border border-red-200/60 text-red-600/80 hover:text-white hover:bg-red-600/90 transition-all duration-300 text-xs uppercase tracking-widest font-semibold font-mono flex items-center justify-center gap-1.5 self-start md:self-auto"
            >
              Đăng xuất
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Loyalty and Profile */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {/* Loyalty Points Card */}
            <Reveal delay={0.1}>
              <div className="bg-surface-container-low border border-outline-variant/35 p-6 md:p-8 relative overflow-hidden group">
                <span className="text-[100px] text-secondary/[0.03] font-serif absolute -right-6 -bottom-8 select-none pointer-events-none group-hover:scale-105 transition-transform duration-500">
                  ✦
                </span>
                
                <span className="label-caps text-secondary text-xs tracking-wider font-semibold block mb-4">THẺ THÀNH VIÊN VIP</span>
                
                <h3 className="font-serif text-xl text-primary font-medium mb-1">{user.tier}</h3>
                <span className="text-xs text-on-surface-variant/60 font-mono">ID Hội viên: #IMPERIAL-{user.phone.slice(-4)}</span>
                
                <div className="my-8">
                  <span className="text-xs text-on-surface-variant/70 uppercase tracking-wider block mb-1">Điểm tích lũy hiện có</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif text-primary font-bold">{user.points.toLocaleString()}</span>
                    <span className="text-sm font-semibold text-secondary uppercase">Điểm</span>
                  </div>
                </div>

                {/* Progress bar to next tier */}
                {user.tier !== 'Imperial Royal Member' && (
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-[11px] font-mono text-on-surface-variant/80">
                      <span>Tiến trình nâng hạng</span>
                      <span className="font-semibold">{user.points} / {pointsMax} Điểm</span>
                    </div>
                    <div className="w-full h-1 bg-outline-variant/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary transition-all duration-1000 ease-out"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-on-surface-variant/60 italic leading-relaxed">
                      * Tích lũy thêm {pointsMax - user.points} điểm để nâng cấp hạng thẻ tiếp theo ({user.tier === 'Imperial Silver Member' ? 'Hạng Vàng' : 'Hạng Hoàng Gia'}).
                    </p>
                  </div>
                )}
                
                <hr className="border-outline-variant/20 my-6" />

                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold text-primary uppercase tracking-widest">Đặc quyền hạng thẻ của bạn:</h4>
                  <ul className="text-xs text-on-surface-variant/85 space-y-2 list-disc pl-4 leading-relaxed">
                    <li>Miễn phí vận chuyển toàn quốc cho tất cả đơn hàng</li>
                    <li>{user.tier === 'Imperial Silver Member' ? 'Tích lũy 1% giá trị đơn hàng quy đổi' : (user.tier === 'Imperial Gold Member' ? 'Tích lũy 2% giá trị đơn hàng và giảm giá 5% trực tiếp' : 'Tích lũy 3% giá trị đơn hàng, giảm giá 10% trực tiếp và tặng quà sinh nhật VIP')}</li>
                    <li>Ưu tiên trải nghiệm tư vấn da liễu 1:1 cùng chuyên viên hoàng gia</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Profile Information Edit */}
            <Reveal delay={0.2}>
              <div className="bg-surface-container-low border border-outline-variant/35 p-6 md:p-8">
                <h3 className="font-serif text-lg text-primary mb-6 font-semibold border-b border-outline-variant/30 pb-3">
                  Thông tin cá nhân
                </h3>
                <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="label-caps text-[10px] text-primary font-semibold">Họ và Tên</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 px-4 border border-outline-variant bg-transparent focus:outline-none focus:border-primary text-body-md"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="label-caps text-[10px] text-primary font-semibold">Số điện thoại</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-4 border border-outline-variant bg-transparent focus:outline-none focus:border-primary text-body-md"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="label-caps text-[10px] text-primary font-semibold">Địa chỉ giao hàng mặc định</label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-4 border border-outline-variant bg-transparent focus:outline-none focus:border-primary text-body-md resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-primary text-on-primary h-12 text-label-caps uppercase tracking-widest font-medium transition-colors hover:bg-secondary duration-300"
                    >
                      Cập nhật hồ sơ
                    </button>
                  </div>
                  {isSaved && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-green-600 font-semibold text-center mt-2 flex items-center justify-center gap-1.5"
                    >
                      <span>✓ Cập nhật hồ sơ thành công!</span>
                    </motion.div>
                  )}
                </form>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Order History */}
          <div className="lg:col-span-8">
            <Reveal delay={0.15}>
              <div className="bg-surface-container-low border border-outline-variant/35 p-6 md:p-8">
                <h3 className="font-serif text-lg text-primary mb-6 font-semibold border-b border-outline-variant/30 pb-3">
                  Lịch sử đặt hàng ({orders.length})
                </h3>

                {orders.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center">
                    <span className="text-primary/20 text-4xl mb-4 font-light">✦</span>
                    <p className="font-serif text-base text-primary/80 mb-1">Chưa có đơn hàng nào</p>
                    <p className="text-xs text-on-surface-variant/70 mb-6 max-w-[280px]">
                      Bạn chưa thực hiện giao dịch mua hàng nào bằng tài khoản này.
                    </p>
                    <button
                      onClick={() => navigate('/collection')}
                      className="bg-primary text-on-primary px-6 py-3 text-xs uppercase tracking-widest font-medium transition-colors hover:bg-secondary"
                    >
                      Khám phá sản phẩm ngay
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const isExpanded = expandedOrder === order.code
                      return (
                        <div
                          key={order.code}
                          className={`border transition-all duration-300 ${isExpanded ? 'border-primary' : 'border-outline-variant/30 hover:border-primary/40 bg-surface-container-lowest/[0.4]'}`}
                        >
                          {/* Order Card Header Summary */}
                          <div
                            onClick={() => setExpandedOrder(isExpanded ? null : order.code)}
                            className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer select-none"
                          >
                            <div className="space-y-1">
                              <span className="font-mono text-xs font-semibold text-primary block">{order.code}</span>
                              <span className="text-[11px] font-mono text-on-surface-variant/65 block">{formatDate(order.date)}</span>
                            </div>

                            <div className="flex items-center gap-6">
                              <div className="text-right hidden sm:block">
                                <span className="text-xs text-on-surface-variant/70 block mb-0.5">Tổng thanh toán</span>
                                <span className="font-serif text-[15px] font-bold text-primary">{formatVND(order.total)}</span>
                              </div>

                              <div className="flex items-center gap-3">
                                {getStatusBadge(order.status)}
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  className={`text-primary/60 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                >
                                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Order Details */}
                          {isExpanded && (
                            <div className="border-t border-outline-variant/30 p-5 bg-surface-container-lowest">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2 text-xs">
                                  <h4 className="font-semibold text-primary uppercase tracking-wider mb-2">Thông tin người nhận</h4>
                                  <p className="text-on-surface-variant"><strong className="text-primary font-medium">Họ tên:</strong> {order.clientName}</p>
                                  <p className="text-on-surface-variant"><strong className="text-primary font-medium">Số điện thoại:</strong> {order.clientPhone}</p>
                                  <p className="text-on-surface-variant leading-relaxed"><strong className="text-primary font-medium">Hình thức:</strong> {getMethodLabel(order.paymentMethod)}</p>
                                </div>
                                <div className="space-y-2 text-xs md:text-right md:justify-self-end">
                                  <h4 className="font-semibold text-primary uppercase tracking-wider mb-2 md:text-right">Tóm tắt giao dịch</h4>
                                  <p className="text-on-surface-variant"><strong className="text-primary font-medium">Giá trị đơn hàng:</strong> {formatVND(order.total)}</p>
                                  <p className="text-on-surface-variant"><strong className="text-primary font-medium">Phí vận chuyển:</strong> Miễn phí</p>
                                  <p className="text-on-surface-variant text-[13px] font-bold mt-1"><strong className="text-primary font-medium">Tổng số tiền:</strong> {formatVND(order.total)}</p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <h4 className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">Sản phẩm trong đơn</h4>
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex gap-4 items-center bg-surface-container-low/45 p-3 border border-outline-variant/20 rounded">
                                    <div className="w-12 h-12 bg-white border border-outline-variant/30 flex items-center justify-center p-1 overflow-hidden flex-shrink-0">
                                      {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                      ) : (
                                        <span className="text-primary/30 text-lg font-light">✦</span>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h5 className="font-body-md text-xs text-primary font-semibold truncate leading-tight mb-0.5">{item.name}</h5>
                                      <span className="text-[10px] text-on-surface-variant/75 block">{item.price} × {item.quantity}</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="font-mono text-xs font-semibold text-primary">
                                        {formatVND(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
