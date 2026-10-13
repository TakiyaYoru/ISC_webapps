import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { supabase } from '../supabaseClient'
import { api, type SavedOrder } from '../services/api'
import { UserContext, type User } from './userState'
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [orders, setOrders] = useState<SavedOrder[]>([])
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const refresh = useCallback(async () => {
    if (!supabase) { setUser(null); setOrders([]); setLoading(false); return }
    try {
      const { data } = await supabase.auth.getSession()
      if (!data.session) { setUser(null); setOrders([]); return }
      const profile = await api.me.get()
      const history = await api.me.orders()
      setUser(profile); setOrders(history); setError('')
    } catch {
      setUser(null); setOrders([]); setError('Chưa tải được tài khoản. Vui lòng thử lại.')
    } finally { setLoading(false) }
  }, [])
  useEffect(() => {
    void refresh()
    const subscription = supabase?.auth.onAuthStateChange(() => {
      // Defer Supabase calls until the auth callback has released its lock.
      setTimeout(() => { void refresh() }, 0)
    }).data.subscription
    return () => subscription?.unsubscribe()
  }, [refresh])
  const login = async (email: string, password: string) => {
    if (!supabase) throw new Error('Chưa cấu hình đăng nhập. Bạn vẫn có thể đặt hàng không cần tài khoản.')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error('Email hoặc mật khẩu không đúng, hoặc tài khoản chưa được xác nhận.')
    // Verify the authenticated identity and role through the backend before rendering private data.
    const profile = await api.me.get()
    setUser(profile); setOrders(await api.me.orders()); setError(''); setLoginModalOpen(false)
  }
  const logout = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut()
      if (error) throw new Error('Chưa đăng xuất được. Vui lòng thử lại.')
    }
    setUser(null); setOrders([])
  }
  const updateProfile = async (name: string, phone: string, address: string) => {
    await api.me.update({ name, phone, address }); await refresh()
  }
  const addOrder = () => { void refresh() }
  return <UserContext.Provider value={{ user, loading, error, orders, login, logout, loginModalOpen,
    setLoginModalOpen, addOrder, refresh, updateProfile }}>{children}</UserContext.Provider>
}
