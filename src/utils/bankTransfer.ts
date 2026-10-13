import { bankAccount } from '../data/bankAccount.ts'

function field(tag: string, value: string) {
  if (value.length > 99) throw new Error('Thông tin QR quá dài')
  return tag + String(value.length).padStart(2, '0') + value
}

export function crc16(value: string) {
  let crc = 0xffff
  for (const byte of new TextEncoder().encode(value)) {
    crc ^= byte << 8
    for (let bit = 0; bit < 8; bit++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

export function bankTransferPayload(amount: number, reference: string) {
  if (!Number.isSafeInteger(amount) || amount <= 0 || !/^[A-Z0-9 ]{1,25}$/.test(reference)) throw new Error('Thông tin chuyển khoản không hợp lệ')
  const beneficiary = field('00', bankAccount.bin) + field('01', bankAccount.number)
  const merchant = field('00', 'A000000727') + field('01', beneficiary) + field('02', 'QRIBFTTA')
  const payload = field('00', '01') + field('01', '12') + field('38', merchant) + field('53', '704') + field('54', String(amount)) + field('58', 'VN') + field('62', field('08', reference)) + '6304'
  return payload + crc16(payload)
}

export type PendingBankOrder = { code: string; total: number }
export function readPendingBankOrder(): PendingBankOrder | null {
  try {
    const order = JSON.parse(localStorage.getItem('imperial_skincare_bank_order') || 'null')
    if (!order || !/^[A-Z0-9]{1,25}$/.test(order.code) || !Number.isSafeInteger(order.total) || order.total <= 0) return null
    return { code: order.code, total: order.total }
  } catch { return null }
}
