import { useState } from 'react'
import { Link } from 'react-router-dom'
import BankTransferInstructions from '../components/BankTransferInstructions'
import { readPendingBankOrder } from '../utils/bankTransfer'

export default function BankTransfer() {
  const [order] = useState(readPendingBankOrder)
  return <div className="container-wide py-12 max-w-xl">
    {order ? <BankTransferInstructions order={order} /> : <p>Chưa có đơn chuyển khoản trên trình duyệt này. Vui lòng đặt hàng hoặc liên hệ IMPERIAL để được hỗ trợ.</p>}
    <Link to="/collection" className="btn-primary mt-6">Tiếp tục mua sắm</Link>
  </div>
}
