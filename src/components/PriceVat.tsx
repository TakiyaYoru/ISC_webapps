export default function PriceVat({ price }: { price: string }) {
  const gross = Number(price.replace(/[^0-9]/g, ''))
  if (!Number.isSafeInteger(gross) || gross <= 0) return null
  return (
    <p className="mt-1.5 font-sans text-[11px] md:text-xs font-normal leading-relaxed text-ink/55">
      Đã bao gồm VAT 8%
    </p>
  )
}
