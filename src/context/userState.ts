import { createContext, useContext } from 'react'
import type { Profile, SavedOrder } from '../services/api'
export type OrderItem = { name: string; quantity: number; price: string; image?: string }
export type Order = { code: string; date: string; total: number; paymentMethod: 'cod' | 'bank_transfer';
  paymentStatus?: 'pending' | 'paid'; status: SavedOrder['status']; items: OrderItem[]; clientName: string; clientPhone: string }
export type User = Profile
export type UserState = {
  user: User | null; loading: boolean; error: string; orders: SavedOrder[]
  login: (email: string, password: string) => Promise<void>; logout: () => Promise<void>
  loginModalOpen: boolean; setLoginModalOpen: (open: boolean) => void
  addOrder: (order: Omit<Order, 'date' | 'status'>) => void
  refresh: () => Promise<void>
  updateProfile: (name: string, phone: string, address: string) => Promise<void>
}
export const UserContext = createContext<UserState | undefined>(undefined)
export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}
