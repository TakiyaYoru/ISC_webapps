import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser, type Order } from '../context/UserContext'

interface AdminProduct {
  id: string
  slug: string
  name: string
  collection: string
  tagline: string
  price: number
  volume: string
  image: string
}

interface Inquiry {
  id: string
  name: string
  email: string
  message: string
  date: string
  status: 'new' | 'resolved'
}

const REAL_PRODUCTS: AdminProduct[] = [
  {
    id: 'p01',
    slug: 'zayin-rare-elements-vital-facial-essence',
    name: 'Zayin Rare Elements Vital Facial Essence',
    collection: 'Le Laffé',
    tagline: 'Tinh chất phục hồi đa tầng',
    price: 7400000,
    volume: '50ml',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Zayin/Zayin.png'
  },
  {
    id: 'p02',
    slug: 'chet-energy-restoration-facial-treatment',
    name: 'Chet Energy Restoration Facial Treatment',
    collection: 'Le Laffé',
    tagline: 'Kem dưỡng phục hồi năng lượng',
    price: 7000000,
    volume: '50ml',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Chet/Chet.png'
  },
  {
    id: 'p03',
    slug: 'smtrs-100-de-secret',
    name: 'SMTRs-100 De Secret',
    collection: 'Le Laffé',
    tagline: 'Nghi thức khai mở làn da',
    price: 6300000,
    volume: '10ml',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/SMTRs100/SMTRs-100.png'
  },
  {
    id: 'p04',
    slug: '500-000-stem-media-skin-booster',
    name: '500,000 Stem Media Skin Booster',
    collection: 'Le Laffé',
    tagline: 'Đỉnh cao của khoa học tế bào',
    price: 11200000,
    volume: '30ml',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/500,000%20Stem/500,000%20Stem.png'
  },
  {
    id: 'p05',
    slug: 'alpeh-mito-viv-first-treatment-essence',
    name: 'Alpeh / Mito-viv First Treatment Essence',
    collection: 'Le Laffé',
    tagline: 'Tinh chất hoạt hóa ty thể',
    price: 6700000,
    volume: '100ml',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Alpeh/Aleph.png'
  },
  {
    id: 'p06',
    slug: 'comprehensive-skincare-solution-quintet',
    name: 'Comprehensive Skincare Solution Quintet',
    collection: 'Le Laffé',
    tagline: 'Bộ giải pháp chăm sóc da toàn diện',
    price: 5000000,
    volume: 'Gift Set',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Comprehensive/quintet_001.jpg'
  },
  {
    id: 'p07',
    slug: 'platinum-stemcell-reverse-aging-solution',
    name: 'Platinum StemCell Reverse-Aging Solution',
    collection: 'Le Laffé',
    tagline: 'Bộ đảo ngược lão hóa tế bào',
    price: 31000000,
    volume: 'Set full size',
    image: 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Platinum%20StemCell%20Full/Full.png'
  }
]

const DEFAULT_MOCK_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-481902',
    name: 'Lê Thị Khánh An',
    email: 'khanhan.le@gmail.com',
    message: 'Tôi muốn được tư vấn liệu trình trẻ hóa da chuyên sâu cho phụ nữ ngoài 40 tuổi. Da tôi bắt đầu có nếp nhăn li ti ở vùng mắt.',
    date: '2026-06-12T08:30:00.000Z',
    status: 'new'
  },
  {
    id: 'INQ-309184',
    name: 'Trần Minh Hoàng',
    email: 'hoang.tm@gmail.com',
    message: 'Sản phẩm Celestial Serum ban đêm dùng chung với BHA của hãng khác được không và tần suất thế nào?',
    date: '2026-06-14T15:22:00.000Z',
    status: 'new'
  },
  {
    id: 'INQ-289104',
    name: 'Phạm Thanh Thảo',
    email: 'thaopham@outlook.com',
    message: 'Giao hàng nội thành Quận 3, TP.HCM thì mất bao lâu nhận được hàng vậy shop? Có được kiểm tra hàng trước khi thanh toán không?',
    date: '2026-06-14T09:15:00.000Z',
    status: 'resolved'
  }
]

export default function AdminDashboard() {
  const { orders, updateOrderStatus } = useUser()
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'inquiries'>('overview')
  
  // Security Passcode Authorization Gate
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return sessionStorage.getItem('imperial_admin_authorized') === 'true'
  })
  const [passcode, setPasscode] = useState('')
  const [passcodeError, setPasscodeError] = useState(false)

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === '123456' || passcode.toUpperCase() === 'IMPERIAL2026') {
      setIsAuthorized(true)
      sessionStorage.setItem('imperial_admin_authorized', 'true')
      setPasscodeError(false)
    } else {
      setPasscodeError(true)
    }
  }

  // State for Inquiries
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem('imperial_skincare_inquiries')
      return saved ? JSON.parse(saved) : DEFAULT_MOCK_INQUIRIES
    } catch {
      return DEFAULT_MOCK_INQUIRIES
    }
  })

  // Sync inquiries state to localStorage
  useEffect(() => {
    localStorage.setItem('imperial_skincare_inquiries', JSON.stringify(inquiries))
  }, [inquiries])

  // State for Products (loaded with actual Le Laffé items)
  const [productsList, setProductsList] = useState<AdminProduct[]>(REAL_PRODUCTS)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [editPriceVal, setEditPriceVal] = useState<number>(0)

  // Filters state
  const [orderFilter, setOrderFilter] = useState<string>('all')
  const [orderSearch, setOrderSearch] = useState<string>('')
  const [productSearch, setProductSearch] = useState<string>('')
  const [inquiryFilter, setInquiryFilter] = useState<string>('all')

  // Toast Notifications
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' }[]>([])

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }

  // Derived metrics
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status === 'delivered')
      .reduce((sum, o) => sum + o.total, 0)
  }, [orders])

  const pendingOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status === 'processing' || o.status === 'shipping').length
  }, [orders])

  const uniqueCustomersCount = useMemo(() => {
    const clients = new Set<string>()
    orders.forEach((o) => {
      if (o.clientPhone) clients.add(o.clientPhone)
    })
    return clients.size || 1
  }, [orders])

  const newInquiriesCount = useMemo(() => {
    return inquiries.filter((i) => i.status === 'new').length
  }, [inquiries])

  // Handlers
  const handleStatusChange = (code: string, newStatus: Order['status']) => {
    updateOrderStatus(code, newStatus)
    addToast(`Cập nhật trạng thái đơn ${code} thành "${
      newStatus === 'processing' ? 'Chờ xử lý' :
      newStatus === 'shipping' ? 'Đang giao hàng' :
      newStatus === 'delivered' ? 'Đã giao nhận' : 'Đã hủy đơn'
    }"`, 'success')
  }

  const handleResolveInquiry = (id: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'resolved' as const } : i))
    )
    addToast(`Yêu cầu ${id} đã được đánh dấu giải quyết`, 'info')
  }

  const handleToggleProductStock = (id: string) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isOut = p.volume.includes('Hết hàng')
          const updatedVolume = isOut ? p.volume.replace(' (Hết hàng)', '') : `${p.volume} (Hết hàng)`
          addToast(`Thay đổi trạng thái kho của sản phẩm: ${p.name}`, 'info')
          return { ...p, volume: updatedVolume }
        }
        return p
      })
    )
  }

  const handleStartEditProduct = (p: AdminProduct) => {
    setEditingProductId(p.id)
    setEditPriceVal(p.price)
  }

  const handleSaveProductPrice = (id: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: editPriceVal } : p))
    )
    setEditingProductId(null)
    addToast('Đã lưu thay đổi giá sản phẩm thành công', 'success')
  }

  // Format currency in VNĐ (same as customer store)
  const formatVND = (num: number) => {
    return num.toLocaleString('vi-VN') + ' VNĐ'
  }

  // Filter lists
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch = 
        o.code.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.clientName.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.clientPhone.includes(orderSearch)
      
      const matchesFilter = orderFilter === 'all' || o.status === orderFilter
      return matchesSearch && matchesFilter
    })
  }, [orders, orderFilter, orderSearch])

  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => 
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.tagline.toLowerCase().includes(productSearch.toLowerCase())
    )
  }, [productsList, productSearch])

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((i) => inquiryFilter === 'all' || i.status === inquiryFilter)
  }, [inquiries, inquiryFilter])

  // Mock revenue data for weekly sales charts
  const chartPoints = [
    { label: 'Thứ 2', value: 12000000 },
    { label: 'Thứ 3', value: 19000000 },
    { label: 'Thứ 4', value: 15000000 },
    { label: 'Thứ 5', value: 34000000 },
    { label: 'Thứ 6', value: 28000000 },
    { label: 'Thứ 7', value: 48000000 },
    { label: 'Chủ Nhật', value: totalRevenue > 0 ? totalRevenue : 55000000 }
  ]
  const maxChartVal = Math.max(...chartPoints.map(p => p.value))

  if (!isAuthorized) {
    return (
      <div className="bg-background text-[#1c1c18] min-h-screen flex items-center justify-center font-sans antialiased px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-outline-variant/60 rounded-xl p-8 max-w-md w-full shadow-ambient text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-secondary flex items-center justify-center bg-secondary/5 text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-primary font-bold mb-2">Quyền truy cập hạn chế</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
            Mục này yêu cầu mã khóa bảo mật của Ban Quản Trị hệ thống IMPERIAL.
          </p>

          <form onSubmit={handleVerifyPasscode} className="space-y-4">
            <div>
              <input 
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value)
                  setPasscodeError(false)
                }}
                placeholder="Nhập mã bảo mật..."
                className={`w-full bg-white border px-4 py-3.5 text-sm rounded text-slate-800 placeholder-slate-400 text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-secondary/20 ${
                  passcodeError ? 'border-rose-500 focus:border-rose-500' : 'border-outline-variant focus:border-secondary'
                }`}
                autoFocus
              />
              {passcodeError && (
                <p className="text-xs text-rose-600 mt-2 font-semibold">Mã bảo mật không đúng. Vui lòng nhập lại.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-[#C8A96A] text-white hover:text-white py-3.5 rounded-md font-bold uppercase tracking-widest text-xs transition-colors"
            >
              Mở khóa hệ thống
            </button>

            <Link to="/" className="inline-block text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary mt-4 transition-colors font-medium">
              Về trang chủ
            </Link>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-background text-[#1c1c18] min-h-screen font-sans antialiased pb-12">
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50 }}
              className={`p-4 rounded-lg border shadow-ambient flex items-center justify-between gap-3 bg-white ${
                toast.type === 'success' 
                  ? 'border-emerald-200 text-emerald-800' 
                  : 'border-secondary/30 text-[#C8A96A]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-secondary'}`} />
                <span className="text-xs font-semibold uppercase tracking-wider">{toast.message}</span>
              </div>
              <button 
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-xs hover:text-black opacity-60 hover:opacity-100 p-1"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Top Luxury Navbar */}
      <nav className="border-b border-outline-variant/30 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <span className="font-serif text-2xl tracking-[0.15em] text-[#0F1A24] font-bold">IMPERIAL</span>
              <span className="text-[10px] tracking-[0.2em] uppercase bg-secondary/10 text-secondary px-2.5 py-0.5 rounded border border-secondary/20 font-semibold">
                Quản trị hệ thống
              </span>
            </Link>

            {/* Tabs for desktop */}
            <div className="hidden md:flex items-center gap-2 text-sm text-on-surface-variant">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-md transition-all ${activeTab === 'overview' ? 'text-primary bg-surface-container font-semibold' : 'hover:text-primary hover:bg-surface-container-low'}`}
              >
                Tổng quan
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-md transition-all ${activeTab === 'orders' ? 'text-primary bg-surface-container font-semibold' : 'hover:text-primary hover:bg-surface-container-low'}`}
              >
                Đơn hàng
              </button>
              <button 
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-md transition-all ${activeTab === 'products' ? 'text-primary bg-surface-container font-semibold' : 'hover:text-primary hover:bg-surface-container-low'}`}
              >
                Sản phẩm
              </button>
              <button 
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-2 rounded-md transition-all flex items-center gap-1.5 ${activeTab === 'inquiries' ? 'text-primary bg-surface-container font-semibold' : 'hover:text-primary hover:bg-surface-container-low'}`}
              >
                Yêu cầu {newInquiriesCount > 0 && <span className="bg-secondary text-white font-bold px-1.5 py-0.2 rounded-full text-[9px] ml-1">{newInquiriesCount}</span>}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs tracking-widest uppercase text-on-surface-variant hover:text-secondary flex items-center gap-1.5 transition-colors font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Quay lại Shop
            </Link>

            <div className="h-6 w-px bg-outline-variant/40" />

            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-surface-container-high border border-secondary/30 flex items-center justify-center text-xs font-bold text-secondary">
                AD
              </div>
              <span className="hidden sm:inline text-xs font-semibold tracking-wider text-primary">ADMINISTRATOR</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Tab Controls for Mobile */}
        <div className="flex md:hidden bg-white border border-outline-variant/35 rounded-lg p-1.5 mb-6 text-sm text-on-surface-variant">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`flex-1 py-2 rounded text-center font-medium ${activeTab === 'overview' ? 'bg-surface-container text-primary font-semibold' : ''}`}
          >
            Tổng quan
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`flex-1 py-2 rounded text-center font-medium ${activeTab === 'orders' ? 'bg-surface-container text-primary font-semibold' : ''}`}
          >
            Đơn hàng
          </button>
          <button 
            onClick={() => setActiveTab('products')} 
            className={`flex-1 py-2 rounded text-center font-medium ${activeTab === 'products' ? 'bg-surface-container text-primary font-semibold' : ''}`}
          >
            Kho hàng
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')} 
            className={`flex-1 py-2 rounded text-center font-medium ${activeTab === 'inquiries' ? 'bg-surface-container text-primary font-semibold' : ''}`}
          >
            Liên hệ
          </button>
        </div>

        {/* Overview Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10">
          
          {/* Card 1: Revenue */}
          <div className="bg-white border border-outline-variant/40 rounded-xl p-5 md:p-6 hover:border-secondary/50 hover:shadow-ambient-sm transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-secondary font-semibold">Doanh thu hoàn tất</span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-primary font-bold mb-1">
              {formatVND(totalRevenue)}
            </h3>
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
              <span className="text-emerald-600 font-semibold">↑ 18.5%</span> so với tuần trước
            </p>
          </div>

          {/* Card 2: Orders */}
          <div className="bg-white border border-outline-variant/40 rounded-xl p-5 md:p-6 hover:border-secondary/50 hover:shadow-ambient-sm transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-secondary font-semibold">Số lượng đơn hàng</span>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            </div>
            <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-primary font-bold mb-1">
              {orders.length}
            </h3>
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
              <span className="text-primary font-semibold">{pendingOrdersCount} đơn</span> chờ xử lý & giao
            </p>
          </div>

          {/* Card 3: Customers */}
          <div className="bg-white border border-outline-variant/40 rounded-xl p-5 md:p-6 hover:border-secondary/50 hover:shadow-ambient-sm transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-secondary font-semibold">Khách hàng</span>
              <div className="p-2 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
            </div>
            <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-primary font-bold mb-1">
              {uniqueCustomersCount}
            </h3>
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
              VIP membership tiers synced
            </p>
          </div>

          {/* Card 4: Inquiries */}
          <div className="bg-white border border-outline-variant/40 rounded-xl p-5 md:p-6 hover:border-secondary/50 hover:shadow-ambient-sm transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-secondary font-semibold">Yêu cầu hỗ trợ</span>
              <div className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
            </div>
            <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-primary font-bold mb-1">
              {inquiries.length}
            </h3>
            <p className="text-xs text-[#C8A96A] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> {newInquiriesCount} yêu cầu chưa xử lý
            </p>
          </div>
        </div>

        {/* Tab Contents */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Charts & Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Sales Chart Card */}
              <div className="bg-white border border-outline-variant/35 rounded-xl p-6 lg:col-span-2 shadow-sm">
                <h3 className="font-serif text-lg text-primary mb-6 flex items-center gap-2 font-bold">
                  <span className="h-2.5 w-2.5 rounded-full bg-secondary" /> Doanh thu theo tuần
                </h3>
                
                {/* SVG Light theme Chart */}
                <div className="h-64 flex flex-col justify-between pt-4">
                  <div className="flex-1 flex items-end justify-between gap-4 px-2 relative">
                    {/* Horizontal background lines */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-outline-variant/20" />
                    <div className="absolute inset-x-0 bottom-[25%] h-px bg-outline-variant/20" />
                    <div className="absolute inset-x-0 bottom-[50%] h-px bg-outline-variant/20" />
                    <div className="absolute inset-x-0 bottom-[75%] h-px bg-outline-variant/20" />
                    <div className="absolute inset-x-0 top-0 h-px bg-outline-variant/10" />

                    {chartPoints.map((pt, idx) => {
                      const percent = (pt.value / maxChartVal) * 100
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center group z-10">
                          {/* Value Tooltip */}
                          <div className="absolute bottom-[90%] opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-[10px] text-white py-1 px-2.5 rounded pointer-events-none mb-1 shadow-md font-mono">
                            {formatVND(pt.value)}
                          </div>
                          
                          {/* Bar */}
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${percent * 0.8}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="w-full sm:w-10 rounded-t bg-gradient-to-t from-surface-container via-secondary/30 to-secondary border-t-2 border-secondary hover:to-[#0D1C27] hover:via-secondary/50 transition-all cursor-pointer relative"
                          >
                            <div className="absolute inset-x-0 top-0 h-0.5 bg-white/40" />
                          </motion.div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Labels Row */}
                  <div className="flex justify-between mt-4 px-2 border-t border-outline-variant/30 pt-3">
                    {chartPoints.map((pt, idx) => (
                      <span key={idx} className="flex-1 text-center text-xs tracking-wider text-on-surface-variant font-medium">{pt.label}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status breakdown Card */}
              <div className="bg-white border border-outline-variant/35 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="font-serif text-lg text-primary mb-6 flex items-center gap-2 font-bold">
                    <span className="h-2.5 w-2.5 rounded-full bg-secondary" /> Phân loại đơn hàng
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Chờ xử lý', count: orders.filter(o => o.status === 'processing').length, color: 'bg-amber-500' },
                      { label: 'Đang giao hàng', count: orders.filter(o => o.status === 'shipping').length, color: 'bg-sky-500' },
                      { label: 'Đã hoàn tất', count: orders.filter(o => o.status === 'delivered').length, color: 'bg-emerald-500' },
                      { label: 'Đã hủy', count: orders.filter(o => o.status === 'cancelled').length, color: 'bg-rose-500' }
                    ].map((item, idx) => {
                      const pct = orders.length > 0 ? (item.count / orders.length) * 100 : 0
                      return (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-primary">{item.label}</span>
                            <span className="text-on-surface-variant font-mono">{item.count} ({pct.toFixed(0)}%)</span>
                          </div>
                          <div className="h-2.5 w-full rounded bg-surface-container overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 1, delay: idx * 0.1 }}
                              className={`h-full ${item.color}`}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="border-t border-outline-variant/30 pt-4 mt-6">
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="w-full text-center text-xs tracking-widest uppercase text-secondary hover:text-white py-3 bg-secondary/5 rounded-md hover:bg-secondary border border-secondary/20 transition-all font-semibold"
                  >
                    Xem chi tiết danh sách đơn hàng
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Orders Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Recent Orders List (Left) */}
              <div className="bg-white border border-outline-variant/35 rounded-xl p-6 lg:col-span-2 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-lg text-primary flex items-center gap-2 font-bold">
                    <span className="h-2.5 w-2.5 rounded-full bg-secondary" /> Đơn hàng gần đây
                  </h3>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors font-semibold"
                  >
                    Xem tất cả
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/30 text-[11px] uppercase tracking-wider text-on-surface-variant">
                        <th className="pb-3 font-semibold">Mã đơn</th>
                        <th className="pb-3 font-semibold">Khách hàng</th>
                        <th className="pb-3 font-semibold">Ngày</th>
                        <th className="pb-3 font-semibold">Tổng cộng</th>
                        <th className="pb-3 font-semibold">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20 text-sm">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.code} className="hover:bg-surface-container-low/50 transition-colors">
                          <td className="py-4 font-semibold text-slate-800 font-mono text-xs">{order.code}</td>
                          <td className="py-4 text-slate-800 font-medium">{order.clientName}</td>
                          <td className="py-4 text-on-surface-variant text-xs font-mono">
                            {new Date(order.date).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="py-4 font-semibold text-[#C8A96A]">{formatVND(order.total)}</td>
                          <td className="py-4">
                            <span className={`inline-block text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded border ${
                              order.status === 'processing' 
                                ? 'bg-amber-50 border-amber-200 text-amber-800' 
                                : order.status === 'shipping'
                                ? 'bg-sky-50 border-sky-200 text-sky-800'
                                : order.status === 'delivered'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                : 'bg-rose-50 border-rose-200 text-rose-800'
                            }`}>
                              {order.status === 'processing' ? 'Chờ xử lý' :
                               order.status === 'shipping' ? 'Đang giao' :
                               order.status === 'delivered' ? 'Đã giao nhận' : 'Đã hủy'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Active Contact Leads (Right) */}
              <div className="bg-white border border-outline-variant/35 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-lg text-primary flex items-center gap-2 font-bold">
                      <span className="h-2.5 w-2.5 rounded-full bg-secondary" /> Ý kiến từ khách hàng
                    </h3>
                    <span className="bg-rose-500 text-white font-bold px-2.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
                      {newInquiriesCount} Mới
                    </span>
                  </div>

                  <div className="space-y-4">
                    {inquiries.filter(i => i.status === 'new').slice(0, 3).map((inq) => (
                      <div 
                        key={inq.id} 
                        className="p-3.5 rounded-lg border border-outline-variant/30 bg-surface-container-lowest hover:border-secondary/50 transition-all cursor-pointer group shadow-sm"
                        onClick={() => {
                          setActiveTab('inquiries')
                          setInquiryFilter('new')
                        }}
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="text-xs font-bold text-primary group-hover:text-secondary transition-colors">{inq.name}</span>
                          <span className="text-[10px] text-on-surface-variant font-mono">{new Date(inq.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-2 italic leading-relaxed">
                          "{inq.message}"
                        </p>
                      </div>
                    ))}

                    {inquiries.filter(i => i.status === 'new').length === 0 && (
                      <div className="text-center py-10 text-xs text-on-surface-variant italic">
                        Không có yêu cầu liên hệ mới nào chưa xử lý.
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-outline-variant/30 pt-4 mt-6">
                  <button 
                    onClick={() => setActiveTab('inquiries')}
                    className="w-full text-center text-xs tracking-widest uppercase text-secondary hover:text-white py-3 bg-secondary/5 rounded-md hover:bg-secondary border border-secondary/20 transition-all font-semibold"
                  >
                    Xem thư hỗ trợ khách hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-outline-variant/35 rounded-xl p-6 shadow-sm animate-fade-in">
            {/* Header + Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="font-serif text-2xl text-primary font-bold mb-1">Quản lý Đơn hàng</h2>
                <p className="text-xs text-on-surface-variant">Theo dõi quá trình vận chuyển và cập nhật trạng thái hóa đơn khách mua hàng.</p>
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <input 
                  type="text" 
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Tìm theo mã đơn, khách hàng..."
                  className="bg-white border border-outline-variant/60 px-4 py-2.5 text-xs rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 flex-1 md:w-64"
                />

                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="bg-white border border-outline-variant/60 px-3 py-2.5 text-xs rounded text-slate-700 focus:outline-none focus:border-secondary"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="processing">Chờ xử lý</option>
                  <option value="shipping">Đang giao hàng</option>
                  <option value="delivered">Đã giao nhận</option>
                  <option value="cancelled">Đã hủy đơn</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-[11px] uppercase tracking-wider text-on-surface-variant">
                    <th className="pb-3 font-semibold w-32">Mã đơn</th>
                    <th className="pb-3 font-semibold">Khách hàng</th>
                    <th className="pb-3 font-semibold">Chi tiết sản phẩm</th>
                    <th className="pb-3 font-semibold">Ngày mua</th>
                    <th className="pb-3 font-semibold">Thanh toán</th>
                    <th className="pb-3 font-semibold text-right">Tổng đơn</th>
                    <th className="pb-3 font-semibold text-center w-48">Trạng thái vận đơn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-sm">
                  {filteredOrders.map((order) => (
                    <tr key={order.code} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="py-4 font-mono text-xs font-bold text-primary select-all">{order.code}</td>
                      <td className="py-4">
                        <div className="font-bold text-primary">{order.clientName}</div>
                        <div className="text-xs text-on-surface-variant font-mono mt-0.5">{order.clientPhone}</div>
                      </td>
                      <td className="py-4 text-xs text-[#1c1c18]">
                        <div className="max-w-xs space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between gap-3">
                              <span className="truncate font-medium">{item.name}</span>
                              <span className="text-secondary font-bold whitespace-nowrap">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 text-xs text-on-surface-variant font-mono">
                        {new Date(order.date).toLocaleString('vi-VN')}
                      </td>
                      <td className="py-4">
                        <span className="text-xs uppercase font-mono tracking-wider font-semibold text-on-surface-variant">
                          {order.paymentMethod === 'cod' ? '💵 COD' : 
                           order.paymentMethod === 'momo' ? '📱 MoMo' : '💳 VNPAY'}
                        </span>
                      </td>
                      <td className="py-4 text-right font-bold text-[#C8A96A] pr-3 font-mono">
                        {formatVND(order.total)}
                      </td>
                      <td className="py-4 text-center">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.code, e.target.value as Order['status'])}
                          className={`text-xs px-2.5 py-1.5 rounded border bg-white font-semibold focus:outline-none focus:ring-1 focus:ring-secondary ${
                            order.status === 'processing' 
                              ? 'border-amber-200 text-amber-700 bg-amber-50' 
                              : order.status === 'shipping'
                              ? 'border-sky-200 text-sky-700 bg-sky-50'
                              : order.status === 'delivered'
                              ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                              : 'border-rose-200 text-rose-700 bg-rose-50'
                          }`}
                        >
                          <option value="processing">Chờ xử lý</option>
                          <option value="shipping">Đang giao hàng</option>
                          <option value="delivered">Đã giao nhận</option>
                          <option value="cancelled">Đã hủy đơn</option>
                        </select>
                      </td>
                    </tr>
                  ))}

                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-on-surface-variant italic text-sm">
                        Không tìm thấy đơn hàng nào phù hợp với điều kiện tìm kiếm.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white border border-outline-variant/35 rounded-xl p-6 shadow-sm animate-fade-in">
            {/* Header + Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="font-serif text-2xl text-primary font-bold mb-1">Quản lý Sản phẩm</h2>
                <p className="text-xs text-on-surface-variant">Cập nhật giá cả niêm yết và trạng thái kho hàng thực tế của các sản phẩm Le Laffé.</p>
              </div>

              <div className="w-full md:w-auto">
                <input 
                  type="text" 
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Tìm sản phẩm theo tên, loại..."
                  className="bg-white border border-outline-variant/60 px-4 py-2.5 text-xs rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 w-full md:w-64"
                />
              </div>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => {
                const isOutOfStock = product.volume.includes('Hết hàng')
                const displayVolume = product.volume.replace(' (Hết hàng)', '')

                return (
                  <div 
                    key={product.id} 
                    className={`border rounded-xl p-5 flex gap-5 transition-all duration-300 ${
                      isOutOfStock ? 'bg-surface-container-low/30 border-outline-variant/40 opacity-70' : 'bg-white border-outline-variant/40 hover:border-secondary/40 hover:shadow-ambient-sm'
                    }`}
                  >
                    <div className="w-24 h-24 bg-surface-container rounded-lg border border-outline-variant/20 flex items-center justify-center p-1.5 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-md text-primary font-bold leading-tight line-clamp-1">{product.name}</h4>
                          <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider flex-shrink-0 ${
                            isOutOfStock 
                              ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {isOutOfStock ? 'Hết hàng' : 'Còn hàng'}
                          </span>
                        </div>
                        <p className="text-[10px] text-secondary uppercase tracking-wider font-bold mt-0.5">{product.collection}</p>
                        <p className="text-xs text-on-surface-variant mt-1.5 italic line-clamp-1">"{product.tagline}"</p>
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-outline-variant/30">
                        {editingProductId === product.id ? (
                          <div className="flex items-center gap-1.5">
                            <input 
                              type="number"
                              value={editPriceVal}
                              onChange={(e) => setEditPriceVal(Number(e.target.value))}
                              className="w-24 bg-white border border-outline-variant rounded text-xs px-2 py-1 text-primary focus:outline-none focus:border-secondary font-semibold font-mono"
                            />
                            <button 
                              onClick={() => handleSaveProductPrice(product.id)}
                              className="text-[10px] uppercase tracking-wider font-bold bg-[#C8A96A] hover:bg-primary text-white hover:text-white px-2.5 py-1 rounded transition-colors"
                            >
                              Lưu
                            </button>
                            <button 
                              onClick={() => setEditingProductId(null)}
                              className="text-[10px] uppercase tracking-wider font-bold bg-surface-container-high text-primary px-2 py-1 rounded"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs text-on-surface-variant font-medium">Giá:</span>
                            <span className="text-sm font-bold text-secondary font-mono">{formatVND(product.price)}</span>
                            <span className="text-[11px] text-on-surface-variant">/ {displayVolume}</span>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleToggleProductStock(product.id)}
                            className="text-[10px] uppercase font-bold tracking-wider text-primary hover:text-secondary transition-colors bg-surface-container hover:bg-surface-container-high px-2.5 py-1 rounded border border-outline-variant/20"
                          >
                            Kho hàng
                          </button>
                          {editingProductId !== product.id && (
                            <button 
                              onClick={() => handleStartEditProduct(product)}
                              className="text-[10px] uppercase font-bold tracking-wider text-white bg-primary hover:bg-[#C8A96A] transition-colors px-2.5 py-1 rounded"
                            >
                              Sửa Giá
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="bg-white border border-outline-variant/35 rounded-xl p-6 shadow-sm animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="font-serif text-2xl text-primary font-bold mb-1">Thư hỗ trợ khách hàng</h2>
                <p className="text-xs text-on-surface-variant">Quản lý các ý kiến gửi về từ mẫu đơn liên hệ ngoài trang chủ.</p>
              </div>

              <select
                value={inquiryFilter}
                onChange={(e) => setInquiryFilter(e.target.value)}
                className="bg-white border border-outline-variant/60 px-3 py-2.5 text-xs rounded text-slate-700 focus:outline-none focus:border-secondary"
              >
                <option value="all">Tất cả thư</option>
                <option value="new">Yêu cầu chưa đọc</option>
                <option value="resolved">Đã giải quyết</option>
              </select>
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredInquiries.map((inq) => (
                <div 
                  key={inq.id} 
                  className={`border rounded-xl p-5 transition-all duration-300 ${
                    inq.status === 'resolved' 
                      ? 'bg-surface-container-low/20 border-outline-variant/30 opacity-70' 
                      : 'bg-white border-outline-variant/40 hover:border-secondary/35 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-3 items-start md:items-center mb-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-secondary font-bold">{inq.id}</span>
                      <h4 className="font-bold text-sm text-primary">{inq.name}</h4>
                      <span className="text-outline-variant text-xs">•</span>
                      <a href={`mailto:${inq.email}`} className="text-xs text-on-surface-variant hover:underline hover:text-secondary transition-colors font-mono">{inq.email}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-on-surface-variant font-mono">
                        {new Date(inq.date).toLocaleString('vi-VN')}
                      </span>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                        inq.status === 'resolved' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                      }`}>
                        {inq.status === 'resolved' ? 'Đã giải quyết' : 'Yêu cầu mới'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-lg text-xs md:text-sm text-primary italic mb-4 leading-relaxed">
                    "{inq.message}"
                  </div>

                  <div className="flex justify-end">
                    {inq.status === 'new' && (
                      <button
                        onClick={() => handleResolveInquiry(inq.id)}
                        className="text-xs uppercase font-bold tracking-wider text-white bg-primary hover:bg-[#C8A96A] transition-all px-4 py-2 rounded-md flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Đánh dấu giải quyết
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {filteredInquiries.length === 0 && (
                <div className="text-center py-12 text-on-surface-variant italic text-sm">
                  Không tìm thấy thư liên hệ nào.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-outline-variant/30 mt-20 pt-8 text-center text-xs text-on-surface-variant tracking-wider">
        <p>© {new Date().getFullYear()} IMPERIAL Admin Portal. Độc quyền quản trị thương hiệu Le Laffé.</p>
        <p className="mt-2 text-[10px] text-outline">Giao diện điều khiển tối giản theo ngôn ngữ thiết kế di sản.</p>
      </footer>
    </div>
  )
}
