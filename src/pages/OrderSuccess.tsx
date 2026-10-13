import { Link } from 'react-router-dom'
export default function OrderSuccess() {
  return <section className="container-wide py-16"><h1 className="font-serif text-3xl mb-5">Thông tin đơn hàng</h1><p>Đơn hàng chỉ được xác nhận sau khi hệ thống ghi nhận thành công.</p><Link className="btn-primary mt-6" to="/account">Xem đơn hàng của bạn</Link></section>
}
