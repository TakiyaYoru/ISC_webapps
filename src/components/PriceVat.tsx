export default function PriceVat({ price }: { price: string }) {
  const gross = Number(price.replace(/[^0-9]/g, ''))
  if (!Number.isSafeInteger(gross) || gross <= 0) return null
  const net = Math.round(gross * 100 / 108)
  return (
    <p className="mt-1.5 font-sans text-[11px] md:text-xs font-normal leading-relaxed text-ink/55">
      <span className="inline-block">Đã gồm VAT 8%</span>
      <span aria-hidden="true" className="mx-1.5 text-ink/30">·</span>
      <span className="inline-block">Giá chưa VAT: {net.toLocaleString('vi-VN')} ₫</span>
    </p>
  )
}
