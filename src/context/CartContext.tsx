import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { CartContext, type CartItem } from './cartState'

const parsePriceNumber = (priceStr: string): number => {
  return Number(priceStr.replace(/[^0-9]/g, '')) || 0
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('imperial_skincare_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('imperial_skincare_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.slug === product.slug)
      if (existing) {
        return prev.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
    setCartOpen(true) // Open cart drawer automatically on adding
    window.dispatchEvent(new CustomEvent('cart-item-added'))
  }, [])

  const removeFromCart = useCallback((slug: string) => {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug))
  }, [])

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.slug !== slug))
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, quantity } : item))
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])
  const refreshPrices = useCallback((products: { slug: string; price: string }[]) => {
    setCartItems(prev => prev.map(item => {
      const product = products.find(p => p.slug === item.slug)
      return product ? { ...item, price: product.price } : item
    }))
  }, [])

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cartItems.reduce((acc, item) => acc + parsePriceNumber(item.price) * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshPrices,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

