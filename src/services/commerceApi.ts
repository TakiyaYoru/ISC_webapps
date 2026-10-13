import { journal } from '../data/journal'
import { productCatalog } from '../data/productCatalog'
import { heroSlides } from '../data/heroSlides'
import { supabase } from '../supabaseClient'

export type Product = {
  slug: string; name: string; type: string; skinType: string; timeUsage: string
  price: string; priceAmount?: number; description: string; info: string; usage: string; ingredients: string; images: string[]
}
export type JournalArticle = {
  id: string; slug: string; title: string; excerpt: string; category: string; readingTime: string
  image: string; imageAlt: string; date: string; body: string[]
}
export type HeroSlide = {
  image: string; tagline: string; title: string; titleSuffix: string; description: string
  bgColor: string; textColor: string; btnClass: string; link: string
}
export type InquiryInput = { name: string; email: string; message: string }
export type OrderInput = {
  idempotencyKey: string; client_name: string; client_phone: string; note: string
  shippingAddress: { province: string; district: string; address: string }
  paymentMethod: 'cod' | 'bank_transfer'; termsAccepted: true; termsVersion: '2026-10-13'
  expectedTotal: number; items: { slug: string; quantity: number }[]
}
export type ReceiptItem = { slug: string; name: string; quantity: number; priceAmount: number; image?: string }
export type Receipt = { success: true; code: string; total: number; paymentMethod: 'cod' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid'; date: string; items: ReceiptItem[] }
export type SavedOrder = {
  code: string; created_at: string; total: number; payment_method: 'cod' | 'bank_transfer'
  payment_status: 'pending' | 'paid'; status: 'processing' | 'shipping' | 'delivered' | 'cancelled'
  items: ReceiptItem[]; client_name: string; client_phone: string; note: string; version: number
  shipping_address: { province: string; district: string; address: string }
}
export type Profile = { id: string; email: string; name: string; phone: string; address: string; isAdmin: boolean }
export type Inquiry = InquiryInput & { id: string; created_at: string; status: 'pending' | 'resolved' }
const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
export class ApiError extends Error {
  code: string
  constructor(message: string, code: string) { super(message); this.code = code }
}

export async function request<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  if (!base) throw new Error('Chưa cấu hình kết nối hệ thống đặt hàng.')
  const session = supabase ? (await supabase.auth.getSession()).data.session : null
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (session) headers.Authorization = `Bearer ${session.access_token}`
  const response = await fetch(base + path, { method, headers,
    body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(20000) })
  const data = await response.json()
  if (!response.ok) throw new ApiError(data.message || 'Chưa gửi được yêu cầu. Vui lòng thử lại.', data.code)
  return data as T
}
export const api = {
  products: {
    getAll: async (): Promise<Product[]> => base ? request('/products') : productCatalog,
    getBySlug: async (slug: string): Promise<Product | undefined> => {
      if (!base) return productCatalog.find(p => p.slug === slug)
      return request(`/products/${encodeURIComponent(slug)}`)
    },
  },
  journal: {
    getAll: async (): Promise<JournalArticle[]> => journal,
    getLatest: async (limit: number): Promise<JournalArticle[]> => journal.slice(0, limit),
    getBySlug: async (slug: string): Promise<JournalArticle | undefined> => journal.find(p => p.slug === slug),
  },
  banners: { getAll: async (): Promise<HeroSlide[]> => heroSlides },
  contact: { submit: (input: InquiryInput) => request<{ success: true; message: string }>('/contact', 'POST', input) },
  orders: { create: (input: OrderInput) => request<Receipt>('/orders', 'POST', input) },
  me: {
    get: () => request<Profile>('/me'),
    orders: (offset = 0) => request<SavedOrder[]>(`/me/orders?offset=${offset}`),
    update: (profile: Pick<Profile, 'name' | 'phone' | 'address'>) => request('/me', 'PATCH', profile),
  },
  admin: {
    orders: (offset = 0) => request<SavedOrder[]>(`/admin/orders?offset=${offset}`),
    inquiries: (offset = 0) => request<Inquiry[]>(`/admin/inquiries?offset=${offset}`),
    status: (order: SavedOrder, status: SavedOrder['status']) => request(`/admin/orders/${order.code}`, 'PATCH', { version: order.version, status }),
    payment: (order: SavedOrder, bankReference: string, amount: number) => request(`/admin/orders/${order.code}/payment`, 'POST', { version: order.version, bankReference, amount }),
    resolve: (id: string) => request(`/admin/inquiries/${id}`, 'PATCH', {}),
  },
}
