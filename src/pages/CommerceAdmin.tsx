import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/userState'
import { api, type SavedOrder, type Inquiry } from '../services/api'

const labels = { processing: 'Đang xử lý', shipping: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy' }
export default function CommerceAdmin() {
  const { user, loading, setLoginModalOpen, logout } = useUser()
  const [orders, setOrders] = useState<SavedOrder[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [offset, setOffset] = useState(0)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const load = useCallback(async () => {
    if (!user?.isAdmin) return
    setBusy(true); setError('')
    try {
      const [savedOrders, savedInquiries] = await Promise.all([api.admin.orders(offset), api.admin.inquiries(offset)])
      setOrders(savedOrders); setInquiries(savedInquiries)
    } catch (err) { setOrders([]); setInquiries([]); setError(err instanceof Error ? err.message : 'Chưa tải được dữ liệu.') }
    finally { setBusy(false) }
  }, [user, offset])
  useEffect(() => { void load() }, [load])
  const mutate = async (action: () => Promise<unknown>) => {
    setBusy(true); setError('')
    try { await action(); await load() }
    catch (err) { setError(err instanceof Error ? err.message : 'Chưa cập nhật được.'); setBusy(false) }
  }
  if (loading) return <p className="p-8">Đang kiểm tra tài khoản…</p>
  if (!user) return <section className="container-wide py-16"><h1 className="font-serif text-3xl mb-5">Quản trị IMPERIAL</h1>
    <button className="btn-primary" onClick={() => setLoginModalOpen(true)}>Đăng nhập quản trị</button><Link to="/" className="block mt-5">Về website</Link></section>
  if (!user.isAdmin) return <p className="p-8">Tài khoản không có quyền quản trị. <Link to="/">Về website</Link></p>
  return <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
    <header className="flex flex-wrap justify-between gap-4"><h1 className="font-serif text-3xl">Quản trị IMPERIAL</h1><div className="flex gap-5"><Link to="/">Về website</Link><button onClick={() => { void logout().catch(err => setError(err.message)) }}>Đăng xuất</button></div></header>
    <div className="flex gap-5 items-center"><button disabled={busy} onClick={() => { void load() }}>Tải lại</button>
      <button disabled={busy || offset === 0} onClick={() => setOffset(Math.max(0, offset - 50))}>Trang trước</button>
      <span>Trang {offset / 50 + 1}</span><button disabled={busy || (orders.length < 50 && inquiries.length < 50)} onClick={() => setOffset(offset + 50)}>Trang sau</button></div>
    {error && <p role="alert" className="p-4 bg-red-50 text-red-700">{error}</p>}
    {busy && <p role="status">Đang xử lý…</p>}
    <h2 className="font-serif text-2xl">Đơn hàng</h2>
    {!orders.length && !busy && <p>Chưa có đơn hàng ở trang này.</p>}
    {orders.map(order => <article className="border border-outline-variant p-5 space-y-3" key={order.code}>
      <p className="font-semibold">{order.code} · {new Date(order.created_at).toLocaleString('vi-VN')} · {labels[order.status]}</p>
      <p>{order.client_name} · {order.client_phone}</p>
      <p>{order.shipping_address.address}, {order.shipping_address.district}, {order.shipping_address.province}</p>
      {order.items.map(item => <p key={item.slug}>{item.name} × {item.quantity} · {item.priceAmount.toLocaleString('vi-VN')} VNĐ</p>)}
      <p className="font-semibold">Tổng: {order.total.toLocaleString('vi-VN')} VNĐ</p><p>{order.note}</p>
      <p>{order.payment_method === 'cod' ? 'COD' : 'Chuyển khoản ngân hàng'} · {order.payment_status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}</p>
      {order.payment_method === 'bank_transfer' && order.payment_status === 'pending' && order.status !== 'cancelled' &&
        <form className="flex flex-wrap items-end gap-3 bg-surface-container-low p-4" onSubmit={e => {
          e.preventDefault(); const fields = new FormData(e.currentTarget)
          void mutate(() => api.admin.payment(order, String(fields.get('reference')), Number(fields.get('amount'))))
        }}>
          <label>Mã giao dịch ngân hàng<input name="reference" required minLength={3} maxLength={100} className="block p-2 border bg-transparent" /></label>
          <label>Số tiền đã nhận<input name="amount" required type="number" min={1} step={1} className="block p-2 border bg-transparent" /></label>
          <label className="text-sm"><input required type="checkbox" /> Đã kiểm tra tiền vào tài khoản công ty</label>
          <button disabled={busy} className="btn-primary">Xác nhận thanh toán</button>
        </form>}
      <div className="flex flex-wrap gap-4">
        {order.status === 'processing' && (order.payment_method === 'cod' || order.payment_status === 'paid') && <button disabled={busy} onClick={() => { void mutate(() => api.admin.status(order, 'shipping')) }}>Chuyển sang đang giao</button>}
        {order.status === 'shipping' && <button disabled={busy} onClick={() => { void mutate(() => api.admin.status(order, 'delivered')) }}>Xác nhận đã giao</button>}
        {order.status === 'processing' && order.payment_status === 'pending' && <button disabled={busy} onClick={() => { void mutate(() => api.admin.status(order, 'cancelled')) }}>Hủy đơn</button>}
      </div>
    </article>)}
    <h2 className="font-serif text-2xl">Yêu cầu liên hệ</h2>
    {!inquiries.length && !busy && <p>Chưa có yêu cầu ở trang này.</p>}
    {inquiries.map(inquiry => <article key={inquiry.id} className="border p-5 space-y-3">
      <p>{inquiry.name} · {inquiry.email} · {new Date(inquiry.created_at).toLocaleString('vi-VN')}</p>
      <p className="whitespace-pre-wrap">{inquiry.message}</p>
      {inquiry.status === 'pending' ? <button disabled={busy} onClick={() => { void mutate(() => api.admin.resolve(inquiry.id)) }}>Đánh dấu đã xử lý</button> : <p>Đã xử lý</p>}
    </article>)}
  </main>
}
