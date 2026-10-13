import { useState } from 'react'
import { useUser } from '../context/userState'

const statusLabels = { processing: 'Đang xử lý', shipping: 'Đang giao hàng', delivered: 'Đã giao hàng', cancelled: 'Đã hủy' }
export default function CustomerAccount() {
  const { user, orders, loading, error, logout, updateProfile, refresh, setLoginModalOpen } = useUser()
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  if (loading) return <p className="container-wide py-16">Đang tải tài khoản…</p>
  if (!user) return <section className="container-wide py-16"><h1 className="font-serif text-3xl mb-5">Tài khoản của bạn</h1>
    {error && <p role="alert">{error}</p>}<button className="btn-primary mt-4" onClick={() => setLoginModalOpen(true)}>Đăng nhập</button></section>
  return <section className="container-wide py-16 space-y-8">
    <div className="flex justify-between gap-4"><h1 className="font-serif text-3xl">Tài khoản của bạn</h1><button onClick={() => { void logout().catch(err => setMessage(err.message)) }}>Đăng xuất</button></div>
    <form key={user.id + user.name + user.phone + user.address} className="max-w-lg space-y-4" onSubmit={async e => {
      e.preventDefault(); setBusy(true); setMessage(''); const fields = new FormData(e.currentTarget)
      try { await updateProfile(String(fields.get('name')), String(fields.get('phone')), String(fields.get('address'))); setMessage('Đã lưu thông tin.') }
      catch (err) { setMessage(err instanceof Error ? err.message : 'Chưa lưu được thông tin.') }
      finally { setBusy(false) }
    }}>
      <p>{user.email}</p>
      <label className="block">Họ tên<input name="name" defaultValue={user.name} maxLength={100} className="block border p-3 w-full mt-2 bg-transparent" /></label>
      <label className="block">Điện thoại<input name="phone" type="tel" defaultValue={user.phone} maxLength={20} className="block border p-3 w-full mt-2 bg-transparent" /></label>
      <label className="block">Địa chỉ<input name="address" defaultValue={user.address} maxLength={500} className="block border p-3 w-full mt-2 bg-transparent" /></label>
      <button disabled={busy} className="btn-primary">{busy ? 'Đang lưu…' : 'Lưu thông tin'}</button>
      {message && <p role="status">{message}</p>}
    </form>
    <div className="flex justify-between"><h2 className="font-serif text-2xl">Đơn hàng của bạn</h2><button onClick={() => { void refresh() }}>Tải lại</button></div>
    <p className="text-sm">Hiển thị 50 đơn gần nhất đã đặt khi đăng nhập tài khoản này.</p>
    {!orders.length && <p>Chưa có đơn hàng.</p>}
    {orders.map(order => <article key={order.code} className="border border-outline-variant p-5 space-y-3">
      <p className="font-semibold">{order.code} · {new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
      <p>{statusLabels[order.status]} · {order.payment_status === 'paid' ? 'Đã thanh toán' : order.payment_method === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chờ xác nhận chuyển khoản'}</p>
      {order.items.map(item => <p key={item.slug}>{item.name} × {item.quantity}</p>)}
      <p>{order.total.toLocaleString('vi-VN')} VNĐ</p>
    </article>)}
  </section>
}
