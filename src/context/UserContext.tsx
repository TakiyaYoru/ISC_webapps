import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export type OrderItem = {
  name: string
  quantity: number
  price: string
  image?: string
}

export type Order = {
  code: string
  date: string
  total: number
  paymentMethod: 'cod' | 'momo' | 'vnpay'
  status: 'processing' | 'shipping' | 'delivered' | 'cancelled'
  items: OrderItem[]
  clientName: string
  clientPhone: string
}

export type User = {
  name: string
  email: string
  phone: string
  address: string
  points: number
  tier: 'Imperial Silver Member' | 'Imperial Gold Member' | 'Imperial Royal Member'
}

type UserContextType = {
  user: User | null
  login: (name: string, email: string, phone: string, address: string) => void
  logout: () => void
  orders: Order[]
  addOrder: (newOrder: Omit<Order, 'date' | 'status'>) => void
  loginModalOpen: boolean
  setLoginModalOpen: (open: boolean) => void
  updateProfile: (name: string, phone: string, address: string) => void
  updateOrderStatus: (code: string, status: Order['status']) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const DEFAULT_MOCK_ORDERS: Order[] = [
  {
    code: 'LELAFFE-874291',
    date: '2026-06-01T14:32:00.000Z',
    total: 7400000,
    paymentMethod: 'vnpay',
    status: 'delivered',
    clientName: 'Nguyễn Minh Quân',
    clientPhone: '0909123456',
    items: [
      {
        name: 'Zayin Rare Elements Vital Facial Essence',
        quantity: 1,
        price: '7.400.000 VNĐ'
      }
    ]
  },
  {
    code: 'LELAFFE-639105',
    date: '2026-06-10T10:15:00.000Z',
    total: 13300000,
    paymentMethod: 'cod',
    status: 'shipping',
    clientName: 'Nguyễn Minh Quân',
    clientPhone: '0909123456',
    items: [
      {
        name: 'Chet Energy Restoration Facial Treatment',
        quantity: 1,
        price: '7.000.000 VNĐ'
      },
      {
        name: 'SMTRs-100 De Secret',
        quantity: 1,
        price: '6.300.000 VNĐ'
      }
    ]
  }
]

const DEFAULT_USER: User = {
  name: 'Nguyễn Minh Quân',
  email: 'quan.nguyen@lelaffe.com',
  phone: '0909123456',
  address: '123 Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  points: 2070,
  tier: 'Imperial Gold Member'
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('imperial_skincare_user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem('imperial_skincare_orders')
      return savedOrders ? JSON.parse(savedOrders) : DEFAULT_MOCK_ORDERS
    } catch {
      return DEFAULT_MOCK_ORDERS
    }
  })

  const [loginModalOpen, setLoginModalOpen] = useState(false)

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('imperial_skincare_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('imperial_skincare_user')
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('imperial_skincare_orders', JSON.stringify(orders))
  }, [orders])

  const login = useCallback((name: string, email: string, phone: string, address: string) => {
    // Standard mock user login
    const newUser: User = {
      name: name || DEFAULT_USER.name,
      email: email || DEFAULT_USER.email,
      phone: phone || DEFAULT_USER.phone,
      address: address || DEFAULT_USER.address,
      points: 2070,
      tier: 'Imperial Gold Member'
    }
    setUser(newUser)
    setLoginModalOpen(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setOrders(DEFAULT_MOCK_ORDERS)
    localStorage.removeItem('imperial_skincare_user')
    localStorage.removeItem('imperial_skincare_orders')
  }, [])

  const addOrder = useCallback((newOrder: Omit<Order, 'date' | 'status'>) => {
    const createdOrder: Order = {
      ...newOrder,
      date: new Date().toISOString(),
      status: 'processing'
    }

    setOrders((prev) => [createdOrder, ...prev])

    // If logged in, award points (1 point per 10,000 VNĐ spent)
    setUser((prevUser) => {
      if (!prevUser) return null
      const gainedPoints = Math.floor(newOrder.total / 10000)
      const totalPoints = prevUser.points + gainedPoints
      
      let nextTier = prevUser.tier
      if (totalPoints >= 5000) {
        nextTier = 'Imperial Royal Member'
      } else if (totalPoints >= 1000) {
        nextTier = 'Imperial Gold Member'
      } else {
        nextTier = 'Imperial Silver Member'
      }

      return {
        ...prevUser,
        points: totalPoints,
        tier: nextTier
      }
    })
  }, [])

  const updateProfile = useCallback((name: string, phone: string, address: string) => {
    setUser((prev) => {
      if (!prev) return null
      return {
        ...prev,
        name,
        phone,
        address
      }
    })
  }, [])

  const updateOrderStatus = useCallback((code: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.code === code ? { ...o, status } : o))
    )
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        orders,
        addOrder,
        loginModalOpen,
        setLoginModalOpen,
        updateProfile,
        updateOrderStatus
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
