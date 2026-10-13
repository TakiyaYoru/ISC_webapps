import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { bankAccount } from '../data/bankAccount'
import { bankTransferPayload, type PendingBankOrder } from '../utils/bankTransfer'

export default function BankTransferInstructions({ order }: { order: PendingBankOrder }) {
  const [qr, setQr] = useState('')
  const [copied, setCopied] = useState('')
  useEffect(() => {
    let active = true
    QRCode.toDataURL(bankTransferPayload(order.total, order.code), { width: 320, margin: 3, errorCorrectionLevel: 'M' })
      .then(value => { if (active) setQr(value) }).catch(() => { /* Bank details remain available for manual entry. */ })
    return () => { active = false }
  }, [order.code, order.total])
  const copy = async (value: string) => {
    try { await navigator.clipboard.writeText(value); setCopied(value) } catch { setCopied('') }
  }
  return <section aria-label="Thông tin chuyển khoản" className="text-sm text-on-surface-variant">
    <p className="mb-5 border border-secondary/30 bg-secondary/10 px-4 py-3 font-medium text-primary">Chờ xác nhận thanh toán</p>
    <h3 className="font-serif text-2xl text-primary mb-2">Chuyển khoản ngân hàng</h3>
    <p className="mb-5 leading-relaxed">Quét QR bằng ứng dụng ngân hàng hoặc chuyển khoản theo thông tin bên dưới. Vui lòng kiểm tra tên người nhận trước khi xác nhận giao dịch.</p>
    <div className="mx-auto mb-5 w-fit border border-outline-variant bg-white p-2">{qr ? <img src={qr} alt={`QR chuyển khoản cho đơn ${order.code}`} className="w-56 h-56" /> : <p className="p-6">Đang tạo mã QR…</p>}</div>
    <dl className="space-y-4 border border-outline-variant/50 p-5 leading-relaxed">
      <div><dt>Ngân hàng</dt><dd className="font-semibold text-primary">{bankAccount.bank}</dd><dd>{bankAccount.branch}</dd></div>
      <div><dt>Chủ tài khoản</dt><dd className="font-semibold text-primary">{bankAccount.holder}</dd></div>
      <div><dt>Số tài khoản</dt><dd className="flex flex-wrap justify-between gap-2"><strong className="text-primary">{bankAccount.number}</strong><button type="button" onClick={() => copy(bankAccount.number)} className="text-primary underline">{copied === bankAccount.number ? 'Đã sao chép' : 'Sao chép số tài khoản'}</button></dd></div>
      <div><dt>Số tiền theo đơn</dt><dd className="font-semibold text-primary text-xl">{order.total.toLocaleString('vi-VN')} VNĐ</dd></div>
      <div><dt>Nội dung chuyển khoản / Mã đơn</dt><dd className="flex flex-wrap justify-between gap-2"><strong className="text-primary break-all">{order.code}</strong><button type="button" onClick={() => copy(order.code)} className="text-primary underline">{copied === order.code ? 'Đã sao chép' : 'Sao chép nội dung'}</button></dd></div>
    </dl>
    <p className="mt-4 leading-relaxed">Đơn chỉ được xác nhận thanh toán sau khi IMPERIAL kiểm tra tiền vào tài khoản. Nếu có phí giao hàng, chúng tôi sẽ thông báo và thống nhất với quý khách trước khi giao.</p>
    <p className="mt-3">Hỗ trợ đối soát: <a href="tel:0869733288" className="text-primary underline">0869 733 288</a>.</p>
    <p role="status" className="sr-only">{copied ? 'Đã sao chép thông tin chuyển khoản' : ''}</p>
  </section>
}
