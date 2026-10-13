export default function PriceVat({ price }: { price: string }) {
  const gross = Number(price.replace(/[^0-9]/g, ''))
  if (!Number.isSafeInteger(gross) || gross <= 0) return null
  const net = Math.round(gross * 100 / 108)
  const format = (value: number) => value.toLocaleString('vi-VN') + ' ₫'
  return <div className="font-sans text-xs text-ink/70 leading-relaxed mt-1">
    <div>Giá chưa VAT: {format(net)}</div>
    <div>VAT 8%: {format(gross - net)}</div>
    <div>Giá sau VAT: {format(gross)}</div>
  </div>
}
